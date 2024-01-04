import { Cart } from '../../interfaces/Cart';

export default function cartSection(cart?: Cart): string {
  // get quantity for each book in cart
  let total_quantity = 0;
  if (cart) {
    for (const cartItem of cart.books) {
      total_quantity += cartItem.quantity;
    }
  }

  const cartItemsHtml =
    cart && cart.books.length
      ? cart.books
          .map((cartItem) => {
            const book = cartItem.book;
            return `
          <div class="card mb-4">
            <div class="row no-gutters">
              <div class="col-md-3">
                <img
                  class="card-img cart-item-img"
                  src="/img/book.png"
                  alt="Book Cover"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.author}</p>
                  <div class="form-group d-flex align-items-center">
                    <label for="quantity">Quantity:</label>
                    <span id="quantity" class="mx-2">${cartItem.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          })
          .join('')
      : `<div class="card mb-4"><div class="card-body">Your cart is empty</div></div>`;

  const modalHtml = `<section class="cart-section">
    <div class="container">
      <h2 class="text-center mb-5">Your Shopping Cart</h2>
      <div class="row">
        <div class="col-md-8">
          ${cartItemsHtml}
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <h4 class="card-title">
                Total number of books: <span id="total">${
                  cart ? total_quantity : '0'
                }</span>
              </h4>
              <a href="/checkout"id="checkout-button" class="btn btn-primary btn-block mt-3">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  return modalHtml;
}
