// Задание
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.

// Разбей задание на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.

// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img, и указываться в href ссылки (это необходимо для доступности).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.
// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Дополнительно. Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// 7. Закрытие модального окна по клику на div.lightbox__overlay.
// 8. Закрытие модального окна по нажатию клавиши ESC.
// 9. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// для задания 9 глобально объявляем переменную
// let index = 0;

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
import gallery from "./gallery.js";
// console.table(gallery);

// Рендеринг кода
// ПОИСК

// 1.1. поиск и вывод родительского элемента для li(в даной задаче <ul class="gallery js-gallery"></ul>)
const galleryRef = document.querySelector(".js-gallery"); //1

// 2.1. выводим class="lightbox__image" для модалки, куда будем вставлять большое изображение
const modalImg = document.querySelector(".lightbox__image");

// 3.1. Открытие модального окна по клику на элементе галереи.
const openModal = document.querySelector(".lightbox");

// 5.1. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);

//  7.1. Закрытие модального окна по клику на div.lightbox__overlay.
const overlayRef = document.querySelector(".lightbox__overlay");

// СЛУШАТЕЛИ СОБЫТИЙ
// 2.2. вешаем слушателя событий на родителя li - это ul const galleryRef
const onGalleryClick = galleryRef.addEventListener(
  "click",
  handlerGalleryClick
);

// 5.2. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
closeModalBtn.addEventListener("click", onCloseModal);

// 7.2. Закрытие модального окна по клику на div.lightbox__overlay.
overlayRef.addEventListener("click", onOverlayClick);
// console.log(overlayRef);

// ФУНКЦИИ
// 1.2. Создание и рендер разметки по массиву данных и предоставленному шаблону. Добавляем параметр index - для задания 9
const createGallery = (picture, index) => {
  // создаем (<li class="gallery__item">)
  const listOfGalleryRef = document.createElement("li");
  listOfGalleryRef.classList.add('gallery__item"');
  // console.log(listOfGalleryRef);

  // создаем <a с  class="gallery__link" и атрибутом href>
  const linkOfGalleryRef = document.createElement("a");
  linkOfGalleryRef.classList.add("gallery__link");
  linkOfGalleryRef.href = picture.original;

  // создаем <img с class, src, data-source, alt
  const imageOfGalleryRef = document.createElement("img");
  // console.log(imageOfGalleryRef);

  imageOfGalleryRef.classList.add("gallery__image");
  imageOfGalleryRef.src = picture.preview;
  imageOfGalleryRef.dataset.source = picture.original;
  imageOfGalleryRef.alt = picture.description;

  // для задания 9 добавляем data-index
  imageOfGalleryRef.dataset.index = index;
  // console.log(imageOfGalleryRef);
  // console.log(index);

  // вставка img в a
  linkOfGalleryRef.appendChild(imageOfGalleryRef);

  // вставка a&img в li
  listOfGalleryRef.appendChild(linkOfGalleryRef);

  return listOfGalleryRef;
};

// 1.3. выводим map
const galleryCard = gallery.map((picture, index) =>
  createGallery(picture, index)
);
// console.log(galleryCard);

//1.4. вставка и распыление в DOM
galleryRef.append(...galleryCard);

// 2.3. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
function handlerGalleryClick(event) {
  event.preventDefault();
  // console.log(event.target.nodeName);

  if (event.target.nodeName !== "IMG") {
    return;
  }
  // для упрощения кода введем новую переменную imageRef для event.target
  const imageRef = event.target;
  // console.log(imageRef);

  // еще одну originalImgURL для event.target.dataset.source
  const originalImgURL = imageRef.dataset.source;
  // console.log(originalImgURL);

  // еще одну для event.target.alt
  const imageAlt = imageRef.alt;
  // console.log(imageAlt);

  // 9. для currentIndex при пролистывании фотографий в модальном окне
  const currentIndex = imageRef.dataset.index;
  // console.log(currentIndex);

  // + 3. Открытие модального окна по клику на элементе галереи
  openModalImage(originalImgURL, imageAlt, currentIndex);
}

// 3. ОТКРЫТИЕ модального окна по клику на элементе галереи
function openModalImage(url, alt, idx) {
  // 4. Подмена значения атрибута src элемента img.lightbox__image.
  modalImg.src = url;
  modalImg.alt = alt;
  modalImg.dataset.index = idx;

  // console.log(modalImg);

  // Добавляем class "is-open" по клику на элементе галереи. Модальное окно открывается с большой картинкой.
  openModal.classList.add("is-open");

  // 8. Для закрытие модального окна по нажатию клавиши ESC - сначала вешаем слушателя события.
  window.addEventListener("keydown", onPressEscape);

  // 9. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо" - сначала вешаем слушателя события.
  window.addEventListener("keyup", onScrollingModalImg);
  // console.log(openModal);
}

// 5.3.ЗАКРЫТИЕ модального окна по клику на кнопку button[data-action="close-lightbox"]
function onCloseModal() {
  openModal.classList.remove("is-open");

  // 6. Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  modalImg.src = "";
  modalImg.alt = "";
  modalImg.dataset.index = "";

  index = 0;
  scrollIndex = 0;

  // console.log(modalImg);

  // 8.  При закрытии модального окна по нажатию клавиши ESC - удаляем слушателя события.
  window.removeEventListener("keydown", onPressEscape);

  // 9. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо" - удаляем слушателя события после закрытия модального окна.

  window.removeEventListener("keyup", onScrollingModalImg);
  // console.log(openModal);
}

// Дополнительно

// 7.3.Закрытие модального окна по клику на div.lightbox__overlay.
function onOverlayClick(event) {
  // console.log(event.target);
  // console.log(event.currentTarget);

  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

// 8.1. Закрытие модального окна по нажатию клавиши ESC.
function onPressEscape(event) {
  // console.log(event);
  // console.log(event.key);
  // console.log(event.code);

  if (event.code === "Escape") {
    onCloseModal();
  }
}

// 9.2. Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

// Решение когда пролистывание начинается с крайних элементов
let index = 0;
let scrollIndex = 0;

function onScrollingModalImg(event) {
  // console.dir(event.target);
  // console.log(event.key);
  // console.log(event.code);

  // console.log(modalImg);
  // console.log(modalImg.src);

  // console.dir(gallery);
  // console.log(gallery.length);

  if (event.code === "ArrowRight") {
    if (scrollIndex === 0) {
      index = 0;
      scrollIndex = 1;
    } else {
      index += 1;
      if (index === gallery.length) {
        index = 0;
      }
    }
    modalImg.src = gallery[index].original;
  }

  if (event.code === "ArrowLeft") {
    if (scrollIndex === 0) {
      index = gallery.length - 1;
      scrollIndex = 1;
    } else {
      index -= 1;
      if (index === -1) {
        index = gallery.length - 1;
      }
    }
    modalImg.src = gallery[index].original;
  }
}

// ++++ Решение, когда пролистывание начинается с соседнего элемента
// let currentIndex = 0;
// function onScrollingModalImg(event) {
//   // console.log(event);
//   // console.log(event.key);
//   // console.log(event.code);

//   // console.log(modalImg);
//   // console.log(modalImg.src);
//   // console.log(currentIndex);
//   // console.log(gallery.length);

//   if (event.code === "ArrowRight") {
//     currentIndex += 1;
//     if (currentIndex === gallery.length) {
//       currentIndex = 0;
//     }
//   } else if (event.code === "ArrowLeft") {
//     currentIndex -= 1;
//     if (currentIndex < 0) {
//       currentIndex = gallery.length - 1;
//     }
//   }
//   modalImg.src = gallery[currentIndex].original;
// }
