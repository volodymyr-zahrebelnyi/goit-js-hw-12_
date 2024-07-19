const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44794510-78ac4561676a1628ffedd5f1c';

export function getPicturesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${searchParams}`).then(res => {
    console.log(res);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
