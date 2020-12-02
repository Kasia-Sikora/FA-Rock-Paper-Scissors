export class Button {

    constructor(button) {
        this.name = button.classList[1];
        this.node = button;
        this.parent = button.parentElement;
    }
}
