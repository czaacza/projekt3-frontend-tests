import { logout } from '../auth/auth';

export function handleLogoutButtonClick() {
  logout();
  location.reload();
}

export function initLogoutEventListener(): void {
  document
    ?.querySelector('#logout-button')
    ?.addEventListener('click', handleLogoutButtonClick);
}
