import { Button, Container, Divider, Group, 
         NumberInput, Space, Stack, Text, Image } from "@mantine/core";
import { Badge, X } from "tabler-icons-react";
import { useCart } from "../lib/hooks/useCart";

export default function CartContainer() {
    const { cart, setQuantity, removeFromCart} = useCart()
    return (
        <>
            {cart.map((item) =>(
            <Container key={item.id}>
                <Group>
                    <Image 
                        radius="lg" 
                        src={item.img[0]}
                        alt={item.name}
                        width={100}
                        height={100}
                    />
                    <Stack spacing={0} align="flex-start">
                        <Space py={5}/>
                        <Text size="lg" weight={600}>{item.name}</Text>
                        <Text size="sm" weight={600}>{item.metadata.price}</Text>
                        <Space py={5} />
                        <Badge color="red" size="sm">{item.metadata.type}</Badge>
                        <Space py={5} />
                        <Group> 
                            <NumberInput
                                placeholder="Quantity"
                                label="Quantity"
                                defaultValue={item.quantity}
                                max={item.metadata.stockLeft}
                                min={1}
                                onChange={(e) => {
                                    let quantity = e
                                    if (isNaN(quantity) || quantity < 1)
                                        quantity = 1;
                                    if (quantity > 100)
                                        quantity = item.metadata.stockLeft;
                                    setQuantity(item, quantity)
                                }}
                            />
                            <Stack>
                                <Space py={4}/>
                                <Button
                                    variant="outline"
                                    radius="xl"
                                    color="red"
                                    onClick={() => removeFromCart(item)}
                                >
                                    <X />
                                </Button>
                            </Stack>
                        </Group>
                        
                    </Stack>
                </Group>
                <Space py={10} />
                <Divider />
            </Container>
            ))}
        </>
    )
}