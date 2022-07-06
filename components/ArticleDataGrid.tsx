import React from "react"
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Space, Badge } from '@mantine/core';
import { Pencil, Messages, Note, ReportAnalytics, Trash } from 'tabler-icons-react';

interface ProductDataGridProps {
  data: { avatar: string; name: string; job: string; email: string; rate: number }[];
}

export function ArticleDataGrid({ data }: ProductDataGridProps) {
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
        <Badge color="green">Active</Badge>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon>
            <Trash size={16} color="red"/> 
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
            <tr>
                <th>Article</th>
                <th>Last Modified</th>
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