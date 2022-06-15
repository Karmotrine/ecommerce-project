import { Container, Text, Divider, createStyles, Center, Card, Image, SimpleGrid } from "@mantine/core";
import productTestData from "../../product_testdata.json"
import productTestData2 from "../../product_testdata2.json"
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Menu() {
    const { classes } = useStyles()

    return(
        <>
            <Container py={48}>
                <Center>
                    <Text className={classes.headerFont}>Menu</Text>
                </Center>
                <Divider />
                <Text size="xl">Ramen Kits</Text>
                <SimpleGrid cols={3}>
                    {productTestData.map((product) => {
                        return (
                            <>
                                {/* Add props: component="a", href="{dynamic product link}", target="_blank" */}
                                <Card
                                    shadow="sm"
                                    p="xl"
                                >
                                    <Card.Section>
                                        <Center>
                                            <Image src={product.img} height={200} width={300} fit="cover" alt={`${product.name}_image`} />
                                        </Center>
                                    </Card.Section>

                                    <Text size="lg">{product.name}</Text>

                                    <Text size="xs">{product.desc}</Text>
                                    <Text size="md">{`₱${product.price}`}</Text>
                                </Card>
                            </>
                        )
                    })}
                </SimpleGrid>
                <Text>Bento kits</Text>
                <SimpleGrid cols={3}>
                    {productTestData2.map((product) => {
                        return (
                            <>
                                {/* Add props: component="a", href="{dynamic product link}", target="_blank" */}
                                <Card
                                    shadow="sm"
                                    p="xl"
                                >
                                    <Card.Section>
                                        <Center>
                                            <Image src={product.img} height={200} width={300} fit="cover" alt={`${product.name}_image`} />
                                        </Center>
                                    </Card.Section>

                                    <Text size="lg">{product.name}</Text>

                                    <Text size="xs">{product.desc}</Text>
                                    <Text size="md">{`₱${product.price}`}</Text>
                                </Card>
                            </>
                        )
                    })}
                </SimpleGrid>

            </Container> 
        </>
    )
}
