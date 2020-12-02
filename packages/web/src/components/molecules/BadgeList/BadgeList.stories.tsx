import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { BadgeList } from '@Molecules';

export default {
  title: 'Molecules/BadgeList',
  component: BadgeList,
};

const Template: Story<ComponentProps<typeof BadgeList>> = args => (
  <BadgeList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  badges: [{ label: 'BLU-RAY' }, { label: 'ZONE 1' }, { label: '138 minutes' }],
};
