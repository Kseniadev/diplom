export const newsApiKey = "d73506fc03d54bf7bfe482b2271b6f9e";

export const regexOne = /(\d{1,2}\.\d{1,2}\.\d{1,4})/g;
export const regexTwo = /(\d{1,2})\.(\d{1,2})\.(\d{1,4})/g;

export const retrievedNewsArray = localStorage.getItem('newsArray');
export const retrievedQuery = localStorage.getItem('query');
export const monthNamesRussian = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
export const regexDateTransform = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g;