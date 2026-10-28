let tabs = [
    {
        id: 1,
        title: "Home",
        content: "Welcome to Home",
        hasAccess: true
    },
    {
        id: 2,
        title: "Products",
        content: "Our Products",
        hasAccess: true
    },
    {
        id: 3,
        title: "About",
        content: "About Us",
        hasAccess: false
    },
    {
        id: 4,
        title: "Contact",
        content: "Contact Us",
        hasAccess: true
    }
];

const tabsContainer = document.querySelector('#tabs-container')
const tabsBar = document.querySelector("#tabs-navbar")
const tabContentDiv = document.querySelector('#tabContent')

let currentActiveTabId = tabs[0].id

tabsBar.addEventListener('click', handleTabs)

function handleTabs(e) {
    let closeBtn = e.target.closest('.close')
    if (closeBtn) {
        let tabButton = closeBtn.closest('.tab')
        let tabId = Number(tabButton.getAttribute('data-id'))
        tabs = tabs.filter((tab)=>tab.id !== tabId)
        if (currentActiveTabId === tabId) {
            //find a tab which user can access
            const nextTab = tabs.find((tab) => tab.hasAccess)
            currentActiveTabId = nextTab ? nextTab.id : null;
        }
        render()
        return
    }
    let tabButton = e.target.closest('.tab')
    if (tabButton) {
        let tabId = Number(tabButton.getAttribute('data-id'))
        if (currentActiveTabId !== tabId) {
            currentActiveTabId = tabId
            render()
        }
    }

}

function renderTabs() {
    tabsBar.innerHTML = ""
    tabs.forEach((tab) => {
        let tabBtn = document.createElement('button')
        tabBtn.setAttribute('data-id', tab.id)
        tabBtn.classList.add('tab')
        if (tab.id === currentActiveTabId) tabBtn.classList.add('active')
        if (!tab.hasAccess) tabBtn.disabled = true
        let tabText = document.createElement('span')
        tabText.textContent = tab.title
        let tabCloseIcon = document.createElement('span')
        tabCloseIcon.classList.add('close')
        tabCloseIcon.textContent = "×";
        tabBtn.append(tabText, tabCloseIcon)
        tabsBar.append(tabBtn)
    })
}
function renderTabsContent() {
    tabContentDiv.innerHTML = ''
    tabs.forEach((tab) => {
        if (tab.id === currentActiveTabId) {
            let tabContentSpan = document.createElement('span')
            tabContentSpan.id = 'content'
            tabContentSpan.textContent = tab.content
            tabContentDiv.append(tabContentSpan)
        }

    })
}

function render() {
    renderTabs()
    renderTabsContent()
}


render()