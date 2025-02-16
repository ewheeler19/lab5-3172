
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault(); 
        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value;
        
        let nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/; // First Name
        let lastNameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/; // Last Name
        let emailRegex = /[\w-\.]+@([\w-]+\.)+[\w]{2,6}$/; // Email 
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*-_?&])[A-Za-z\d@$#!%*-_?&]{12,}$/; // Password 

        let errors = [];

        if (!nameRegex.test(firstName)) {
            errors.push("Invalid first name. should only contain letters and an optional middle name.");
        }
        if (!lastNameRegex.test(lastName)) {
            errors.push("Invalid last name. should only contain letters, apostrophes, or hyphens.");
        }
        if (!emailRegex.test(email)) {
            errors.push("Invalid email format.");
        }
        if (!passwordRegex.test(password)) {
            errors.push("Password must be at least 12 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Registration successful!");
            this.submit(); 
        }
    });
});
