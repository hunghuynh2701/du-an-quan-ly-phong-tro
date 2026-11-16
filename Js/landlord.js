// Landlord Functions

// Load Landlord Dashboard Data
function loadLandlordData() {
    if (!currentUser || currentUser.role !== 'landlord') return;
    
    const rooms = getRooms();
    const requests = getRequests();
    const users = getUsers();
    
    // Filter rooms owned by current landlord
    const myRooms = rooms.filter(r => r.landlordId === currentUser.id);
    
    // Filter requests for landlord's rooms
    const myRequests = requests.filter(r => r.landlordId === currentUser.id);

    loadMyRooms(myRooms);
    loadMyRequests(myRequests, rooms, users);
}

// Load My Rooms
function loadMyRooms(myRooms) {
    const container = document.getElementById('myRooms');
    const users = getUsers();
    
    if (myRooms.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-12 bg-white rounded-xl shadow">
                <i class="fas fa-home text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Bạn chưa đăng phòng trọ nào</p>
                <button onclick="showModal('addRoomModal')" class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                    <i class="fas fa-plus mr-2"></i>Đăng phòng ngay
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = myRooms.map(room => {
        const renter = room.renterId ? users.find(u => u.id === room.renterId) : null;
        
        return `
            <div class="bg-white rounded-xl shadow-lg overflow-hidden room-card">
                <div class="relative">
                    <img src="${room.images[0]}" alt="${room.title}" class="w-full h-48 object-cover">
                    <span class="absolute top-3 left-3 ${room.status === 'available' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${room.status === 'available' ? 'Còn trống' : 'Đã cho thuê'}
                    </span>
                    ${room.images.length > 1 ? `
                        <span class="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                            <i class="fas fa-images mr-1"></i>${room.images.length}
                        </span>
                    ` : ''}
                </div>
                <div class="p-5">
                    <h3 class="text-lg font-bold text-gray-800 mb-2">${room.title}</h3>
                    <p class="text-2xl font-bold text-purple-600 mb-2">${formatPrice(room.price)}</p>
                    <p class="text-gray-500 text-sm mb-3">
                        <i class="fas fa-map-marker-alt mr-1"></i>${truncateText(room.address, 35)}
                    </p>
                    <p class="text-gray-400 text-xs mb-3">
                        <i class="fas fa-university mr-1"></i>${room.university}
                    </p>
                    
                    ${room.status === 'rented' && renter ? `
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <p class="text-blue-800 text-sm font-semibold mb-2">
                                <i class="fas fa-user-check mr-1"></i>Người đang thuê:
                            </p>
                            <div class="flex items-center gap-2">
                                <img src="${renter.avatar}" class="w-8 h-8 rounded-full">
                                <div>
                                    <p class="text-blue-700 font-medium text-sm">${renter.name}</p>
                                    <p class="text-blue-600 text-xs">${renter.phone}</p>
                                </div>
                            </div>
                            ${room.rentedAt ? `
                                <p class="text-blue-500 text-xs mt-2">
                                    <i class="fas fa-calendar mr-1"></i>Từ: ${formatDate(room.rentedAt)}
                                </p>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="flex gap-2 flex-wrap">
                        ${room.status === 'rented' ? `
                            <button onclick="cancelRental(${room.id})" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition">
                                <i class="fas fa-undo mr-1"></i>Hủy hợp đồng
                            </button>
                        ` : `
                            <button onclick="toggleRoomStatus(${room.id})" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition">
                                <i class="fas fa-sync-alt mr-1"></i>Đánh dấu đã thuê
                            </button>
                        `}
                        <button onclick="showRoomDetail(${room.id})" class="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="deleteRoom(${room.id})" class="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load My Requests (requests from renters)
function loadMyRequests(myRequests, rooms, users) {
    const container = document.getElementById('myRequests');
    
    if (myRequests.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-xl">Chưa có yêu cầu thuê nào</p>
                <p class="text-gray-400 mt-2">Các yêu cầu từ người thuê sẽ hiển thị tại đây</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    myRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = myRequests.map(req => {
        const room = rooms.find(r => r.id === req.roomId);
        const renter = users.find(u => u.id === req.renterId);
        
        return `
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div class="flex flex-wrap justify-between items-start gap-4">
                    <div class="flex gap-4 flex-1">
                        <img src="${room?.images[0] || 'https://via.placeholder.com/100'}" class="w-24 h-24 rounded-lg object-cover">
                        <div class="flex-1">
                            <h4 class="font-bold text-lg text-gray-800">${room?.title || 'Phòng đã xóa'}</h4>
                            <div class="mt-2 space-y-1">
                                <p class="text-gray-600 flex items-center">
                                    <img src="${renter?.avatar}" class="w-5 h-5 rounded-full mr-2">
                                    <span class="font-medium">${renter?.name}</span>
                                </p>
                                <p class="text-gray-500 text-sm">
                                    <i class="fas fa-phone text-green-500 mr-2"></i>${renter?.phone}
                                </p>
                                <p class="text-gray-500 text-sm">
                                    <i class="fas fa-envelope text-blue-500 mr-2"></i>${renter?.email}
                                </p>
                            </div>
                            <div class="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p class="text-gray-600 text-sm italic">"${req.message}"</p>
                            </div>
                            <p class="text-gray-500 text-sm mt-2">
                                <i class="fas fa-calendar-check text-purple-500 mr-1"></i>
                                Ngày muốn vào: <strong>${formatDate(req.moveDate)}</strong>
                            </p>
                            <p class="text-gray-400 text-xs mt-1">
                                <i class="fas fa-clock mr-1"></i>Gửi lúc: ${formatDate(req.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeClass(req.status)}">
                            ${getStatusText(req.status)}
                        </span>
                        ${req.status === 'pending' ? `
                            <div class="flex gap-2 mt-2">
                                <button onclick="updateRequestStatus(${req.id}, 'approved')" class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition">
                                    <i class="fas fa-check mr-1"></i>Duyệt
                                </button>
                                <button onclick="updateRequestStatus(${req.id}, 'rejected')" class="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                                    <i class="fas fa-times mr-1"></i>Từ chối
                                </button>
                            </div>
                        ` : ''}
                        ${req.status === 'approved' ? `
                            <p class="text-green-600 text-xs mt-1">
                                <i class="fas fa-check-circle mr-1"></i>Đã chấp nhận cho thuê
                            </p>
                        ` : ''}
                        ${req.status === 'rejected' && req.autoRejected ? `
                            <p class="text-orange-500 text-xs mt-1 italic">
                                <i class="fas fa-info-circle mr-1"></i>${req.rejectionReason || 'Tự động từ chối'}
                            </p>
                        ` : ''}
                        <a href="tel:${renter?.phone}" class="text-green-600 hover:text-green-700 text-sm">
                            <i class="fas fa-phone mr-1"></i>Gọi ngay
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update Request Status
function updateRequestStatus(requestId, status) {
    const requests = getRequests();
    const rooms = getRooms();
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
        showToast('Không tìm thấy yêu cầu!', 'error');
        return;
    }
    
    const currentRequest = requests[requestIndex];
    const roomId = currentRequest.roomId;
    const renterId = currentRequest.renterId;
    
    // Cập nhật trạng thái yêu cầu hiện tại
    requests[requestIndex].status = status;
    requests[requestIndex].updatedAt = new Date().toISOString();
    
    if (status === 'approved') {
        // Kiểm tra xem người thuê đã có phòng chưa
        const renterHasRoom = rooms.find(r => r.renterId === renterId && r.status === 'rented');
        if (renterHasRoom) {
            showToast('Người thuê này đã có phòng đang thuê rồi!', 'error');
            return;
        }
        
        // 1. Tự động cập nhật trạng thái phòng thành "đã cho thuê"
        const roomIndex = rooms.findIndex(r => r.id === roomId);
        if (roomIndex !== -1) {
            rooms[roomIndex].status = 'rented';
            rooms[roomIndex].renterId = renterId; // Lưu ID người thuê
            rooms[roomIndex].rentedAt = new Date().toISOString();
            saveRooms(rooms);
        }
        
        // 2. Tự động từ chối tất cả các yêu cầu khác cho cùng phòng này
        requests.forEach((req, index) => {
            if (req.roomId === roomId && req.id !== requestId && req.status === 'pending') {
                requests[index].status = 'rejected';
                requests[index].updatedAt = new Date().toISOString();
                requests[index].autoRejected = true;
                requests[index].rejectionReason = 'Phòng đã được cho người khác thuê';
            }
        });
        
        // 3. Tự động từ chối tất cả các yêu cầu pending khác của người thuê này (vì họ chỉ được thuê 1 phòng)
        requests.forEach((req, index) => {
            if (req.renterId === renterId && req.id !== requestId && req.status === 'pending') {
                requests[index].status = 'rejected';
                requests[index].updatedAt = new Date().toISOString();
                requests[index].autoRejected = true;
                requests[index].rejectionReason = 'Bạn đã được duyệt thuê phòng khác';
            }
        });
        
        saveRequests(requests);
        
        // Refresh tất cả data
        loadLandlordData();
        loadRooms();
        
        showToast('🎉 Đã duyệt yêu cầu! Phòng đã được đánh dấu "Đã cho thuê". Các yêu cầu khác của người thuê này cũng đã bị hủy tự động.', 'success');
    } else {
        saveRequests(requests);
        loadLandlordData();
        showToast('Đã từ chối yêu cầu thuê.', 'success');
    }
}

// Hủy hợp đồng thuê - trả phòng về trạng thái còn trống
function cancelRental(roomId) {
    if (!confirm('Bạn có chắc chắn muốn hủy hợp đồng thuê phòng này?\nPhòng sẽ được đánh dấu "Còn trống" và có thể nhận yêu cầu thuê mới.')) {
        return;
    }
    
    const rooms = getRooms();
    const roomIndex = rooms.findIndex(r => r.id === roomId);
    
    if (roomIndex === -1) {
        showToast('Không tìm thấy phòng!', 'error');
        return;
    }
    
    // Cập nhật trạng thái phòng
    rooms[roomIndex].status = 'available';
    rooms[roomIndex].previousRenterId = rooms[roomIndex].renterId;
    rooms[roomIndex].renterId = null;
    rooms[roomIndex].rentedAt = null;
    rooms[roomIndex].cancelledAt = new Date().toISOString();
    saveRooms(rooms);
    
    // Refresh data
    loadLandlordData();
    loadRooms();
    
    showToast('Đã hủy hợp đồng thuê! Phòng đã được đánh dấu "Còn trống".', 'success');
}