import {retrievedNewsArray, retrievedQuery} from "./variebles.js";
import {NewsCard} from "./NewsCard.js";

const searchField = document.querySelector(".search-block__form").elements.keyword;
const newCard = new NewsCard();

export function checkLocalStorage () {
    if (JSON.parse(retrievedNewsArray) !== null) {
        searchField.setAttribute('placeholder',JSON.parse(retrievedQuery));
        newCard.addListener();
        newCard.starting(JSON.parse(retrievedNewsArray));
    }
}