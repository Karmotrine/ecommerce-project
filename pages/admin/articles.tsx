import { Container, Text, Divider, createStyles, Center } from "@mantine/core";
import { ArticleDataGrid }from "../../components/ArticleDataGrid"
import useContents from "../../lib/hooks/useContents";
import { useUser } from "../../lib/hooks/useUser";
import { Content } from "../../lib/types";
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
    const contents = useContents(['contents', 'all'])
    const data = contents.data as Content[]
    const user = useUser()
    if (user?.data?.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
        return (
            <NotFoundTitle />
        )
    }
    return(
        <>
            <Container py={48} style={{paddingBottom:400}}>
                <Text className={classes.headerFont}>Articles Admin Panel</Text>
                <Divider />
                {!contents.isLoading && ArticleDataGrid(data)}
            </Container> 
        </>
    )
}