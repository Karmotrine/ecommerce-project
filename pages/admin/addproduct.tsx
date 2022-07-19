import { Container, Text, Divider, Paper, createStyles, Space, TextInput, Button, Center, Select, Anchor } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { useState } from "react"
import { AlertCircle, Check } from "tabler-icons-react"
import { useProductMutation } from "../../lib/hooks/useProductMutation"
import { Product, ProductType } from "../../lib/types"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

const SUCCESS_NOTIFICATION = (prodId: string) => ({
    title: 'Success',
    message: `Product has been Added. (Product ID:${prodId})`,
    color: 'green',
    icon: <Check size="md" />,
})

const FAIL_NOTIFICATION = {
    title: 'Failed',
    message: 'Failed adding product.',
    color: "orange",
    icon: <AlertCircle />
}

export default function AddProduct() {
    const router = useRouter()
    const [nameValue, setNameValue] = useState("")
    const [descValue, setDescValue] = useState("")
    const [imgValue, setImgValue] = useState("")
    const [discValue, setDiscValue] = useState("")
    const [typeValue, setTypeValue] = useState<'ramen' | 'bento' | 'extra' | 'beverage' | string>("ramen")
    const [priceValue, setPriceValue] = useState("")
    const [stockValue, setStockValue] = useState("")
    const {addProduct} = useProductMutation()

    function clearForm() {
        setNameValue("")
        setDescValue("")
        setImgValue("")
        setDiscValue("")
        setTypeValue("")
        setPriceValue("")
        setStockValue("")
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
        const payloadId = addProduct(productPayload)
        if (payloadId !== undefined) {
            showNotification(SUCCESS_NOTIFICATION(await payloadId))
            clearForm()
        } else {
            showNotification(FAIL_NOTIFICATION)
        }
    }
    const { classes } = useStyles()
    return(
        <>
            <Container py={48} style={{paddingBottom:80}}>
                <Text className={classes.headerFont}>Add Product</Text>
                <Divider />
                <Space py={4}/>
                <Anchor component="a" style={{color:"inherit"}} onClick={() => router.push(`/admin/products`)}>
                    <Text color="gray" size="xs">{"< Back to product panel"}</Text>
                </Anchor>
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
                            Add Product
                        </Button>
                    </Center>
                    </Paper>
                </Container> 
            </Container>
        </>
    )
}