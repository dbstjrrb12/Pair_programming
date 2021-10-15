// DOM Nodes
const $body = document.querySelector('body');
const $successIcons = document.querySelectorAll('.icon-success');
const $errorIcons = document.querySelectorAll('.icon-error');
const $errorMessages = document.querySelectorAll('.error');

// Signin
const $signInForm = document.querySelector('form.signin');
const $signInUserId = document.querySelector('#signin-userid');
const $signInPassword = document.querySelector('#signin-password');
const $signInButton = document.querySelector('button.signin');
const $signUpLink = document.querySelectorAll('.link')[0];
const $signInLink = document.querySelectorAll('.link')[1];

// Signup
const $signUpForm = document.querySelector('form.signup');
const $signUpUserId = document.querySelector('#signup-userid');
const $signUpName = document.querySelector('#signup-name');
const $signUpPassword = document.querySelector('#signup-password');
const $signUpConfirm = document.querySelector('#signup-confirm-password');
const $signUpButton = document.querySelector('button.signup');

export {
  $body,
  $successIcons,
  $errorIcons,
  $errorMessages,
  $signInForm,
  $signInUserId,
  $signInPassword,
  $signInButton,
  $signUpLink,
  $signInLink,
  $signUpForm,
  $signUpUserId,
  $signUpName,
  $signUpPassword,
  $signUpConfirm,
  $signUpButton
};
