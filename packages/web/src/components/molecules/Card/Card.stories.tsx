import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Card } from '@Molecules';

export default {
  title: 'Molecules/Card',
  component: Card,
};

const Template: Story<ComponentProps<typeof Card>> = args => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Akira',
  alt: 'Akira',
  src: 'https://images.epagine.fr/341/5413505306341_vid.jpg',
  mediaType: 'DVD',
  price: '1090',
  prefetch: false,
};
