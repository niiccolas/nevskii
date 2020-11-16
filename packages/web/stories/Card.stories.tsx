import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import Card from './Card';

export default {
  title: 'Card',
  component: Card,
};

const Template: Story<ComponentProps<typeof Card>> = args => <Card {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  title: 'Ma vie de courgette',
  alt: 'Jaquette Ma Vie de Courgette',
  src: 'https://images.epagine.fr/729/3660485501729_vid.jpg',
  mediaType: 'Blu-Ray',
  price: '1490',
};
