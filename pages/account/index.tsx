import { Center, Container, Paper, Title, Text, Space, Box, Button } from "@mantine/core";
import { useUser } from "../../lib/hooks/useUser";
import { useAuthSignOut } from '@react-query-firebase/auth';
import NotFoundTitle from "../404";
import { Check } from "tabler-icons-react";
import { auth } from "../../lib/firebaseClient";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

const LOGOUT_NOTIFICATION = {
    title: 'User logged out.',
    message: 'You have successfully logged out.',
    color: 'red',
    icon: <Check size="md" />,
}

export default function Account(){
    const user  = useUser()
    const router = useRouter()
    const signOut = useAuthSignOut(auth, {
        onSuccess(){
            localStorage.clear()
            router.push("/")
            showNotification(LOGOUT_NOTIFICATION)
        },
    })

    if (!user.data) {
        return (
            <NotFoundTitle />
        )
    }
    return (
        <>
        <Container py={160}>
            <Center>
                <Paper shadow="xs" p="md">
                    <Box style={{width:500, height:200, paddingInline:8, paddingTop:12, paddingBottom:12}}>
                        <Title>Your Account</Title>
                        <Space py={10}/>
                        <Text weight={300}>Name: {user.data.displayName}</Text>
                        <Text weight={300}>Email address: {user.data.email}</Text>
                        <Text weight={300}>User ID: {user.data.uid}</Text>
                        <Space py={4}/>
                        <Button 
                            color="red" 
                            fullWidth
                            onClick={() => {}}
                        >
                            Log-out
                        </Button>
                    </Box>
                </Paper>
            </Center>
        </Container>
        </>
    )
}