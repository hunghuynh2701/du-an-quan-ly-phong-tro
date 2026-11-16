// Main Application Entry Point

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initData();
    
    // Load modals
    loadModals();
    
    // Setup modal close on outside click
    setTimeout(setupModalCloseOnOutsideClick, 100);
    
    // Update navbar based on login status
    updateNavbar();
    
    // Load room listings
    loadRooms();
    
    // Set min date for rent request
    setMinDateForInputs();
    
    console.log('🏠 Hệ thống Quản lý Phòng trọ Đà Nẵng đã sẵn sàng!');
    console.log('📧 Tài khoản demo:');
    console.log('   Admin: admin@trodanang.vn / admin123');
    console.log('   Chủ trọ: landlord@gmail.com / 123456');
    console.log('   Người thuê: renter@gmail.com / 123456');
});

// Set minimum date for date inputs
function setMinDateForInputs() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.min = today;
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh data when page becomes visible
        if (currentUser) {
            updateNavbar();
        }
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo);
    return false;
};

// Service worker registration (for future PWA support)
if ('serviceWorker' in navigator) {
    // Commented out for now - can be enabled for PWA
    // navigator.serviceWorker.register('/sw.js');
}
