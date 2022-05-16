import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import { BrandTwitter } from 'tabler-icons-react';

export function TwitterButton(props: ButtonProps<'a'>) {
    return <Button component="a" leftIcon={<BrandTwitter/>} variant="default" {...props} />;
}