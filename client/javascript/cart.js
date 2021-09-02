import { getProducts, getUrl } from './api.js';
import { getCart } from './localStorage.js';

let products = [];
let cartProducts = [];

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});

async function loadProducts() {
  products = await getProducts();

  const cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    const productId = cart[i];

    const product = products.find((product) => product.id === productId);

    if (product) {
      cartProducts.push(product);
    }
  }

  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  let totalPrice = 0;

  if (cartProducts.length === 0) {
    const placeholder = document.createElement('span');
    cartContainer.appendChild(placeholder);

    const emptyCart = document.createElement('p');
    emptyCart.innerText = 'Cart Is Empty';
    cartContainer.appendChild(emptyCart);
  }

  for (let i = 0; i < cartProducts.length; i++) {
    const product = cartProducts[i];

    totalPrice += product.price;

    const productContainer = document.createElement('div');

    const productTitle = document.createElement('h2');
    productTitle.innerText = product.title;

    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = getUrl() + product.image.url;

    const productPrice = document.createElement('p');
    productPrice.innerText = product.price + ' $';

    const detailsButton = document.createElement('button');
    detailsButton.innerText = 'Details';
    detailsButton.className = 'details-button';
    detailsButton.addEventListener('click', () => {
      window.location = '/client/html/details.html?id=' + product.id;
    });

    cartContainer.appendChild(productContainer);
    productContainer.appendChild(productTitle);
    productContainer.appendChild(productImage);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(detailsButton);
  }

  const totalPriceContainer = document.getElementById('total-price');
  totalPriceContainer.innerText = 'Total Price ' + totalPrice + ' $';
}
