import {
    initSigninEventListeners,
    showSignin,
    closeSignin,
    submitSigninForm,
  } from '../src/functions/signin';
  import { login } from '../src/auth/auth';
  
  jest.mock('../src/auth/auth', () => ({
    login: jest.fn(),
  }));
  
  describe('initSigninEventListeners function', () => {
    let mockAddEventListener: jest.Mock;
  
    beforeEach(() => {
      mockAddEventListener = jest.fn();
      document.querySelector = jest.fn(() => ({
        addEventListener: mockAddEventListener,
      })) as any;
    });
  
    it('should add event listeners for signin functionality', () => {

      const startTime = performance.now();
      initSigninEventListeners();
      const endTime = performance.now();
      
      showSignin();
      closeSignin();
      submitSigninForm(new Event('submit'));
  
      expect(mockAddEventListener).toHaveBeenCalledTimes(4); 
      console.log(
        `Execution time for initSigninEventListener: ${endTime - startTime} milliseconds`
      );
    });
  
    it('should submit signin form and reload on successful login', async () => {
        const mockUser = {
            id: '123',
            username: 'testuser',
            email: 'testuser@example.com',
            isAdmin: false,
          };

      const mockResult = { success: true, user: mockUser };
      (login as jest.Mock).mockResolvedValue(mockResult);
  
      document.body.innerHTML = `
        <form id="signin-form">
          <input id="signinEmail" type="text" value="test@example.com">
          <input id="signinPassword" type="password" value="password123">
        </form>
      `;
  
      const startTime = performance.now();
      await submitSigninForm(new Event('submit'));
      const endTime = performance.now();
    
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(closeSignin).toHaveBeenCalled();
      expect(location.reload).toHaveBeenCalled();

      console.log(
        `Execution time for submitSigninForm: ${endTime - startTime} milliseconds`
      );
    });
  
  });
  