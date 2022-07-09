
import { Button, Container, Center } from "@mantine/core";
import { useState } from "react";
import { useProductReview } from "../lib/hooks/useReviews";
import { useUser } from "../lib/hooks/useUser";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard"
import useReviewEditState from "./hooks/useReviewEditState";

interface ReviewContainerProps {
    productId: string
}

export default function ReviewContainer(ReviewContainerProps) {
    const user = useUser()
    const { edit, setEdit } = useReviewEditState((state) => state)
    const userReview = useProductReview(ReviewContainerProps.productId, user!.data.uid)
    const userReviewData = userReview.data
    
    return (
        <>
            <>
                {!edit && userReview.status === 'success' && !!userReviewData && (
                    <>
                        <ReviewCard {...userReviewData} />
                        <Center>
                            <Container py={15}>
                                <Button 
                                    color="red"
                                    onClick={() => {setEdit(edit)}}
                                >
                                    Edit Review
                                </Button>
                            </Container>
                        </Center>
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
                        />
                    </>
                )}
            </>
        </>
    )
}