import axios from 'axios';

const API_KEY = '48892292-adf57a8bf9903d599c085e6e7';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return { hits: [], totalHits: 0 };
  }
}
