import * as Node from './node.mjs';

const validationStates = (function () {
  const states = {
    email: false,
    password: false,
    name: true,
    passwordConfirm: true
  };

  return {
    get() {
      return states;
    },

    set({ email, name, password, passwordConfirm }) {
      states.email = email ?? states.email;
      states.name = name ?? states.name;
      states.password = password ?? states.password;
      states.passwordConfirm = passwordConfirm ?? states.passwordConfirm;
    },

    isAllTrue(...args) {
      return args.every(v => states[v]);
    },

    initialize(isSignIn) {
      states.email = false;
      states.name = false;
      states.password = isSignIn || false;
      states.passwordConfirm = isSignIn || false;
    }
  };
})();

const errorMessageTypes = {
  email: '이메일 형식에 맞게 입력해 주세요.',
  password: '영문 또는 숫자를 6~12자 입력하세요.',
  name: '이름을 입력해주세요.',
  passwordConfirm: '패스워드가 일치하지 않습니다.'
};

const activateSubmitButton = () => {
  Node.$signInForm.classList.contains('hidden')
    ? Node.$signUpButton.removeAttribute('disabled')
    : Node.$signInButton.removeAttribute('disabled');
};

const deactivateSubmitButton = () => {
  Node.$signInForm.classList.contains('hidden')
    ? Node.$signUpButton.setAttribute('disabled', 'disabled')
    : Node.$signInButton.setAttribute('disabled', 'disabled');
};

const validateEmail = value => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gi;

  regExp.test(value)
    ? validationStates.set({ email: true })
    : validationStates.set({ email: false });

  validationStates.isAllTrue('email', 'password', 'name', 'passwordConfirm')
    ? activateSubmitButton()
    : deactivateSubmitButton();
};

const validateName = value => {
  value.length >= 1
    ? validationStates.set({ name: true })
    : validationStates.set({ name: false });

  validationStates.isAllTrue('email', 'password', 'name', 'passwordConfirm')
    ? activateSubmitButton()
    : deactivateSubmitButton();
};

const validatePassword = value => {
  const regExp = /[a-zA-z0-9]{6,12}/g;

  regExp.test(value)
    ? validationStates.set({ password: true })
    : validationStates.set({ password: false });

  validationStates.isAllTrue('email', 'password', 'name', 'passwordConfirm')
    ? activateSubmitButton()
    : deactivateSubmitButton();
};

const validatePasswordConfirm = value => {
  value === Node.$signUpPassword.value
    ? validationStates.set({ passwordConfirm: true })
    : validationStates.set({ passwordConfirm: false });

  validationStates.isAllTrue('email', 'password', 'name', 'passwordConfirm')
    ? activateSubmitButton()
    : deactivateSubmitButton();
};

const controlPopup = (target, result) => {
  const validation = validationStates.get()[result];

  const $successIcon = target.parentNode.querySelector('.icon-success');

  const $errorIcon = target.parentNode.querySelector('.icon-error');

  const $errorMessageContainer = target.parentNode.querySelector('.error');

  $successIcon.classList.toggle('hidden', !validation);
  $errorIcon.classList.toggle('hidden', validation);
  $errorMessageContainer.textContent = validation
    ? ''
    : errorMessageTypes[result];
};

export {
  validationStates,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
  controlPopup
};
