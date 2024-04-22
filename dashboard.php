<?php
include 'isLogin.php';

include 'db.php';

$uid = $_SESSION['uid'];
$sql = "SELECT * FROM expenses WHERE uid='$uid'";
$result = $conn->query($sql);

if (!$result) {
    echo "Error executing query: " . $conn->error;
    exit();
}

$expenses = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Tracker - Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container c2">
        <h1 class="title">Welcome to Your Expense Dashboard, <?php echo $_SESSION['username']; ?></h1>
        <div class="dashboard">
            <h2>Your Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th colspan="6">Add Expense</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label for="expense_date">Date:</label></td>
                        <td><input type="date" name="date" id="expense_date" class="short-input"></td>
                        <td><label for="expense_category">Category:</label></td>
                        <td><input type="text" name="category" id="expense_category" class="short-input"></td>
                        <td><label for="expense_amount">Amount:</label></td>
                        <td><input type="number" name="amount" id="expense_amount" class="short-input"></td>
                        <td colspan="2"><button type="button" onclick="addExpense()">Add Expense</button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="6">Filter Expenses</th>
                    </tr>
                    <tr>
                        <td><label for="start_date">Start Date:</label></td>
                        <td><input type="date" name="start_date" id="start_date" class="short-input"></td>
                        <td><label for="end_date">End Date:</label></td>
                        <td><input type="date" name="end_date" id="end_date" class="short-input"></td>
                        <td><label for="filter_category">Category:</label></td>
                        <td><input type="text" name="category" id="filter_category" class="short-input"></td>
                        <td>
                            <input type="checkbox" id="sort_amount"> <label for="sort_amount">Sort by Amount</label>
                            <br>
                            <input type="checkbox" id="sort_date"> <label for="sort_date">Sort by Date</label>
                        </td>
                        <td><button type="button" onclick="filterExpenses()">Filter</button></td>
                    </tr>
                </tfoot>
            </table>

            <table id="expense_table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="expense_table_body">
                </tbody>
            </table>
        </div>
        <form action="logout.php" method="post">
            <button type="submit">Logout</button>
        </form>
    </div>

    <script src="user.js"></script>
</body>
</html>