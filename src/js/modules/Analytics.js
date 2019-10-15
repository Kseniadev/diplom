import {retrievedQuery, retrievedNewsArray} from "./variebles.js";


export class Analytics {
    #mentionNumber = document.querySelectorAll(".request-info__mention-number");
    #requestTitle = document.querySelector('.request-info__title');
    #mentionMatches =[];
    #chartMonth = document.querySelector(".request-details__chart-line-month");
    #bottomMetrics = document.querySelector('.request-details__chart-metrics_bottom');
    #totalResultFromLS = JSON.parse(localStorage.getItem('totalResults'));


    constructor() {
        this.bind();
    }

    bind() {
        this.mentionsTitleCount = this.mentionsTitleCount.bind(this);
        this.createDataChart = this.createDataChart.bind(this);
        this.totalResults = this.totalResults.bind(this);
    }


    totalResults () {
        return this.#totalResultFromLS;
    }

    //Заполняем заголовок данными и числами
    mentions() {
        const stringedQuery = JSON.parse(retrievedQuery)
        this.#requestTitle.textContent = `Вы спросили: «${stringedQuery}»`;
        this.#mentionNumber[0].textContent = this.totalResults();
        this.#mentionNumber[1].textContent = this.mentionsTitleCount().length;
    }

    //Подсчет упоминаний
    mentionsTitleCount() {
        this.#mentionMatches = JSON.parse(retrievedNewsArray).filter(function(number) {
            return number.title.match(new RegExp(JSON.parse(retrievedQuery)))
        });
        return this.#mentionMatches;
    }

    createDataChart (graphObj) {

        //Получем все названия месяцов(на случай если будет сразу два месяца)
        const unique = [...new Set(graphObj.map(item => item.monthRussian))];
        const preparedMonth = JSON.stringify(unique).match(/\[(.*)?(.*)\]/)[1].replace(/,/g,'\n');
        this.#chartMonth.textContent = `(${preparedMonth.substr(1).slice(0, -1).replace(/"/g,'')})`;
        const totalResults = this.totalResults();
        const bottomMetricsLine = this.#bottomMetrics;

        graphObj.forEach(function (element) {

            //Создаем общий контейнер полоски
            const chartPercentageCont = document.createElement('div');
            chartPercentageCont.setAttribute('class','request-details__percentage');

            //Создаем и записываем число запросов за данный день
            const chartPercentageNumber = document.createElement('span');
            chartPercentageNumber.setAttribute('class','request-details__percentage-number');
            chartPercentageNumber.textContent = element.news.length;

            const chartPercentageDate = document.createElement('span');
            chartPercentageDate.setAttribute('class','request-details__percentage-text');
            chartPercentageDate.textContent = `${element.dayNumber}, ${element.dayOfWeek}`;

            const chartPercentageLine = document.createElement('span');
            chartPercentageLine.setAttribute('class','request-details__percentage-chart-width');
            chartPercentageLine.setAttribute('style',`width:${(100 * element.news.length) / totalResults}%`);
            chartPercentageCont.append(chartPercentageNumber);
            chartPercentageCont.append(chartPercentageDate);
            chartPercentageCont.append(chartPercentageLine);

            return document.querySelector('.request-details__chart').insertBefore(chartPercentageCont,bottomMetricsLine);
        })
    }

}
