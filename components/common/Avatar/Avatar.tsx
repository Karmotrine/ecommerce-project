import { FC, useRef, useEffect } from 'react'
import Image from "next/image"
import { useUser } from "../../../lib/hooks/useUser"
import { Avatar } from "@mantine/core"

/**
 *  Functionality = OK (09/05/2022)
 */

interface Props {
    className?: string
    children?: any
}

export default function UiAvatar() {
    const user = useUser()
    const userAvatar = user.data?.photoURL
    return (
        <Avatar src={userAvatar} radius="xl"/>
    )
}
