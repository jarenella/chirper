const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert("Your username or password is incorrect. Please try again.");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  //these variables MUST be in snake case to perfectly match the database names or it doesn't work
  //i know camel case is goated and much better so that sucks but whatever
  const username = document.querySelector('#name-signup').value.trim();
  const display_name = document.querySelector('#display-name-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const profile_pic = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  const is_verified = "0";

  if (username && password && display_name && profile_pic && is_verified) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, display_name, password, profile_pic, is_verified }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
