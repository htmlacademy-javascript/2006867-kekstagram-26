import { createRandomIdFromRangeGenerator } from './util.js';
import { debounce } from './util.js';
import { renderPublications } from './publications.js';

const RERENDER_DELAY = 500;
const COUNT_OF_RANDOM = 10;

function renderFilteredPublications(arr) {
  const pictures = document.querySelector('.pictures');
  const picturesElements = pictures.querySelectorAll('a');
  picturesElements.forEach((element) => element.remove());
  renderPublications(arr);
}

function filter(dataFromServer) {
  const filterElement = document.querySelector('.img-filters');
  const filterDefaultElement = document.querySelector('#filter-default');
  const filterRandomElement = document.querySelector('#filter-random');
  const filterDiscussedElement = document.querySelector('#filter-discussed');

  function openFilter() {
    filterElement.classList.remove('img-filters--inactive');
  }

  openFilter();

  function onDefaultFilter(){
    renderFilteredPublications(dataFromServer);
  }

  const setDefaultFilter = (cb) => {
    filterDefaultElement.addEventListener('click', (evt) => {
      evt.target.classList.add('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      cb();
    });
  };

  setDefaultFilter(debounce( () => onDefaultFilter(), RERENDER_DELAY));


  function onRandomFilter() {
    const newIdOfRandomPublications = createRandomIdFromRangeGenerator(0, dataFromServer.length-1, COUNT_OF_RANDOM);
    function renderRandomPublications() {
      const newRandomListOfPublications = [];
      for (let i = 0; i < COUNT_OF_RANDOM; i++) {
        newRandomListOfPublications.push(dataFromServer[newIdOfRandomPublications[i]]);
      }
      return newRandomListOfPublications;
    }
    const ListOfRandomPublications = renderRandomPublications();
    renderFilteredPublications(ListOfRandomPublications);
  }

  const setRandomFilter = (cb) => {
    filterRandomElement.addEventListener('click', (evt) => {
      evt.target.classList.add('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
      filterDiscussedElement.classList.remove('img-filters__button--active');
      cb();
    });
  };

  setRandomFilter(debounce(() => onRandomFilter(), RERENDER_DELAY));


  const clonedDataFromServer = dataFromServer.slice(0);
  const ListOfDisccussedPublications = clonedDataFromServer.sort((a, b) =>
    b.likes - a.likes
  );

  function onDiscussedFilter() {
    renderFilteredPublications(ListOfDisccussedPublications);
  }

  const setDiscussedFilter = (cb) => {
    filterDiscussedElement.addEventListener('click', (evt) => {
      evt.target.classList.add('img-filters__button--active');
      filterDefaultElement.classList.remove('img-filters__button--active');
      filterRandomElement.classList.remove('img-filters__button--active');
      cb();
    });
  };

  setDiscussedFilter(debounce(() => onDiscussedFilter(), RERENDER_DELAY));
}

export {filter};
