const transactionList = document.querySelector('.transaction-list');

if (!transactionList) {
  console.log('No transaction list found');
}

let budgetData;
try {
    budgetData = JSON.parse(localStorage.getItem('budgetData')) || {transactions: []};
} catch (error) {
    console.error("Error parsing budgetData from localStorage:", error);
    budgetData = { transactions: [] };  
}

const transactions = budgetData.transactions || [];

if (transactions.length === 0) {
  transactionList.innerHTML = '<div>No transactions found.</div>';
}

transactions.forEach((e) => {
    const transactionDiv = document.createElement('div');
    transactionDiv.classList.add('transaction-item');
    transactionDiv.innerHTML = `
      <p><strong>${e.type === 'income' ? 'Income' : 'Expense'}</strong></p>
      <p>Amount: ${e.amount} $</p>
      <p>Category: ${e.category}</p>
      <p>Note: ${e.note}</p>
      <p><em>${new Date(e.date).toLocaleString()}</em></p>
    `;
    transactionList.appendChild(transactionDiv);


});