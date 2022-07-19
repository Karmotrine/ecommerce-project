import React from "react"
import { Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Space, Badge, Anchor, Center } from '@mantine/core';
import { Pencil, Messages, Note, ReportAnalytics, Trash, CirclePlus } from 'tabler-icons-react';
import { Content } from "../lib/types";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import { useContentDocMutation } from "../lib/hooks/useContentMutation";

export function ArticleDataGrid(data:Content[]) {
  const router = useRouter()
  const {updateContent, deleteContent} = useContentDocMutation()
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.hero} radius={40} />
          <div>
          <Link href={`/news/${item.id}`} passHref>
            <Anchor component="a" style={{color:"inherit"}}>
              <Text size="sm" weight={500}>
                {item.title}
              </Text>
            </Anchor>
          </Link>
          </div>
        </Group>
      </td>
      <td>
          <Text size="sm" weight={500}>
            {dayjs.unix(item.created_at.seconds).format("MMMM DD, YYYY")}
          </Text>
          <Text color="dimmed" size="xs">
            {dayjs.unix(item.created_at.seconds).format("hh:mm A")}
          </Text>
      </td>
      <td>
        <Text size="sm">{item.excerpt}</Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} onClick={() => router.push(`/admin/editarticle/${item.id}`)}/>
          </ActionIcon>
          <ActionIcon>
            <Trash size={16} color="red" onClick={() => deleteContent(item.id)}/> 
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
                <th>Date Created</th>
                <th>Excerpt</th>
                <th>
                  <Group position="right">
                      <Anchor size="xs" component="a" style={{color:"inherit"}} onClick={() => router.push("/admin/addcontent")} inline>
                        <CirclePlus/>
                      </Anchor>
                  </Group>
                </th>

            </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export { }