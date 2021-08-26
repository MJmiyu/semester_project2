import { getUrl, getProduct } from './api.js';
import { addToCart, existsInCart, removeFromCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProduct();
});

let product;

async function loadProduct() {
  const searchParameters = new URLSearchParams(window.location.search);

  const id = searchParameters.get('id');

  product = await getProduct(id);

  renderproduct();
}

function renderproduct() {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = '';

  const productTitle = document.createElement('h2');
  productTitle.innerText = product.title;

  const productImage = document.createElement('img');
  productImage.className = 'featured-product-image';
  productImage.src = getUrl() + product.image.url;

  const productDescription = document.createElement('p');
  productDescription.className = 'featured-product-description';
  productDescription.innerText = product.description;

  const productPrice = document.createElement('p');
  productPrice.className = 'featured-product-price';
  productPrice.innerText = product.price + ' $';

  const cartButton = document.createElement('button');
  cartButton.className = 'cart-button';

  const alreadyInCart = existsInCart(product.id);
  if (alreadyInCart) {
    cartButton.innerText = 'Remove From Cart';
  } else {
    cartButton.innerText = 'Add To Cart';
  }
  cartButton.addEventListener('click', () => {
    if (alreadyInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product.id);
    }
    renderproduct();
  });

  productContainer.appendChild(productTitle);
  productContainer.appendChild(productImage);
  productContainer.appendChild(productDescription);
  productContainer.appendChild(productPrice);
  productContainer.appendChild(cartButton);

  console.log(product);
}

function createButton() {}
