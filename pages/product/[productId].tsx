import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../lib/firebaseClient"
import { useState } from "react"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId as string
    const [name, setName] = useState("empty")
    const productTest = async () => {
        const docRef = doc(firestore, "products", slugId)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data.name)
        } else {
            alert("Document does not exists.")
        }
    }

    return (
        <Container py={48}>
            Test : {name}
        </Container> 
    )
}