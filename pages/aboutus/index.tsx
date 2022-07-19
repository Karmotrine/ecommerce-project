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
                <Text>Ramen is the ultimate comfort food, and it&apos;s best when enjoyed hot, fresh, and in good company. Imbento is our way of bringing the experience of ramen into your home. Perfect for noodle enthusiasts, busy professionals, a fun date-night in or quality time in the kitchen with the family, our ramen kits are ready in 15 minutes and feature high-quality, locally sourced ingredients.</Text>
            </Container> 
        </>
    )
}