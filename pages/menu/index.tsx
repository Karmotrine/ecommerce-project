import { Container, Text, Divider, 
         createStyles, Center,
         SimpleGrid, Paper, Space } from "@mantine/core";
import { where } from "firebase/firestore";
import LoaderComp from "../../components/LoaderComp";
import ProductCard from "../../components/ProductCard";
import { useProducts } from "../../lib/hooks/useProducts";
import { Product, ProductType } from "../../lib/types";


type PTypeSubsectionProps = {
    title: String;
    type: ProductType;
}

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
                    <ProductTypeSubsection title="Ramen kits" type="ramen"/>
                    <ProductTypeSubsection title="Bento kits" type="bento"/>
                </SimpleGrid>
            </Container> 
        </>
    )
}

function ProductTypeSubsection({title, type}:PTypeSubsectionProps) {
    const products = useProducts(
        ['product', type], 
        [
            where('metadata.type', '==', type),
            where('active', '==', true)
        ]
    );
    if (products.isLoading) {
        return(
            <>
                <LoaderComp />
            </>
        )
    }
    const data = products.data as Product[]
    return (
        <>
        <Paper shadow="xs" p="md">
            <Divider label={title} size="xl" />
            <Space h="md" />
            <SimpleGrid 
                cols={3}
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
            >
                {products.isSuccess && data.map((product) => {
                    return (
                        <ProductCard key={`${product.name}.ProductCard`} {...product}/>
                    )}
                )}
            </SimpleGrid>
        </Paper>
    </>
    )
}
