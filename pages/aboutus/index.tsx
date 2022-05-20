import { Container, Text, Divider, createStyles, Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function AboutUs() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>About us</Text>
                <Divider />
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum facilisis sodales. Maecenas eu luctus nulla. Nunc id purus ac tellus gravida semper at ut mauris. Curabitur non lacus mattis, dapibus ex blandit, pulvinar lacus. Duis tempor nisl luctus nisi lobortis lobortis. Cras blandit feugiat tellus, et luctus lectus pharetra vel. Ut dui eros, tincidunt at massa ac, feugiat convallis ipsum. Proin interdum arcu nibh, sit amet gravida ipsum viverra in. Nunc elementum rutrum sem, a interdum lacus aliquet quis. Curabitur nibh enim, pharetra ac urna ut, auctor tincidunt orci. Donec a aliquam ligula.</Text>
            </Container> 
        </>
    )
}