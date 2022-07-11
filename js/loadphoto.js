const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const previewElement = document.querySelector('.img-upload__preview');
const preview = previewElement.querySelector('img');

console.log(preview);

fileChooser.addEventListener('change', function() {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});
