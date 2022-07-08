
import { Center, Container } from "@mantine/core";
import ReviewForm from "./ReviewForm";

interface ReviewContainerProps {
    productId: string
}

export default function ReviewContainer(ReviewContainerProps) {
    return (
        <ReviewForm productId={ReviewContainerProps.productId}/>
    )
}