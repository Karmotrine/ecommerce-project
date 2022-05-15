import { Header, 
    Text , Button, Anchor, 
    ActionIcon, useMantineColorScheme, UnstyledButton,
    Menu, Divider, Group } from "@mantine/core"
import UiAvatar from "../common/Avatar/UiAvatar"
import { Sun, MoonStars, ChevronDown } from 'tabler-icons-react'
import { useUser } from "../../lib/hooks/useUser"
import Link from "next/link"
import { auth } from "../../lib/firebaseClient"
import { useRouter } from 'next/router'
import { useAuthSignOut } from '@react-query-firebase/auth';
import LoginView from "../auth/LoginView"

const NAVLINKS = [
    {
        name: 'menu',
        href: '/menu'
    },
    {
        name: 'location',
        href: '/location'
    },
]


export default function UiNavbar() {
    const user = useUser()
    const router = useRouter()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const signOut = useAuthSignOut(auth, {
        onSuccess(){
            router.push("/")
        },
    })

    return (
        <Header
        fixed={true}
            height={48}
            px={50}
            py={12}
        >
            <Group
                position="apart"
            >
                <Group >
                    <Link href="/" passHref>
                        <Anchor>
                            <Text>Imbento</Text>
                        </Anchor>
                    </Link>
                    {
                        NAVLINKS.map((link) => (
                            <Link key={link.href} href={link.href} passHref>
                                <Anchor component="a" size="xs" variant="text">{link.name}</Anchor>
                            </Link>
                        ))
                    }
                        <Button
                            size="xs"
                            color="red"
                            variant="filled"
                            compact={true}
                        >
                            Order Now
                        </Button>
                </Group>
                <Group>
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
                            <Divider />
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
