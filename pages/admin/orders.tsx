import { Container, Text, Divider, createStyles, Center } from "@mantine/core";
import { OrderAdminDataGrid }from "../../components/OrderAdminDataGrid";
import useTransactions from "../../lib/hooks/useTransactions";
import { Transaction } from "../../lib/types";
import DataGridTestData from "./DataGridMockData.json"
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Location() {
    const { classes } = useStyles()
    const transactions = useTransactions(['transactions', 'all'])
    const data = transactions.data as Transaction[]
    return(
        <>
            <Container py={48} style={{paddingBottom:400}}>
            <Text className={classes.headerFont}>Orders</Text>
                <Divider />
                {!transactions.isLoading && OrderAdminDataGrid(data)}
            </Container> 
        </>
    )
}