const getOrders = async (url: string) => {
  // fetch orders from endpoint url/orders
  const response = await fetch(`${url}/orders`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const getOrder = async (url: string, id: string) => {
  // fetch order from endpoint url/orders/:id
  const response = await fetch(`${url}/orders/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const postOrder = async (url: string, data: object) => {
  // post order to endpoint url/orders
  const response = await fetch(`${url}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const updateOrder = async (url: string, id: string, data: object) => {
  // update order at endpoint url/orders/:id
  const response = await fetch(`${url}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const deleteOrder = async (url: string, id: string) => {
  // delete order at endpoint url/orders/:id
  const response = await fetch(`${url}/orders/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

export { getOrders, getOrder, postOrder, updateOrder, deleteOrder };
