import { FC, useEffect, useState, useCallback } from 'react'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { app as firebaseClient, auth } from "../../lib/firebaseClient"
 
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful.
    // Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // Only Google as auth provider
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
}

const LoginView: FC = () => {
    const authInstance = getAuth(firebaseClient)
    const [ user, loading, error ] = useAuthState(authInstance)
    
    return (
        <div className="bg-stone-400 w-80 flex flex-col justify-between p-3">
            <div className="flex justify-center pb-12">
                {/* <Logo  width="64px" height="64px" /> */}
                <p>Log in to your Account.</p>
            </div>
            <div className="flex flex-col space-y-3">
                {error && (
                    <div className="text-red border border-red p-3">
                        An error occured. Please try again.
                    </div>
                )}
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div>
        </div>
    )

} // const LoginView: React.FC = () =>

export default LoginView
