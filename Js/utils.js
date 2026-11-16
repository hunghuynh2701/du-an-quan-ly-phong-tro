// Utility Functions

// Format Price to Vietnamese Currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(price);
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

// Show Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    // Set background color based on type
    if (type === 'success') {
        toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50';
    } else if (type === 'error') {
        toast.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50';
    } else if (type === 'warning') {
        toast.className = 'fixed bottom-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 z-50';
    }
    
    // Show toast
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Show/Hide Modals
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Show Pages
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    
    const pageElement = document.getElementById(page + 'Page');
    const dashboardElement = document.getElementById(page + 'Dashboard');
    
    if (pageElement) {
        pageElement.classList.remove('hidden');
    }
    if (dashboardElement) {
        dashboardElement.classList.remove('hidden');
    }
}

// Get Amenity Icon
function getAmenityIcon(amenity) {
    const icons = {
        'WiFi': 'fas fa-wifi',
        'Điều hòa': 'fas fa-snowflake',
        'Nóng lạnh': 'fas fa-hot-tub',
        'Tủ lạnh': 'fas fa-box',
        'Máy giặt': 'fas fa-soap',
        'Bãi xe': 'fas fa-motorcycle',
        'Ban công': 'fas fa-door-open',
        'Bếp': 'fas fa-utensils',
        'WC riêng': 'fas fa-bath',
        'Thang máy': 'fas fa-elevator'
    };
    return icons[amenity] || 'fas fa-check';
}

// Get Status Badge Class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'available':
            return 'bg-green-100 text-green-600';
        case 'rented':
            return 'bg-red-100 text-red-600';
        case 'pending':
            return 'bg-yellow-100 text-yellow-600';
        case 'approved':
            return 'bg-green-100 text-green-600';
        case 'rejected':
            return 'bg-red-100 text-red-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
}

// Get Status Text
function getStatusText(status) {
    const statusTexts = {
        'available': 'Còn trống',
        'rented': 'Đã thuê',
        'pending': 'Chờ duyệt',
        'approved': 'Đã duyệt',
        'rejected': 'Từ chối'
    };
    return statusTexts[status] || status;
}

// Get Role Badge Class
function getRoleBadgeClass(role) {
    switch (role) {
        case 'admin':
            return 'bg-purple-100 text-purple-600';
        case 'landlord':
            return 'bg-blue-100 text-blue-600';
        case 'renter':
            return 'bg-green-100 text-green-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
}

// Get Role Text
function getRoleText(role) {
    const roleTexts = {
        'admin': 'Quản trị viên',
        'landlord': 'Chủ trọ',
        'renter': 'Người thuê'
    };
    return roleTexts[role] || role;
}

// Validate Email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone
function isValidPhone(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
}

// Generate unique ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
