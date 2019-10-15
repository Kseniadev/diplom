import {transformDates} from "./transformDates.js";

export class NewsCard {
    #searchField = document.forms.news.elements.keyword;
    #loadInfoFailDescription = document.querySelector(".load-info__fail-description");
    #loadInfoFail = document.querySelector(".load-info__fail");
    #gridSection = document.querySelector(".cards-grid");
    #loadInfoLoader = document.querySelector(".load-info__loader");
    #showMoreButton = document.querySelector(".cards-grid__show-more-button");
    #cardGridCont = document.querySelector(".cards-grid__container");
    #analyticsButton = document.querySelector(".content-info__button");
    #gridTitle = document.querySelector('.content-info__title');

    constructor() {
        this.bind();
    }

    bind() {
        this.addToStorage = this.addToStorage.bind(this);
        this.showMore = this.showMore.bind(this);
        this.starting = this.starting.bind(this);
        this.deleteCards = this.deleteCards.bind(this);
    }

    addListener() {
        this.#showMoreButton.addEventListener('click', this.showMore);
    }
    removeListener() {
        this.#showMoreButton.removeEventListener('click', this.showMore);
    }

    starting(array) {
        this.array = array;

        if (this.array.length > 3) {
            this.#showMoreButton.setAttribute('style','display:block;');
            this.create(this.array.splice(0, 3));
        } else {
            this.create(this.array);
            this.removeListener();
            this.#showMoreButton.removeAttribute('style')
        }
    }

    showMore() {
        this.starting(this.array);
    }

    addToStorage(array) {
        localStorage.setItem('newsArray', JSON.stringify(array));
        this.starting(JSON.parse(localStorage.getItem('newsArray')));
    }

    deleteCards() {
        while (this.#cardGridCont.firstChild) {
            this.#cardGridCont.removeChild(this.#cardGridCont.firstChild);
        }
        this.#gridSection.setAttribute('style','display:none');
        this.#gridTitle.setAttribute('style','display:none');
        this.#cardGridCont.setAttribute('style','display:none');
        this.#showMoreButton.setAttribute('style','display:none');
        this.#analyticsButton.setAttribute('style','display:none;');
    }

    create(array) {
        this.#gridTitle.setAttribute('style','display:block');
        this.#gridSection.setAttribute('style','display:block');
        this.#analyticsButton.setAttribute('style','display:block;');
        this.#cardGridCont.setAttribute('style','display:grid');

        array.forEach(function (element) {
            const card = document.createElement("a");
            card.setAttribute('class','cards-grid__item');
            card.setAttribute('href',element.url);
            card.setAttribute('target','_blank');
            card.setAttribute('style','display:block');

            //Картинка новости
            const cardImage = document.createElement('img');
            cardImage.setAttribute('class','cards-grid__item-image');
            cardImage.setAttribute('alt',element.title);
            cardImage.setAttribute('target','_blank');
            cardImage.setAttribute('src',element.urlToImage);

            //Дата публикации новости
            const cardDate = document.createElement('div');
            cardDate.setAttribute('class','cards-grid__item-date');
            cardDate.textContent = transformDates(element.publishedAt);
            //Тайтл новости
            const cardSubtitle = document.createElement('h3');
            cardSubtitle.setAttribute('class','cards-grid__item-subtitle');
            cardSubtitle.textContent = element.title;
            //Текст новости
            const cardDescription = document.createElement('p');
            cardDescription.setAttribute('class','cards-grid__item-description');
            cardDescription.textContent = element.description;
            //Источник
            const cardSource = document.createElement('div');
            cardSource.setAttribute('class','cards-grid__item-source');
            cardSource.textContent = element.source.name;

            //Складываем элементы в карточку
            card.append(cardImage);
            card.append(cardDate);
            card.append(cardSubtitle);
            card.append(cardDescription);
            card.append(cardSource);

            document.querySelector(".cards-grid__container").append(card);
        });

    }

    //Работа с инпутом
    disableInput() {
        this.#searchField.setAttribute('disabled','disabled');
        this.#searchField.setAttribute('style','background: #ffffff4d; color: #00000040;')
    }

    enableInput() {
        this.#searchField.removeAttribute('disabled');
        this.#searchField.removeAttribute('style');
    }

    //Показать/скрыть лоадер
    showLoader() {
        this.#gridSection.setAttribute('style','display:block');
        this.#loadInfoLoader.setAttribute('style','display:block')
    }

    hideLoader() {
        this.#loadInfoLoader.setAttribute('style','display:none')
    }

    //Показать/скрыть сообщение об ощибке загрузки новостей
    hideLoadError() {
        this.#loadInfoFail.setAttribute('style','display:none;');
    }

    showLoadError(description) {
        if (description.toString() === "TypeError: Failed to fetch") {
            this.#loadInfoFailDescription.textContent = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
        } else {
            this.#loadInfoFailDescription.textContent = description;
        }
        this.#loadInfoFail.setAttribute('style','display:block;');
    }

}



