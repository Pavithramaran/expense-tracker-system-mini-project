var allExpenses = [];

function fetchExpenses() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_expenses.php", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            allExpenses = JSON.parse(xhr.responseText);
            console.log(allExpenses);
            displayExpenses(allExpenses);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error(xhr.responseText);
        }
    };
    xhr.send();
}

function displayExpenses(expenses) {
    var expenseTableBody = document.getElementById("expense_table_body");
    expenseTableBody.innerHTML = "";

    expenses.forEach(function(expense) {
        var row = document.createElement("tr");

        var dateCell = document.createElement("td");
        dateCell.textContent = expense.date;
        row.appendChild(dateCell);

        var categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;
        row.appendChild(categoryCell);

        var amountCell = document.createElement("td");
        amountCell.textContent = "₹" + expense.amount;
        row.appendChild(amountCell);

        var deleteButtonCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function() {
            deleteExpense(expense.expid);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        expenseTableBody.appendChild(row);
    });
}

function filterExpensesByCategory(expenses, substring) {
    var filteredExpenses = [];
    for (var i = 0; i < expenses.length; i++) {
        if (expenses[i].category.includes(substring)) {
            filteredExpenses.push(expenses[i]);
        }
    }
    return filteredExpenses;
}

function filterByDate(expenses, startDate, endDate) {
    var filteredExpenses = [];
    for (var i = 0; i < expenses.length; i++) {
        if (expenses[i].date >= startDate && expenses[i].date <= endDate) {
            filteredExpenses.push(expenses[i]);
        }
    }
    return filteredExpenses;
}

function mergeSortByAmount(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortByAmount(arr.slice(0, mid));
    const right = mergeSortByAmount(arr.slice(mid));
    return mergeByAmount(left, right);
}

function mergeByAmount(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (parseFloat(left[leftIndex].amount) <= parseFloat(right[rightIndex].amount)) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function quickSortByDate(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivotDate = arr[pivotIndex].date;
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) {
            continue;
        }
        if (arr[i].date < pivotDate) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSortByDate(left), arr[pivotIndex], ...quickSortByDate(right)];
}

function mergeByDateAndAmount(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (new Date(left[leftIndex].date) < new Date(right[rightIndex].date)) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else if (new Date(left[leftIndex].date) > new Date(right[rightIndex].date)) {
            result.push(right[rightIndex]);
            rightIndex++;
        } else {
            if (parseFloat(left[leftIndex].amount) <= parseFloat(right[rightIndex].amount)) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function mergeSortByDateAndAmount(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSortByDateAndAmount(arr.slice(0, mid));
    const right = mergeSortByDateAndAmount(arr.slice(mid));

    return mergeByDateAndAmount(left, right);
}

function deleteExpense(expenseId) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "delete_expense.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            fetchExpenses();
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error(xhr.responseText);
        }
    };
    xhr.send("id=" + expenseId);
}


function addExpense() {
    var date = document.getElementById("expense_date").value;
    var category = document.getElementById("expense_category").value;
    var amount = document.getElementById("expense_amount").value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "add_expense.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            fetchExpenses();
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.error(xhr.responseText);
        }
    };
    xhr.send("date=" + date + "&category=" + category + "&amount=" + amount);
}

function filterExpenses() {
    var startDate = document.getElementById("start_date").value;
    var endDate = document.getElementById("end_date").value;
    var category = document.getElementById("filter_category").value;
    var sortAmount = document.getElementById("sort_amount").checked;
    var sortDate = document.getElementById("sort_date").checked;

    var filteredExpenses = allExpenses;

    if (startDate && endDate) {
        filteredExpenses = filterByDate(filteredExpenses, startDate, endDate);
    }
    if (category) {
        filteredExpenses = filterExpensesByCategory(filteredExpenses, category);
    }

    if (sortAmount && sortDate) {
        filteredExpenses = mergeSortByDateAndAmount(filteredExpenses);
    }

    else if (sortAmount && !sortDate) {
        filteredExpenses = mergeSortByAmount(filteredExpenses);
    }

    else if (sortDate && !sortAmount) {
        filteredExpenses = quickSortByDate(filteredExpenses);
    }

    displayExpenses(filteredExpenses);
}

fetchExpenses();