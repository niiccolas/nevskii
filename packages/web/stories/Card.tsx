import React from 'react';
import { formatPrice } from '../utils';

import style from './Card.module.scss';

type CardProps = {
  title: string;
  src: string;
  alt: string;
  mediaType: string;
  price: string;
};

const Card = ({ title, src, alt, mediaType, price }: CardProps) => {
  return (
    <article
      className={style.Card}
      itemScope
      itemType="http://schema.org/Product"
    >
      <a href="#">
        <div className={style.Card__header}>
          <h2 itemProp="name">{title}</h2>
          <div className={style.Card__details}>
            <p>{mediaType.toUpperCase()}</p>
            <p>{formatPrice(price) + '€'}</p>
          </div>
        </div>
        <img
          className={style.Card__image}
          src={src}
          alt={alt}
          draggable={false}
        />
      </a>
    </article>
  );
};

export default Card;
