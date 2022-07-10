import { Container, Center, Divider, Text, 
         createStyles, Grid, Box, Space, Stack, 
         Button, Image, Group, Badge, NumberInput } from "@mantine/core"
import { X } from "tabler-icons-react"
import CartContainer from "../../components/CartContainer"
import { useCart } from "../../lib/hooks/useCart"
import { useProduct } from "../../lib/hooks/useProduct"

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
                <Text className={classes.headerFont}>Checkout</Text>
                <Divider py={5}/>
                <Grid columns={35}>
                    <Grid.Col span={22}>
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
                            <CartContainer />
                        )}
                    </Grid.Col>
                    <Grid.Col span={13}>
                        <Box sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                            padding: 30,
                            borderRadius: theme.radius.md
                        })}>
                            <Text size="xl" weight={600}>Order Summary</Text>
                            <Space py={18}/>
                            <Stack>
                                <>
                                    <Grid justify="space-between" align="center">
                                        <Text weight={400} size="sm">1x Chipinga</Text>
                                        <Text weight={400} size="sm">$1</Text>
                                    </Grid>
                                    <Divider/>
                                </>
                                <>
                                    <Grid justify="space-between" align="center">
                                        <Text weight={400} size="sm">VAT (12%)</Text>
                                        <Text weight={400} size="sm">$1</Text>
                                    </Grid>
                                    <Divider/>
                                </>
                                <>
                                    <Grid justify="space-between" align="center">
                                        <Text weight={400} size="sm">Shipping</Text>
                                        <Text weight={400} size="sm">$1</Text>
                                    </Grid>
                                    <Divider/>
                                </>
                                <Grid justify="space-between" align="center">
                                    <Text weight={700} size="lg">Total</Text>
                                    <Text weight={700} size="lg">$1</Text>
                                </Grid>
                                <Space py={3} />
                                <Button 
                                    variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                                    radius="xl"
                                >Checkout
                                </Button>
                            </Stack>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Container> 
        </>
    )
}