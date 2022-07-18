import { formElement } from './form-validation.js';
import { isEscapeKey } from './util.js';

const STEP_OF_SCALE = 25;
const MIN_VALUE_OF_SCALE = 25;
const MAX_VALUE_OF_SCALE = 100;
const CONVERSION_TO_PERCENT = 0.01;
const MIN_CHROME = 0;
const MIN_SEPIA = 0;
const MIN_MARVIN = 0;
const MIN_PHOBOS = 0;
const MIN_HEAT = 1;
const MAX_CHROME = 1;
const MAX_SEPIA = 1;
const MAX_MARVIN = 100;
const MAX_PHOBOS = 3;
const MAX_HEAT = 3;
const STEP_CHROME = 0.1;
const STEP_SEPIA = 0.1;
const STEP_MARVIN = 1;
const STEP_PHOBOS= 0.1;
const STEP_HEAT= 0.1;


const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const inputElement = document.querySelector('.text__hashtags');
const inputDescriptionElement = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');
const ImageElement = document.querySelector('.img-upload__preview');
const uploadImageElement = ImageElement.querySelector('img');
const successMessageElement = document.querySelector('#success');
const errorMessageElement = document.querySelector('#error');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectElements = document.querySelector('.effects__list');


function showMessageSuccess() {
  const successMessageTemplate = successMessageElement.content.firstElementChild;
  successMessageTemplate.cloneNode(true);
  document.body.append(successMessageTemplate);
}


function onCloseMessageSuccess() {
  const successMessage = document.querySelector('.success');
  if (successMessage) {
    successMessage.remove();
  }
}

function onSuccessEscKeydown(evt) {
  const successMessage = document.querySelector('.success');
  if (isEscapeKey(evt) && successMessage) {
    successMessage.remove();
  }
}


function closeMessageSuccess() {
  const successButtonElement = document.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onCloseMessageSuccess);
  successButtonElement.addEventListener('click', onCloseMessageSuccess);
}

function showMessageError() {
  const errorMessageTemplate = errorMessageElement.content.firstElementChild;
  errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessageTemplate);
  errorMessageTemplate.style.zIndex = 5;
}

function onCloseMessageError() {
  const errorMessage = document.querySelector('.error');
  if (errorMessage) {
    errorMessage.remove();
  }

}

function onErrorEscKeydown(evt) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(evt) && errorMessage) {
    errorMessage.remove();
  }
}

function closeMessageError() {
  const errorButtonElement = document.querySelector('.error__button');
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onCloseMessageError);
  errorButtonElement.addEventListener('click', onCloseMessageError);
}

let numberScaleValue = '';
numberScaleValue = scaleValue.value[0] + scaleValue.value[1];
numberScaleValue = Number(numberScaleValue);

function onOpenUserModal () {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
  resetEffects();
}


uploadInputElement.addEventListener('change', onOpenUserModal);


function onCloseUserModal() {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  formElement.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function onPopupEscKeydown(evt) {
  const errorElement = document.querySelector('.error');
  if (evt.key === 'Escape' && document.activeElement !== inputElement && document.activeElement !== inputDescriptionElement && !errorElement) {
    document.body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
    formElement.reset();
  }
}

closeButtonElement.addEventListener('click', onCloseUserModal);


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('scale__control--smaller') && numberScaleValue > MIN_VALUE_OF_SCALE) {
    numberScaleValue -= STEP_OF_SCALE;
    scaleValue.value = `${numberScaleValue} %`;
    uploadImageElement.style.transform = `scale(${numberScaleValue*CONVERSION_TO_PERCENT})`;

  }
  else if (e.target.classList.contains('scale__control--bigger') && numberScaleValue < MAX_VALUE_OF_SCALE) {
    numberScaleValue += STEP_OF_SCALE;
    scaleValue.value = `${numberScaleValue} %`;
    uploadImageElement.style.transform = `scale(${numberScaleValue*CONVERSION_TO_PERCENT})`;
  }
});

effectElements.addEventListener('click', onEffectClick);


//Добавление эффекта к загруженной фотографии
function onEffectClick(event){
  const effectElement = event.target.classList;
  switch(true) {
    case effectElement.contains('effects__preview--none'):
      uploadImageElement.className = '';
      resetEffects();
      break;
    case effectElement.contains('effects__preview--chrome'):
      uploadImageElement.classList.add('effects__preview--chrome');
      updateUISlider(MIN_CHROME, MAX_CHROME, STEP_CHROME, 'grayscale');
      break;
    case effectElement.contains('effects__preview--sepia'):
      uploadImageElement.className = 'effects__preview--sepia';
      updateUISlider(MIN_SEPIA, MAX_SEPIA, STEP_SEPIA, 'sepia');
      break;
    case effectElement.contains('effects__preview--marvin'):
      uploadImageElement.className = 'effects__preview--marvin';
      updateUISlider(MIN_MARVIN, MAX_MARVIN, STEP_MARVIN, 'invert');
      break;
    case effectElement.contains('effects__preview--phobos'):
      uploadImageElement.className = 'effects__preview--phobos';
      updateUISlider(MIN_PHOBOS, MAX_PHOBOS, STEP_PHOBOS, 'blur');
      break;
    case effectElement.contains('effects__preview--heat'):
      uploadImageElement.className = 'effects__preview--heat';
      updateUISlider(MIN_HEAT, MAX_HEAT, STEP_HEAT, 'brightness');
      break;
  }
}

function updateUISlider(min, max, step, effect) {
  resetEffects();
  noUiSlider.create(sliderElement, {
    range: {
      min,
      max
    },
    start: max,
    step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    let measure = '';
    switch(effect){
      case 'invert': measure = '%';
        break;
      case 'blur': measure = 'px';
        break;
      default:
        break;
    }
    uploadImageElement.style.filter = `${effect}(${sliderElement.noUiSlider.get()}${measure})`;
    valueElement.value = `${effect}(${sliderElement.noUiSlider.get()}${measure})`;
  });
}

function resetEffects() {
  uploadImageElement.style.filter = 'none';
  if(sliderElement.noUiSlider !== undefined){
    sliderElement.noUiSlider.destroy();
  }
}

export {uploadInputElement};
export {onOpenUserModal};
export {onCloseUserModal};
export {showMessageSuccess};
export {closeMessageSuccess};
export {showMessageError};
export {closeMessageError};
