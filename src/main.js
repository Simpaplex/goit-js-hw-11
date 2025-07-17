import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery } from './js/render-functions';
import { refreshLightbox } from './js/render-functions';

const searchForm = document.querySelector('.js-form');
const listGallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  loader.classList.remove('hidden');

  const inputText = event.currentTarget.elements['search-text'];
  const clearInputText = inputText.value.trim();

  if (!clearInputText) {
    iziToast.error({
      title: 'Error',
      message: 'field must not be empty',
      position: 'center',
    });
    loader.classList.add('hidden');
    return;
  }

  listGallery.innerHTML = '';

  getImagesByQuery(clearInputText)
    .then(data => {
      if (!data.hits.length) {
        iziToast.warning({
          title: '⚠️ Warning',
          message: `Sorry, there are no images matching your "${clearInputText}". Please try again!`,
          position: 'center',
          timeout: 4000,
        });
      } else {
        listGallery.innerHTML = createGallery(data.hits);
        refreshLightbox();
      }
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `${error.message}`,
        position: 'center',
      });
    })
    .finally(() => {
      event.target.reset();
      loader.classList.add('hidden');
    });
}
