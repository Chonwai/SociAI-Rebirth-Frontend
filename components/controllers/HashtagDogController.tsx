import { useState } from 'react';
import HashtagDogView from '@/components/views/HashtagDogView';
import { getContent, getContentBetweenSymbols } from '@/utils/utils';
import { position, useToast } from '@chakra-ui/react';

const HashtagDogController = () => {
    const [hashtagStyle, setHashtagStyle] = useState('Instagram');
    const [hashtagAmount, setHashtagAmount] = useState('10');
    const [hashtagScript, setHashtagScript] = useState('');
    const [hashtagRegion, setHashtagRegion] = useState('澳門');
    const [isAmountInvalid, setIsAmountInvalid] = useState(false);
    const [hashtags, setHashtags] = useState<Array<string>>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const toasts = useToast();

    const handleHashtagAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value;
        if (/^\d+$/.test(amount) && parseInt(amount) >= 1 && parseInt(amount) <= 30) {
            setHashtagAmount(amount);
            setIsAmountInvalid(false);
        } else {
            setIsAmountInvalid(true);
        }
    };

    const handleHashtagStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHashtagStyle(event.target.value);
    };

    const handleHashtagRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHashtagRegion(event.target.value);
    };

    const handleHashtagScriptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtagScript(event.target.value);
    };

    const handleGenerateClick = async () => {
        setIsGenerating(true);
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `你現在是一個${hashtagStyle} hashtag寫手，請根據參考句子生成${hashtagAmount}個${hashtagRegion}風格的hashtag，生成的內容根據這個格式'''json\n {"hashtags": []} '''格式輸出。。參考句子如下：${hashtagScript}`
            })
        });

        if (response.ok) {
            setIsGenerating(false);
            const data: any = await response.json();
            console.log('Data Result: ', data.result);
            const result = JSON.parse(data.result);
            console.log('Result: ', result);
            if (result) {
                setHashtags(result.hashtags);
            } else {
                toasts({
                    title: 'Error',
                    description: 'Something went wrong, please try again.',
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
                hashtagStyle,
                hashtagAmount,
                hashtagScript,
                hashtagRegion,
                hashtags,
                isAmountInvalid,
                handleHashtagAmountChange,
                handleHashtagStyleChange,
                handleHashtagRegionChange,
                handleHashtagScriptChange,
                handleGenerateClick,
                isGenerating
            }}
        />
    );
};

export default HashtagDogController;
