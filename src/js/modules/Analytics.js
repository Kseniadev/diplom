import {retrievedQuery, retrievedNewsArray, regexDateTransform, monthNamesRussian} from "./variebles.js";


export class Analytics {
    #mentionNumber = document.querySelectorAll(".request-info__mention-number");
    #requestTitle = document.querySelector('.request-info__title');
    #mentionMatches =[];
    #groups = [];
    #groupArrays = [];
    #monthNamesEnglish = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    #chartMonth = document.querySelector(".request-details__chart-line-month");
    #bottomMetrics = document.querySelector('.request-details__chart-metrics_bottom');
    #totalResultFromLS = JSON.parse(localStorage.getItem('totalResults'));
    #analyticsBlock = document.querySelector('.request-details');
    #retrievedNewsArray = localStorage.getItem('newsArray');
    #retrievedQuery = localStorage.getItem('query').replace(/"/g,'');

    constructor() {
        this.bind();
    }

    bind() {
        this.mentionsTitleCount = this.mentionsTitleCount.bind(this);
        this.groupByDate = this.groupByDate.bind(this);
        this.transformDates = this.transformDates.bind(this);
        Analytics.getDayOfWeek = Analytics.getDayOfWeek.bind(this);
        this.createDataChart = this.createDataChart.bind(this);
        this.totalResults = this.totalResults.bind(this);
        this.initializer = this.initializer.bind(this);
    }

    initializer() {
        if (this.#totalResultFromLS > 0) {
            this.mentions();
            this.createDataChart(this.transformDates(this.groupByDate()));
        } else {
            this.#analyticsBlock.remove();
        }
    }

    totalResults () {
        return this.#totalResultFromLS;
    }

    //Заполняем заголовок данными и числами
    mentions() {
        this.#requestTitle.textContent = `Вы спросили: «${this.#retrievedQuery}»`;
        this.#mentionNumber[0].textContent = this.totalResults();
        this.#mentionNumber[1].textContent = this.mentionsTitleCount().length;
    }

    //Подсчет упоминаний
    mentionsTitleCount() {

        const QueryVariable = this.#retrievedQuery;
        this.#mentionMatches = JSON.parse(this.#retrievedNewsArray).filter(function(number) {
            return number.title.match(new RegExp(QueryVariable))
        });
        return this.#mentionMatches;
    }

    //Группировка по датам
    groupByDate () {

        this.#groups = JSON.parse(this.#retrievedNewsArray).reduce((groups, news) => {
            const date = news.publishedAt.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(news);
            return groups;
        }, {});

        return this.#groupArrays = Object.keys(this.#groups).map((date) => {
            return {
                date,
                news: this.#groups[date]
            };
        });
    }

    //Трансформация дат (числа, месяца и день недели) в нужный для вывода формат
    transformDates (array) {
        return array.map((item) => {
            const date = item.date.replace(/-/g," ");
            const monthRussian = item.date.replace(regexDateTransform,(match,date,month) => `${monthNamesRussian[parseInt(month) -1]}`).match(/([А-яё]+)/gi).join('');
            const monthEnglish = item.date.replace(regexDateTransform,(match,date,month) => `${this.#monthNamesEnglish[parseInt(month) -1]}`).match(/([A-z]+)/gi).join('');
            const dayNumber = item.date.replace(regexDateTransform,(match,year,month,date) => `${date}`);
            const yearNumber = item.date.replace(regexDateTransform,(match,year,month,date) => `${year}`);
            const dayOfWeek = Analytics.getDayOfWeek(monthEnglish,dayNumber,yearNumber);

            return {
                monthRussian,
                date,
                dayNumber,
                dayOfWeek,
                news:item.news
            };
        });
    }

    static getDayOfWeek (month, day, year) {
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

    createDataChart (graphObj) {
        //Получем все названия месяцов(на случай если будет сразу два месяца)
        const unique = [...new Set(graphObj.map(item => item.monthRussian))];
        const preparedMonth = JSON.stringify(unique).match(/\[(.*)?(.*)\]/)[1].replace(/,/g,'\n');
        this.#chartMonth.textContent = `(${preparedMonth.substr(1).slice(0, -1).replace(/"/g,'')})`;
        const totalResults = this.totalResults();
        const bottomMetricsLine = this.#bottomMetrics;

        graphObj.sort(function(date1, date2) {
            date1 = new Date(date1.date);
            date2 = new Date(date2.date);
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
        });

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
