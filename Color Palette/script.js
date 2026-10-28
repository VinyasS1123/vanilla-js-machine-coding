const buttonControls = document.querySelector('.controls')
const colors = document.querySelector('#colors')
let colorsList = []

buttonControls.addEventListener('click', userInteraction)

function userInteraction(e) {
    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('color')) {
        // createColorBox(e.target.id)
        colorsList.push(e.target.id)
        render()
    }
    else if (e.target.id === 'delete') {
        colorsList = []
        render()
    }
    else if (e.target.id === 'removeLast') {
        // const lastBox = colors.lastElementChild
        // // console.log(lastBox);
        // if (lastBox === null) return
        // lastBox.remove()
        colorsList.pop()
        render()
    }

}


function render() {
  colors.innerHTML = ""
  for(let color of colorsList) {
    let box = document.createElement('div')
    box.classList.add('box')
    box.classList.add(color)
    box.textContent = color
    colors.append(box)
  }
}

