//Intersection Observer
const options = {
  //   rootMargin: "100px",
  threshold: [0, 0.25, 0.5, 0.75, 1],
};
// 1. Создали Class
const io = new IntersectionObserver((entries, observer) => {
  // entries - массив все вхождений и пересечений (это спец.объекты, которые хранят информацию о том, как они пересекают root);
  // observer - ссылка на экземпляр, то что он вернет (например, если нужно остановить слежение). У него 2 метода: unobserve  и disconnect;
  // options -набор опций (root (viewport); rootMargin; threshold (порог вхождения) от 0 до 1 (удобно использовать для анимации), ключ intersectionRatio для вешения событий;)
  entries.forEach((entry) => {
    //   entry - наше пересечение;
    console.log(entry);
    //   проверяем, если элемент entry сейчас пересекает (ключ: isIntersecting = true), то в entry.target. передается ссылка на него
    if (entry.isIntersecting) {
      console.log(`Box ${entry.target.textContent} пересекает Root`);

      // observer disconnect как отключить навсегда после первого выполнения условия;
      // observer unconnect (за теми, которые еще не пересекли root, продолжает наблюдать, как только пересекли = наблюдение прекращается)
      observer.disconnect();
    }
  });
}, options);

// 2.
const boxRef = document.querySelector(".js-box"); // .js-box - это наш target (div3);

// 3. передаем ссылку на элемент boxRef, за которым будем наблюдать (boxRef)
io.observe(boxRef);

// Когда .js-box - это наш target (div3) будет пересекать root будет выполняться callback функция - (entries, observer).
