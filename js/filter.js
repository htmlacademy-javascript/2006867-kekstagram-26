import { createRandomIdFromRangeGenerator } from './util.js';
import { dataFromServer} from './main.js';
import { init } from './bigpicture.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;


function filter() {
  const filterElement = document.querySelector('.img-filters');
  const filterDefaultElement = document.querySelector('#filter-default');
  const filterRandomElement = document.querySelector('#filter-random');
  const filterDiscussedElement = document.querySelector('#filter-discussed');


  function openFilter() {
    filterElement.classList.remove('img-filters--inactive');
  }

  openFilter();

  const newIdOfRandomPublications = createRandomIdFromRangeGenerator(0, dataFromServer.length-1, 10);

  function renderRandomPublications() {
    const newRandomListOfPublications = [];
    for (let i = 0; i < 10; i++) {
      newRandomListOfPublications.push(dataFromServer[newIdOfRandomPublications[i]]);
    }
    return newRandomListOfPublications;
  }

  const ListOfRandomPublications = renderRandomPublications();


  function onRandomFilter() {
    const pictures = document.querySelector('.pictures');
    const picturesElements = pictures.querySelectorAll('a');
    const templateFragment = document.querySelector('#picture').content;
    const template = templateFragment.querySelector('a');
    filterDefaultElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.remove('img-filters__button--active');
    filterRandomElement.classList.add('img-filters__button--active');
    picturesElements.forEach(item => item.remove());
    const fragment = document.createDocumentFragment();
    ListOfRandomPublications.forEach(item => {
      const element = template.cloneNode(true);
      element.querySelector('.picture__img').src=item.url;
      element.querySelector('.picture__likes').textContent=item.likes;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      fragment.appendChild(element);
    });
    pictures.appendChild(fragment);
  }

  filterRandomElement.addEventListener('click', onRandomFilter);
  filterRandomElement.addEventListener('click', init);

  const ListOfDisccussedPublications = dataFromServer.sort((a, b) => {
    return a.likes - b.likes;
  });

  function onDiscussedFilter() {
    const pictures = document.querySelector('.pictures');
    const picturesElements = pictures.querySelectorAll('a');
    const templateFragment = document.querySelector('#picture').content;
    const template = templateFragment.querySelector('a');

    filterDefaultElement.classList.remove('img-filters__button--active');
    filterRandomElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.add('img-filters__button--active');
    picturesElements.forEach(element => element.remove());

    const fragment = document.createDocumentFragment();
    ListOfDisccussedPublications.forEach(item => {
      const element = template.cloneNode(true);
      element.querySelector('.picture__img').src=item.url;
      element.querySelector('.picture__likes').textContent=item.likes;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      fragment.appendChild(element);
    });
    pictures.appendChild(fragment);
  }

  filterDiscussedElement.addEventListener('click', onDiscussedFilter);
  filterDiscussedElement.addEventListener('click', init);

  function onDefaultFilter(){
    const pictures = document.querySelector('.pictures');
    const picturesElements = pictures.querySelectorAll('a');
    const templateFragment = document.querySelector('#picture').content;
    const template = templateFragment.querySelector('a');
    filterRandomElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.remove('img-filters__button--active');
    filterDefaultElement.classList.add('img-filters__button--active');
    picturesElements.forEach(element => element.remove());
    const fragment = document.createDocumentFragment();
    dataFromServer.forEach(item => {
      const element = template.cloneNode(true);
      element.querySelector('.picture__img').src=item.url;
      element.querySelector('.picture__likes').textContent=item.likes;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      fragment.appendChild(element);
    });
    pictures.appendChild(fragment);
  }

  filterDefaultElement.addEventListener('click', onDefaultFilter);
  filterDefaultElement.addEventListener('click', init);
}

export {filter};
