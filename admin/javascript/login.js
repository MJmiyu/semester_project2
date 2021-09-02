import { isLoggedIn, login } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  if (isLoggedIn()) {
    window.location.href = '/admin/html/products.html';
  }
  const form = document.getElementById('form');
  form.addEventListener('submit', submitForm);

  const emailInput = document.getElementById('email');

  emailInput.addEventListener('keyup', removeError);
  const passwordInput = document.getElementById('password');
  passwordInput.addEventListener('keyup', removeError);
});

function removeError() {
  const emailInput = document.getElementById('email');
  emailInput.classList.remove('error');
  const passwordInput = document.getElementById('password');
  passwordInput.classList.remove('error');
}

async function submitForm(e) {
  console.log('hello', e);
  e.preventDefault();

  // Get elements.
  const form = document.getElementById('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value;
  const password = passwordInput.value;

  const regEx = /\S+@\S+\.\S+/;
  const invalidEmail = email.length === 0 || !regEx.test(email);
  if (invalidEmail) {
    emailInput.classList.add('error');
  }

  const invalidPassword = password.length === 0;
  if (invalidPassword) {
    passwordInput.classList.add('error');
  }

  if (invalidEmail || invalidPassword) {
    return;
  }

  try {
    const body = JSON.stringify({
      identifier: email,
      password: password,
    });

    const request = await fetch('http://localhost:1337/auth/local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    const result = await request.json();

    // If successsful, validate form and redirect.
    if (request.status === 200) {
      login(result.jwt);
    }
    // If unsuccsessful, invalidate form and show message.
    else {
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
    }
    // If failed, invalidate form and show message.
  } catch {
    emailInput.classList.add('error');
    passwordInput.classList.add('error');
  }
}
