import { FC } from "react"
import { AppShell, Navbar, Footer, Group, Header, Text, Loader } from "@mantine/core"
import { UiNavbar } from "./ui/UiNavbar"
import UiAvatar from "./common/Avatar/Avatar"
import { useUser } from "../lib/hooks/useUser"
import Image from "next/image"

export const ApplicationContainer : FC = ({children}) => {
    const user = useUser()
    return (
        <>
        { !!!user.isLoading ?
        <AppShell
            padding="md"
            header={        
                <Navbar
                    className="sticky max-h-12 min-w-screen bg-blue-400"
                >
                    <div>
                        Sample Navbar
                    </div>
                    <UiAvatar />
                </Navbar>}
        >
            {children}
        </AppShell>
        :
        <Loader />
        }
        </>
    )
} // export const ApplicationContainer : FC = ({children}) => {...}