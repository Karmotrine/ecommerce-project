import { Header, 
    Text , Button, Anchor, 
    ActionIcon, useMantineColorScheme, UnstyledButton,
    Menu, Divider, Group, Container, Modal } from "@mantine/core"
import UiAvatar from "../common/Avatar/UiAvatar"
import { Sun, MoonStars, ChevronDown } from 'tabler-icons-react'
import { useUser } from "../../lib/hooks/useUser"
import Link from "next/link"
import { auth } from "../../lib/firebaseClient"
import { useRouter } from 'next/router'
import { useAuthSignOut } from '@react-query-firebase/auth';
import LoginView from "../auth/LoginView"
import { showNotification } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';
import CartButton from "../cart/CartButton"
import Image from "next/image"
import { useState } from "react"
import OrderModalForm from "../OrderModalForm"
import useOrderModal from "../hooks/useOrderModal"
import { useCart } from "../../lib/hooks/useCart"

const NAVLINKS = [
    {
        name: 'menu',
        href: '/menu'
    },
    {
        name: 'location',
        href: '/location'
    },
    {
        name: 'news',
        href: '/news'
    }
]

const LOGOUT_NOTIFICATION = {
    title: 'User logged out.',
    message: 'You have successfully logged out.',
    color: 'red',
    icon: <Check size="md" />,
}


export default function UiNavbar() {
    const user = useUser()
    const router = useRouter()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const signOut = useAuthSignOut(auth, {
        onSuccess(){
            localStorage.clear()
            router.reload()
            showNotification(LOGOUT_NOTIFICATION)
        },
    })
    const { isActive, setOrderActive } = useOrderModal((state) => state);

    return (
        <Header
        fixed={true}
            height={48}
            px={50}
            py={6}
        >
            <Group
                position="apart"
            >
                <Group >
                    <Link href="/" passHref>
                        <Anchor>
                            <Image src="/logo.png" alt="logo" width="60px "height="35px" />
                        </Anchor>
                    </Link>
                    {
                        NAVLINKS.map((link) => (
                            <Link key={link.href} href={link.href} passHref>
                                <Anchor component="a" size="xs" variant="text">{link.name}</Anchor>
                            </Link>
                        ))
                    }
                    <Modal
                        opened={isActive}
                        onClose={() => setOrderActive(isActive)}
                        title="Order Now"
                        size="lg"
                    >
                        {OrderModalForm()}
                    </Modal>
                    <Button
                        size="xs"
                        color="red"
                        variant="filled"
                        compact={true}
                        onClick={() => setOrderActive(isActive)}
                    >
                        Order Now
                    </Button>
                </Group>
                <Group>
                    <CartButton />
                    {!!user.data ?
                    <UnstyledButton>
                        <Menu
                            withArrow
                            control={
                                <Group
                                    spacing={6}
                                >
                                    <UiAvatar />
                                    <Group
                                        spacing={2}
                                    >
                                        <Text size="xs">{user.data.displayName}</Text>
                                        <ChevronDown size={9} />
                                    </Group>
                                </Group>
                            }
                        >
                            <Menu.Label>
                                Logged in as:
                                <Text size="md">{user.data.displayName}</Text>
                                <Text size="xs" color="dimmed">{user.data.email}</Text>
                            </Menu.Label>
                            {(user.data.uid === process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) && (
                                <>
                                    <Divider />
                                        <Menu.Label>Admin Panel</Menu.Label>
                                        <Menu.Item onClick={() => router.push("/admin/products")}>Manage Products</Menu.Item>
                                        <Menu.Item onClick={() => router.push("/admin/orders")}>Manage Orders</Menu.Item>
                                        <Menu.Item onClick={() => router.push("/admin/articles")}>Manage Articles</Menu.Item>
                                </>
                            )}
                            <Divider />
                                <Menu.Label>Account Panel</Menu.Label>
                                <Menu.Item onClick={() => router.push("/account")}>Account Settings</Menu.Item>
                                <Menu.Item onClick={() => router.push("/account/orders")}>My Orders</Menu.Item>
                            <Divider />
                            <Menu.Item 
                                color="red"
                                onClick={() => signOut.mutate()}
                                disabled={signOut.isLoading}
                            >
                                Sign-out
                            </Menu.Item>
                        </Menu>
                    </UnstyledButton>
                    :
                        <LoginView />
                    }
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
                </Group>
            </Group>     
        </Header>
    )
} // export default function UiNavbar() 
