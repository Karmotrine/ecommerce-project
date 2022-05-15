import Link from "next/link"
import { Footer, Text, Container, 
         Divider, createStyles, Group,
         Center, ActionIcon, Space,
         Stack, Anchor } from "@mantine/core"
import { FileX, Phone, Mail, BrandTwitter, BrandFacebook } from "tabler-icons-react";

const ABOUT_US_LINKS = [
    {
        name: "Our Story",
        href: "/aboutus"
    },
    {
        name: "Developers",
        href: "/aboutus/devs"
    },
    {
        name: "Terms of use",
        href: "/tos"
    },
    {
        name: "Privacy Policy",
        href: "/privacy"
    }
]

export default function UiFooter() {
    const useStyles = createStyles((theme) => ({
        footer: {
            marginTop: 120, 
            paddingTop: theme.spacing.xl * 2,
            paddingBottom: theme.spacing.xl * 2,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`
        },
        inner: {
            display: 'flex',
            justifyContent: 'space-between',
            [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
            }
        },
        section: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            minWidth: 200,
            maxWidth: 200,
            padding: 5
        },
        line: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft:10,
        },
        afterFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.xl,
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.xl,
            borderTop: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        
            [theme.fn.smallerThan('sm')]: {
              flexDirection: 'column',
            },
        },
    }))

    const { classes } = useStyles();


    return (
        <footer
            className={classes.footer}
        >
            <div>
                <Container className={classes.inner}>
                    <div className={classes.section}>
                        <Text size="xl" color="red">Store Hours</Text>
                        <Divider/>
                        <div>
                        <Text size="lg">Sta. Mesa Branch</Text>
                        <Text size="xs" color="dimmed">1016 Anonas, Sta. Mesa, Maynila, Kalakhang Maynila</Text>
                        <Text size="xs" color="dimmed">Monday-Sunday, 7:30 A.M. to 10 P.M.</Text>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <Text size="xl" color="red">Contact</Text>
                        <Divider/>
                        <div>
                            <Text size="lg">Sta. Mesa Branch</Text>
                            <div className={classes.line}>
                                <Phone size={26}/>
                                <Text size="xs" color="dimmed">+63-283-555-7846</Text>
                            </div>
                            <div className={classes.line}>
                                <Mail size={26}/>
                                <Text size="xs" color="dimmed">imbento.2122@gmail.com</Text>
                            </div>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <Text size="xl" color="red">Socials</Text>
                        <Divider/>
                        {/*Causes some Issues*/}
                        <div className={classes.line}>
                            <Stack spacing={5} align="flex-start">
                                <Anchor size="xs" variant="text" href="https://twitter.com/imbentoPH" target="_blank">
                                    <Group spacing={5}>
                                        <BrandTwitter />
                                        <p>@imbentoPH</p>
                                    </Group>
                                </Anchor>
                                <Anchor size="xs" variant="text" href="https://facebook.com/imbentoPH" target="_blank">
                                    <Group spacing={5}>
                                        <BrandFacebook />
                                        <p>imbentoPH</p>
                                    </Group>
                                </Anchor>
                            </Stack>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <Text size="xl" color="red">About us</Text>
                        <Divider/>
                        {
                            ABOUT_US_LINKS.map((link, index) => (
                                <Link key={index} href={link.href} passHref>
                                    <Anchor component="a">{link.name}</Anchor>
                                </Link>
                            ))
                        }
                    </div>
                </Container>
                <Container className={classes.afterFooter}>
                    <Text size="xs" color="dimmed">© 2022 Imbento.</Text>
                </Container>
            </div>
        </footer>
    )
}