import { getUrl, getProduct, updateProduct, deleteProduct } from './api.js';
import { logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  loadProduct();

  const productForm = document.getElementById('product-form');
  productForm.addEventListener('submit', submitForm);

  const deleteButton = document.getElementById('delete');
  deleteButton.addEventListener('click', deleteClick);

  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', logout);
});

let product;

async function deleteClick() {
  await deleteProduct(product.id);
  location.href = '/admin/html/products.html';
}

async function loadProduct() {
  const searchParameters = new URLSearchParams(window.location.search);

  const id = searchParameters.get('id');

  product = await getProduct(id);

  renderproduct();
}

async function submitForm(event) {
  event.preventDefault();

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

  await updateProduct(product.id, data, image);

  location.reload();
}

function renderproduct() {
  const productTitleInput = document.getElementById('product-title-input');
  productTitleInput.value = product.title;

  const featuredCheckbox = document.getElementById('product-featured-checkbox');
  featuredCheckbox.checked = product.featured;

  const productImage = document.getElementById('product-image');
  if (product.image) {
    productImage.src = getUrl() + product.image.url;
  }

  const productDescriptionInput = document.getElementById(
    'product-description-input'
  );
  productDescriptionInput.value = product.description;

  const productPriceInput = document.getElementById('product-price-input');
  productPriceInput.value = product.price;
}
