import "../css/about.css";
import "../vendor/modules/flickity.css"

const regexDateTransfrom = /(\d{1,4})\-(\d{1,2})\-(\d{1,2})/g;
const monthNamesRussian = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
const commitCarouselContainer = document.querySelector('.commits-history__carousel');
const gitButton = document.querySelector(".content-info__button");


//TODO Реюзается из scripts.js
class Api {
    constructor (url) {
        this.url = url;
    }

    getInfoFromApi () {
        return fetch(this.url)
            .then(response => {
                if (response) {
                    return response.json()
                }
                return Promise.reject(response.json());
            })

            .then(json => {
                if ((json.message !== "Not Found") && (json.message !== "Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key.")) {
                    return json;
                }
                return Promise.reject(json);
            })
    }
}

//Класс для рендера карточек
class CommitCard {
    constructor(container, array) {
        this.container = container;
        this.array = array;
    }

    renderCommits() {
        console.log(this.array);
        const commitCardsContainer = this.container;
        this.array.forEach(function (item) {
            //создали карточку
            const commitCard = document.createElement('a');
            commitCard.setAttribute('class','commits-history__carousel-cell');
            commitCard.setAttribute('href',item.html_url);
            commitCard.setAttribute('target','_blank');
            //создали контейнера даты и пихнули ее туда
            const commitCardDate = document.createElement('div');
            commitCardDate.setAttribute('class','commits-history__carousel-cell-date');
            commitCardDate.textContent = transformDates(item.commit.author.date);

            //создаем блок где картинка и юзер-инфо
            const commitCardAuthorBlock = document.createElement('div');
            commitCardAuthorBlock.setAttribute('class','commits-history__carousel-cell-about-author');
            const commitCardAuthorAvatar = document.createElement('img');
            commitCardAuthorAvatar.setAttribute('class','commits-history__carousel-cell-avatar');
            commitCardAuthorAvatar.setAttribute('src',item.author.avatar_url);

            commitCardAuthorAvatar.setAttribute('alt',`Аватар автора коммита - ${item.author.login}`);

            const commitCardNameEmailCont = document.createElement('div');
            commitCardNameEmailCont.setAttribute('class','commits-history__container-name-email');

            const commitCardAuthorName = document.createElement('div');
            commitCardAuthorName.setAttribute('class','commits-history__carousel-cell-author-name');
            commitCardAuthorName.textContent = item.author.login;

            const commitCardAuthorEmail = document.createElement('div');
            commitCardAuthorEmail.setAttribute('class','commits-history__carousel-cell-email');
            commitCardAuthorEmail.textContent = item.commit.author.email;

            //Создаем описание коммита
            const commitCardDescription = document.createElement('p');
            commitCardDescription.setAttribute('class','commits-history__carousel-cell-description');
            commitCardDescription.textContent = item.commit.message;

            commitCard.prepend(commitCardDate);
            commitCard.append(commitCardAuthorBlock);

            commitCardAuthorBlock.prepend(commitCardAuthorAvatar);
            commitCardAuthorBlock.append(commitCardNameEmailCont);

            commitCardNameEmailCont.prepend(commitCardAuthorName);
            commitCardNameEmailCont.append(commitCardAuthorEmail);

            commitCard.append(commitCardDescription);

            commitCardsContainer.append(commitCard);

            console.log(transformDates(item.commit.author.date));
            console.log(item.commit.author.email);
            console.log(item.author.avatar_url);
            console.log(item.author.login);
            console.log(item.commit.message);
        })
    }
}

//TODO Реюзается из scripts.js
function transformDates(datePublished) {
    const stripDateInfo = datePublished.match(regexDateTransfrom).join('');
    return stripDateInfo.replace(regexDateTransfrom, (match, date, month, year) => `${year} ${monthNamesRussian[month.substr(1)]}, ${date}`);
}

// Получение коммитов с гитхаба
const getCommits = new Api("https://api.github.com/repos/Kseniadev/Kseniadev.github.io/commits?per_page=20");
getCommits.getInfoFromApi()
    .then(json => {
        if (json.length > 0) {
            return json;
        } else {
            return Promise.reject(json = "К сожалению коммитов еще не было :(")
        }
        // TODO нужна проверка на остуствие интернета и прочие неполадки с сервером итп
    })
    .then (json => {
        let commitCards = new CommitCard(commitCarouselContainer,json);
        commitCards.renderCommits();
        sliderInitialization();

    })
    .catch(json => {
        commitCarouselContainer.textContent = json;
    });

function sliderInitialization() {
    let Flickity = require('flickity');
    let flkty = new Flickity( '.commits-history__carousel', {
        freeScroll: true,
        wrapAround:  true,
        initialIndex: 0,
        groupCells: true
    });
}

function checkWidthForGitButton () {
    if (window.innerWidth <= 440) {
        document.querySelector(".commits-history").append(gitButton);
        gitButton.style.cssText = "border: 1px solid rgb(26, 27, 34); border-radius: 80px; padding: 15px 68px" +
            " 17px; position: relative; bottom: -65px; margin: auto;";
        gitButton.textContent = "Открыть в GitHub";
    } else {
        document.querySelector(".content-info").append(gitButton);
        gitButton.style.cssText = "";
    }
}

window.addEventListener('resize', function(event){
    checkWidthForGitButton();
});

checkWidthForGitButton();