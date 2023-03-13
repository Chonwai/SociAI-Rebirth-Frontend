import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Stack,
    Textarea,
    useClipboard
} from '@chakra-ui/react';
import { useEffect } from 'react';

const hashtagStyles = ['Instagram', 'Twitter', 'Facebook', '小紅書', 'TikTok'];
const hashtagRegions = ['澳門', '香港', '台灣', '中國大陸'];

interface HashtagDogViewProps {
    hashtagStyle: string;
    hashtagAmount: string;
    hashtagScript: string;
    hashtagRegion: string;
    hashtags: Array<string>;
    isAmountInvalid: boolean;
    handleHashtagAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHashtagStyleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleHashtagScriptChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleHashtagRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleGenerateClick: () => void;
    isGenerating: boolean;
}

const HashtagDogView = (props: HashtagDogViewProps) => {
    const {
        hashtagStyle,
        hashtagAmount,
        hashtagScript,
        hashtagRegion,
        hashtags,
        isAmountInvalid,
        handleHashtagAmountChange,
        handleHashtagStyleChange,
        handleHashtagScriptChange,
        handleHashtagRegionChange,
        handleGenerateClick,
        isGenerating
    } = props;
    const { onCopy, value, setValue, hasCopied } = useClipboard('');

    useEffect(() => {
        if (hashtags.length > 0) {
            const newHashtags = hashtags.map((hashtag) => {
                if (hashtag.startsWith('#')) {
                    return hashtag;
                } else {
                    return `#${hashtag}`;
                }
            });
            setValue(newHashtags.join(' '));
        }
    }, [hashtags]);

    return (
        <Box p={4} w="full" maxW="container.sm" mx="auto">
            <FormControl isRequired mb={4} isInvalid={isAmountInvalid} w="full">
                <FormLabel>Amount of Hashtags (1-30)</FormLabel>
                <Input type={'number'} value={hashtagAmount} onChange={handleHashtagAmountChange} />
                <FormErrorMessage>Invalid amount</FormErrorMessage>
            </FormControl>
            <FormControl mb={4} w="full">
                <FormLabel>Hashtag Style</FormLabel>
                <Select value={hashtagStyle} onChange={handleHashtagStyleChange}>
                    {hashtagStyles.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mb={4} w="full">
                <FormLabel>Hashtag Region</FormLabel>
                <Select value={hashtagRegion} onChange={handleHashtagRegionChange}>
                    {hashtagRegions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl isRequired mb={4} w="full">
                <FormLabel>Input Script</FormLabel>
                <Input value={hashtagScript} onChange={handleHashtagScriptChange} />
            </FormControl>
            <Button onClick={handleGenerateClick} isLoading={isGenerating}>
                Generate Hashtags
            </Button>
            <Stack mt={4} spacing={4}>
                <Textarea
                    mt={4}
                    value={value}
                    readOnly
                    onChange={(e) => {
                        console.log(e.target.value);
                        setValue(e.target.value);
                    }}
                />
                <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy to Clipboard'}</Button>
            </Stack>
            {/* <Box flexDirection={'row'} mt={4}>
                {hashtags.map((hashtag) => (
                    <Box
                        key={hashtag}
                        display="inline-block"
                        bg="gray.200"
                        p={1}
                        m={1}
                        borderRadius="md"
                    >
                        {hashtag}
                    </Box>
                ))}
            </Box> */}
        </Box>
    );
};

export default HashtagDogView;
