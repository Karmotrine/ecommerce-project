import { FC, createContext } from "react"
import { AppShell, Aside } from "@mantine/core"
import UiNavbar from "./ui/UiNavbar"
import UiFooter from "./ui/UiFooter"

import { useUser } from "../lib/hooks/useUser"

export const ApplicationContainer : FC = ({children}) => {
    const user = useUser()
    return (
        <>
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
        </>
    )
} // export const ApplicationContainer : FC = ({children}) => {...}