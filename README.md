# Hệ thống Quản Lý Phòng Trọ Đà Nẵng

[![Status](https://img.shields.io/badge/status-demo-success)](https://github.com/hunghuynh2701/du-an-quan-ly-phong-tro)
[![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)](https://github.com/hunghuynh2701/du-an-quan-ly-phong-tro)

## Tổng quan

Dự án này là một hệ thống quản lý và tìm kiếm phòng trọ được xây dựng nhằm hỗ trợ người thuê, chủ trọ và quản trị viên trong việc quản lý thông tin phòng trọ tại Đà Nẵng. Hệ thống cung cấp giao diện trực quan, dễ sử dụng, phù hợp cho mục tiêu triển khai như một sản phẩm demo hoặc ứng dụng học tập trong đồ án chuyên ngành.

Mục tiêu chính của dự án là:
- giúp người thuê tìm phòng trọ theo tiêu chí như vị trí, mức giá, diện tích và trường học gần đó;
- hỗ trợ chủ trọ quản lý danh sách phòng và thông tin liên quan;
- hỗ trợ quản trị viên theo dõi người dùng, yêu cầu thuê và thống kê cơ bản.

## Chức năng chính

### 1. Tìm kiếm và lọc phòng trọ
- Tìm phòng theo trường đại học
- Lọc theo khoảng giá
- Lọc theo diện tích phòng
- Hiển thị các phòng trọ mới nhất

### 2. Đăng ký và đăng nhập
- Người dùng có thể tạo tài khoản mới
- Hệ thống hỗ trợ đăng nhập với vai trò khác nhau

### 3. Dashboard theo vai trò
- Người thuê: xem thông tin phòng phù hợp và gửi yêu cầu thuê
- Chủ trọ: quản lý phòng trọ
- Quản trị viên: kiểm soát người dùng, yêu cầu thuê và thống kê dữ liệu

### 4. Quản lý dữ liệu
- Quản lý danh sách phòng trọ
- Quản lý người dùng
- Quản lý yêu cầu thuê
- Hiển thị các thống kê cơ bản

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (qua CDN)
- Font Awesome

## Cấu trúc thư mục

```text
.
├── index.html
├── Css/
│   └── style.css
├── Js/
│   ├── admin.js
│   ├── app.js
│   ├── auth.js
│   ├── data.js
│   ├── landlord.js
│   ├── modals.js
│   ├── renter.js
│   ├── rooms.js
│   └── utils.js
├── README.md
└── LICENSE (nếu có)
```

## Yêu cầu hệ thống

- Trình duyệt hiện đại như Chrome, Edge, Firefox
- Không yêu cầu cài đặt môi trường phức tạp vì đây là dự án frontend tĩnh

## Hướng dẫn chạy dự án

### Cách 1: Mở trực tiếp trong trình duyệt
- Mở file `index.html` bằng trình duyệt Chrome/Edge/Firefox.

### Cách 2: Chạy bằng máy chủ local

```bash
python -m http.server 8000
```

Sau đó mở địa chỉ:

```text
http://localhost:8000
```

## Quy trình sử dụng

1. Mở trang chủ của hệ thống.
2. Chọn tiêu chí tìm kiếm phù hợp như trường học, khoảng giá hoặc diện tích.
3. Nhấn nút "Tìm Kiếm" để lọc danh sách phòng.
4. Nếu cần, thực hiện đăng nhập hoặc đăng ký tài khoản.
5. Dựa trên vai trò, người dùng sẽ truy cập vào các chức năng quản lý tương ứng.

## Ghi chú về dự án

Dự án hiện đang là phiên bản demo frontend, tập trung vào giao diện người dùng và trải nghiệm tương tác. Nội dung dữ liệu được mô phỏng trong JavaScript để minh họa chức năng hệ thống. Đây là nền tảng phù hợp để tiếp tục phát triển thêm backend, database và xác thực người dùng thực tế trong các giai đoạn sau.

## Phát triển trong tương lai

Các tính năng có thể mở rộng trong phiên bản nâng cấp:
- backend bằng Node.js, PHP hoặc Java
- database MySQL/PostgreSQL/MongoDB
- xác thực người dùng thực tế
- quản lý hình ảnh phòng trọ
- API RESTful
- phân quyền người dùng chi tiết hơn
- báo cáo thống kê nâng cao

## Tác giả

- Huỳnh Duy Hưng

## Giấy phép

Dự án này được cung cấp cho mục đích học tập, nghiên cứu và thực hiện đồ án chuyên ngành.

## Liên kết

- GitHub Repository: https://github.com/hunghuynh2701/du-an-quan-ly-phong-tro
