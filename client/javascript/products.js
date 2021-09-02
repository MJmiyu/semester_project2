import { getUrl, getProducts } from './api.js';

let products = [];
let searchProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', search);
});

async function loadProducts() {
  products = await getProducts();
  searchProducts = products;
  renderProducts();
}

function search() {
  const searchText = document
    .getElementById('search-input')
    .value.toLowerCase();

  searchProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
  );
  renderProducts();
}

function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  for (let i = 0; i < searchProducts.length; i++) {
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

    const detailsButton = document.createElement('button');
    detailsButton.innerText = 'Details';
    detailsButton.addEventListener('click', () => {
      window.location = '/client/html/details.html?id=' + product.id;
    });

    productsContainer.appendChild(productContainer);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productImage);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(detailsButton);
  }
}
