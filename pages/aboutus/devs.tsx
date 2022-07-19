import { Container, Text, Divider, createStyles, Center } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Developers() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>Developers</Text>
                <Divider />
                <Text>
                    Elora C. Nava
                </Text>
                <Text>
                    Yuan Ragile C. Ureña
                </Text>
                <Text>
                    BSCS 2-3 (2021-2022)
                </Text>
            </Container> 
        </>
    )
}