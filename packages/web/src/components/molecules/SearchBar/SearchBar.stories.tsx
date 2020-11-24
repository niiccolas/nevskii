import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { SearchBar, SearchBarProps } from '@Molecules';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    searchLabel: 'SEARCH LABEL',
    active: true,
  },
} as Meta;

const Template: Story<SearchBarProps> = args => <SearchBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
};

export const Large = Template.bind({});
Large.args = {
  primary: true,
  size: 'large',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
