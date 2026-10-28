// startIndex = (currentPage - 1)*pageSize
// endIndex = start + pageSize

// Loading Spinner
// No More Products
// Search
// Category Filter
// Empty State
// Debounced Search 

let products = []; // Products currently rendered on screen
let currentPage = 1;
let isLoading = false;
let hasMoreData = true;
const PAGE_SIZE = 10;
let searchQuery = ""
let category = "All"

const productsContainer = document.querySelector('#productsContainer')
const loading = document.querySelector('#loading')
const searchBar = document.querySelector('#searchInput')
const categoryFilter = document.querySelector('#categoryFilter')



let searchTimer
let canRun = true

window.addEventListener('scroll', handleScroll);
searchBar.addEventListener('input', handleSearchInput)
categoryFilter.addEventListener('change',handleCategoryChange)

function handleCategoryChange(e) {
    category = e.target.value
    renderProducts(products)
}

function handleScroll() {
    //in real applications we disable scroll in search mode
    if(searchQuery) return 
    if (!canRun) return
    //true 
    canRun = false
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const totalPageHeight = document.documentElement.scrollHeight;

    if (scrollPosition + viewportHeight >= totalPageHeight - 200) {
        loadProducts()
    }
    setTimeout(() => {
        canRun = true
    }, 100);

}

function handleSearchInput(e) {
    searchQuery = e.target.value.trim().toLowerCase()
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
        handleSearch()
    }, 300);
}

function handleSearch() {
    renderProducts(products)
}

// fake backend api we created
function fetchProducts(currentPage) {
    return new Promise((resolve) => {
        setTimeout(() => {

            const startIndex = (currentPage - 1) * PAGE_SIZE;
            const endIndex = startIndex + PAGE_SIZE;

            const fetchedProducts = allProducts.slice(startIndex, endIndex);
            resolve(fetchedProducts);

        }, 1000);
    });
}

async function loadProducts() {
    if (isLoading || !hasMoreData) return
    try {
        isLoading = true
        renderLoading()
        const fetchedProducts = await fetchProducts(currentPage)
        if (fetchedProducts.length === 0) {
            isLoading = false
            hasMoreData = false
            renderLoading()
            return
        }
        products.push(...fetchedProducts)
        currentPage++
        //we need to render only fetchedProducts when user scrolls till bottom of page
        renderProducts(products)
    } catch (error) {
        console.log('Failed to fetch products', error);
    }
    finally {
        isLoading = false // coz there was error in fetching products from backend or DB  or even after render is completed
        renderLoading()
    }
}

function renderProducts(products) {
    let filteredProducts = products
    if (searchQuery !== "") {
        filteredProducts = filteredProducts.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
        if (filteredProducts.length === 0) {
            renderStatus()
        }
        else renderLoading()
    }
    if(category!=='All') {
        filteredProducts = filteredProducts.filter((prod)=>prod.category === category)
        if(filteredProducts.length===0) renderStatus()
        
    }
    productsContainer.innerHTML = ''
    for (let prod of filteredProducts) {
        let productCard = document.createElement('div')
        productCard.classList.add('productCards')
        let prodCategory = document.createElement('span')
        prodCategory.textContent = prod.category
        let prodTitle = document.createElement('p')
        prodTitle.classList.add('prod-title')
        prodTitle.textContent = prod.title
        let prodPrice = document.createElement('span')
        prodPrice.classList.add('prod-price')
        prodPrice.textContent = `₹${prod.price}`
        let prodPara = document.createElement('p')
        prodPara.id = prod.id
        prodPara.classList.add('product')
        prodPara.append(prodCategory,prodTitle, prodPrice)
        productCard.append(prodPara)
        productsContainer.append(productCard)
    }
}


function renderLoading() {
    if (isLoading) {
        loading.style.display = 'block'
        loading.textContent = 'Loading more products...'
    }
    else if (!hasMoreData) {
        loading.style.display = 'block'
        loading.textContent = 'No More Products...'
    }
    else loading.style.display = 'none'
}

function renderStatus() {
    loading.style.display = 'block'
    loading.textContent = 'Search not found'
}


loadProducts() //initial trigger