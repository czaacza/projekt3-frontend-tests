import { addToCart, getStoredCart } from '../src/functions/cartButton';
import { Book } from '../src/interfaces/Book';

// Mocks
jest.mock('../src/router', () => ({
  navigate: jest.fn(),
}));

const mockSessionStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });

// Test
describe('addToCart function', () => {
  beforeEach(() => {
    mockSessionStorage.clear();
  });

  it('should add a book to the cart and measure execution time', () => {
    const book: Book = {
      id: '1',
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      price: 10,
      image: 'test.jpg',
    };

    const startTime = performance.now();
    addToCart(book);
    const endTime = performance.now();

    const storedCart = getStoredCart();
    expect(storedCart).toBeDefined();
    expect(storedCart?.books).toHaveLength(1);
    expect(storedCart?.books[0].book).toEqual(book);

    console.log(
      `Execution time for addToCart: ${endTime - startTime} milliseconds`
    );
  });
});
