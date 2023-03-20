import { useState } from 'react';
import HashtagDogView from '@/components/views/HashtagDog/HashtagDogView';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HashtagDogSchema } from '@/schemas/HashtagDogSchema';
import { getContent } from '@/utils/utils';
import _get from 'lodash/get';

const DEFAULT_VALUE = {
    style: 'Instagram',
    amount: 10,
    script: '',
    region: 'Global'
};

const HashtagDogContainer = () => {
    const [hashtags, setHashtags] = useState<Array<string>>([]);

    const toasts = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: DEFAULT_VALUE,
        resolver: yupResolver(HashtagDogSchema)
    });

    const handleGenerateClick = async (data: any) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // prompt: `你現在是一個${data.style} hashtag寫手，請根據參考句子生成${data.amount}個${data.region}風格的hashtag，生成的${data.amount}個hashtag內容根據這個格式'''json\n {"hashtags": []} '''格式輸出！參考句子如下：${data.script}`
                prompt: `You are now a ${data.style} hashtag writer. Please generate ${data.amount} ${data.region}-style hashtags based on the given reference sentence "${data.script}". The output should follow the format '''json\n {"hashtags": []} '''.`
            })
        });

        if (response.ok) {
            const data: any = await response.json();
            const result = getContent(data.result);
            if (result) {
                setHashtags(_get(result, 'hashtags', []));
            } else {
                toasts({
                    title: 'Error',
                    description: 'The Network is not working, please try again :(',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                });
                setHashtags([]);
            }
        } else {
            console.log('error');
        }
    };

    return (
        <HashtagDogView
            {...{
                handleSubmit,
                register,
                errors,
                isSubmitting,
                hashtags,
                handleGenerateClick
            }}
        />
    );
};

export default HashtagDogContainer;
