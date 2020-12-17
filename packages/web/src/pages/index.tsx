import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
const { NEVSKII_API } = process.env;

import { Hero } from '@Molecules';
import { Listing, ProductsItem } from '@Organisms';
import Layout from '../components/templates/Layout/Layout';

interface Props {
  products: {
    page: number;
    pagesTotal: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const apiCall =
    `${NEVSKII_API}/products?` +
    Object.entries(query)
      .map(([param, value]) => param + '=' + value)
      .join('&');
  const res = await fetch(apiCall);
  const products = (await res.json()) || {};

  return {
    props: { products }, // will be passed to the page component as props
  };
};

export const Home: NextPage<Props> = ({ products }): JSX.Element => (
  <Layout className="Layout__main--flush">
    <Head>
      <title>Nevskii</title>
    </Head>
    <Hero
      videoSrc=""
      // https://nevskii.s3.eu-west-3.amazonaws.com/assets/video/iamcuba.mp4
      poster="https://upload.epagine.fr/3327/promo/3327_11035_20-10-31-09-46-35.jpg"
      headerLabel="“Soy Cuba”"
      ctaLabel="SEE MORE"
      subtitleLabel="Reissue Blu-Ray 4K"
    />
    <Listing header="Movies" products={products} />
  </Layout>
);

export default Home;
