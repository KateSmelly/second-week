"use strict";
var TransactionType;
(function (TransactionType) {
  TransactionType["Income"] = "\u0414\u043E\u0445\u043E\u0434";
  TransactionType["Expense"] = "\u0420\u0430\u0441\u0445\u043E\u0434";
})(TransactionType || (TransactionType = {}));
class FinanceTracker {
  constructor() {
    this.transactions = [];
    this.loadFromLocalStorage();
  }
  addTransaction(newTransaction) {
    this.transactions.push(newTransaction);
    this.saveToLocalStorage();
    this.render();
  }
  removeTransactions(removedID) {
    let updatedTransactions = [];
    for (let transaction of this.transactions) {
      if (transaction.id !== removedID) {
        updatedTransactions.push(transaction);
      }
    }
    this.transactions = updatedTransactions;
    this.saveToLocalStorage();
    this.render();
  }
  getBalance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      if (transaction.type === TransactionType.Income) {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }
    return balance;
  }
  getTransaction() {
    return this.transactions;
  }
  saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }
  loadFromLocalStorage() {
    const data = localStorage.getItem("transactions");
    if (data) {
      const parsedData = JSON.parse(data);
      for (let transaction of parsedData) {
        transaction.date = new Date(transaction.date);
      }
      this.transactions = parsedData;
      this.render();
    }
  }
  render() {
    const balanceElement = document.getElementById("balance");
    const transactionsElement = document.getElementById("transactions");
    if (!balanceElement || !transactionsElement) return;
    balanceElement.textContent = formatCurrency(this.getBalance());
    transactionsElement.innerHTML = "";
    for (let transaction of this.transactions) {
      const li = document.createElement("li");
      li.className = "transaction-item";
      li.innerHTML = `
                  <p>
                    <b>${transaction.description}:</b>  ${formatCurrency(
        transaction.amount
      )}
                      (${
                        transaction.type
                      }) - ${transaction.date.toLocaleDateString()}
                  </p>
                    <button onclick="removeTransaction(${
                      transaction.id
                    })">Удалить</button>
                `;
      transactionsElement.appendChild(li);
    }
  }
}
let CurrentTracker = new FinanceTracker();
function formatCurrency(balance) {
  return `${balance.toFixed(2)} руб.`;
}
function addTransactionButton() {
  const descriptionElement = document.getElementById("description");
  const amountElement = document.getElementById("amount");
  const typeElement = document.getElementById("type");
  if (!descriptionElement || !amountElement || !typeElement) return;
  const description = descriptionElement.value;
  const amount = parseFloat(amountElement.value);
  const type = typeElement.value;
  if (!description || isNaN(amount)) {
    alert("Введите корректные данные.");
    return;
  }
  const transaction = {
    id: Date.now(),
    amount: amount,
    type: type,
    description: description,
    date: new Date(),
  };
  CurrentTracker.addTransaction(transaction);
  descriptionElement.value = "";
  amountElement.value = "";
}
function removeTransactions(removedID) {
  CurrentTracker.removeTransactions(removedID);
}
