import { FC, useEffect, useState, useCallback } from 'react'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app as firebaseClient, auth } from "../../lib/firebaseClient"
import { Modal, Group, Button } from "@mantine/core"

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful.
    // Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // Only Google as auth provider
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
}

export default function LoginView() {
    const authInstance = getAuth(firebaseClient)
    const [ user, loading, error ] = useAuthState(authInstance)
    const [ modalOpen, setModalOpen ] = useState(false);
    return (
        <>
            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Log in to your Account."
            >
                {error && (
                    <div className="text-red border border-red p-3">
                        An error occured. Please try again.
                    </div>
                )}
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </Modal>

            <Button 
            onClick={() => setModalOpen(true)}
            color="red"
            variant="outline"
            size="xs"
            compact={true}
            >
                Log-in
            </Button>
        </>
    )
}