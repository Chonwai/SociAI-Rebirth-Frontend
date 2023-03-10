import { useState } from 'react';

export const HashtagDogController = () => {
    const [script, setScript] = useState('');
    const [hashtagStyle, setHashtagStyle] = useState('Instagram');
    const [hashtagAmount, setHashtagAmount] = useState('10');
    const [isAmountInvalid, setIsAmountInvalid] = useState(false);

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

    const handleGenerateClick = () => {
        const amount = parseInt(hashtagAmount);
        const output = `Generating ${amount} ${hashtagStyle} hashtags...\n`;
        setScript(output);
        for (let i = 1; i <= amount; i++) {
            setScript((prevScript) => prevScript + `#${hashtagStyle}Hashtag${i}\n`);
        }
    };

    return {
        script,
        hashtagStyle,
        hashtagAmount,
        isAmountInvalid,
        handleHashtagAmountChange,
        handleHashtagStyleChange,
        handleGenerateClick
    };
};
