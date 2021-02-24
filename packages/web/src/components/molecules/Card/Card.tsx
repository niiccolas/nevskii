import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { formatPrice } from '@utils';
import CSS from 'csstype';

import { Button } from '@Atoms';
import { BadgeList } from '@Molecules';
import { addItem } from '../../../redux/cart/actions';

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
  linkUrl: number;
  buttonType?: 'button' | 'submit';
  ean: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  src,
  linkUrl,
  alt,
  mediaType,
  price,
  style,
  button,
  buttonType = 'button',
  ean,
}) => {
  const dispatch = useDispatch();

  return (
    <article
      className="Card"
      itemScope
      itemType="http://schema.org/Product"
      style={style}
    >
      <div className="Card__header">
        {/* <Link href={linkUrl ? `products/${linkUrl}` : '#'}> */}
        <Link
          href={{
            pathname: 'products/[linkUrl]',
            query: {
              linkUrl,
            },
          }}
        >
          <h2 className="Card__title">{title}</h2>
        </Link>
        <h3 className="Card__subtitle">{subtitle}</h3>
        <BadgeList
          badges={[
            {
              label: mediaType.toUpperCase(),
              capsule: true,
              ...(mediaType.includes('ray') && { backgroundColor: 'blue' }),
              size: 'small',
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
            onClick={() =>
              dispatch(
                addItem({
                  name: title,
                  quantity: 1,
                  src,
                  price,
                  linkUrl,
                  ean,
                }),
              )
            }
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
  );
};
