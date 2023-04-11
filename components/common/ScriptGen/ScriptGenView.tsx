import {
    Box,
    BoxProps,
    Button,
    Collapse,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
    Stack,
    Text,
    Textarea,
    useClipboard,
    useDisclosure,
    useBreakpointValue,
    Icon
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FiCheckCircle, FiClipboard } from 'react-icons/fi';

const scriptStyles = ['Instagram', 'Twitter', 'Facebook', '小紅書', 'TikTok'];
const scriptRegions = ['Global', 'Macau', 'Hong Kong', 'Taiwan', 'Mainland China'];
const scriptLengths = ['Short', 'Medium', 'Long'];

interface ScriptGenViewProps extends BoxProps {
    handleSubmit: (
        callback: (data: any) => void
    ) => (event: React.BaseSyntheticEvent) => Promise<void>;
    register: any;
    errors: any;
    isSubmitting: boolean;
    script: string;
    handleGenerateClick: (data: any) => void;
}

const ScriptGenView = (props: ScriptGenViewProps) => {
    const { handleSubmit, register, errors, isSubmitting, script, handleGenerateClick, ...rest } =
        props;
    const { onCopy, value, setValue, hasCopied } = useClipboard('');
    const { isOpen, onToggle } = useDisclosure();

    const rows = useBreakpointValue({ base: 10, md: 5 });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (script.length > 0) {
            setValue(script);
            onToggle();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [script]);

    useEffect(() => {
        if (value !== '' && textareaRef.current) {
            const textareaPosition =
                textareaRef.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: textareaPosition - 100, behavior: 'smooth' });
        }
    }, [value]);

    return (
        <Box mx="auto" p={{ base: 0, md: 8 }} {...rest}>
            <Box mx="auto" w={{ base: 'full', md: 'container.md' }}>
                <Text
                    fontSize={{ base: '2xl', md: '6xl' }}
                    fontWeight="bold"
                    mb={{ base: 4, md: 8 }}
                    textAlign="center"
                >
                    🐶 Shiba Script Generator
                </Text>
                <Box rounded="md" p={{ base: 4, md: 8 }} shadow={{ base: 'md', md: 'lg' }}>
                    <form onSubmit={handleSubmit(handleGenerateClick)}>
                        <Stack spacing="4" direction={{ base: 'column', md: 'row' }} mb={4}>
                            <FormControl isInvalid={errors.length}>
                                <FormLabel>Script Length</FormLabel>
                                <Select {...register('length')}>
                                    {scriptLengths.map((length) => (
                                        <option key={length} value={length}>
                                            {length}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.length && errors.length.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.style}>
                                <FormLabel>Script Style</FormLabel>
                                <Select {...register('style')}>
                                    {scriptStyles.map((style) => (
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
                                <FormLabel>Script Region</FormLabel>
                                <Select {...register('region')}>
                                    {scriptRegions.map((region) => (
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
                            <FormControl isInvalid={errors.description} isRequired>
                                <FormLabel>Input Description</FormLabel>
                                <Textarea {...register('description')} rows={rows} />
                                <FormErrorMessage>
                                    {errors.description && errors.description.message}
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
                                id="hashtag-generate"
                            >
                                Generate 🐾
                            </Button>
                        </Flex>
                    </form>
                </Box>
                {script.length > 0 && (
                    <Collapse in={isOpen} animateOpacity>
                        <Stack spacing={4}>
                            <Textarea
                                ref={textareaRef}
                                mt={4}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                rows={rows}
                            />
                            <Button
                                onClick={onCopy}
                                leftIcon={
                                    hasCopied ? (
                                        <Icon as={FiCheckCircle} />
                                    ) : (
                                        <Icon as={FiClipboard} />
                                    )
                                }
                            >
                                {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                        </Stack>
                    </Collapse>
                )}
            </Box>
        </Box>
    );
};

export default ScriptGenView;
