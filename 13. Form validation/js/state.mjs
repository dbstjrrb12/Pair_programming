import * as Node from './node.mjs';

const isAllValidate = (function () {
  const isValidation = {
    email: false,
    password: false,
    name: false,
    confirm: false
  };

  return {
    get() {
      return isValidation;
    },

    set({ email, name, password, confirm }) {
      isValidation.email = email ?? isValidation.email;
      isValidation.name = name ?? isValidation.name;
      isValidation.password = password ?? isValidation.password;
      isValidation.confirm = confirm ?? isValidation.confirm;
    },

    isAllTrue(...args) {
      return args.every(v => isValidation[v]);
    },

    initialize() {
      isValidation.email = false;
      isValidation.name = false;
      isValidation.password = false;
      isValidation.confirm = false;
    }
  };
})();

const errorMessage = {
  email: '이메일 형식에 맞게 입력해 주세요.',
  password: '영문 또는 숫자를 6~12자 입력하세요.',
  name: '이름을 입력해주세요.',
  confirm: '패스워드가 일치하지 않습니다.'
};

const activate = () => {
  Node.$signinForm.classList.contains('hidden')
    ? Node.$signupButton.removeAttribute('disabled')
    : Node.$signinButton.removeAttribute('disabled');
};

const deactivate = () => {
  Node.$signinForm.classList.contains('hidden')
    ? Node.$signupButton.setAttribute('disabled', 'disabled')
    : Node.$signinButton.setAttribute('disabled', 'disabled');
};

const validateEmail = value => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gi;

  regExp.test(value)
    ? isAllValidate.set({ email: true })
    : isAllValidate.set({ email: false });

  isAllValidate.isAllTrue('email', 'password') ? activate() : deactivate();
};

const validateName = value => {
  value.length >= 1
    ? isAllValidate.set({ name: true })
    : isAllValidate.set({ name: false });

  isAllValidate.isAllTrue('email', 'password', 'name', 'confirm')
    ? activate()
    : deactivate();
};

const validatePassword = value => {
  const regExp = /[a-zA-z0-9]{6,12}/g;

  regExp.test(value)
    ? isAllValidate.set({ password: true })
    : isAllValidate.set({ password: false });

  isAllValidate.isAllTrue('email', 'password') ? activate() : deactivate();
};

const validateConfirm = value => {
  value === Node.$signupPassword.value
    ? isAllValidate.set({ confirm: true })
    : isAllValidate.set({ confirm: false });

  isAllValidate.isAllTrue('email', 'password', 'name', 'confirm')
    ? activate()
    : deactivate();
};

const controlPopup = (target, result) => {
  const validation = isAllValidate.get()[result];

  const success = [...Node.$successIcons].filter(
    icon => target.parentNode === icon.parentNode
  )[0];

  const error = [...Node.$errorIcons].filter(
    icon => target.parentNode === icon.parentNode
  )[0];

  const errorMessages = [...Node.$errorMessages].filter(
    message => target.parentNode === message.parentNode
  )[0];

  success.classList.toggle('hidden', !validation);
  error.classList.toggle('hidden', validation);
  errorMessages.textContent = validation ? '' : errorMessage[result];
};

export {
  isAllValidate,
  validateEmail,
  validateName,
  validatePassword,
  validateConfirm,
  controlPopup
};
