import React from "react"
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Space, Badge, Anchor } from '@mantine/core';
import { Pencil, Messages, Note, ReportAnalytics, Trash, Check } from 'tabler-icons-react';
import { orderStatus, Transaction } from "../lib/types";
import { useTransactionDocMutation } from "../lib/hooks/useTransactionMutation";
import { showNotification } from "@mantine/notifications";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const CONFIRM_SHIP_NOTIF = (transId:string) => {
  return ({
    title: 'Shipment Confirmed.',
    message: `Shipment confirmed for Order ID: ${transId}`,
    color: 'green',
    icon: <Check size="sm" />,
  })
}
const CONFIRM_PAY_NOTIF = (transId:string) => {
  return ({
    title: 'Payment Confirmed.',
    message: `Payment confirmed for Order ID: ${transId}`,
    color: 'green',
    icon: <Check size="sm" />,
  })
}
const CONFIRM_CANCEL_NOTIF = (transId:string) => {
  return ({
    title: 'Transaction Cancelled',
    message: `Order ID: ${transId} has been cancelled.`,
    color: 'green',
    icon: <Check size="sm" />,
  })
}

const CONFIRM_DELETE_NOTIF = (transId:string) => {
  return ({
    title: 'Transaction Record Deleted',
    message: `Order ID: ${transId}'s record has been deleted`,
    color: 'green',
    icon: <Check size="sm" />,
  })
}


function BadgeSelector(item: Transaction) {
  if (item.metadata.currentStatus.isCancelled) {
    return (<Badge color="red">Cancelled</Badge>)
  }
    if (item.metadata.currentStatus.isPlaced) {
      if (item.paymentDetails.isPaid) {
          if (item.metadata.currentStatus.isShipped) {
              if (item.metadata.currentStatus.isReceived) {
                  return (<Badge color="green">Received</Badge>)
              } else {
                return (<Badge color="yellow">Shipped</Badge>)
              }
          } else {
            return (<Badge color="yellow">Paid</Badge>)
          }
      } else {
        return (<Badge color="yellow">Placed</Badge>)
      }
  } else {
    return (<Badge color="orange">Placing...</Badge>)
  }
}

export function OrderAdminDataGrid(data: Transaction[]) {
  const router = useRouter()
  const {confirmPayment, confirmShipping, cancelTransaction, deleteTransaction } = useTransactionDocMutation()
  const rows = data.map((item) => {
    const cart = Object.values(item.cart)
    const status = item.metadata.currentStatus
    const total = cart.reduce<number>((prev,item) => {
      const itemTotal = (parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100)))*item.quantity;
      return prev + itemTotal
      }, 0)
    const timestamp = item.metadata.DeliDate as Timestamp
    return (
    <tr key={item._id}>
      <td>
        <Group spacing="sm">
          <div>
            <Anchor component="a" style={{color:"inherit"}}>
              <Text size="sm" weight={500} onClick={() => router.push(`/order/${item._id}`)}>
                {item._id}
              </Text>
            </Anchor>
            <Text color="dimmed" size="xs">
              UID: {item.metadata.userid}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{dayjs.unix(timestamp.seconds).format("MMMM DD, YYYY")}</Text>
        <Text size="xs" color="dimmed">
          {dayjs.unix(timestamp.seconds).format("hh:mm A")}
        </Text>
      </td>
      <td>
        <Text size="sm">₱{total}</Text>
      </td>
      <td>
      <Group spacing={0} position="left">
        <BadgeSelector {...item} />
      </Group>
      </td>
      <td>
        <Group spacing={0} position="right">
          <Menu transition="pop" withArrow placement="end">
            <Menu.Item 
              icon={<Note size={16} />}
              disabled={item.paymentDetails.isPaid}
              onClick={() => {confirmPayment(item._id); showNotification(CONFIRM_PAY_NOTIF(item._id))}}
            >
              Confirm payment</Menu.Item>
            <Menu.Item 
              icon={<Note size={16} />}
              disabled={status.isShipped}
              onClick={() =>{confirmShipping(item._id); showNotification(CONFIRM_SHIP_NOTIF(item._id))}}
            >
              Mark as shipped/picked-up
            </Menu.Item>
            <Menu.Item 
              icon={<ReportAnalytics size={16} />} 
              color="red"
              disabled={item.metadata.currentStatus.isReceived || item.metadata.currentStatus.isCancelled}
              onClick={() => {cancelTransaction(item._id); showNotification(CONFIRM_CANCEL_NOTIF(item._id))}}
              >
                Cancel Order
            </Menu.Item>
            <Menu.Item 
              icon={<Trash size={16} />}
              color="red"
              onClick={() => {deleteTransaction(item._id); showNotification(CONFIRM_DELETE_NOTIF(item._id))}}
            >
              Delete Record
            </Menu.Item>
          </Menu>
        </Group>
      </td>
    </tr>
  )});

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Delivery date</th>
                <th>Total Price</th>
                <th style={{paddingLeft:20}}>Status</th>
                <th></th>

            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export { }