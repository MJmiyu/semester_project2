const localStorage = window.localStorage;
const key = 'cart';

function setCart(cart) {
  const jsonString = JSON.stringify(cart);
  localStorage.setItem(key, jsonString);
}

function getCart() {
  const cart = localStorage.getItem(key);
  if (cart) {
    const json = JSON.parse(cart);
    return json;
  }
  return [];
}

function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  setCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();
  const index = cart.findIndex((cartId) => cartId === id);
  if (index >= 0) {
    cart.splice(index, 1);
    setCart(cart);
  }
}

function existsInCart(id) {
  const cart = getCart();

  if (cart.find((cartId) => cartId === id)) {
    return true;
  }
  return false;
}

export { getCart, setCart, addToCart, removeFromCart, existsInCart };
