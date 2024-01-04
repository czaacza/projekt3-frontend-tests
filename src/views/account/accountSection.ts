import { isUserAdmin } from '../../api/users';
import { User } from '../../interfaces/User';

export default function accountSection(user?: User): string {
  console.log('accountSection', user);
  const { username, email, password, details } = user || {};
  const { firstName, lastName, phone } = details || {};

  const isAdmin = isUserAdmin(user);

  const modalHtml = `<div class="container account-container">
    <h2 class="text-center mt-3 mb-5">Welcome, <span id="username">${
      firstName || username || 'User'
    }</span>!</h2>
    <div class="btn-admin-panel-container">
    ${
      isAdmin
        ? '<button class="btn btn-account btn-primary btn-admin-panel" id="btn-admin-panel">Admin panel</button>'
        : ''
    }
    </div>
    <div class="account-row">
      <div class="col-md-6 mt-5">
        <h3>Account Details</h3>
        <form id="accountForm">
          <div class="mb-3">
            <label for="accountUsername" class="form-label">Username</label>
            <input type="text" class="form-control account-form-control" id="accountUsername" value="${
              username || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="accountEmail" class="form-label">Email</label>
            <input type="email" class="form-control account-form-control" id="accountEmail" value="${
              email || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="accountPassword" class="form-label">Password</label>
            <input type="text" class="form-control account-form-control" id="accountPassword" value="${
              password || ''
            }" required />
          </div>
          <button type="submit" class="btn btn-primary btn-save-changes" id="btn-save-changes">Save Changes</button>
        </form>
        <div id="success-message" class="success-message">
          Profile details updated successfully!
        </div>
        <div id="errory-message" class="error-message">
          Error updating profile details. Please try again.
        </div>   
      </div>
      <div class="col-md-6">
        <img src="/img/logo.png" class="img-fluid" alt="Hero Image" />
      </div>
      </div>

  </div>
  `;
  return modalHtml;
}
