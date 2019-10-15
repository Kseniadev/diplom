import {transformDates} from "./transformDates.js";

export class CommitCard {
    #commitCarouselContainer = document.querySelector('.commits-history__carousel');
    showError (message) {
        this.#commitCarouselContainer.textContent = message;
    }
    renderCommits(array) {
        const commitCardsContainer = this.#commitCarouselContainer;
        array.forEach(function (item) {
            //создали карточку
            const commitCard = document.createElement('a');
            commitCard.setAttribute('class','commits-history__carousel-cell');
            commitCard.setAttribute('href',item.html_url);
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
            commitCardAuthorAvatar.setAttribute('target','_blank');
            commitCardAuthorAvatar.setAttribute('alt',`Аватар автора коммита - ${item.author.login}`);

            const commitCardNameEmailCont = document.createElement('div');
            commitCardNameEmailCont.setAttribute('class','commits-history__container-name-email');

            const commitCardAuthorName = document.createElement('div');
            commitCardAuthorName.setAttribute('class','commits-history__carousel-cell-author-name');
            commitCardAuthorName.textContent = item.author.login;

            const commitCardAuthorEmail = document.createElement('span');
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
        })
    }

}
