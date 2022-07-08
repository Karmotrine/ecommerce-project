import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../lib/firebaseClient"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId as string
    const docRef = doc(firestore, "products", slugId)
    const productTest = async () => await getDoc(docRef);

    return (
        <Container py={48}>
            Test : {productTest.toString}
        </Container> 
    )
}