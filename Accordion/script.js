// Level 2
// 1. Multiple Open Accordions
//         ↓
// 2. Expand All
//         ↓
// 3. Collapse All
//         ↓
// 4. Dynamically Add Accordion Item

// level 3 
// 1. Persist Open State (LocalStorage)--DONE
//         ↓
// 4. Nested Accordion (Recursive UI)
//         ↓
// 5. Interview Refactoring


const defaultAccordionList = [
    {
        id: 1,
        question: "What is JavaScript?",
        answer:
            "JavaScript is a programming language used to build interactive websites and web applications."
    },
    {
        id: 2,
        question: "What is React?",
        answer:
            "React is a JavaScript library for building user interfaces using reusable components."
    },
    {
        id: 3,
        question: "What is Event Delegation?",
        answer:
            "Event delegation is a technique where a single event listener is attached to a parent element to handle events from its children."
    },
    {
        id: 4,
        question: "What is LocalStorage?",
        answer:
            "LocalStorage is a browser API that stores key-value data persistently in the user's browser."
    },
    {
        id: 5,
        question: "What is the Event Loop?",
        answer:
            "The Event Loop is the mechanism that allows JavaScript to execute asynchronous tasks while running on a single thread."
    }
];
let accordionList = []
let openAccordionIds = []
let questionInput = document.querySelector('#question')
let answerInput = document.querySelector('#answer')
let accordionContainer = document.querySelector('#accordionContainer')
let controls = document.querySelector('.controls')
let addAccContainer = document.querySelector('.add-accordion')

accordionContainer.addEventListener('click', handleAccordian)
controls.addEventListener('click', handleControls)
addAccContainer.addEventListener('click', handleAddAccordion)

function syncLocalStorage() {
    localStorage.setItem(
        'accordionList',
        JSON.stringify(accordionList)
    );
    localStorage.setItem(
        'openAccordionIds',
        JSON.stringify(openAccordionIds)
    );
    renderAccordion()
}

function handleAddAccordion(e) {
    if (e.target.id !== 'addAccordion') return
    const question = questionInput.value.trim()
    const answer = answerInput.value.trim()
    if (question === "" || answer === "") return
    let newAccordion = {
        id: Date.now(),
        question: question,
        answer: answer
    }
    accordionList.push(newAccordion)
    openAccordionIds.push(newAccordion.id)
    questionInput.value = ""
    answerInput.value = ""
    syncLocalStorage()
    // renderAccordion()
    // console.log(accordionList);
}
function getAllAccordionIDs() {
    const allIDs = accordionList.map((item) => {
        return item.id
    })
    return allIDs
}

function handleControls(e) {
    if (e.target.id === 'expand') {
        let allIds = getAllAccordionIDs()
        openAccordionIds = allIds
        syncLocalStorage()
        // renderAccordion()
    }
    else if (e.target.id === 'collapse') {
        openAccordionIds = []
        syncLocalStorage()
        // renderAccordion()
    }
}
function handleAccordian(e) {
    let accordion = e.target.closest('.accordion')
    if (!accordion) return
    let accId = Number(accordion.getAttribute('data-id'))
    //Single Accordion
    //check if first time clicking means currOpen will be null or now check if user is clicking diff accordion
    // if (currentOpendId === null || currentOpendId !== accId) {
    //     currentOpendId = accId
    // }
    //user clicking same accordion
    // else currentOpendIds === null

    //Multi-Accordion
    if (openAccordionIds.includes(accId)) {
        //remove it from the arr or else add it
        openAccordionIds = openAccordionIds.filter((openId) => openId !== accId)
    }
    else {
        openAccordionIds.push(accId)

    }
    // renderAccordion()
    syncLocalStorage()

}

function renderAccordion() {
    accordionContainer.innerHTML = ""
    accordionList.forEach((item) => {
        let accordionDiv = document.createElement('div')
        accordionDiv.classList.add('accordion')
        accordionDiv.setAttribute('data-id', item.id)
        let accordionHeader = document.createElement('div')
        accordionHeader.classList.add('accordion-header')
        let questionSpan = document.createElement('span')
        questionSpan.textContent = item.question
        let arrowSpan = document.createElement('span')
        arrowSpan.textContent = '▼'
        accordionHeader.append(questionSpan, arrowSpan)
        accordionDiv.append(accordionHeader)


        //check with currentOpenID---Single Accordion
        // if (currentOpendId === item.id) {
        //     accordionDiv.classList.add('open')
        //     //create accordion answer div container
        //     let accordionAns = document.createElement('div')
        //     accordionAns.classList.add('accordion-content')
        //     let ansSpan = document.createElement('span')
        //     ansSpan.textContent = item.answer
        //     accordionAns.append(ansSpan)
        //     accordionDiv.append(accordionAns)
        // }

        //Multi-Accordion
        let isOpen = openAccordionIds.includes(item.id)
        if (isOpen) {
            //render answer also
            accordionDiv.classList.add('open')
            //create accordionAnswer div container
            let accordionAns = document.createElement('div')
            accordionAns.classList.add('accordion-content')
            let ansSpan = document.createElement('span')
            ansSpan.textContent = item.answer
            accordionAns.append(ansSpan)
            accordionDiv.append(accordionAns)
        }
        accordionContainer.append(accordionDiv)
    })
}


function loadAccordion() {
    openAccordionIds = JSON.parse(localStorage.getItem('openAccordionIds'))
    accordionList = JSON.parse(localStorage.getItem('accordionList'))
    if (!openAccordionIds) openAccordionIds = []
    if (!accordionList) {
        accordionList = defaultAccordionList
    }
}
loadAccordion()
renderAccordion()