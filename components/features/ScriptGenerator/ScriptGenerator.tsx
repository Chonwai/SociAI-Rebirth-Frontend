import { HashtagGen } from '@/components/common/HashtagGen';
import { ScriptGen } from '@/components/common/ScriptGen';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

const steps = [{ label: 'Script' }, { label: 'Hashtag' }];

const ScriptGenerator = ({
    variant
}: {
    variant: 'circles' | 'circles-alt' | 'simple' | undefined;
}) => {
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0
    });
    const isLastStep = activeStep === steps.length - 1;
    const hasCompletedAllSteps = activeStep === steps.length;
    const bg = useColorModeValue('gray.200', 'gray.700');
    return (
        <Flex flexDir="column" width="100%" p={{ base: 4, md: 8 }}>
            <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
                <Step label="Script">
                    <ScriptGen />
                </Step>
                <Step label="Hashtag">
                    <HashtagGen />
                </Step>
            </Steps>
            {hasCompletedAllSteps && (
                <Box sx={{ bg, my: 8, p: 8, rounded: 'md' }}>
                    <Heading fontSize="xl" textAlign={'center'}>
                        Woohoo! You have completed all the steps! Thank you for using SociAI!
                    </Heading>
                </Box>
            )}
            <Flex width="100%" justify="flex-end" gap={4}>
                {hasCompletedAllSteps ? (
                    <Button colorScheme="blue" onClick={reset}>
                        Restart
                    </Button>
                ) : (
                    <>
                        <Button isDisabled={activeStep === 0} onClick={prevStep} variant="ghost">
                            Prev
                        </Button>
                        <Button colorScheme="blue" onClick={nextStep}>
                            {isLastStep ? 'Finish' : 'Next'}
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default ScriptGenerator;
