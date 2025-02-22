const openNewTransactionBtn = document.getElementById('openNewTransactionBtn');
const newTransaction = document.getElementById('newTransaction');
const closeBtn = document.querySelector('.btn-transaction-close');
const addIncomeBtn = document.querySelector('.transaction-income');
const addExpenseBtn = document.querySelector('.transaction-expense');
const transactionCategory = document.querySelector('.transaction-category');
const transactionCategoryIncome = document.querySelector('.transaction-category-income');
const saveTransactionBtn = document.querySelector('.btn-transaction-save');
const transactionAmountInput = document.querySelector('.transaction-amount-input');
const categorySelect = document.querySelector('.category');
const incomeAmountLabel = document.querySelector('.income-amount');
const expensesAmountLabel = document.querySelector('.expenses-amount');
const leftAmountLabel = document.querySelector('.left-amount');
const transactionNoteInput = document.querySelector(".transaction-note");
const categoryAmounts = {
  shopping: document.querySelector('.cat-shopping-amount'),
  food: document.querySelector('.cat-food-amount'),
  drinks: document.querySelector('.cat-drinks-amount'),
  entertainment: document.querySelector('.cat-entertainment-amount'),
  income: document.querySelector('.cat-income-amount')
};
let totalIncome = 0;
let totalExpenses = 0;
let selectedType = 'income';

// funkcija za ucitavanje podataka iz localStorage i azuriranje prikaza
function loadBudgetData() {
  try {
    const storedData = JSON.parse(localStorage.getItem('budgetData'));
    if (storedData) {
      totalIncome = storedData.totalIncome || 0;
      totalExpenses = storedData.totalExpenses || 0;
      incomeAmountLabel.innerHTML = `${totalIncome} <span class="dollar">$</span>`;
      expensesAmountLabel.innerHTML = `${totalExpenses} <span class="dollar">$</span>`;
      leftAmountLabel.innerHTML = `${storedData.remaining || 0} <span class="dollar">$</span>`;

      if (storedData.categoryTotals) {
        categoryAmounts.income.innerHTML = `${storedData.categoryTotals.income || 0} <span>$</span>`;
        categoryAmounts.shopping.innerHTML = `${storedData.categoryTotals.shopping || 0} <span>$</span>`;
        categoryAmounts.food.innerHTML = `${storedData.categoryTotals.food || 0} <span>$</span>`;
        categoryAmounts.drinks.innerHTML = `${storedData.categoryTotals.drinks || 0} <span>$</span>`;
        categoryAmounts.entertainment.innerHTML = `${storedData.categoryTotals.entertainment || 0} <span>$</span>`;
      }
    }
  } catch (error) {
    console.error("Error loading budget data:", error);
  }
}

// ucitavanje podataka pri ucitavanju stranice
loadBudgetData();

openNewTransactionBtn.addEventListener('click', () => {
  newTransaction.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  newTransaction.style.display = 'none';
});


// kad kliknemo na dugme "income", postavljam oda je selektovan prihod
addIncomeBtn.addEventListener('click', () => {
  selectedType = 'income';
  transactionCategory.style.display = 'none';
  transactionCategoryIncome.style.display = 'flex';
});

// kad kliknemo na dugme "expense", postavljamo da je selektovan trosak 
addExpenseBtn.addEventListener('click', () => {
  selectedType = 'expense';
  transactionCategory.style.display = 'flex';
  transactionCategoryIncome.style.display = 'none';
});

saveTransactionBtn.addEventListener('click', () => {
  const amount = parseFloat(transactionAmountInput.value);
  if (isNaN(amount) || amount <= 0) return;
  const note = transactionNoteInput.value;

  const transaction = {
    amount,
    type: selectedType,
    category: selectedType === 'income' ? "income" : categorySelect.value,
    note,
    data: new Date().toISOString()
  };

  if (selectedType === 'income') {
    totalIncome += amount;
    incomeAmountLabel.innerHTML = `${totalIncome} <span class="dollar">$</span>`;
    categoryAmounts.income.innerHTML = `${totalIncome} <span>$</span>`;
  } else {
    totalExpenses += amount;
    expensesAmountLabel.innerHTML = `${totalExpenses} <span class="dollar">$</span>`;

    // kreiramo ovjekat transakcije
    const selectedCategory = categorySelect.value;
    if (categoryAmounts[selectedCategory]) {
      const currentAmount = parseFloat(categoryAmounts[selectedCategory].textContent) || 0;
      categoryAmounts[selectedCategory].innerHTML = `${currentAmount + amount} <span>$</span>`;
    }
  }

  // Ažuriramo preostali budžet
  const remaining = totalIncome - totalExpenses;
  leftAmountLabel.innerHTML = `${remaining} <span class="dollar">$</span>`;

  let storedData = JSON.parse(localStorage.getItem('budgetData')) || {
    totalIncome: 0,
    totalExpenses: 0,
    remaining: 0,
    categoryTotals: {},
    transactions: []
  };

  storedData.totalIncome = totalIncome;
  storedData.totalExpenses = totalExpenses;
  storedData.remaining = remaining;
  storedData.categoryTotals = {
    income: parseFloat(categoryAmounts.income.textContent) || 0,
    shopping: parseFloat(categoryAmounts.shopping.textContent) || 0,
    food: parseFloat(categoryAmounts.food.textContent) || 0,
    drinks: parseFloat(categoryAmounts.drinks.textContent) || 0,
    entertainment: parseFloat(categoryAmounts.entertainment.textContent) || 0
  };
  storedData.transactions = storedData.transactions || [];
  storedData.transactions.push(transaction);

  // cuvanje podataka u localStorage-u
  localStorage.setItem('budgetData', JSON.stringify(storedData));

  // Resetujemo input polje unosa
  transactionAmountInput.value = "";
  transactionNoteInput.value = "";
  newTransaction.style.display = "none";
});






