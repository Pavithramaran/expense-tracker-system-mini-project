<?php
session_start();

if (!isset($_SESSION['username']) || (!isset($_SESSION['uid']))) {
    header("Location: logout.php");
    exit();
}
?>