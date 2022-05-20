import { Container, Text, Divider, createStyles, List, Space } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Privacy() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>Privacy Policy</Text>
                <Divider />
                <Text align="justify">Imbento is commited to protecting and respecting your personal data privacy. This notice explains how we collect, protect, use, and share your information when you access our website and/or apply for or avail of our products and services.</Text>
                <Space />
                <Text size="xl">Personal information</Text>
                <Text>We collect the following personal information when you register your account through the website:</Text>
                <List withPadding listStyleType="disc">
                    <List.Item>Full name</List.Item>
                    <List.Item>Mobile number</List.Item>
                    <List.Item>Email address</List.Item>
                    <List.Item>Delivery address</List.Item>
                </List>
                <Text size="xl">Storage</Text>
                <Text align="justify">Your personal information shall be retained for as long as the purpose for which it was collected exists, and such other purposes that Imbento may introduce from time to time. It will remain in effect until such time that it is no longer required nor necessary to keep your information for any other legal, regulatory, or business purposes.</Text>
                <Text size="xl">Sharing of Personal Information</Text>
                <Text align="justify">We may share your personal information with our subsidaries, affiliates, and third parties, under an obligation of confidentiality.</Text>
                <Text size="xl">Changes to Privacy Policy</Text>
                <Text align="justify">We may modify or amend this Privacy Statement from time to time to keep up with any changes in relevant laws and regulations or on how we collect, use protect, store, or dispose of customer personal information. Any relevant updates will be posted on this website.</Text>
            </Container> 
        </>
    )
}