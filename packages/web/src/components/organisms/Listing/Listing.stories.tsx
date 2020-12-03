import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Listing, ListingProps } from './Listing';

export default {
  title: 'Organisms/Listing',
  component: Listing,
} as Meta;

const Template: Story<ListingProps> = args => <Listing {...args} />;

export const Default = Template.bind({});
Default.args = {
  prefetch: false,
  header: 'Movies',
  products: {
    page: 23,
    itemsPerPage: 10,
    pagesTotal: 40,
    itemsTotal: 400,
    items: [
      {
        idProduct: 221,
        title: 'Le Dos rouge',
        titleOriginal: 'Le Dos rouge',
        price: '1690',
        synopsis:
          "Un cinéaste reconnu travaille sur son prochain film, consacré à la monstruosité dans la peinture. Il est guidé dans ses recherches par une historienne d'art avec laquelle il entame des discussions étranges et passionnées.",
        productionYear: 2014,
        createdAt: '2015-09-22T00:00:00.000Z',
        ean: '3545020038673',
        imageUrl: 'https://images.epagine.fr/673/3545020038673_vid.jpg',
        authors: {
          idProductAuthors: 278,
        },
        mediaType: {
          idMediaType: 0,
          name: 'DVD',
        },
        availability: {
          idAvailability: 0,
          name: 'Disponible',
        },
      },
      {
        idProduct: 224,
        title: 'Mon roi',
        titleOriginal: 'Mon roi',
        price: '1290',
        synopsis:
          "Suite à une grave chute de ski, Tony est admise dans un centre de rééducation afin de retrouver la motricité de son genou. Rythmé par les soins et la rencontre avec une bande, son séjour est l'occasion de se remémorer son passé : elle revit les grandes lignes de sa relation amoureuse avec Georgio qu'elle a aimé avec passion.",
        productionYear: 2015,
        createdAt: '2016-02-26T00:00:00.000Z',
        ean: '5053083064471',
        imageUrl: 'https://images.epagine.fr/471/5053083064471_vid.jpg',
        authors: {
          idProductAuthors: 281,
        },
        mediaType: {
          idMediaType: 0,
          name: 'DVD',
        },
        availability: {
          idAvailability: 0,
          name: 'Disponible',
        },
      },
      {
        idProduct: 227,
        title: 'Le Redoutable',
        titleOriginal: 'Le Redoutable',
        price: '1690',
        synopsis:
          "Paris 1967. Jean-Luc Godard, le cinéaste le plus en vue de sa génération, tourne La Chinoise avec la femme qu'il aime, Anne Wiazemsky, de 20 ans sa cadette. Ils sont heureux, amoureux, séduisants, ils se marient. Mais la réception du film à sa sortie enclenche chez Jean-Luc une remise en question profonde. Mai 68 va amplifier le processus, et la crise que traverse Jean-Luc va le transformer profondément passant de cinéaste star en artiste maoïste hors système aussi incompris qu'incompréhensible.",
        productionYear: 2017,
        createdAt: '2018-01-30T00:00:00.000Z',
        ean: '5053083141028',
        imageUrl: 'https://images.epagine.fr/028/5053083141028_vid.jpg',
        authors: {
          idProductAuthors: 285,
        },
        mediaType: {
          idMediaType: 0,
          name: 'DVD',
        },
        availability: {
          idAvailability: 0,
          name: 'Disponible',
        },
      },
      {
        idProduct: 225,
        title: 'Bonheur académie',
        titleOriginal: 'Bonheur académie',
        price: '1990',
        synopsis:
          "Lily et Dominique partent sous le soleil de Croatie, bien décidées à trouver l'âme soeur en participant à un camp d'été organisé par le mouvement raélien. Entre ateliers d'éveil, méditation et quête du bonheur, les deux jeunes femmes se disputent les faveurs d'un chanteur...",
        productionYear: 2016,
        createdAt: '2017-11-21T00:00:00.000Z',
        ean: '3545020046906',
        imageUrl: 'https://images.epagine.fr/906/3545020046906_vid.jpg',
        authors: {
          idProductAuthors: 283,
        },
        mediaType: {
          idMediaType: 0,
          name: 'DVD',
        },
        availability: {
          idAvailability: 0,
          name: 'Disponible',
        },
      },
      {
        idProduct: 226,
        title: 'Ava',
        titleOriginal: 'Ava',
        price: '1690',
        synopsis:
          "Ava, 13 ans, est en vacances au bord de l'océan quand elle apprend qu'elle va perdre la vue plus vite que prévu. Sa mère décide de faire comme si de rien n’était pour passer le plus bel été de leur vie. Ava affronte le problème à sa manière. Elle vole un grand chien noir qui appartient à un jeune homme en fuite...",
        productionYear: 2017,
        createdAt: '2017-11-08T00:00:00.000Z',
        ean: '3453277307131',
        imageUrl: 'https://images.epagine.fr/131/3453277307131_vid.jpg',
        authors: {
          idProductAuthors: 284,
        },
        mediaType: {
          idMediaType: 0,
          name: 'DVD',
        },
        availability: {
          idAvailability: 0,
          name: 'Disponible',
        },
      },
    ],
  },
};
