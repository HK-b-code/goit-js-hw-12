import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import messageSvg from './img/error-svg-1.svg';

const searchForm = document.querySelector('#search-form');
const loader = document.querySelector('.loader');
const loadingMessage = document.querySelector('#loading-message');
const loadMoreButton = document.getElementById('load-more');
const searchButton = searchForm.querySelector('button');

let currentPage = 1;
let searchQuery = '';

const iziToastStyle = {
  messageColor: '#fafafb',
  backgroundColor: '#ef4040',
  messageSize: '16px',
  timeout: 4000,
  iconUrl: messageSvg,
  position: 'topRight',
  displayMode: 'replace',
  transitionIn: 'flipInX',
};

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function checkForMoreResults(totalHits) {
  if (totalHits <= currentPage * 40) {
    loadMoreButton.style.display = 'none';
    iziToast.info({
      ...iziToastStyle,
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    loadMoreButton.style.display = 'block';
  }
}

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  currentPage = 1;
  document.querySelector('.gallery').innerHTML = '';
  loadingMessage.style.display = 'none';
  loadMoreButton.style.display = 'none';

  if (!searchQuery) {
    iziToast.error({
      ...iziToastStyle,
      message: 'Please enter a search query!',
    });
    return;
  }

  showLoader();
  loadingMessage.style.display = 'block';
  searchButton.disabled = true;

  try {
    const { hits, totalHits } = await fetchImages(searchQuery, currentPage);
    if (hits.length === 0) {
      iziToast.error({
        ...iziToastStyle,
        message: 'Sorry, no images found. Try again.',
      });
    } else {
      renderImages(hits);
      checkForMoreResults(totalHits);
      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      ...iziToastStyle,
      message: 'Something went wrong, please try again later.',
    });
  } finally {
    hideLoader();
    loadingMessage.style.display = 'none';
    searchButton.disabled = false;
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const { hits, totalHits } = await fetchImages(searchQuery, currentPage);
    renderImages(hits);
    checkForMoreResults(totalHits);
    smoothScroll();
  } catch (error) {
    iziToast.error({
      ...iziToastStyle,
      message: 'Something went wrong, please try again later.',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  setTimeout(() => {
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  }, 100);
}
