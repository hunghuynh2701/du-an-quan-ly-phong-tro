// Room Management Functions

// Load and display room listings
function loadRooms(filter = {}) {
    let rooms = getRooms();
    const users = getUsers();

    // Apply filters
    if (filter.university) {
        rooms = rooms.filter(r => r.university === filter.university);
    }
    if (filter.priceRange) {
        const [min, max] = filter.priceRange.split('-').map(Number);
        rooms = rooms.filter(r => r.price >= min && r.price <= max);
    }
    if (filter.areaRange) {
        const [min, max] = filter.areaRange.split('-').map(Number);
        rooms = rooms.filter(r => r.area >= min && r.area <= max);
    }

    // Only show available rooms
    rooms = rooms.filter(r => r.status === 'available');

    const container = document.getElementById('roomListings');
    
    if (rooms.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-16">
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Không tìm thấy phòng trọ phù hợp</p>
                <p class="text-gray-400 mt-2">Thử thay đổi bộ lọc để tìm thêm phòng</p>
            </div>
        `;
        return;
    }

    container.innerHTML = rooms.map(room => {
        const landlord = users.find(u => u.id === room.landlordId);
        return createRoomCard(room, landlord);
    }).join('');
}

// Create Room Card HTML
function createRoomCard(room, landlord) {
    return `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden room-card cursor-pointer" onclick="showRoomDetail(${room.id})">
            <div class="relative overflow-hidden">
                <img src="${room.images[0]}" alt="${room.title}" class="w-full h-52 object-cover">
                <span class="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    <i class="fas fa-university mr-1"></i>${room.university}
                </span>
                ${room.images.length > 1 ? `
                    <span class="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        <i class="fas fa-images mr-1"></i>${room.images.length} ảnh
                    </span>
                ` : ''}
                <span class="absolute bottom-3 right-3 ${room.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded text-xs font-semibold">
                    ${room.status === 'available' ? 'Còn trống' : 'Đã thuê'}
                </span>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">${room.title}</h3>
                <p class="text-gray-500 text-sm mb-3 flex items-center">
                    <i class="fas fa-map-marker-alt text-purple-600 mr-2"></i>
                    ${truncateText(room.address, 40)}
                </p>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-2xl font-bold text-purple-600">${formatPrice(room.price)}</span>
                    <span class="text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <i class="fas fa-ruler-combined mr-1"></i>${room.area}m²
                    </span>
                </div>
                <div class="flex flex-wrap gap-1 mb-4">
                    ${room.amenities.slice(0, 3).map(a => `
                        <span class="bg-purple-50 text-purple-600 px-2 py-1 rounded text-xs">
                            <i class="${getAmenityIcon(a)} mr-1"></i>${a}
                        </span>
                    `).join('')}
                    ${room.amenities.length > 3 ? `
                        <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +${room.amenities.length - 3} khác
                        </span>
                    ` : ''}
                </div>
                <div class="flex items-center text-gray-500 text-sm border-t pt-3">
                    <img src="${landlord?.avatar || 'https://ui-avatars.com/api/?name=User'}" class="w-6 h-6 rounded-full mr-2">
                    <span>${landlord?.name || 'Chủ trọ'}</span>
                </div>
            </div>
        </div>
    `;
}

// Search Rooms
function searchRooms() {
    const filter = {
        university: document.getElementById('searchUniversity').value,
        priceRange: document.getElementById('searchPrice').value,
        areaRange: document.getElementById('searchArea').value
    };
    loadRooms(filter);
    
    // Scroll to results
    document.getElementById('roomListings').scrollIntoView({ behavior: 'smooth' });
}

// Show Room Detail
function showRoomDetail(roomId) {
    const rooms = getRooms();
    const users = getUsers();
    const room = rooms.find(r => r.id === roomId);
    
    if (!room) {
        showToast('Không tìm thấy phòng trọ!', 'error');
        return;
    }
    
    const landlord = users.find(u => u.id === room.landlordId);
    const savedRooms = getSavedRooms();
    const isSaved = savedRooms.some(s => s.roomId === roomId && s.userId === currentUser?.id);

    const content = `
        <div class="relative">
            <!-- Image Gallery -->
            <div class="flex overflow-x-auto snap-x snap-mandatory gallery-container">
                ${room.images.map((img, i) => `
                    <img src="${img}" alt="Ảnh ${i+1}" class="w-full h-72 md:h-96 object-cover snap-center flex-shrink-0 gallery-item">
                `).join('')}
            </div>
            <button onclick="hideModal('roomDetailModal')" class="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full hover:bg-black/70 transition">
                <i class="fas fa-times"></i>
            </button>
            ${room.images.length > 1 ? `
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    <i class="fas fa-hand-point-left mr-1"></i> Vuốt để xem thêm ảnh
                </div>
            ` : ''}
        </div>
        <div class="p-6">
            <!-- Header -->
            <div class="flex flex-wrap items-start justify-between mb-6">
                <div class="flex-1">
                    <span class="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        <i class="fas fa-university mr-1"></i>${room.university}
                    </span>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">${room.title}</h2>
                    <p class="text-gray-500 flex items-center">
                        <i class="fas fa-map-marker-alt text-purple-600 mr-2"></i>${room.address}
                    </p>
                </div>
                <div class="text-right mt-4 md:mt-0">
                    <p class="text-3xl font-bold text-purple-600">${formatPrice(room.price)}</p>
                    <p class="text-gray-500">/ tháng</p>
                </div>
            </div>
            
            <!-- Quick Info -->
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                    <i class="fas fa-ruler-combined text-purple-600 text-2xl mb-2"></i>
                    <p class="font-bold text-lg">${room.area}m²</p>
                    <p class="text-gray-500 text-sm">Diện tích</p>
                </div>
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                    <i class="fas fa-door-open text-blue-600 text-2xl mb-2"></i>
                    <p class="font-bold text-lg">${room.amenities.length}</p>
                    <p class="text-gray-500 text-sm">Tiện ích</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                    <i class="fas fa-check-circle text-green-600 text-2xl mb-2"></i>
                    <p class="font-bold text-lg">${room.status === 'available' ? 'Còn trống' : 'Đã thuê'}</p>
                    <p class="text-gray-500 text-sm">Trạng thái</p>
                </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-align-left text-purple-600 mr-2"></i>Mô tả chi tiết
                </h3>
                <p class="text-gray-600 leading-relaxed">${room.description}</p>
            </div>

            <!-- Amenities -->
            <div class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-star text-purple-600 mr-2"></i>Tiện ích phòng
                </h3>
                <div class="grid grid-cols-3 md:grid-cols-4 gap-3">
                    ${room.amenities.map(a => `
                        <div class="bg-purple-50 text-purple-600 px-3 py-2 rounded-lg text-center">
                            <i class="${getAmenityIcon(a)} text-lg mb-1"></i>
                            <p class="text-sm">${a}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Landlord Info -->
            <div class="bg-gray-50 p-5 rounded-xl mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <i class="fas fa-user text-purple-600 mr-2"></i>Thông tin chủ trọ
                </h3>
                <div class="flex items-center">
                    <img src="${landlord?.avatar}" class="w-16 h-16 rounded-full mr-4">
                    <div>
                        <p class="font-bold text-lg">${landlord?.name}</p>
                        <p class="text-gray-500"><i class="fas fa-phone mr-2"></i>${landlord?.phone}</p>
                        <p class="text-gray-500"><i class="fas fa-envelope mr-2"></i>${landlord?.email}</p>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap gap-3">
                ${currentUser && currentUser.role === 'renter' ? (() => {
                    const activeRental = hasActiveRental(currentUser.id);
                    const hasPendingRequest = getRequests().some(r => r.roomId === room.id && r.renterId === currentUser.id && r.status === 'pending');
                    
                    if (activeRental) {
                        return `
                            <div class="flex-1 bg-orange-100 border-2 border-orange-300 text-orange-700 py-3 px-4 rounded-lg text-center">
                                <i class="fas fa-exclamation-triangle mr-2"></i>
                                Bạn đang thuê phòng khác. Vui lòng trả phòng trước khi thuê mới.
                            </div>
                        `;
                    } else if (hasPendingRequest) {
                        return `
                            <div class="flex-1 bg-blue-100 border-2 border-blue-300 text-blue-700 py-3 px-4 rounded-lg text-center">
                                <i class="fas fa-clock mr-2"></i>
                                Bạn đã gửi yêu cầu thuê phòng này. Đang chờ chủ trọ duyệt...
                            </div>
                            <button onclick="toggleSaveRoom(${room.id})" class="${isSaved ? 'bg-pink-500' : 'bg-gray-200 text-gray-600'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition">
                                <i class="fas fa-heart"></i>
                            </button>
                        `;
                    } else {
                        return `
                            <button onclick="openRentRequest(${room.id})" class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                                <i class="fas fa-paper-plane mr-2"></i>Gửi yêu cầu thuê
                            </button>
                            <button onclick="toggleSaveRoom(${room.id})" class="${isSaved ? 'bg-pink-500' : 'bg-gray-200 text-gray-600'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition">
                                <i class="fas fa-heart"></i>
                            </button>
                        `;
                    }
                })() : !currentUser ? `
                    <button onclick="hideModal('roomDetailModal');showModal('loginModal')" class="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                        <i class="fas fa-sign-in-alt mr-2"></i>Đăng nhập để thuê phòng
                    </button>
                ` : ''}
                <a href="tel:${landlord?.phone}" class="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">
                    <i class="fas fa-phone mr-2"></i>Gọi ngay
                </a>
            </div>
        </div>
    `;

    document.getElementById('roomDetailContent').innerHTML = content;
    showModal('roomDetailModal');
}

// Kiểm tra người thuê đã có phòng chưa
function hasActiveRental(userId) {
    const rooms = getRooms();
    return rooms.find(r => r.renterId === userId && r.status === 'rented');
}

// Open Rent Request Modal
function openRentRequest(roomId) {
    if (!currentUser) {
        hideModal('roomDetailModal');
        showModal('loginModal');
        return;
    }
    
    // Kiểm tra nếu người thuê đã có phòng đang thuê
    const activeRental = hasActiveRental(currentUser.id);
    if (activeRental) {
        showToast('Bạn đang thuê phòng rồi! Vui lòng trả phòng hiện tại trước khi thuê phòng mới.', 'warning');
        return;
    }
    
    hideModal('roomDetailModal');
    document.getElementById('rentRoomId').value = roomId;
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('rentMoveDate').min = today;
    
    showModal('rentRequestModal');
}

// Send Rent Request
function sendRentRequest(e) {
    e.preventDefault();
    
    if (!currentUser) {
        showModal('loginModal');
        return;
    }

    // Kiểm tra lại lần nữa nếu người thuê đã có phòng
    const activeRental = hasActiveRental(currentUser.id);
    if (activeRental) {
        showToast('Bạn đang thuê phòng rồi! Vui lòng trả phòng hiện tại trước khi thuê phòng mới.', 'warning');
        hideModal('rentRequestModal');
        return;
    }

    const requests = getRequests();
    const rooms = getRooms();
    const roomId = parseInt(document.getElementById('rentRoomId').value);
    const room = rooms.find(r => r.id === roomId);

    if (!room) {
        showToast('Phòng không tồn tại!', 'error');
        return;
    }

    // Kiểm tra phòng còn trống không
    if (room.status !== 'available') {
        showToast('Phòng này đã được thuê rồi!', 'error');
        hideModal('rentRequestModal');
        return;
    }

    // Check if already sent request for this room
    const existingRequest = requests.find(r => r.roomId === roomId && r.renterId === currentUser.id && r.status === 'pending');
    if (existingRequest) {
        showToast('Bạn đã gửi yêu cầu cho phòng này rồi!', 'warning');
        hideModal('rentRequestModal');
        return;
    }

    // Kiểm tra có yêu cầu pending nào khác không
    const pendingRequests = requests.filter(r => r.renterId === currentUser.id && r.status === 'pending');
    if (pendingRequests.length >= 3) {
        showToast('Bạn chỉ có thể gửi tối đa 3 yêu cầu cùng lúc!', 'warning');
        hideModal('rentRequestModal');
        return;
    }

    const newRequest = {
        id: requests.length + 1,
        roomId: roomId,
        renterId: currentUser.id,
        landlordId: room.landlordId,
        message: document.getElementById('rentMessage').value,
        moveDate: document.getElementById('rentMoveDate').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    requests.push(newRequest);
    saveRequests(requests);
    
    hideModal('rentRequestModal');
    showToast('Đã gửi yêu cầu thuê thành công!', 'success');
    
    // Clear form
    document.getElementById('rentMessage').value = '';
    document.getElementById('rentMoveDate').value = '';
}

// Toggle Save Room
function toggleSaveRoom(roomId) {
    if (!currentUser) {
        showModal('loginModal');
        return;
    }

    let saved = getSavedRooms();
    const existingIndex = saved.findIndex(s => s.roomId === roomId && s.userId === currentUser.id);
    
    if (existingIndex !== -1) {
        // Remove from saved
        saved.splice(existingIndex, 1);
        saveSavedRooms(saved);
        showToast('Đã bỏ lưu phòng!', 'success');
    } else {
        // Add to saved
        saved.push({ roomId, userId: currentUser.id, savedAt: new Date().toISOString() });
        saveSavedRooms(saved);
        showToast('Đã lưu phòng yêu thích!', 'success');
    }
    
    // Refresh room detail
    showRoomDetail(roomId);
}

// Add Room (Landlord)
function addRoom(e) {
    e.preventDefault();
    
    if (!currentUser || currentUser.role !== 'landlord') {
        showToast('Bạn không có quyền đăng phòng!', 'error');
        return;
    }
    
    const rooms = getRooms();
    
    // Get selected amenities
    const amenities = [];
    document.querySelectorAll('.room-amenity:checked').forEach(cb => {
        amenities.push(cb.value);
    });

    // Get images as base64
    const imageInput = document.getElementById('roomImages');
    
    const processRoom = (images) => {
        const newRoom = {
            id: rooms.length + 1,
            landlordId: currentUser.id,
            title: document.getElementById('roomTitle').value,
            price: parseInt(document.getElementById('roomPrice').value),
            area: parseInt(document.getElementById('roomArea').value),
            university: document.getElementById('roomUniversity').value,
            address: document.getElementById('roomAddress').value,
            description: document.getElementById('roomDescription').value,
            amenities: amenities,
            images: images,
            status: 'available',
            createdAt: new Date().toISOString()
        };

        rooms.push(newRoom);
        saveRooms(rooms);
        
        hideModal('addRoomModal');
        showToast('Đăng phòng thành công!', 'success');
        
        // Reset form
        e.target.reset();
        document.getElementById('imagePreviewContainer').innerHTML = '';
        document.querySelectorAll('.room-amenity').forEach(cb => cb.checked = false);
        
        loadLandlordData();
        loadRooms();
    };
    
    if (imageInput.files.length > 0) {
        const promises = Array.from(imageInput.files).map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(results => {
            processRoom(results);
        });
    } else {
        // Default image if none provided
        processRoom(['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600']);
    }
}

// Toggle Room Status
function toggleRoomStatus(roomId) {
    const rooms = getRooms();
    const roomIndex = rooms.findIndex(r => r.id === roomId);
    
    if (roomIndex === -1) return;
    
    rooms[roomIndex].status = rooms[roomIndex].status === 'available' ? 'rented' : 'available';
    saveRooms(rooms);
    
    loadLandlordData();
    loadRooms();
    showToast('Đã cập nhật trạng thái phòng!', 'success');
}

// Delete Room
function deleteRoom(roomId) {
    if (!confirm('Bạn có chắc chắn muốn xóa phòng này không?')) return;
    
    let rooms = getRooms();
    rooms = rooms.filter(r => r.id !== roomId);
    saveRooms(rooms);
    
    // Also delete related requests
    let requests = getRequests();
    requests = requests.filter(r => r.roomId !== roomId);
    saveRequests(requests);
    
    loadLandlordData();
    loadRooms();
    loadAdminData();
    showToast('Đã xóa phòng thành công!', 'success');
}