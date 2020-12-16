import React from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { Button } from '@Atoms';
import { BadgeList, AvatarList } from '@Molecules';
import { formatPrice, formatValuesList } from '@utils';
import { addItem } from '../../../redux/cart/actions';

import './Product.scss';

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
  collections?: string;
  trailer?: string;
  actorsAvatar?: { src: string; name: string }[];
}

export interface ProductProps {
  product: Product;
}

export const Product: NextPage<ProductProps> = ({
  product,
}: {
  product: Product;
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
    audioTracks,
    subcategories,
    genres,
    subtitles,
    collections,
    trailer,
    actorsAvatar,
  } = product;

  const dispatch = useDispatch();

  return (
    <article className="Product">
      <div className="Product__poster">
        <img src={imageUrl} alt={title} className="Product__posterImage" />
      </div>
      <div>
        <header>
          {title && <h2 className="Product__title">{title}</h2>}
          {authors && (
            <h3 className="Product__author">
              {`${formatValuesList(authors)} (${productionYear})`}
            </h3>
          )}

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
                label: ageRating,
                capsule: true,
                backgroundColor: 'cyan',
              },
              {
                label: stockStatus,
                primary: false,
                backgroundColor: 'white',
              },
            ]}
          />

          <section className="Product__details">
            {price && (
              <p>
                <span className="Product__details--bold">
                  Prix: {formatPrice(price)}
                </span>
              </p>
            )}
            {titleOriginal !== title && (
              <p>
                <span className="Product__details--bold">Titre original:</span>{' '}
                {titleOriginal}
              </p>
            )}
            {audioTracks && (
              <p>
                <span className="Product__details--bold">Audio:</span>{' '}
                {formatValuesList(audioTracks)}
              </p>
            )}
            {subtitles && (
              <p>
                <span className="Product__details--bold">Sous-titres:</span>{' '}
                {formatValuesList(subtitles)}
              </p>
            )}
            {countries && (
              <p>
                <span className="Product__details--bold">Pays:</span>{' '}
                {formatValuesList(countries)}
              </p>
            )}
            {collections && (
              <p>
                <span className="Product__details--bold">Collection:</span>{' '}
                {collections}
              </p>
            )}
          </section>
          <AvatarList avatars={actorsAvatar} />
          <Button
            primary
            label={'Add to cart'}
            type="button"
            className="Product__CTA--wide"
            onClick={() =>
              dispatch(
                addItem({
                  ean: ean,
                  name: title,
                  quantity: 1,
                  src: imageUrl,
                }),
              )
            }
          />
        </header>

        {synopsis && (
          <section>
            <header className="Product__sectionHeader">Synopsis</header>
            <p className="Product__sectionCopy">{synopsis}</p>
          </section>
        )}

        {trailer && (
          <section>
            <header className="Product__sectionHeader">Bande-Annonce</header>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailer}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </section>
        )}

        {bonusContent && (
          <section>
            <header className="Product__sectionHeader">Bonus</header>
            <p className="Product__sectionCopy">{bonusContent}</p>
          </section>
        )}

        <section>
          <header className="Product__sectionHeader">Détails</header>
          <ul className="Product__details">
            <li>
              <span className="Product__details--bold">Rayons:</span>{' '}
              {category && `${category} > `}
              {subcategories && `${subcategories} > `}
              {genres && `${formatValuesList(genres)}`}
            </li>
            <li>
              <span className="Product__details--bold">EAN:</span> {ean}
            </li>
            <li>
              <span className="Product__details--bold">Disponibilité:</span>{' '}
              {availability}
            </li>
            <li>
              <span className="Product__details--bold">Éditeur:</span>{' '}
              {publisher}
            </li>
            <li>
              <span className="Product__details--bold">Distributeur:</span>{' '}
              {distributor}
            </li>
            <li>
              <span className="Product__details--bold">Format TV:</span>{' '}
              {formatTv}
            </li>
            <li>
              <span className="Product__details--bold">Format Cinéma:</span>{' '}
              {formatFilm}
            </li>
            <li>
              <span className="Product__details--bold">Zone Disque:</span>{' '}
              {dvdZone}
            </li>
            <li>
              <span className="Product__details--bold">Ajout catalogue:</span>{' '}
              {new Date(createdAt).toLocaleDateString()}
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
};
