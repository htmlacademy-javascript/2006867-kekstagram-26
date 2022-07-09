import { createRandomIdFromRangeGenerator } from './util.js';
import { dataFromServer} from './main.js';


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
  console.log(ListOfRandomPublications);



  function onRandomFilter() {
    const pictures = document.querySelector('.pictures');
    const picturesElements = pictures.querySelectorAll('a');
    const templateFragment = document.querySelector('#picture').content;
    const template = templateFragment.querySelector('a');
    filterDefaultElement.classList.remove('img-filters__button--active');
    filterDiscussedElement.classList.remove('img-filters__button--active');
    filterRandomElement.classList.add('img-filters__button--active');
    picturesElements.forEach(element => element.remove());
    const fragment = document.createDocumentFragment();
    ListOfRandomPublications.forEach(item => {
      const element = template.cloneNode(true);
      element.querySelector('.picture__img').src=item.url;
      element.querySelector('.picture__likes').textContent=item.likes;
      element.querySelector('.picture__comments').textContent = item.comments.length;
      fragment.appendChild(element);
    });
      pictures.appendChild(fragment);
      // filterDefaultElement.removeEventListener('click', onDefaultFilter);
      // filterDiscussedElement.removeEventListener('click', onDiscussedFilter);
    }

  filterRandomElement.addEventListener('click', onRandomFilter);

  const ListOfDisccussedPublications = dataFromServer.sort(function (a, b) {
    return a.likes - b.likes;
  });

  console.log(ListOfDisccussedPublications);

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
    // filterDefaultElement.removeEventListener('click', onDefaultFilter);
    // filterRandomElement.removeEventListener('click', onRandomFilter);
  }

  filterDiscussedElement.addEventListener('click', onDiscussedFilter);

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
    // filterDiscussedElement.removeEventListener('click', onDiscussedFilter);
    // filterRandomElement.removeEventListener('click', onRandomFilter);
  }

  filterDefaultElement.addEventListener('click', onDefaultFilter);
}




export {filter};
