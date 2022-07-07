import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId
    const productTest = useProduct(slugId.toString())
    console.log(productTest)
    return (
        <Container py={48}>
            Test {slugId}
            
        </Container> 
    )
}