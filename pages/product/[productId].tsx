import { Container, Grid, Image, Stack, Text, Center, Loader, Group, Badge, LoadingOverlay} from "@mantine/core";
import QuantityIncrementer from "../../components/QuantityIncrementer";
import ReviewContainer from "../../components/ReviewContainer";
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"
import NotFoundTitle from "../404"
import { useViewportSize } from '@mantine/hooks';
import ProductSkeleton from "../../components/ProductSkeleton";
import { useUser } from "../../lib/hooks/useUser";
import { useCart } from "../../lib/hooks/useCart";
import { useProductReviews } from "../../lib/hooks/useReviews";
import ReviewCard from "../../components/ReviewCard";
import ReviewSkeleton from "../../components/ReviewSkeleton";


export default function Orders() {
    const user = useUser();
    const { height, width } = useViewportSize();
    const router = useRouter();
    const slugId = router.query.productId as string
    const product = useProduct(slugId!)
    const { addToCart, removeFromCart, getItem, setQuantity } = useCart();
    const reviews = useProductReviews(slugId!)

    if (product.isLoading) {
        return (
            <>
                <ProductSkeleton/>
                <LoadingOverlay 
                visible={product.isLoading} 
                radius="xl" 
                loader={<Loader color="red" size="xl"/>}
                transitionDuration={1500}
                />
            </>
        )
    }
    if (product.isError || !product) {
        return(
        <Container>
            <Text>Something went wrong on getting product information.</Text>
        </Container>
        )
    }
    if (product.data == undefined) {
        return (<NotFoundTitle />)
    }

    const cartItem = getItem(product.data)

    const price = parseInt(product.data.metadata.price)
    const discountFactor = parseInt(product.data.metadata.discount) / 100
    const discountedPrice = price - (price * discountFactor)
    return(
        <Container py={48}>
            <Grid columns={35}>
                <Grid.Col span={20}>
                    <Image
                        radius="xl"
                        alt="product image"
                        src={`${product.data.img[0].toString()}`}
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
                            <Group>
                                <Text size="lg" color="red">
                                    ₱<s>{product.data.metadata.price} </s>
                                </Text>
                                <Text 
                                    size="lg" 
                                    weight={500} 
                                    color="green"
                                >
                                    ₱{discountedPrice}</Text>
                                <Badge
                                    variant="gradient"
                                    gradient={{ from: 'teal', to: 'lime', deg: 105 } }
                                    size="sm"
                                >
                                    {product.data.metadata.discount}% off
                                </Badge>
                            </Group>
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
            <Center py={12}>
                <Text size="xl" weight={700}>Reviews</Text>
            </Center>
            {!user.data ? (
                <Container py={15}>
                    <Center>Please Log-in to write a review.</Center>
                </Container>
                ):
                <ReviewContainer productId={product.data.id}/>
            }
            {reviews.status === "loading" && <ReviewSkeleton />}
            {reviews.status === 'success' && 
                <>
                    {(reviews.data.length === 0 &&
                        <Container py={30}>
                            <Center>
                                <Text>
                                    There are no reviews for this product. Order now and be the first to write one!
                                </Text>
                            </Center>
                        </Container> 
                    )
                    }
                    {(reviews.data.map((review) => <ReviewCard key={review.id} {...review}/>))}
                </>
            }
            
        </Container>
    )
}