import axios from 'axios';


const URL = 'https://pixabay.com/api/';
const API_KEY = '36843872-65902b25927b03564c5702eca';
// const imagePerPage = 12;

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


// axios.defaults.baseURL = 'https://pixabay.com/api/';

//https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12


// export const getAllUsers = async () => {
//   const { data } = await axios('users');
//   return data;
// };

// export const getUsersBySearch = async query => {
//   const { data } = await axios(`users?name=${query}`);
//   return data;
// };