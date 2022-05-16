import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import { BrandFacebook } from 'tabler-icons-react';

export function FacebookButton(props: ButtonProps<'a'>) {
    return (
      <Button
        component="a"
        leftIcon={<BrandFacebook/>}
        sx={(theme) => ({
          backgroundColor: '#4267B2',
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.fn.darken('#4267B2', 0.1),
          },
        })}
        {...props}
      />
    );
  }