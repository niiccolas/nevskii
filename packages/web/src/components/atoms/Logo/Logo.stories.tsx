import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Logo, LogoProps } from './Logo';

export default {
  title: 'Atoms/Logo',
  component: Logo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LogoProps> = args => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  logo: 'nevskii',
  logoMobile: 'K',
};
