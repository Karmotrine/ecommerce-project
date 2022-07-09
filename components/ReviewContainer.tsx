
import { Button, Container, Center } from "@mantine/core";
import { useState } from "react";
import { useProductReview } from "../lib/hooks/useReviews";
import { useUser } from "../lib/hooks/useUser";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard"

interface ReviewContainerProps {
    productId: string
}

export default function ReviewContainer(ReviewContainerProps) {
    const user = useUser()
    const [edit, setEdit] = useState(false)
    const userReview = useProductReview(ReviewContainerProps.productId, user!.data.uid)
    const userReviewData = userReview.data
    
    return (
        <>
            <>
                {!edit && userReview.status === 'success' && !!userReviewData && (
                    <>
                        <ReviewCard {...userReviewData} />
                        <Container py={15}>
                            <Button 
                                color="red"
                                onClick={() => {setEdit(true)}}
                            >
                                Edit Review
                            </Button>
                        </Container>
                    </>
                )}
                {userReview.status === "success" && !userReviewData && (
                    <ReviewForm productId={ReviewContainerProps.productId}/>
                )}
                {!!edit && !!userReviewData && (
                    <>
                        <ReviewForm
                            productId={ReviewContainerProps.productId}
                            initialMessage={userReviewData.message}
                            initialRating={userReviewData.rating}
                            setEditState={setEdit(false)}
                        />
                    </>
                )}
            </>
        </>
    )
}