import {
    Box,
    BoxProps,
    Container,
    Heading,
    Icon,
    SimpleGrid,
    Square,
    Stack,
    Text
} from '@chakra-ui/react';
import { BsFillMoonFill, BsStars } from 'react-icons/bs';
import { IoRocketSharp } from 'react-icons/io5';

const features = [
    {
        name: 'Fast to Use',
        description: 'Type in your description/topics and generate your script at a glimpse.',
        icon: BsStars
    },
    {
        name: 'Grab and Use',
        description: 'Copy the script to use; Simple and Easy to use.',
        icon: IoRocketSharp
    },
    {
        name: 'Analytics',
        description: 'Upcoming script analytics funtionality.',
        icon: BsFillMoonFill
    }
];

export const Feature = (props: BoxProps) => {
    const { ...rest } = props;
    return (
        <Box as="section" bg="bg-surface" py={{ base: '8', md: '12' }} {...rest}>
            <Stack spacing={{ base: '12', md: '16' }}>
                <Stack spacing={{ base: '4', md: '5' }} align="center" textAlign="center">
                    <Stack spacing="3">
                        <Text
                            fontSize={{ base: 'sm', md: 'md' }}
                            fontWeight="semibold"
                            color="accent"
                        >
                            Features
                        </Text>
                        <Heading size={{ base: 'sm', md: 'md' }}>What can you expect?</Heading>
                    </Stack>
                    <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
                        Most flexible and user friendly script generator. Quick and simple solution.
                    </Text>
                </Stack>
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    columnGap={8}
                    rowGap={{ base: 10, md: 16 }}
                >
                    {features.map((feature) => (
                        <Stack
                            key={feature.name}
                            spacing={{ base: '4', md: '5' }}
                            align="center"
                            textAlign="center"
                        >
                            <Square
                                size={{ base: '10', md: '12' }}
                                bg="accent"
                                color="inverted"
                                borderRadius="lg"
                            >
                                <Icon as={feature.icon} boxSize={{ base: '5', md: '6' }} />
                            </Square>
                            <Stack spacing={{ base: '1', md: '2' }}>
                                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="medium">
                                    {feature.name}
                                </Text>
                                <Text color="muted">{feature.description}</Text>
                            </Stack>
                        </Stack>
                    ))}
                </SimpleGrid>
            </Stack>
        </Box>
    );
};
