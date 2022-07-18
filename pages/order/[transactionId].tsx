import { Card, Center, Container, Divider, Group, Stepper, Text, Title, Image, Stack, Space, Badge, Collapse, Box, Button, Accordion, SimpleGrid } from "@mantine/core"
import { useRouter } from "next/router"
import { useTransaction } from "../../lib/hooks/useTransaction"
import { orderStatus, Transaction } from "../../lib/types"
import NotFoundTitle from "../404"
import { useEffect, useState } from "react"
import { BrandPaypal, Checklist, CircleCheck, PaperBag, TruckDelivery, UserCheck, Wallet } from "tabler-icons-react"
import dayjs from "dayjs"
import { Timestamp } from "firebase/firestore"
import { useTransactionDocMutation } from "../../lib/hooks/useTransactionMutation"

function OrderStatusStepper(thisTrans:Transaction) {
    const [active, setActive] = useState(0)
    const payment = thisTrans.metadata.paymentMethod
    const mode = thisTrans.paymentDetails.orderType
    const status = thisTrans.metadata.currentStatus
    useEffect(() => {
        if (status.isPlaced) {
            if (thisTrans.paymentDetails.isPaid) {
                if (status.isShipped) {
                    if (status.isReceived) {
                        setActive(4)
                    } else {
                        setActive(3)
                    }
                } else {
                    setActive(2)
                }
            } else {
                setActive(1)
            }
        } else {
            setActive(0)
        }
    }, [thisTrans, payment, mode, status])
    /**
     *   isPlaced: boolean
     *   isShipped: boolean
     *   isReceived: boolean
     *   isCancelled: boolean
     */
    return (
        <Container py={10}>
            <Stepper active={active} completedIcon={<CircleCheck />} color="red" orientation="vertical">
                <Stepper.Step 
                    icon={<Checklist />}
                    label={"Place Order"}
                    description={status.isPlaced ? "Order Placed" : "Order not placed"}
                />
                <Stepper.Step
                    icon={payment === "paypal" ? <BrandPaypal /> : <Wallet />}
                    label={"Pay"}
                    description={thisTrans.paymentDetails.isPaid ? "Payment confirmed" : "Payment pending"}
                />
                <Stepper.Step
                    icon={mode === "delivery" ? <TruckDelivery /> : <PaperBag/>}
                    label={mode === "delivery" ? "Shipping" : "Pick-up"}
                    description={mode === "delivery" ? "Delivery to address" : "Pick-up from store."}
                />
                <Stepper.Step
                    icon={<UserCheck />}
                    label={"Receive"}
                    description={status.isReceived ? "Order received" : "Receive order"}
                />
            </Stepper>
        </Container>
    )
}

function OrderStatusCartDisplay(thisTrans:Transaction) {
    const cart = Object.values(thisTrans.cart)
    const address = thisTrans.metadata.address
    const timestamp = (thisTrans.metadata.DeliDate) as Timestamp
    //
    const total = cart.reduce<number>((prev,item) => {
            const itemTotal = (parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100)))*item.quantity;
            return prev + itemTotal
            }, 0)
    return(
        <>
        <Accordion initialItem={1} iconPosition="right" multiple>
            <Accordion.Item label="Details">
                {/*If delivery or pickup */}
                <Container>
                
                    <Text>Delivery Mode: {`${thisTrans.paymentDetails.orderType[0].toUpperCase()}${thisTrans.paymentDetails.orderType.slice(1)}`}</Text>
                    <Text>Payment Mode: {thisTrans.metadata.paymentMethod.toUpperCase()}</Text>
                    <Text>Branch: {thisTrans.paymentDetails.branch === "0" ? "Sta. Mesa" : "Upcoming branch"}</Text>
                    <Text>Date: {dayjs.unix(timestamp.seconds).format("MMMM DD, YYYY")}</Text>
                    <Text>Time: {dayjs.unix(timestamp.seconds).format("hh:mm A")}</Text>
                    <Text>Notes: {thisTrans.metadata.Notes}</Text>
                    {thisTrans.paymentDetails.orderType === "delivery" && 
                    <>
                        <Space py={8}/>
                        <Text>Recipient Name: {address.recipientName}</Text>
                        <Text>Saved Address Name: {address.nameId}</Text>
                        <Text color="dimmed">{address.metadata.addressLine}</Text>
                        <Text color="dimmed">{address.metadata.cityMun}</Text>
                        <Text color="dimmed">{address.metadata.province}</Text>
                        <Text color="dimmed">{address.metadata.region}</Text>
                        <Text color="dimmed">{address.metadata.postalCode}</Text>
                    </>}

                </Container>
            </Accordion.Item>
            <Accordion.Item label="Cart Items">
            {cart.map((item) => {
                return (
                    <Container key={item.id}>
                    <Group>
                        <Image 
                            radius="lg" 
                            src={item.img[0]}
                            alt={item.name}
                            width={100}
                            height={100}
                        />
                        <Stack spacing={0} align="flex-start">
                            <Space py={5}/>
                            <Group >
                                <Text size="lg" weight={600}>{item.quantity}x {item.name}</Text>
                            </Group>
                            {parseInt(item.metadata.discount) == 0 ?
                            <Text size="sm" weight={400}>₱{item.metadata.price}</Text> :
                            <Group spacing={2}>
                                <Text size="sm" weight={300}><s>₱{item.metadata.price}</s></Text>
                                <Space py={2}/>
                                <Text color="green" size="sm" weight={500} sx={{ lineHeight: 1 }}>
                                    ₱{parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100))}
                                </Text>
                            </Group>
                            }
                            <Space py={5} />
                            <Group spacing={1}>
                                <Badge color="red" size="sm">{item.metadata.type}</Badge>
                                {parseInt(item.metadata.discount) != 0 && (
                                <Badge
                                    variant="gradient"
                                    gradient={{ from: 'teal', to: 'lime', deg: 105 } }
                                    size="sm"
                                >
                                    {item.metadata.discount}% off
                                </Badge>
                                )}
                            </Group>
                            <Space py={5} />
                            <Group>
                                <Text>
                                ₱ {(item.quantity*(parseFloat(item.metadata.price)-(parseFloat(item.metadata.price)*(parseInt(item.metadata.discount)/100)))).toFixed(2)}
                                </Text>
                            </Group>
                        </Stack>
                    </Group>
                    <Space py={10} />
                    <Divider />
                </Container>
            )
            })
            }
            <Container>
                <Group style={{justifyContent: "space-between", flexDirection:"row"}}>
                    <Text size="xl" weight={600}>Total:</Text>
                    <Text size="xl" weight={600}>₱{total}</Text>
                </Group>
            </Container>
            </Accordion.Item>
        </Accordion>
        </>
    )
}

export default function OrderDetailPage() {
    const router = useRouter();
    const slugId = router.query.transactionId as string
    const transactionQuery = useTransaction(slugId!)
    const { fulfillTransaction, cancelTransaction } = useTransactionDocMutation()
    if (transactionQuery.isLoading) {
        return (
            <>
                Loading
            </>
        )
    }
    if (transactionQuery.isError || !transactionQuery) {
        return(
        <Container>
            <Text>Something went wrong on getting product information.</Text>
        </Container>
        )
    }
    if (transactionQuery.data == undefined) {
        return (<NotFoundTitle />)
    }
    const transactionObj = transactionQuery.data as Transaction
    const status = transactionObj.metadata.currentStatus
    console.log(transactionObj)
    
    return (
        <>
            <Container size={600} py={50}>
                <Card radius="md" shadow="xs">
                    <SimpleGrid cols={2} spacing={73}>
                    <Stack spacing={0}>
                        <Title>Order Details</Title>
                        <Text px={0} color="dimmed" size="xs" weight={300}>Transaction code: {slugId}</Text>
                    </Stack>
                        <Center inline={false}>
                        <Button 
                            color="green"
                            radius="lg"
                            size="xl"
                            disabled={status.isReceived}
                            onClick={() => fulfillTransaction(slugId)}
                        >
                            {status.isReceived ? "Order Received" : "Receive Order"}
                        </Button>
                    </Center>
                    </SimpleGrid>
                    <Space py={5} />
                    <Divider />
                    <Center py={15}>
                        <OrderStatusStepper {...transactionObj}/>
                    </Center>
                    <Divider py={0}/>
                        <OrderStatusCartDisplay {...transactionObj} />
                    <Space py={10} />
                </Card>
            </Container>
        </>
    )
}