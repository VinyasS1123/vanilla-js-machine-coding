// Level 1 features:--DONE
// Add Todo
// Delete Todo
// Mark Complete

// Level 2 features 
// 1. Remaining Todos Counter
//         ↓
// 2. Active / Completed / All Filters
//         ↓
// 3. Search Todo
//         ↓
// 4. Edit Todo


// Level 3 features 
// 1. LocalStorage (Persistence)--DONE
//         ↓
// 2. Undo Delete
//         ↓
// 3. Drag & Drop Reordering
//         ↓
// 4. Keyboard Shortcuts
//         ↓
// 5. Interview Refactoring

const addBtn = document.querySelector('#addBtn')
const todoInput = document.querySelector('#todoInput')
const todoContainer = document.querySelector('#todoContainer')
const remainingCount = document.querySelector('#remainingCount')
const todoFilters = document.querySelector('#todoFilters')
const searchSection = document.querySelector('#searchSection')
const clearSearchBtn = document.querySelector('#clearBtn')



let todoList = []
let currentFilter = "all"
let searchQuery = ""
let editingTodoId = null
let lastDeletedTodo = null;
let draggedIndex = null;

addBtn.addEventListener('click', handleAddTodo)
todoContainer.addEventListener('click', handleTodo)
todoFilters.addEventListener('click', handleTodoFilters)
searchSection.addEventListener('click', handleTodoSearch)
clearSearchBtn.addEventListener('click', handleClearTodoSearch)
todoInput.addEventListener('keydown', handleEnterKey)

loadTodo()
function handleEnterKey(e) {
    console.log(e.key);

    if (e.key === 'Enter') {
        handleAddTodo()
    }

}
function handleClearTodoSearch() {
    searchQuery = ""
    let searchInput = document.querySelector('#searchInput')
    searchInput.value = ""
    renderTodo()
}
function handleTodoSearch(e) {
    if (e.target.tagName === 'BUTTON' && e.target.id === 'searchBtn') {
        let searchInput = document.querySelector('#searchInput')
        if (searchInput.value.trim() === "") return
        searchQuery = searchInput.value.trim()
        renderTodo()
    }
}


function handleTodoFilters(e) {
    if (e.target.tagName === 'BUTTON' && e.target.id === 'all') {
        currentFilter = "all"
        renderTodo()
    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'completed') {
        currentFilter = 'completed'
        renderTodo()
    }
    else {
        currentFilter = 'active'
        renderTodo()
    }
}

function handleAddTodo() {
    if (todoInput.value.trim() !== "") {
        let todoObj = {
            id: Date.now(),
            text: todoInput.value.trim(),
            completed: false
        }
        todoList.push(todoObj)
        todoInput.value = ""
        syncTodo()
    }
}
function handleTodo(e) {
    if (e.target.tagName === 'BUTTON' && e.target.id === 'delete') {
        handleDeleteTodo(e)

    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'completeBtn') {
        handleCompleteTodo(e)

    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'editBtn') {
        handleEditTodo(e)

    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'saveEdit') {
        handleSaveTodo(e)
    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'cancelEdit') {
        handleCancelEdit(e)
    }
    else if (e.target.tagName === 'BUTTON' && e.target.id === 'undoDelete') {
        handleUndoDelete(e)
    }

}
function syncTodo() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
    renderTodo()
}
function renderTodo() {
    //maybe save our todolist to localStorage
    renderTodoList()
    renderRemainingCount()

}


function renderTodoList() {
    let todosToRender = []
    todoContainer.innerHTML = ""
    let ul = document.createElement('ul')
    //based on currentfilter render the todo
    if (currentFilter === 'all') {
        todosToRender = todoList
    }
    else if (currentFilter === 'active') {
        todosToRender = todoList.filter((todo) => !todo.completed)
    }
    else {
        todosToRender = todoList.filter((todo) => todo.completed)
    }

    if (searchQuery !== "") {
        todosToRender = todosToRender.filter((todo) => {
            return todo.text.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }
    for (let i = 0; i < todosToRender.length; i++) {
        let todo = todosToRender[i]
        //check if editingid === todo.id 
        //if yes replace span with input and input value set as todo.text
        let todoLi = document.createElement('li')
        if (editingTodoId === todo.id) {
            let editInputBar = document.createElement('input')
            editInputBar.value = todo.text
            let saveBtn = document.createElement('button')
            saveBtn.textContent = 'Save'
            saveBtn.id = 'saveEdit'
            let cancelBtn = document.createElement('button')
            cancelBtn.textContent = 'Cancel'
            cancelBtn.id = 'cancelEdit'
            todoLi.classList.add('todo')
            todoLi.setAttribute('data-id', todo.id)
            todoLi.append(editInputBar, saveBtn, cancelBtn)
            // ul.append(todoLi)
            // todoContainer.append(ul)
        }
        else {
            let todoSpanText = document.createElement('span')
            let deleteTodo = document.createElement('button')
            let completedTodo = document.createElement('button')
            let editTodoBtn = document.createElement('button')
            editTodoBtn.textContent = 'Edit Task'
            editTodoBtn.id = 'editBtn'
            completedTodo.textContent = 'Complete Task'
            completedTodo.id = 'completeBtn'
            deleteTodo.textContent = 'Delete Task'
            deleteTodo.id = 'delete'
            todoSpanText.textContent = todo.text
            todoLi.classList.add('todo')
            todoLi.setAttribute('data-id', todo.id)
            todoLi.draggable = true
            todoLi.append(todoSpanText, deleteTodo, completedTodo, editTodoBtn)
        }
        if (todo.completed) {
            todoLi.classList.add('completed')
        }
        ul.append(todoLi)
        todoLi.addEventListener('dragstart', () => {
            draggedIndex = i
            // console.log("Dragging...",draggedIndex);
        })
        todoLi.addEventListener("dragover", (e) => {
            // console.log("Dragging over");
            e.preventDefault();
        });
        todoLi.addEventListener("drop", () => {
            // console.log("Dragged:", draggedIndex);
            // console.log("Dropped on:", i);
            const removedTodo = todoList.splice(draggedIndex, 1)
            todoList.splice(i, 0, removedTodo[0])
            syncTodo()
        });
    }
    if (lastDeletedTodo !== null) {
        let undoDelete = document.createElement('button')
        undoDelete.textContent = 'Undo Delete'
        undoDelete.id = 'undoDelete'
        let undoLi = document.createElement('li')
        let deletedTodoSpan = document.createElement('span')
        deletedTodoSpan.textContent = `Deleted Todo: ${lastDeletedTodo.text}`
        deletedTodoSpan.classList.add('deletedTodo')
        undoLi.append(deletedTodoSpan, undoDelete)
        ul.append(undoLi)
    }
    todoContainer.append(ul)
}

function renderRemainingCount() {
    //Remaining Todo Count
    let remainingTodo = todoList.filter((todo) => !todo.completed).length
    remainingCount.textContent = `Remaining Todo Count:${remainingTodo}`
}

function loadTodo() {
    const storedTodos = JSON.parse(localStorage.getItem('todoList'))
    if (!storedTodos) {
        todoList = []
    }
    else todoList = storedTodos
    renderTodo()
}


function handleDeleteTodo(e) {
    let li = e.target.parentElement
    let todoId = Number(li.getAttribute('data-id'))
    todoList = todoList.filter((todo) => {
        if (todo.id === todoId) {
            lastDeletedTodo = todo
        }
        return todo.id !== todoId
    })
    // renderTodo()
    syncTodo()
}
function handleCompleteTodo(e) {
    let li = e.target.closest('li')
    let todoId = Number(li.getAttribute('data-id'))
    todoList = todoList.map((todo) => {
        if (todoId === todo.id) {
            let newTodo = { ...todo, completed: !todo.completed }
            return newTodo
            // if (todo.completed) {
            //     li.classList.add('completed')
            // } else li.classList.remove('completed')
        }
        return todo
    })
    // console.log(todoList);
    // renderTodo()
    syncTodo()
}
function handleEditTodo(e) {
    let li = e.target.closest('li')
    let todoId = Number(li.getAttribute('data-id'))
    editingTodoId = todoId
    // console.log("dsadd");
    renderTodo()
}
function handleSaveTodo(e) {
    let li = e.target.closest('li')
    let editInputBar = li.querySelector('input')
    let inputValue = editInputBar.value.trim()
    let todoId = Number(li.getAttribute('data-id'))
    if (!inputValue) return
    todoList = todoList.map((todo) => {
        if (todo.id === todoId) {
            return { ...todo, text: inputValue }
        }
        return todo
    })
    editingTodoId = null
    //    renderTodo()
    syncTodo()
}

function handleCancelEdit(e) {
    console.log("Cancel Edit");
    editingTodoId = null
    renderTodo()
}
function handleUndoDelete(e) {
    console.log("Todo Undo DONE");
    todoList.push(lastDeletedTodo)
    lastDeletedTodo = null
    syncTodo()
}


// State

// handleAddTodo()
// handleTodo
// handleClearTodoSearch
// handleEnterKey
// ...

// Rendering

// renderTodo()
// renderRemainingCount
// renderRemainingCount
// renderTodoList
// ...

// Persistence

// syncTodo()

// Initialization

// loadTodo()