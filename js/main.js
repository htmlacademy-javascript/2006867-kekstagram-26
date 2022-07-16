import { onCloseUserModal } from './user-form.js';
import { setUserFormSubmit } from './form-validation.js';
import { createLoader } from './api.js';
import { renderPublications } from './publications.js';
import { filter } from './filter.js';
import './loadphoto.js';

createLoader((photos) => {
  renderPublications(photos);
  filter(photos);
});

setUserFormSubmit(onCloseUserModal);
