export const modalInit = (difficulty) => {

    let modal = document.querySelector(".modal");
    let rulesButton = document.getElementById('rules');
    let close = document.getElementById('close');
    let rulesImage = document.getElementById('rules-image');

    rulesButton.addEventListener('click', () => {
        if(difficulty === 'normal') {
            rulesImage.setAttribute('src', 'src/images/image-rules.svg');
        }else{
            rulesImage.setAttribute('src', 'src/images/image-rules-bonus.svg');
        }
        modal.style.display = 'block';
    })

    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
}
