<p align="center">
  <img src="assets/repo-banner.svg" alt="Hệ thống Quản Lý Phòng Trọ Đà Nẵng" width="100%">
</p>

[![Status](https://img.shields.io/badge/status-demo-success)](https://github.com/hunghuynh2701/du-an-quan-ly-phong-tro)
[![Tech](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)](https://github.com/hunghuynh2701/du-an-quan-ly-phong-tro)

## Giới thiệu đề tài

Nhu cầu tìm kiếm chỗ ở phù hợp tại Đà Nẵng, đặc biệt đối với sinh viên và người lao động, đòi hỏi thông tin phòng trọ cần được trình bày rõ ràng và dễ tra cứu. Đề tài **“Hệ thống Quản Lý Phòng Trọ Đà Nẵng”** xây dựng một giao diện web minh họa quy trình tìm kiếm phòng và quản lý thông tin theo các vai trò người thuê, chủ trọ và quản trị viên.

Đây là phiên bản frontend phục vụ mục đích học tập và trình diễn. Dữ liệu mẫu được lưu trong trình duyệt bằng `localStorage`; dự án chưa kết nối máy chủ hoặc cơ sở dữ liệu dùng chung.

## Mục tiêu đề tài

- Xây dựng giao diện web giúp người thuê tra cứu phòng theo trường đại học, khoảng giá và diện tích.
- Minh họa các chức năng cơ bản cho người thuê, chủ trọ và quản trị viên.
- Thực hành tổ chức ứng dụng frontend bằng HTML, CSS và JavaScript.
- Tạo nền tảng để có thể phát triển tiếp với backend, cơ sở dữ liệu và xác thực thực tế.

## Phạm vi thực hiện

- Địa bàn và dữ liệu minh họa: các phòng trọ tại Đà Nẵng.
- Chức năng tập trung vào tìm kiếm, hiển thị và quản lý dữ liệu mẫu trong trình duyệt.
- Không bao gồm giao dịch thuê thực tế, xác minh danh tính, thanh toán hoặc đồng bộ dữ liệu giữa nhiều người dùng.

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
├── assets/
│   ├── logo.svg
│   └── repo-banner.svg
├── README.md
└── .gitignore
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

Dự án hiện đang là phiên bản demo frontend, tập trung vào giao diện người dùng và trải nghiệm tương tác. Dữ liệu ban đầu được mô phỏng trong JavaScript và lưu tại `localStorage` của trình duyệt, vì vậy dữ liệu không được chia sẻ giữa các thiết bị. Không sử dụng dữ liệu demo cho môi trường thực tế.

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
