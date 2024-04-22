<?php
include 'db.php';

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    http_response_code(400);
    echo "Username already exists.";
} else {
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$hashed_password')";
    if ($conn->query($sql) === TRUE) {
        echo "User registered successfully.";
    } else {
        http_response_code(500);
        echo "Error registering user: " . $conn->error;
    }
}

$conn->close();
?>