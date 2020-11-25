import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Navbar, NavbarProps } from '@Molecules';

export default {
  title: 'Molecules/Navbar',
  component: Navbar,
} as Meta;

const Template: Story<NavbarProps> = args => <Navbar {...args} />;

export const Text = Template.bind({});
Text.args = {
  navLinks: [
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
      icon: 'user',
    },
    {
      icon: 'cart',
    },
  ],
};

export const TextAndIcons = Template.bind({});
TextAndIcons.args = {
  navLinks: [
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

export const WithSearchBar = Template.bind({});
WithSearchBar.args = {
  withSearch: true,
  navLinks: [
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
