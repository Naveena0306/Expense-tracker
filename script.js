const balanceAmount = document.getElementById('balance-amount');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const historyList = document.getElementById('history-list');
const form = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

let transactions = [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter a valid text and amount');
        return;
    }

    const transaction = {
        id: generateID(),
        text: textInput.value,
        amount: +amountInput.value
    };

    transactions.push(transaction);
    addTransactionToHistory(transaction);
    updateValues();
    textInput.value = '';
    amountInput.value = '';
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to history list
function addTransactionToHistory(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const listItem = document.createElement('li');
    listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    listItem.innerHTML = `
        ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    historyList.appendChild(listItem);
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

// Update balance, income, and expense amounts
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0)
                          .reduce((acc, item) => (acc += item), 0)
                          .toFixed(2);
    const expense = (amounts.filter(item => item < 0)
                            .reduce((acc, item) => (acc += item), 0) * -1)
                            .toFixed(2);

    balanceAmount.innerText = total;
    incomeAmount.innerText = income;
    expenseAmount.innerText = expense;
}

// Initialize app
function init() {
    historyList.innerHTML = '';
    transactions.forEach(addTransactionToHistory);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
