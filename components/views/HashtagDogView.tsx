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
    handleSubmit: (
        callback: (data: any) => void
    ) => (event: React.BaseSyntheticEvent) => Promise<void>;
    register: any;
    errors: any;
    isSubmitting: boolean;
    hashtags: Array<string>;
    handleGenerateClick: (data: any) => void;
}

const HashtagDogView = (props: HashtagDogViewProps) => {
    const { handleSubmit, register, errors, isSubmitting, hashtags, handleGenerateClick } = props;
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
            <Box mb={4}>
                <form onSubmit={handleSubmit(handleGenerateClick)}>
                    <FormControl isInvalid={errors.amount} mb={4} w="full">
                        <FormLabel htmlFor="amount">Amount of Hashtags (1-30)</FormLabel>
                        <Input
                            type={'number'}
                            id="amount"
                            placeholder="number"
                            min={1}
                            max={30}
                            {...register('amount')}
                        />
                        <FormErrorMessage>
                            {errors.amount && errors.amount.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.style} mb={4} w="full">
                        <FormLabel>Hashtag Style</FormLabel>
                        <Select {...register('style')}>
                            {hashtagStyles.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>{errors.style && errors.style.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.region} mb={4} w="full">
                        <FormLabel>Hashtag Region</FormLabel>
                        <Select {...register('region')}>
                            {hashtagRegions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.region && errors.region.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.script} isRequired mb={4} w="full">
                        <FormLabel>Input Script</FormLabel>
                        <Input {...register('script')} />
                        <FormErrorMessage>
                            {errors.script && errors.script.message}
                        </FormErrorMessage>
                    </FormControl>
                    {/* <FormControl isRequired mb={4} isInvalid={isAmountInvalid} w="full">
                        <FormLabel>Amount of Hashtags (1-30)</FormLabel>
                        <Input
                            type={'number'}
                            value={hashtagAmount}
                            onChange={handleHashtagAmountChange}
                        />
                        <FormErrorMessage>Invalid amount</FormErrorMessage>
                    </FormControl> */}
                    {/* <FormControl mb={4} w="full">
                        <FormLabel>Hashtag Style</FormLabel>
                        <Select value={hashtagStyle} onChange={handleHashtagStyleChange}>
                            {hashtagStyles.map((style) => (
                                <option key={style} value={style}>
                                    {style}
                                </option>
                            ))}
                        </Select>
                    </FormControl> */}
                    {/* <FormControl mb={4} w="full">
                        <FormLabel>Hashtag Region</FormLabel>
                        <Select value={hashtagRegion} onChange={handleHashtagRegionChange}>
                            {hashtagRegions.map((region) => (
                                <option key={region} value={region}>
                                    {region}
                                </option>
                            ))}
                        </Select>
                    </FormControl> */}
                    {/* <FormControl isRequired mb={4} w="full">
                        <FormLabel>Input Script</FormLabel>
                        <Input value={hashtagScript} onChange={handleHashtagScriptChange} />
                    </FormControl> */}
                    <Button isLoading={isSubmitting} type="submit" colorScheme="blue">
                        Generate Hashtags
                    </Button>
                </form>
            </Box>
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
