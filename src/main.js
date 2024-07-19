import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPicturesByQuery } from './js/pixabay-api.js';
import {
  createMarkup,
  initializeLightbox,
  showLoader,
  hideLoader,
  onFetchError,
} from './js/render-functions.js';

const gallery = document.querySelector('.js-gallery');
const searchForm = document.querySelector('.js-search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const queryValue = form.elements.query.value.trim().toLowerCase();

  if (!queryValue) {
    onFetchError();
    return;
  }
  showLoader();

  getPicturesByQuery(queryValue)
    .then(data => {
      if (!data.hits.length) {
        onFetchError();
        return;
      }
      gallery.innerHTML = createMarkup(data.hits);

      initializeLightbox();
    })
    .catch(onFetchError)
    .finally(() => {
      hideLoader();
      form.reset();
    });
}
