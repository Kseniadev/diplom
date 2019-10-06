import {initializeSearch} from "./initializeSearch.js";

let validateError;
const searchBlockContainer = document.querySelector(".search-block");
export const searchField = document.querySelector(".search-block__form").elements.keyword;

export function validateInput() {
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
