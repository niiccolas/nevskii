import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input, InputProps } from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Primary Input',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Input',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Input',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Input',
};
