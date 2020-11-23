import React, { useState } from 'react';
import { Card } from '@Molecules';

const { NEVSKII_API } = process.env;
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

interface Props {
  products: {
    page: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
}

interface ProductsItem {
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
    name: string;
  };
}

// interface Props {
//   products: Products;
// }

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
  options = {},
) => {
  // console.log(context.query);
  console.log({ options });
  const adress: string =
    NEVSKII_API +
    '/products/' +
    (context.query.title ? `?title=${context.query.title}` : '');
  console.log({ adress });
  const res = await fetch(adress);
  const products = (await res.json()) || {};
  console.log({ products });
  return {
    props: { products }, // will be passed to the page component as props
  };
};

// return <ul>{
//   products.items.map(({idProduct, title}) =>{
//   return <li key={idProduct}><a href={"/product/" + idProduct}>{title}</a></li>
//   })}</ul>

const ProductsList: NextPage<Props> = ({ products }) => {
  const { items } = products;
  const [searchInput, setSearchInput] = useState('');
  console.log({ searchInput });

  const handleSubmit = e => {
    console.log('SUBMITTED', { searchInput });
    getServerSideProps();
    e.preventDefault();
  };
  const handleChange = e => setSearchInput(e.target.value);

  return (
    <div>
      {/* <Navbar /> */}
      <form onSubmit={handleSubmit} name="joko">
        <input
          type="search"
          name="searchInput"
          id="searchInput"
          placeholder="Search…"
          onChange={handleChange}
          value={searchInput}
        />
        <button type="submit">Search</button>
      </form>
      {/* <Hero /> */}
      <ul>
        {items &&
          items.map(item => (
            <li
              key={item.idProduct}
              style={{ listStyle: 'none', display: 'inline-block' }}
            >
              {/* <Link as={`products/${item.idProduct}`} href={`products/id`}> */}
              <Link href={`products/[id]`}>
                <Card
                  title={item.title}
                  alt={item.title}
                  price={item.price}
                  src={item.imageUrl}
                  mediaType={item.mediaType.name}
                />
              </Link>

              {/* {item.title !== item.titleOriginal && ` (${item.titleOriginal})`}
              <img src={item.imageUrl} alt="" srcSet="" width="100px" /> */}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsList;

// interface Props {
//   launch: {
//     mission: string
//     site: string
//     timestamp: number
//     rocket: string
//   }
// }
// const IndexPage: NextPage<Props> = ({ launch }) => {
//   const date = new Date(launch.timestamp)
//   return (
//     <main>
//       <h1>Next SpaceX Launch: {launch.mission}</h1>
//       <p>
//         {launch.rocket} will take off from {launch.site} on {date.toDateString()}
//       </p>
//     </main>
//   )
// }
// export default IndexPage

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const response = await fetch('https://api.spacexdata.com/v3/launches/next')
//   const nextLaunch = await response.json()
//   return {
//     props: {
//       launch: {
//         mission: nextLaunch.mission_name,
//         site: nextLaunch.launch_site.site_name_long,
//         timestamp: nextLaunch.launch_date_unix * 1000,
//         rocket: nextLaunch.rocket.rocket_name,
//       },
//     },
//   }
// }
