// File Path: layouts/SimpleLayout.tsx

import React from 'react';
import { Box } from '@chakra-ui/react';
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
            <Box as="footer" bg="gray.100" p={4} px={{ base: 4, md: 8 }}>
                <Box maxW="container.xl" mx="auto" textAlign={'center'}>
                    <p>&copy; {new Date().getFullYear()} SociAI, Inc. All rights reserved.</p>
                </Box>
            </Box>
        </Box>
    );
};

export default SimpleLayout;
