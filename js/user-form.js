import { formElement } from './form-validation.js';

const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const inputElement = document.querySelector('.text__hashtags');
const scaleValue = document.querySelector('.scale__control--value');
const ImageElement = document.querySelector('.img-upload__preview');
const uploadImageElement = ImageElement.querySelector('img');


let numberScaleValue = '';
numberScaleValue = scaleValue.value[0] + scaleValue.value[1];
numberScaleValue = Number(numberScaleValue);
console.log(typeof numberScaleValue);


uploadInputElement.addEventListener('change', function() {
  imgOverlay.classList.remove('hidden');
  console.log('Изображение загружено');
});

closeButtonElement.addEventListener('click', function() {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  formElement.reset();

});

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape' || !document.activeElement === inputElement) {
    document.body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
    console.log(document.activeElement === inputElement);
  }});

document.addEventListener('click', function(e) {
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
console.log(uploadImageElement);

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

sliderElement.setAttribute('disabled', true);

effectsElement[1].addEventListener('change', function() {
  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    ImageElement.classList.add(`effects__preview--${effectsElement[1].value}`);
    uploadImageElement.style.filter = `grayscale(${valueElement.value})`;
    console.log(uploadImageElement.style.filter);
  });
});

effectsElement[2].addEventListener('change', function() {
  sliderElement.removeAttribute('disabled');
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
    ImageElement.classList.add(`effects__preview--${effectsElement[2].value}`);
    uploadImageElement.style.filter = `sepia(${valueElement.value})`;
    console.log(uploadImageElement.style.filter);
  });
});

effectsElement[3].addEventListener('change', function() {
  sliderElement.removeAttribute('disabled');
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
    ImageElement.classList.add(`effects__preview--${effectsElement[3].value}`);
    uploadImageElement.style.filter = `invert(${valueElement.value}%)`;
  });
});

effectsElement[4].addEventListener('change', function() {
  sliderElement.removeAttribute('disabled');
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
    ImageElement.classList.add(`effects__preview--${effectsElement[4].value}`);
    uploadImageElement.style.filter = `blur(${valueElement.value}px)`;
  });
});


effectsElement[5].addEventListener('change', function() {
  sliderElement.removeAttribute('disabled');
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
    ImageElement.classList.add(`effects__preview--${effectsElement[5].value}`);
    uploadImageElement.style.filter = `brightness(${valueElement.value})`;
  });
});

effectsElement[0].addEventListener('change', function() {
  sliderElement.setAttribute('disabled', true);
});

export {uploadInputElement};
