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
    const price = parseInt(product.data.metadata.price)
    const discountFactor = parseInt(product.data.metadata.discount) / 100
    const discountedPrice = price * discountFactor
    return(
        <Container py={48}>
            <Grid columns={35}>
                <Grid.Col span={20}>
                    <Image
                        radius="xl"
                        alt="product image"
                        src={product.data.images[0] as string}
                    />
                </Grid.Col>
                <Grid.Col span={15}>
                    <Stack justify="flex-start">
                        <Text>{product.data.name}</Text>
                        <Text size="xs">{product.data.metadata.type}</Text>
                        <Text size="xs">{product.data.metadata.stockLeft.toString()} Stocks Left</Text>
                            {product.data.metadata.discount == "0" ?
                            <Text size="lg">
                                ₱{product.data.metadata.price}
                            </Text> :
                            <>
                                <Text size="lg" color="red">
                                    ₱<s>{product.data.metadata.price} </s>
                                </Text>
                                <Text size="lg" weight={500}>{discountedPrice}</Text>
                                <Text size="sm">{product.data.metadata.discount}% off</Text>
                            </>
                            }
                        {
                        product.data.description ? 
                        <Text>{product.data.description}</Text> : 
                        <Text color="grey">No description</Text>
                        }
                        <QuantityIncrementer stockLeft={product.data.metadata.stockLeft}/>
                    </Stack>
                </Grid.Col>
            </Grid>
            <Center>
                <Text size="xl">Reviews</Text>
            </Center>
            <ReviewContainer productId={product.data.id}/>            
        </Container>
    )
}