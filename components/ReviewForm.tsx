import { Center, Container, Textarea, Button, ThemeIcon, Text, Space } from "@mantine/core";
import { useEffect, useState } from "react"
import { Star } from "tabler-icons-react"
import { useReviewMutation } from "../lib/hooks/useReviewsMutation";
import { useUser } from "../lib/hooks/useUser";

interface StarComponentProps {
    filled: boolean
    onClick: Function
    onMouseEnter: Function
    onMouseLeave: Function
}
interface ReviewFormProps {
    productId: string
    initialMessage?: string
    initialRating?: number
}

export function StarComponent(StarComponentProps) {
    return (
        <Star
            strokeWidth={1.25}
            color={StarComponentProps.filled ? "red" : "gray"}
            onClick={StarComponentProps.onClick}
            onMouseEnter={StarComponentProps.onMouseEnter}
            onMouseLeave={StarComponentProps.onMouseLeave}
        />
    )
}

export default function ReviewForm(ReviewFormProps) {
    const addReview = useReviewMutation(ReviewFormProps.productId)

    const [ rating, setRating ] = useState(0)
    const [ filled, setFilled ] = useState(0)
    const [ reviewDesc, setReviewDesc ] = useState("")

    useEffect(() => {
        if (ReviewFormProps.initialMessage != null &&
            ReviewFormProps.initialRating != null) {
                setFilled(ReviewFormProps.initialRating)
                setRating(ReviewFormProps.initialRating)
                setReviewDesc(ReviewFormProps.initialMessage)
            }
    }, [])
    return (
        <Center>
            <Container py={15}>
                <Textarea
                    style={{width: 600}}
                    value={reviewDesc}
                    placeholder="Write your own review"
                    label="Your review"
                    onChange={(event) => setReviewDesc(event.currentTarget.value)}
                    autosize
                    minRows={3}
                    maxRows={6}
                />
                <Space h="xs"/>
                <Text size="xs">Your Rating:</Text>
                {[1, 2, 3, 4, 5].map((value) => (
                    <StarComponent
                        key={`ReviewStar${value}`}
                        filled={value <= rating || value <= filled} 
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setFilled(value)}
                        onMouseLeave={() => setFilled(0)}
                    />
                ))}
                <Space h="lg"/>
                <Button 
                    fullWidth={true}
                    color="red"
                    onClick={async () => {
                        await addReview.mutateAsync({
                            rating: rating,
                            message: reviewDesc,
                        });
                    }}
                >
                    Submit Review
                </Button>
            </Container>
        </Center>
    )
}