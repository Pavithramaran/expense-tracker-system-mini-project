<?php
include 'isLogin.php';
include 'db.php';

if (isset($_POST['id'])) {
    $expenseId = mysqli_real_escape_string($conn, $_POST['id']);

    $stmt = $conn->prepare("DELETE FROM expenses WHERE expid = ?");
    $stmt->bind_param("i", $expenseId);

    if ($stmt->execute()) {
        echo "Expense deleted successfully";
    } else {
        echo "Error deleting expense";
    }

    $stmt->close();
} else {
    echo "Expense ID not provided";
}

mysqli_close($conn);
?>
