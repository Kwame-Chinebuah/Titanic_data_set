// Oil Marketing Management Console - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add click event listeners to dashboard cards
    setupCardListeners();
    
    // Add welcome animation
    addWelcomeAnimation();
    
    // Set up responsive navigation
    setupResponsiveFeatures();
    
    console.log('Oil Marketing Management Console initialized successfully');
}

function setupCardListeners() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const cardId = this.id;
            handleCardClick(cardId);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

function handleCardClick(cardId) {
    // Add click animation
    const card = document.getElementById(cardId);
    card.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Handle navigation based on card clicked
    switch(cardId) {
        case 'personnel-card':
            navigateToPersonnel();
            break;
        case 'closing-records-card':
            navigateToClosingRecords();
            break;
        case 'reports-card':
            navigateToReports();
            break;
        default:
            console.log('Unknown card clicked:', cardId);
    }
}

function navigateToPersonnel() {
    showNotification('Navigating to Personnel Information...', 'info');
    // Future: Navigate to personnel management page
    setTimeout(() => {
        alert('Personnel Information module will be implemented in the next phase.');
    }, 500);
}

function navigateToClosingRecords() {
    showNotification('Loading Closing Records...', 'info');
    // Future: Navigate to closing records page
    setTimeout(() => {
        alert('Closing Records module will be implemented in the next phase.');
    }, 500);
}

function navigateToReports() {
    showNotification('Generating Reports...', 'info');
    // Future: Navigate to reports page
    setTimeout(() => {
        alert('Reports module will be implemented in the next phase.');
    }, 500);
}

function addWelcomeAnimation() {
    const title = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    const cards = document.querySelectorAll('.dashboard-card');
    const stats = document.querySelectorAll('.stat-item');
    
    // Animate title
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 200);
    
    // Animate subtitle
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        subtitle.style.transition = 'all 0.6s ease';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
    }, 400);
    
    // Animate stats with stagger
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
}

function setupResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
}

function handleResize() {
    const width = window.innerWidth;
    const cards = document.querySelectorAll('.dashboard-card');
    
    if (width <= 768) {
        // Mobile optimizations
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    const colors = {
        info: 'linear-gradient(135deg, #667eea, #764ba2)',
        success: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        warning: 'linear-gradient(135deg, #f093fb, #f5576c)',
        error: 'linear-gradient(135deg, #ff416c, #ff4b2b)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Update stats dynamically (example function)
function updateStats() {
    const stats = {
        employees: 245,
        stations: 12,
        revenue: 2400000,
        uptime: 98.5
    };
    
    // This could be connected to real-time data in the future
    console.log('Stats updated:', stats);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or return to main view
        console.log('Escape key pressed - returning to main view');
    }
    
    // Arrow key navigation for cards
    const cards = document.querySelectorAll('.dashboard-card');
    const focusedCard = document.activeElement;
    
    if (focusedCard && focusedCard.classList.contains('dashboard-card')) {
        let currentIndex = Array.from(cards).indexOf(focusedCard);
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
                cards[currentIndex].focus();
                break;
            case 'ArrowRight':
                e.preventDefault();
                currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
                cards[currentIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                focusedCard.click();
                break;
        }
    }
});

// Make cards focusable for keyboard navigation
document.querySelectorAll('.dashboard-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', card.querySelector('h3').textContent);
});