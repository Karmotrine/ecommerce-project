import { Button, Container, Divider, Group, 
         NumberInput, Space, Stack, Text, 
         Image, Badge } from "@mantine/core";
import { X } from "tabler-icons-react";
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
                        {parseInt(item.metadata.discount) == 0 ?
                        <Text size="sm" weight={600}>₱{item.metadata.price}</Text> :
                        <Group spacing={1}>
                            <Text size="sm" weight={600}><s>₱{item.metadata.price}</s></Text>
                            <Space py={2}/>
                            <Text color="green" size="md" weight={600} sx={{ lineHeight: 1 }}>
                                ₱{parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100))}
                            </Text>
                        </Group>
                        }
                        <Space py={5} />
                        <Group spacing={1}>
                            <Badge color="red" size="sm">{item.metadata.type}</Badge>
                            {parseInt(item.metadata.discount) != 0 && (
                            <Badge
                                variant="gradient"
                                gradient={{ from: 'teal', to: 'lime', deg: 105 } }
                                size="md"
                            >
                                {item.metadata.discount}% off
                            </Badge>
                            )}
                        </Group>
                        <Space py={5} />
                        <Group> 
                            <NumberInput
                                style={{ flex: 1 }}
                                placeholder="Quantity"
                                label="Quantity"
                                defaultValue={item.quantity}
                                max={item.metadata.stockLeft}
                                min={1}
                                value={item.quantity}
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