// Modals HTML Templates

function loadModals() {
    const modalsHTML = `
    <!-- Room Detail Modal -->
    <div id="roomDetailModal" class="modal fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto slide-in">
            <div id="roomDetailContent"></div>
        </div>
    </div>

    <!-- Login Modal -->
    <div id="loginModal" class="modal fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-8 slide-in">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-sign-in-alt text-purple-600 mr-2"></i>Đăng Nhập
                </h3>
                <button onclick="hideModal('loginModal')" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form onsubmit="login(event)">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-envelope mr-1"></i>Email
                    </label>
                    <input type="email" id="loginEmail" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập email của bạn">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-lock mr-1"></i>Mật khẩu
                    </label>
                    <input type="password" id="loginPassword" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập mật khẩu">
                </div>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    <i class="fas fa-sign-in-alt mr-2"></i>Đăng Nhập
                </button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-gray-600">
                    Chưa có tài khoản? 
                    <a href="#" onclick="hideModal('loginModal');showModal('registerModal')" class="text-purple-600 font-semibold hover:underline">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-500 mb-2"><strong>Tài khoản demo:</strong></p>
                <p class="text-xs text-gray-500">Admin: admin@trodanang.vn / admin123</p>
                <p class="text-xs text-gray-500">Chủ trọ: landlord@gmail.com / 123456</p>
                <p class="text-xs text-gray-500">Người thuê: renter@gmail.com / 123456</p>
            </div>
        </div>
    </div>

    <!-- Register Modal -->
    <div id="registerModal" class="modal fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto slide-in">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-user-plus text-purple-600 mr-2"></i>Đăng Ký
                </h3>
                <button onclick="hideModal('registerModal')" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form onsubmit="register(event)">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-user mr-1"></i>Họ và tên
                    </label>
                    <input type="text" id="regName" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập họ và tên">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-envelope mr-1"></i>Email
                    </label>
                    <input type="email" id="regEmail" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập email">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-phone mr-1"></i>Số điện thoại
                    </label>
                    <input type="tel" id="regPhone" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập số điện thoại">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-lock mr-1"></i>Mật khẩu
                    </label>
                    <input type="password" id="regPassword" required minlength="6"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">
                        <i class="fas fa-user-tag mr-1"></i>Bạn là
                    </label>
                    <select id="regRole" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                        <option value="renter">Người tìm thuê trọ</option>
                        <option value="landlord">Người cho thuê trọ</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    <i class="fas fa-user-plus mr-2"></i>Đăng Ký
                </button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-gray-600">
                    Đã có tài khoản? 
                    <a href="#" onclick="hideModal('registerModal');showModal('loginModal')" class="text-purple-600 font-semibold hover:underline">
                        Đăng nhập
                    </a>
                </p>
            </div>
        </div>
    </div>

    <!-- Add Room Modal -->
    <div id="addRoomModal" class="modal fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto slide-in">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-plus-circle text-purple-600 mr-2"></i>Đăng Phòng Trọ Mới
                </h3>
                <button onclick="hideModal('addRoomModal')" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form onsubmit="addRoom(event)">
                <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Tiêu đề phòng</label>
                        <input type="text" id="roomTitle" required 
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="VD: Phòng trọ cao cấp...">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Giá thuê (VNĐ/tháng)</label>
                        <input type="number" id="roomPrice" required min="500000"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="VD: 2000000">
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Diện tích (m²)</label>
                        <input type="number" id="roomArea" required min="5"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="VD: 20">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Gần trường đại học</label>
                        <select id="roomUniversity" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                            <option value="">Chọn trường</option>
                            <option value="Đại học Bách Khoa">ĐH Bách Khoa Đà Nẵng</option>
                            <option value="Đại học Kinh Tế">ĐH Kinh Tế Đà Nẵng</option>
                            <option value="Đại học Sư Phạm">ĐH Sư Phạm Đà Nẵng</option>
                            <option value="Đại học Ngoại Ngữ">ĐH Ngoại Ngữ Đà Nẵng</option>
                            <option value="Đại học Duy Tân">ĐH Duy Tân</option>
                            <option value="Đại học FPT">ĐH FPT Đà Nẵng</option>
                            <option value="Đại học Đông Á">ĐH Đông Á</option>
                        </select>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Địa chỉ chi tiết</label>
                    <input type="text" id="roomAddress" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="VD: 123 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Mô tả chi tiết</label>
                    <textarea id="roomDescription" rows="4" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Mô tả về phòng trọ, tiện ích xung quanh..."></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Tiện ích phòng</label>
                    <div class="grid grid-cols-3 gap-3">
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="WiFi" class="room-amenity mr-2 text-purple-600"> WiFi
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Điều hòa" class="room-amenity mr-2"> Điều hòa
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Nóng lạnh" class="room-amenity mr-2"> Nóng lạnh
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Tủ lạnh" class="room-amenity mr-2"> Tủ lạnh
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Máy giặt" class="room-amenity mr-2"> Máy giặt
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Bãi xe" class="room-amenity mr-2"> Bãi xe
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Ban công" class="room-amenity mr-2"> Ban công
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="Bếp" class="room-amenity mr-2"> Bếp riêng
                        </label>
                        <label class="flex items-center p-2 border rounded-lg hover:bg-purple-50 cursor-pointer">
                            <input type="checkbox" value="WC riêng" class="room-amenity mr-2"> WC riêng
                        </label>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Hình ảnh phòng (có thể chọn nhiều)</label>
                    <input type="file" id="roomImages" multiple accept="image/*" 
                        class="w-full p-3 border border-gray-300 rounded-lg" onchange="previewImages(event)">
                    <div id="imagePreviewContainer" class="flex flex-wrap gap-2 mt-3"></div>
                </div>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    <i class="fas fa-plus mr-2"></i>Đăng Phòng
                </button>
            </form>
        </div>
    </div>

    <!-- Rent Request Modal -->
    <div id="rentRequestModal" class="modal fixed inset-0 bg-black/50 z-50 items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-8 slide-in">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-paper-plane text-purple-600 mr-2"></i>Gửi Yêu Cầu Thuê
                </h3>
                <button onclick="hideModal('rentRequestModal')" class="text-gray-500 hover:text-gray-700 text-2xl">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form onsubmit="sendRentRequest(event)">
                <input type="hidden" id="rentRoomId">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2">Lời nhắn đến chủ trọ</label>
                    <textarea id="rentMessage" rows="4" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="Giới thiệu về bản thân, nhu cầu thuê phòng..."></textarea>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2">Ngày muốn dọn vào</label>
                    <input type="date" id="rentMoveDate" required 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                </div>
                <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                    <i class="fas fa-paper-plane mr-2"></i>Gửi Yêu Cầu
                </button>
            </form>
        </div>
    </div>
    `;

    document.getElementById('modalsContainer').innerHTML = modalsHTML;
}

// Preview Images when selecting files
function previewImages(e) {
    const container = document.getElementById('imagePreviewContainer');
    container.innerHTML = '';
    const files = e.target.files;
    
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'relative';
            div.innerHTML = `
                <img src="${e.target.result}" class="w-20 h-20 rounded-lg object-cover border-2 border-purple-200">
            `;
            container.appendChild(div);
        }
        reader.readAsDataURL(file);
    }
}

// Close modals on outside click
function setupModalCloseOnOutsideClick() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}
