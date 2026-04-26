// User data array stored in sessionStorage
let users = JSON.parse(sessionStorage.getItem("users")) || [];

// ============================================================
// SIGN UP PAGE VALIDATION AND FUNCTIONALITY
// ============================================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get all form values
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const dob = document.getElementById("dob").value;
        const occupation = document.getElementById("occupation").value.trim();
        const aiExperience = document.getElementById("aiExperience").value;

        // Clear previous errors
        document.getElementById("passError").textContent = "";
        document.getElementById("confirmError").textContent = "";

        let isValid = true;

        // Check if all fields are filled
        if (!firstName || !lastName || !email || !password || !confirmPassword || !dob || !occupation || !aiExperience) {
            alert("Please fill in all required fields!");
            console.log("Validation Error: Missing fields");
            return;
        }

        // Password validation
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasValidLength = password.length >= 8 && password.length <= 15;

        if (!hasSpecialChar) {
            document.getElementById("passError").textContent = "Password must have at least one special character";
            isValid = false;
            console.log("Validation Error: No special character");
        }

        if (!hasUppercase) {
            document.getElementById("passError").textContent = "Password must have at least one uppercase letter";
            isValid = false;
            console.log("Validation Error: No uppercase letter");
        }

        if (!hasLowercase) {
            document.getElementById("passError").textContent = "Password must have at least one lowercase letter";
            isValid = false;
            console.log("Validation Error: No lowercase letter");
        }

        if (!hasNumber) {
            document.getElementById("passError").textContent = "Password must have at least one number";
            isValid = false;
            console.log("Validation Error: No number");
        }

        if (!hasValidLength) {
            document.getElementById("passError").textContent = "Password must be between 8 and 15 characters";
            isValid = false;
            console.log("Validation Error: Invalid password length");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            document.getElementById("confirmError").textContent = "Passwords do not match";
            isValid = false;
            console.log("Validation Error: Passwords do not match");
        }

        // Check if email already exists
        const emailExists = users.find(u => u.email === email);
        if (emailExists) {
            alert("This email is already registered. Please sign in instead.");
            console.log("Validation Error: Email already exists");
            return;
        }

        // If all validations pass
        if (isValid) {
            // Create user object
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                dob: dob,
                occupation: occupation,
                aiExperience: aiExperience
            };

            // Add to users array
            users.push(newUser);

            // Save to sessionStorage
            sessionStorage.setItem("users", JSON.stringify(users));

            console.log("User registered successfully:", newUser);
            console.log("Total users:", users.length);

            // Show success message
            alert("Account created successfully! Please sign in.");

            // Redirect to sign in page
            window.location.href = "signin.html";
        }
    });
}

// ============================================================
// SIGN IN PAGE VALIDATION AND FUNCTIONALITY
// ============================================================

const signinForm = document.getElementById("signinForm");

if (signinForm) {
    signinForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById("signinEmail").value.trim();
        const password = document.getElementById("signinPassword").value;

        // Clear previous errors
        document.getElementById("emailError").textContent = "";
        document.getElementById("passError").textContent = "";

        let isValid = true;

        // Check for empty fields
        if (!email) {
            document.getElementById("emailError").textContent = "Email is required";
            isValid = false;
            console.log("Validation Error: Empty email");
        }

        if (!password) {
            document.getElementById("passError").textContent = "Password is required";
            isValid = false;
            console.log("Validation Error: Empty password");
        }

        if (!isValid) {
            return;
        }

        // Find user in array
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            console.log("Login successful:", foundUser);
            alert("Welcome back, " + foundUser.firstName + "!");

            // Store current user in session
            sessionStorage.setItem("currentUser", JSON.stringify(foundUser));

            // Redirect to home page
            window.location.href = "index.html";
        } else {
            // Check if email exists but password is wrong
            const emailExists = users.find(u => u.email === email);

            if (emailExists) {
                document.getElementById("passError").textContent = "Incorrect password";
                console.log("Validation Error: Wrong password");
            } else {
                document.getElementById("emailError").textContent = "No account found with this email";
                console.log("Validation Error: Email not found");
            }
        }
    });
}

// ============================================================
// LOGOUT FUNCTION (for future use)
// ============================================================

function logout() {
    sessionStorage.removeItem("currentUser");
    alert("You have been logged out successfully!");
    window.location.href = "landing.html";
}
