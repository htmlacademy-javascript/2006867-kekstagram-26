import {Post} from './data.js';
import {uploadInputElement} from './user-form.js';
import { formElement } from './form-validation.js';
import { createLoader } from './load.js';
import { renderPublications } from './publications.js';
import { bigPicture } from './bigpicture.js';

const loadPictures = createLoader(renderPublications, console.error);



loadPictures();
