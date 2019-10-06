import "../css/about.css";
import "../vendor/modules/flickity.css"

import {CommitCard} from "./modules/CommitCard.js";
import {Api} from "./modules/Api.js";
import {checkWidthForGitButton} from "./modules/checkWidthForGitButton.js";
import {sliderInitialization} from "./modules/sliderInitialization.js";

const getCommits = new Api("https://api.github.com/repos/Kseniadev/Kseniadev.github.io/commits?per_page=20");
const commitCards = new CommitCard();
getCommits.getInfoFromApi()
    .then(json => {
        if (json.length > 0) {
            return json;
        } else {
            return Promise.reject(json = "К сожалению коммитов еще не было :(")
        }
    })
    .then (json => {
        commitCards.renderCommits(json);
        sliderInitialization();
    })
    .catch(error => {
        commitCards.showError(error);
    });
// function sliderInitialization() {
//     let Flickity = require('flickity');
//     let flkty = new Flickity( '.commits-history__carousel', {
//         freeScroll: true,
//         wrapAround:  true,
//         initialIndex: 0,
//         groupCells: true
//     });
// }
window.addEventListener('resize', function(event){
    checkWidthForGitButton();
});

checkWidthForGitButton();