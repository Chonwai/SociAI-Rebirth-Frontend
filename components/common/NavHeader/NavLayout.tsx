import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    HStack,
    Icon,
    IconButton,
    Spacer,
    StackDivider,
    Text,
    useColorMode
} from '@chakra-ui/react';
import Link from 'next/link';
import { RefObject } from 'react';
import { FiMenu, FiMoon, FiSearch, FiSun } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { data } from './data';
import { FaRegCommentDots } from 'react-icons/fa';

type NavLayoutProps = {
    onClickMenu?: VoidFunction;
    onToggleMode?: VoidFunction;
    isMenuOpen: boolean;
    menuButtonRef?: RefObject<HTMLButtonElement>;
};

export const NavLayout = (props: NavLayoutProps) => {
    const { onClickMenu, onToggleMode, isMenuOpen, menuButtonRef } = props;
    const { colorMode } = useColorMode();
    const MenuIcon = isMenuOpen ? MdClose : FiMenu;
    const items = data[0].items;
    return (
        <>
            <Flex height="16" align="center" justify="space-between" px={{ base: 4, md: 8 }}>
                {/* <Logo /> */}
                <Link href="/">
                    <Text fontSize="2xl" fontWeight="bold" color="accent">
                        SociAI
                    </Text>
                </Link>
                <HStack divider={<StackDivider height="6" alignSelf="unset" />}>
                    <IconButton
                        variant="ghost"
                        icon={
                            colorMode === 'light' ? (
                                <Icon as={FiMoon} fontSize="2xl" />
                            ) : (
                                <Icon as={FiSun} fontSize="2xl" />
                            )
                        }
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
            <Box height={'100%'} width={'100%'}>
                <Divider />
                <Flex
                    justify="space-between"
                    alignItems={'center'}
                    height="16"
                    px={{ base: 4, md: 8 }}
                    overflow={'scroll'}
                >
                    <ButtonGroup variant="ghost" spacing="4">
                        {items.map((item: any) => (
                            <Button
                                as={Link}
                                key={item.label}
                                leftIcon={<Icon as={item.icon} boxSize="5" />}
                                aria-label={item.label}
                                border={'1px'}
                                borderColor="gray.200"
                                href={item.href}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <Spacer />

                    <Button
                        minW={'4xs'}
                        ml={4}
                        as={Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        border={'1px'}
                        borderColor="gray.200"
                        leftIcon={<Icon as={FaRegCommentDots} />}
                        href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__ppuG5ZUQ0VXRlo4WVpNS1hLTDJGMEtJMTMzMVFHUS4u"
                    >
                        Feedback
                    </Button>
                </Flex>
            </Box>
        </>
    );
};
