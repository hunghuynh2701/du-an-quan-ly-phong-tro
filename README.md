# Dự án Quản Lý Phòng Trọ

Website quản lý và tìm kiếm phòng trọ theo khu vực, trường học và mức giá tại Đà Nẵng. Dự án được xây dựng bằng HTML, CSS và JavaScript thuần, phù hợp cho mục tiêu demo hoặc đồ án chuyên ngành.

## Tính năng chính

- Tìm kiếm phòng trọ theo:
  - trường đại học
  - khoảng giá
  - diện tích
- Xem danh sách phòng trọ mới nhất
- Đăng ký / đăng nhập người dùng
- Giao diện dành cho:
  - người thuê trọ
  - chủ trọ
  - quản trị viên
- Quản lý phòng trọ và yêu cầu thuê
- Dashboard thống kê cơ bản

## Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (trực tiếp qua CDN)
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
└── README.md
```

## Cách chạy dự án

Vì đây là dự án dạng static website, bạn chỉ cần mở file `index.html` trong trình duyệt.

Hoặc nếu muốn chạy qua máy chủ local nhẹ hơn:

```bash
python -m http.server 8000
```

Sau đó mở địa chỉ:

```text
http://localhost:8000
```

## Hướng dẫn sử dụng

1. Mở trang chủ để xem danh sách phòng trọ.
2. Chọn tiêu chí tìm kiếm phù hợp.
3. Nhấn nút "Đăng Nhập" hoặc "Đăng Ký" để vào hệ thống.
4. Theo vai trò tương ứng:
   - Người thuê: xem phòng và gửi yêu cầu thuê
   - Chủ trọ: quản lý phòng trọ
   - Admin: quản lý người dùng, yêu cầu và thống kê

## Ghi chú

Dự án hiện là phiên bản demo frontend / logic giả lập trong trình duyệt. Nếu muốn nâng cấp thành sản phẩm thực tế, nên bổ sung:

- backend (Node.js / PHP / Java / .NET)
- database (MySQL / PostgreSQL / MongoDB)
- xác thực người dùng thực tế
- upload hình ảnh phòng trọ
- API REST

## Tác giả

- Huỳnh Duy Hưng

## License

Dự án này được cung cấp để phục vụ mục đích học tập và đồ án chuyên ngành.
