import { User } from '../../interfaces/User';

export default function checkoutSection(user?: User, cart?: any): string {
  const { firstName, lastName, phone } = user?.details || {
    firstName: '',
    lastName: '',
    phone: '',
  };

  const modalHtml = `<section class="checkout-section">
    <div class="container">
      <h2 class="text-center mb-5">Checkout</h2>
      <div class="row">
        <div class="col-md-7">
          <form>
            <h4 class="mb-4">Personal Information</h4>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" value="${firstName}" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" value="${lastName}" required />
            </div>
            <div class="form-group mt-5">
              <label for="phoneNumber">Phone Number</label>
              <input type="tel" class="form-control" id="phoneNumber" value="${phone}" required />
            </div>
            <div class="form-group">
              <label for="emailAddress">Email Address</label>
              <input type="email" class="form-control" id="emailAddress" value="${
                user ? user.email : ''
              }" required />
            </div>
            <div class="form-group mt-5">
              <label for="emailAddress">Comments to the order</label>
              <textarea class="form-control" id="orderComments" rows="4"></textarea>
            </div>
          </form>
        </div>
        <div class="col-md-5">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              ${
                cart && cart.books && cart.books.length
                  ? cart.books
                      .map((cartItem: any) => {
                        const book = cartItem.book;
                        return `
                          <div class="row mb-3">
                            <img class="col-md-3" src="img/book.png" alt="" />
                            <div>
                              <p class="card-text">${book.title}</p>
                              <p class="card-text">${book.author}</p>
                              <p class="card-text">Quantity: ${cartItem.quantity}</p>
                            </div>
                          </div>
                          <hr />
                        `;
                      })
                      .join('')
                  : `<p class="card-text">No items in the cart.</p>`
              }
              <h6 class="card-text">Total: ${
                cart && cart.total ? cart.total.toFixed(2) : '0.00'
              }</h6>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-body">
              <button id="place-order-button" class="btn btn-primary btn-block">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
  `;
  return modalHtml;
}
