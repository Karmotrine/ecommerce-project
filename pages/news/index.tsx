import { Container, Text, Divider, 
    createStyles, Center,
    SimpleGrid, Paper, Space } from "@mantine/core";
import { limit, orderBy, where } from "firebase/firestore";
import { ArticleCard } from "../../components/ArticleCard";
import LoaderComp from "../../components/LoaderComp";
import ProductCard from "../../components/ProductCard";
import useContents from "../../lib/hooks/useContents";
import { useProducts } from "../../lib/hooks/useProducts";
import { Content, Product, ProductType } from "../../lib/types";


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

export function ArticleContext() {
    const { classes } = useStyles()
    const contents = useContents(
        ['news','all'], 
        [
            orderBy('created_at', 'desc'),
            limit(3)
        ]
    );
    if (contents.isLoading) {
        return(
            <>
                <LoaderComp />
            </>
        )
    }
    const data = contents.data as Content[]
    return (
        <Paper shadow="md" p="md">
            <Divider label="News" size="xl" />
            <Space h="md" />
            <SimpleGrid 
                cols={3}
                breakpoints={[
                    { maxWidth: 980, cols: 3, spacing: 'md' },
                    { maxWidth: 755, cols: 2, spacing: 'sm' },
                    { maxWidth: 600, cols: 1, spacing: 'sm' },
                ]}
            >
                {contents.isSuccess && data.map((item) => {
                    return (
                        <ArticleCard key={`${item.id}.ProductCard`} {...item}/>
                    )}
                )}
            </SimpleGrid>
        </Paper>
    )
}

export default function Articles() {
    const { classes } = useStyles()
    const contents = useContents(
        ['news','all'], 
        [
            orderBy('created_at', 'desc')
        ]
    );
    if (contents.isLoading) {
        return(
            <>
                <LoaderComp />
            </>
        )
    }
    const data = contents.data as Content[]
    return(
    <>
        <Container py={48}>
            <Center>
                <Text className={classes.headerFont}>News</Text>
            </Center>
            <Divider />
            <Space h="lg"/>
            <SimpleGrid cols={1}>
                    <Paper shadow="md" p="md">
                        <Divider label="News" size="xl" />
                        <Space h="md" />
                        <SimpleGrid 
                            cols={3}
                            breakpoints={[
                                { maxWidth: 980, cols: 3, spacing: 'md' },
                                { maxWidth: 755, cols: 2, spacing: 'sm' },
                                { maxWidth: 600, cols: 1, spacing: 'sm' },
                            ]}
                        >
                            {contents.isSuccess && data.map((item) => {
                                return (
                                    <ArticleCard key={`${item.id}.ProductCard`} {...item}/>
                                )}
                            )}
                        </SimpleGrid>
                    </Paper>
            </SimpleGrid>
        </Container> 
    </>
    )
}