function isLoggedIn() {
  const jwt = localStorage.getItem('strapi-jwt');
  if (jwt) {
    return true;
  }
  return false;
}

function checkLogin() {
  if (!isLoggedIn()) {
    window.location.href = '/admin/html/login.html';
  }
}

function getToken() {
  const jwt = localStorage.getItem('strapi-jwt');
  return jwt;
}

function logout() {
  localStorage.setItem('strapi-jwt', '');
  window.location.href = '/admin/html/login.html';
}

function login(jwt) {
  localStorage.setItem('strapi-jwt', jwt);
  window.location.href = '/admin/html/products.html';
}

export { checkLogin, getToken, logout, login, isLoggedIn };
