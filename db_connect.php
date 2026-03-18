<?php
$servername = "localhost";
// Default XAMPP username is "root"
$username = "root";
// Default XAMPP password is empty
$password = "";
// Replace with your database name
$dbname = "ecommerce_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
