import { NextApiRequest, NextApiResponse } from "next";
import { Card, CardSets, CardSheet } from "../../../utils/types";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    query: { id },
  } = req;

  const token = req.headers.authorization;
  const headers: HeadersInit = new Headers();
  headers.set("Authorization", `Bearer ${token}` || "");
  headers.set("Accept", "application/json");

  try {
    const rsp = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}?includeGridData=true&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers,
      }
    );

    const data = await rsp.json();

    const cardsheet: CardSheet = {
      name: data.properties.title,
      sets: data.sheets.reduce((sets: CardSets, sheet: any) => {
        sets[sheet.properties.title] = sheet.data[0].rowData.reduce(
          (cards: Card[], row: any, i: number) => {
            const front = row.values[0].formattedValue;
            const back = row.values[1].formattedValue;
            const id = `${sheet.properties.title}-${i}-${front}`;

            if (front && back) {
              cards.push({
                front,
                back,
                id,
              });
            }

            return cards;
          },
          []
        );

        return sets;
      }, {}),
    };

    res.status(200).json(cardsheet);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export default handler;
