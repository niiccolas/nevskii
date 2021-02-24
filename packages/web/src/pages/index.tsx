import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';

import { Hero } from '@Molecules';
import { Listing, ProductsItem } from '@Organisms';
import { Layout } from '@Templates';

const { NEVSKII_API } = process.env;
interface Props {
  products: {
    page: number;
    pagesTotal: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
}

import './index.scss';

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { data } = await axios.get(
    `${NEVSKII_API}/products?` +
      Object.entries(query)
        .map(([param, value]) => param + '=' + value)
        .join('&'),
  );

  /*
   * getServerSideProps sends to current page component its return value as props
   */
  return {
    props: { products: data },
  };
};

export const Home: NextPage<Props> = ({ products }): JSX.Element => (
  <Layout className="Layout__main--flush">
    <Head>
      <title>Nevskii</title>
    </Head>
    <div className="index__Hero">
      <Hero
        videoSrc="https://nevskii.s3.eu-west-3.amazonaws.com/assets/video/iamcuba.mp4"
        poster="https://upload.epagine.fr/3327/promo/3327_11035_20-10-31-09-46-35.jpg"
        headerLabel="“Soy Cuba”"
        ctaLabel="SEE MORE"
        subtitleLabel="Reissue Blu-Ray 4K"
      />
    </div>
    <div className="index__Listing">
      <Listing header="Movies" products={products} />
    </div>
  </Layout>
);

export default Home;
