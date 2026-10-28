
const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        alt: "Mountain landscape",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
        alt: "Forest landscape",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        alt: "Beach",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        alt: "Mountain covered in snow",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        alt: "Mountain and lake",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
        alt: "Landscape",
    },
];
let currentIndex = 0;


const container = document.querySelector('#container')
const controls = document.querySelector('#controls')
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const dotsContainer = document.querySelector('#dots')

controls.addEventListener('click', handleControls)

function handleControls(e) {
    if (e.target.id === 'next') {
        if (currentIndex === slides.length - 1) {
            currentIndex = 0
        }
        else currentIndex++
        render()
    }
    else if (e.target.id === 'prev') {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1
        }
        else currentIndex--
        render()
    }
    else if (e.target.classList.contains('dot')) {
        currentIndex = Number(e.target.dataset.index)
        render()
    }

}

function render() {
    renderSlides()
    renderDots()
    disableButtons()
}
function renderDots() {
    dotsContainer.innerHTML = ''
    slides.forEach((slide, index) => {
        const dot = document.createElement('button')
        if (currentIndex === index) {
            dot.classList.add('active')
        }
        dot.classList.add('dot')
        dot.dataset.index = index
        dotsContainer.append(dot)
    })


}
function renderSlides() {
    container.innerHTML = "";
    if (slides.length === 0) {
        const h1 = document.createElement('h1')
        h1.textContent = 'No Slides available'
        container.append(h1)
        return
    }
    const slide = document.createElement('div')
    slide.classList.add('slide')
    const image = document.createElement("img");
    image.src = slides[currentIndex].image;
    image.alt = slides[currentIndex].alt;
    slide.append(image)
    container.append(slide)
}

function disableButtons() {
    if (slides.length === 1 || slides.length === 0) {
        nextBtn.disabled = true
        prevBtn.disabled = true
    }
}
render()