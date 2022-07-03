import { formElement } from './form-validation.js';

const uploadInputElement = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const inputElement = document.querySelector('.text__hashtags');
const scaleControlElement = document.querySelectorAll('.scale__control');
const scaleValue = document.querySelector('.scale__control--value');
const ImageElement = document.querySelector('.img-upload__preview');
const uploadImageElement = ImageElement.querySelector('img');

console.log(uploadImageElement);

let numberScaleValue = '';
numberScaleValue = scaleValue.value[0] + scaleValue.value[1];
numberScaleValue = Number(numberScaleValue);
console.log(typeof numberScaleValue);



uploadInputElement.addEventListener('change', function() {
  imgOverlay.classList.remove('hidden');
  console.log('Изображение загружено')
} )

closeButtonElement.addEventListener('click', function() {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  formElement.reset();

})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27 && !document.activeElement===inputElement) {
    debugger
    document.body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
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
})

export {uploadInputElement}
