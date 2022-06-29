const form = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputComments = document.querySelector('.text__description');
const pristine = new Pristine(form);


// Функция валидации хештегов
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
function hashtagValidate(text) {
  return re.test(text);
}

// Проверка на "один и тот же хэш-тег не может быть использован дважды"
function checkSimilarElements(arr) {
  return (new Set(arr)).size !== arr.length;
}




form.addEventListener('submit', function(evt) {
  // const isValid = pristine.validate();
  let arrHashTag = inputHashtags.value.split(' ');
  let modifiedArrHashTag = [];

  arrHashTag.forEach(function(item) {
  modifiedArrHashTag.push(item.toLowerCase());
  })

console.log(modifiedArrHashTag);
console.log(checkSimilarElements(modifiedArrHashTag));




  if ( modifiedArrHashTag.length > 5 || checkSimilarElements(modifiedArrHashTag) || inputComments.value.length>140 ) {
    console.log('Форма не валидна');
    console.log('Hi');
    evt.preventDefault();
  }
  else {
    for (let i=0; i<arrHashTag.length; i++) {
      if (hashtagValidate(modifiedArrHashTag[i]) || inputHashtags.value === ' ')  {
        console.log('Можно отправлять');
      } else {
        console.log('Форма невалидна!');
        evt.preventDefault();
      }
    }
  }
  }
  );



export {form};
