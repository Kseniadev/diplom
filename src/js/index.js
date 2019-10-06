import "../css/index.css";
import {validateInput} from "./modules/validateInput.js";
import {checkLocalStorage} from "./modules/checkLocalStorage.js";
// import {searchButton} from "./modules/variebles.js";

const searchButton = document.querySelector(".search-block__button");
// const searchField = document.querySelector(".search-block__form").elements.keyword;


//Лисенеры
searchButton.addEventListener('click',validateInput);
checkLocalStorage();


