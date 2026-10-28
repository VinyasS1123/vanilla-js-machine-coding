let products = []
let currentPage = 1
const PAGE_SIZE = 10;
let isLoading = false
let searchQuery = ""
let category = "All"
let timerId // for debounced Search
let controller = null //for fixing race condition

let productsContainer = document.querySelector('#product-container')
let paginationContainer = document.querySelector('#pagination-container')
let statusContainer = document.querySelector('#status')
let searchBar = document.querySelector('#search')
let categoryFilter = document.querySelector('#category')
let loadingContainer = document.querySelector('#loading')



paginationContainer.addEventListener('click', handlePagination)
searchBar.addEventListener('input', handleSearchInput)
categoryFilter.addEventListener('change', handleCategoryFilter)

function handleCategoryFilter(e) {
    category = e.target.value
    currentPage = 1
    updateURL()
    loadProducts()

}
//debounced search
function handleSearchInput(e) {
    searchQuery = e.target.value.trim()
    currentPage = 1
    clearTimeout(timerId)
    timerId = setTimeout(() => {
        updateURL()
        loadProducts()
    }, 500);
}
function handlePagination(e) {
    let targetBtn = e.target
    console.log(targetBtn);
    if (targetBtn.tagName === 'SPAN') return

    else if (targetBtn.id === 'nextPage') {
        currentPage++
        updateURL()
        loadProducts()
    }
    else if (targetBtn.id === 'prevPage') {
        currentPage--
        updateURL()
        loadProducts()

    }
    else {
        // let clickedPageNo = Number(targetBtn.getAttribute('data-page'))
        let clickedPageNo = Number(targetBtn.id)
        currentPage = clickedPageNo
        updateURL()
        loadProducts()
        //does add and stays few secs when clicked until loadPRoduts fetch and render the clicked page details
        // if(clickedPageNo === currentPage) clickedPage.classList.add('active')
    }

}

// Fake Backend API
function fetchProducts(page, searchQuery = "", controller, category) {
    return new Promise((resolve) => {

        const timeoutId = setTimeout(() => {
            // Step 1: Copy entire database
            let filteredProducts = allProducts;

            // Step 2: Apply Search
            if (searchQuery !== "") {
                filteredProducts = filteredProducts.filter((product) =>
                    product.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            // Step 3: Apply Category Filter
            if (category !== "All") {
                filteredProducts = filteredProducts.filter((product) =>
                    product.category === category
                );
            }

            // Step 3: Calculate Pagination
            const startIndex = (page - 1) * PAGE_SIZE;
            const endIndex = startIndex + PAGE_SIZE;

            // Step 4: Slice only this page
            const pageProducts = filteredProducts.slice(startIndex, endIndex);

            // Step 5: Return Response
            resolve({
                products: pageProducts,
                currentPage: page,
                totalPages: Math.ceil(filteredProducts.length / PAGE_SIZE),
                totalProducts: filteredProducts.length,
                pageSize: PAGE_SIZE
            });

        }, 700);

        controller.signal.addEventListener("abort", () => {
            clearTimeout(timeoutId)
            // console.log("Aborted");
        });

    });
}

async function loadProducts() {
    try {
        if (controller) {
            controller.abort()
        }
        controller = new AbortController()
        isLoading = true
        renderLoading()
        let fetchedProducts = await fetchProducts(currentPage, searchQuery, controller, category)
        console.log(fetchedProducts);
        render(fetchedProducts)
    } catch (error) {
        console.log('Failed to Fetch Products', error);
    }
    finally{
        isLoading = false
        renderLoading()
    }
}
function updateURL() {

    const params = new URLSearchParams();

    // Always keep current page
    params.set("page", currentPage);

    // Add search only if it exists
    if (searchQuery !== "") {
        params.set("search", searchQuery);
    }

    // Add category only if it's not All
    if (category !== "All") {
        params.set("category", category);
    }

    // Update browser URL without refreshing
    history.pushState({}, "", "?" + params.toString());

}
function initializeFromURL() {

    const params = new URLSearchParams(window.location.search);

    currentPage = Number(params.get("page")) || 1;

    searchQuery = params.get("search") || "";

    category = params.get("category") || "All";

    // Update UI
    searchBar.value = searchQuery;
    categoryFilter.value = category;

}

// { products: Array(10), currentPage: 1, totalPages: 30, totalProducts: 300, pageSize: 10 }

function render(fetchedProducts) {
    if (fetchedProducts.products.length === 0) {
        renderStatusMsg("No products found.")
        return
    }
    statusContainer.innerHTML = ''
    renderProducts(fetchedProducts)
    renderPaginationButtons(fetchedProducts)
}

function renderProducts(fetchedProducts) {
    const products = fetchedProducts.products
    const totalPages = fetchedProducts.totalPages
    const totalProducts = fetchedProducts.totalProducts
    let currentPage = fetchedProducts.currentPage

    productsContainer.innerHTML = ''
    products.forEach((prod) => {
        let productCard = document.createElement('div')
        productCard.classList.add('productCard')
        let productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.id = prod.id
        let prodCategorySpan = document.createElement('span')
        prodCategorySpan.textContent = prod.category
        let prodTitleSpan = document.createElement('span')
        prodTitleSpan.textContent = prod.title
        let prodPriceSpan = document.createElement('span')
        prodPriceSpan.textContent = `₹${prod.price}`;
        productDiv.append(prodCategorySpan, prodTitleSpan, prodPriceSpan)
        productCard.append(productDiv)
        productsContainer.append(productCard)
    })
}

function renderPaginationButtons(fetchedProducts) {
    const totalPages = fetchedProducts.totalPages
    paginationContainer.innerHTML = ''
    //Render Pagination Buttons
    let nextButton = document.createElement('button')
    nextButton.textContent = 'Next'
    nextButton.id = 'nextPage'
    let previousButton = document.createElement('button')
    previousButton.textContent = 'Previous'
    previousButton.id = 'prevPage'

    paginationContainer.append(previousButton)

    //rendering buttons from 1 to totalPages
    // let pageBtnContainer = document.createElement('div')
    // pageBtnContainer.classList.add('pageBtns')
    // for (let i = 1; i <= fetchedProducts.totalPages; i++) {
    //     let pageButton = document.createElement('button')
    //     pageButton.textContent = i
    //     pageButton.dataset.page = i
    //     if (i === fetchedProducts.currentPage) {
    //         pageButton.classList.add("active");
    //     }
    //     pageBtnContainer.append(pageButton)

    // }

    //fixing pagination when user searches
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            let pageButton = document.createElement('button')
            pageButton.textContent = i
            pageButton.id = i
            if (i === currentPage) pageButton.classList.add('active')
            paginationContainer.append(pageButton)

        }
    }
    else {
        //we render only required button ellpisis pagination
        //check beginning
        if (currentPage <= 5) {
            for (let i = 1; i <= 5; i++) {
                let pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.id = i
                if (i === currentPage) {
                    pageButton.classList.add('active')
                }
                paginationContainer.append(pageButton)
            }
            // render middle dots 
            let startGapContent = document.createElement('span')
            startGapContent.textContent = '...'

            paginationContainer.append(startGapContent)


            //render last button
            let lastPageBtn = document.createElement('button')
            lastPageBtn.textContent = totalPages
            lastPageBtn.id = totalPages
            paginationContainer.append(lastPageBtn)

        }
        //check middle
        else if (currentPage > 5 && currentPage < totalPages - 4) {
            // page == 6  1...4 5 6 7 8....30

            //render first page i.e---1 
            let firstPageBtn = document.createElement('button')
            firstPageBtn.textContent = 1
            firstPageBtn.id = 1
            paginationContainer.append(firstPageBtn)


            //render ......
            let startGapContent = document.createElement('span')
            startGapContent.textContent = '...'
            paginationContainer.append(startGapContent)

            //render middle buttons
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                let pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.id = i
                if (i === currentPage) {
                    pageButton.classList.add('active')
                }
                paginationContainer.append(pageButton)
            }


            //render ......
            let endDotContent = document.createElement('span')
            endDotContent.textContent = '...'
            paginationContainer.append(endDotContent)


            //render last button
            let lastPageBtn = document.createElement('button')
            lastPageBtn.textContent = totalPages
            lastPageBtn.id = totalPages
            paginationContainer.append(lastPageBtn)
        }
        // page 28:   1.....26 27 28 29 30
        else if (currentPage >= totalPages - 4) {
            //render first page i.e---1 
            let firstPageBtn = document.createElement('button')
            firstPageBtn.textContent = 1
            firstPageBtn.id = 1
            paginationContainer.append(firstPageBtn)

            //render ......
            let gapContentSpan = document.createElement('span')
            gapContentSpan.textContent = '...'
            paginationContainer.append(gapContentSpan)


            //render last pages
            for (let i = totalPages - 4; i <= totalPages; i++) {
                let pageButton = document.createElement('button')
                pageButton.textContent = i
                pageButton.id = i
                if (i === currentPage) {
                    pageButton.classList.add('active')
                }
                paginationContainer.append(pageButton)
            }
        }
    }
    paginationContainer.append(nextButton)

    //disable prev button 
    if (fetchedProducts.currentPage === 1) {
        previousButton.disabled = true
    }
    else if (fetchedProducts.currentPage === fetchedProducts.totalPages) {
        nextButton.disabled = true
    }
}


function renderStatusMsg(msg) {
    statusContainer.innerHTML = ''
    productsContainer.innerHTML = ''
    paginationContainer.innerHTML = ''
    let p = document.createElement('p')
    p.textContent = msg
    statusContainer.append(p)
}

function renderLoading(){
    if(isLoading) {
        loadingContainer.style.display = 'inline-block'
        return 
    }
    else loadingContainer.style.display = 'none'

}


//inital load
initializeFromURL()
loadProducts()