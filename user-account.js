// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const logoutBtn = document.querySelector('.logout-btn');
const dashboardMenu = document.querySelectorAll('.dashboard-menu li a');
const dashboardSections = document.querySelectorAll('.dashboard-section');
const renewButtons = document.querySelectorAll('.renew-btn');
const payBtn = document.querySelector('.pay-btn');
const settingsForm = document.querySelector('.settings-form');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Dashboard Navigation
dashboardMenu.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all menu items
        dashboardMenu.forEach(menuItem => {
            menuItem.parentElement.classList.remove('active');
        });
        
        // Add active class to clicked menu item
        item.parentElement.classList.add('active');
        
        // Get the target section id
        const targetId = item.getAttribute('href').substring(1);
        
        // Hide all sections
        dashboardSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the target section
        document.getElementById(targetId).classList.add('active');
    });
});

// Renew Book Button
renewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookTitle = button.parentElement.querySelector('h4').textContent;
        alert(`Renewal request for "${bookTitle}" has been submitted. Please wait for approval.`);
    });
});

// Pay Fines Button
if (payBtn) {
    payBtn.addEventListener('click', () => {
        alert('Redirecting to payment gateway...');
    });
}

// Settings Form Submission
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your account settings have been updated successfully!');
    });
}

// Logout Button
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
});

// Load user data (in a real app, this would come from a server)
document.addEventListener('DOMContentLoaded', () => {
    // Simulate user data
    const userData = {
        name: 'Rahul Singh',
        id: '0201IT221120',
        type: 'Student',
        email: 'rahul.singh@jec.ac.in',
        phone: '9876543210',
        department: 'IT',
        profileImage: 'https://via.placeholder.com/150'
    };
    
    // Update user information in the UI
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-id').textContent = userData.id;
    document.getElementById('user-type').textContent = userData.type;
    document.getElementById('welcome-name').textContent = userData.name.split(' ')[0];
    document.getElementById('profile-image').src = userData.profileImage;
    
    // Update settings form
    if (document.getElementById('settings-name')) {
        document.getElementById('settings-name').value = userData.name;
        document.getElementById('settings-email').value = userData.email;
        document.getElementById('settings-phone').value = userData.phone;
        document.getElementById('settings-department').value = userData.department;
    }
});