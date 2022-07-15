import { Address, Transaction } from "../../lib/types";
import useTransactionMutation from "./../../lib/hooks/useTransactionMutation";
import { useCart } from "../../lib/hooks/useCart";
import { Button, Text } from "@mantine/core";
import { useState } from "react";

export default function Orders() {
    const { cart } = useCart() 
    const [state, setState] = useState("")
    const { addTransaction } = useTransactionMutation()
    const address:Address = {
        uid: "test",
        recipientName:"test",
        nameId: "test",
        metadata:{
            region:"test",
            province:"test",
            cityMun:"test",
            addressLine:"test",
            postalCode:"test"
        }
    };
    const transSampleTest:Transaction = {
        cart: cart,
		paymentDetails: {
			orderId: "test",
			orderType: 'pick-up',
			branch: "test",
				payerId: "test",
				paymentId: "test",
				billingToken: "test",
				facilitatorAccesstoken: "test",
			isPaid: false
		},
		metadata: {
            userid: "test",
			address: address,
			paymentMethod: 'cod',
			currentStatus: {
                isPlaced: true,
                isShipped: false,
                isReceived: false,
                isCancelled: false,
            },
            DeliDate: "test",
            Notes: "test"
		}
    };
    return (
        <>
            <Button onClick={async () => {
                const newDocId = await addTransaction(transSampleTest).then()
                setState(newDocId)
                }
            }
            >
                Test Transaction
            </Button>
            <Text>{!!state && state}</Text>
        </>
    )
}
