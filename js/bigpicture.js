import {findElement} from './util.js';
import {dataFromServer} from './main.js';

function init() {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = document.querySelector('.big-picture__cancel');
  const pictures = document.querySelector('.pictures');
  const allpictures =pictures.querySelectorAll('a');
  const commentsList = bigPicture.querySelector('.social__comments');
  const commentsElement = commentsList.querySelectorAll('.social__comment');
  const commentCount = bigPicture.querySelector('.social__comment-count ');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  const fragment = document.createDocumentFragment();

  function onBigPictureEscKeydown(evt) {
    if (evt.key ==='Escape') {
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }}

  function openBigPicture() {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscKeydown);
  }


  for (const picture of allpictures) {
    picture.addEventListener('click', openBigPicture);
    picture.addEventListener('click', () => {
      bigPicture.querySelector('img').src = picture.querySelector('.picture__img').src;
      const pictureSrc =  picture.querySelector('.picture__img').src;
      let picId = '';
      if (pictureSrc.length===34) {
        picId += pictureSrc[pictureSrc.length-5];
      }
      else {
        picId += pictureSrc[pictureSrc.length-6];
        picId += pictureSrc[pictureSrc.length-5];
      }
      bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;

      const descriptionOfPicture = findElement(dataFromServer, `photos/${picId}.jpg`, 'description');
      const objectsOfComments = findElement(dataFromServer, `photos/${picId}.jpg`, 'comments');
      const numberOfComments = objectsOfComments.length;
      if (numberOfComments < 5) {
        commentCount.childNodes[0].textContent= `${numberOfComments} из `;
      }

      bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
      bigPicture.querySelector('.social__caption').textContent = descriptionOfPicture ;
      commentsElement[1].remove();
      objectsOfComments.forEach((item) => {
        const element = commentsElement[0].cloneNode(true);
        element.querySelector('.social__picture').src=item.avatar;
        element.querySelector('.social__picture').alt=item.name;
        element.querySelector('.social__text').textContent = item.message;
        fragment.appendChild(element);
      });
      commentsList.appendChild(fragment);
      commentsElement[0].remove();

      // Реализуем показ только 5ти комментариев на странице
      const newListOfComments = document.querySelectorAll('.social__comment');
      if ( newListOfComments.length > 5 ) {
        for ( let i = 5; i < newListOfComments.length; i++ ) {
          newListOfComments[i].classList.add('hidden');
        }
      }
      else {
        commentsLoader.classList.add('hidden');
      }

      // Реализуем добавление комментариев при нажатии "Загрузить еще"
      let countOfComments = 5;
      commentsLoader.addEventListener('click', () => {
        countOfComments += 5;
        if (countOfComments < newListOfComments.length) {
          for (let i = 0; i < countOfComments; i++) {
            newListOfComments[i].classList.remove('hidden');
          }
        } else {
          for (let i = 0; i < newListOfComments.length; i++) {
            newListOfComments[i].classList.remove('hidden');
            commentsLoader.classList.add('hidden');
          }
        }
      });
    }
    );
  }

  function oncloseBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscKeydown);
    const updatedListofComments = document.querySelectorAll('.social__comment');
    for (let i = 2; i < updatedListofComments.length; i++) {
      updatedListofComments[i].remove();
    }
  }

  closeButton.addEventListener('click', oncloseBigPicture );
}

// удалить комментарии при закрытии!!!!
export {init};
