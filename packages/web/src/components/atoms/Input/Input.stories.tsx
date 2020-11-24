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
  args: {
    primary: true,
    placeHolder: 'Placeholder text…',
  },
} as Meta;

const Template: Story<InputProps> = args => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  placeHolder: 'Primary input placeholder…',
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
