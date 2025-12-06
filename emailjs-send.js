// emailjs-send.js
// Separate file – only contains the EmailJS sending logic

(function () {
    // Initialise EmailJS with your public key
    emailjs.init('tHKZ6zQi1nyxPr4hA');

    // Exposed function that the main page will call
    window.sendVerificationEmail = function (recipientEmail, confirmationLink) {
        const templateParams = {
            to_email: recipientEmail,
            confirmation_link: confirmationLink
        };

        // Replace these with your actual Service ID & Template ID
        const serviceID = 'default_service';          // ← change if you have a custom one
        const templateID = 'template_ec6jkkf';         // ← your template that has {{confirmation_link}} and {{to_email}}

        emailjs.send(serviceID, templateID, templateParams)
            .then(function (response) {
                console.log('Verification email sent successfully!', response.status, response.text);
            }, function (error) {
                console.error('Failed to send verification email:', error);
                // Optional: show user a friendly message
                alert('Could not send verification email. Please check the console.');
            });
    };
})();
