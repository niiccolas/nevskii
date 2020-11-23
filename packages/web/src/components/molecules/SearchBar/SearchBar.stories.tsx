import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SearchBar } from '@Molecules';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<any> = args => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
