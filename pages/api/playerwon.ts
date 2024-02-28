import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: 'edge',
};

type ResponseData = {
  count: number
}

const baseUrl = "http://3.113.14.129:3000"

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const url = baseUrl + "/api/playerwon/count"
    const resp = await fetch(url, {
        method: 'GET',
    });
    const text = await resp.text();
    return new Response(text, { status: 200 });
    // res.status(200).json({
    //   count: 1
    // });
};

export default handler;