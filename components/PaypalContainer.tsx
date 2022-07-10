import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js"
import { Loader } from "@mantine/core";
    
export const paypalScriptOptions: PayPalScriptOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "PHP"
};

interface PaypalButtonsPropsType {
    Total: number
}

export function PaypalButtons(PaypalButtonsProps:PaypalButtonsPropsType) {
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: "vertical", shape: "pill" },
        createOrder(data, actions) {
            return actions.order.create({
            purchase_units: [
                {
                amount: {
                    value: `${PaypalButtonsProps.Total}`
                }
                }
            ]
            });
        },
        onApprove(data, actions) {
        /**
         * data: {
         *   orderID: string;
         *   payerID: string;
         *   paymentID: string | null;
         *   billingToken: string | null;
         *   facilitatorAccesstoken: string;
         * }
         */
        return actions.order.capture().then((details) => {
        alert(
            "Transaction completed by" +
            (details?.payer.name.given_name ?? "No details")
        );

        alert("Data details: " + JSON.stringify(data, null, 2));
            });
        }
    };
    return (
        <>
            {isPending ? <Loader/> : null}
            <PayPalButtons />
        </>
    );
}