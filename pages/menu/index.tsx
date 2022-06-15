import { Container, Text, Divider, createStyles, Center, Card, Image, SimpleGrid, Paper, Space } from "@mantine/core";
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
                <Space h="lg"/>
                <SimpleGrid cols={1}>
                    <Paper shadow="xs" p="md">
                        <Divider label="Ramen Kits" size="xl" />
                        <Space h="md" />
                        <SimpleGrid 
                            cols={3}
                            breakpoints={[
                                { maxWidth: 980, cols: 3, spacing: 'md' },
                                { maxWidth: 755, cols: 2, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                              ]}
                        >
                            {productTestData.map((product) => {
                                return (
                                        /* Add props: component="a", href="{dynamic product link}", target="_blank" */
                                        <Card
                                            shadow="sm"
                                            p="xl"
                                            key={product.name}
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
                                )
                            })}
                        </SimpleGrid>
                    </Paper>
                    <Paper shadow="xs" p="md">
                    <Divider label="Bento Kits" size="xl" />
                    <Space h="md" />
                        <SimpleGrid
                            cols={3}
                            breakpoints={[
                                { maxWidth: 980, cols: 3, spacing: 'md' },
                                { maxWidth: 755, cols: 2, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                              ]}
                        >
                            {productTestData2.map((product) => {
                                return (
                                        <Card
                                            shadow="sm"
                                            p="xl"
                                            key={product.name}
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
                                )
                            })}
                        </SimpleGrid>
                    </Paper>
                </SimpleGrid>
            </Container> 
        </>
    )
}
