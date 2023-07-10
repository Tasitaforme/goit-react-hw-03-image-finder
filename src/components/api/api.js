import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36843872-65902b25927b03564c5702eca';

export const getGalleryImages = async (name, currentPage, imagePerPage) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: imagePerPage,
    page: currentPage,
  });
  const { data } = await axios.get(`${URL}?${params}`);
  return data;
};