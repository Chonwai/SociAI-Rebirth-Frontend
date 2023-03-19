// File Path: layouts/SimpleLayout.tsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { NavHeader } from '@/components/common/NavHeader/NavHeader';

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
            </Box>

            {/* footer */}
            <Box as="footer" py={4} bg="bg-surface" borderTop={'1px'} borderColor="gray.200">
                <Box maxW="container.xl" mx="auto" textAlign={'center'}>
                    <Text>&copy; {new Date().getFullYear()} SociAI, Inc. All rights reserved.</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default SimpleLayout;
