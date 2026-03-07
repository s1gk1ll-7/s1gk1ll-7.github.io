/**
 * S1GK1LL - Main JavaScript
 * Handles navigation, search, and UI interactions
 */

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-container');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Search Functionality
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    if (!query) return;
    
    localStorage.setItem('searchQuery', query);
    window.location.href = '/writeups/';
}

// Filter Writeups by Category
function filterWriteups(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    });
}

// Show Notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--accent-jade);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background-color: #00A86B;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Check for search query on writeups page
    if (window.location.pathname.includes('/writeups/') && localStorage.getItem('searchQuery')) {
        const query = localStorage.getItem('searchQuery');
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = query;
        }
        localStorage.removeItem('searchQuery');
        
        const posts = document.querySelectorAll('.post-card');
        let hasResults = false;
        posts.forEach(post => {
            const text = post.textContent.toLowerCase();
            if (text.includes(query)) {
                post.style.display = 'block';
                hasResults = true;
            } else {
                post.style.display = 'none';
            }
        });
        
        const noResults = document.getElementById('no-results');
        if (noResults) {
            noResults.classList.toggle('hidden', hasResults);
        }
    }
});

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
