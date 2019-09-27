import "../css/analytics.css";

//Переменные

//Общие с index.js переменные (TODO вынести в модуль)
let retrievedNewsArray = JSON.parse(localStorage.getItem('news'));
let retrievedQuery = JSON.parse(localStorage.getItem('query'));
const monthNamesRussian = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
const regexDateTransform = /(\d{1,4})-(\d{1,2})-(\d{1,2})/g;


const monthNamesEnglish = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
const requestTitle = document.querySelector('.request-info__title');
const mentionNumber = document.querySelectorAll(".request-info__mention-number");
const chartMonth = document.querySelector(".request-details__chart-line-month");
const chartBarsContainer = document.querySelector('.request-details__chart');
const bottomMetrics = document.querySelector('.request-details__chart-metrics_bottom');
const analyticsBlock = document.querySelector('.request-details');


function mentionCounter() {
    requestTitle.textContent = `Вы спросили: «${retrievedQuery}»`;
    mentionNumber[0].textContent = retrievedNewsArray.totalResults;

    //Проходимся по массиву, где ищем совпадения в заголовках
    let mentionMatches = retrievedNewsArray.articles.filter(function(number) {
        const regexList = new RegExp(retrievedQuery);
        return number.title.match(regexList)
    });

    mentionNumber[1].textContent = mentionMatches.length;

    //Полученный массив с совпадением возвращаем для дальнейшего использования в графиках
    return mentionMatches;
}

//Сортируем полученный из mentionCounter массив по датам
const groups = mentionCounter().reduce((groups, news) => {
    const date = news.publishedAt.split('T')[0];
    if (!groups[date]) {
        groups[date] = [];
    }
    groups[date].push(news);
    return groups;
}, {});

const groupArrays = Object.keys(groups).map((date) => {
    return {
        date,
        news: groups[date]
    };
});


//Финальная транфсормация массива с добавлением данных, которые будут выводится на графике и в полях
const transformedDate = groupArrays.map((item) => {
        const monthRussian = item.date.replace(regexDateTransform,(match,date,month) => `${monthNamesRussian[month.substr(1)]}`).match(/([А-яё]+)/gi).join('');
        const monthEnglish = item.date.replace(regexDateTransform,(match,date,month) => `${monthNamesEnglish[month.substr(1)]}`).match(/([A-z]+)/gi).join('');
        const dayNumber = item.date.replace(regexDateTransform,(match,year,month,date) => `${date}`);
        const yearNumber = item.date.replace(regexDateTransform,(match,year,month,date) => `${year}`);
        const dayOfWeek = getDayOfWeek(monthEnglish,dayNumber,yearNumber);

    return {
        monthRussian,
        dayNumber,
        dayOfWeek,
        news:item.news
    };
});

//Получения названия дня недели
function getDayOfWeek(month,day,year) {
    const givenDay = new Date(`${month} ${day}, ${year}`);
    const weekday = new Array(7);
    weekday[0] = "вс";
    weekday[1] = "пн";
    weekday[2] = "вт";
    weekday[3] = "ср";
    weekday[4] = "чт";
    weekday[5] = "пт";
    weekday[6] = "сб";
    return weekday[givenDay.getDay()];
}

function createDataChart (graphObj) {
    //Получем все названия месяцов(на случай если будет сразу два месяца)
    const unique = [...new Set(graphObj.map(item => item.monthRussian))];
    chartMonth.textContent = JSON.stringify(unique).match(/\[(.*)?(.*)\]/)[1].replace('"','(').replace('"',')');

    graphObj.sort(function(a, b) {
        return a.dayNumber- b.dayNumber;
    });

    graphObj.forEach(function (element) {
        console.log(element);
        //Создаем общий контейнер полоски
        const chartPercentageCont = document.createElement('div');
        chartPercentageCont.setAttribute('class','request-details__percentage');

        //Создаем и записываем число запросов за данный день
        const chartPersentageNumber = document.createElement('span');
        chartPersentageNumber.setAttribute('class','request-details__percentage-number');
        chartPersentageNumber.textContent = element.news.length;

        const chartPercentageDate = document.createElement('span');
        chartPercentageDate.setAttribute('class','request-details__percentage-text');
        chartPercentageDate.textContent = `${element.dayNumber}, ${element.dayOfWeek}`;

        const chartPercentageLine = document.createElement('span');
        chartPercentageLine.setAttribute('class','request-details__percentage-chart-width');
        chartPercentageLine.setAttribute('style',`width:${element.news.length}%`);

        chartPercentageCont.append(chartPersentageNumber);
        chartPercentageCont.append(chartPercentageDate);
        chartPercentageCont.append(chartPercentageLine);

        return chartBarsContainer.insertBefore(chartPercentageCont,bottomMetrics);
    })
}

(function chartAvailableChecker  () {
    if (mentionNumber[1].textContent > 0) {
        createDataChart(transformedDate);
    } else {
        analyticsBlock.remove();
    }

}());
