import { Container, createStyles, Text, Center, Stack, Image, Paper, Title } from "@mantine/core";
import dayjs from "dayjs";
import Head from "next/head";
import router, { useRouter } from "next/router"
import LoaderComp from "../../components/LoaderComp"
import { useContent } from "../../lib/hooks/useContent"
import { Content } from "../../lib/types";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))


export default function ArticlePage() {
    const router = useRouter()
    const { classes } = useStyles()
    const slugId = router.query.articleid as string
    const content = useContent(slugId)
    const data = content.data as Content
    if (content.isLoading) {
        return(
            <>
                <LoaderComp />
            </>
        )
    }
    return (
        <>
            <Head>
            <title>{data.title} | Imbento</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container py={48} sx={{paddingBottom:80}}>
                <Center>
                    <Stack>
                        <Center>
                            <Stack spacing="xs">
                                <Title className={classes.headerFont}>{data.title}</Title>
                                <Center>
                                <Text>Created in {dayjs.unix(data.created_at.seconds).format("MMMM DD, YYYY")}</Text>
                                </Center>
                            </Stack>
                        </Center>
                        <Image src={data.hero} alt={data.title} width={749} height={556}/>
                        <Paper
                        shadow="xs"
                        p="md"
                    >
                        <Text>{data.content}</Text>
                    </Paper>
                    </Stack>

                </Center>
            </Container>
        </>
    )
}