import {findElement, isEscapeKey} from './util.js';

let COUNT_OF_COMMENTS = 5;

const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const socialItem = document.querySelector('.social__comment');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const countOfShownCommentsElement = bigPicture.querySelector('.social__comment-count');

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

commentsLoader.addEventListener('click', showRestComments);

function renderFullSize(elem) {
  const pictures = document.querySelector('.pictures');
  const commentCount = bigPicture.querySelector('.social__comment-count ');
  pictures.addEventListener('click', (evt) => {
    if (evt.target.parentElement.getAttribute('class') === 'picture') {
      openBigPicture();
      const picture = evt.target;
      bigPicture.querySelector('img').src = picture.src;
      const picId = +picture.parentElement.dataset.id;
      bigPicture.querySelector('.likes-count').textContent = picture.parentElement.querySelector('.picture__likes').textContent;
      bigPicture.querySelector('.comments-count').textContent = picture.parentElement.querySelector('.picture__comments').textContent;
      const descriptionOfPicture = findElement(elem, picId, 'description');
      const objectsOfComments = findElement(elem, picId, 'comments');
      const numberOfComments = objectsOfComments.length;
      if (numberOfComments < COUNT_OF_COMMENTS) {
        commentCount.childNodes[0].textContent= `${numberOfComments} из `;
      }
      bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
      bigPicture.querySelector('.social__caption').textContent = descriptionOfPicture ;
      socialComments.innerHTML = '';
      showComments(objectsOfComments);
    }
  });
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

let commentsList = [];
function showComments(arr) {
  commentsList = arr;
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


function showRestComments() {
  COUNT_OF_COMMENTS += 5;
  const listofComments = bigPicture.querySelectorAll('.social__comment');
  if (COUNT_OF_COMMENTS< commentsList.length) {
    for (let i = 0; i < COUNT_OF_COMMENTS; i++) {
      listofComments[i].classList.remove('hidden');
      countOfShownCommentsElement.childNodes[0].textContent= `${COUNT_OF_COMMENTS} из `;
    }
  } else {
    for (let i = 0; i < commentsList.length; i++) {
      listofComments[i].classList.remove('hidden');
      commentsLoader.classList.add('hidden');
      countOfShownCommentsElement.childNodes[0].textContent= `${commentsList.length} из `;
    }
  }
}


function oncloseBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  countOfShownCommentsElement.childNodes[0].textContent= '5 из ';
  commentsLoader.classList.toggle('hidden');
  COUNT_OF_COMMENTS = 5;
}

closeButton.addEventListener('click', oncloseBigPicture );


export {renderFullSize};
