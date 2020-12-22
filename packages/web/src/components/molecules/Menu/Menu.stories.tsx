import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Menu, MenuProps } from '@Molecules';

export default {
  title: 'Molecules/Menu',
  component: Menu,
} as Meta;

const Template: Story<MenuProps> = args => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      href: '#',
      label: 'Dvd',
      id: 'id-01',
    },
    {
      href: '#',
      label: 'Blu-Ray',
      id: 'id-02',
    },
    {
      href: '#',
      label: 'Bestsellers',
      id: 'id-03',
    },
    {
      href: '#',
      label: 'Categories',
      id: 'id-04',
    },
    {
      href: '#',
      label: 'FAQ',
      id: 'id-05',
    },
    {
      href: '#',
      label: 'About us',
      id: 'id-06',
    },
  ],
};
