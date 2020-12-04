import {ModalInit} from './modalInit.js';
import {LocalStoragePersist} from "./localStorage.js";
import {GameRules} from "./gameRules.js";
import {View} from "./view.js";

function start() {
    const view = new View();
    const localStoragePersist = new LocalStoragePersist(view);
    const gameRules = new GameRules(localStoragePersist, view);
    const modal = new ModalInit();

    gameRules.setDifficulty(modal.setDifficulty);
    localStoragePersist.getScore();
}

start();
