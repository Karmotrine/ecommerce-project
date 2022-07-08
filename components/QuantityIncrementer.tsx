import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, Button } from '@mantine/core';
import { ShoppingCartPlus, Heart } from "tabler-icons-react"
interface QTYIncrementerProps {
    productId: string
    stockLeft: number
}

export default function QuantityIncrementer(QTYIncrementerProps) {
  const [value, setValue] = useState(0);
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group>
        <Group spacing={5}>
        <ActionIcon size={38} variant="default" onClick={() => handlers.current.decrement()}>
            –
        </ActionIcon>

        <NumberInput
            hideControls
            value={value}
            onChange={(val) => setValue(val)}
            handlersRef={handlers}
            max={QTYIncrementerProps.stockLeft}
            min={1}
            step={1}
            styles={{ input: { width: 54, textAlign: 'center' } }}
        />

        <ActionIcon size={38} variant="default" onClick={() => handlers.current.increment()}>
            +
        </ActionIcon>
        </Group>
        <Group>
            <Button 
                color="red" 
                radius="xl"
                leftIcon={<ShoppingCartPlus />}
            >
                Add to cart
            </Button>
            <Button 
                variant="outline"
                radius="xl"
                color="red"
            >
                <Heart />
            </Button>
        </Group>
    </Group>
  );
}