export class ModalInit {

    constructor() {
        this.modal = document.querySelector(".modal");
        this.rulesButton = document.getElementById('rules');
        this.close = document.getElementById('close');
        this.rulesImage = document.getElementById('rules-image');
    };

    init = () => {
        this.rulesButton.addEventListener('click', () => {
            if (this.difficulty === 'normal') {
                this.rulesImage.setAttribute('src', 'src/images/image-rules.svg');
            } else {
                this.rulesImage.setAttribute('src', 'src/images/image-rules-bonus.svg');
            }
            this.modal.style.display = 'block';
        })

        this.close.addEventListener('click', () => {
            this.modal.style.display = 'none';
        })
    }

    setDifficulty = (difficulty) => {
        this.difficulty = difficulty;
        this.init();
    }
}
