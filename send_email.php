<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'assets/php/PHPMailer/Exception.php';
require 'assets/php/PHPMailer/PHPMailer.php';
require 'assets/php/PHPMailer/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON input
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    if ($input) {
        $name = strip_tags(trim($input["name"]));
        $email = filter_var(trim($input["email"]), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($input["subject"]));
        $message = strip_tags(trim($input["message"]));
    } else {
        $name = strip_tags(trim($_POST["name"]));
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $subject = strip_tags(trim($_POST["subject"]));
        $message = strip_tags(trim($_POST["message"]));
    }

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please complete all fields correctly."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'pravahatest@gmail.com';
        $mail->Password = 'bhumit1710';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('pravahatest@gmail.com', 'Pravaha International Website');
        $mail->addAddress('pravahainternation@gmail.com');     // Final Recipient
        $mail->addReplyTo($email, $name); // Reply to the user who filled the form

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Contact Inquiry: $subject";
        $mail->Body = "You have received a new message from your website contact form.\n\n" .
            "Name: $name\n" .
            "Email: $email\n\n" .
            "Message:\n$message\n";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Thank you! Your message has been sent."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>