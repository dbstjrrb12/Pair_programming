import * as Node from './node.mjs';
import {
  validationStates,
  validateEmail,
  validatePassword,
  controlPopup
} from './state.mjs';
import toast from './toaster.mjs';

// Event handlers binding
Node.$signInUserId.onkeyup = e => {
  validateEmail(e.target.value);

  controlPopup(e.target, 'email');
};

Node.$signInPassword.onkeyup = e => {
  validatePassword(e.target.value);

  controlPopup(e.target, 'password');
};

Node.$signInForm.onsubmit = e => {
  e.preventDefault();

  toast(e.target);

  console.log({
    email: Node.$signInUserId.value,
    password: Node.$signInPassword.value
  });
};

Node.$signUpLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;

  Node.$signInForm.classList.add('hidden');
  Node.$signUpForm.classList.remove('hidden');

  const GOTOSIGNUP = false;
  validationStates.initialize(GOTOSIGNUP);
};

const signin = {};

export default signin;
