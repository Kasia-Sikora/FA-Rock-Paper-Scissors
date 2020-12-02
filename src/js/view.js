export class View {

    difficulty = "";
    gameContainer = document.querySelector('.game');
    computersEmptySpace = document.querySelector('.circle-computer');
    userPickText = document.querySelector('.user-pick');
    computerPickText = document.querySelector('.computer-pick');
    result = document.querySelector('.result');
    winner = document.querySelector('.winner');
    playAgainButton = document.getElementById('play-again');
    paperButton = document.querySelector('.paper');
    scissorButton = document.querySelector('.scissors');
    rockButton = document.querySelector('.rock');
    spockButton = document.querySelector('.spock');
    lizardButton = document.querySelector('.lizard');
    pulse = document.querySelectorAll('.pulse');
    game = document.querySelector('.page');
    difficultyPage = document.querySelector('.start-page');
    buttonsToPick = document.querySelectorAll('.container');

    setBackgroundOnStart = () => {
        this.removeUnnecessaryElements();
        this.appendNewElements();
        this.difficulty === "normal" ? this.gameContainer.style.backgroundImage = 'url("src/images/bg-triangle.svg")' :
            this.gameContainer.style.backgroundImage = 'url("src/images/bg-pentagon.svg")';
        this.gameContainer.style.justifyContent = 'space-around';
        this.pulse.forEach(el => el.style.display = 'none')
    };

    displayComputerChoice = (element) => {
        this.computersEmptySpace.style.display = 'none';
        element.style.display = 'flex';
        this.gameContainer.insertBefore(element, this.userPickText);
    }

    displayPlayersChoice = (buttonsToPick, difficulty) => {
        buttonsToPick.forEach(el => el.dataset.userPick === "true" ? el.parentElement.style.display = 'flex' :
            el.parentElement.parentElement.removeChild(el.parentElement));
        if (difficulty === 'normal') {
            this.spockButton.parentElement.style.display = "none";
            this.lizardButton.parentElement.style.display = "none";
        }
    };

    setBackgroundOnGame = () => {
        this.scissorButton.parentElement.style.width = "20vh";
        this.gameContainer.style.backgroundImage = 'unset';
        this.computersEmptySpace.style.display = 'flex';
        this.computersEmptySpace.parentElement.style.justifyContent = 'space-around';
        this.userPickText.style.display = 'block';
        this.computerPickText.style.display = 'block';
        this.buttonsToPick.forEach(el => el.style.margin = "unset");
    };

    viewIfPlayerWins = (winner) => {
        this.result.style.display = 'flex';
        this.playAgainButton.addEventListener('click', this.setBackgroundOnStart.bind(this))
        if (winner !== null) {
            if (winner.dataset.userPick === 'true') {
                this.winner.innerText = "you win";
            } else {
                this.winner.innerText = "you lose";
            }
            winner.nextElementSibling.style.display = 'block';
        }
    };

    displayScore = (number) => {
        document.getElementById('score').innerText = number;
    }

    displayDraw = (usersNode, computersNode) => {
        usersNode.nextElementSibling.style.display = 'block';
        computersNode.nextElementSibling.style.display = 'block';
        this.winner.innerText = "draw";
    };

    removeUnnecessaryElements = () => {
        for (let i = this.gameContainer.childElementCount - 1; i >= 0; i--) {
            if (this.gameContainer.children[i].classList.contains('container')) {
                this.gameContainer.removeChild(this.gameContainer.children[i])
            } else {
                this.gameContainer.children[i].style.display = 'none';
            }
        }
    };

    appendNewElements = () => {
        if (this.difficulty === 'normal') {
            this.gameContainer.insertBefore(this.paperButton.parentElement, this.computersEmptySpace);
            this.gameContainer.insertBefore(this.scissorButton.parentElement, this.computersEmptySpace);
            this.gameContainer.insertBefore(this.rockButton.parentElement, this.computersEmptySpace);
        } else {
            this.gameContainer.insertBefore(this.scissorButton.parentElement, this.computersEmptySpace);
            this.scissorButton.parentElement.style.width = "100%";
            this.scissorButton.parentElement.style.marginBottom = "-7vh";
            this.gameContainer.insertBefore(this.spockButton.parentElement, this.computersEmptySpace);
            this.spockButton.parentElement.style.marginLeft = "-3vh";
            this.gameContainer.insertBefore(this.paperButton.parentElement, this.computersEmptySpace);
            this.paperButton.parentElement.style.marginRight = "-3vh";
            this.gameContainer.insertBefore(this.lizardButton.parentElement, this.computersEmptySpace);
            this.lizardButton.parentElement.style.marginLeft = "3vh";
            this.gameContainer.insertBefore(this.rockButton.parentElement, this.computersEmptySpace);
            this.rockButton.parentElement.style.marginRight = "3vh";
        }
    };

    displayGame = (difficulty) => {
        this.difficulty = difficulty;
        this.game.style.display = 'flex';
        this.difficultyPage.style.display = 'none';
        this.appendNewElements();
        if (this.difficulty === 'normal') {
            this.paperButton.parentElement.style.display = "flex";
            this.scissorButton.parentElement.style.display = "flex";
            this.rockButton.parentElement.style.display = "flex";
        } else {
            this.gameContainer.style.backgroundImage = 'url("src/images/bg-pentagon.svg")';
            this.gameContainer.style.backgroundSize = '70%';
            this.scissorButton.parentElement.style.display = "flex";
            this.scissorButton.parentElement.style.width = "100%";
            this.spockButton.parentElement.style.display = "flex";
            this.paperButton.parentElement.style.display = "flex";
            this.lizardButton.parentElement.style.display = "flex";
            this.rockButton.parentElement.style.display = "flex";
        }
    }
}
