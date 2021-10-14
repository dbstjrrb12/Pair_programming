import createToast from './toaster.js';

// DOM
const $body = document.querySelector('body');
const $signinForm = document.querySelector('form.signin');
const $signupForm = document.querySelector('form.signup');
const $signInUserId = document.querySelector('#signin-userid');
const $signInPassword = document.querySelector('#signin-password');
const $signinButton = document.querySelector('.button');
const $signinInEmailIcons = document.querySelectorAll('#signin-userid ~ i');
const $signinInPasswordIcons = document.querySelectorAll(
  '#signin-password ~ i'
);
const $signinEmailError = document.querySelector('#signin-userid ~ .error');
const $signinPasswordError = document.querySelector(
  '#signin-password ~ .error'
);
const $signupLink = document.querySelectorAll('.link')[0];
const $signinLink = document.querySelectorAll('.link')[1];
// console.log($signinButton);
// function
// 이메일 유효성 검사
const isAllValidate = (function () {
  const isValidation = {
    email: false,
    password: false
  };

  return {
    get() {
      return isValidation;
    },

    set(str, isValid) {
      if (str === 'email') {
        isValidation.email = isValid;
      } else {
        isValidation.password = isValid;
      }
    }
  };
})();

const activateSignIn = () => {
  $signinButton.removeAttribute('disabled');
};

const deactivateSignIn = () => {
  $signinButton.setAttribute('disabled', 'disabled');
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
      $signinInEmailIcons[0].classList.remove('hidden');
      $signinInEmailIcons[1].classList.add('hidden');
      $signinEmailError.textContent = '';
    } else {
      $signinInEmailIcons[1].classList.remove('hidden');
      $signinInEmailIcons[0].classList.add('hidden');
      $signinEmailError.textContent = '이메일 형식에 맞게 입력해 주세요.';
    }
  } else if (target === 'password') {
    if (result.password) {
      $signinInPasswordIcons[0].classList.remove('hidden');
      $signinInPasswordIcons[1].classList.add('hidden');
      $signinPasswordError.textContent = '';
    } else {
      $signinInPasswordIcons[1].classList.remove('hidden');
      $signinInPasswordIcons[0].classList.add('hidden');
      $signinPasswordError.textContent = '영문 또는 숫자를 6~12자 입력하세요.';
    }
  }

  if ($signInUserId.value === '') {
    $signinInEmailIcons[0].classList.add('hidden');
    $signinInEmailIcons[1].classList.add('hidden');
    $signinEmailError.textContent = '';
  }

  if ($signInPassword.value === '') {
    $signinInPasswordIcons[0].classList.add('hidden');
    $signinInPasswordIcons[1].classList.add('hidden');
    $signinPasswordError.textContent = '';
  }
};

// Event handlers binding
$signInUserId.onkeyup = e => {
  validateEmail(e.target.value);

  controlPopup('email');
  // 중복 개선 가능
  if (
    e.key === 'Enter' &&
    $signinButton.getAttribute('disabled') !== 'disabled'
  ) {
    // toaster 생성
  }
};

$signInPassword.onkeyup = e => {
  validatePassword(e.target.value);

  controlPopup('password');
  // 중복 개선 가능
  //   if (
  //     e.key === 'Enter' &&
  //     $signinButton.getAttribute('disabled') !== 'disabled'
  //   ) {
  //   }
};

// dfsfsf@ndfe2.co
// dfssdf
$signinForm.onsubmit = e => {
  e.preventDefault();

  if ($signinButton.getAttribute('disabled') !== 'disabled') {
    $body.appendChild(
      createToast('success', 'Well done!', 'Signin successfully')
    );
    setTimeout(() => {
      $body.removeChild($body.querySelector('.toast'));
    }, 3000);

    console.log({
      email: $signInUserId.value,
      password: $signInPassword.value
    });
  }
};

$signupLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;
  $signinForm.classList.add('hidden');
  $signupForm.classList.remove('hidden');
};

// Sign up

// Event handler binding
$signinLink.onclick = e => {
  if (!e.target.matches('.link > a')) return;
  $signinForm.classList.remove('hidden');
  $signupForm.classList.add('hidden');
};
