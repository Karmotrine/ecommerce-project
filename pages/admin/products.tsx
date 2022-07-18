import { Container, Text, Divider, createStyles, Center, Modal, Button, TextInput, Stack, Space } from "@mantine/core";
import { useState } from "react";
import { Percentage } from "tabler-icons-react";
import { ProductDataGrid }from "../../components/ProductDataGrid";
import { useProductDocMutation } from "../../lib/hooks/useProductMutation";
import { useProducts } from "../../lib/hooks/useProducts";
import { Product } from "../../lib/types";
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Location() {
    const { classes } = useStyles()
    const products = useProducts(['product', 'all'])
    const data = products.data as Product[]

    const [opened, setOpened] = useState(false)
    const [targetAdjustDisc, setTargetAdjustDisc] = useState("")
    const { adjustDiscount } = useProductDocMutation()
    const [currentDisc, setCurrentDisc] = useState("")

    return(
        <>
        <Modal
            opened={opened}
            onClose={(() => {setTargetAdjustDisc(""); setOpened(false)})}
            title="Adjust Discount"
        >
                <Stack>
                    <TextInput
                        placeholder="Specify amount of discount (in %)"
                        label="Discount:"
                        onChange={(event) => {const { target } = event; setCurrentDisc(target.value)}}
                        icon={<Percentage size={14}/>}
                    />
                    <Space  py={2}/>
                    <Center>
                    <Button
                        variant="default"
                        onClick={() => {setCurrentDisc(""); adjustDiscount(currentDisc,targetAdjustDisc); setOpened(false)}}
                        disabled={isNaN(Number(currentDisc))}
                    >
                        Apply Discount
                    </Button>
                    </Center>
                </Stack>
        </Modal>
            <Container py={48}>
                <Text className={classes.headerFont}>Products Admin Panel</Text>
                <Divider />
                {!products.isLoading && ProductDataGrid(data, setOpened, setTargetAdjustDisc)}
            </Container> 
        </>
    )
}