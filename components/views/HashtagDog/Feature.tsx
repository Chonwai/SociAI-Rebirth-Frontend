import { Box, Container, Heading, Icon, SimpleGrid, Square, Stack, Text } from '@chakra-ui/react';
import { BsFillMoonFill, BsStars } from 'react-icons/bs';
import { IoRocketSharp } from 'react-icons/io5';

const features = [
    {
        name: '210+ Components',
        description: 'Chakra UI Pro has 210+ componentsto help you develop your project faster.',
        icon: BsStars
    },
    {
        name: 'Production Ready',
        description:
            'Effortlessly create your next production-ready experience with Chakra UI Pro components.',
        icon: IoRocketSharp
    },
    {
        name: 'Light & Dark',
        description: 'All components support a light and a dark color mode out of the box.',
        icon: BsFillMoonFill
    }
];

export const Feature = () => (
    <Box as="section" bg="bg-surface" py={{ base: '8', md: '12' }}>
        <Stack spacing={{ base: '12', md: '16' }}>
            <Stack spacing={{ base: '4', md: '5' }} align="center" textAlign="center">
                <Stack spacing="3">
                    <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold" color="accent">
                        Features
                    </Text>
                    <Heading size={{ base: 'sm', md: 'md' }}>What can you expect?</Heading>
                </Stack>
                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl">
                    A bundle of 210+ ready-to-use, responsive and accessible components with clever
                    structured sourcode files.
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
