import React from 'react';
import { Card, Image, Text, Group, Badge, createStyles, Center, Button, Modal, LoadingOverlay, Space, Anchor } from '@mantine/core';
import { X } from 'tabler-icons-react';
import { Product } from '../lib/types';
import { useUser } from '../lib/hooks/useUser';
import { useCart } from '../lib/hooks/useCart';
import useLoginModal from './hooks/useLoginModal';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import {app as firebaseClient, auth} from "../lib/firebaseClient"
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from "next/link"


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  imageSection: {
    padding: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

export default function ProductCard(item:Product) {
  const { asPath } = useRouter();
  const { classes } = useStyles();
  const userLogged = useUser()
  const { addToCart, removeFromCart, getItem} = useCart();
  const cartItem = getItem(item)

  const authInstance = getAuth(firebaseClient)
  const { loginModal, setLoginModal } = useLoginModal((state) => state);
  const [ error ] = useAuthState(authInstance)
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: asPath,
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
  }

  return (
    <>
    <Modal
        opened={loginModal}
        onClose={() => setLoginModal(loginModal)}
        title="Please log-in to continue."
    >
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        {error && <Text size="xs" color="red">Error logging-in, please try again.</Text>}
    </Modal>
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Anchor component="a">
        <Link href={`/product/${item.id}`} passHref>
          <Image height={300}src={item.img[0]} alt={item.name} />
        </Link>
        </Anchor>
      </Card.Section>

      <Group position="apart" mt="md" mb="md" grow={true}>
        <div>
          <Link href={`/product/${item.id}`} passHref>
            <Text component="a" weight={500}>{item.name}</Text>
          </Link>
        </div>
        {item.metadata.discount != "0" &&
            <Badge 
                style={{ flex: 1 }}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 } }
                size="md"
            >
                {item.metadata.discount}% off
            </Badge>
        }
      </Group>
      
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
           
                {parseInt(item.metadata.discount) == 0 ?
                  <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>₱{item.metadata.price}</Text> :
                 <>
                  <Text size="xl" weight={700} sx={{ lineHeight: 1 }}><s>₱{item.metadata.price}</s></Text>
                  <Space py={2}/>
                  <Text color="green" size="xl" weight={700} sx={{ lineHeight: 1 }}>
                    ₱{parseFloat(item.metadata.price) - (parseFloat(item.metadata.price) * (parseInt(item.metadata.discount)/100))}
                  </Text>
                 </>
                 }
            
            <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
              per serving
            </Text>
          </div>
            {!cartItem &&
                <Button
                    variant="gradient" 
                    gradient={{ from: 'orange', to: 'red' }}
                    radius="xl" 
                    style={{ flex: 1 }}
                    onClick={userLogged.data ? 
                        () => addToCart(item) : 
                        () => setLoginModal(loginModal)}
                >
                    Add to Cart
                </Button>
            }
            {!!cartItem && !!userLogged &&
                <Button
                    style={{ flex: 1 }}
                    variant="outline"
                    radius="xl"
                    color="red"
                    onClick={userLogged.data && !! cartItem ? 
                            () => removeFromCart(item) : 
                            () => setLoginModal(loginModal)}
                >
                    <X />
                </Button>
            }
        </Group>
      </Card.Section>
    </Card>
    </>
  );
}