document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked;
            
            console.log('Login attempt:', { email, password, remember });
            
            // In a real app, you would send this data to your backend API
            // For now, we'll simulate a successful login
            
            simulateApiCall({ email, password })
                .then(response => {
                    if (response.success) {
                        // Store user data in localStorage
                        localStorage.setItem('user', JSON.stringify({
                            id: response.userId,
                            email: email,
                            name: response.name,
                            token: response.token
                        }));
                        
                        // Redirect to home page
                        window.location.href = 'index.html';
                    } else {
                        alert('Login failed: ' + response.message);
                    }
                })
                .catch(error => {
                    console.error('Login error:', error);
                    alert('An error occurred during login. Please try again.');
                });
        });
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Validate terms acceptance
            if (!termsAccepted) {
                alert('You must accept the Terms & Conditions and Privacy Policy');
                return;
            }
            
            console.log('Registration attempt:', { fullName, email });
            
            // In a real app, you would send this data to your backend API
            // For now, we'll simulate a successful registration
            
            simulateApiCall({ fullName, email, password })
                .then(response => {
                    if (response.success) {
                        // Store user data in localStorage
                        localStorage.setItem('user', JSON.stringify({
                            id: response.userId,
                            email: email,
                            name: fullName,
                            token: response.token
                        }));
                        
                        // Redirect to home page
                        window.location.href = 'index.html';
                    } else {
                        alert('Registration failed: ' + response.message);
                    }
                })
                .catch(error => {
                    console.error('Registration error:', error);
                    alert('An error occurred during registration. Please try again.');
                });
        });
    }
    
    // Check if user is logged in and update UI
    function checkAuthStatus() {
        const user = JSON.parse(localStorage.getItem('user'));
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        
        if (user && user.token) {
            // User is logged in
            if (loginBtn) loginBtn.textContent = 'Dashboard';
            if (loginBtn) loginBtn.href = 'dashboard.html';
            if (registerBtn) registerBtn.textContent = 'Logout';
            
            // Add logout functionality
            if (registerBtn) {
                registerBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.removeItem('user');
                    window.location.reload();
                });
            }
        }
    }
    
    // Call the auth status check
    checkAuthStatus();
    
    // Simulate API call (for demo purposes)
    function simulateApiCall(data) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(()