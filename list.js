const transactionList = document.querySelector('.transaction-list');
const prevBtn = document.createElement('button');
const nextBtn = document.createElement('button');
const pageIndicator = document.createElement('span');

let budgetData;

try {
  budgetData = JSON.parse(localStorage.getItem('budgetData')) || { transactions: [] };
} catch (error) {
  console.error("Error parsing budgetData from localStorage:", error);
  budgetData = { transactions: [] };
}

const transactions = budgetData.transactions || [];
prevBtn.textContent = 'Previous page';
nextBtn.textContent = 'Next page';
prevBtn.classList.add('pagination-btn', 'prev-btn');
nextBtn.classList.add('pagination-btn', 'next-btn');
prevBtn.style.display = 'none';
pageIndicator.style.margin = '0 10px';
transactionList.after(prevBtn, pageIndicator, nextBtn);

let currentPage = 1;
const itemsPerPage = 4;
const totalPages = Math.ceil(transactions.length / itemsPerPage);

function updatePage() {
  transactionList.innerHTML = '';

  if (transactions.length === 0) {
    transactionList.innerHTML = '<div>No transactions found</div>';
    pageIndicator.style.display = 'none';
  } else {
    pageIndicator.style.display = 'inline-block';
  }


const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;
const currentTransactions = transactions.slice(start, end);

currentTransactions.forEach((e) => {
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

pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

prevBtn.style.display = currentPage > 1 ? 'inline-block' : 'none';
nextBtn.style.display = currentPage < totalPages ? 'inline-block' : 'none';

}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    updatePage();
  }
});

updatePage();
