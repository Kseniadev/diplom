import {Analytics} from "./Analytics.js";
import {monthNamesRussian, regexDateTransform, today, pastWeek, retrievedNewsArray} from "./variebles.js";



export class DatesTransformer {
    #groups = [];
    #groupArrays = [];
    #monthNamesEnglish = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    #analyticsBlock = document.querySelector('.request-details');


    constructor() {
        this.bind();
    }

    bind() {
        this.groupByDate = this.groupByDate.bind(this);
        this.transformDates = this.transformDates.bind(this);
        this.getDayOfWeek = this.getDayOfWeek.bind(this);
        this.initializer = this.initializer.bind(this);
        this.buildFinalArray = this.buildFinalArray.bind(this)
    }

    initializer() {
        if (new Analytics().totalResults() > 0) {
            new Analytics().mentions();
            new Analytics().createDataChart(this.transformDates(this.buildFinalArray(this.groupByDate())))
        } else {
            this.#analyticsBlock.remove();
        }
    }

    //Группировка по датам
    groupByDate () {
        this.#groups = JSON.parse(retrievedNewsArray).reduce((groups, news) => {
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
            const yearNumber = item.date.replace(regexDateTransform,(match, year, month, date) => `${year}`);
            const dayOfWeek = this.getDayOfWeek(monthEnglish,dayNumber,yearNumber);

            return {
                monthRussian,
                date,
                dayNumber,
                dayOfWeek,
                news:item.news
            };
        });
    }

    //Ассоциируем дни недели с датами
    getDayOfWeek (month,day,year) {
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

    //Создание конечного массива, из которогу будут рисоваться чарты
    buildFinalArray (graphObj) {
        const index = getIndex(graphObj, 'date');
        const first = new Date(pastWeek);
        const last = new Date(today);
        const buildedArray = [];
        let datestr = '';

        function getIndex(srcArray, field) {
            let i, l, index;
            index = {};
            for(i = 0, l = srcArray.length; i < l; i++) {
                index[srcArray[i][field]] = srcArray[i];
            }
            return index;
        }

        function dateToYMD(date) {
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        }

        graphObj.sort(function(date1, date2) {
            date1 = new Date(date1.date);
            date2 = new Date(date2.date);
            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
        });

        function createDefault(datestr) {
            return {
                date: datestr,
                news:[],
            };
        }

        for(const d = first; d.getTime() <= last.getTime(); d.setDate(d.getDate()+1)) {

            datestr = dateToYMD(d);
            if(index[datestr]) {
                buildedArray.push(index[datestr]);
            } else {
                buildedArray.push(createDefault(datestr));
            }
        }

        return buildedArray;
    }

}
