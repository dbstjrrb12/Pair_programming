// DOM Nodes
const $body = document.querySelector('body');
const $successIcons = document.querySelectorAll('.icon-success');
const $errorIcons = document.querySelectorAll('.icon-error');
const $errorMessages = document.querySelectorAll('.error');

// Signin
const $signinForm = document.querySelector('form.signin');
const $signInUserId = document.querySelector('#signin-userid');
const $signInPassword = document.querySelector('#signin-password');
const $signinButton = document.querySelector('button.signin');
const $signupLink = document.querySelectorAll('.link')[0];
const $signinLink = document.querySelectorAll('.link')[1];

// Signup
const $signupForm = document.querySelector('form.signup');
const $signupUserId = document.querySelector('#signup-userid');
const $signupName = document.querySelector('#signup-name');
const $signupPassword = document.querySelector('#signup-password');
const $signupConfirm = document.querySelector('#signup-confirm-password');
const $signupButton = document.querySelector('button.signup');

export {
  $body,
  $successIcons,
  $errorIcons,
  $errorMessages,
  $signinForm,
  $signInUserId,
  $signInPassword,
  $signinButton,
  $signupLink,
  $signinLink,
  $signupForm,
  $signupUserId,
  $signupName,
  $signupPassword,
  $signupConfirm,
  $signupButton
};
