// File Path: layouts/SimpleLayout.tsx

import React from 'react';
import { Box, Button, Text, Icon } from '@chakra-ui/react';
import { NavHeader } from '@/components/common/NavHeader/NavHeader';
import { FaRegCommentDots } from 'react-icons/fa';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const SimpleLayout = (props: DashboardLayoutProps) => {
    const { children } = props;
    return (
        <Box>
            {/* header */}
            <Box as="header">
                <NavHeader />
            </Box>

            {/* main content */}
            <Box maxW="container.xl" mx="auto" mb={4}>
                {children}
                <Button
                    position={'fixed'}
                    bottom={-1}
                    left={'7%'}
                    w={'140px'}
                    as="a"
                    href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__ppuG5ZUQ0VXRlo4WVpNS1hLTDJGMEtJMTMzMVFHUS4u"
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="blue"
                    size="md"
                    borderRadius={'none'}
                    borderTopRadius={'md'}
                    opacity={0.7}
                    p={4}
                    zIndex={20}
                    leftIcon={<Icon as={FaRegCommentDots} />}
                >
                    Feedback
                </Button>
            </Box>

            {/* footer */}
            <Box as="footer" py={4} bg="bg-surface" borderTop={'1px'} borderColor="gray.200">
                <Box maxW="container.xl" mx="auto" textAlign={'center'}>
                    <Text>&copy; {new Date().getFullYear()} T-Rex, Inc. All rights reserved.</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default SimpleLayout;
