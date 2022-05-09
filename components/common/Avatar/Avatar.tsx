import { FC, useRef, useEffect } from 'react'
import Image from "next/image"
import { useUser } from "../../../lib/hooks/useUser"

/**
 *  Functionality = OK (09/05/2022)
 */

interface Props {
    className?: string
    children?: any
}

const Avatar: FC<Props> = ({}) => {
    const user = useUser()
    let ref = useRef() as React.MutableRefObject<HTMLInputElement>
    let userAvatar = user.data?.photoURL
    return (
        <div
            ref={ref}
            className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear relative"
        >
            {
                !!user.data?.photoURL ?
                <Image
                    alt={'User Avatar'}
                    src={user.data?.photoURL}
                    placeholder="blur"
                    blurDataURL={user.data?.photoURL}
                    objectFit="cover"
                    loading="lazy"
                    layout="fill"
                    className="rounded-full"
                /> :
                <>
                    <div className="bg-white h-8 w-8 rounded-full"></div>
                </>
            }
        </div>
    )
}

export default Avatar