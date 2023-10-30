import axios from "axios"
import { makeMarkup , fetchToData} from "./respons"
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const el = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more')
}


const API = "https://pixabay.com/api/";
const KEY = "key=40269425-bc1c5bc659d3defa30c23ed22";
let page = 1
const perPage = 40
let totalHits = 460

var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

el.form.addEventListener('submit', async (e) => {
e.preventDefault()

const inquiry = el.form.searchQuery.value


try {
  const response = await fetchToData(inquiry)
  console.log(response)
  if (response.total === 0) {
 throw new Error('NO')
  }
  el.btnLoadMore.classList.remove('js-hiden')
  console.log(makeMarkup(response));
el.gallery.innerHTML = makeMarkup(response)
} catch (error) {
  console.error(error);
}

lightbox.refresh()
})

el.btnLoadMore.addEventListener("click", async (e) => {
e.preventDefault()
console.log("click");
el.btnLoadMore.classList.add('js-hiden')
const inquiry = el.form.searchQuery.value
totalHits -= perPage

if (totalHits < perPage) {
  const response = await fetchToData(inquiry, totalHits)
  console.log(response);
  el.btnLoadMore.classList.remove('js-hiden')
  console.log(totalHits, perPage);
  el.gallery.insertAdjacentHTML("beforeend", makeMarkup(response))
  el.btnLoadMore.classList.add('js-hiden')
} else {
  const response = await fetchToData(inquiry, perPage)
console.log(response);
el.btnLoadMore.classList.remove('js-hiden')
console.log(totalHits, perPage);
el.gallery.insertAdjacentHTML("beforeend", makeMarkup(response))
}

lightbox.refresh()

})

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




// el.btnLoadMore.addEventListener("click", async (e) => {
//   e.preventDefault()
//   console.log("click");
//   el.btnLoadMore.classList.add('js-hiden')
//   const inquiry = el.form.searchQuery.value
//   totalHits -= perPage
//   const response = await fetchToData(inquiry, perPage)
//   console.log(response);
//   el.btnLoadMore.classList.remove('js-hiden')
//   console.log(totalHits, perPage);
//   el.gallery.insertAdjacentHTML("beforeend", makeMarkup(response))
  
//   if (totalHits < perPage) {
  
//     el.btnLoadMore.classList.add('js-hiden')
//   }
//   })



