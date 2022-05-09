import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
// import s
import { useUser } from '../../../lib/hooks/useUser'
import { useCart } from '../../../lib/hooks/useCart'

export default CartSidebarView: FC = () => {
    const user = useUser()
    const { cart } = useCart()
    const href = !!user.data ? '' : '/signin?redirect=/checkout'
}