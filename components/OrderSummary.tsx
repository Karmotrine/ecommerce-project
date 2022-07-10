import { Box, Button, Divider, Grid, Space, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useCart } from "../lib/hooks/useCart";

export default function OrderSummary() {
    const { cart } = useCart()
    const [ totalCost, setTotalCost ] = useState<number>(0)
    return (
        <Box sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: 30,
            borderRadius: theme.radius.md
        })}>
            <Text size="xl" weight={600}>Order Summary</Text>
            <Space py={18}/>
            <Stack>
                {cart.map((item) => {
                    setTotalCost((prevState) => (prevState + (item.quantity*parseFloat(item.metadata.price))));
                    return (
                    <>
                        <Grid justify="space-between" align="center">
                            <Text weight={400} size="sm">{item.quantity}x {item.name}</Text>
                            <Text weight={400} size="sm">${item.quantity * parseInt(item.metadata.price)}</Text>
                        </Grid>
                        <Divider/>
                    </>
                )})}
                <>
                    <Grid justify="space-between" align="center">
                        <Text weight={400} size="sm">Shipping</Text>
                        <Text weight={400} size="sm">TBC</Text>
                    </Grid>
                    <Divider/>
                </>
                <Grid justify="space-between" align="center">
                    <Text weight={700} size="lg">Total</Text>
                    <Text weight={700} size="lg">₱{totalCost}</Text>
                </Grid>
                <Space py={3} />
                <Button 
                    variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                    radius="xl"
                >Checkout
                </Button>
            </Stack>
        </Box>
    )
}