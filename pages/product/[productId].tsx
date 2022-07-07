import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId
    const productTest = useProduct(slugId.toString())
    return (
        <Container py={48}>
            {productTest.isLoading && "Loading product"}
            {(productTest.isError || productTest.data == undefined) && "something went wrong loading" }
        </Container> 
    )
}