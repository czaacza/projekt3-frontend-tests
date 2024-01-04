import { doGraphQLFetch } from '../graphql/fetch';
import { loginQuery, registerQuery } from '../graphql/queries';
import { getUsers, postUser } from '../rest/usersFetch';

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  try {
    const allUsers = await getUsers(`${import.meta.env.VITE_API_URL}`);

    // find user with username in allUsers
    const user = allUsers.find((user: any) => user.email === email);

    if (user && user.password === password) {
      sessionStorage.setItem('token', JSON.stringify(user.id));
      return { success: true, user: user };
    } else {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem('token');
  location.reload();
}

export async function register(
  username: string,
  password: string,
  email: string
): Promise<any> {
  try {
    const user = { username, password, email, isAdmin: false };
    const data = await postUser(`${import.meta.env.VITE_API_URL}`, user);
    console.log('data', data);
    if (data) {
      sessionStorage.setItem('token', JSON.stringify(data.id));
      return { success: true, user: data.register };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
