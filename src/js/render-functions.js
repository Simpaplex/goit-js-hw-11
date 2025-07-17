import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = null;

export function createGallery(images) {
  return images
    .map(({ largeImageURL, webformatURL, tags, ...rest }) => {
      const infoItems = ['Likes', 'Views', 'Comments', 'Downloads']
        .map((item) => `
            <li class="images-info-item">
              <h3 class="images-info-subtitle">${item}</h3>
              <p class="images-info-value">${rest[item.toLowerCase()]}</p>
            </li>`
        )
        .join('');

      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <ul class="images-info-list">${infoItems}</ul>
          </a>
        </li>`;
    })
    .join('');
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 500,
      doubleTapZoom: 1.2,
      maxZoom: 4,
      disableScroll: true,
    });
  }
}
