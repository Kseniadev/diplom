import {newsApiKey, regexOne, regexTwo} from "./variebles.js";
import {searchField} from './validateInput.js'
import {Api} from "./Api.js";
import {NewsCard} from "./NewsCard.js";

const today = new Date(Date.now() + 60 * 60 * 1000).toLocaleString().match(regexOne).join('').replace(regexTwo,(match, date, month, year) => `${year}-${month}-${date}`);
//Получение даты 7 дней назад
const pastWeek = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleString().match(regexOne).join('').replace(regexTwo,(match,date,month,year) => `${year}-${month}-${date}`);

const newCard = new NewsCard();


export function initializeSearch() {
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
            newCard.hideLoader();
            newCard.enableInput();
            newCard.addListener();
        })
        .catch(json => {
            newCard.hideLoader();
            newCard.deleteCards();
            newCard.showLoadError(json);
            newCard.enableInput();
            localStorage.removeItem('newsArray');
        });
}
