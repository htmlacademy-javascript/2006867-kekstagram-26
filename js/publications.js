import {createLoader} from './api.js';
import { createRandomIdFromRangeGenerator } from './util.js';

const pictures = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture').content;
const template = templateFragment.querySelector('a');
const fragment = document.createDocumentFragment();
const filterElement = document.querySelector('.img-filters');
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterdiscussedElement = document.querySelector('#filter-discussed');


function renderPublications(items) {
items.forEach((item) => {
  const element = template.cloneNode(true);
  element.querySelector('.picture__img').src=item.url;
  element.querySelector('.picture__likes').textContent=item.likes;
  element.querySelector('.picture__comments').textContent = item.comments.length;
  fragment.appendChild(element);
});
return pictures.appendChild(fragment);
}


function openFilter() {
  filterElement.classList.remove('img-filters--inactive');
}


function renderRandomPublications() {
  filterRandomElement.classList.add('img-filters__button--active');

}



export {pictures};
export {renderPublications};
export {openFilter};

