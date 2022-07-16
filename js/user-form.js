import { formElement } from './form-validation.js';
import { isEscapeKey } from './util.js';


const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const inputElement = document.querySelector('.text__hashtags');
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
  successMessage.remove();
}

function onSuccesEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    const successMessage = document.querySelector('.success');
    successMessage.remove();
  }
}


function closeMessageSuccess() {
  const successButtonElement = document.querySelector('.success__button');
  document.addEventListener('keydown', onSuccesEscKeydown);
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
  errorMessage.remove();
}

function onErrorEscKeydown(evt) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(evt)) {
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
  if (evt.key === 'Escape' && document.activeElement !== inputElement && !errorElement) {
    document.body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
    formElement.reset();
  }
}

closeButtonElement.addEventListener('click', onCloseUserModal);


document.addEventListener('click', (e) => {
  if (e.target.classList.contains('scale__control--smaller') && numberScaleValue > 25) {
    numberScaleValue -= 25;
    scaleValue.value = `${numberScaleValue} %`;
    uploadImageElement.style.transform = `scale(${numberScaleValue*0.01})`;

  }
  else if (e.target.classList.contains('scale__control--bigger') && numberScaleValue < 100) {
    numberScaleValue += 25;
    scaleValue.value = `${numberScaleValue} %`;
    uploadImageElement.style.transform = `scale(${numberScaleValue*0.01})`;
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
      updateUISlider(0, 1, 0.1, 'grayscale');
      break;
    case effectElement.contains('effects__preview--sepia'):
      uploadImageElement.className = 'effects__preview--sepia';
      updateUISlider(0, 1, 0.1, 'sepia');
      break;
    case effectElement.contains('effects__preview--marvin'):
      uploadImageElement.className = 'effects__preview--marvin';
      updateUISlider(0, 100, 1, 'invert');
      break;
    case effectElement.contains('effects__preview--phobos'):
      uploadImageElement.className = 'effects__preview--phobos';
      updateUISlider(0, 3, 0.1, 'blur');
      break;
    case effectElement.contains('effects__preview--heat'):
      uploadImageElement.className = 'effects__preview--heat';
      updateUISlider(1, 3, 0.1, 'brightness');
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
