import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Badge, BadgeProps } from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    label: 'Badge label',
  },
} as Meta;

const Template: Story<BadgeProps> = args => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  backgroundColor: 'cyan',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  backgroundColor: '#f33',
};

export const Capsule = Template.bind({});
Capsule.args = {
  capsule: true,
  primary: true,
  backgroundColor: 'yellow',
};

export const Linked = Template.bind({});
Linked.args = {
  link: '#',
  backgroundColor: 'dodgerblue',
  prefetch: false,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  capsule: true,
};
