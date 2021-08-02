import { Card, CardSets, CardSheet } from "../utils/types";

export async function listSheets(token: String) {
  const query = encodeURIComponent(
    `(mimeType='application/vnd.google-apps.spreadsheet') and ('me' in owners)`
  );

  const headers: HeadersInit = new Headers();
  headers.set("Authorization", `Bearer ${token}` || "");
  headers.set("Accept", "application/json");

  const rsp = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}`,
    {
      headers,
    }
  );

  const data = await rsp.json();
  return data.files.map((f: any) => ({ name: f.name, id: f.id }));
}

export async function getSheet(id: String, token: String) {
  const headers: HeadersInit = new Headers();
  headers.set("Authorization", `Bearer ${token}` || "");
  headers.set("Accept", "application/json");

  const rsp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}?includeGridData=true`,
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

  return cardsheet;
}
