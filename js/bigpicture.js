import { pictures } from './publications.js';
import {Post} from './data.js';
import { findElement } from './util.js';


const bigPicture = document.querySelector('.big-picture ');
const closeButton = document.querySelector('.big-picture__cancel');
const allpictures = pictures.querySelectorAll('.picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsElement = commentsList.querySelectorAll('.social__comment');
const commentCount = bigPicture.querySelector('.social__comment-count ');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const fragment = document.createDocumentFragment();
console.log(commentCount.childNodes[0]);


for (const picture of allpictures) {
  picture.addEventListener('click', function () {
    document.body.classList.add('modal-open');
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
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;

    // const PictureId = Post.find(item => item.url === `photos/${picId}.jpg`).description;
    const PictureId = findElement(Post, `photos/${picId}.jpg`, 'description');
    const objectsOfComments = findElement(Post, `photos/${picId}.jpg`, 'comments');
console.log(objectsOfComments);
    const numberOfComments = objectsOfComments.length;
    if (numberOfComments < 5) {
      console.log('yes')
      console.log(commentCount.childNodes[0].textContent= `${numberOfComments} из `);
    }


    bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
    bigPicture.querySelector('.social__caption').textContent = PictureId;
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
    console.log(newListOfComments);
    if ( newListOfComments.length > 5 ) {
      for ( let i = 5; i < newListOfComments.length; i++ ) {
      newListOfComments[i].classList.add('hidden');
      }
    }

    // Реализуем добавление комментариев при нажатии "Загрузить еще"
    let countOfComments = 5;
    commentsLoader.addEventListener('click', function() {
      countOfComments += 5;
      if (countOfComments <= newListOfComments.length) {
        for (let i = 0; i < countOfComments; i++) {
          newListOfComments[i].classList.remove('hidden');
        }
      }
    })
  }
  );



  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  closeButton.addEventListener('click', closeBigPicture );

  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }});
}


export {bigPicture}
