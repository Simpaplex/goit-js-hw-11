import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51361709-3ae7eddc83ad637b7c3fc8345';

export function getImagesByQuery(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });

  return axios
    .get(`${BASE_URL}?${params}`)
    .then(res => res.data)
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Failed to retrieve image. Please try again later.`,
        position: 'topRight',
        timeout: 4000,
      });
      return { hits: [] };
    });
}
