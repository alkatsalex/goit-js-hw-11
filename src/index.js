// import axios from "axios"
import Notiflix from 'notiflix';
import { makeMarkup , fetchToData, perPage} from "./respons.js"
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
export let totalHits = 500

var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

el.form.addEventListener('submit', async (e) => {

e.preventDefault()
const inquiry = el.form.searchQuery.value.trim()
el.gallery.innerHTML = ""
page =1 
    totalHits = 500
try {
  const response = await fetchToData(inquiry, page, perPage)

  if (response.data.total === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  if (response.data.hits.length < 40) {
    el.btnLoadMore.classList.add('js-hiden');
    makeMarkup(response.data.hits);
    return
}
  el.btnLoadMore.classList.remove('js-hiden')

el.gallery.innerHTML = makeMarkup(response.data.hits)
Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
} catch (error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

lightbox.refresh()

})


el.btnLoadMore.addEventListener("click", async (e) => {
e.preventDefault()
el.btnLoadMore.classList.add('js-hiden')
const inquiry = el.form.searchQuery.value

page += 1

try{


if (totalHits < perPage) {
    el.btnLoadMore.classList.add('js-hiden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    page =1 
    totalHits = 500
    return
}
const res = await fetchToData(inquiry, page, perPage)

el.btnLoadMore.classList.remove('js-hiden')
el.gallery.insertAdjacentHTML("beforeend", makeMarkup(res.data.hits))

lightbox.refresh()


const { height: cardHeight } = el.gallery.firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

} catch (error) {
    el.btnLoadMore.classList.add('js-hiden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
}




})

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// if (totalHits < perPage) {
//     console.log(totalHits);
//   const response = await fetchToData(inquiry, page, totalHits)
//   console.log(response);
//   el.btnLoadMore.classList.remove('js-hiden')
//   console.log(totalHits, perPage);
//   el.gallery.insertAdjacentHTML("beforeend", makeMarkup(response))
//   el.btnLoadMore.classList.add('js-hiden')
// } else {
//   const response = await fetchToData(inquiry, page, perPage)
// el.btnLoadMore.classList.remove('js-hiden')
// console.log(totalHits, perPage);
// el.gallery.insertAdjacentHTML("beforeend", makeMarkup(res))
// }

// if (totalHits <= 0) {
//     el.btnLoadMore.classList.add('js-hiden')
// }






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



