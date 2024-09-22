let expenses = [];
let totalAmount = 0;
let earliestDate = null;
let latestDate = null;

const descriptionInput = document.getElementById("description-input");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");
const totalDaysCell = document.createElement("td");

function updateTotalDays() {
  if (expenses.length > 1) {
    const firstDate = new Date(earliestDate);
    const lastDate = new Date(latestDate);
    const timeDiff = Math.abs(lastDate - firstDate);
    const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
    totalDaysCell.textContent = `Total Days: ${totalDays}`;
  } else {
    totalDaysCell.textContent = "";
  }
}

addBtn.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (description === "") {
    alert("Please enter a description");
    return;
  }
  if (amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  if (date === "") {
    alert("Please select a date");
    return;
  }

  const expense = { description, amount, date };
  expenses.push(expense);

  totalAmount += amount;
  totalAmountCell.textContent = totalAmount;

  if (!earliestDate || new Date(date) < new Date(earliestDate)) {
    earliestDate = date;
  }
  if (!latestDate || new Date(date) > new Date(latestDate)) {
    latestDate = date;
  }
  updateTotalDays(); 

  const newRow = expensesTableBody.insertRow();
  const descriptionCell = newRow.insertCell();
  const amountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    expenses.splice(expenses.indexOf(expense), 1);

    totalAmount -= expense.amount;
    totalAmountCell.textContent = totalAmount;

    expensesTableBody.removeChild(newRow);

    if (expenses.length === 0) {
      earliestDate = null;
      latestDate = null;
    } else {
      earliestDate = Math.min(...expenses.map((e) => new Date(e.date)));
      latestDate = Math.max(...expenses.map((e) => new Date(e.date)));
    }
    updateTotalDays();
  });

  descriptionCell.textContent = expense.description;
  amountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;
  deleteCell.appendChild(deleteBtn);
});

const footerRow = expensesTableBody.parentElement.createTFoot().insertRow();
footerRow.appendChild(totalDaysCell);
