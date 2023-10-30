import axios from "axios"

let page = 1
let totalHits = 460
const API = "https://pixabay.com/api/";
const KEY = "key=40269425-bc1c5bc659d3defa30c23ed22";
export async function fetchToData(q, page) {

  try {
    const response = await axios.get(
      `${API}?${KEY}&q=${q}&image_type=photo&per_page=40&page=${page}&orientation=horizontal&safesearch=true`
    );
    const data = await response.data
    return data
  } catch (error) {
    return error;
  }
}
    
   export function makeMarkup(card) {
      const { hits } = card
      page+=1
      console.log(hits);
      markup =  hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a class="link" href="${largeImageURL}">
          <img class="photo" src="${webformatURL}" alt="${tags}" data-source="${largeImageURL}"  loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
        </a>
        </div>`
}).join("")
    return markup
    }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
