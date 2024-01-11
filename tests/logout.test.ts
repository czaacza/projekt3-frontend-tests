import { initLogoutEventListener, handleLogoutButtonClick } from '../src/functions/logout';

jest.mock('../src/functions/logout', () => ({
  logout: jest.fn(),
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
  
describe('initLogoutEventListener function', () => {
  let mockAddEventListener: jest.Mock;

  beforeEach(() => {
    mockSessionStorage.clear();   
    mockAddEventListener = jest.fn();
    document.querySelector = jest.fn(() => ({
      addEventListener: mockAddEventListener,
    })) as any;
  });

  it('should add an event listener to the logout button', () => {
    initLogoutEventListener();

    const startTime = performance.now();
    handleLogoutButtonClick();
    const endTime = performance.now();

    expect(mockAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));

    console.log(
        `Execution time for handleLogoutButtonClick: ${endTime - startTime} milliseconds`
      );
  });
});
