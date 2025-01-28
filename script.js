document.addEventListener('DOMContentLoaded', () => {
  const openNewTransactionBtn = document.getElementById('openNewTransactionBtn');
  const newTransaction = document.getElementById('newTransaction');
  const closeBtn = document.querySelector('.btn-transaction-close');

  openNewTransactionBtn.addEventListener('click', () => {
    newTransaction.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    newTransaction.style.display = 'none';
  });

  const transactionCategory = document.querySelector('.transaction-category');
  const addIncome = document.querySelector('.transaction-income');
  const addExpense = document.querySelector('.transaction-expense');

  addIncome.addEventListener('click', () => {
    transactionCategory.style.display = 'none';
    addIncome.style.backgroundColor = 'var(--secondary-color)';
    addExpense.style.backgroundColor = 'var(--background-color)';
  });

  addExpense.addEventListener('click', () => {
    transactionCategory.style.display = 'flex';
    addExpense.style.backgroundColor = 'var(--secondary-color)';
    addIncome.style.backgroundColor = 'var(--background-color)';
  });

});

