import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  animationSpeed: 250,
  fadeSpeed: 250,
});

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      img => `
        <a href="${img.largeImageURL}" class="gallery-item">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
          <div class="info">
            <div class="info-item">
              <p class="info-title">❤️ Likes</p>
              <p class="info-value">${img.likes}</p>
            </div>
            <div class="info-item">
              <p class="info-title">👁️ Views</p>
              <p class="info-value">${img.views}</p>
            </div>
            <div class="info-item">
              <p class="info-title">💬 Comments</p>
              <p class="info-value">${img.comments}</p>
            </div>
            <div class="info-item">
              <p class="info-title">⬇️ Downloads</p>
              <p class="info-value">${img.downloads}</p>
            </div>
          </div>
        </a>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
