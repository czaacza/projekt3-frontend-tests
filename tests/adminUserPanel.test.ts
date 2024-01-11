import {
    initUserSectionEventListeners,
    fetchUsers,
    usersClickHandler,
    initDeleteButton,
    initAddNewUserButton,
    // addNewUser,
    filterUsers,
    initSearchUsers,
    generateUsersList,
    updateAdminUser,
  } from '../src/functions/adminUserPanel';
  
  // Mocks
  jest.mock('../src/api/users', () => ({
    getUsers: jest.fn(),
  }));
  jest.mock('../src/rest/usersFetch', () => ({
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  }));
  jest.mock('../src/graphql/queries', () => ({
    addUserAsAdminQuery: 'mockAddUserAsAdminQuery',
    updateUserAsAdminQuery: 'mockUpdateUserAsAdminQuery',
    deleteUserAsAdminQuery: 'mockDeleteUserAsAdminQuery',
    getUsersQuery: 'mockGetUsersQuery',
  }));
  jest.mock('../src/graphql/fetch', () => ({
    doGraphQLFetch: jest.fn(),
  }));
  jest.mock('../src/views/account/ordersSection', () => jest.fn());

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
  
  describe('adminUserPanel functions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockSessionStorage.clear();
    });
  
    it('should fetch users successfully', async () => {
      const mockGetUsers = jest.spyOn(require('../src/api/users'), 'getUsers');
      const mockUsersData = [{ id: '1', username: 'user1', email: 'user1@example.com' }];
      mockGetUsers.mockResolvedValue(mockUsersData);
  
      const startTime = performance.now();
      const result = await fetchUsers();
      const endTime = performance.now();
  
      expect(result).toEqual(mockUsersData);
      expect(mockGetUsers).toHaveBeenCalledWith(expect.any(String));

      console.log(
        `Execution time for fetchUsers: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should handle users click handler', () => {
      const mockShowOrderHistory = jest.fn();
      jest.spyOn(require('../src/views/account/ordersSection'), 'default').mockReturnValue('mockedOrderHistoryHtml');
      jest.spyOn(require('../src/functions/admin'), 'showSuccessMessage');
      jest.spyOn(require('../src/functions/admin'), 'showErrorMessage');
      
      const users = [{ id: '1', username: 'user1', email: 'user1@example.com' }];
      const mockToggleAddUserForm = jest.fn();
      const mockDisplayUserDetails = jest.fn();
      const mockQuerySelector = jest.spyOn(document, 'querySelector');
      
      mockQuerySelector.mockReturnValue({
        addEventListener: jest.fn(),
        classList: { remove: jest.fn(), add: jest.fn() },
      });
  
      const startTime = performance.now();
      usersClickHandler(users);
      const endTime = performance.now();
  
      expect(mockQuerySelector).toHaveBeenCalled();

      console.log(
        `Execution time for userClickHandler: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should update admin user successfully', async () => {
      const mockUpdateUser = jest.spyOn(require('../src/rest/usersFetch'), 'updateUser');
      const mockUserData = { id: '1', username: 'user1', email: 'user1@example.com' };
      mockUpdateUser.mockResolvedValue(mockUserData);
  
      const userToUpdate = { id: '1', username: 'newUser1', email: 'newUser1@example.com' };
  
      const startTime = performance.now();
      const result = await updateAdminUser(userToUpdate);
      const endTime = performance.now();
  
      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUserData);
      expect(mockUpdateUser).toHaveBeenCalledWith(expect.any(String), '1', {
        username: 'newUser1',
        email: 'newUser1@example.com',
        password: undefined,
        isAdmin: undefined,
      });

      console.log(
        `Execution time for updateAdminUser: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should handle unsuccessful update for invalid email', async () => {
      const mockUpdateUser = jest.spyOn(require('../src/rest/usersFetch'), 'updateUser');
      mockUpdateUser.mockResolvedValue(undefined);
  
      const userToUpdate = { id: '1', username: 'newUser1', email: 'invalidEmail' };
  
      const startTime = performance.now();
      const result = await updateAdminUser(userToUpdate);
      const endTime = performance.now();
  
      expect(result.success).toBe(false);
      expect(result.error).toBe('Email is required');

      console.log(
        `Execution time for updateAdminUser: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should handle unsuccessful update for user not logged in', async () => {
      const mockUpdateUser = jest.spyOn(require('../src/rest/usersFetch'), 'updateUser');
      mockUpdateUser.mockResolvedValue(undefined);
  
      const userToUpdate = { id: '1', username: 'newUser1', email: 'newUser1@example.com' };
  
      const startTime = performance.now();
      const result = await updateAdminUser(userToUpdate);
      const endTime = performance.now();
  
      expect(result.success).toBe(false);
      expect(result.error).toBe('User not logged in');

      console.log(
        `Execution time for updateAdminUser: ${endTime - startTime} milliseconds`
      );
    });
  
  });
  