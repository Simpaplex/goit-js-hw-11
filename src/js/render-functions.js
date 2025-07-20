import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

let lightbox = null;

export function createGallery(images) {
  clearGallery();
  const markup = images
    .map(({ largeImageURL, webformatURL, tags, ...rest }) => {
      const infoItems = ['Likes', 'Views', 'Comments', 'Downloads']
        .map(
          item => `
            <li class="images-info-item">
              <h3 class="images-info-subtitle">${item}</h3>
              <p class="images-info-value">${rest[item.toLowerCase()]}</p>
            </li>`
        )
        .join('');
return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <ul class="images-info-list">${infoItems}</ul>
          </a>
        </li>`;
    })
    .join('');
  galleryList.innerHTML = markup;
  refreshLightbox();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: false,
      captionDelay: 500,
      doubleTapZoom: 1.2,
      maxZoom: 4,
      disableScroll: true,
    });
  }
}
