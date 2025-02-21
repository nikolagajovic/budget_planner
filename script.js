document.addEventListener('DOMContentLoaded', () => {
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

    if (selectedType === 'income') {
      totalIncome += amount;
      incomeAmountLabel.innerHTML = `${totalIncome} <span class="dollar">$</span>`;
      categoryAmounts.income.innerHTML = `${totalIncome} <span>$</span>`;
    } else {
      totalExpenses += amount;
      expensesAmountLabel.innerHTML = `${totalExpenses} <span class="dollar">$</span>`;

      const selectedCategory = categorySelect.value;
      if (categoryAmounts[selectedCategory]) {
        const currentAmount = parseFloat(categoryAmounts[selectedCategory].textContent) || 0;
        categoryAmounts[selectedCategory].innerHTML = `${currentAmount + amount} <span>$</span>`;
      }
    }

    // Ažuriramo preostali budžet
    const remaining = totalIncome - totalExpenses;
    leftAmountLabel.innerHTML = `${remaining} <span class="dollar">$</span>`;

    // Resetujemo polje unosa
    transactionAmountInput.value = '';
  });


});



