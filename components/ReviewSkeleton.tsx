import { Avatar, Container, Text, Tooltip, Stack, Group, Space, Skeleton, Grid,} from "@mantine/core"
import {Review as ReviewType} from "../lib/types"
import { formatDistance, formatRelative } from 'date-fns';
import { StarComponent } from "./ReviewForm";

export default function ReviewSkeleton() {
    return (
        <Container py={30} px={160}>
            <Grid columns={30}>
                <Grid.Col span={4}>
                    <Skeleton height={60} circle mb="xl" />
                </Grid.Col>
                <Grid.Col span={25}>
                    <Space py={4} />
                    <Skeleton height={15} radius="xl" width="40%"/>
                    <Space py={8} />
                    <Skeleton height={12} radius="xl" width="15%"/>
                </Grid.Col>
            </Grid>
            <Space py={5}/>
            <Skeleton height="xl" radius="xl" width="30%"/>
            <Skeleton height={8} mt={10} radius="xl" />
            <Skeleton height={8} mt={10} radius="xl" />
            <Skeleton height={8} mt={10} radius="xl" width="70%"/>
        </Container>
    )
}