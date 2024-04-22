<?php
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

if (!isset($email) || !isset($password)) {
    header("Location: index.html");
    exit();
}

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        session_start();
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['username'] = $user['username'];
        http_response_code(200);
        echo "Login successful.";
    } else {
        http_response_code(401);
        echo "Incorrect password.";
    }
} else {
    http_response_code(404);
    echo "User not found.";
}

$conn->close();
?>
