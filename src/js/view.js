export const view = {

    gameContainer: document.querySelector('.game'),
    computersEmptySpace: document.querySelector('.circle-computer'),
    userPickText: document.querySelector('.user-pick'),
    computerPickText: document.querySelector('.computer-pick'),
    result: document.querySelector('.result'),
    winner: document.querySelector('.winner'),
    playAgainButton: document.getElementById('play-again'),
    paperButton: document.querySelector('.paper'),
    scissorButton: document.querySelector('.scissors'),
    rockButton: document.querySelector('.rock'),
    pulse: document.querySelectorAll('.pulse'),

    setBackgroundOnStart: function () {
        this.removeUnnecessaryElements();
        this.appendNewElements();
        this.gameContainer.style.backgroundImage = 'url("src/images/bg-triangle.svg")';
        this.gameContainer.style.justifyContent = 'space-around';
        this.pulse.forEach(el => el.style.display = 'none')
    },

    displayComputerChoice(element) {
        this.computersEmptySpace.style.display = 'none';
        element.style.display = 'flex';
        this.gameContainer.insertBefore(element, this.userPickText);
    },

    displayPlayersChoice(buttonsToPick) {
        buttonsToPick.forEach(el => el.dataset.userPick === "true" ? el.parentElement.style.display = 'flex' : el.parentElement.parentElement.removeChild(el.parentElement));
    },

    setBackgroundOnGame: function () {
        this.gameContainer.style.backgroundImage = 'unset';
        this.computersEmptySpace.style.display = 'flex';
        this.computersEmptySpace.parentElement.style.justifyContent = 'space-around';
        this.userPickText.style.display = 'block';
        this.computerPickText.style.display = 'block';
    },

    viewIfPlayerWins(winner) {
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
    },

    displayScore: function (number) {
        document.getElementById('score').innerText = number;
    },

    displayDraw(usersNode, computersNode) {
        usersNode.nextElementSibling.style.display = 'block';
        computersNode.nextElementSibling.style.display = 'block';
        this.winner.innerText = "draw";
    },

    removeUnnecessaryElements() {
        for (let i = this.gameContainer.childElementCount - 1; i >= 0; i--) {
            if (this.gameContainer.children[i].classList.contains('container')) {
                this.gameContainer.removeChild(this.gameContainer.children[i])
            } else {
                this.gameContainer.children[i].style.display = 'none';
            }
        }
    },
    appendNewElements() {
        this.gameContainer.insertBefore(this.paperButton.parentElement, this.computersEmptySpace);
        this.gameContainer.insertBefore(this.scissorButton.parentElement, this.computersEmptySpace);
        this.gameContainer.insertBefore(this.rockButton.parentElement, this.computersEmptySpace);
    }
}
