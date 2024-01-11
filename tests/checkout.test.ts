import {
    checkIfCheckoutAllowed,
    initCheckoutEventListeners,
  } from '../src/functions/checkout';
  import * as usersApi from '../src/api/users';
  import * as cartButton from '../src/functions/cartButton';
  import * as graphqlFetch from '../src/graphql/fetch';
  import * as graphqlQueries from '../src/graphql/queries';
  import * as ordersFetch from '../src/rest/ordersFetch';
  import * as routerModule from '../src/router';
  
  jest.mock('../src/api/users');
  jest.mock('../src/functions/cartButton');
  jest.mock('../src/graphql/fetch');
  jest.mock('../src/graphql/queries');
  jest.mock('../src/rest/ordersFetch');
  jest.mock('../src/router');

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
  
  describe('checkout functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockSessionStorage.clear();
    });
  
    it('should check if checkout is allowed', () => {
      const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
      mockGetItem.mockReturnValue('true');
  
      const startTime = performance.now();
      const result = checkIfCheckoutAllowed();
      const endTime = performance.now();
  
      expect(result).toBe(false); 
      expect(mockGetItem).toHaveBeenCalledWith('checkoutAllowed');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('checkoutAllowed');

      console.log(
        `Execution time for checkIfCheckoutAllowed: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should initialize checkout event listeners', async () => {
        const mockCartData = {
            books: [
              { book: { id: '1', title: 'Book 1', author: 'Author 1', description: 'Description 1', price: 20, image: 'image1.jpg' }, quantity: 2 },
              { book: { id: '2', title: 'Book 2', author: 'Author 2', description: 'Description 2', price: 25, image: 'image2.jpg' }, quantity: 1 },
            ],
            total: 2,
          };

      const mockGetStoredCart = jest.spyOn(cartButton, 'getStoredCart');
      mockGetStoredCart.mockReturnValue(mockCartData);
  
      const mockGetStoredUser = jest.spyOn(usersApi, 'getStoredUser');
      mockGetStoredUser.mockResolvedValue({ id: '1', username: 'testUser', email: 'test@example.com', isAdmin: false });
  
      const mockGetElementById = jest.spyOn(document, 'getElementById');
      mockGetElementById.mockReturnValue({
          addEventListener: jest.fn(),
          id: 'mockedElementId',
          classList: {
              add: jest.fn(),
              remove: jest.fn(),
              length: 0,
              value: '',
              contains: jest.fn(),
              item: jest.fn(),
          },
      } as unknown as HTMLElement);
  
      const mockInitCheckoutEventListeners = jest.spyOn(cartButton, 'initCheckoutEventListeners' as any);
  
      const startTime = performance.now();
      await initCheckoutEventListeners();
      const endTime = performance.now();
  
      expect(mockGetStoredCart).toHaveBeenCalled();
      expect(mockGetStoredUser).toHaveBeenCalled();
      expect(mockGetElementById).toHaveBeenCalledWith('place-order-button');
      expect(mockInitCheckoutEventListeners).toHaveBeenCalled();

      console.log(
        `Execution time for initCheckoutEventListeners: ${endTime - startTime} milliseconds`
      );
    });
  
  });
  