import { Container, Text, Divider, createStyles, Center, Modal, Button, TextInput, Stack, Space } from "@mantine/core";
import { useState } from "react";
import { Package, Percentage, ReportMoney } from "tabler-icons-react";
import { ProductDataGrid }from "../../components/ProductDataGrid";
import { useProductDocMutation } from "../../lib/hooks/useProductMutation";
import { useProducts } from "../../lib/hooks/useProducts";
import { useUser } from "../../lib/hooks/useUser";
import { Product } from "../../lib/types";
import NotFoundTitle from "../404";
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Products() {
    const { classes } = useStyles()
    const products = useProducts(['product', 'all'])
    const data = products.data as Product[]

    const [adjustDiscountOpened, setAdjustDiscountOpened] = useState(false)
    const [targetAdjustDisc, setTargetAdjustDisc] = useState("")
    const { adjustDiscount } = useProductDocMutation()
    const [currentDisc, setCurrentDisc] = useState("")

    const [adjustPriceOpened, setAdjustPriceOpened] = useState(false)
    const [targetAdjustPrice, setTargetAdjustPrice] = useState("")
    const { adjustPrice } = useProductDocMutation()
    const [currentPrice, setCurrentPrice] = useState("")


    const [adjustStocksOpened, setAdjustStocksOpened] = useState(false)
    const [targetAdjustStocks, setTargetAdjustStocks] = useState("")
    const { adjustStocks } = useProductDocMutation()
    const [currentStocks, setCurrentStocks] = useState("")

    const user = useUser()
    if (user?.data?.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
        return (
            <NotFoundTitle />
        )
    }

    return(
        <>
        <Modal
            opened={adjustDiscountOpened}
            onClose={(() => {setTargetAdjustDisc(""); setAdjustDiscountOpened(false)})}
            title="Adjust Discount"
        >
                <Stack>
                    <TextInput
                        placeholder="Specify amount of discount (in %)"
                        label="Discount:"
                        onChange={(event) => {const { target } = event; setCurrentDisc(target.value)}}
                        icon={<Percentage size={14}/>}
                    />
                    <Space />
                    <Center>
                    <Button
                        variant="default"
                        onClick={() => {setCurrentDisc(""); adjustDiscount(currentDisc,targetAdjustDisc); setAdjustDiscountOpened(false)}}
                        disabled={isNaN(Number(currentDisc)) || currentDisc === ""}
                    >
                        Apply Discount
                    </Button>
                    </Center>
                </Stack>
        </Modal>
        <Modal
            opened={adjustPriceOpened}
            onClose={(() => {setTargetAdjustPrice(""); setAdjustPriceOpened(false)})}
            title="Adjust Price"
        >
                <Stack>
                    <TextInput
                        placeholder="Specify Price"
                        label="Price:"
                        onChange={(event) => {const { target } = event; setCurrentPrice(target.value)}}
                        icon={<ReportMoney/>}
                    />
                    <Space />
                    <Center>
                    <Button
                        variant="default"
                        onClick={() => {setCurrentPrice(""); adjustPrice(currentPrice,targetAdjustPrice); setAdjustPriceOpened(false)}}
                        disabled={isNaN(Number(currentPrice)) || currentPrice === ""}
                    >
                        Set Price
                    </Button>
                    </Center>
                </Stack>
        </Modal>
        <Modal
            opened={adjustStocksOpened}
            onClose={(() => {setTargetAdjustStocks(""); setAdjustStocksOpened(false)})}
            title="Adjust Stocks"
        >
                <Stack>
                    <TextInput
                        placeholder="Specify Amount of Stocks"
                        label="Stocks:"
                        onChange={(event) => {const { target } = event; setCurrentStocks(target.value)}}
                        icon={<Package/>}
                    />
                    <Space />
                    <Center>
                    <Button
                        variant="default"
                        onClick={() => {setCurrentStocks(""); adjustStocks(Number(currentStocks),targetAdjustStocks); setAdjustStocksOpened(false)}}
                        disabled={isNaN(Number(currentStocks)) || currentStocks === ""}
                    >
                        Set Stocks
                    </Button>
                    </Center>
                </Stack>
        </Modal>
            <Container py={48}>
                <Text className={classes.headerFont}>Products Admin Panel</Text>
                <Divider />
                {!products.isLoading && ProductDataGrid(data, 
                    setAdjustDiscountOpened, setTargetAdjustDisc,
                    setAdjustPriceOpened, setTargetAdjustPrice,
                    setAdjustStocksOpened, setTargetAdjustStocks)}
            </Container> 
        </>
    )
}