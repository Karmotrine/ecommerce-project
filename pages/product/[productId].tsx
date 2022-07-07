import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId
    const productTest = useProduct(slugId.toString())
    const { name, id, description } = productTest.data
    const { price, type } = productTest.data.metadata
    return (
        <Container py={48}>
            {productTest.isLoading && "Loading product"}
            {(productTest.isError || productTest.data == undefined) && "something went wrong loading" }
            { 1 && <>{name}</>}
            { 1 && <>{id}</>}
            { 1 && <>{description}</>}
            { 1 && <>{price}</>}
            { 1 && <>{type}</>}
        </Container> 
    )
}