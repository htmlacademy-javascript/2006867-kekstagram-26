import { onCloseUserModal } from './user-form.js';
import { setUserFormSubmit } from './form-validation.js';
import { createLoader } from './api.js';
import { renderPublications } from './publications.js';
import { filter } from './filter.js';
import { init } from './bigpicture.js';
import './loadphoto.js';

const loadPictures = createLoader(renderPublications, console.error);

loadPictures();

const dataFromServer=[];
function returnData(data) {
  for (let i=0; i < data.length; i++) {
    dataFromServer[i]=data[i];
  }
  return dataFromServer;
}

const loadData = createLoader(returnData, console.error);
await loadData();

filter();

init();

setUserFormSubmit(onCloseUserModal);

setUserFormSubmit()

export {dataFromServer};


