import { Container, Grid, Stack, Text, Image, Skeleton, Center, Space } from "@mantine/core";

export default function ProductSkeleton() {
    return(
        <Container py={48}>
            <Grid columns={35}>
                <Grid.Col span={20}>
                    <Skeleton width={"100%"} height={500} />
                </Grid.Col>
            <Grid.Col span={15}>
                    <Stack justify="flex-start">
                        <Skeleton height={30} radius="xl" width={"75%"} />
                        <Skeleton height={12} mt={6} radius="xl" width={"20%"} />
                        <Skeleton height={12} mt={6} mb={8} radius="xl" width={"30%"} />
                        <Skeleton height={27} mb={15} radius="xl" width={"40%"} />
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={1} radius="xl" />
                        <Skeleton height={8} mt={1} width="70%" radius="xl" />
                        <Skeleton height={50} mt={14} width="90%" radius="xl" />
                    </Stack>
                </Grid.Col>
            </Grid>
            <Space h={40}/>
            <Center>
                <Stack>
                <Center><Skeleton height={40} radius="lg" width={"40%"} /></Center>
                <Space/>
                <Skeleton width={600} height={100} radius="sm"/>
                </Stack>
            </Center>
        </Container>
    )
}