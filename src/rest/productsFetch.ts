const getProducts = async (url: string) => {
  // fetch products from endpoint url/books
  const response = await fetch(`${url}/books`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const getProduct = async (url: string, id: string) => {
  // fetch product from endpoint url/books/:id
  const response = await fetch(`${url}/books/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const postProduct = async (url: string, data: object) => {
  // post product to endpoint url/books
  const response = await fetch(`${url}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const updateProduct = async (url: string, id: string, data: object) => {
  // update product at endpoint url/books/:id
  const response = await fetch(`${url}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const deleteProduct = async (url: string, id: string) => {
  // delete product at endpoint url/books/:id
  const response = await fetch(`${url}/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

export { getProducts, getProduct, postProduct, updateProduct, deleteProduct };
