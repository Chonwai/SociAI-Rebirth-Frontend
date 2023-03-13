import { useMutation } from '@tanstack/react-query';
import { ChatGPTAPI } from 'chatgpt';
import { SuccessResponse, ErrorResponse } from '../types/requests';

interface HashtagDogParams {
    script: string;
    type: string;
    amount: number;
}

export const useHashtagDog = <T extends string>() => {
    const api: any = new ChatGPTAPI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY as string
    });

    return useMutation<SuccessResponse, ErrorResponse, Record<T, string>>(
        async (obj: HashtagDogParams | any) => {
            return (await api.sendMessage(
                `[Hashtag生成，數量至少${obj.amount}個，要有"product name"，"description"和詳細相關風格的${obj.type}"hashtags"，請用'''json'''格式輸出]：${obj.script}`
            )) as Promise<SuccessResponse>;
        }
    );
};
