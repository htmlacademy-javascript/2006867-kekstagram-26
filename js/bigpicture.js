import {findElement, isEscapeKey} from './util.js';

let countOfComments = 5;


const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const socialItem = document.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');

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
      console.log(objectsOfComments);
      const numberOfComments = objectsOfComments.length;
      console.log(numberOfComments);
      if (numberOfComments < 5) {
        commentCount.childNodes[0].textContent= `${numberOfComments} из `;
      }
      bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
      bigPicture.querySelector('.social__caption').textContent = descriptionOfPicture ;
      socialComments.innerHTML = '';
      console.log(socialComments);
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
console.log(newListOfComments);


function showComments(arr) {
  createCommentsList(arr, socialItem, socialComments);
  const listofComments = bigPicture.querySelectorAll('.social__comment');
  if ( arr.length > 5 ) {
    for ( let i = 5; i < arr.length; i++ ) {
      listofComments[i].classList.add('hidden');
    }
  }
  else {
    commentsLoader.classList.add('hidden');
  }
}


function showRestComments(arr) {
  countOfComments += 5;
  const listofComments = bigPicture.querySelectorAll('.social__comment');
  if (countOfComments < arr.length) {
    for (let i = 0; i < countOfComments; i++) {
      listofComments[i].classList.remove('hidden');
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      listofComments[i].classList.remove('hidden');
      commentsLoader.classList.add('hidden');
    }
  }
}


function oncloseBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

closeButton.addEventListener('click', oncloseBigPicture );


export {renderFullSize};
