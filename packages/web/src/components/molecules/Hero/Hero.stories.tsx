import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Hero } from '@Molecules';

export default {
  title: 'Molecules/Hero',
  component: Hero,
};

const Template: Story<ComponentProps<typeof Hero>> = args => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoSrc: 'iamcuba.mp4',
  poster:
    'https://upload.epagine.fr/3327/promo/3327_11035_20-10-31-09-46-35.jpg',
  ctaLabel: 'CTA Label',
  headerLabel: '“Soy Cuba”',
  subtitleLabel: 'Coffret Blu-Ray 4K',
};
