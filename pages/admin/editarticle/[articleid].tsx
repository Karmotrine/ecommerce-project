import { Container, Text, Divider, Paper, createStyles, Space, TextInput, Button, Center, Select, Anchor } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AlertCircle, Check } from "tabler-icons-react"
import LoaderComp from "../../../components/LoaderComp"
import { useContent } from "../../../lib/hooks/useContent"
import { useContentDocMutation } from "../../../lib/hooks/useContentMutation"
import { useUser } from "../../../lib/hooks/useUser"
import { Content } from "../../../lib/types"
import NotFoundTitle from "../../404"

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

const SUCCESS_NOTIFICATION = (contentId: string) => ({
    title: 'Success',
    message: `Content has been Updated. (Content ID:${contentId})`,
    color: 'green',
    icon: <Check size="md" />,
})

export default function AddArticle() {
    const { classes } = useStyles()
    const router = useRouter()
    const slugId = router.query.articleid as string
    const content = useContent(slugId)
    const data = content.data

    const [titleValue, setTitleValue] = useState("")
    const [heroValue, setHeroValue] = useState("")
    const [excerptValue, setExcerptValue] = useState("")
    const [contentValue, setContentValue] = useState("")

    const {updateContent} = useContentDocMutation()
    useEffect(() => {
        setTitleValue(data?.title)
        setHeroValue(data?.hero)
        setExcerptValue(data?.excerpt)
        setContentValue(data?.content)
    },[content.data])

    const user = useUser()
    if (user?.data?.uid !== process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID) {
        return (
            <NotFoundTitle />
        )
    }
    if (content.isLoading) {
        return (
            <>
                <LoaderComp />
            </>
        )
    }
    if (content.isError || !content) {
        return(
        <Container>
            <Text>Something went wrong on getting Content information.</Text>
        </Container>
        )
    }
    if (content.data === undefined) {
        return (<NotFoundTitle />)
    }

    async function onSubmit() {
        const contentPayload = {
            id: "",
            title: titleValue,
            hero: heroValue,
            excerpt: excerptValue,
            content: contentValue,
        } as Content
        updateContent(slugId,contentPayload)
        showNotification(SUCCESS_NOTIFICATION(slugId))
    }
    return(
        <>
            <Container py={48} style={{paddingBottom:80}}>
                <Text className={classes.headerFont}>Update Content</Text>
                <Divider />
                <Space py={4}/>
                <Link passHref href={`/admin/articles`}>
                <Anchor component="a" style={{color:"inherit"}}>
                    <Text color="gray" size="xs">{"< Back to Content panel"}</Text>
                </Anchor>
                </Link>
                <Space py={8}/>
                <Container size={500}>
                    <Paper  shadow="xs" p="md">
                    <TextInput
                        key="title"
                        label="Title"
                        placeholder="Content Title"
                        value={titleValue}
                        onChange={(event) => {const {target} = event; setTitleValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="Image"
                        label="Image"
                        placeholder="Content Image"
                        value={heroValue}
                        onChange={(event) => {const {target} = event; setHeroValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="excerpt"
                        label="Excerpt"
                        placeholder="Content Excerpt"
                        value={excerptValue}
                        onChange={(event) => {const {target} = event; setExcerptValue(target.value)}}
                        required
                    />
                    <TextInput
                        key="content"
                        label="Content"
                        placeholder="Article's Content"
                        value={contentValue}
                        onChange={(event) => {const {target} = event; setContentValue(target.value)}}
                        required
                    />
                    <Space py={8}/>
                    <Center>
                        <Button 
                            color="red" 
                            variant="outline" 
                            onClick={() => onSubmit()}
                            disabled={titleValue === "" || heroValue === "" || excerptValue === "" || contentValue === ""}
                        >
                            Update Content
                        </Button>
                    </Center>
                    </Paper>
                </Container> 
            </Container>
        </>
    )
}