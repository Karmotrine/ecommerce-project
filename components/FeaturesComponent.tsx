import React from 'react';
import { createStyles, Text, SimpleGrid, Container } from '@mantine/core';
import { Truck, Soup, Coin } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  feature: {
    position: 'relative',
    paddingTop: theme.spacing.xl,
    paddingLeft: theme.spacing.xl,
  },

  overlay: {
    position: 'absolute',
    height: 100,
    width: 160,
    top: 0,
    left: 0,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors.red[7], 0.2)
        : theme.colors.red[0],
    zIndex: 1,
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 6 : 5],
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  contentText: {
    color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[7],
    textAlign: "justify"
  }
}));

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<React.ComponentProps<typeof Truck>>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.feature, className)} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon size={38} className={classes.icon} />
        <Text weight={700} size="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text className={classes.contentText} size="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: Truck,
    title: 'Shipping',
    description:
      "Looking for a way to grab a delicious ramen and bento kits without breaking the bank? Look no further than our always-competitive shipping costs, so you can be sure you're getting the best deal possible.",
  },
  {
    icon: Soup,
    title: 'Quality',
    description:
      "Here at Imbento, we believe that quality comes first. That\'s why we only use the freshest ingredients in our ramen and bento kits. ",
  },
  {
    icon: Coin,
    title: 'Affordable',
    description:
      "There are a number of affordable ramen and bento kits available that make it easy and affordable to enjoy your favorite Japanese dishes at home. ",
  },
];

export function FeaturesComponent() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}