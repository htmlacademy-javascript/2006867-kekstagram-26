import {Post} from './data.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');

const fragment = document.createDocumentFragment();

Post.forEach((item) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src=item.url;
  element.querySelector('.picture__likes').textContent=item.likes;
  element.querySelector('.picture__comments').textContent = item.comments.length;
  fragment.appendChild(element);
});
pictures.appendChild(fragment);

export {pictures}
