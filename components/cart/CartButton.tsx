import { FC } from "react"
import { useRouter } from 'next/router'
import { useUser } from "../../lib/hooks/useUser"
import { useCart } from "../../lib/hooks/useCart"

const CartButton: FC = () => {
    const user = useUser()
    const { cart } = useCart()
    // Decide if to use modal log-in.
    const href = !!user.data ? '/checkout' : '/signin?redirect=/checkout'
    
    return (
        <a  className="group relative w-10 h-10 flex items-center justify-center">
            {cart.length > 0 && (
                <span className="absolute text-xs font-medium bottom-0 left-0 w-5 h-5 flex items-center justify-center rounded-full bg-white border border-gray-300">
                    {cart.length}
                </span>
            )}
        </a>
    )
}

export default CartButton