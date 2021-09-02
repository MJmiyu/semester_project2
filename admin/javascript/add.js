import { addProduct } from './api.js';
import { logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('product-form');
  productForm.addEventListener('submit', submitForm);

  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', logout);
});

async function submitForm(event) {
  event.preventDefault();

  const productForm = document.getElementById('product-form');
  const productTitleInput = document.getElementById('product-title-input');
  const title = productTitleInput.value;

  const featuredCheckbox = document.getElementById('product-featured-checkbox');
  const featured = featuredCheckbox.checked;

  const productImageinput = document.getElementById('product-image-input');
  const [image] = productImageinput.files;

  const productDescriptionInput = document.getElementById(
    'product-description-input'
  );
  const description = productDescriptionInput.value;

  const productPriceInput = document.getElementById('product-price-input');
  const price = productPriceInput.value;

  const data = {
    title,
    featured,
    description,
    price,
  };

  const product = await addProduct(data, image);
  console.log(product);

  location.href = '/admin/html/edit.html?id=' + product.id;
}
