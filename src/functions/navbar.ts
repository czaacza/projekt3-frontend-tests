import router from '../router';

export function initNavbarEventListeners(): void {
  const logo = document.querySelector('.navbar-brand');
  if (logo) {
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('/');
    });
  }

  const homeButton = document.querySelector('.home-button');
  if (homeButton) {
    homeButton.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('/');
    });
  }

  const myAccountButton = document.querySelector('.account-button');
  if (myAccountButton) {
    myAccountButton.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('/account');
    });
  }
}
