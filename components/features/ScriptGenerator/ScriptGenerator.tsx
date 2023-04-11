import { HashtagGen } from '@/components/common/HashtagGen';
import { ScriptGen } from '@/components/common/ScriptGen';
import { hashtags2String } from '@/utils/utils';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import {
    Button,
    Flex,
    Heading,
    Icon,
    Textarea,
    useBreakpointValue,
    useClipboard
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useEffect, useRef, useState } from 'react';
import { FiCheckCircle, FiClipboard } from 'react-icons/fi';

const steps = [{ label: 'Script' }, { label: 'Hashtag' }];

const ScriptGenerator = ({
    variant
}: {
    variant: 'circles' | 'circles-alt' | 'simple' | undefined;
}) => {
    const [newScript, setNewScript] = useState<string>('');
    const [newHashtag, setNewHashtag] = useState<string[]>([]);
    const { onCopy, value, setValue, hasCopied } = useClipboard('');
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0
    });
    const isLastStep = activeStep === steps.length - 1;
    const hasCompletedAllSteps = activeStep === steps.length;
    const bg = useColorModeValue('gray.200', 'gray.700');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const rows = useBreakpointValue({ base: 15, md: 10 });

    const handleScriptChange = (newScript: string) => {
        console.log(newScript);
        setNewScript(newScript);
    };

    const handleHashtagChange = (newHashtag: string[]) => {
        console.log(newHashtag);
        setNewHashtag(newHashtag);
    };

    useEffect(() => {
        scrollToTop();
    }, [activeStep]);

    useEffect(() => {
        if (hasCompletedAllSteps) {
            setValue(newScript + '\n\n' + hashtags2String(newHashtag));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasCompletedAllSteps]);

    return (
        <Flex flexDir="column" width="100%" p={{ base: 4, md: 8 }}>
            <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
                <Step label="Script">
                    <ScriptGen onScriptChange={handleScriptChange} />
                </Step>
                <Step label="Hashtag">
                    <HashtagGen onHashtagsChange={handleHashtagChange} />
                </Step>
            </Steps>
            {hasCompletedAllSteps && (
                <>
                    <Box sx={{ bg, my: 4, p: 8, rounded: 'md' }}>
                        <Heading fontSize="xl" textAlign={'center'}>
                            Woohoo! Thank you for using SociAI! Here is your script and hashtags 😉
                        </Heading>
                    </Box>
                    <Textarea
                        value={value}
                        rows={rows}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button
                        w={'full'}
                        mt={4}
                        onClick={onCopy}
                        leftIcon={
                            hasCopied ? <Icon as={FiCheckCircle} /> : <Icon as={FiClipboard} />
                        }
                    >
                        {hasCopied ? 'Copied!' : 'Copy to Clipboard'}
                    </Button>
                </>
            )}
            <Flex width="100%" justify="flex-end" gap={4} mt={4}>
                {hasCompletedAllSteps ? (
                    <Button colorScheme="blue" onClick={reset}>
                        Restart
                    </Button>
                ) : (
                    <>
                        <Button isDisabled={activeStep === 0} onClick={prevStep} variant="ghost">
                            Prev
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                nextStep();
                            }}
                        >
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default ScriptGenerator;
