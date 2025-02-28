
// Initial users in a Map (filling a database)
let users = new Map([
    ['Example', { email: 'example@example.com', password: 'example@1234567' }],
    ['Wheeler', { email: 'wheeler@example.com', password: 'wheeler@1234567' }],
    ['Ethan', { email: 'ethan@example.com', password: 'Ethan@1234567' }]
]);

// Set to keep track of existing emails 
const emails = new Set(['example@example.com', 'ethan@example.com', 'wheeler@example.com']);

// GEt users from localStorage with error handling
try {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
        users = new Map(storedUsers);
        
        // Rebuild the email set from the retrieved user data
        emails.clear();
        for (const [_, userData] of users) {
            emails.add(userData.email);
        }
    }
} catch (error) { 
    // Initialize localStorage with default users if there's an error
    console.error('Error loading user data:', error);
    saveUsers();
}

// Function to save users to localStorage using arrow function
const saveUsers = () => {
    try {
        localStorage.setItem('users', JSON.stringify([...users]));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

// Regex validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
const USERNAME_REGEX = /^(?![0-9])[a-zA-Z0-9_]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

// Validation function using arrow function and destructuring
const validateRegistration = ({ email, username, password, confirmPassword }) => {
    // Make Set to collect error messages
    const errors = new Set();
    
    // All regex case tests
    if (!EMAIL_REGEX.test(email)) {
        errors.add('Invalid email format! Must follow traditional format with a 2-8 character domain extension.');
    }
    
    if (!USERNAME_REGEX.test(username)) {
        errors.add('Username must not begin with a number or contain spaces/special characters!');
    }
    
    if (!PASSWORD_REGEX.test(password)) {
        errors.add('Password must be at least 12 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
    
    if (password !== confirmPassword) {
        errors.add('Passwords do not match!');
    }
    
    if (users.has(username)) {
        errors.add('Username already exists. Choose a different one.');
    }
    
    if (emails.has(email)) {
        errors.add('Email already registered. Use a different email or login.');
    }
    
    // Return the first error or null if no errors
    return errors.size > 0 ? [...errors][0] : null;
};

// Handle registration using arrow function and destructuring
const handleRegistration = (event) => {
    event.preventDefault();
    
    // Extract form elements using destructuring
    const { email, username, password, confirmPassword } = {
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    const successMessage = document.getElementById('successMessage');
    
    // Validate registration
    const errorMessage = validateRegistration({ email, username, password, confirmPassword });
    
    if (errorMessage) {
        // Display error
        successMessage.textContent = errorMessage;
        successMessage.className = 'message error';
        
        // Highlight fields with errors for visual feedback
        highlightInvalidFields({ email, username, password, confirmPassword }, errorMessage);
        return;
    }
    
    try {
        // Store user data 
        users.set(username, { email, password });
        emails.add(email);
        saveUsers();
        
        // Display success message
        successMessage.textContent = 'You have been successfully registered!';
        successMessage.className = 'message success';
        
        // Log success to console 
        console.log(`User "${username}" successfully registered.`);
        console.log(`Current users: ${JSON.stringify([...users])}`);
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        console.error('Registration error:', error);
        successMessage.textContent = 'An error occurred during registration.';
        successMessage.className = 'message error';
    }
};

// Handle login using arrow function 
const handleLogin = (event) => {
    event.preventDefault();
    
    // Get form elements 
    const { username, password } = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    
    const loginMessage = document.getElementById('loginMessage');
    
    try {
        const userData = users.get(username);
        
        // Check if user exists and password matches
        if (userData && userData.password === password) {
            loginMessage.textContent = 'Login successful!';
            loginMessage.className = 'message success';
            
            // Log the successful login
            console.log(`User "${username}" logged in successfully.`);
            
            // Show message
            setTimeout(() => {
                alert(`Welcome ${username}! Login successful.`);
            }, 1000);
        } else {
            loginMessage.textContent = 'Invalid username or password.';
            loginMessage.className = 'message error';
            
            // Highlight invalid fields
            document.getElementById('username').classList.add('error');
            document.getElementById('password').classList.add('error');
        }
    } catch (error) {
        console.error('Login error:', error);
        loginMessage.textContent = 'An error occurred during login.';
        loginMessage.className = 'message error';
    }
};

// Function to highlight invalid fields
const highlightInvalidFields = (fields, errorMessage) => {
    // Reset all elements
    document.getElementById('email').classList.remove('error');
    document.getElementById('username').classList.remove('error');
    document.getElementById('password').classList.remove('error');
    document.getElementById('confirmPassword').classList.remove('error');
    
    // Highlight specific fields based on the error message if its included
    if (errorMessage.includes('email')) {
        document.getElementById('email').classList.add('error');
    }
    if (errorMessage.includes('Username')) {
        document.getElementById('username').classList.add('error');
    }
    if (errorMessage.includes('Password') || errorMessage.includes('Passwords')) {
        document.getElementById('password').classList.add('error');
        document.getElementById('confirmPassword').classList.add('error');
    }
};

// Add event listeners to forms if they exist on the page 
const registerForm = () => {
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('submit', handleRegistration);
        
        // Add input event listeners for real-time validation feedback
        document.getElementById('email').addEventListener('input', () => {
            const email = document.getElementById('email');
            if (!EMAIL_REGEX.test(email.value)) {
                email.classList.add('error');
            } else {
                email.classList.remove('error');
            }
        });
        
        document.getElementById('username').addEventListener('input', () => {
            const username = document.getElementById('username');
            if (!USERNAME_REGEX.test(username.value)) {
                username.classList.add('error');
            } else {
                username.classList.remove('error');
            }
        });
        
        document.getElementById('password').addEventListener('input', () => {
            const password = document.getElementById('password');
            if (!PASSWORD_REGEX.test(password.value)) {
                password.classList.add('error');
            } else {
                password.classList.remove('error');
            }
        });
        
        document.getElementById('confirmPassword').addEventListener('input', () => {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword');
            if (confirmPassword.value !== password) {
                confirmPassword.classList.add('error');
            } else {
                confirmPassword.classList.remove('error');
            }
        });
    }
};

// Handle the login form
const registerLogin = () => {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
};

// Get the appropriate form based on the current page
document.addEventListener('DOMContentLoaded', () => {
    registerForm();
    registerLogin();
});