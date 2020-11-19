import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Navbar, NavbarProps } from '@Molecules/Navbar';

export default {
  title: 'Navbar',
  component: Navbar,
} as Meta;

const Template: Story<NavbarProps> = args => <Navbar {...args} />;

export const Text = Template.bind({});
Text.args = {
  navLinks: [
    {
      label: 'Recherche',
    },
    {
      label: 'Profil',
    },
    {
      label: 'Panier',
    },
  ],
};

export const Icons = Template.bind({});
Icons.args = {
  navLinks: [
    {
      icon: 'search',
    },
    {
      icon: 'user',
    },
    {
      icon: 'cart',
    },
  ],
};

export const Both = Template.bind({});
Both.args = {
  navLinks: [
    {
      label: 'Search',
      icon: 'search',
    },
    {
      label: 'Bestsellers',
    },
    {
      label: 'Profile',
      icon: 'user',
    },
    {
      label: 'Cart',
      icon: 'cart',
    },
  ],
};
