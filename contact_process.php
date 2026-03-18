<?php
include 'db_connect.php';

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Security practice: Escape special characters in string for use in SQL statement
    // to prevent basic SQL injection
    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $subject = $conn->real_escape_string($subject);
    $message = $conn->real_escape_string($message);

    $sql = "INSERT INTO contacts (name, email, subject, message)
            VALUES ('$name', '$email', '$subject', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
