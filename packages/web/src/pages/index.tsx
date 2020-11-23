import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { Card, Hero } from '@Molecules';
import { Header, Listing } from '@Organisms';
import { Input, Button } from '@Atoms';
const { NEVSKII_API } = process.env;

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

interface Props {
  products: {
    page: number;
    itemsPerPage: number;
    itemsTotal: number;
    items: ProductsItem[];
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const adress: string =
    NEVSKII_API +
    '/products/?page=34' +
    (context.query.title ? `?title=${context.query.title}` : '');

  const res = await fetch(adress);
  const products = (await res.json()) || {};

  return {
    props: { products }, // will be passed to the page component as props
  };
};

export const Home: NextPage<Props> = ({ products }): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Nevskii</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Header
        logo="nevskii"
        logoMobile="K"
        onCreateAccount={() => null}
        onLogin={() => null}
        onLogout={() => null}
      />
      <main>
        <Hero
          videoSrc="iamcuba.mp4"
          poster="https://upload.epagine.fr/3327/promo/3327_11035_20-10-31-09-46-35.jpg"
          headerLabel="“Soy Cuba”"
          ctaLabel="SEE MORE"
          subtitleLabel="Reissue Blu-Ray 4K"
        />
        <Listing header="Movies" products={products} />
      </main>
    </div>
  );
};

export default Home;
