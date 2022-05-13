import { Header, Text , Button, Anchor, ActionIcon, useMantineColorScheme } from "@mantine/core"
import UiAvatar from "../common/Avatar/UiAvatar"
import { Sun, MoonStars } from 'tabler-icons-react'
import { Group } from "@mantine/core"
import { useUser } from "../../lib/hooks/useUser"
import Link from "next/link"

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
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    return (
        <Header
            
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
                                <Anchor size="xs" variant="text">{link.name}</Anchor>
                            </Link>
                        ))
                    }
                        <Button
                            size="xs"
                            color="red"
                            variant="outline"
                            compact={true}
                        >
                            Order Now
                        </Button>
                </Group>
                <Group>
                    {!!user.data ?
                    <UiAvatar />
                    :
                    <Link href={'/login'} passHref>
                        <Button 
                            color="red"
                            variant="outline"
                            size="xs"
                            compact={true}
                        >
                            Log-in
                        </Button>
                    </Link>
                    }
            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
              {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
                </Group>
            </Group>
            
        </Header>
    )
} // export default function UiNavbar() 
