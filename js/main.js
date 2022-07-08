import { closeUserModal } from './user-form.js';
import { setUserFormSubmit } from './form-validation.js';
import {uploadInputElement} from './user-form.js';
import { formElement } from './form-validation.js';
import { createLoader } from './api.js';
import { renderPublications } from './publications.js';
import { init } from './bigpicture.js';



const loadPictures = createLoader(renderPublications, console.error);
await loadPictures();

init();

setUserFormSubmit(closeUserModal);


