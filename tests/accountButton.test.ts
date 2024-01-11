import { saveChanges } from '../src/functions/accountButton';

// Mocks
jest.mock('../src/api/users', () => ({
  getStoredUser: jest.fn(),
}));
jest.mock('../src/rest/usersFetch', () => ({
  updateUser: jest.fn(),
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

describe('saveChanges function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSessionStorage.clear();
  });

  it('should handle a successful update', async () => {
    jest.spyOn(require('../src/api/users'), 'getStoredUser').mockResolvedValue({
      id: '1',
      username: 'testUser',
      email: 'test@example.com',
      isAdmin: false,
    });

    const mockUpdateUser = jest.spyOn(require('../src/rest/usersFetch'), 'updateUser');
    const mockUpdatedUserData = { id: '1', username: 'updatedUser', email: 'updated@example.com', isAdmin: false };
    mockUpdateUser.mockResolvedValue(mockUpdatedUserData);

    const username = 'newUsername';
    const email = 'newEmail@example.com';
    const password = 'newPassword';

    const startTime = performance.now();
    const result = await saveChanges(username, email, password);
    const endTime = performance.now();

    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(mockUpdateUser).toHaveBeenCalledWith(expect.any(String), '1', {
      username,
      email,
      password,
      isAdmin: false,
    });

    console.log(
        `Execution time for saveChanges: ${endTime - startTime} milliseconds`
      );
  });

  it('should handle an unsuccessful update due to invalid email', async () => {
    jest.spyOn(require('../src/api/users'), 'getStoredUser').mockResolvedValue({
      id: '1',
      username: 'testUser',
      email: 'test@example.com',
      isAdmin: false,
    });

    const username = 'newUsername';
    const email = 'invalidEmail';
    const password = 'newPassword';

    const startTime = performance.now();
    const result = await saveChanges(username, email, password);
    const endTime = performance.now();
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Email is required');

    console.log(
        `Execution time for saveChanges: ${endTime - startTime} milliseconds`
    );
  });

});

