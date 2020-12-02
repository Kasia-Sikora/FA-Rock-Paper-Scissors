import {modalInit} from './modalInit.js';
import {localStoragePersist} from "./localStorage.js";
import {gameRules} from "./gameRules.js";

function start() {
    gameRules.setDifficulty(modalInit);
    localStoragePersist.getScore();
}

start();
