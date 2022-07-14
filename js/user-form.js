import { formElement } from './form-validation.js';

const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const inputElement = document.querySelector('.text__hashtags');
const scaleValue = document.querySelector('.scale__control--value');
const ImageElement = document.querySelector('.img-upload__preview');
const uploadImageElement = ImageElement.querySelector('img');
const successMessageElement = document.querySelector('#success');
const errorMessageElement = document.querySelector('#error');


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
  if (evt.key === 'Escape') {
    const successMessage = document.querySelector('.success');
    successMessage.remove();
  }
}


function closeMessageSuccess() {
  const successButtonElement = document.querySelector('.success__button');
  document.addEventListener('click', onSuccesEscKeydown);
  successButtonElement.addEventListener('click', onCloseMessageSuccess);
}

function showMessageError() {
  const errorMessageTemplate = errorMessageElement.content.firstElementChild;
  errorMessageTemplate.cloneNode(true);
  document.body.append(errorMessageTemplate);
}

function onCloseMessageError() {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
}

function onErrorEscKeydown(evt) {
  if (evt.key === 'Escape') {
    const errorMessage = document.querySelector('.error');
    errorMessage.remove();
  }
}

function closeMessageError() {
  const errorButtonElement = document.querySelector('.error__button');
  document.addEventListener('click', onErrorEscKeydown);
  errorButtonElement.addEventListener('click', onCloseMessageError);
}

let numberScaleValue = '';
numberScaleValue = scaleValue.value[0] + scaleValue.value[1];
numberScaleValue = Number(numberScaleValue);

function onOpenUserModal () {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
}


uploadInputElement.addEventListener('change', onOpenUserModal);


function onCloseUserModal() {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  formElement.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function onPopupEscKeydown(evt) {
  if (evt.key === 'Escape' && document.activeElement !== inputElement) {
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


const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const effectsElement = document.querySelectorAll('.effects__radio');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
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

sliderElement.classList.add('hidden');

effectsElement[1].addEventListener('change', () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    for (let i = 1; i< 5; i++) {
      uploadImageElement.classList.remove(`effects__preview--${effectsElement[i].value}`);
    }
    uploadImageElement.classList.add(`effects__preview--${effectsElement[1].value}`);
    ImageElement.style.filter = `grayscale(${valueElement.value})`;
  });
});

effectsElement[2].addEventListener('change', () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    for (let i = 1; i< 5; i++) {
      uploadImageElement.classList.remove(`effects__preview--${effectsElement[i].value}`);
    }
    uploadImageElement.classList.add(`effects__preview--${effectsElement[2].value}`);
    ImageElement.style.filter = `sepia(${valueElement.value})`;
  });
});

effectsElement[3].addEventListener('change', () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    for (let i = 1; i< 5; i++) {
      uploadImageElement.classList.remove(`effects__preview--${effectsElement[i].value}`);
    }
    uploadImageElement.classList.add(`effects__preview--${effectsElement[3].value}`);
    uploadImageElement.style.filter = `invert(${valueElement.value}%)`;
  });
});

effectsElement[4].addEventListener('change', () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    uploadImageElement.classList.add(`effects__preview--${effectsElement[4].value}`);
    ImageElement.style.filter = `blur(${valueElement.value}px)`;
  });
});


effectsElement[5].addEventListener('change', () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    for (let i = 1; i< 5; i++) {
      uploadImageElement.classList.remove(`effects__preview--${effectsElement[i].value}`);
    }
    uploadImageElement.classList.add(`effects__preview--${effectsElement[5].value}`);
    ImageElement.style.filter = `brightness(${valueElement.value})`;
  });
});

effectsElement[0].addEventListener('change', () => {
  sliderElement.classList.add('hidden');
  for (let i = 1; i< 5; i++) {
    uploadImageElement.classList.remove(`effects__preview--${effectsElement[i].value}`);
  }
  ImageElement.style.filter = null;
});

export {uploadInputElement};
export {onOpenUserModal};
export {onCloseUserModal};
export {showMessageSuccess};
export {closeMessageSuccess};
export {showMessageError};
export {closeMessageError};
