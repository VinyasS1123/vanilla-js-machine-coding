// Level 2 features 
// 1. Edit Title--DONE
//         ↓
// 2. Edit Content--DONE
//         ↓
// 3. Live Synchronization--DONE
//         ↓
// 4. Empty States--DONE
//         ↓
// 5. Selected Note Highlight---DONE

// Level 3
// 1. LocalStorage (Persistence)--DONE
//         ↓
// 2. Search Notes--DONE
//         ↓
// 3. Last Edited Timestamp--DONE
//         ↓
// 4. Autosave Indicator
//         ↓
// 5. Keyboard Shortcuts--only one done. 
//         ↓
// 6. Interview Refactoring


let addNoteBtn = document.querySelector('#addNoteBtn')
let noteInput = document.querySelector('#noteTitle')
let notesListContainer = document.querySelector('#notesList')
let noteViewer = document.querySelector('#noteViewer')
let searchContainer = document.querySelector('#searchContainer')

let currentSelectedNote = null
let notesList = []
let searchQuery = ""
let previousTitle = ""

noteInput.addEventListener('keydown', handleEnter)
addNoteBtn.addEventListener('click', handleAddNote)
notesListContainer.addEventListener('click', handleNotes)
searchContainer.addEventListener('input', handleSearchNote)
noteViewer.addEventListener('input', handleNoteViewer)

function handleNoteViewer(e) {
    if (e.target.id === 'selectedNoteTitle') {
        let titleInputValue = e.target.value.trim()
        const selectedNote = notesList.find((note) => note.id === currentSelectedNote)
        selectedNote.title = titleInputValue
        selectedNote.lastEdited = Date.now()
        syncNotes()
        renderNotesList()
    }
    if (e.target.id === 'selectedNoteContent') {
        let noteContents = e.target.value
        const selectedNote = notesList.find((note) => note.id === currentSelectedNote)
        selectedNote.content = noteContents
        selectedNote.lastEdited = Date.now()
        syncNotes()
    }
}

function handleSearchNote(e) {
    if (e.target.id !== 'searchNote') return
    let searchText = e.target.value.toLowerCase()
    searchQuery = searchText
    renderNotesList()
}

function handleAddNote() {
    let noteText = noteInput.value.trim()
    if (!noteText) return
    let noteObj = {
        id: Date.now(),
        title: noteText,
        content: "",
        lastEdited: null
    }
    notesList.push(noteObj)
    syncNotes()
    currentSelectedNote = noteObj.id
    noteInput.value = ""
    // console.log(notesList);
    renderNotes()
}
function handleEnter(e) {
    if (e.key === 'Enter') handleAddNote()
}
function handleNotes(e) {
    let li = e.target.closest('li')
    if (!li) return
    let noteId = Number(li.getAttribute('data-id'))
    if (e.target.id === 'deleteNote') {
        // console.log(notesList);
        if (noteId === currentSelectedNote) {
            currentSelectedNote = null
        }
        notesList = notesList.filter((note) => {
            return note.id !== noteId
        })
        syncNotes()
        renderNotes()
    }
    else {
        //user selects a note
        currentSelectedNote = noteId
        renderNotes()
    }

}

function syncNotes() {
    let stringifiedNotesList = JSON.stringify(notesList)
    localStorage.setItem('notesList', stringifiedNotesList)
}

function renderNotes() {
    renderNotesList()
    renderSelectedNote()
}

function renderNotesList() {
    let notesToRender = notesList
    notesListContainer.innerHTML = ""
    if (notesList.length === 0) {
        let p = document.createElement('p')
        p.textContent = 'No notes yet! Create your first note '
        p.id = 'emptyNotesList'
        notesListContainer.append(p)
        return
    }
    if (searchQuery !== "") {
        notesToRender = notesToRender.filter((note) => {
            return note.title.toLowerCase().includes(searchQuery)
        })
    }
    if (notesToRender.length === 0) {
        let p = document.createElement("p");
        p.textContent = "No matching notes found.";
        notesListContainer.append(p);
        return;
    }
    let ul = document.createElement('ul')
    for (let i = 0; i < notesToRender.length; i++) {
        let note = notesToRender[i]
        let noteLi = document.createElement('li')
        noteLi.setAttribute('data-id', note.id)
        noteLi.classList.add('note')
        let notesSpanText = document.createElement('span')
        notesSpanText.textContent = note.title
        let deleteNote = document.createElement('button')
        deleteNote.textContent = 'Delete Note'
        deleteNote.id = 'deleteNote'
        noteLi.append(notesSpanText, deleteNote)
        // Highlight selected note
        if (note.id === currentSelectedNote) {
            noteLi.classList.add("selected-note");
        }
        ul.append(noteLi)
    }
    notesListContainer.append(
        ul
    );
}

function renderSelectedNote() {
    noteViewer.innerHTML = ""
    if (currentSelectedNote) {
        const selectedNote = notesList.find(
            (note) => note.id === currentSelectedNote
        );
        // Title Section
        let titleContainer = document.createElement("div");
        titleContainer.id = "titleContainer";

        let titleHeading = document.createElement("h4");
        titleHeading.textContent = "Title";

        let titleInput = document.createElement("input");
        previousTitle = selectedNote.title
        titleInput.value = selectedNote.title;
        titleInput.id = "selectedNoteTitle";

        titleContainer.append(titleHeading, titleInput);

        // Content Section
        let contentContainer = document.createElement("div");
        contentContainer.id = "contentContainer";

        let contentHeading = document.createElement("h4");
        contentHeading.textContent = "Content";

        let contentTextarea = document.createElement("textarea");
        contentTextarea.value = selectedNote.content;
        contentTextarea.id = "selectedNoteContent";
        contentTextarea.rows = 12;

        contentContainer.append(contentHeading, contentTextarea);


        //addedEvent listener for title Input and content area here
        // titleInput.addEventListener("input", handleTitleChange);
        // contentTextarea.addEventListener("input", handleContentChange)


        //last edited Section
        let lastEditedContainer = document.createElement('div')
        lastEditedContainer.id = 'lastEditedContainer'
        if (selectedNote.lastEdited !== null) {
            let editedHeading = document.createElement('h4')
            let editedText = document.createElement('p')

            const date = new Date(selectedNote.lastEdited);
            editedText.textContent = date.toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            });

            editedHeading.textContent = 'Last edited:'
            lastEditedContainer.append(editedHeading, editedText)
        }

        noteViewer.append(titleContainer, contentContainer, lastEditedContainer);
    }
    else {
        let h3 = document.createElement('h3')
        h3.textContent = 'Select a note'
        noteViewer.append(h3)
    }
}
function loadTodo() {
    notesList = JSON.parse(localStorage.getItem('notesList'))
    // console.log(notesList);
    if (!notesList) {
        notesList = []
    }
}
//render first time when app launches
loadTodo()
renderNotes()
