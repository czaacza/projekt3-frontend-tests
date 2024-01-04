import { doGraphQLFetch } from '../graphql/fetch';
import { getProductsQuery } from '../graphql/queries';
import { getProducts } from '../rest/productsFetch';

// fetch products from the API

export async function fetchProducts() {
  const data = await getProducts(`${import.meta.env.VITE_API_URL}`);
  console.log('data', data);

  if (data) {
    return data;
  }

  return undefined;
}
