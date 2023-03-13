// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTAPI } from 'chatgpt';
import { oraPromise } from 'ora';

type Data = {
    result: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    // const body = await req.body;

    const api: any = new ChatGPTAPI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string
    });

    const prompt: string = req.body.prompt;

    console.log('HiHi:', prompt);

    let response: any = await oraPromise(api.sendMessage(prompt), {
        text: prompt
    });

    console.log('\n' + response.text + '\n');

    res.status(200).json({ result: response.text });
}
