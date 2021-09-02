import { getProducts, getUrl } from './api.js';
import { checkLogin, logout } from './auth.js';

let products = [];

document.addEventListener('DOMContentLoaded', async () => {
  checkLogin();
  loadProducts();

  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', logout);
});

async function loadProducts() {
  products = await getProducts();
  renderProducts();
}

function renderProducts() {
  const productsContainer = document.getElementById('products');

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const productContainer = document.createElement('div');

    const productTitle = document.createElement('h2');
    productTitle.innerText = product.title;

    const productImage = document.createElement('img');
    if (product.image) {
      productImage.src = getUrl() + product.image.url;
    }

    const productPrice = document.createElement('p');
    productPrice.innerText = product.price + ' $';

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
      window.location = '/admin/html/edit.html?id=' + product.id;
    });

    productsContainer.appendChild(productContainer);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productImage);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(editButton);
  }
}
