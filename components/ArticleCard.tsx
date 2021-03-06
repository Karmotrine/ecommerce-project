import React from 'react';
import { createStyles, Paper, Text, Title, Button, Anchor } from '@mantine/core';
import { Content } from '../lib/types';
import Link from "next/link"

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export function ArticleCard(item: Content) {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${item.hero})`, }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          Article
        </Text>
        <Title order={3} className={classes.title}>
          {item.title}
        </Title>
      </div>
      <Link passHref href={`/news/${item.id}`}>
        <Anchor component="a">
            <Button variant="white" color="dark">
                Read
            </Button>
        </Anchor>
      </Link>
    </Paper>
  );
}