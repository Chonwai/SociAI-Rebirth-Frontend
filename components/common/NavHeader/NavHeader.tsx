import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useColorMode,
    useDisclosure
} from '@chakra-ui/react';
import { useRef } from 'react';
import { data } from './data';
import { NavAccordion } from './NavAccordion';
import { NavLayout } from './NavLayout';

export const NavHeader = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <Box as="nav" bg="bg-surface" boxShadow="sm" borderBottom={'1px'} borderColor="gray.200">
            <NavLayout onClickMenu={onOpen} isMenuOpen={isOpen} onToggleMode={toggleColorMode} />
            <Drawer
                placement="left"
                initialFocusRef={menuButtonRef}
                isOpen={isOpen}
                onClose={onClose}
                size="full"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader padding="0">
                        <NavLayout
                            onClickMenu={onClose}
                            isMenuOpen={isOpen}
                            menuButtonRef={menuButtonRef}
                            onToggleMode={toggleColorMode}
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        <NavAccordion data={data} />
                        {/* <HStack mt="6">
                            <Button
                                flex="1"
                                colorScheme="blue"
                                variant="outline"
                                color="accent"
                                fontWeight="semibold"
                            >
                                Sign in
                            </Button>
                            <Button flex="1" colorScheme="blue" fontWeight="semibold">
                                Get started
                            </Button>
                        </HStack> */}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};
