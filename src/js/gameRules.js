import {view} from "./view.js";
import {localStoragePersist} from "./localStorage.js";

export const gameRules = {

    setButtonPickByComputer: function (buttons) {
        const buttonPickedByComputer = this.getButton(buttons);
        delete buttonPickedByComputer.firstElementChild.dataset.userPick;
        buttonPickedByComputer.firstElementChild.dataset.computerPick = 'true';
        setTimeout(() => {
            view.displayComputerChoice(buttonPickedByComputer)
        }, 1500);
    },

    checkWhoWins: function () {
        let usersNode = document.querySelector('[data-user-pick = "true"]');
        let computersNode = document.querySelector('[data-computer-pick = "true"]');

        if (usersNode.classList[1] !== computersNode.classList[1]) {
            if (usersNode.classList[1] === 'paper' && computersNode.classList[1] === 'rock' ||
                usersNode.classList[1] === 'rock' && computersNode.classList[1] === 'scissors' ||
                usersNode.classList[1] === 'scissors' && computersNode.classList[1] === 'paper') {
                this.changeScore(1);
                return usersNode;
            }
            this.changeScore(-1);
            return computersNode;
        }
        view.displayDraw(usersNode, computersNode);
        return null;
    },

    changeScore(number) {
        const score = document.getElementById('score');
        if (+(score.innerText) >= 0 && number > 0 ||
            +(score.innerText) > 0) {
            view.displayScore(+(document.getElementById('score').innerText) + number);
            localStoragePersist.updateScore(number);
        }
    },

    setButtonPickedByUser: function (element, buttonsToPick) {
        for (const button of buttonsToPick) {
            element === button ?
                button.dataset.userPick = 'true' :
                button.dataset.userPick = 'false';
        }
        this.startGame(buttonsToPick);
    },

    startGame(buttonsToPick) {
        view.setBackgroundOnGame();
        view.displayPlayersChoice(buttonsToPick);
        this.setButtonPickByComputer(buttonsToPick);
        setTimeout(() => {
            view.viewIfPlayerWins(gameRules.checkWhoWins());
        }, 1500);
    },

    getButton(buttons) {
        let random = Math.floor((3) * Math.random());
        return buttons[random].parentElement.cloneNode(true);
    },

    init: function () {
        let buttonsToPick = document.querySelectorAll('.circle');
        buttonsToPick.forEach(el => el.addEventListener('click', () => {
            this.setButtonPickedByUser(el, buttonsToPick);
        }))
    }
}
