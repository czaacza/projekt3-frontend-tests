import { addToCart } from '../functions/cartButton';
import { saveChanges } from '../functions/accountButton';

const mockBook = {
  id: '1',
  title: 'Sample Book',
  author: 'John Doe',
  description: 'A great book for testing purposes.',
  price: 19.99,
  image: 'book-image-url.jpg',
};

// Testing addToCart
console.time('addToCart');
addToCart(mockBook);
console.timeEnd('addToCart');

// Testing saveChanges
// Provide necessary arguments for saveChanges function
console.time('saveChanges');
saveChanges(/* arguments here */);
console.timeEnd('saveChanges');
