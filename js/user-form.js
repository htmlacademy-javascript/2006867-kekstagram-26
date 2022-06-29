const uploadFile = document.querySelector('.img-upload__input');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', function() {
  imgOverlay.classList.remove('hidden');
  console.log('Изображение загружено')
} )

closeButton.addEventListener('click', function() {
  document.body.classList.remove('modal-open');
  imgOverlay.classList.add('hidden');
  uploadFile.value = '';
})

document.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27) {
    document.body.classList.remove('modal-open');
    imgOverlay.classList.add('hidden');
  }});
export {uploadFile}
