import Navigo from 'navigo';

import index from './views/index/index';
import cartIndex from './views/cart/cartIndex';
import { getStoredUser } from './api/users';
import { fetchProducts } from './api/products';
import { initEventListeners } from './main';
import { getStoredCart } from './functions/cartButton';
import checkoutIndex from './views/checkout/checkoutIndex';
import accountIndex from './views/account/accountIndex';
import {
  checkIfCheckoutAllowed,
  initCheckoutEventListeners,
} from './functions/checkout';
import orderConfirmationIndex from './views/order-confirmation/orderConfirmationIndex';
import getUserOrders from './api/orders';
import { checkIfAdminAllowed } from './functions/admin';
import {
  fetchUsers,
  initSearchUsers,
  usersClickHandler,
} from './functions/adminUserPanel';
import adminIndex from './views/admin/adminIndex';
import {
  initSearchProducts,
  productsClickHandler,
} from './functions/adminProductsPanel';

const router = new Navigo('');

router
  .on('/', async () => {
    console.log('router.on(/)');
    const storedUser = await getStoredUser();
    console.log('storedUser', storedUser);
    const products = await fetchProducts();
    console.log('products', products);

    const storedCart = getStoredCart();
    console.log('storedCart', storedCart);

    const contentElement = document.querySelector<HTMLDivElement>('#app');

    console.log('storedUser', storedUser);

    contentElement!.innerHTML = index(storedUser, products, storedCart);
    initEventListeners();
  })

  .on('/cart', async () => {
    const storedUser = await getStoredUser();
    console.log('storedUser: ', storedUser);

    if (!storedUser) {
      router.navigate('/');
      return;
    }

    const storedCart = getStoredCart();
    console.log('storedCart: ', storedCart);
    // initQuantityButtonsEventListeners();

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = cartIndex(storedUser, storedCart);
    initEventListeners();
  })

  .on('/checkout', async () => {
    initCheckoutEventListeners();

    if (!checkIfCheckoutAllowed()) {
      // router.navigate('/cart');
    }
    const storedUser = await getStoredUser();
    const storedCart = getStoredCart();
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = checkoutIndex(storedUser, storedCart);
    initCheckoutEventListeners();
    initEventListeners();
  })

  .on('/account', async () => {
    const storedUser = await getStoredUser();
    console.log('storedUser: ', storedUser);

    // TO DO
    const userOrders = await getUserOrders(storedUser);
    console.log('userOrders: ', userOrders);
    const products = await fetchProducts();
    console.log('products: ', products);
    const storedCart = getStoredCart();
    console.log('storedCart: ', storedCart);

    if (!storedUser) {
      router.navigate('/');
      return;
    }

    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = accountIndex(
      storedUser,
      userOrders,
      products,
      storedCart
    );
    initEventListeners();
  })

  .on('/account/admin', async () => {
    const storedUser = await getStoredUser();
    if (!storedUser) {
      router.navigate('/');
      return;
    }

    if (!storedUser.isAdmin) {
      router.navigate('/');
      return;
    }

    const storedCart = getStoredCart();
    const products = await fetchProducts();
    const users = await fetchUsers();

    const contentElement = document.querySelector<HTMLDivElement>('#app');

    contentElement!.innerHTML = adminIndex(
      storedUser,
      storedCart,
      products,
      users
    );

    initEventListeners();
    usersClickHandler(users);
    productsClickHandler(products);
    initSearchUsers(users);
    initSearchProducts(products);
  })

  .on('/order-confirmation', async () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = orderConfirmationIndex();
    initEventListeners();
  })

  .notFound(() => {
    const contentElement = document.querySelector<HTMLDivElement>('#app');
    contentElement!.innerHTML = '404';
  })

  .resolve();

export default router;
