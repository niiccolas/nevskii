import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Product, ProductProps } from './Product';

export default {
  title: 'Organisms/Product',
  component: Product,
} as Meta;

const Template: Story<ProductProps> = args => <Product {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    title: 'Akira',
    titleOriginal: 'Akira',
    price: '1490',
    synopsis:
      "Neo-Tokyo, an 2019. Détruite trente ans plus tôt par une mystérieuse explosion, la mégalopole japonaise renaît de ses cendres et se prépare à héberger les Jeux Olympiques. Les oubliés de la reconstruction manifestent chaque jour contre le pouvoir en place, tandis que les plus jeunes trouvent refuge dans la drogue et la baston. Parmi eux, Kaneda et Tetsuo, amis d'enfance, et membres d'un gang de jeunes motards. Au coeur des travaux du stade, une section spéciale de l'armée poursuit en grand secret le projet Akira, tandis que les dissidents cherchent à percer le mystère qui se cache derrière ce nom.",
    productionYear: 1988,
    createdAt: '2012-05-16T00:00:00.000Z',
    ean: '5413505380600',
    imageUrl: 'https://images.epagine.fr/600/5413505380600_vid.jpg',
    availability: 'Disponible',
    stockStatus: 'Sur commande',
    publisher: 'Dybex',
    distributor: 'OSP',
    ageRating: 'Tous publics',
    mediaType: 'DVD',
    countries: 'japon',
    authors: 'Katsuhiro Otomo',
    bonusContent:
      "Contient 2 doublages français :\n- le doublage version 1.0 (d'origine), en DD 2.0\n- le doublage version 2.0 (dénuée des erreurs historiques de traduction, et avec l'ensemble des voix françaises originales), en DD 5.1\nMaster d'origine en Haute Définition\n\nTeasers\nBandes-annonces Dybex",
    minutes: 125,
    dvdZone: '2',
    category: 'Animation',
    formatTv: '16/9 Anamorphique',
    formatFilm: '1.85',
    actors: 'Alexandre Gillet;Barbara Tissier;Mathias Kozlowski',
    audioTracks:
      'Français DD 2.0;Français DD 5.1;Japonais DD 2.0;Japonais DD 5.1',
    subcategories: 'Manga',
    genres: 'Action / Aventure;Drame;Science-Fiction',
    subtitles: 'Français;Néerlandais',
    collection: undefined,
  },
};
