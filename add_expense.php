<?php
include 'isLogin.php';
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $category = $_POST['category'];
    $amount = $_POST['amount'];
    $uid = $_SESSION['uid'];

    $sql = "INSERT INTO expenses (date, category, amount, uid) VALUES ('$date', '$category', '$amount', '$uid')";
    if ($conn->query($sql) === TRUE) {
        echo "Expense added successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    header("Location: dashboard.php");
}

$conn->close();
?>