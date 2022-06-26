import { pictures } from './publications.js';
import {Post} from './data.js';


const bigPicture = document.querySelector('.big-picture ');
const closeButton = document.querySelector('.big-picture__cancel');
const allpictures = pictures.querySelectorAll('.picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsElement = commentsList.querySelectorAll('.social__comment');
const hiddenCommentCount = bigPicture.querySelector('.social__comment-count ');
const hiddenCommentsLoader = bigPicture.querySelector('.comments-loader');
const fragment = document.createDocumentFragment();

const findElement = function(array, key, field) {
  for (let i=0; i<array.length; i++) {
    if (array[i].url===key && field==='description') {
      return array[i].description;}
    if (array[i].url===key && field ==='comments')  {
      return array[i].comments;
    }
  }
};

for (const picture of allpictures) {
  picture.addEventListener('click', function () {
    document.body.classList.add('modal-open');
    bigPicture.querySelector('img').src = picture.querySelector('.picture__img').src;
    const pictureSrc =  picture.querySelector('.picture__img').src;
    let picId = '';
    // console.log(pictureSrc.length);
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
    hiddenCommentCount.classList.add('hidden');
    hiddenCommentsLoader.classList.add('hidden');


    // const PictureId = Post.find(item => item.url === `photos/${picId}.jpg`).description;
    const PictureId = findElement(Post, `photos/${picId}.jpg`, 'description');
    // console.log(PictureId);
    const objectsOfComments = findElement(Post, `photos/${picId}.jpg`, 'comments');
    // console.log(objectsOfComments);
    bigPicture.querySelector('.comments-count').textContent = objectsOfComments.length;
    bigPicture.querySelector('.social__caption').textContent = PictureId;
    commentsElement[1].remove();
    // console.log(commentsElement[0]);
    objectsOfComments.forEach((item) => {
      const element = commentsElement[0].cloneNode(true);
      element.querySelector('.social__picture').src=item.avatar;
      element.querySelector('.social__picture').alt=item.name;
      element.querySelector('.social__text').textContent = item.message;
      fragment.appendChild(element);
    });
    commentsList.appendChild(fragment);
    commentsElement[0].remove();
  });
  closeButton.addEventListener('click', function() {
    document.body.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
  });
  document.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      document.body.classList.remove('modal-open');
      bigPicture.classList.add('hidden');
    }});
}

export {bigPicture};
