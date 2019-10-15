import "../css/index.css";
import {checkLocalStorage} from "./modules/checkLocalStorage.js";
import {NewsCard} from "./modules/NewsCard.js";
import {Api} from "./modules/Api.js";
import {newsApiKey, pastWeek, today} from "./modules/variebles.js";

const searchButton = document.querySelector(".search-block__button");
const newCard = new NewsCard();
const searchBlockContainer = document.querySelector(".search-block");
const searchField = document.querySelector(".search-block__form").elements.keyword;

function validateInput() {
    event.preventDefault();
    const validateError = document.createElement('div');

    if (searchField.value.length > 0) {
        if(validateError) {
            validateError.remove();
        }
        initializeSearch()
    } else {
        validateError.setAttribute('class','error-message');
        validateError.textContent = "Нужно ввести ключевое слово";
        searchBlockContainer.append(validateError);
    }
}


function initializeSearch() {
    event.preventDefault();

    const searchQuery = searchField.value;

    newCard.deleteCards();
    newCard.showLoader();
    newCard.removeListener();
    newCard.disableInput();

    const getNews = new Api(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${newsApiKey}&pageSize=100&from=${today}&to=${pastWeek}&language=ru`);
    getNews.getInfoFromApi()
        .then(json => {
            newCard.hideLoadError();
            localStorage.setItem('query', JSON.stringify(searchQuery));
            localStorage.setItem('totalResults', JSON.stringify(json.totalResults));
            return json.articles;
        })
        .then(json => {
            newCard.addToStorage(json);
            newCard.addListener();
        })
        .catch(json => {
            newCard.deleteCards();
            newCard.showLoadError(json);
            localStorage.removeItem('newsArray');
        })
        .finally(() => {
            newCard.hideLoader();
            newCard.enableInput();

        })

}


//Лисенеры
searchButton.addEventListener('click',validateInput);
checkLocalStorage();


