import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');

export function createMarkup(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link js-item" href="${largeImageURL}" data-image-description="${tags}">
                <img
                    class="gallery-image"
                    src="${webformatURL}" 
                    data-source="${largeImageURL}" 
                    alt="${tags}" 
                     width="360" height="200"
                    />
                    </a>
                <div class="image-info-wrap">
                    <div class="image-info">
                        <h2 class="title">
                        Likes
                        <p class="amount">${likes}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Views
                        <p class="amount">${views}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Comments
                        <p class="amount">${comments}</p>
                        </h2>
                    </div>
                    <div class="image-info">
                        <h2 class="title">
                        Downloads
                        <p class="amount">${downloads}</p>
                        </h2>
                    </div>
                </div>
        </li>`
    )
    .join('');
}

export function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

export function onFetchError() {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
