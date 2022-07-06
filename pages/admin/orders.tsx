import { Container, Text, Divider, createStyles, Center } from "@mantine/core";
import { OrderDataGrid }from "../../components/OrderDataGrid";
import DataGridTestData from "./DataGridMockData.json"
const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Location() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
            <Text className={classes.headerFont}>Order Admin Panel</Text>
                <Divider />
                {OrderDataGrid(DataGridTestData)}
            </Container> 
        </>
    )
}