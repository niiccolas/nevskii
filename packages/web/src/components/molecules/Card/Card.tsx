import React from 'react';
import Link from 'next/link';
import { formatPrice } from '@utils';
import CSS from 'csstype';

import { Button } from '@Atoms';
import { BadgeList } from '@Molecules';

import './Card.scss';

type CardProps = {
  title: string;
  subtitle?: string | undefined;
  src: string;
  alt?: string;
  mediaType: string;
  price: string;
  style?: CSS.Properties;
  button?: boolean;
  linkUrl?: number;
  buttonType?: 'button' | 'submit';
  prefetch: boolean;
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  src,
  linkUrl = '#',
  alt,
  mediaType,
  price,
  style,
  button,
  buttonType = 'button',
  prefetch = true,
}) => {
  return (
    <Link href={linkUrl ? `products/${linkUrl}` : '#'} prefetch={prefetch}>
      <article
        className="Card"
        itemScope
        itemType="http://schema.org/Product"
        style={style}
      >
        <div className="Card__header">
          <h2 itemProp="Card__title">{title}</h2>

          <h3 itemProp="Card__subtitle">{subtitle}</h3>
          <BadgeList
            badges={[
              {
                label: mediaType.toUpperCase(),
                capsule: true,
                ...(mediaType.includes('ray') && { backgroundColor: 'blue' }),
              },
              {
                label: formatPrice(price),
                primary: false,
                backgroundColor: 'white',
              },
            ]}
            className="Card__header--push-to-bottom"
          />
          {button && (
            <Button
              label="Add to cart"
              type={buttonType}
              size="small"
              primary={true}
              onClick={() => alert('added to cart')}
            />
          )}
        </div>
        <img
          className="Card__image"
          src={src}
          alt={alt || title}
          draggable={false}
        />
      </article>
    </Link>
  );
};
