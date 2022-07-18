import { Container, Text, Divider, createStyles } from "@mantine/core"
import { where } from "firebase/firestore"
import { OrderDataGrid } from "../../components/OrderDataGrid"
import useTransactions from "../../lib/hooks/useTransactions"
import { useUser } from "../../lib/hooks/useUser"
import { Transaction } from "../../lib/types"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Orders() {
    const { classes } = useStyles()
    const user = useUser()
    const transactions = useTransactions(['transactions', `${user.data.uid}`],
        [where('metadata.userid', '==', `${user.data.uid}`)]
    )
    const data = transactions.data as Transaction[]
    return(
        <>
            <Container py={48} style={{paddingBottom:400}}>
            <Text className={classes.headerFont}>My Orders</Text>
                <Divider />
                {!transactions.isLoading && OrderDataGrid(data)}
            </Container> 
        </>
    )
}