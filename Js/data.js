// Data Initialization
function initData() {
    // Initialize Users
    if (!localStorage.getItem('users')) {
        const users = [
            { 
                id: 1, 
                name: 'Admin', 
                email: 'admin@trodanang.vn', 
                password: 'admin123', 
                phone: '0901234567', 
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff'
            },
            { 
                id: 2, 
                name: 'Nguyễn Văn A', 
                email: 'landlord@gmail.com', 
                password: '123456', 
                phone: '0912345678', 
                role: 'landlord',
                avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10b981&color=fff'
            },
            { 
                id: 3, 
                name: 'Trần Thị B', 
                email: 'renter@gmail.com', 
                password: '123456', 
                phone: '0923456789', 
                role: 'renter',
                avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=f59e0b&color=fff'
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Initialize Rooms
    if (!localStorage.getItem('rooms')) {
        const rooms = [
            {
                id: 1,
                landlordId: 2,
                title: 'Phòng trọ cao cấp gần ĐH Bách Khoa',
                price: 2500000,
                area: 25,
                university: 'Đại học Bách Khoa',
                address: '123 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng',
                description: 'Phòng trọ mới xây, sạch sẽ, thoáng mát. Gần trường ĐH Bách Khoa, thuận tiện đi lại. Có ban công view đẹp, ánh sáng tự nhiên tốt.',
                amenities: ['WiFi', 'Điều hòa', 'Nóng lạnh', 'WC riêng', 'Bãi xe', 'Ban công'],
                images: [
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                landlordId: 2,
                title: 'Phòng studio full nội thất gần ĐH Kinh Tế',
                price: 3800000,
                area: 35,
                university: 'Đại học Kinh Tế',
                address: '456 Ngũ Hành Sơn, Đà Nẵng',
                description: 'Phòng studio đầy đủ nội thất cao cấp, view biển, an ninh 24/7. Thích hợp cho sinh viên và người đi làm.',
                amenities: ['WiFi', 'Điều hòa', 'Nóng lạnh', 'Tủ lạnh', 'Máy giặt', 'Ban công', 'Bếp', 'WC riêng'],
                images: [
                    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600',
                    'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                landlordId: 2,
                title: 'Phòng trọ giá rẻ cho sinh viên gần ĐH Duy Tân',
                price: 1500000,
                area: 18,
                university: 'Đại học Duy Tân',
                address: '789 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng',
                description: 'Phòng trọ giá sinh viên, gần trường ĐH Duy Tân, chợ và siêu thị. Điện nước giá dân.',
                amenities: ['WiFi', 'Nóng lạnh', 'Bãi xe'],
                images: [
                    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                landlordId: 2,
                title: 'Căn hộ mini hiện đại gần ĐH FPT',
                price: 4500000,
                area: 45,
                university: 'Đại học FPT',
                address: '101 Trần Phú, Hải Châu, Đà Nẵng',
                description: 'Căn hộ mini full nội thất hiện đại, view sông Hàn, bảo vệ 24/7. Thích hợp cho sinh viên và người đi làm.',
                amenities: ['WiFi', 'Điều hòa', 'Nóng lạnh', 'Tủ lạnh', 'Máy giặt', 'Ban công', 'Bếp', 'WC riêng', 'Thang máy'],
                images: [
                    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
                    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
                    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                landlordId: 2,
                title: 'Phòng trọ sạch đẹp gần ĐH Sư Phạm',
                price: 2000000,
                area: 20,
                university: 'Đại học Sư Phạm',
                address: '55 Tôn Đức Thắng, Liên Chiểu, Đà Nẵng',
                description: 'Phòng trọ mới sơn sửa, sạch sẽ thoáng mát, gần chợ và trường học. Chủ nhà thân thiện.',
                amenities: ['WiFi', 'Nóng lạnh', 'Bãi xe', 'WC riêng'],
                images: [
                    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            },
            {
                id: 6,
                landlordId: 2,
                title: 'Phòng trọ view đẹp gần ĐH Ngoại Ngữ',
                price: 2200000,
                area: 22,
                university: 'Đại học Ngoại Ngữ',
                address: '88 Lê Duẩn, Hải Châu, Đà Nẵng',
                description: 'Phòng trọ view công viên, yên tĩnh thích hợp học tập. Gần ĐH Ngoại Ngữ và các tiện ích.',
                amenities: ['WiFi', 'Điều hòa', 'Nóng lạnh', 'WC riêng', 'Ban công'],
                images: [
                    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
                    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600'
                ],
                status: 'available',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }

    // Initialize Requests
    if (!localStorage.getItem('requests')) {
        localStorage.setItem('requests', JSON.stringify([]));
    }

    // Initialize Saved Rooms
    if (!localStorage.getItem('savedRooms')) {
        localStorage.setItem('savedRooms', JSON.stringify([]));
    }
}

// Get data helpers
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function getRooms() {
    return JSON.parse(localStorage.getItem('rooms')) || [];
}

function getRequests() {
    return JSON.parse(localStorage.getItem('requests')) || [];
}

function getSavedRooms() {
    return JSON.parse(localStorage.getItem('savedRooms')) || [];
}

// Save data helpers
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveRooms(rooms) {
    localStorage.setItem('rooms', JSON.stringify(rooms));
}

function saveRequests(requests) {
    localStorage.setItem('requests', JSON.stringify(requests));
}

function saveSavedRooms(saved) {
    localStorage.setItem('savedRooms', JSON.stringify(saved));
}
