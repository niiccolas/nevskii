import React from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import { Card } from '@Molecules';

import './Listing.scss';
import './ReactPaginate.scss';

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
    pagesTotal: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
  header: string;
}

export const Listing: React.FC<ListingProps> = ({
  products: { items, itemsTotal, itemsPerPage, page, pagesTotal },
  header,
}) => {
  const router = useRouter();
  const handlePagination = (page: { selected: number }) => {
    const currentQuery = router.query;
    currentQuery.page = (page.selected + 1).toString();
    router.push({
      query: currentQuery,
    });
  };

  return (
    <section className="Listing">
      <h3 className="Listing__header">
        {router.query.title ? (
          <span>
            Search:
            <span className="Listing__searchTerm">
              {' '}
              ‘{router.query.title}’{' '}
            </span>
            <span className="Listing__searchResultsCount">
              - {itemsTotal} results
            </span>
          </span>
        ) : (
          header
        )}
      </h3>

      <div className="Listing__items">
        {items &&
          items.map(
            ({
              title,
              mediaType,
              price,
              imageUrl,
              idProduct,
              productionYear,
              ean,
            }) => (
              <Card
                key={idProduct}
                linkUrl={idProduct}
                title={title}
                subtitle={productionYear.toString()}
                mediaType={mediaType.name}
                price={price}
                src={imageUrl}
                ean={ean}
                button
              />
            ),
          )}
      </div>

      {itemsTotal > itemsPerPage && (
        <ReactPaginate
          pageCount={pagesTotal}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          initialPage={page - 1}
          forcePage={page - 1}
          onPageChange={handlePagination}
          previousLabel={'← PREV.'}
          nextLabel={'NEXT →'}
          breakLabel={'...'}
          breakClassName={'ReactPaginate__break'}
          breakLinkClassName={'ReactPaginate__link'}
          pageLinkClassName={'ReactPaginate__link'}
          activeClassName={'ReactPaginate__link--active'}
          disabledClassName={'ReactPaginate__link--disabled'}
          previousClassName={'ReactPaginate__previous'}
          nextClassName={'ReactPaginate__next'}
          previousLinkClassName={'ReactPaginate__prevLink'}
          nextLinkClassName={'ReactPaginate__nextLink'}
          containerClassName={'ReactPaginate'}
        />
      )}
    </section>
  );
};
