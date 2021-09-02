import { getToken } from './auth.js';

const apiURL = 'http://localhost:1337';

async function get(path) {
  const response = await fetch(apiURL + path);
  const json = await response.json();
  return json;
}

async function put(path, form) {
  const response = await fetch(apiURL + path, {
    method: 'PUT',
    body: form,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
  const json = await response.json();
  return json;
}

async function post(path, form) {
  const response = await fetch(apiURL + path, {
    method: 'POST',
    body: form,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
  const json = await response.json();
  return json;
}

async function del(path) {
  await fetch(apiURL + path, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  });
}

function getUrl() {
  return apiURL;
}

async function getProducts() {
  const products = await get('/products');
  return products;
}

async function getProduct(id) {
  const product = await get('/products/' + id);
  return product;
}

async function updateProduct(id, data, image) {
  const form = new FormData();
  form.append('data', JSON.stringify(data));
  if (image) {
    form.append('files.image', image, image.name);
  }

  await put('/products/' + id, form);
}

async function addProduct(data, image) {
  const form = new FormData();
  form.append('data', JSON.stringify(data));
  if (image) {
    form.append('files.image', image, image.name);
  }

  const product = await post('/products', form);
  return product;
}

async function deleteProduct(id) {
  await del('/products/' + id);
}

export {
  getUrl,
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
};
