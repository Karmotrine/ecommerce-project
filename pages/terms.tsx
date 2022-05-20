import { Container, Text, Divider, createStyles, Space } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    headerFont: {
        fontSize: 60,
        fontWeight: 400,
    },
}))

export default function Tos() {
    const { classes } = useStyles()
    return(
        <>
            <Container py={48}>
                <Text className={classes.headerFont}>Terms and Conditions</Text>
                <Divider />
                <Text align="justify">Please refer to the Checkout/Cart button on the website to review items available for ordering.</Text>
                <Space />
                <Text align="justify">For Senior Citizens and PWDs who would like to avail of their privileges, please call us at these numbers so we can process your order with the appropriate discount.</Text>
                <Space />
                <Text align="justify">All orders are subject to 10% service charge. We charge a flat fee of P150 for delivery orders.</Text>
                <Space />
                <Text align="justify">Sta. Mesa Branch: +63-283-555-7846</Text>
                <Space />
                <Text size="xl">Delivery</Text>
                <Space />
                <Text align="justify">All delivery orders will be delivered within 4-6 hours from the confirmation of order.</Text>
                <Space />
                <Text align="justify">Cut-off for delivery orders is at 1:00 PM daily. All orders made after 1:00PM will be processed the next day.</Text>
                <Space />
                <Text align="justify">Buildings & Condominiums: We will drop-off the order in a specific location, such as the building reception/concierge or lobby guard, if allowed.</Text>
                <Space />
                <Text align="justify">Executive Villages & Subidivisons: As some homeowners associations no longer allow entry for door to door delivery, you might have to meet us for the pickup at the gate of your village or subdivision.</Text>
                <Space />
                <Text size="xl">Pick-up</Text>
                <Space />
                <Text align="justify">For reasons of expediendcy, we encourage everyone to use the Pick Up option as we have a limited number of riders.</Text>
                <Space />
                <Text align="justify">Unscheduled same-day pick-up is allowed in Sta. Mesa branch from 10 A.M. to 11 P.M.</Text>
                <Space />
                <Text align="justify">Pick up may be done personally by the customer, or through a booked and paid for service to be arranged by the customer as well.</Text>
                <Space />
                <Text align="justify">Imbento agrees to hold the order for you at the store premises for no more than a reasonable period of 30 minutes from Collection Time. Imbento shall not be obliged to provide the order to you if you fail to pick up within the holding time.</Text>
                <Space />
                <Text align="justify">In the event of unreasonable delay in pick up attributable to you, you shall bear the risk of any damage, loss of goods, or any deterioration in quality or change in the condition of the goods (e.g. changes in the temperature fit for consumption). In this case, you shall not be entitled to any refund or replacement of the goods.</Text>
                <Space />
                <Text align="justify">You shall be responsible for inspecting the goods/order upon pick-up and shall report any issues and/or defects immediately before leaving the resturant&apos;s premises.</Text>
                <Space />
                <Text size="xl">Order Confirmation</Text>
                <Space />
                <Text align="justify">Customers need to provide the correct delivery address, email address, special instructions and contact number when ordering to avoid any discrepancy or delays in delivery</Text>
                <Space />
                <Text align="justify">In the event of a product unavailability, verification with the customer shall be done via a phone call to offer a reasonable substitute (if needed) and/or confirm information.</Text>
                <Space />
                <Text align="justify">The security of your account is your responsibility. Should it be used by another person, transactions are still considered valid and subject to the same terms and conditions.</Text>
                <Space />
                <Text></Text>
                <Space />
                <Text></Text>
                
            </Container> 
        </>
    )
}