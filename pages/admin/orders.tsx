import { Container, Text, Divider, createStyles, Center } from "@mantine/core";
import { OrderAdminDataGrid }from "../../components/OrderAdminDataGrid";
import useTransactions from "../../lib/hooks/useTransactions";
import { useUser } from "../../lib/hooks/useUser";
import { Transaction } from "../../lib/types";
import NotFoundTitle from "../404";
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
    const user = useUser()
    if (user?.data?.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
        return (
            <NotFoundTitle />
        )
    }
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