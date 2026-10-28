let openModalButton = document.querySelector('#openModalBtn')
let isModalOpen = false

openModalButton.addEventListener('click', handleOpenModal)
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
    if(isModalOpen) {
        if(e.key ==='Escape') {
            handleCloseModal()
        }
    }
    
}
function handleOverlayClose(e) {
    console.log(e.target , e.currentTarget);
    if(e.target === e.currentTarget) {
        handleCloseModal()
    }
}
function handleCloseModal(e) {
    isModalOpen = false
    render()

}
function handleOpenModal(e) {
    if (!isModalOpen) {
        isModalOpen = true
        render()
    }
}

function render() {
    if (isModalOpen) renderModal()
    else removeModal()


}

function renderModal() {
    let modalOverlay = document.createElement('div')
    modalOverlay.id = 'modalOverlay'
    //attach event listener when user clicks on the overlay
    modalOverlay.addEventListener('click',handleOverlayClose)

    let modalbox = document.createElement('div')
    modalbox.id = 'modalBox'
    let modalHeading = document.createElement('h3')
    modalHeading.textContent = 'Hello!'
    let modalPara = document.createElement('p')
    modalPara.textContent = 'This is a modal popup.'
    let modalCloseBtn = document.createElement('button')
    modalCloseBtn.textContent = '×';
    modalCloseBtn.id = 'closeBtn'
    //add event listener to close button
    modalCloseBtn.addEventListener('click', handleCloseModal)

    modalbox.append(modalCloseBtn, modalHeading, modalPara)
    modalOverlay.append(modalbox)
    document.body.append(modalOverlay)
}

function removeModal() {
    let modalOverlay = document.querySelector('#modalOverlay')
    if(modalOverlay) {
        modalOverlay.remove()
    }

}