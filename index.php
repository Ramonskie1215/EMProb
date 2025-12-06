<?php

// Recipient email address
$to = 'recipient@example.com';

// Subject of the email
$subject = 'Website Direct Mail Test';

// The message content (plain text or HTML)
$message = 'Hello! This email was sent directly by the website server using the PHP mail() function.';

// Headers are crucial for specifying 'From' address and content type
$headers = 'From: Webmaster <noreply@yourdomain.com>' . "\r\n" .
           'Reply-To: Webmaster <noreply@yourdomain.com>' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Use the mail() function
if (mail($to, $subject, $message, $headers)) {
    echo "✅ Email successfully sent using the server's local mail system.";
} else {
    echo "❌ Email sending failed.";
}

?>
