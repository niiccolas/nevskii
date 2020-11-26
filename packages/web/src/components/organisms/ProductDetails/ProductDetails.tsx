import React from 'react';
import { GetStaticProps } from 'next';
import { Card } from '@Molecules';
import { Badge, Button } from '@Atoms';
import { BadgeList } from '@Molecules';

import { formatValuesList } from '@utils';

import './ProductDetails.scss';

export interface Product {
  title: string;
  titleOriginal: string;
  price?: string;
  synopsis?: string;
  productionYear?: number;
  createdAt: string;
  ean?: string;
  imageUrl?: string;
  availability: string;
  stockStatus: string;
  publisher: string;
  distributor: string;
  ageRating: string;
  mediaType: string;
  countries: string;
  authors: string;
  bonusContent?: string;
  minutes: number;
  dvdZone: string;
  category: string;
  formatTv: string;
  formatFilm: string;
  actors: string;
  audioTracks: string;
  subcategories: string;
  genres: string;
  subtitles: string;
  collection?: string;
}

export interface ProductDetailsProps {
  product: Product;
}

const getTrailerId = async (title: string): Promise<string | null> => {
  const results = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${title} official trailer &key=AIzaSyB-tLloMR-CZdbP5fXZ9Gg--4GgJIUIkHM`,
  );
  const trailers = await results.json();
  const videoId = trailers.items[0]?.id?.videoId;
  console.log({ trailers, videoId });
  return videoId || null;
};

export const getStaticProps: GetStaticProps<any> = async context => {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

export const ProductDetails: React.FC<ProductDetailsProps> = async ({
  product,
}) => {
  const {
    title,
    titleOriginal,
    price,
    synopsis,
    productionYear,
    createdAt,
    ean,
    imageUrl,
    availability,
    stockStatus,
    publisher,
    distributor,
    ageRating,
    mediaType,
    countries,
    authors,
    bonusContent,
    minutes,
    dvdZone,
    category,
    formatTv,
    formatFilm,
    actors,
    audioTracks,
    subcategories,
    genres,
    subtitles,
    collection,
  } = product;

  // const trailerId = await getTrailerId(title);
  // console.log({ trailerId });
  return (
    <article className="ProductDetails">
      <img src={imageUrl} alt={title} className="ProductDetails__poster" />
      <header>
        <h2 className="ProductDetails__title">{title}</h2>
        <h3 className="ProductDetails__author">
          {authors} ({productionYear})
        </h3>
        <BadgeList
          badges={[
            {
              label: mediaType,
              capsule: true,
            },
            {
              label: `${minutes} min.`,
              capsule: true,
              backgroundColor: 'tomato',
            },
            {
              label: `zone ${dvdZone}`,
              capsule: true,
              backgroundColor: 'violet',
            },
            {
              label: `${countries}`,
              capsule: true,
              backgroundColor: 'white',
            },
          ]}
        />
        <section className="ProductDetails__tech">
          <p>
            <span className="ProductDetails__tech--bold">Audio:</span>{' '}
            {formatValuesList(audioTracks)}
          </p>
          <p>
            <span className="ProductDetails__tech--bold">Sous-titres:</span>{' '}
            {formatValuesList(subtitles)}
          </p>
        </section>
      </header>
      {/* {titleOriginal !== title && (
        <span className="ProductDetails__titleOriginal">({titleOriginal})</span>
      )} */}
      <main>
        {synopsis && (
          <section>
            <header className="ProductDetails__sectionHeader">Synopsis</header>
            <p>{synopsis}</p>
          </section>
        )}

        {bonusContent && (
          <section>
            <header className="ProductDetails__sectionHeader">
              Bonus Content
            </header>
            <p>{bonusContent}</p>
          </section>
        )}

        {/* {trailerId && (
          <section>
            <header className="ProductDetails__sectionHeader">Trailer</header>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </section>
        )} */}
      </main>

      <p>Audio: {audioTracks.split(';').join(', ')}</p>
      <p>Sous-titrage: {subtitles.split(';').join(', ')}</p>
    </article>
  );
};
