import { Center, Container, Textarea, Button, ThemeIcon, Text } from "@mantine/core";
import { useState } from "react"
import { Star } from "tabler-icons-react"
import { useReviewMutation } from "../lib/hooks/useReviewsMutation";
import { useUser } from "../lib/hooks/useUser";

interface StarComponentProps {
    filled: boolean,
    onClick: Function
}
interface ReviewFormProps {
    productId: string
}

function StarComponent(StarComponentProps) {
    return (
        <Star
            strokeWidth={1.25}
            color={StarComponentProps.filled ? "red" : "gray"}
            onClick={() => StarComponentProps.onClick()}
        />
    )
}

export default function ReviewForm(ReviewFormProps) {
    const addReview = useReviewMutation(ReviewFormProps.productId)

    const [ rating, setRating ] = useState(0)
    const [ reviewDesc, setReviewDesc ] = useState("")
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
                <Text size="xs">Your Rating:</Text>
                {[1, 2, 3, 4, 5].map((value) => (
                    <StarComponent
                        key={`ReviewStar${value}`}
                        filled={value <= rating}
                        onClick={() => setRating(value)}
                    />
                ))}
                <Button 
                    fullWidth={true}
                    color="red"
                    onClick={async () => {
                        await addReview.mutateAsync({
                            rating: rating,
                            message:reviewDesc,
                        });
                    }}
                >
                    Submit Review
                </Button>
            </Container>
        </Center>
    )
}