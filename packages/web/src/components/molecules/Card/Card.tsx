import React from 'react';
import { formatPrice } from '@utils';
import CSS from 'csstype';

import './Card.scss';

type CardProps = {
  title: string;
  src: string;
  alt?: string;
  mediaType: string;
  price: string;
  style?: CSS.Properties;
};

export const Card: React.FC<CardProps> = ({
  title,
  src,
  alt,
  mediaType,
  price,
  style,
}) => {
  return (
    <article
      className="Card"
      itemScope
      itemType="http://schema.org/Product"
      style={style}
    >
      <a href="#">
        <div className="Card__header">
          <h2 itemProp="name">{title}</h2>
          <div className="Card__details">
            <p>
              {mediaType.toUpperCase()} - {formatPrice(price) + '€'}
            </p>
          </div>
        </div>
        <img
          className="Card__image"
          src={src}
          alt={alt || title}
          draggable={false}
        />
      </a>
    </article>
  );
};
