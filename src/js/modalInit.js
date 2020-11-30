export const modalInit = () => {

    let modal = document.querySelector(".modal");
    let rulesButton = document.getElementById('rules');
    let close = document.getElementById('close');

    rulesButton.addEventListener('click', () => {
        modal.style.display = 'block';
    })
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
}
