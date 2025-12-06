// emailjs-service.js
// Initialize EmailJS (make sure to replace with your actual EmailJS user ID)
export const initEmailJS = () => {
    emailjs.init('tHKZ6zQi1nyxPr4hA');
    console.log('EmailJS initialized');
};

// Function to send verification email
export const sendVerificationEmail = async (userEmail, verificationLink) => {
    try {
        // Send verification email using EmailJS
        const response = await emailjs.send(
            'default_service', // Service ID
            'template_ec6jkkf', // Template ID
            {
                to_email: userEmail,
                confirmation_link: verificationLink,
                email: userEmail
            }
        );
        
        console.log('Email sent successfully:', response);
        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { 
            success: false, 
            message: 'Failed to send verification email',
            error: error 
        };
    }
};

// Function to send verification email using form submission method
export const sendVerificationEmailForm = async (formData) => {
    try {
        const response = await emailjs.sendForm(
            'default_service',
            'template_ec6jkkf',
            formData
        );
        
        console.log('Email sent successfully (form):', response);
        return { success: true, message: 'Verification email sent successfully' };
    } catch (error) {
        console.error('Error sending email (form):', error);
        return { 
            success: false, 
            message: 'Failed to send verification email',
            error: error 
        };
    }
};
