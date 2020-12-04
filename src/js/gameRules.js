import {Button} from "./button.js";

export class GameRules {

    constructor(localStoragePersist, view) {
        this.localStoragePersist = localStoragePersist;
        this.view = view;
        this.listOfButtons = [];
        this.difficulty = '';
    }

    setDifficulty = (callback) => {
        const hard = document.getElementById('hard-lvl');
        const normal = document.getElementById('normal-lvl');

        hard.addEventListener('click', () => {
            this.difficulty = 'bonus';
            callback(this.difficulty);
            this.generateButtons()
        })

        normal.addEventListener('click', () => {
            this.difficulty = 'normal';
            callback(this.difficulty);
            this.generateButtons()
        })
    }

    generateButtons() {
        let buttonsToPick;
        this.difficulty === 'bonus' ? buttonsToPick = document.querySelectorAll('.circle') :
            buttonsToPick = document.querySelectorAll('.normal');

        buttonsToPick.forEach(el => {
            let button = new Button(el);
            button.setEventListenerFunction(this.setButtonPickedByUser);
            button.node.addEventListener('click', button.getEventListenerFunction())
            this.listOfButtons.push(button);
        })
        this.view.setDifficulty(this.difficulty, this.listOfButtons);
    }

    setButtonPickedByUser = (event) => {
        const element = this.getEventTarget(event);
        for (const button of this.listOfButtons) {
            element === button.node ? button.node.dataset.userPick = 'true' : button.node.dataset.userPick = 'false';
            button.node.removeEventListener('click', this.setButtonPickedByUser);
        }
        this.startGame();
    };

    setButtonPickByComputer = () => {
        const buttonPickedByComputer = this.getRandomButton();
        buttonPickedByComputer.setComputersPick();
        this.listOfButtons.push(buttonPickedByComputer)
        setTimeout(() => {
            this.view.displayComputerChoice(buttonPickedByComputer.parent)
        }, 1500);
    };

    startGame = () => {
        this.view.setBackgroundOnGamePlay();
        this.view.displayPlayersChoice(this.listOfButtons);
        this.setButtonPickByComputer();
        setTimeout(() => {
            this.view.viewIfPlayerWins(this.checkWhoWins());
        }, 1500);
    };

    getRandomButton = () => {
        const random = this.difficulty === 'normal' ? Math.floor((3) * Math.random()) : Math.floor((5) * Math.random());
        const buttonNode = this.listOfButtons[random].parent.cloneNode(true);
        return new Button(buttonNode.firstElementChild);
    };

    getEventTarget(event) {
        if (event.target.nodeName === "IMG") {
            return event.target.parentElement.parentElement;
        } else {
            return event.target.className === "circle-inside" ? event.target.parentElement : event.target;
        }
    }

    checkWhoWins = () => {
        const usersNode = this.listOfButtons.find(el => el.node.dataset.userPick === 'true');
        const computersNode = this.listOfButtons.find(el => el.node.dataset.computerPick === 'true');

        if (usersNode.name !== computersNode.name) {
            if (usersNode.name === 'paper' && (computersNode.name === 'rock' || computersNode.name === 'spock') ||
                usersNode.name === 'rock' && (computersNode.name === 'scissors' || computersNode.name === 'lizard') ||
                usersNode.name === 'scissors' && (computersNode.name === 'paper' || computersNode.name === 'lizard') ||
                usersNode.name === 'lizard' && (computersNode.name === 'paper' || computersNode.name === 'spock') ||
                usersNode.name === 'spock' && (computersNode.name === 'scissors' || computersNode.name === 'rock')) {
                this.changeScore(1);
                return usersNode.node;
            }
            this.changeScore(-1);
            return computersNode.node;
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
}
