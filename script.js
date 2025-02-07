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


  let totalIncome = 0;
  let totalExpense = 0;
  let selectedType = 'income';

  const addIncomeBtn = document.querySelector('.transaction-income');


  // kad kliknemo na dugme "income", postavljam oda je selektovan prihod
  addIncomeBtn.addEventListener('click', () => {
    selectedType = 'income';
    transactionCategory.style.display = 'none';
    transactionCategoryIncome.style.display = 'flex';
  });

  // kad kliknemo na dugme "expense", postavljam oda je selektovan rashod 
  addExpenseBtn.addEventListener('click', () => {
    selectedType = 'expense';
    transactionCategory.style.display = 'flex';
    transactionCategoryIncome.style.display = 'none';
  });

});
