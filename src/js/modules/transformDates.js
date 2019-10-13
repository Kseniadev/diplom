import {monthNamesRussian, regexDateTransform} from "./variebles.js";


export function transformDates(datePublished) {
    const stripDateInfo = datePublished.match(regexDateTransform).join('');
    return stripDateInfo.replace(regexDateTransform, (match, date, month, year) => `${year} ${monthNamesRussian[month.substr(1)]}, ${date}`);
}