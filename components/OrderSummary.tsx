import { Box, Button, Divider, Grid, Space, Stack, Text } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useCart } from "../lib/hooks/useCart";

export default function OrderSummary() {
    const { cart, total } = useCart()
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
                    return (
                    <React.Fragment key={`${item.id}orderSumList`}>
                        <Grid justify="space-between" align="center">
                            <Text weight={400} size="sm">{item.quantity}x {item.name}</Text>
                            <Text weight={400} size="sm">
                                ₱{item.quantity * parseInt(item.metadata.price)}
                            </Text>
                        {parseInt(item.metadata.discount) == 0 ?
                        <Text size="sm" weight={400}>
                            ₱{item.quantity * parseInt(item.metadata.price)}
                        </Text> :
                        <Text size="sm" weight={400}>
                            ₱{parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100))}
                        </Text>
                        }
                        </Grid>
                        <Divider/>
                    </React.Fragment>
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
                    <Text weight={700} size="lg">₱{total}</Text>
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