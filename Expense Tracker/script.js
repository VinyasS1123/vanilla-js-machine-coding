let budget = 0
let expenses = []
let currentEditingExpenseId = null
let selectedCategory = "All"

let totalBudgetInput = document.querySelector('#totalBudgetInput')
let totalBudgetBtn = document.querySelector('#totalBudgetBtn')
let budgetInfo = document.querySelector('#budgetInfo')
let addExpenseBtn = document.querySelector('#addExpense')
let expenseName = document.querySelector('#expenseName')
let expenseAmnt = document.querySelector('#expenseAmnt')
let expenseSummary = document.querySelector('#expenseSummary')
let expenseCategory = document.querySelector('#expenseCategory')

totalBudgetBtn.addEventListener('click', handleAddBudget)
addExpenseBtn.addEventListener('click', handleAddExpense)


function handleCategoryFilter(e) {
    selectedCategory = e.target.value
    render()


}

function handleExpense(e) {
    if (e.target.classList.contains('delete-btn')) {
        const tr = e.target.closest('.expense')
        const expenseId = Number(tr.getAttribute('data-id'))
        expenses = expenses.filter((exp) => exp.id !== expenseId)
        syncExpenses()
    }
    if (e.target.classList.contains('edit-btn')) {
        let expensetr = e.target.closest('.expense')
        let expenseId = Number(expensetr.dataset.id)
        currentEditingExpenseId = expenseId
        render()
    }

    //check if user clicks saveBtn or cancelBtn when edit mode
    if (e.target.id === 'save') {
        const expenseRow = e.target.closest('.expense')
        const expenseId = Number(expenseRow.dataset.id)
        const editedExpense = (expenseRow.querySelector('#editInput')).value
        const editedAmount = Number(expenseRow.querySelector('#editAmount').value)

        if (!editedExpense || !editedAmount) return
        expenses = expenses.map((exp) => {
            if (exp.id === expenseId) {
                return {
                    ...exp, description: editedExpense, amount: editedAmount
                }
            }
            return exp
        })
        currentEditingExpenseId = null
        syncExpenses()
    }
    if (e.target.id === 'cancel') {
        currentEditingExpenseId = null
        render()
    }

}

function handleAddExpense(e) {
    if (budget === 0) {
        alert('Set Total Budget')
        return
    }

    if (!expenseName.value || !expenseAmnt.value) {
        alert('Expense Fields are empty')
        return
    }
    let description = expenseName.value.trim()
    let amount = Number(expenseAmnt.value)
    if (Number.isNaN(amount)) return
    if (amount <= 0) {
        alert("Amount should be greater than 0");
        return;
    }
    if (!expenseCategory.value) {
        alert("Please select a category");
        return;
    }

    let expenseObj = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: expenseCategory.value
    }
    expenses.push(expenseObj)

    expenseName.value = ""
    expenseAmnt.value = ""
    expenseCategory.value = ""

    syncExpenses()
    // render()

}


function handleAddBudget(e) {
    let input = totalBudgetInput.value.trim()
    if (!input) return
    const budgetValue = Number(input)
    if (budgetValue < 0) {
        alert('Budget cannot be negative')
        totalBudgetInput.value = ""
        return
    }
    if (Number.isNaN(budgetValue)) return
    budget = budgetValue
    totalBudgetInput.value = ""
    localStorage.setItem('budget', JSON.stringify(budget))
    render()
}

function renderBudget() {
    if (budget === 0) {
        budgetInfo.innerHTML = ''
        return
    }
    budgetInfo.innerHTML = `
        💰 Budget: <strong>₹${budget}</strong>
    `;
}

function renderExpenses() {
    const visibleExpenses =
        selectedCategory === "All"
            ? expenses
            : expenses.filter(exp => exp.category === selectedCategory); expenseSummary.innerHTML = ''

    let table = document.createElement('table')
    let tableHead = document.createElement('thead')
    let tableBody = document.createElement('tbody')
    tableBody.id = 'expenseList'
    //add event listner
    tableBody.addEventListener('click', handleExpense)
    let headerRow = document.createElement('tr')
    // Create headings
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    // Add text
    th1.textContent = "Expense";
    th2.textContent = "Amount";
    th3.textContent = "Action";
    th4.textContent = "Category";
    // Append headings to row
    headerRow.append(th1, th2,th4,th3);

    // Append row to thead
    tableHead.append(headerRow);

    // Append thead to table
    table.append(tableHead);

    //looping expenses
    for (let expense of visibleExpenses) {
        let tableRow = document.createElement('tr')
        tableRow.dataset.id = expense.id
        tableRow.classList.add('expense')
        //if edit mode
        if (expense.id === currentEditingExpenseId) {
            let editExpenseInput = document.createElement('input')
            editExpenseInput.value = expense.description
            editExpenseInput.placeholder = 'Edit Expense'
            editExpenseInput.id = 'editInput'
            let editAmountInput = document.createElement('input')
            editAmountInput.type = 'number'
            editAmountInput.value = expense.amount
            editAmountInput.id = 'editAmount'
            let saveBtn = document.createElement('button')
            saveBtn.textContent = 'Save'
            saveBtn.id = 'save'
            let cancelBtn = document.createElement('button')
            cancelBtn.textContent = 'Cancel'
            cancelBtn.id = 'cancel'

            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            let td4 = document.createElement('td')
            td1.append(editExpenseInput)
            td2.append(editAmountInput)
            td4.append(saveBtn, cancelBtn)
            td3.append(expense.category)
            tableRow.append(td1, td2, td3,td4)
            tableBody.append(tableRow)
        }
        //normal mode
        else {
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            let td3 = document.createElement('td')
            let td4 = document.createElement('td')
            td1.textContent = expense.description
            td2.textContent = `₹${expense.amount}`
            td3.textContent = expense.category
            let deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'Delete'
            let editBtn = document.createElement('button')
            editBtn.textContent = 'Edit'
            deleteBtn.classList.add("delete-btn");
            editBtn.classList.add("edit-btn");
            td4.append(deleteBtn, editBtn)
            tableRow.append(td1, td2, td3,td4)
            tableBody.append(tableRow)
        }

    }

    table.append(tableBody)
    // Append table to the page
    expenseSummary.append(table);
}

function renderExpenseSummary() {
    // Rendering Expense Summary
    let totalExpenses = expenses.reduce((acc, exp) => {
        return acc + exp.amount;
    }, 0);

    let balance = budget - totalExpenses;

    if (expenses.length === 0) {
        expenseSummary.innerHTML = "";
        return;
    }

    // Dashboard Container
    let summary = document.createElement("div");
    summary.classList.add("summary");

    // ---------------- Total Expense Card ----------------

    let summaryCardDiv = document.createElement("div");
    summaryCardDiv.classList.add("summary-card", "total-card");

    let h3 = document.createElement("h3");
    h3.textContent = "Total Expenses";

    let p = document.createElement("p");
    p.textContent = `₹${totalExpenses}`;

    summaryCardDiv.append(h3, p);

    // ---------------- Balance Card ----------------

    let summaryCardDiv2 = document.createElement("div");
    summaryCardDiv2.classList.add("summary-card", "balance-card");

    let balanceh3 = document.createElement("h3");
    balanceh3.textContent = "Remaining Balance";

    let balancep = document.createElement("p");
    balancep.id = "balance";
    balancep.classList.add(balance < 0 ? "negative" : "positive");
    balancep.textContent = `₹${balance}`;

    summaryCardDiv2.append(balanceh3, balancep);

    // ---------------- Category Filter Card ----------------

    let categoryFilterDiv = document.createElement("div");
    categoryFilterDiv.id = "categoryFilter";

    let categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Filter by Category";

    let categoryDropdown = document.createElement("select");
    categoryDropdown.id = "filterCategory";

    const categories = [
        "All",
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Other"
    ];

    for (let category of categories) {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.append(option);
    }

    categoryDropdown.value = selectedCategory;
    categoryDropdown.addEventListener("change", handleCategoryFilter);

    categoryFilterDiv.append(categoryLabel, categoryDropdown);

    // Add ALL THREE to one flex container
    summary.append(
        summaryCardDiv,
        summaryCardDiv2,
        categoryFilterDiv
    );

    expenseSummary.append(summary);

    if (balance < 0) {
        let warning = document.createElement("p");
        warning.classList.add("warning");
        warning.textContent = `⚠ Budget exceeded by ₹${Math.abs(balance)}`;
        expenseSummary.append(warning);
    }
}

function render() {
    renderBudget()
    renderExpenses()
    renderExpenseSummary()
}

function syncExpenses() {
    localStorage.setItem('expenseList', JSON.stringify(expenses))
    render()
}

function onLoad() {
    expenses = JSON.parse(localStorage.getItem("expenseList")) || [];
    budget = JSON.parse(localStorage.getItem('budget')) || 0;
    render()
}

onLoad()