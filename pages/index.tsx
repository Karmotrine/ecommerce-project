import React from 'react';
import { createStyles, Overlay, Container, Title, Button, Text, Group, Center, Space, Stack } from "@mantine/core"
import { app } from '../lib/firebaseClient';
import useOrderModal from '../components/hooks/useOrderModal';
import { FeaturesComponent } from '../components/FeaturesComponent';
import { useCart } from '../lib/hooks/useCart';
import { ProductSaleSubsection } from './menu';
import { ArticleContext } from './news';
const useStyles = createStyles((theme) => ({
  hero: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1492998680170-81f8863d8d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  container: {
    height: 700,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: 'relative',

    [theme.fn.smallerThan('sm')]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][1],
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  wrapper: {
    marginLeft:20,
    marginRight:20,
  },

  featuresWrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },
  featuresDescription: {
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
  featuresTitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },
  featuresSubtitle: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 300,
    fontSize: 24,
    marginBottom: theme.spacing.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 18,
      textAlign: 'left',
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const { isActive, setOrderActive } = useOrderModal((state) => state);
  const { cart } = useCart()
  return (
    <div>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>
            Taste from {' '}
            <Text component="span" color="red" inherit>
              Japan
            </Text>
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
          Imbento proudly provides a great variety of Japanese meals such as
          Bento and Ramen kits at your convenience.
          </Text>

          <Button 
            variant="gradient" gradient={{ from: 'orange', to: 'red' }}
            size="xl" radius="xl" className={classes.control}
            onClick={() => setOrderActive(isActive)}
          >
            Order Now
          </Button>
        </Container>
        
      </div>
      <div className={classes.wrapper}>
        <Container className={classes.featuresWrapper}>
          <Center>
            <Group>
              <Title className={classes.featuresTitle}>いただきます！</Title>
              <Text className={classes.featuresSubtitle} color="dimmed">{"(Let's Eat!)"}</Text>
            </Group>
          </Center>
          <Container size={560} p={0}>
            <Text size="sm" className={classes.featuresDescription}>
            Our bento and ramen kits is a complete meal solution for every hectic household. Carefully curated, balanced, and nutritional options will reduce the burden on the home cook without sacrificing its quality and taste.
            </Text>
          </Container>
          <FeaturesComponent />
          <Space py={2} />
          <Center>
            <Stack spacing="lg">
            <Container size={560} p={0}>
              <Title className={classes.featuresTitle}>On Sale</Title>
              <Text size="sm" className={classes.featuresDescription}>
                Try out some of our flavors at a discounted price!
              </Text>
            </Container>
            <ProductSaleSubsection />
            <Space />
            <Container size={560} py={0}>
              <Title className={classes.featuresTitle}>News</Title>
              <Text size="sm" className={classes.featuresDescription}>
                What&apos;s happening at Imbento?
              </Text>
              <Space />
            </Container>
            <ArticleContext />
            </Stack>
          </Center>
        </Container>
      </div>
    </div>
  );
}
