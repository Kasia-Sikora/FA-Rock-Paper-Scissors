import {Button} from "./button.js";

export class GameRules {

    constructor(localStoragePersist, view) {
        this.localStoragePersist = localStoragePersist;
        this.view = view;
        this.listOfButtons = [];
    }

    difficulty = '';

    setButtonPickByComputer = (buttons) => {
        const buttonPickedByComputer = this.getButton(buttons);
        delete buttonPickedByComputer.firstElementChild.dataset.userPick;
        buttonPickedByComputer.firstElementChild.dataset.computerPick = 'true';
        setTimeout(() => {
            this.view.displayComputerChoice(buttonPickedByComputer)
        }, 1500);
    };

    checkWhoWins = () => {
        let usersNode = document.querySelector('[data-user-pick = "true"]');
        let computersNode = document.querySelector('[data-computer-pick = "true"]');

        if (usersNode.classList[1] !== computersNode.classList[1]) {
            if (usersNode.classList[1] === 'paper' && (computersNode.classList[1] === 'rock' || computersNode.classList[1] === 'spock') ||
                usersNode.classList[1] === 'rock' && (computersNode.classList[1] === 'scissors' || computersNode.classList[1] === 'lizard') ||
                usersNode.classList[1] === 'scissors' && (computersNode.classList[1] === 'paper' || computersNode.classList[1] === 'lizard') ||
                usersNode.classList[1] === 'lizard' && (computersNode.classList[1] === 'paper' || computersNode.classList[1] === 'spock') ||
                usersNode.classList[1] === 'spock' && (computersNode.classList[1] === 'scissors' || computersNode.classList[1] === 'rock')) {
                this.changeScore(1);
                return usersNode;
            }
            this.changeScore(-1);
            return computersNode;
        }
        this.view.displayDraw(usersNode, computersNode);
        return null;
    };

    changeScore = (number) => {
        const score = document.getElementById('score');
        if (+(score.innerText) >= 0 && number > 0 ||
            +(score.innerText) > 0) {
            this.view.displayScore(+(document.getElementById('score').innerText) + number);
            this.localStoragePersist.updateScore(number);
        }
    };

    setButtonPickedByUser = (element, buttonsToPick) => {
        for (const button of buttonsToPick) {
            element === button ?
                button.dataset.userPick = 'true' :
                button.dataset.userPick = 'false';
        }
        this.startGame(buttonsToPick);
    };

    startGame = (buttonsToPick) => {
        this.view.setBackgroundOnGame();
        this.view.displayPlayersChoice(buttonsToPick, this.difficulty);
        this.setButtonPickByComputer(buttonsToPick);
        setTimeout(() => {
            this.view.viewIfPlayerWins(this.checkWhoWins());
        }, 1500);
    };

    getButton = (buttons) => {
        let random = this.difficulty === 'normal' ? Math.floor((3) * Math.random()) : Math.floor((5) * Math.random());
        return buttons[random].parentElement.cloneNode(true);
    };

    init = () => {
        let buttonsToPick;
        if (this.difficulty === 'bonus') {
            buttonsToPick = document.querySelectorAll('.circle');
        } else {
            buttonsToPick = document.querySelectorAll('.normal');
        }
        buttonsToPick.forEach(el => el.addEventListener('click', () => {
            this.setButtonPickedByUser(el, buttonsToPick);
        }))
    };

    setDifficulty = (callback) => {
        let hard = document.getElementById('hard-lvl');
        let normal = document.getElementById('normal-lvl');

        hard.addEventListener('click', () => {
            this.difficulty = 'bonus';
            this.view.displayGame(this.difficulty);
            callback(this.difficulty);
            // this.generateButtons(this.difficulty)
            this.init();
        })

        normal.addEventListener('click', () => {
            this.difficulty = 'normal';
            callback(this.difficulty);
            this.view.displayGame();
            // this.generateButtons()
            this.init();
        })
    }

    generateButtons() {
        let buttonsToPick;
        if (this.difficulty === 'bonus') {
            buttonsToPick = document.querySelectorAll('.circle');
        } else {
            buttonsToPick = document.querySelectorAll('.normal');
        }
        buttonsToPick.forEach(el => {
            let button = new Button(el);
            this.listOfButtons.push(button);
        })
    }
}
