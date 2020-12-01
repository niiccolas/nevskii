import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { AvatarList, AvatarListProps } from '@Molecules';

export default {
  title: 'Molecules/AvatarList',
  component: AvatarList,
  args: {
    avatars: [
      { src: null, name: 'Alexandre Gillet' },
      {
        src: 'https://image.tmdb.org/t/p/w200/oAhObnVhqsdJHO6vlMuW2a82Mwa.jpg',
        name: 'Barbara Tissier',
      },
      {
        src: 'https://image.tmdb.org/t/p/w200/dCvzV3bEvINI2cmJxqP91JSnFDG.jpg',
        name: 'Gilbert Levy',
      },
      {
        src: 'https://image.tmdb.org/t/p/w200/t5LGiaUxOhqoApmJumZOv0wDnLh.jpg',
        name: 'Mami Koyama',
      },
      { src: null, name: 'Mathias Kozlowski' },
      {
        src: 'https://image.tmdb.org/t/p/w200/xCAsuzc5OBQZWhG5WSZIyhBZ7xj.jpg',
        name: 'Mitsuo Iwata',
      },
      {
        src: 'https://image.tmdb.org/t/p/w200/7usoPlvc9Xa1rDA2vxmVi0OvLDb.jpg',
        name: 'Nozomu Sasaki',
      },
      {
        src: 'https://image.tmdb.org/t/p/w200/7eJeYv2OCHKAadeFVdabVkpWldo.jpg',
        name: 'Tesshou Genda',
      },
    ],
    customTooltip: true,
  },
};

const Template: Story<AvatarListProps> = args => <AvatarList {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Unstacked = Template.bind({});
Unstacked.args = {
  stacked: false,
};

export const Grayscale = Template.bind({});
Grayscale.args = {
  desaturate: true,
};

export const NoImages = Template.bind({});
NoImages.args = {
  avatars: [
    { src: null, name: 'Alexandre Gillet' },
    {
      src: null,
      name: 'Barbara Tissier',
    },
    {
      src: null,
      name: 'Gilbert Levy',
    },
    {
      src: null,
      name: 'Mami Koyama',
    },
    { src: null, name: 'Mathias Kozlowski' },
    {
      src: null,
      name: 'Mitsuo Iwata',
    },
    {
      src: null,
      name: 'Nozomu Sasaki',
    },
    {
      src: null,
      name: 'Tesshou Genda',
    },
  ],
  stacked: true,
};

export const NoTooltip = Template.bind({});
NoTooltip.args = {
  customTooltip: false,
};
