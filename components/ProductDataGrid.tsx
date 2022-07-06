import React from "react"
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Space, Badge } from '@mantine/core';
import { Pencil, Messages, Note, ReportAnalytics, Trash } from 'tabler-icons-react';

interface ProductDataGridProps {
  data: { avatar: string; name: string; job: string; email: string; rate: number }[];
}

export function ProductDataGrid({ data }: ProductDataGridProps) {
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
            <Text color="dimmed" size="xs">
              {item.job}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{item.email}</Text>
        <Text size="xs" color="dimmed">
          Email
        </Text>
      </td>
      <td>
        <Text size="sm">₱ {item.rate.toFixed(2)}</Text>
        <Text size="xs" color="dimmed">
          Rate
        </Text>
      </td>
      <td>
        <Badge color="green">Active</Badge>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <Menu transition="pop" withArrow placement="end">
            <Menu.Item icon={<Note size={16} />}>Adjust Discount</Menu.Item>
            <Menu.Item icon={<ReportAnalytics size={16} />}>Activate Listing</Menu.Item>
            <Menu.Item icon={<Trash size={16} />} color="red">
              Delete Product
            </Menu.Item>
          </Menu>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
            <tr>
                <th>Product</th>
                <th>Last Modified</th>
                <th>Pricing</th>
                <th>Status</th>
                <th></th>

            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export { }