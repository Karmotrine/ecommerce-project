import { Box, Button, Center, Divider, Grid, Group, LoadingOverlay, Modal, Select, Space, Stack, Stepper, Text, TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { PayPalButtonsComponentProps } from "@paypal/react-paypal-js"
import { useCart } from "../lib/hooks/useCart";
import { paypalScriptOptions, PaypalButtons } from "./PaypalContainer";
import { useState } from "react"
import superjson from "superjson"
import { useLocalStorage } from "@mantine/hooks";
import { useAddresses } from "../lib/hooks/useAdresses";
import { Address, Transaction } from "../lib/types";
import { DatePicker, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Clock, Router } from "tabler-icons-react";
import useTransactionMutation from "../lib/hooks/useTransactionMutation";
import { useRouter } from 'next/router';

export default function OrderSummary() {
    const { addAddress, addresses, getAddress, isEmpty } = useAddresses()
    const router = useRouter()
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [confirmModal, setConfirmModal] = useState(false);
    
    const { cart, total } = useCart()

    const [details, setDetails] =  useLocalStorage({
        key: "orderExDetails",
        defaultValue: {
            savedAddress: null,
            savedDeliDateTime: null,
            savedNotes: null,
            savedOrderType: null,
            savedBranch: null,
        }, 
        serialize: superjson.stringify,
        deserialize: (str) => (str === undefined ?
            {
                savedAddress: null,
                savedDeliDateTime: null,
                savedNotes: null,
                savedOrderType: null,
                savedBranch: null,
            } : superjson.parse(str)),
        }
    )
    const [selectedId, setSelectedId] = useState<string>("");
    const [dateValue, setDateValue] = useState(new Date())
    const [timeValue, setTimeValue] = useState(new Date())
    const [orderType, setOrderType] = useState("0")
    const [notesValue, setNotesValue] = useState("")
    const [branchCode, setBranchCode] = useState("0")

    useEffect(() => {
        setSelectedId(details.savedAddress === null ? "" : JSON.stringify(details.savedAddress))
        setDateValue(details.savedDeliDateTime === null ? new Date() : details.savedDeliDateTime)
        setTimeValue(details.savedDeliDateTime === null ? new Date() : details.savedDeliDateTime)
        setBranchCode(details.savedBranch === null ? "" : details.branchCode)
        setNotesValue(details.savedNotes === null ? "" : details.savedNotes)
        setOrderType(details.savedOrderType === null ? "0" : details.savedOrderType)
    }, [])

    useEffect(() => {
        if (selectedId !== null && selectedId !== "")
            console.log(selectedId)
            setDetails((prevState) => ({...prevState, savedAddress: selectedId}))
    }, [selectedId])

    
    useEffect(() => {
        const deliDateTime = dateValue
        deliDateTime.setHours(timeValue.getHours())
        deliDateTime.setMinutes(timeValue.getMinutes())
        setDetails((prevState) => ({...prevState, savedDeliDateTime: deliDateTime}))
    }, [dateValue, timeValue])

    useEffect(() => {
        setDetails((prevState) => ({...prevState, savedBranch: branchCode}))
    }, [branchCode])

    useEffect(() => {
        setDetails((prevState) => ({...prevState, savedNotes: notesValue}))
    }, [notesValue])

    useEffect(() => {
        setDetails((prevState) => ({...prevState, savedOrderType: orderType}))
        if (orderType === "1")
            setSelectedId(superjson.stringify({
                uid: "",
                recipientName: "",
                nameId: "",
                metadata: {
                    region: "",
                    province: "",
                    cityMun: "",
                    addressLine: "",
                    postalCode: "",
                }
            }))
    },[orderType])


    const { addTransaction } = useTransactionMutation()
    const [transDocId, setTransDocId] = useState("")
    async function submitTransactionCash() {
        const transactionObj:Transaction = {
            cart: cart,
            paymentDetails: {
                orderId: "",
                orderType: 'pick-up',
                branch: details.savedBranch ,
                    payerId: "",
                    paymentId: "",
                    billingToken: "",
                    facilitatorAccesstoken: "",
                isPaid: false
            },
            metadata: {
                address: superjson.parse(selectedId) as Address,
                paymentMethod: 'cod',
                currentStatus: {
                    isPlaced: true,
                    isShipped: false,
                    isReceived: false,
                    isCancelled: false,
                },
                DeliDate: details.savedDeliDateTime,
                Notes: details.savedNotes
            }
        };
        const docId = await addTransaction(transactionObj)
        setTransDocId(docId);
        nextStep();
    }


    return (
        <>
        <Modal
            opened={confirmModal}
            onClose={() => setConfirmModal(false)}
            title="Checkout"
        >
            <>
            <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="red">
                <Stepper.Step label="Order Details" description="Confirm details">
                    <Box>
                    {(orderType === "2") &&
                        <Select
                            label="Delivery Location"
                            placeholder="Choose address"
                            data={!!addresses ? addresses.map((item:Address) => 
                                            ({value: JSON.stringify(item),
                                            label: `${item.nameId} (${item.metadata.addressLine}, ${item.metadata.cityMun}, ${item.metadata.province}, ${item.metadata.region}, ${item.metadata.postalCode})`})
                                ) : [{label: "", value: ""}]
                                }
                            disabled={isEmpty}
                            defaultValue={selectedId}
                            value={selectedId}
                            onChange={setSelectedId}
                            required
                            error={selectedId === ""}
                        />
                    }
                    <DatePicker
                      placeholder={(orderType === "2") ? "Delivery date" : "Pick-up date"}
                      label={(orderType === "2") ? "Delivery date" : "Pick-up date"}
                      minDate={dayjs(dateValue).toDate()}
                      maxDate={dayjs(dateValue).add(2, 'days').toDate()}
                      defaultValue={dateValue}
                      value={dateValue}
                      onChange={setDateValue}
                      required
                    />
                    <TimeInput
                    label={(orderType === "2") ? "Delivery time" : "Pick-up time"}
                    placeholder={(orderType === "2") ? "Delivery time" : "Pick-up time"}
                    icon={<Clock size={16} />}
                    defaultValue={timeValue}
                    format="12"
                    onChange={setTimeValue}
                    error={(dayjs(timeValue).hour() - 8) < 0 || (dayjs(timeValue).hour() + 4) > 23}
                    required
                    />
                    <Select
                        label="Delivery Method"
                        placeholder="Select method"
                        data={[{label:"Pick-up", value:"1"}, {label:"Delivery", value:"2"}]}
                        value={orderType}
                        onChange={setOrderType}
                    />
                    <Select
                        label={(orderType === "2") ? "Branch Location" : "Pick-up Location"}
                        placeholder="Select Branch to pick-up"
                        data={[{label:"Sta. Mesa Branch", value:"0"}]}
                        defaultValue="0"
                        value={branchCode}
                        onChange={setBranchCode}
                    />
                    <TextInput
                    label="Special notes to staff/driver"
                    defaultValue={notesValue}
                    value={notesValue}
                    onChange={(event) => {
                        const { target } = event
                        setNotesValue(target.value)}}
                    />
                    </Box>
                </Stepper.Step>
                <Stepper.Step label="Payment" description="Select method">
                    <Center>
                        <Stack>
                            <Button
                                color="black"
                                radius="xl"
                                size="md"
                                onClick={async () => await submitTransactionCash()}
                            >
                                Cash-On-Delivery (COD)
                            </Button>
                            <PayPalScriptProvider options={paypalScriptOptions}>
                                <PaypalButtons Total={total} />
                            </PayPalScriptProvider>
                        </Stack>
                    </Center>
                </Stepper.Step>
                <Stepper.Completed>
                    <Center>
                        <Text>
                            Order has been placed. Orders can be also tracked upon `&quot;`My Orders`&quot;` of your Account.
                        </Text>
                    </Center>
                </Stepper.Completed>
            </Stepper>

            <Group position="center" mt="xl">
                {active == 1 && <Button variant="default" onClick={prevStep}>Back</Button> }
                {active == 0 && <Button onClick={nextStep} color="red">Next</Button>}
                {active == 2 &&
                <>
                        <Button onClick={() => router.push(`/order/${transDocId}`)} color="green">
                            <LoadingOverlay visible={transDocId === ""}>
                                View order
                            </LoadingOverlay>
                        </Button>
                </>
                }
            </Group>
            </>
        </Modal>
        <Box sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: 30,
            borderRadius: theme.radius.md
        })}>
            <Text size="xl" weight={600}>Order Summary</Text>
            <Space py={18}/>
            <Stack>
                {cart.map((item) => {
                    return (
                    <React.Fragment key={`${item.id}orderSumList`}>
                        <Grid justify="space-between" align="center">
                            <Text weight={400} size="sm">{item.quantity}x {item.name}</Text>
                            {parseInt(item.metadata.discount) == 0 ?
                            <Text size="sm" weight={400}>
                                ₱{item.quantity * parseInt(item.metadata.price)}
                            </Text> :
                            <Text size="sm" weight={400}>
                                ₱{(item.quantity*
                                    (parseFloat(item.metadata.price) - 
                                        (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100)))).toFixed(2)
                                 }
                            </Text>
                            }
                        </Grid>
                        <Divider/>
                    </React.Fragment>
                )})}
                <>
                    <Grid justify="space-between" align="center">
                        <Text weight={400} size="sm">Shipping</Text>
                        <Text weight={400} size="sm">TBC</Text>
                    </Grid>
                    <Divider/>
                </>
                <Grid justify="space-between" align="center">
                    <Text weight={700} size="lg">Total</Text>
                    <Text weight={700} size="lg">₱{total}</Text>
                </Grid>
                <Space py={3} />
                <Button 
                    variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                    radius="xl"
                    onClick={() => setConfirmModal(true)}
                >Checkout
                </Button>

            </Stack>
        </Box>
        </>
    )
}