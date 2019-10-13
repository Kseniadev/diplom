// import {gitButton} from "./variebles.js";
const gitButton = document.querySelector(".content-info__button");

export function checkWidthForGitButton () {
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