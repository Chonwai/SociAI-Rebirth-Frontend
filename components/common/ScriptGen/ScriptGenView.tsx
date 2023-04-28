import {
    getLanguages,
    getRegions,
    getScriptLengths,
    getSocialMedias,
    getTones
} from '@/utils/utils';
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
    Icon,
    Input,
    keyframes
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FiCheckCircle, FiClipboard } from 'react-icons/fi';
import { FaDog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Bounce } from '@/utils/animation';

const scriptStyles = getSocialMedias();
const scriptRegions = getRegions();
const scriptLengths = getScriptLengths();
const scriptTones = getTones();
const scriptLanguages = getLanguages();

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

    const animation = `${Bounce} 1s ease-in-out infinite`;

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
            window.scrollTo({ top: textareaPosition - 50, behavior: 'smooth' });
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
                            <FormControl isInvalid={errors.tone}>
                                <FormLabel>Script Tone</FormLabel>
                                <Select {...register('tone')}>
                                    {scriptTones.map((tone) => (
                                        <option key={tone} value={tone}>
                                            {tone}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.tone && errors.tone.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.language}>
                                <FormLabel>Script Language</FormLabel>
                                <Select {...register('language')}>
                                    {scriptLanguages.map((language) => (
                                        <option key={language} value={language}>
                                            {language}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>
                                    {errors.language && errors.language.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.hashtagCount}>
                                <FormLabel htmlFor="hashtagCount">Hashtags Amount (1-20)</FormLabel>
                                <Input
                                    type={'number'}
                                    id="hashtagCount"
                                    placeholder="number"
                                    min={1}
                                    max={20}
                                    {...register('hashtagCount')}
                                />
                                <FormErrorMessage>
                                    {errors.hashtagCount && errors.hashtagCount.message}
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
                        <Stack spacing={4} mt={4} justifyContent={'center'} alignItems={'center'}>
                            <Text fontWeight={'bold'} fontSize={'xl'}>
                                Do you want to get more hashtags?
                            </Text>
                            <Box as={motion.div} animation={animation} mt={4}>
                                <Icon as={FaDog} mr={1} color={'red'} />
                                <Icon as={FaDog} mr={1} color={'orange'} />
                                <Icon as={FaDog} mr={1} color={'yellow'} />
                                <Button
                                    as="a"
                                    px={2}
                                    href={`/hashtag-dog?pre_script=${value}`}
                                    variant="link"
                                >
                                    Click Here!
                                </Button>
                                <Icon as={FaDog} mr={1} color={'green'} />
                                <Icon as={FaDog} mr={1} color={'blue'} />
                                <Icon as={FaDog} mr={1} color={'purple'} />
                            </Box>
                        </Stack>
                    </Collapse>
                )}
            </Box>
        </Box>
    );
};

export default ScriptGenView;
