// Authentication Functions

// Current User
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Login Function
function login(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validate
    if (!email || !password) {
        showToast('Vui lòng nhập đầy đủ thông tin!', 'error');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateNavbar();
        hideModal('loginModal');
        
        // Clear form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        
        showToast(`Chào mừng ${user.name}!`, 'success');
        showDashboard();
    } else {
        showToast('Email hoặc mật khẩu không đúng!', 'error');
    }
}

// Register Function
function register(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    // Validate
    if (!name || !email || !phone || !password) {
        showToast('Vui lòng nhập đầy đủ thông tin!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Email không hợp lệ!', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Số điện thoại không hợp lệ!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    const users = getUsers();
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        showToast('Email đã được sử dụng!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff`,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    
    // Clear form
    document.getElementById('regName').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPhone').value = '';
    document.getElementById('regPassword').value = '';
    
    hideModal('registerModal');
    showToast('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
    showModal('loginModal');
}

// Logout Function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNavbar();
    showPage('home');
    showToast('Đã đăng xuất thành công!', 'success');
}

// Update Navbar based on login status
function updateNavbar() {
    const navMenu = document.getElementById('navMenu');
    const userMenu = document.getElementById('userMenu');
    const welcomeUser = document.getElementById('welcomeUser');

    if (currentUser) {
        navMenu.classList.add('hidden');
        userMenu.classList.remove('hidden');
        userMenu.classList.add('flex');
        welcomeUser.innerHTML = `
            <img src="${currentUser.avatar}" class="w-8 h-8 rounded-full inline mr-2">
            ${currentUser.name}
        `;
    } else {
        navMenu.classList.remove('hidden');
        navMenu.classList.add('flex');
        userMenu.classList.add('hidden');
        userMenu.classList.remove('flex');
    }
}

// Show Dashboard based on user role
function showDashboard() {
    if (!currentUser) {
        showModal('loginModal');
        return;
    }

    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

    switch (currentUser.role) {
        case 'admin':
            document.getElementById('adminDashboard').classList.remove('hidden');
            loadAdminData();
            break;
        case 'landlord':
            document.getElementById('landlordDashboard').classList.remove('hidden');
            loadLandlordData();
            break;
        case 'renter':
            document.getElementById('renterDashboard').classList.remove('hidden');
            loadRenterData();
            break;
    }
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if current user has specific role
function hasRole(role) {
    return currentUser && currentUser.role === role;
}
