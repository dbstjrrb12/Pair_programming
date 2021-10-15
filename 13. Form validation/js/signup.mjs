import * as Node from './node.mjs';
import {
  isAllValidate,
  validateEmail,
  validateName,
  validatePassword,
  validateConfirm,
  controlPopup
} from './state.mjs';
import toast from './toaster.mjs';

// Event handler binding
Node.$signinLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;
  Node.$signinForm.classList.remove('hidden');
  Node.$signupForm.classList.add('hidden');
};

Node.$signupUserId.onkeyup = e => {
  validateEmail(e.target.value);

  controlPopup(e.target, 'email');
};

Node.$signupName.onkeyup = e => {
  validateName(e.target.value);

  controlPopup(e.target, 'name');
};

Node.$signupPassword.onkeyup = e => {
  validatePassword(e.target.value);

  controlPopup(e.target, 'password');
};

Node.$signupConfirm.onkeyup = e => {
  validateConfirm(e.target.value);

  controlPopup(e.target, 'confirm');
};

Node.$signupForm.onsubmit = e => {
  e.preventDefault();

  toast(e.target);

  console.log({
    email: Node.$signupUserId.value,
    password: Node.$signupPassword.value,
    name: Node.$signupName.value,
    confirm: Node.$signupConfirm.value
  });
};

Node.$signinLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;

  Node.$signinForm.classList.remove('hidden');
  Node.$signupForm.classList.add('hidden');

  isAllValidate.initialize();
};

const signup = {};

export default signup;
