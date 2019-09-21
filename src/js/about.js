import "../css/style.css";
import "../../vendor/modules/flickity.css"


const gitButton = document.querySelector(".content-info__button");



    function sliderDesktop() {
        let Flickity = require('flickity');
        let flkty = new Flickity( '.commits-history__carousel', {
            freeScroll: true,
            wrapAround:  true,
            initialIndex: 2,
            adaptiveHeight: true

        });
    }

    function sliderMobile() {
        let Flickity = require('flickity');
        let flkty = new Flickity( ".commits-history__carousel", {
            cellAlign: 'left',
            wrapAround:  false,
            initialIndex: 1,
            adaptiveHeight: true
        });
        flkty.selectCell(0);
    }


    function checkWidthForSlider() {
        if (window.innerWidth <= 768) {
            sliderMobile()
        } else {
            sliderDesktop()
        }
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
        checkWidthForSlider();
        checkWidthForGitButton();
    });

    checkWidthForGitButton();
    checkWidthForSlider();



