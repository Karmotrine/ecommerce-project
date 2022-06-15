import { FC } from "react"
import { useRouter } from 'next/router'
import { useUser } from "../../lib/hooks/useUser"
import { useCart } from "../../lib/hooks/useCart"
import { ShoppingCart } from "tabler-icons-react"
import { createStyles, Anchor } from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    indicator:{
        display: "flex",
        position: "absolute", 
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        fontSize: theme.fontSizes.xs - (theme.fontSizes.xs * 0.40),
        lineHeight: theme.fontSizes.xs - (theme.fontSizes.xs * 0.40),
        fontWeight: 600,
        justifyContent: "center",
        alignItems: "center",
        width: theme.fontSizes.xs - (theme.fontSizes.xs * 0.0625),
        height: theme.fontSizes.xs - (theme.fontSizes.xs * 0.0625), 
        borderRadius: 500, 
        borderWidth: 20,
        borderColor: "black", 
        outline:"groove",
        outlineWidth:0.25,
    },
    group: {
        display: "flex",
        position: "relative", 
        justifyContent: "center", 
        alignItems: "center",
        width: theme.fontSizes.md + 1.5,
        height: theme.fontSizes.md + 1.5, 

    }
}))

const CartButton: FC = () => {
    const user = useUser()
    const { cart } = useCart()
    const { classes } = useStyles()
    // Decide if to use modal log-in.
    const href = !!user.data ? '/checkout' : '/signin?redirect=/checkout'
    
    return (
        <Link href="/checkout" passHref>
            <Anchor component="a">
                <div className={classes.group}>
                    <ShoppingCart size={50} />
                    {cart.length > 0 && (
                        <div className={classes.indicator}>
                            {cart.length}
                        </div>
                    )}
                </div>  
            </Anchor>
        </Link>
    )
}

export default CartButton