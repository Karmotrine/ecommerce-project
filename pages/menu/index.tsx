import { Container, Text, Divider, createStyles, Center, Card, Button, Group, Image, SimpleGrid, Paper, Space } from "@mantine/core";
import productTestData from "../../product_testdata.json"
import productTestData2 from "../../product_testdata2.json"
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
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
                                            <Card.Section className={classes.section}>
                                                <Center>
                                                    <Image src={product.img} height={200} width={300} fit="cover" alt={`${product.name}_image`} />
                                                </Center>
                                            </Card.Section>
                                                <Text size="xl" weight="500">{product.name}</Text>
                                            <Text size="xs">{product.desc}</Text>
                                            <Card.Section className={classes.section}>
                                                <Group spacing={30}>
                                                    <div>
                                                        <Text size="xl" weight={400} sx={{ lineHeight: 1 }}>
                                                        {`₱${product.price}`}
                                                        </Text>
                                                        <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
                                                        per serving
                                                        </Text>
                                                    </div>

                                                    <Button radius="xl" style={{ flex: 1 }} color="red">
                                                        Add to cart
                                                    </Button>
                                                </Group>
                                            </Card.Section>
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
