// There are two nice extensions:

// Expand All / Collapse All (good practice for recursive traversal and state updates).
// Single-open mode (only one accordion at each level can be open), which introduces a different state-management strategy.



const accordionList = [
    {
        id: 1,
        question: "A",
        answer: "Answer A",
        children: [
            {
                id: 2,
                question: "B",
                answer: "Answer B",
                children: [
                    {
                        id: 3,
                        question: "C",
                        answer: "Answer C",
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        question: "D",
        answer: "Answer D",
        children: []
    }
];
let accordionContainer = document.querySelector('#accordionContainer')
let openAccordionIds = []

accordionContainer.addEventListener('click',handleAccordion)
function handleAccordion(e) {
let accDiv = e.target.closest('.accordion')
if(!accDiv) return 
let accId = Number(accDiv.getAttribute('data-id'))

if(openAccordionIds.includes(accId)) {
    //find and remove from openAccIds
    openAccordionIds = openAccordionIds.filter((id)=>id!==accId)
}
else openAccordionIds.push(accId)
renderAccordion()
}

function renderAccordion() {
    accordionContainer.innerHTML = "";

    renderAccordionList(accordionList, accordionContainer)
}

function renderAccordionList(list, element) {
    list.forEach((item) => {
        const accordionDiv = document.createElement('div')
        accordionDiv.classList.add('accordion')
        accordionDiv.setAttribute('data-id',item.id)
        const accordionHeader = document.createElement('div')
        accordionHeader.classList.add('accordion-header')
        const questionSpan = document.createElement('span')
        questionSpan.textContent = item.question
        const arrowSpan = document.createElement('span')
        arrowSpan.textContent = '▼'
        accordionHeader.append(questionSpan, arrowSpan)
        //check it item is open
        if (openAccordionIds.includes(item.id)) {
            const accordionAns = document.createElement('div')
            accordionAns.classList.add('accordion-content')
            const ansSpan = document.createElement('span')
            ansSpan.textContent = item.answer
            accordionAns.append(ansSpan)
            accordionDiv.append(accordionHeader, accordionAns)
            if (item.children.length > 0) {
                const childrenContainer = document.createElement("div");
                childrenContainer.classList.add("children-container");
                renderAccordionList(item.children, childrenContainer);
                accordionDiv.append(childrenContainer)
            }
        }
        //not open
        else {
            accordionDiv.append(accordionHeader)
        }
        element.append(accordionDiv)
    })
}
renderAccordion()



