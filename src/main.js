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
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const upButton = document.querySelector('.js-btn-up');
const hiddenClass = 'is-hidden';

const perPage = 15;
let query = '';
let page = 1;
let totalPages = 0;

hideLoadMoreBtn();
hideUpButton();

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
upButton.addEventListener('click', scrollToTop);

async function handleSearch(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  page = 1;

  const form = evt.currentTarget;
  query = form.elements.query.value.trim().toLowerCase();

  if (!query) {
    onFetchError();
    hideLoadMoreBtn();
    hideUpButton();
    return;
  }
  showLoader();
  hideLoadMoreBtn();
  hideUpButton();

  try {
    const data = await getPicturesByQuery(query, page);

    totalPages = Math.ceil(data.totalHits / perPage);

    // if (page === totalPages) {
    //   disableLoadMoreBtn();
    //   hideLoader();
    // } else {
    //   disableLoadMoreBtn();
    // }

    if (!data.hits.length) {
      onFetchError();
      return;
    }

    gallery.insertAdjacentHTML('afterbegin', createMarkup(data.hits));
    initializeLightbox();

    if (data.totalHits > perPage) {
      showLoadMoreBtn();
    }
  } catch {
    onFetchError();
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMoreBtnClick() {
  page += 1;
  disableLoadMoreBtn();
  showLoader();

  try {
    const data = await getPicturesByQuery(query, page);

    if (!data.hits.length) {
      onFetchError();
      hideLoadMoreBtn();
      // hideUpButton();
      return;
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    initializeLightbox();
    smoothScroll();

    if (page > 1) {
      showUpButton();
    }

    if (page === totalPages) {
      hideLoadMoreBtn();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      enableLoadMoreBtn();
    }
  } catch {
    onFetchError();
  } finally {
    hideLoader();
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add(hiddenClass);
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove(hiddenClass);
}

function disableLoadMoreBtn() {
  loadMoreBtn.disabled = true;
}

function enableLoadMoreBtn() {
  loadMoreBtn.disabled = false;
}

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function hideUpButton() {
  upButton.classList.add(hiddenClass);
}

function showUpButton() {
  upButton.classList.remove(hiddenClass);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
