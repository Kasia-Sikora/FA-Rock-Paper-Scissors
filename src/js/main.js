import {modalInit} from './modalInit.js';
import {localStoragePersist} from "./localStorage.js";
import {gameRules} from "./gameRules.js";

function start() {
    modalInit();
    localStoragePersist.getScore();
    gameRules.init();
}

start();
