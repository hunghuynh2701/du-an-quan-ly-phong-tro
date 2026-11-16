// Admin Functions

// Show Admin Tab
function showAdminTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    
    // Remove active from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
    
    // Show selected tab
    const tabId = 'admin' + tab.charAt(0).toUpperCase() + tab.slice(1);
    document.getElementById(tabId).classList.add('active');
    
    // Add active to clicked sidebar item
    event.target.closest('.sidebar-item').classList.add('active');
}

// Load Admin Data
function loadAdminData() {
    const users = getUsers();
    const rooms = getRooms();
    const requests = getRequests();

    loadUsersTable(users);
    loadAdminRooms(rooms, users);
    loadAdminRequests(requests, rooms, users);
    loadAdminStats(users, rooms, requests);
}

// Load Users Table
function loadUsersTable(users) {
    const tbody = document.getElementById('usersTable');
    
    tbody.innerHTML = users.map(user => `
        <tr class="border-b hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-medium">#${user.id}</td>
            <td class="px-6 py-4">
                <div class="flex items-center">
                    <img src="${user.avatar}" class="w-8 h-8 rounded-full mr-3">
                    ${user.name}
                </div>
            </td>
            <td class="px-6 py-4">${user.email}</td>
            <td class="px-6 py-4">${user.phone}</td>
            <td class="px-6 py-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeClass(user.role)}">
                    ${getRoleText(user.role)}
                </span>
            </td>
            <td class="px-6 py-4">
                ${user.role !== 'admin' ? `
                    <button onclick="deleteUser(${user.id})" class="text-red-500 hover:text-red-700 transition" title="Xóa người dùng">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : `
                    <span class="text-gray-400"><i class="fas fa-shield-alt"></i></span>
                `}
            </td>
        </tr>
    `).join('');
}

// Load Admin Rooms
function loadAdminRooms(rooms, users) {
    const container = document.getElementById('adminRoomsList');
    
    if (rooms.length === 0) {
        container.innerHTML = '<p class="col-span-3 text-center text-gray-500 py-8">Chưa có phòng trọ nào.</p>';
        return;
    }
    
    container.innerHTML = rooms.map(room => {
        const landlord = users.find(u => u.id === room.landlordId);
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="relative">
                    <img src="${room.images[0]}" alt="${room.title}" class="w-full h-40 object-cover">
                    <span class="absolute top-2 right-2 ${room.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded text-xs">
                        ${getStatusText(room.status)}
                    </span>
                </div>
                <div class="p-4">
                    <h4 class="font-bold text-gray-800 mb-1 truncate">${room.title}</h4>
                    <p class="text-purple-600 font-semibold mb-2">${formatPrice(room.price)}</p>
                    <p class="text-gray-500 text-sm mb-2">
                        <i class="fas fa-user mr-1"></i>Chủ trọ: ${landlord?.name || 'N/A'}
                    </p>
                    <p class="text-gray-400 text-xs mb-3">
                        <i class="fas fa-calendar mr-1"></i>${formatDate(room.createdAt)}
                    </p>
                    <div class="flex gap-2">
                        <button onclick="showRoomDetail(${room.id})" class="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition">
                            <i class="fas fa-eye mr-1"></i>Xem
                        </button>
                        <button onclick="deleteRoom(${room.id})" class="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load Admin Requests
function loadAdminRequests(requests, rooms, users) {
    const container = document.getElementById('adminRequestsList');
    
    if (requests.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500 py-8">Chưa có yêu cầu thuê nào.</p>';
        return;
    }
    
    container.innerHTML = requests.map(req => {
        const room = rooms.find(r => r.id === req.roomId);
        const renter = users.find(u => u.id === req.renterId);
        const landlord = users.find(u => u.id === req.landlordId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg p-5">
                <div class="flex flex-wrap justify-between items-start gap-4">
                    <div class="flex gap-4">
                        <img src="${room?.images[0] || 'https://via.placeholder.com/80'}" class="w-20 h-20 rounded-lg object-cover">
                        <div>
                            <h4 class="font-bold text-gray-800">${room?.title || 'Phòng đã xóa'}</h4>
                            <p class="text-sm text-gray-500 mt-1">
                                <i class="fas fa-user text-blue-500 mr-1"></i>Người thuê: ${renter?.name || 'N/A'}
                            </p>
                            <p class="text-sm text-gray-500">
                                <i class="fas fa-home text-green-500 mr-1"></i>Chủ trọ: ${landlord?.name || 'N/A'}
                            </p>
                            <p class="text-sm text-gray-400 mt-1">
                                <i class="fas fa-calendar mr-1"></i>${formatDate(req.createdAt)}
                            </p>
                        </div>
                    </div>
                    <span class="px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(req.status)}">
                        ${getStatusText(req.status)}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

// Load Admin Stats
function loadAdminStats(users, rooms, requests) {
    const container = document.getElementById('statsCards');
    
    const stats = [
        {
            icon: 'fas fa-users',
            color: 'purple',
            value: users.length,
            label: 'Tổng người dùng',
            subLabel: `${users.filter(u => u.role === 'landlord').length} chủ trọ, ${users.filter(u => u.role === 'renter').length} người thuê`
        },
        {
            icon: 'fas fa-door-open',
            color: 'blue',
            value: rooms.length,
            label: 'Tổng phòng trọ',
            subLabel: `${rooms.filter(r => r.status === 'available').length} còn trống`
        },
        {
            icon: 'fas fa-clipboard-list',
            color: 'green',
            value: requests.length,
            label: 'Yêu cầu thuê',
            subLabel: `${requests.filter(r => r.status === 'pending').length} chờ duyệt`
        },
        {
            icon: 'fas fa-check-circle',
            color: 'yellow',
            value: requests.filter(r => r.status === 'approved').length,
            label: 'Đã được duyệt',
            subLabel: 'Giao dịch thành công'
        }
    ];
    
    container.innerHTML = stats.map(stat => `
        <div class="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-${stat.color}-100 flex items-center justify-center">
                <i class="${stat.icon} text-3xl text-${stat.color}-600"></i>
            </div>
            <p class="text-3xl font-bold text-gray-800">${stat.value}</p>
            <p class="text-gray-600 font-medium">${stat.label}</p>
            <p class="text-gray-400 text-sm mt-1">${stat.subLabel}</p>
        </div>
    `).join('');
}

// Delete User
function deleteUser(userId) {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này không?\nTất cả phòng trọ và yêu cầu liên quan cũng sẽ bị xóa.')) return;
    
    let users = getUsers();
    const userToDelete = users.find(u => u.id === userId);
    
    if (!userToDelete) {
        showToast('Không tìm thấy người dùng!', 'error');
        return;
    }
    
    // Delete user
    users = users.filter(u => u.id !== userId);
    saveUsers(users);
    
    // Delete user's rooms if landlord
    if (userToDelete.role === 'landlord') {
        let rooms = getRooms();
        rooms = rooms.filter(r => r.landlordId !== userId);
        saveRooms(rooms);
    }
    
    // Delete user's requests
    let requests = getRequests();
    requests = requests.filter(r => r.renterId !== userId && r.landlordId !== userId);
    saveRequests(requests);
    
    // Delete user's saved rooms
    let saved = getSavedRooms();
    saved = saved.filter(s => s.userId !== userId);
    saveSavedRooms(saved);
    
    loadAdminData();
    showToast('Đã xóa người dùng thành công!', 'success');
}
