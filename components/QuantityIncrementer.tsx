import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, 
         NumberInputHandlers, Button, Modal, 
         LoadingOverlay, Text } from '@mantine/core';
import { ShoppingCartPlus, Heart } from "tabler-icons-react"
import { useUser } from '../lib/hooks/useUser';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app as firebaseClient, auth } from "../lib/firebaseClient"
import { useRouter } from 'next/router';

interface QTYIncrementerProps {
    productId: string
    stockLeft: number
}

export default function QuantityIncrementer(QTYIncrementerProps) {
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
                onClick={userLogged.data ? null : () => setLoginModal(true)}
            >
                Add to cart
            </Button>
            <Button 
                variant="outline"
                radius="xl"
                color="red"
                onClick={userLogged.data ? null : () => setLoginModal(true)}
            >
                <Heart />
            </Button>
        </Group>
    </Group>
  );
}