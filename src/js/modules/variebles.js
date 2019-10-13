export const newsApiKey = "d73506fc03d54bf7bfe482b2271b6f9e";

export const regexOne = /(\d{1,2}\.\d{1,2}\.\d{1,4})/g;
export const regexTwo = /(\d{1,2})\.(\d{1,2})\.(\d{1,4})/g;

export const retrievedNewsArray = localStorage.getItem('newsArray');
export const retrievedQuery = localStorage.getItem('query');
export const monthNamesRussian = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
export const regexDateTransform = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g;

export const today = new Date(Date.now() + 60 * 60 * 1000).toLocaleString().match(regexOne).join('').replace(regexTwo,(match, date, month, year) => `${year}-${month}-${date}`);
//Получение даты 7 дней назад
export const pastWeek = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleString().match(regexOne).join('').replace(regexTwo,(match,date,month,year) => `${year}-${month}-${date}`);
