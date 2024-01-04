import { getStoredUser } from '../api/users';
import { doGraphQLFetch } from '../graphql/fetch';
import { createOrderQuery } from '../graphql/queries';
import { Cart } from '../interfaces/Cart';
import { User } from '../interfaces/User';
import router from '../router';
import { getStoredCart } from './cartButton';
import { postOrder } from '../rest/ordersFetch';

export const checkIfCheckoutAllowed = () => {
  if (sessionStorage.getItem('checkoutAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('checkoutAllowed');
    return true;
  }
};

export const initCheckoutEventListeners = async () => {
  const cart = getStoredCart();
  if (!cart) return;
  const user = await getStoredUser();

  document
    .getElementById('place-order-button')
    ?.addEventListener('click', async (e) => {
      e.preventDefault();
      handleCheckoutButton(user as User, cart);
    });
};

const handleCheckoutButton = async (user: User, cart: Cart) => {
  const order = await sendCreateOrderMutation(user as User, cart);
  if (order) {
    router.navigate('/order-confirmation');
    // sendOrderConfirmationEmail(order.details.email, `${JSON.stringify(order)}`);
  } else {
    // Show an error message
  }
};

async function sendCreateOrderMutation(user: User, cart: Cart) {
  const first_name = (document.getElementById('firstName') as HTMLInputElement)
    .value;
  const last_name = (document.getElementById('lastName') as HTMLInputElement)
    .value;
  const phone = (document.getElementById('phoneNumber') as HTMLInputElement)
    .value;
  const email = (document.getElementById('emailAddress') as HTMLInputElement)
    .value;
  const comments = (
    document.getElementById('orderComments') as HTMLInputElement
  ).value;

  const books = cart.books.map((cartItem) => {
    return {
      book: cartItem.book.id,
      quantity: cartItem.quantity,
    };
  });

  const orderInput = {
    user_id: user.id,
    books,
    first_name,
    last_name,
    phone,
    email,
    comments,
    status: 'PLACED',
  };

  console.log('before posting order', orderInput);
  const data = await postOrder(import.meta.env.VITE_API_URL, orderInput);

  if (!data) {
    return null;
  }

  return data;
}
