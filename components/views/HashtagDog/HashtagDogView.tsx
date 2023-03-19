import {
    Box,
    Button,
    Collapse,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
    useClipboard,
    useDisclosure
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Feature } from './Feature';

const hashtagStyles = ['Instagram', 'Twitter', 'Facebook', '小紅書', 'TikTok'];
const hashtagRegions = ['Global', 'Macau', 'Hong Kong', 'Taiwan', 'Mainland China'];

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
    const { isOpen, onToggle } = useDisclosure();

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
            onToggle();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hashtags]);

    return (
        <Box mx="auto" p={{ base: 4, md: 8 }}>
            <Box mx="auto" mb={8} w={{ base: 'full', md: 'container.md' }}>
                <Text
                    fontSize={{ base: '2xl', md: '6xl' }}
                    fontWeight="bold"
                    mb={{ base: 4, md: 8 }}
                    textAlign="center"
                >
                    🐶 Hashtag Dog
                </Text>
                <Box bg="white" rounded="md" p={8} shadow={{ base: 'md', md: 'lg' }}>
                    <form onSubmit={handleSubmit(handleGenerateClick)}>
                        <Stack spacing="4" direction={{ base: 'column', md: 'row' }} mb={4}>
                            <FormControl isInvalid={errors.amount}>
                                <FormLabel htmlFor="amount">Hashtags Amount (1-10)</FormLabel>
                                <Input
                                    type={'number'}
                                    id="amount"
                                    placeholder="number"
                                    min={1}
                                    max={10}
                                    {...register('amount')}
                                />
                                <FormErrorMessage>
                                    {errors.amount && errors.amount.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.style}>
                                <FormLabel>Hashtag Style</FormLabel>
                                <Select {...register('style')}>
                                    {hashtagStyles.map((style) => (
                                        <option key={style} value={style}>
                                            {style}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.style && errors.style.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.region}>
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
                        </Stack>
                        <Stack spacing="4" direction={{ base: 'column', md: 'row' }} mb={4}>
                            <FormControl isInvalid={errors.script} isRequired>
                                <FormLabel>Input Script</FormLabel>
                                <Textarea {...register('script')} />
                                <FormErrorMessage>
                                    {errors.script && errors.script.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Flex justifyContent="flex-end" w="full">
                            <Button
                                isLoading={isSubmitting}
                                type="submit"
                                colorScheme="blue"
                                onClick={() => {
                                    isOpen ? onToggle() : null;
                                }}
                            >
                                Generate 🐾
                            </Button>
                        </Flex>
                    </form>
                </Box>
                {hashtags.length > 0 && (
                    <Collapse in={isOpen} animateOpacity>
                        <Stack spacing={4}>
                            <Textarea
                                mt={4}
                                value={value}
                                readOnly
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                            />
                            <Button onClick={onCopy}>
                                {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                        </Stack>
                    </Collapse>
                )}
            </Box>
            <Feature />
        </Box>
    );
};

export default HashtagDogView;
