import { Container, Grid, Image, Stack, Text, Center, Loader } from "@mantine/core";
import QuantityIncrementer from "../../components/QuantityIncrementer";
import ReviewContainer from "../../components/ReviewContainer";
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"
import NotFoundTitle from "../404"


export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId as string
    //const [name, setName] = useState("empty")
    const product = useProduct(slugId!)

    if (product.isLoading) {
        return (<Center><Loader color="red" size="xl"/></Center>)
    }
    if (product.isError || !product) {
        return(<>Something went wrong on getting product information.</>)
    }
    if (product.data == undefined) {
        return (<NotFoundTitle />)
    }
    return(
        <Container py={48}>
            <Grid columns={35}>
                <Grid.Col span={20}>
                    <Image
                        radius="xl"
                        alt="product image"
                        src={"https://cdn.shopify.com/s/files/1/0425/6812/2520/products/bentomeal1_503x.jpg?v=1594638975ample"}
                    />
                </Grid.Col>
                <Grid.Col span={15}>
                    <Stack justify="flex-start">
                        <Text>Maruzen Ramen Kit</Text>
                        <Text>Ramen</Text>
                        <Text>Each Maruzen Ramen Kit contains: 300g Ramen Noodles Pasta, 150g Ramen Paste, Nori Sheets</Text>
                        <QuantityIncrementer stockLeft={9999}/>
                    </Stack>
                </Grid.Col>
            </Grid>
            <Center>
                <Text>Reviews</Text>
            </Center>
            <ReviewContainer productId={product.data.id}/>            
        </Container>
    )
}