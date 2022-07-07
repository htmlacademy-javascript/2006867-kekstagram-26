import { showAlert } from "./util.js";
import { sendData } from "./api.js";


const formElement = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputComments = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// Функция валидации хештегов
const regular = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
function hashtagValidate(text) {
  return regular.test(text);
}


// Проверка на "один и тот же хэш-тег не может быть использован дважды"
function checkSimilarElements(arr) {
  return (new Set(arr)).size !== arr.length;
}

function modifyArrHashTag(value) {
  return value.toLowerCase().split(' ');
}


pristine.addValidator(inputHashtags, function(value) {
  if  (modifyArrHashTag(value).length <= 5) {
    return true;
  }
  return false;
}, 'Допускается не более пяти хэштегов', false );

pristine.addValidator(inputHashtags, function(value) {
  if  (modifyArrHashTag(value).length === 1) {
    return false;
  }
  return true;
}, 'хеш-тег не может состоять только из одной решётки', false );

pristine.addValidator(inputHashtags, function(value) {
  if (!checkSimilarElements(modifyArrHashTag(value))) {
    return true;
  }
  return false;
}, 'Хештеги должны быть разными', false);

pristine.addValidator(inputHashtags, function(value) {
  for (let i = 0; i < modifyArrHashTag(value).length; i++) {
    if (hashtagValidate(modifyArrHashTag(value)[i])) {
      return true;
    }
    return false;
  }
}, 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д', false);

pristine.addValidator(inputHashtags, function(value) {
  for (let i = 0; i < modifyArrHashTag(value).length; i++) {
    if (modifyArrHashTag(value)[i].startsWith('#')) {
      return true;
    }
    return false;
  }
}, 'Хештег должен начинаться с #', false);

pristine.addValidator(inputHashtags, function(value) {
  for (let i = 0; i< modifyArrHashTag(value).length; i++) {
    if (modifyArrHashTag(value)[i].length < 20) {
      return true;
    }
    return false;
  }
}, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', false);

pristine.addValidator(inputComments, function(value) {
  if (value.length < 140) {
    return true;
  }
  return false;
}, 'Макс длина комментария 140 символов');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
}


function  setUserFormSubmit(onSuccess) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


export {formElement};
export {setUserFormSubmit};
