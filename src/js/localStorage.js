export class LocalStoragePersist {

    constructor(view) {
        this.view = view;
    }

    getScore = () => {
        if (localStorage.getItem('score') === null) {
            this.setScore();
        } else {
            this.view.displayScore(localStorage.getItem('score'));
        }
    };

    setScore = () => {
        localStorage.setItem('score', '0');
    };

    updateScore = (number) => {
        localStorage.setItem('score', (+(localStorage.getItem('score')) + number).toString());
    }
}
