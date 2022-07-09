import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, 
         NumberInputHandlers, Button, Modal, 
         LoadingOverlay, Text } from '@mantine/core';
import { ShoppingCartPlus, X } from "tabler-icons-react"
import { useUser } from '../lib/hooks/useUser';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app as firebaseClient, auth } from "../lib/firebaseClient"
import { useRouter } from 'next/router';
import { useCart } from '../lib/hooks/useCart';
import { Product as ProductType } from '../lib/types';

export default function QuantityIncrementer(Product:ProductType) {
    const { asPath } = useRouter();
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful.
        // Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: asPath,
        // Only Google as auth provider
        signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    }
    const authInstance = getAuth(firebaseClient)
    const [ user, loading, error ] = useAuthState(authInstance)

    const [value, setValue] = useState(1);
    const handlers = useRef<NumberInputHandlers>();
    const [ loginModal, setLoginModal ] = useState(false)
    const userLogged = useUser()
    
    const { addToCart, removeFromCart, getItem, setQuantity } = useCart();
    const cartItem = getItem(Product)

  return (
    <Group>
        <Modal
            opened={loginModal}
            onClose={() => setLoginModal(false)}
            title="Please log-in to continue."
        >
             <LoadingOverlay visible={loading} />
             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
             {error && <Text size="xs" color="red">Error logging-in, please try again.</Text>}
        </Modal>
        { !!userLogged && !!cartItem &&
            <Group spacing={5}>
                <ActionIcon size={38} variant="default" onClick={() => handlers.current.decrement()}>
                    –
                </ActionIcon>

                <NumberInput
                    hideControls
                    value={cartItem.quantity}
                    onChange={(e) => {
                            let quantity = e as number
                            if (isNaN(quantity) || quantity < 1)
                                quantity = 1;
                            if (quantity > Product.metadata.stockLeft)
                                quantity = Product.metadata.stockLeft;
                            setQuantity(Product!, quantity)
                        }
                    }
                    handlersRef={handlers}
                    max={Product.metadata.stockLeft}
                    min={1}
                    step={1}
                    styles={{ input: { width: 54, textAlign: 'center' } }}
                />

                <ActionIcon size={38} variant="default" onClick={() => handlers.current.increment()}>
                    +
                </ActionIcon>
            </Group>
        }
        <Group>
            <Button 
                color="red" 
                radius="xl"
                leftIcon={<ShoppingCartPlus />}
                onClick={userLogged.data ? 
                         () => addToCart(Product) : 
                         () => setLoginModal(true)}
            >
                Add to cart
            </Button>
            {!!cartItem && !!userLogged &&
                <Button 
                    variant="outline"
                    radius="xl"
                    color="red"
                    onClick={userLogged.data && !! cartItem ? 
                            () => removeFromCart(Product) : 
                            () => setLoginModal(true)}
                >
                    <X />
                </Button>
            }
        </Group>
    </Group>
  );
}