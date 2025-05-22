// This code should be added to the existing script.js file

// Get the login form
const loginForm = document.getElementById('login-form');

// Modify the login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('user-id').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (in a real app, this would be server-side)
        if (userId && password) {
            // Store user info in localStorage (for demo purposes only)
            localStorage.setItem('loggedInUser', JSON.stringify({
                name: 'John Doe',
                id: userId,
                type: 'Student'
            }));
            
            // Redirect to user account page
            window.location.href = 'user-account.html';
        } else {
            alert('Please enter both User ID and Password');
        }
    });
}







