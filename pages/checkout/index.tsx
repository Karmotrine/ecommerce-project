import { Container, Center, Divider, Text, createStyles, Grid } from "@mantine/core"
import { useProduct } from "../../lib/hooks/useProduct"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Orders() {
    const { classes } = useStyles()
    const productTest = useProduct("Zv5fjo6Bdd2fgx99Q9dj")
    return (
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>Checkout</Text>
                <Divider />
                <Grid columns={35}>
                    <Grid.Col span={25}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum facilisis sodales. Maecenas eu luctus nulla. Nunc id purus ac tellus gravida semper at ut mauris. Curabitur non lacus mattis, dapibus ex blandit, pulvinar lacus. Duis tempor nisl luctus nisi lobortis lobortis. Cras blandit feugiat tellus, et luctus lectus pharetra vel. Ut dui eros, tincidunt at massa ac, feugiat convallis ipsum. Proin interdum arcu nibh, sit amet gravida ipsum viverra in. Nunc elementum rutrum sem, a interdum lacus aliquet quis. Curabitur nibh enim, pharetra ac urna ut, auctor tincidunt orci. Donec a aliquam ligula.
                        {productTest.data.name}
                        </Grid.Col>
                    <Grid.Col span={10}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum facilisis sodales. Maecenas eu luctus nulla. Nunc id purus ac tellus gravida semper at ut mauris. Curabitur non lacus mattis, dapibus ex blandit, pulvinar lacus. Duis tempor nisl luctus nisi lobortis lobortis. Cras blandit feugiat tellus, et luctus lectus pharetra vel. Ut dui eros, tincidunt at massa ac, feugiat convallis ipsum. Proin interdum arcu nibh, sit amet gravida ipsum viverra in. Nunc elementum rutrum sem, a interdum lacus aliquet quis. Curabitur nibh enim, pharetra ac urna ut, auctor tincidunt orci. Donec a aliquam ligula.
                        </Grid.Col>
                </Grid>
            </Container> 
        </>
    )
}