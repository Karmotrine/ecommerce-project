import { Container, Center, Divider, Text, 
         createStyles, Grid, Box, Loader, LoadingOverlay } from "@mantine/core"
import CartContainer from "../../components/CartContainer"
import OrderSummary from "../../components/OrderSummary"
import { useCart } from "../../lib/hooks/useCart"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Checkout() {
    const { classes } = useStyles()
    const { cart } = useCart()

    return (
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>Cart</Text>
                <Divider py={5}/>
                {cart === undefined && 
                <LoadingOverlay
                    visible={cart === undefined} 
                    radius="xl" 
                    loader={<Loader color="red" size="xl"/>}
                    transitionDuration={1500}
                />
                }
                {cart.length === 0 && (
                    <Box sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                        padding: 30,
                        borderRadius: theme.radius.md
                    })}>
                        <Center>
                            <Text weight={300} size="xl">Your cart is currently empty.</Text>
                        </Center>
                    </Box>
                )}
                {cart.length > 0 && (
                <Grid columns={35}>
                    <Grid.Col span={22}>
                        <CartContainer />
                    </Grid.Col>
                    <Grid.Col span={13}>
                        <OrderSummary />
                    </Grid.Col>
                </Grid>
                )}
            </Container> 
        </>
    )
}