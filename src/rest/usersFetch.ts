const getUsers = async (url: string) => {
  // fetch users from endpoint url/users
  const response = await fetch(`${url}/users`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const getUser = async (url: string, id: string) => {
  // fetch user from endpoint url/users/:id
  const response = await fetch(`${url}/users/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const postUser = async (url: string, data: object) => {
  // post user to endpoint url/users
  const response = await fetch(`${url}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const updateUser = async (url: string, id: string, data: object) => {
  // update user at endpoint url/users/:id
  const response = await fetch(`${url}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

const deleteUser = async (url: string, id: string) => {
  // delete user at endpoint url/users/:id
  const response = await fetch(`${url}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  const json = await response.json();
  return json;
};

export { getUsers, getUser, postUser, updateUser, deleteUser };
