import "../css/index.css";
//Переменные
const newsApiKey = "d73506fc03d54bf7bfe482b2271b6f9e";

const cardGridCont = document.querySelector(".cards-grid__container");
const gridSection = document.querySelector(".cards-grid");
const searchButton = document.querySelector('.search-block__button');
const searchForm = document.forms.news;
const searchField = searchForm.elements.keyword;

const loadInfoLoader = document.querySelector(".load-info__loader");
const loadInfoFail = document.querySelector(".load-info__fail");
const loadInfoFailDescription = document.querySelector(".load-info__fail-description");


const analyticsButton = document.querySelector(".content-info__button");
const moreNewsButton = document.querySelector(".cards-grid__show-more-button");

const searchBlockContainer = document.querySelector(".search-block");

const regexOne = /(\d{1,2}\.\d{1,2}\.\d{1,4})/g;
const regexTwo = /(\d{1,2})\.(\d{1,2})\.(\d{1,4})/g;


let children = cardGridCont.childNodes;
let newsPageCounter = 1;
let howMuchLeft = 0;
let validateError;

//Общие с аналитикой переменные (TODO все 4 юзаются в аналитике)(MonthnameRussian и regexDateTransform юзается и в about)
let retrievedNewsArray = localStorage.getItem('news');
let retrievedQuery = localStorage.getItem('query');
const monthNamesRussian = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
const regexDateTransform = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g;


//Лисенеры
searchButton.addEventListener('click',validateInput);


//Функция инициализации поиска
function initializeSearch() {
  event.preventDefault();

  hideLoadError();
  showLoader();

  while (cardGridCont.firstChild) {
    hideNewsGrid();
    cardGridCont.removeChild(cardGridCont.firstChild);
  }

  const searchQuery = searchField.value;
  localStorage.setItem('query', JSON.stringify(searchField.value));

  const getNews = new Api(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${newsApiKey}&pageSize=100&from=${today}&to=${pastWeek}&language=ru`);
  getNews.getInfoFromApi()
    .then(json => {
      if (json.articles.length > 0) {
        return json;
      } else {
       return Promise.reject(json = "К сожалению по вашему запросу ничего не найдено")
      }
      // TODO нужна проверка на остуствие интернета и прочие неполадки с сервером итп
    })
    .then (json => {
      let newsCards = new CardList(cardGridCont,json);
      newsCards.renderNews();
    })
    .catch(json => {
      hideLoader();
      showLoadError(json);

      localStorage.removeItem('news');
    });
}

function validateInput() {
    event.preventDefault();
    if (searchField.value.length > 0) {
        if(validateError) {
            validateError.remove();
        }
        initializeSearch()
    } else {
        validateError = document.createElement('div');
        validateError.setAttribute('class','error-message');
        validateError.textContent = "Нужно ввести ключевое слово";
        searchBlockContainer.append(validateError);
    }
}


class Api {
  constructor (url) {
    this.url = url;
  }

  getInfoFromApi () {
    return fetch(this.url)
      .then(response => {
        if (response) {
          return response.json()
        }
        return Promise.reject(response.json());
      })

      .then(json => {
        if ((json.message !== "Not Found") && (json.message !== "Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key.")) {
          return json;
        }
        return Promise.reject(json);
      })
  }
}

//Получение текущей даты TODO сделать изящнее а не 2 куска))))
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;


const str = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString();
let matchDate = str.match(regexOne).join('');
let pastWeek = matchDate.replace(regexTwo,(match,date,month,year) => `${year}-${month}-${date}`);



//Класс для создания карточек
class Card {
    constructor(image, date, title, text, source, url) {
        this.cardElement = this.create(image, date, title, text, source, url);
    }

    create(cardImage, datePublished, cardTitle, cardText, newsSource, cardUrl) {


        const card = document.createElement("a");
        card.setAttribute('class','cards-grid__item');
        card.setAttribute('href',`${cardUrl}`);
        card.setAttribute('target','_blank');
        //Дата публикации новости
        const cardDate = document.createElement('div');
        cardDate.setAttribute('class','cards-grid__item-date');
        cardDate.textContent = transformDates(datePublished);
        //Тайтл новости
        const cardSubtitle = document.createElement('h3');
        cardSubtitle.setAttribute('class','cards-grid__item-subtitle');
        cardSubtitle.textContent = cardTitle;
        //Текст новости
        const cardDescription = document.createElement('p');
        cardDescription.setAttribute('class','cards-grid__item-description');
        cardDescription.textContent = cardText;
        //Источник
        const cardSource = document.createElement('div');
        cardSource.setAttribute('class','cards-grid__item-source');
        cardSource.textContent = newsSource;

        //Складываем элементы в карточку
        card.append(cardImage);
        card.append(cardDate);
        card.append(cardSubtitle);
        card.append(cardDescription);
        card.append(cardSource);

        return cardGridCont.prepend(card);
    }
}

//Класс для рендера карточек и их отрисовки после полной загрузки изображений
class CardList {
  constructor(container, array) {
    this.container = container;
    this.array = array;
  }

  renderNews() {
    let number = this.array.articles.length;

    //Добавляем в локал-сторейдж все полученные данные из массива
    localStorage.setItem('news', JSON.stringify(this.array));

    this.array.articles.forEach(function (item) {
      loadImage(item.urlToImage,item.title)
        .then(img => {
            return new Card(img, item.publishedAt, item.title, item.description, item.source.name, item.url);
        })
        .catch(error => {
            let imagePlaceholder = new Image();
            imagePlaceholder.setAttribute('class','cards-grid__item-image');
            imagePlaceholder.setAttribute('alt','не удалось загрузить эту картинку');
            imagePlaceholder.src = "./images/placeholder-image.png";
            new Card(imagePlaceholder, item.publishedAt, item.title, item.description, item.source.name, item.url);

        })
        .finally(() => {
          if (number > 1) {
            number--;
          } else {
            showNewsGrid();
          }
      })
    });

  }
}

//TODO Реюзается в about
function transformDates(datePublished) {
    const stripDateInfo = datePublished.match(regexDateTransform).join('');
    return stripDateInfo.replace(regexDateTransform, (match, date, month, year) => `${year} ${monthNamesRussian[month.substr(1)]}, ${date}`);
}

//Функция "показать + 3 карточки" по клику кнопки
function loadMoreNews() {
    howMuchLeft = cardGridCont.children.length - 3 * newsPageCounter;

    if (showMoreButtonChecker(howMuchLeft)) {
        newsPageCounter++;
        for (let i = 3; i < 3 * newsPageCounter; i++) {
            cardGridCont.children[i].setAttribute('style', 'display:flex;');
        }
    } else {
        for (let i = 3 * newsPageCounter; i < 3 * newsPageCounter + howMuchLeft; i++) {
            cardGridCont.children[i].setAttribute('style', 'display:flex;');
        }
    }
}
function showMoreButtonChecker(counter) {
    if (counter > 3) {
        return true;
    } else {
        moreNewsButton.setAttribute('style','display:none;');
        return false;
    }
}


//Показать/скрыть грид с карточками
function showNewsGrid() {
    hideLoader();

    gridSection.setAttribute('style','display:block');
    analyticsButton.setAttribute('style','display:block;');
    cardGridCont.setAttribute('style','display:grid');
    //Проверяем, нужна ли кнопка подгрузки после получения массива данных
    if (showMoreButtonChecker(children.length)) {
        moreNewsButton.setAttribute('style','display:block');
    }
    //Отрисовываем первые 3 карточки
    for (let i = 0; i < children.length - (children.length - 3); i++) {
        cardGridCont.children[i].setAttribute('style','display:flex;')
    }
    moreNewsButton.addEventListener('click',loadMoreNews);
}
function hideNewsGrid() {
    newsPageCounter = 1;
    cardGridCont.setAttribute('style','display:none');
    moreNewsButton.setAttribute('style','display:none');
    analyticsButton.setAttribute('style','display:none;');
    moreNewsButton.removeEventListener('click',loadMoreNews);
}

//Показать/скрыть лоадер
function showLoader() {
  gridSection.setAttribute('style','display:block');
  loadInfoLoader.setAttribute('style','display:block')
}
function hideLoader() {
  loadInfoLoader.setAttribute('style','display:none')
}


//Показать/скрыть сообщение об ощибке загрузки новостей
function hideLoadError() {
  loadInfoFail.setAttribute('style','display:none;');
}
function showLoadError(description) {
  loadInfoFailDescription.text = description;
  loadInfoFail.setAttribute('style','display:block;');
}

function loadImage(url,title) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', e => resolve(img));
    img.addEventListener('error', () => {
      reject(`${url}`);
    });
    img.setAttribute('class','cards-grid__item-image');
    img.alt = title;
    img.src = url;
  });
}

//Проверяем, есть ли данные в Local Storage, если да, то отправляем их на отрисовку
(function checkLocalStorage () {

    if (JSON.parse(retrievedNewsArray) !== null) {
        searchField.setAttribute('placeholder',JSON.parse(retrievedQuery));
        showLoader();
        let newsCards = new CardList(cardGridCont,JSON.parse(retrievedNewsArray));
        newsCards.renderNews();
    }
})();

