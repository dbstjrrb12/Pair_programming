import * as Node from './node.mjs';
import {
  validationStates,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
  controlPopup
} from './state.mjs';
import toast from './toaster.mjs';

// Event handler binding
Node.$signInLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;

  Node.$signInForm.classList.remove('hidden');
  Node.$signUpForm.classList.add('hidden');
};

Node.$signUpUserId.onkeyup = e => {
  validateEmail(e.target.value);

  controlPopup(e.target, 'email');
};

Node.$signUpName.onkeyup = e => {
  validateName(e.target.value);

  controlPopup(e.target, 'name');
};

Node.$signUpPassword.onkeyup = e => {
  validatePassword(e.target.value);
  console.log(validationStates.get());

  controlPopup(e.target, 'password');
};

Node.$signUpConfirm.onkeyup = e => {
  validatePasswordConfirm(e.target.value);

  controlPopup(e.target, 'passwordConfirm');
};

Node.$signUpForm.onsubmit = e => {
  e.preventDefault();

  toast(e.target);

  console.log({
    email: Node.$signUpUserId.value,
    password: Node.$signUpPassword.value,
    name: Node.$signUpName.value,
    passwordConfirm: Node.$signUpConfirm.value
  });
};

Node.$signInLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;

  Node.$signInForm.classList.remove('hidden');
  Node.$signUpForm.classList.add('hidden');

  const GOTOSIGNIN = true;
  validationStates.initialize(GOTOSIGNIN);
};

const signup = {};

export default signup;
