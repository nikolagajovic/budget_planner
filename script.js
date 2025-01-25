document.addEventListener('DOMContentLoaded', function() {
const openNewTransactionBtn = document.getElementById('openNewTransactionBtn');
const newTransaction = document.getElementById('newTransaction');
const closeBtn = document.getElementsByClassName('close-btn')[0];

openNewTransactionBtn.onclick = function () {
    newTransaction.style.display = 'block';
};

closeBtn.onclick = function() {
    newTransaction.style.display = 'none';
  };

});