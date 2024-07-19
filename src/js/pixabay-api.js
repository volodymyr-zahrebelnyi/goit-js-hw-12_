import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '44794510-78ac4561676a1628ffedd5f1c';

export async function getPicturesByQuery(query, page = 1) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: 15,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    return (await axios.get(`?${searchParams}`)).data;
  } catch (error) {
    throw new Error(response.status);
  }
}
