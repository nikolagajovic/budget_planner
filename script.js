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
  const transactionCategoryIncome = document.querySelector('.transaction-category-income');
  const selectIncome = document.querySelector('.transaction-income');
  const selectExpense = document.querySelector('.transaction-expense');

  selectIncome.addEventListener('click', () => {
    transactionCategory.style.display = 'none';
    transactionCategoryIncome.style.display = 'flex';
    selectIncome.style.backgroundColor = 'var(--secondary-color)';
    selectExpense.style.backgroundColor = 'var(--background-color)';
  });

  selectExpense.addEventListener('click', () => {
    transactionCategory.style.display = 'flex';
    transactionCategoryIncome.style.display = 'none';
    selectExpense.style.backgroundColor = 'var(--secondary-color)';
    selectIncome.style.backgroundColor = 'var(--background-color)';
  });

});

