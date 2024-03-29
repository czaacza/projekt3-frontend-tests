import getUserOrders from '../api/orders';
import { fetchProducts } from '../api/products';
import { doGraphQLFetch } from '../graphql/fetch';
import {
  addUserAsAdminQuery,
  deleteUserAsAdminQuery,
  getUsersQuery,
  updateUserAsAdminQuery,
} from '../graphql/queries';
import { getUsers, updateUser, deleteUser } from '../rest/usersFetch';
import { User } from '../interfaces/User';
import ordersSection from '../views/account/ordersSection';
import { showErrorMessage, showSuccessMessage } from './admin';

export const initUserSectionEventListeners = (): void => {
  initAdminUserUpdateButtonEventListener();
  initDeleteButton();
  initAddNewUserButton();
};

export async function fetchUsers() {
  const data = await getUsers(`${import.meta.env.VITE_API_URL}`);
  if (data) {
    return data;
  }

  return undefined;
}

export const usersClickHandler = (users: User[]) => {
  const userDetailsForm = document.querySelector(
    '#user-details-form'
  ) as HTMLFormElement;

  const displayUserDetails = (user: User) => {
    toggleAddUserForm(false);
    userDetailsForm.classList.remove('d-none');

    (document.querySelector('#user-id') as HTMLInputElement).value = user.id;
    (document.querySelector('#user-username') as HTMLInputElement).value =
      user.username;
    (document.querySelector('#user-email') as HTMLInputElement).value =
      user.email;
  };

  users.forEach((user) => {
    const listItem = document.querySelector(
      `.user-list-item[data-user-id="${user.id}"]`
    ) as HTMLElement;

    listItem.addEventListener('click', () => {
      displayUserDetails(user);
      showOrderHistory(user);
    });
  });
};

async function updateAdminUser(
  user: User
): Promise<{ success: boolean; user?: User; error?: string }> {
  const token = sessionStorage.getItem('token')?.slice(1, -1);

  if (
    !user.email ||
    user.email.indexOf('@') === -1 ||
    user.email.indexOf('.') === -1
  ) {
    return { success: false, error: 'Email is required' };
  }

  if (!token) {
    return { success: false, error: 'User not logged in' };
  }

  const data = await updateUser(`${import.meta.env.VITE_API_URL}`, user.id, {
    username: user.username,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin,
  });

  console.log('updateUser', data);

  if (data) {
    return { success: true, user: data };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAdminUserUpdateButtonEventListener() {
  const updateUserButton = document.querySelector('#btn-update-user');

  updateUserButton?.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const userId =
      document.querySelector<HTMLInputElement>('#user-id')?.value || '';
    const username =
      document.querySelector<HTMLInputElement>('#user-username')?.value || '';
    const email =
      document.querySelector<HTMLInputElement>('#user-email')?.value || '';

    const userToUpdate = {
      id: userId,
      username,
      email,
    };

    const updateResult = await updateAdminUser(userToUpdate);
    if (updateResult.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(updateResult.error);
    }
  });
}

async function deleteUserAsAdmin(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const data = await deleteUser(`${import.meta.env.VITE_API_URL}`, userId);

  if (data) {
    return { success: true };
  } else {
    return {
      success: false,
      error: 'Failed to delete user. Please try again.',
    };
  }
}

export const initDeleteButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';

  const deleteUserButton = document.querySelector(
    '#btn-delete-user'
  ) as HTMLButtonElement;

  if (!deleteUserButton) {
    return;
  }

  deleteUserButton.addEventListener('click', async () => {
    const userId = (document.querySelector('#user-id') as HTMLInputElement)
      .value;
    const result = await deleteUserAsAdmin(userId);

    if (result.success) {
      // Show success message and remove user from the list
      showSuccessMessage('User deleted successfully');
      const userItem = document.querySelector(
        `[data-user-id="${userId}"]`
      ) as HTMLElement;
      userItem.remove();
      // Clear user details form
      const userDetailsForm = document.querySelector(
        '#user-details-form'
      ) as HTMLFormElement;
      userDetailsForm.classList.add('d-none');
    } else {
      // Show error message
      showErrorMessage(result.error);
    }
  });
};

async function addNewUser(
  userInput: any,
  adminToken: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const variables = {
    user: userInput,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    addUserAsAdminQuery,
    variables,
    adminToken
  );

  if (data.addUserAsAdmin && data.addUserAsAdmin.user) {
    return { success: true, user: data.addUserAsAdmin.user };
  } else {
    return {
      success: false,
      error: data.register.message || 'Failed to add user. Please try again.',
    };
  }
}

export const initAddNewUserButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';
  const addNewUserButton = document.querySelector(
    '#btn-add-user'
  ) as HTMLButtonElement;
  const userDetailsForm = document.querySelector(
    '#user-details-form'
  ) as HTMLFormElement;

  const clearUserDetailsForm = () => {
    userDetailsForm.reset();
    userDetailsForm.classList.add('d-none');
  };

  if (!addNewUserButton) {
    return;
  }

  addNewUserButton.addEventListener('click', async () => {
    clearUserDetailsForm();
    userDetailsForm.classList.remove('d-none');
    toggleAddUserForm(true); // Show the password field

    userDetailsForm.onsubmit = async (event: Event) => {
      event.preventDefault();

      const newUser = {
        username: (document.querySelector('#user-username') as HTMLInputElement)
          .value,
        email: (document.querySelector('#user-email') as HTMLInputElement)
          .value,
        password: (document.querySelector('#user-password') as HTMLInputElement)
          .value,
        details: {
          firstName: (
            document.querySelector('#user-first-name') as HTMLInputElement
          ).value,
          lastName: (
            document.querySelector('#user-last-name') as HTMLInputElement
          ).value,
          phone: (document.querySelector('#user-phone') as HTMLInputElement)
            .value,
        },
      };

      const result = await addNewUser(newUser, adminToken);

      if (result.success && result.user) {
        showSuccessMessage('User added successfully');
        const usersList = document.querySelector('.users-list') as HTMLElement;
        usersList.innerHTML += generateUserListItem(result.user);

        toggleAddUserForm(false);
      } else {
        showErrorMessage(result.error);
      }
    };
  });
};

export function filterUsers(users: User[], searchText: string): User[] {
  if (!searchText) {
    return users;
  }

  const filteredUsers = users.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return filteredUsers;
}

export const initSearchUsers = (users: User[]) => {
  const searchInput = document.querySelector(
    '#search-users'
  ) as HTMLInputElement;
  const usersList = document.querySelector('.users-list') as HTMLElement;

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value;
    const filteredUsers = filterUsers(users, searchText);
    usersList.innerHTML = generateUsersList(filteredUsers);
  });
};

export function generateUsersList(users: User[] | undefined) {
  if (!users) {
    return '';
  }

  return users
    .map(
      (user) => `
        <li class="list-group-item user-list-item user-list-item" data-user-id="${user.id}">
          <span class="user-name">${user.username}</span> - <span class="user-email">${user.email}</span>
        </li>
      `
    )
    .join('');
}

function generateUserListItem(user: User): string {
  return `
    <li class="list-group-item user-list-item" data-user-id="${user.id}">
      <span class="user-name">${user.username}</span> - <span class="user-email">${user.email}</span>
    </li>
  `;
}

function toggleAddUserForm(visible: boolean) {
  const passwordFieldContainer = document.getElementById(
    'password-field-container'
  );
  const addUserFormButton = document.getElementById('btn-add-user-form');

  const updateUserButton = document.getElementById('btn-update-user');
  const deleteUserButton = document.getElementById('btn-delete-user');

  if (visible) {
    passwordFieldContainer!.style.display = 'block';
    addUserFormButton!.style.display = 'block';

    updateUserButton!.style.display = 'none';
    deleteUserButton!.style.display = 'none';
  } else {
    passwordFieldContainer!.style.display = 'none';
    addUserFormButton!.style.display = 'none';

    updateUserButton!.style.display = 'inline-block';
    deleteUserButton!.style.display = 'inline-block';
  }
}

async function showOrderHistory(user: User): Promise<void> {
  // Filter orders for the specific user
  const products = await fetchProducts();
  const userOrders = await getUserOrders(user);

  // Generate the Order history section HTML
  const orderHistoryHtml = ordersSection(userOrders, products);

  // Update the Order history section and show it
  const orderHistorySection = document.getElementById(
    'order-history-section'
  ) as HTMLElement;
  orderHistorySection.innerHTML = orderHistoryHtml;
  orderHistorySection.classList.remove('d-none');
}
