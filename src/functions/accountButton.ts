import { getStoredUser } from '../api/users';
import { doGraphQLFetch } from '../graphql/fetch';
import { updateUserQuery } from '../graphql/queries';
import { updateUser } from '../rest/usersFetch';

async function saveChanges(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  const user = await getStoredUser();

  if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
    return { success: false, error: 'Email is required' };
  }

  if (!user) {
    return { success: false, error: 'User not logged in' };
  }

  const data = updateUser(`${import.meta.env.VITE_API_URL}`, user.id, {
    username,
    email,
    password,
    isAdmin: user.isAdmin,
  });

  if (data) {
    return { success: true, user: data };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAccountButtonEventListeners() {
  const accountButton = document.querySelector('#btn-save-changes');

  accountButton?.addEventListener('click', async (event: any) => {
    event.preventDefault();
    const username =
      document.querySelector<HTMLInputElement>('#accountUsername')?.value || '';
    const email =
      document.querySelector<HTMLInputElement>('#accountEmail')?.value || '';
    const password =
      document.querySelector<HTMLInputElement>('#accountPassword')?.value || '';

    const save = await saveChanges(username, email, password);
    if (save.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(save.error);
    }
  });
}

function showSuccessMessage() {
  const successElement = document.getElementById('success-message');
  if (successElement) {
    successElement.style.display = 'block';
    successElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      successElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      successElement.style.opacity = '0';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

function showErrorMessage(error: string | undefined) {
  const errorElement = document.getElementById('errory-message');
  errorElement!.innerText = error || 'An error occurred';

  console.log(errorElement);

  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      errorElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}
