import { NextApiRequest, NextApiResponse } from "next";
import { Sheet } from "../../../utils/types";

type Data = {
  sheets: Sheet[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const token = req.headers.authorization;
    const query = encodeURIComponent(
      `(mimeType='application/vnd.google-apps.spreadsheet') and ('me' in owners)`
    );

    const headers: HeadersInit = new Headers();
    headers.set("Authorization", `Bearer ${token}` || "");
    headers.set("Accept", "application/json");

    const rsp = await fetch(
      `https://www.googleapis.com/drive/v3/files?key=${process.env.GOOGLE_API_KEY}&q=${query}`,
      {
        headers,
      }
    );

    const data = await rsp.json();

    res.status(200).json({
      sheets: data.files.map((f: any) => ({ name: f.name, id: f.id })),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default handler;
