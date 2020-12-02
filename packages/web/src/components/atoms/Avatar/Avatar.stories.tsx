import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    label: 'Avatar label',
    imageUrl: 'https://image.tmdb.org/t/p/w200/xD4jTA3KmVp5Rq3aHcymL9DUGjD.jpg',
  },
} as Meta;

const Template: Story<AvatarProps> = args => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Carrie-Anne Moss',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Carrie-Anne Moss',
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Carrie-Anne Moss',
  size: 'small',
};

export const Linked = Template.bind({});
Linked.args = {
  label: 'Carrie-Anne Moss',
  link: '#',
  prefetch: false,
};

export const Desaturated = Template.bind({});
Desaturated.args = {
  label: 'Carrie-Anne Moss',
  desaturate: true,
};

export const NoImage = Template.bind({});
NoImage.args = {
  imageUrl: null,
  label: 'Carrie-Anne Moss',
};

export const NoTooltip = Template.bind({});
NoTooltip.args = {
  imageUrl: null,
  label: 'Carrie-Anne Moss',
  customTooltip: false,
};
