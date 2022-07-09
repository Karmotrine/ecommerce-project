import { Avatar, Container, Text, Tooltip, Stack, Group, Space } from "@mantine/core"
import {Review as ReviewType} from "../lib/types"
import { formatDistance, formatRelative } from 'date-fns';
import { StarComponent } from "./ReviewForm";

export default function ReviewCard(Review:ReviewType) {
    return (
        <Container key={Review.id} py={30} px={160}>
            <Group>
                <Avatar size="lg" radius="xl"src={Review.user?.photo_url} alt={Review.user.display_name}/>
                <Stack align="flex-start" justify="flex-start" spacing={0}>
                    <Text size="xl" weight={600}>{Review.user.display_name}</Text>
                    <Tooltip
                        label={formatDistance(Review.created_at, new Date(), { addSuffix: true })}
                        position="bottom"
                        placement="center"
                        withArrow
                    >
                        <Text size="sm" weight={400} color="grey">{formatRelative(Review.created_at, new Date())}</Text>
                    </Tooltip>
                </Stack>
            </Group>
            <Space py={10}/>
            {[1,2,3,4,5].map((value) => (
                <StarComponent
                    key={`${Review.id}-star#${value}`}
                    filled={value <= Review.rating}
                />
            ))}
            <Text size="md" color="grey">{Review.message}</Text>
        </Container>
    )
}