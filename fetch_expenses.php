<?php
include 'isLogin.php';
include 'db.php';

$query = "SELECT * FROM expenses WHERE uid={$_SESSION['uid']}";
$result = mysqli_query($conn, $query);

$expenses = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $expenses[] = $row;
    }
}

echo json_encode($expenses);

mysqli_close($conn);
?>
