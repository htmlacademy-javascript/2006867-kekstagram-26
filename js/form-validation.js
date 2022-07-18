import { sendData } from './api.js';
import { showMessageSuccess } from './user-form.js';
import { closeMessageSuccess } from './user-form.js';
import { showMessageError } from './user-form.js';
import { closeMessageError } from './user-form.js';

const MAX_COMMENTS_LEHGTH = 140;
const MAX_HASHTAGS =5;

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
  return value.trim().toLowerCase().split(' ');
}

pristine.addValidator(inputHashtags, (value) => (modifyArrHashTag(value).length <= MAX_HASHTAGS) , 'Допускается не более пяти хэштегов ', false );
pristine.addValidator(inputHashtags, (value) => !checkSimilarElements(modifyArrHashTag(value)) , 'Хештеги должны быть разными', false);
pristine.addValidator(inputHashtags, (value) => modifyArrHashTag(value).every((item) => hashtagValidate(item)) || value === '', 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи и т. д', false);
pristine.addValidator(inputHashtags, (value) => modifyArrHashTag(value).every((item) => item.startsWith('#')) ||  value === '', 'Хештег должен начинаться с #', false);
pristine.addValidator(inputHashtags, (value) => modifyArrHashTag(value).every((item) =>item.length<20 && item.length>=2) || value === '', 'Максимальная длина одного хэш-тега 20 символов, включая решётку, минимальная-2', false);
pristine.addValidator(inputComments, (value) => value.length < MAX_COMMENTS_LEHGTH, 'Макс длина комментария 140 символов');

function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
}


function  setUserFormSubmit(onSuccess) {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showMessageSuccess();
          closeMessageSuccess();
        },
        () => {
          unblockSubmitButton();
          showMessageError();
          closeMessageError();
        },
        new FormData(evt.target),
      );
    }
  });
}


export {formElement};
export {setUserFormSubmit};
