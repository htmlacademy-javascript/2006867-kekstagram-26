import {findElement, isEscapeKey} from './util.js';

let countOfComments = 5;


const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const socialItem = document.querySelector('.social_comment');
const socialComments = bigPicture.querySelector('.social__comments');




function onBigPictureEscKeydown() {
  if (isEscapeKey) {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  }
}

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function renderFullSize(elem) {
  const pictures = document.querySelector('.pictures');
  const allpictures =pictures.querySelectorAll('a');

  const commentCount = bigPicture.querySelector('.social__comment-count ');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  for (const picture of allpictures) {
    picture.addEventListener('click', openBigPicture);
    picture.addEventListener('click', () => {
      bigPicture.querySelector('img').src = picture.querySelector('.picture__img').src;
      const picId = +picture.dataset.id;
      console.log(picId);
      bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = picture.querySelector('.picture__comments').textContent;
      const descriptionOfPicture = findElement(elem, picId, 'description');
      const objectsOfComments = findElement(elem, picId, 'comments');
      const numberOfComments = objectsOfComments.length;
      if (numberOfComments < 5) {
        commentCount.childNodes[0].textContent= `${numberOfComments} из `;
      }
      bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
      bigPicture.querySelector('.social__caption').textContent = descriptionOfPicture ;
      socialComments.innerHTML = '';
      showComments(objectsOfComments);
      commentsLoader.addEventListener('click', () => showRestComments(objectsOfComments));
    });
  }
}

function createCommentsList(arr, item, root) {
  for (let i = 0; i < arr.length; i++) {
    const commentElem = item.cloneNode(true);
    const socialPic = commentElem.querySelector('.social__picture');
    socialPic.src = arr[i].avatar;
    socialPic.alt = arr[i].name;
    const socialText = commentElem.querySelector('.social__text');
    socialText.textContent = arr[i].message;
    root.appendChild(commentElem);
  }
}

const newListOfComments = document.querySelectorAll('.social__comment');
function showComments(arr) {
  createCommentsList(arr, socialItem, socialComments);
  if ( newListOfComments.length > 5 ) {
    for ( let i = 5; i < newListOfComments.length; i++ ) {
      newListOfComments[i].classList.add('hidden');
    }
  }
  else {
    commentsLoader.classList.add('hidden');
  }
}


function showRestComments() {
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


export {renderFullSize};
