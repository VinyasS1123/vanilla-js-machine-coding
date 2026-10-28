const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" }
];
let searchQuery = ""

let userContainer = document.querySelector('#usersContainer')
let searchBar = document.querySelector('#search')
let clearSearch = document.querySelector('#clear')

searchBar.addEventListener('input', handleSearchQuery)
clearSearch.addEventListener('click', handleClearSearch)


function handleClearSearch(e) {
    searchQuery = ""
    searchBar.value = ""
    render()
}
function handleSearchQuery(e) {
    searchQuery = e.target.value.trim()
    render()
}

function render() {
    userContainer.innerHTML = ''
    let filteredUsers = users
    if (searchQuery !== "") {
        clearSearch.classList.remove("hidden");
        filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        if (filteredUsers.length === 0) {
            let h4 = document.createElement('h4')
            h4.textContent = 'No matching users found.'
            userContainer.append(h4)
            return
        }
    }
    else clearSearch.classList.add('hidden')

    let userUl = document.createElement('ul')
    for (let user of filteredUsers) {
        let name = user.name

        let userLi = document.createElement('li')
        userLi.dataset.id = user.id
        //or else it is gonna render empty match 
        if (searchQuery) {
            const index = name.toLowerCase().indexOf(searchQuery.toLowerCase())
            const before = name.slice(0, index)
            const match = name.slice(index, index + searchQuery.length)
            const after = name.slice(index + searchQuery.length)
            userLi.innerHTML = `${before}<span class="highlight">${match}</span>${after}`
        }
        else userLi.textContent = user.name


        userUl.append(userLi)
    }
    userContainer.append(userUl)
}

render()  