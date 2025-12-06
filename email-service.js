// email-service.js
// EmailJS initialization and service functions

// Initialize EmailJS
emailjs.init('tHKZ6zQi1nyxPr4hA');

// Email service configuration
const EMAILJS_CONFIG = {
    serviceID: 'default_service',
    templateID: 'template_ec6jkkf'
};

// Function to send verification email
async function sendVerificationEmail(email, verificationLink, year) {
    try {
        console.log('Preparing to send verification email...');
        console.log('Email:', email);
        console.log('Verification Link:', verificationLink);
        console.log('Year:', year);
        
        // Prepare the template parameters
        const templateParams = {
            confirmation_link: verificationLink,
            year: year,
            email: email
        };
        
        console.log('Template params:', templateParams);
        
        // Send the email using EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return {
            success: true,
            message: 'Verification email sent successfully',
            response: response
        };
        
    } catch (error) {
        console.error('Failed to send verification email:', error);
        return {
            success: false,
            message: 'Failed to send verification email',
            error: error
        };
    }
}

// Export functions for use in other files
window.EmailService = {
    sendVerificationEmail: sendVerificationEmail
};
