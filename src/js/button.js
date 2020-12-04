export class Button {

    constructor(button) {
        this.name = button.classList[1];
        this.node = button;
        this.parent = button.parentElement;
    }

    setEventListenerFunction(listener) {
        this.listener = listener;
    }

    getEventListenerFunction(){
        return this.listener;
    }

    setComputersPick() {
        delete this.node.dataset.userPick;
        this.node.dataset.computerPick = 'true';
    }
}
