const body = document.body;
let themeBtn = document.querySelector('#theme')
let theme = "Light"

themeBtn.addEventListener('click', handleChangeTheme)



function handleChangeTheme(e) {
    if (theme === 'Light') {
        theme = 'Dark'
        syncTheme()
        renderUI(theme)
    }
    else {
        theme = 'Light'
        syncTheme()
        renderUI(theme)
    }
}

function renderUI(theme) {
    if (theme === 'Light') {
        body.id = 'light-mode'
        themeBtn.textContent = 'Dark Mode'
    }
    else {
        body.id = 'dark-mode'
        themeBtn.textContent = 'Light Mode'
    }
}

function syncTheme(){
    localStorage.setItem('theme',theme)
}

function initialLoad() {
    theme = localStorage.getItem('theme') ?? 'Light'
    console.log(theme);
    renderUI(theme)
}

initialLoad()