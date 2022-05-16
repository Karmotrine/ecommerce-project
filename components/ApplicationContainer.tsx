import { FC } from "react"
import { AppShell, Navbar, Footer, Group, Header, Text, Loader } from "@mantine/core"
import UiNavbar from "./ui/UiNavbar"
import UiFooter from "./ui/UiFooter"

import { useUser } from "../lib/hooks/useUser"
import Image from "next/image"

export const ApplicationContainer : FC = ({children}) => {
    const user = useUser()
    return (
        <>
        { !!!user.isLoading ?
            <AppShell
                padding={0}
                header={<UiNavbar />}
                footer={<UiFooter />}
                styles={
                    (theme) => ({
                        main: {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                            marginTop:48,
                        },
                    })
                }
            >
                    {children}
            </AppShell>
        :
            <Loader />
        }
        </>
    )
} // export const ApplicationContainer : FC = ({children}) => {...}