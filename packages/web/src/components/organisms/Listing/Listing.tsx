import React from 'react';
import { Card } from '@Molecules';

import './Listing.scss';

export interface ProductsItem {
  idProduct: number;
  title: string;
  titleOriginal: string;
  price: string;
  synopsis: string;
  productionYear: number;
  createdAt: string;
  ean: string;
  imageUrl: string;
  authors: object;
  mediaType: {
    idMediaType: number;
    name: string;
  };
  availability: {
    idAvailability: number;
    name: string;
  } | null;
}

export interface ListingProps {
  products: {
    page: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
  header: string;
}

export const Listing: React.FC<ListingProps> = ({ products, header }) => {
  const { items } = products;

  return (
    <section className="Listing">
      <h3 className="Listing__header">{header}</h3>
      <div className="Listing__items">
        {items &&
          items.map(({ title, mediaType, price, imageUrl, idProduct }) => (
            <Card
              key={idProduct}
              title={title}
              mediaType={mediaType.name}
              price={price}
              src={imageUrl}
            />
          ))}
      </div>
    </section>
  );
};
