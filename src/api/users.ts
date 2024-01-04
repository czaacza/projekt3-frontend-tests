import jwt_decode from 'jwt-decode';
import { User } from '../interfaces/User';
import { doGraphQLFetch } from '../graphql/fetch';
import { userByIdQuery } from '../graphql/queries';
import { getUser } from '../rest/usersFetch';

export async function getStoredUser() {
  // get token without first and last char
  let token = sessionStorage.getItem('token');
  if (!token) {
    return undefined;
  }
  if (token[0] === '"' && token[token.length - 1] === '"') {
    token = token.slice(1, -1);
  }

  console.log('token: ', token);

  try {
    const userFromToken: User = await getUser(
      `${import.meta.env.VITE_API_URL}`,
      token
    );
    if (userFromToken) {
      return userFromToken;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function isUserAdmin(user: User | undefined) {
  if (!user) {
    return false;
  }
  if (user.isAdmin) {
    return true;
  }
  return false;
}
