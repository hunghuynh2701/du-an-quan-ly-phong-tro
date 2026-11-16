// Renter Functions

// Load Renter Dashboard Data
function loadRenterData() {
    if (!currentUser || currentUser.role !== 'renter') return;
    
    const rooms = getRooms();
    const requests = getRequests();
    const savedRooms = getSavedRooms();
    const users = getUsers();

    // Tìm phòng đang thuê (phòng có renterId = currentUser.id)
    const myRentedRoom = rooms.find(r => r.renterId === currentUser.id && r.status === 'rented');
    
    // Filter requests sent by current renter
    const myRequests = requests.filter(r => r.renterId === currentUser.id);
    
    // Filter saved rooms by current renter
    const mySaved = savedRooms.filter(s => s.userId === currentUser.id);

    // Load phòng đang thuê trước
    loadMyRentedRoom(myRentedRoom, users);
    loadMySentRequests(myRequests, rooms, users);
    loadMySavedRooms(mySaved, rooms, users);
}

// Load phòng đang thuê
function loadMyRentedRoom(room, users) {
    const container = document.getElementById('myRentedRoom');
    if (!container) return;
    
    if (!room) {
        container.innerHTML = `
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-8 text-center">
                <i class="fas fa-home text-6xl text-purple-300 mb-4"></i>
                <p class="text-gray-600 text-xl font-medium">Bạn chưa thuê phòng nào</p>
                <p class="text-gray-400 mt-2">Tìm và gửi yêu cầu thuê phòng để bắt đầu</p>
                <button onclick="showPage('home')" class="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                    <i class="fas fa-search mr-2"></i>Tìm phòng ngay
                </button>
            </div>
        `;
        return;
    }
    
    const landlord = users.find(u => u.id === room.landlordId);
    const rentedDate = room.rentedAt ? new Date(room.rentedAt) : new Date();
    const today = new Date();
    const daysRented = Math.floor((today - rentedDate) / (1000 * 60 * 60 * 24));
    
    container.innerHTML = `
        <div class="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-2xl overflow-hidden text-white">
            <div class="p-6 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                        <i class="fas fa-check-circle text-3xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold">Phòng đang thuê</h3>
                        <p class="opacity-90">Đã thuê được ${daysRented} ngày</p>
                    </div>
                </div>
                <span class="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                    <i class="fas fa-calendar-check mr-1"></i>Từ ${formatDate(room.rentedAt)}
                </span>
            </div>
            
            <div class="bg-white text-gray-800 p-6">
                <div class="flex flex-wrap gap-6">
                    <!-- Hình ảnh phòng -->
                    <div class="w-full md:w-64 flex-shrink-0">
                        <div class="relative">
                            <img src="${room.images[0]}" alt="${room.title}" class="w-full h-48 object-cover rounded-xl shadow-lg">
                            ${room.images.length > 1 ? `
                                <span class="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                                    <i class="fas fa-images mr-1"></i>${room.images.length} ảnh
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Thông tin phòng -->
                    <div class="flex-1 min-w-[280px]">
                        <h4 class="text-xl font-bold text-gray-800 mb-2">${room.title}</h4>
                        <p class="text-2xl font-bold text-green-600 mb-3">${formatPrice(room.price)}<span class="text-sm text-gray-500 font-normal">/tháng</span></p>
                        
                        <div class="space-y-2 mb-4">
                            <p class="text-gray-600 flex items-center">
                                <i class="fas fa-map-marker-alt text-red-500 mr-2 w-5"></i>${room.address}
                            </p>
                            <p class="text-gray-600 flex items-center">
                                <i class="fas fa-university text-purple-500 mr-2 w-5"></i>Gần ${room.university}
                            </p>
                            <p class="text-gray-600 flex items-center">
                                <i class="fas fa-ruler-combined text-blue-500 mr-2 w-5"></i>${room.area}m²
                            </p>
                        </div>
                        
                        <!-- Tiện ích -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${room.amenities.slice(0, 5).map(a => `
                                <span class="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                                    <i class="${getAmenityIcon(a)} mr-1"></i>${a}
                                </span>
                            `).join('')}
                            ${room.amenities.length > 5 ? `
                                <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    +${room.amenities.length - 5}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Thông tin chủ trọ -->
                    <div class="w-full md:w-64 bg-gray-50 rounded-xl p-4">
                        <h5 class="font-bold text-gray-700 mb-3 flex items-center">
                            <i class="fas fa-user-tie text-purple-500 mr-2"></i>Chủ trọ
                        </h5>
                        <div class="flex items-center gap-3 mb-3">
                            <img src="${landlord?.avatar}" class="w-12 h-12 rounded-full">
                            <div>
                                <p class="font-semibold">${landlord?.name}</p>
                                <p class="text-gray-500 text-sm">Chủ phòng</p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <a href="tel:${landlord?.phone}" class="flex items-center text-green-600 hover:text-green-700">
                                <i class="fas fa-phone mr-2 w-5"></i>${landlord?.phone}
                            </a>
                            <a href="mailto:${landlord?.email}" class="flex items-center text-blue-600 hover:text-blue-700 text-sm">
                                <i class="fas fa-envelope mr-2 w-5"></i>${landlord?.email}
                            </a>
                        </div>
                        <a href="tel:${landlord?.phone}" class="mt-4 block w-full bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition">
                            <i class="fas fa-phone mr-1"></i>Gọi ngay
                        </a>
                    </div>
                </div>
                
                <!-- Thông tin hợp đồng -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                    <div class="grid md:grid-cols-4 gap-4 text-center">
                        <div class="bg-blue-50 p-4 rounded-xl">
                            <i class="fas fa-calendar-alt text-blue-500 text-2xl mb-2"></i>
                            <p class="text-gray-500 text-sm">Ngày bắt đầu</p>
                            <p class="font-bold text-gray-800">${formatDate(room.rentedAt)}</p>
                        </div>
                        <div class="bg-green-50 p-4 rounded-xl">
                            <i class="fas fa-clock text-green-500 text-2xl mb-2"></i>
                            <p class="text-gray-500 text-sm">Thời gian thuê</p>
                            <p class="font-bold text-gray-800">${daysRented} ngày</p>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-xl">
                            <i class="fas fa-money-bill-wave text-purple-500 text-2xl mb-2"></i>
                            <p class="text-gray-500 text-sm">Tiền phòng/tháng</p>
                            <p class="font-bold text-purple-600">${formatPrice(room.price)}</p>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-xl">
                            <i class="fas fa-file-contract text-yellow-500 text-2xl mb-2"></i>
                            <p class="text-gray-500 text-sm">Trạng thái</p>
                            <p class="font-bold text-green-600">Đang thuê</p>
                        </div>
                    </div>
                </div>
                
                <!-- Nút hành động -->
                <div class="mt-6 flex flex-wrap gap-3 justify-end">
                    <button onclick="showRoomDetail(${room.id})" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-eye mr-1"></i>Xem chi tiết phòng
                    </button>
                    <button onclick="requestCancelRental(${room.id})" class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                        <i class="fas fa-sign-out-alt mr-1"></i>Yêu cầu trả phòng
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Yêu cầu trả phòng từ phía người thuê
function requestCancelRental(roomId) {
    if (!confirm('Bạn có chắc chắn muốn trả phòng này không?\n\nLưu ý: Yêu cầu này sẽ được gửi đến chủ trọ để xử lý.')) {
        return;
    }
    
    // Tạo thông báo cho chủ trọ (có thể mở rộng thêm hệ thống notifications)
    showToast('Đã gửi yêu cầu trả phòng đến chủ trọ!', 'success');
    
    // Trong thực tế, có thể thêm vào bảng notifications hoặc requests
    // Ở đây mô phỏng bằng cách hiển thị thông tin liên hệ
    const rooms = getRooms();
    const users = getUsers();
    const room = rooms.find(r => r.id === roomId);
    const landlord = users.find(u => u.id === room?.landlordId);
    
    if (landlord) {
        setTimeout(() => {
            alert(`Vui lòng liên hệ chủ trọ để hoàn tất thủ tục trả phòng:\n\n👤 ${landlord.name}\n📞 ${landlord.phone}\n📧 ${landlord.email}`);
        }, 500);
    }
}

// Load My Sent Requests
function loadMySentRequests(myRequests, rooms, users) {
    const container = document.getElementById('mySentRequests');
    
    if (myRequests.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                <i class="fas fa-paper-plane text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Bạn chưa gửi yêu cầu thuê nào</p>
                <button onclick="showPage('home')" class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    <i class="fas fa-search mr-2"></i>Tìm phòng ngay
                </button>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    myRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = myRequests.map(req => {
        const room = rooms.find(r => r.id === req.roomId);
        const landlord = users.find(u => u.id === req.landlordId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div class="flex flex-wrap justify-between items-start gap-4">
                    <div class="flex gap-4 flex-1">
                        <img src="${room?.images[0] || 'https://via.placeholder.com/100'}" 
                             class="w-28 h-28 rounded-lg object-cover cursor-pointer hover:opacity-80 transition"
                             onclick="${room ? `showRoomDetail(${room.id})` : ''}">
                        <div class="flex-1">
                            <h4 class="font-bold text-lg text-gray-800 ${room ? 'cursor-pointer hover:text-purple-600' : ''}" 
                                onclick="${room ? `showRoomDetail(${room.id})` : ''}">
                                ${room?.title || 'Phòng đã bị xóa'}
                            </h4>
                            ${room ? `
                                <p class="text-purple-600 font-semibold text-lg">${formatPrice(room.price)}/tháng</p>
                                <p class="text-gray-500 text-sm mt-1">
                                    <i class="fas fa-map-marker-alt mr-1"></i>${room.address}
                                </p>
                            ` : ''}
                            <div class="mt-3 flex items-center">
                                <img src="${landlord?.avatar}" class="w-8 h-8 rounded-full mr-2">
                                <div>
                                    <p class="text-gray-600 font-medium">${landlord?.name}</p>
                                    <p class="text-gray-400 text-xs">${landlord?.phone}</p>
                                </div>
                            </div>
                            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p class="text-gray-500 text-sm">
                                    <i class="fas fa-comment mr-1"></i>Lời nhắn của bạn:
                                </p>
                                <p class="text-gray-600 italic">"${req.message}"</p>
                            </div>
                            <div class="mt-2 flex flex-wrap gap-4 text-sm">
                                <p class="text-gray-500">
                                    <i class="fas fa-calendar-check text-purple-500 mr-1"></i>
                                    Ngày vào: <strong>${formatDate(req.moveDate)}</strong>
                                </p>
                                <p class="text-gray-400">
                                    <i class="fas fa-clock mr-1"></i>
                                    Gửi: ${formatDate(req.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-3">
                        <span class="px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(req.status)}">
                            <i class="fas ${req.status === 'pending' ? 'fa-clock' : req.status === 'approved' ? 'fa-check-circle' : 'fa-times-circle'} mr-1"></i>
                            ${req.status === 'pending' ? 'Đang chờ duyệt' : req.status === 'approved' ? 'Đã được chấp nhận' : 'Đã bị từ chối'}
                        </span>
                        ${req.status === 'approved' ? `
                            <div class="text-center">
                                <p class="text-green-600 text-sm mb-2">
                                    <i class="fas fa-check-circle mr-1"></i>Chủ trọ đã đồng ý!
                                </p>
                                <a href="tel:${landlord?.phone}" class="inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">
                                    <i class="fas fa-phone mr-1"></i>Liên hệ ngay
                                </a>
                            </div>
                        ` : ''}
                        ${req.status === 'rejected' ? `
                            <div class="text-center">
                                <p class="text-red-500 text-sm mb-1">
                                    <i class="fas fa-times-circle mr-1"></i>Yêu cầu không được chấp nhận
                                </p>
                                ${req.autoRejected ? `
                                    <p class="text-orange-500 text-xs italic">
                                        <i class="fas fa-info-circle mr-1"></i>${req.rejectionReason || 'Phòng đã được cho người khác thuê'}
                                    </p>
                                ` : `
                                    <p class="text-gray-400 text-xs">
                                        Bạn có thể tìm phòng khác phù hợp hơn
                                    </p>
                                `}
                                <button onclick="showPage('home')" class="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
                                    <i class="fas fa-search mr-1"></i>Tìm phòng khác
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load My Saved Rooms
function loadMySavedRooms(mySaved, rooms, users) {
    const container = document.getElementById('savedRooms');
    
    if (mySaved.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 bg-white rounded-xl shadow-lg p-8 text-center">
                <i class="fas fa-heart text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Chưa có phòng yêu thích</p>
                <p class="text-gray-400 mt-2">Nhấn vào biểu tượng <i class="fas fa-heart text-pink-500"></i> khi xem phòng để lưu</p>
                <button onclick="showPage('home')" class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    <i class="fas fa-search mr-2"></i>Khám phá phòng trọ
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = mySaved.map(s => {
        const room = rooms.find(r => r.id === s.roomId);
        if (!room) return '';
        
        const landlord = users.find(u => u.id === room.landlordId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden room-card">
                <div class="relative cursor-pointer" onclick="showRoomDetail(${room.id})">
                    <img src="${room.images[0]}" alt="${room.title}" class="w-full h-48 object-cover">
                    <span class="absolute top-3 right-3 ${room.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded text-xs font-semibold">
                        ${room.status === 'available' ? 'Còn trống' : 'Đã thuê'}
                    </span>
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-800 mb-2 cursor-pointer hover:text-purple-600" onclick="showRoomDetail(${room.id})">
                        ${room.title}
                    </h3>
                    <p class="text-2xl font-bold text-purple-600 mb-2">${formatPrice(room.price)}</p>
                    <p class="text-gray-500 text-sm mb-3">
                        <i class="fas fa-map-marker-alt mr-1"></i>${truncateText(room.address, 30)}
                    </p>
                    <div class="flex items-center text-gray-500 text-sm mb-4">
                        <img src="${landlord?.avatar}" class="w-5 h-5 rounded-full mr-2">
                        ${landlord?.name}
                    </div>
                    <div class="flex gap-2">
                        <button onclick="showRoomDetail(${room.id})" class="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition">
                            <i class="fas fa-eye mr-1"></i>Xem chi tiết
                        </button>
                        <button onclick="removeSavedRoom(${room.id})" class="bg-pink-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-pink-600 transition">
                            <i class="fas fa-heart-broken"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).filter(html => html !== '').join('');
    
    if (container.innerHTML === '') {
        container.innerHTML = `
            <div class="col-span-3 bg-white rounded-xl shadow-lg p-8 text-center">
                <i class="fas fa-heart text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Chưa có phòng yêu thích</p>
            </div>
        `;
    }
}

// Remove Saved Room
function removeSavedRoom(roomId) {
    let saved = getSavedRooms();
    saved = saved.filter(s => !(s.roomId === roomId && s.userId === currentUser.id));
    saveSavedRooms(saved);
    
    loadRenterData();
    showToast('Đã bỏ lưu phòng!', 'success');
}
