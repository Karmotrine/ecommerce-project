import { Container } from "@mantine/core"
import { useRouter } from "next/router"
import { useProduct } from "../../lib/hooks/useProduct"
import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../lib/firebaseClient"
import { useState, useEffect } from "react"
import NotFoundTitle from "../404"

export default function Orders() {
    const router = useRouter();
    const slugId = router.query.productId as string
    //const [name, setName] = useState("empty")
    const product = useProduct(slugId!)

    if (product.isLoading) {
        return (<>Loading</>)
    }
    if (product.isError || !product) {
        return(<>Something went wrong on getting product information.</>)
    }
    if (product.data == undefined) {
        return (<NotFoundTitle />)
    }
    /*
    const productTest = async () => {
        const docRef = doc(firestore, "products", slugId)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setName(docSnap.data().name)
        } else {
            alert("Document does not exists.")
        }
    }
    useEffect(() => {productTest()}, [])
    */

    return (
        <Container py={48}>
            Test : {product.data.name}
        </Container> 
    )
}