const apiURL = 'http://localhost:1337';

async function get(path) {
  const response = await fetch(apiURL + path);
  const json = await response.json();
  return json;
}

function getUrl() {
  return apiURL;
}

async function getBanner() {
  const banner = await get('/home');
  return banner;
}

async function getProducts() {
  const products = await get('/products');
  return products;
}

async function getProduct(id) {
  const product = await get('/products/' + id);
  return product;
}

export { getUrl, getBanner, getProducts, getProduct };
