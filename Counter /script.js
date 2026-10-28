const counter = document.querySelector('#count');
const decreaseBtn = document.getElementById('decrease');
const buttons = document.querySelector('.buttons');

let count = 0;

buttons.addEventListener('click', userInteraction);

function userInteraction(e) {
    if (e.target.id === 'increase') {
        increase();
    }
    else if (e.target.id === 'decrease') {
        if (count > 0) {
            decrease();
        }
    }
    else if (e.target.id === 'reset') {
        reset();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        increase();
    }

    if (e.key === 'ArrowDown') {
        if (count > 0) {
            decrease();
        }
    }

    if (e.key === 'r' || e.key === 'R') {
        reset();
    }
});

function increase() {
    count++;
    render();
}

function decrease() {
    count--;
    render();
}

function reset() {
    count = 0;
    render();
}

function render() {
    counter.textContent = count;

    if (count === 0) {
        decreaseBtn.disabled = true;
        counter.style.backgroundColor = 'black';
        counter.style.color = 'white';
    } else {
        decreaseBtn.disabled = false;
        counter.style.backgroundColor = 'green';
        counter.style.color = 'white';
    }
}

render();