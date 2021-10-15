import * as Node from './node.mjs';
import {
  isAllValidate,
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

Node.$signinForm.onsubmit = e => {
  e.preventDefault();

  toast(e.target);

  console.log({
    email: Node.$signInUserId.value,
    password: Node.$signInPassword.value
  });
};

Node.$signupLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;

  Node.$signinForm.classList.add('hidden');
  Node.$signupForm.classList.remove('hidden');

  isAllValidate.initialize();
};

const signin = {};

export default signin;
