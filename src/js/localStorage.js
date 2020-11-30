import {view} from "./view.js";

export const localStoragePersist = {

    getScore: function () {
        if (localStorage.getItem('score') === null) {
            this.setScore();
        } else {
            view.displayScore(localStorage.getItem('score'));
        }
    },

    setScore: function () {
        localStorage.setItem('score', '0');
    },

    updateScore: function (number) {
        console.log(localStorage.getItem('score'));
        localStorage.setItem('score', (+(localStorage.getItem('score')) + number).toString());
    }
}
