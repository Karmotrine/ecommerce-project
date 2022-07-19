import { Container, Text, Divider, Paper, createStyles, Space, TextInput, Button, Center, Select, Anchor } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AlertCircle, Check } from "tabler-icons-react"
import LoaderComp from "../../../components/LoaderComp"
import { useProduct } from "../../../lib/hooks/useProduct"
import { useProductDocMutation } from "../../../lib/hooks/useProductMutation"
import { useUser } from "../../../lib/hooks/useUser"
import { ProductType, Product } from "../../../lib/types"
import NotFoundTitle from "../../404"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

const SUCCESS_NOTIFICATION = (prodId: string) => ({
    title: 'Success',
    message: `Product has been Updated. (Product ID:${prodId})`,
    color: 'green',
    icon: <Check size="md" />,
})

export default function AddProduct() {
    const { classes } = useStyles()
    const router = useRouter()
    const slugId = router.query.productId as string
    const product = useProduct(slugId)
    const data = product.data

    const [nameValue, setNameValue] = useState("")
    const [descValue, setDescValue] = useState("")
    const [imgValue, setImgValue] = useState("")
    const [discValue, setDiscValue] = useState("")
    const [typeValue, setTypeValue] = useState<'ramen' | 'bento' | 'extra' | 'beverage' | string>("ramen")
    const [priceValue, setPriceValue] = useState("")
    const [stockValue, setStockValue] = useState("")
    const {updateProduct} = useProductDocMutation()
    useEffect(() => {
        setNameValue(data?.name)
        setDescValue(data?.description)
        setImgValue(data?.img[0])
        setDiscValue(data?.metadata.discount)
        setTypeValue(data?.metadata.type)
        setPriceValue(data?.metadata.price)
        setStockValue(String(data?.metadata.stockLeft))
    },[product.data])

    const user = useUser()
    if (user?.data?.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
        return (
            <NotFoundTitle />
        )
    }
    if (product.isLoading) {
        return (
            <>
                <LoaderComp />
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
    if (product.data === undefined) {
        return (<NotFoundTitle />)
    }

    async function onSubmit() {
        const productPayload = {
            id: "",
            name: nameValue,
            active: true,
            description: descValue || '',
            img: [imgValue] || [],
            metadata: {
                discount: discValue ?? '0',
                type: typeValue,
                price: priceValue ?? '0',
                stockLeft: parseInt(stockValue) ?? 0
            } 
        } as Product
        updateProduct(slugId,productPayload)
        showNotification(SUCCESS_NOTIFICATION(slugId))
    }
    return(
        <>
            <Container py={48} style={{paddingBottom:80}}>
                <Text className={classes.headerFont}>Update Product</Text>
                <Divider />
                <Space py={4}/>
                <Link passHref href={`/admin/products`}>
                <Anchor component="a" style={{color:"inherit"}}>
                    <Text color="gray" size="xs">{"< Back to product panel"}</Text>
                </Anchor>
                </Link>
                <Space py={8}/>
                <Container size={500}>
                    <Paper  shadow="xs" p="md">
                    <TextInput
                        key="name"
                        label="Name"
                        placeholder="Product Name"
                        value={nameValue}
                        onChange={(event) => {const {target} = event; setNameValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="description"
                        label="Description"
                        placeholder="Product Description"
                        value={descValue}
                        onChange={(event) => {const {target} = event; setDescValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="img"
                        label="Image"
                        placeholder="Product Image source URL"
                        value={imgValue}
                        onChange={(event) => {const {target} = event; setImgValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="discount"
                        label="Discount"
                        placeholder="Product Discount (in %)"
                        value={discValue}
                        onChange={(event) => {const {target} = event; setDiscValue(target.value)}}
                        required
                    />
                    <Select
                        key="type"
                        label="Type"
                        value={typeValue}
                        onChange={setTypeValue}
                        placeholder="Product Type"
                        data={[{value: 'ramen', label: 'Ramen'},
                               {value: 'bento', label: 'Bento'},]}
                        required
                    />
                    <TextInput
                        key="price"
                        label="Price"
                        placeholder="Product Price"
                        value={priceValue}
                        onChange={(event) => {const {target} = event; setPriceValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="stockLeft"
                        label="Stock"
                        placeholder="Product stock"
                        value={stockValue}
                        onChange={(event) => {const {target} = event; setStockValue(target.value)}}
                        required
                    />
                    <Space py={8}/>
                    <Center>
                        <Button 
                            color="red" 
                            variant="outline" 
                            onClick={() => onSubmit()}
                            disabled={nameValue === "" || descValue === "" || imgValue === ""  || discValue === ""  || typeValue === ""  || priceValue === ""  || stockValue === "" }
                        >
                            Update Product
                        </Button>
                    </Center>
                    </Paper>
                </Container> 
            </Container>
        </>
    )
}