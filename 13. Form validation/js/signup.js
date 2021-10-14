const $signupForm = document.querySelector('form.signup');
const $signinForm = document.querySelector('form.signin');
const $signupUserId = document.querySelector('#signup-userid');
const $signupPassword = document.querySelector('#signup-password');
const $signupButton = document.querySelector('.button');
const $signupInEmailIcons = document.querySelectorAll('#signup-userid ~ i');
const $signupInPasswordIcons = document.querySelectorAll(
  '#signup-password ~ i'
);
const $signupEmailError = document.querySelector('#signin-userid ~ .error');
const $signupPasswordError = document.querySelector(
  '#signup-password ~ .error'
);
const $signinLink = document.querySelectorAll('.link')[1];

// function
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
    }
  };
})();

const activateSignIn = () => {
  $signupButton.removeAttribute('disabled');
};

const deactivateSignIn = () => {
  $signupButton.setAttribute('disabled', 'disabled');
};

const validateEmail = value => {
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/gi;

  regExp.test(value)
    ? isAllValidate.set('email', true)
    : isAllValidate.set('email', false);

  const result = isAllValidate.get();
  result.email && result.password ? activateSignIn() : deactivateSignIn();
};

const validatePassword = value => {
  const regExp = /[a-zA-z0-9]{6,12}/g;

  regExp.test(value)
    ? isAllValidate.set('password', true)
    : isAllValidate.set('password', false);

  const result = isAllValidate.get();
  result.email && result.password ? activateSignIn() : deactivateSignIn();
};

const controlPopup = target => {
  const result = isAllValidate.get();

  if (target === 'email') {
    if (result.email) {
      $signupInEmailIcons[0].classList.remove('hidden');
      $signupInEmailIcons[1].classList.add('hidden');
      $signupEmailError.textContent = '';
    } else {
      $signupInEmailIcons[1].classList.remove('hidden');
      $signupInEmailIcons[0].classList.add('hidden');
      $signupEmailError.textContent = '이메일 형식에 맞게 입력해 주세요.';
    }
  } else if (target === 'password') {
    if (result.password) {
      $signupInPasswordIcons[0].classList.remove('hidden');
      $signupInPasswordIcons[1].classList.add('hidden');
      $signupPasswordError.textContent = '';
    } else {
      $signupInPasswordIcons[1].classList.remove('hidden');
      $signupInPasswordIcons[0].classList.add('hidden');
      $signupPasswordError.textContent = '영문 또는 숫자를 6~12자 입력하세요.';
    }
  }

  if ($signupUserId.value === '') {
    $signupInEmailIcons[0].classList.add('hidden');
    $signupInEmailIcons[1].classList.add('hidden');
    $signupEmailError.textContent = '';
  }

  if ($signupPassword.value === '') {
    $signupInPasswordIcons[0].classList.add('hidden');
    $signupInPasswordIcons[1].classList.add('hidden');
    $signupPasswordError.textContent = '';
  }
};

// Event handler binding
$signinLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;
  $signinForm.classList.remove('hidden');
  $signupForm.classList.add('hidden');
};

$signupUserId.onkeyup = e => {
  validateEmail(e.target.value);

  controlPopup('email');
};

$signupPassword.onkeyup = e => {
  validatePassword(e.target.value);

  controlPopup('password');
};
