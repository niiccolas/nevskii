import { Context } from 'vm';
import axios from 'axios';

const { NEVSKII_API, TMDB_API_KEY } = process.env;

import { Product } from '@Organisms';
import { Layout } from '@Templates';

export async function getServerSideProps(context: Context) {
  const { id } = context.params;

  // Nevskii-API call
  const product: Product = (await axios.get(NEVSKII_API + '/products/' + id))
    .data;

  // External APIs calls
  let actorsAvatar = null;
  if (product.actors) {
    const actors = product.actors.split(';');
    const actorsRequests = actors.map(actor =>
      axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&language=en-US&query=${actor}&page=1&include_adult=false`,
      ),
    );
    const actorsResponse = (await axios.all(actorsRequests)) || {};
    actorsAvatar = actorsResponse.map((res, idx) => {
      const { profile_path: src, name } = res.data?.results[0] || {};
      return {
        src: src ? 'https://image.tmdb.org/t/p/w200' + src : null,
        name: name || actors[idx],
      };
    });
  }

  return {
    props: { product: { ...product, actorsAvatar } },
  };
}

/**
 * Feed Product component with data from DB and external APIs
 *
 * @param product - Object containing product data
 */
const ProductById = ({ product }: { product: Product }) => {
  return (
    <Layout>
      <Product product={product} />
    </Layout>
  );
};

export default ProductById;
