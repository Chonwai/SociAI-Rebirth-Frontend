import { Flex, HStack, Icon, IconButton, StackDivider, Text } from '@chakra-ui/react';
import { RefObject } from 'react';
import { FiMenu, FiSun } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
// import { Logo } from './Logo'

type NavLayoutProps = {
    onClickMenu?: VoidFunction;
    onToggleMode?: VoidFunction;
    isMenuOpen: boolean;
    menuButtonRef?: RefObject<HTMLButtonElement>;
};

export const NavLayout = (props: NavLayoutProps) => {
    const { onClickMenu, onToggleMode, isMenuOpen, menuButtonRef } = props;
    const MenuIcon = isMenuOpen ? MdClose : FiMenu;
    return (
        <Flex height="16" align="center" justify="space-between" px={{ base: 4, md: 8 }}>
            {/* <Logo /> */}
            <Text fontSize="2xl" fontWeight="bold" color="accent">
                T-Rex
            </Text>
            <HStack divider={<StackDivider height="6" alignSelf="unset" />}>
                <IconButton
                    variant="ghost"
                    icon={<Icon as={FiSun} fontSize="xl" />}
                    aria-label="Toggle color mode"
                    onClick={onToggleMode}
                />
                <IconButton
                    ref={menuButtonRef}
                    variant="ghost"
                    icon={<Icon as={MenuIcon} fontSize="2xl" />}
                    aria-label="Open Menu"
                    onClick={onClickMenu}
                />
            </HStack>
        </Flex>
    );
};
