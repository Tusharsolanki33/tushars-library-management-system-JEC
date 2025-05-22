// Sample book data
const books = [
    {
        id: 1,
        title: "Data Structures and Algorithms",
        author: "Thomas H. Cormen",
        department: "cs",
        type: "book",
        year: 2009,
        available: true,
        cover: "assets/dsa.webp"
    },
    {
        id: 2,
        title: "Electric Machinery Fundamentals",
        author: "Stephen J. Chapman",
        department: "ee",
        type: "book",
        year: 2011,
        available: true,
        cover: "assets/ee1.jpg"
    },
    {
        id: 3,
        title: "Mechanics of Materials",
        author: "Ferdinand P. Beer",
        department: "me",
        type: "book",
        year: 2015,
        available: false,
        cover: "assets/mm.jpg"
    },
    {
        id: 4,
        title: "Structural Analysis",
        author: "R.C. Hibbeler",
        department: "ce",
        type: "book",
        year: 2018,
        available: true,
        cover: "assets/sa.jpg"
    },
    {
        id: 5,
        title: "Digital Signal Processing",
        author: "John G. Proakis",
        department: "ec",
        type: "book",
        year: 2007,
        available: true,
        cover: "assets/ds.jpg"
    },
    {
        id: 6,
        title: "Computer Networks",
        author: "Andrew S. Tanenbaum",
        department: "cs",
        type: "book",
        year: 2010,
        available: false,
        cover: "assets/cn.webp"
    },
    {
        id: 7,
        title: "Power System Analysis",
        author: "Hadi Saadat",
        department: "ee",
        type: "book",
        year: 2010,
        available: true,
        cover: "assets/ps.jpg"
    },
    {
        id: 8,
        title: "Journal of Mechanical Engineering",
        author: "Various Authors",
        department: "me",
        type: "journal",
        year: 2022,
        available: true,
        cover: "assets/me.jpeg"
    },
    {
        id: 9,
        title: "Civil Engineering Research",
        author: "Various Authors",
        department: "ce",
        type: "journal",
        year: 2023,
        available: true,
        cover: "assets/ce.webp"
    },
    {
        id: 10,
        title: "Advanced Communication Systems",
        author: "Simon Haykin",
        department: "ec",
        type: "book",
        year: 2014,
        available: true,
        cover: "assets/acs.jpg"
    },
    {
        id: 11,
        title: "Database Management Systems",
        author: "Raghu Ramakrishnan",
        department: "cs",
        type: "book",
        year: 2016,
        available: true,
        cover: "assets/dbms.jpg"
    },
    {
        id: 12,
        title: "Electrical Engineering",
        author: "Stanley Hackworth Jones",
        department: "ee",
        type: "thesis",
        year: 2021,
        available: true,
        cover: "assets/fee.jpg"
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close-btn');
const bookList = document.getElementById('book-list');
const departmentFilter = document.getElementById('department-filter');
const typeFilter = document.getElementById('type-filter');
const searchCatalog = document.getElementById('search-catalog');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const contactForm = document.getElementById('contact-form');
const loginForm = document.getElementById('login-form');

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

// Login Modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// Book Catalog Pagination
let currentPage = 1;
const booksPerPage = 8;
let filteredBooks = [...books];

// Initialize book catalog
function initCatalog() {
    displayBooks();
    updatePagination();
}

// Display books based on current filters and page
function displayBooks() {
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToDisplay = filteredBooks.slice(startIndex, endIndex);
    
    bookList.innerHTML = '';
    
    if (booksToDisplay.length === 0) {
        bookList.innerHTML = '<p class="no-results">No books found matching your criteria.</p>';
        return;
    }
    
    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        bookCard.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Year:</strong> ${book.year}</p>
                <p><strong>Type:</strong> ${capitalizeFirstLetter(book.type)}</p>
                <p class="availability ${book.available ? 'available' : 'unavailable'}">
                    ${book.available ? 'Available' : 'Not Available'}
                </p>
            </div>
        `;
        
        bookList.appendChild(bookCard);
    });
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Filter books based on user selection
function filterBooks() {
    const department = departmentFilter.value;
    const type = typeFilter.value;
    const searchTerm = searchCatalog.value.toLowerCase();
    
    filteredBooks = books.filter(book => {
        const departmentMatch = department === '' || book.department === department;
        const typeMatch = type === '' || book.type === type;
        const searchMatch = 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm);
        
        return departmentMatch && typeMatch && searchMatch;
    });
    
    currentPage = 1;
    displayBooks();
    updatePagination();
}

// Event listeners for filters
departmentFilter.addEventListener('change', filterBooks);
typeFilter.addEventListener('change', filterBooks);
searchCatalog.addEventListener('input', filterBooks);

// Pagination controls
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayBooks();
        updatePagination();
    }
});

nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayBooks();
        updatePagination();
    }
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
    
    contactForm.reset();
});

// Login form submission - MODIFIED FOR REDIRECT
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the catalog when the page loads
window.addEventListener('load', initCatalog);

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Placeholder images for books
// In a real application, you would have actual book cover images
// For this demo, we're using placeholder images
document.addEventListener('DOMContentLoaded', () => {
    // Create placeholder images for books that don't have covers
    const bookCovers = document.querySelectorAll('.book-cover img');
    
    bookCovers.forEach(cover => {
        if (!cover.src || cover.src.includes('undefined')) {
            const randomColor = getRandomColor();
            cover.src = `https://via.placeholder.com/300x400/${randomColor}/FFFFFF?text=${encodeURIComponent(cover.alt)}`;
        }
    });
});

// Generate random color for placeholder images
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}