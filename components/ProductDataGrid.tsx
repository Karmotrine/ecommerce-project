import React, { Dispatch, SetStateAction } from "react"
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Space, Badge, Anchor, Center, Tooltip } from '@mantine/core';
import { Pencil, Messages, Note, ReportAnalytics, Trash, CirclePlus } from 'tabler-icons-react';
import { Product } from "../lib/types";
import { useRouter } from "next/router";
import { useProductDocMutation } from "../lib/hooks/useProductMutation";

function useRowBuilder(
    data : Product[],
    setOpened: Dispatch<SetStateAction<boolean>>, 
    setTargetAdjustDisc: Dispatch<SetStateAction<string>>
  ) {
  const router = useRouter()
  const { adjustDiscount, adjustStatus, deleteProduct } = useProductDocMutation()
  return data.map((item) => (
    <>
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.img[0]} radius={40} />
          <div>
            <Anchor component="a" style={{color:"inherit"}} onClick={() => router.push(`/product/${item.id}`)}>
              <Text size="sm" weight={500}>
                {item.name}
              </Text>
              <Text color="dimmed" size="xs">
                ID: {item.id}
              </Text>
            </Anchor>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{item.metadata.stockLeft}</Text>
        <Text size="xs" color="dimmed">
          stocks left
        </Text>
      </td>
      <td>
        <Text size="sm">₱ {item.metadata.price}</Text>
        <Text size="xs" color="dimmed">
          Per serving
        </Text>
      </td>
      <td>
        <Text size="sm">{item.metadata.discount}%</Text>
      </td>
      <td>
        {item.active ? <Badge color="green">Active</Badge> : <Badge color="orange">Inactive</Badge>}
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
          <Anchor size="xs" component="a" style={{color:"inherit"}} onClick={() => router.push(`/product/${item.id}/edit`)} inline>
            <Pencil size={16}/>
          </Anchor>
          </ActionIcon>
          <Menu transition="pop" withArrow placement="end">
            <Menu.Item 
              icon={<Note size={16} />}
              onClick={() => {setTargetAdjustDisc(item.id); setOpened(true);}}
            >
              Adjust Discount
            </Menu.Item>
            {item.active ? 
            <Menu.Item icon={<ReportAnalytics size={16} />} onClick={() => adjustStatus(item.active, item.id)}>Deactivate Listing</Menu.Item>
            : <Menu.Item icon={<ReportAnalytics size={16} />} onClick={() => adjustStatus(item.active, item.id)}>Activate Listing</Menu.Item>
            }
            <Menu.Item icon={<Trash size={16} />} color="red" onClick={() => deleteProduct(item.id)}>
              Delete Product
            </Menu.Item>
          </Menu>
        </Group>
      </td>
    </tr>
    </>
  ));
}

export function ProductDataGrid(data : Product[], 
  setOpened: Dispatch<SetStateAction<boolean>>, 
  setTargetAdjustDisc: Dispatch<SetStateAction<string>>) {
  const router = useRouter()
  const rows = useRowBuilder(data, setOpened, setTargetAdjustDisc)
  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
            <tr>
                <th>Product</th>
                <th>Stocks Left</th>
                <th>Pricing</th>
                <th>Discount (%)</th>
                <th>Status</th>
                <th>
                  <Center>
                    <Anchor size="xs" component="a" style={{color:"inherit"}} onClick={() => router.push("/admin/products/add")} inline>
                      <CirclePlus/>
                    </Anchor>
                  </Center>
                </th>

            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export { }