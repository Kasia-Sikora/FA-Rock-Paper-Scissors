export class View {

    constructor() {
        this.gameContainer = document.querySelector('.game');
        this.computersEmptySpace = document.querySelector('.circle-computer');
        this.userPickText = document.querySelector('.user-pick');
        this.computerPickText = document.querySelector('.computer-pick');
        this.result = document.querySelector('.result');
        this.winner = document.querySelector('.winner');
        this.playAgainButton = document.getElementById('play-again');
        this.pulse = document.querySelectorAll('.pulse');
        this.game = document.querySelector('.page');
        this.difficultyPage = document.querySelector('.start-page');
        this.buttonsToPick = document.querySelectorAll('.container');
    }

    setDifficulty(difficulty, listOfButtons) {
        this.difficulty = difficulty;
        this.listOfButtons = listOfButtons;
        this.displayGame();
    }

    setGameViewOnStart = () => {
        this.removeUnnecessaryElements();
        this.appendNewButtonsToGameContainer(this.listOfButtons);
        this.setGameBackground();
    };

    setBackgroundOnGamePlay = () => {
        this.listOfButtons.forEach(button => {
            if (button.name === "paper") button.parent.style.width = "20vh";
        })
        this.gameContainer.style.backgroundImage = 'unset';
        this.computersEmptySpace.style.display = 'flex';
        this.computersEmptySpace.parentElement.style.justifyContent = 'space-around';
        this.userPickText.style.display = 'block';
        this.computerPickText.style.display = 'block';
        this.buttonsToPick.forEach(el => el.style.margin = "unset");
    };

    displayGame = () => {
        this.game.style.display = 'flex';
        this.difficultyPage.style.display = 'none';
        this.setGameViewOnStart();
    }

    displayComputerChoice = (element) => {
        this.computersEmptySpace.style.display = 'none';
        element.style.display = 'flex';
        this.gameContainer.insertBefore(element, this.userPickText);
    }

    displayPlayersChoice = (buttonsToPick) => {
        buttonsToPick.forEach(el => el.node.dataset.userPick === "true" ? el.parent.style.display = 'flex' :
            el.parent.parentElement.removeChild(el.parent));
    };

    removeUnnecessaryElements = () => {
        this.removeButtonNodes();
        this.removeComputersButtonFromList();
        this.changeUserPickToFalse();
    };

    appendNewButtonsToGameContainer = () => {
        this.listOfButtons.forEach(button => {
                button.parent.style.display = 'flex';
                if (this.difficulty === 'bonus') this.setBonusStyles(button);
                button.node.addEventListener('click', button.getEventListenerFunction());
                this.gameContainer.insertBefore(button.parent, this.computersEmptySpace)
            }
        )
    };

    viewIfPlayerWins = (winner) => {
        this.result.style.display = 'flex';
        this.playAgainButton.addEventListener('click', this.setGameViewOnStart)
        if (winner !== null) {
            winner.dataset.userPick === 'true' ? this.winner.innerText = "you win" : this.winner.innerText = "you lose";
            winner.nextElementSibling.style.display = 'block';
        }
    };

    displayScore = (number) => {
        document.getElementById('score').innerText = number;
    }

    displayDraw = (usersNode, computersNode) => {
        usersNode.node.nextElementSibling.style.display = 'block';
        computersNode.node.nextElementSibling.style.display = 'block';
        this.winner.innerText = "draw";
    };

    removeComputersButtonFromList() {
        if (this.listOfButtons.length === 4 || this.listOfButtons.length === 6) {
            this.listOfButtons.pop();
        }
    }

    changeUserPickToFalse() {
        this.listOfButtons.map(el => {
            if (el.node.dataset.userPick === 'true') el.node.dataset.userPick = "false";
        })
    }

    removeButtonNodes() {
        for (let i = this.gameContainer.childElementCount - 1; i >= 0; i--) {
            this.gameContainer.children[i].classList.contains('container') ? 
                this.gameContainer.removeChild(this.gameContainer.children[i]) :
                this.gameContainer.children[i].style.display = 'none';
        }
    }

    setBonusStyles(button) {
        if (button.name === "paper") {
            button.parent.style.width = "100%";
            button.parent.style.marginBottom = "-7vh";
        } else if (button.name === "spock" || button.name === "scissors") {
            button.name === 'spock' ? button.parent.style.marginLeft = "-3vh" : button.parent.style.marginRight = "-3vh"
        } else if (button.name === "lizard" || button.name === "rock") {
            button.name === 'lizard' ? button.parent.style.marginLeft = "3vh" : button.parent.style.marginRight = "3vh"
        }
    }

    setGameBackground() {
        this.difficulty === "normal" ? this.gameContainer.style.backgroundImage = 'url("src/images/bg-triangle.svg")' :
            this.gameContainer.style.backgroundImage = 'url("src/images/bg-pentagon.svg")';
        this.gameContainer.style.backgroundSize = '60%';
        this.gameContainer.style.justifyContent = 'space-around';
        this.pulse.forEach(button => button.style.display = 'none')
    }
}
