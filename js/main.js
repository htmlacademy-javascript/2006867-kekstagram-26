import { closeUserModal } from './user-form.js';
import { setUserFormSubmit } from './form-validation.js';
import {uploadInputElement} from './user-form.js';
import { formElement } from './form-validation.js';
import { createLoader } from './api.js';
import { createRandomIdFromRangeGenerator } from './util.js';
import { renderPublications } from './publications.js';
import { filter } from './filter.js';
import { init } from './bigpicture.js';
import './loadphoto.js';

const loadPictures = createLoader(renderPublications, console.error);

await loadPictures();

const dataFromServer=[];
function returnData(data) {
  for (let i=0; i < data.length; i++) {
    dataFromServer[i]=data[i];
  }
  return dataFromServer;
}

const loadData = createLoader(returnData, console.error);
await loadData();

console.log(dataFromServer);

filter();

init();

setUserFormSubmit(closeUserModal);

export {dataFromServer};


