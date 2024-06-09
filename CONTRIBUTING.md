# Đóng góp cho Social Media

Chúng tôi rất cảm ơn sự quan tâm của bạn đến việc đóng góp cho dự án Social Media. Để đảm bảo rằng quá trình đóng góp diễn ra suôn sẻ và hiệu quả, vui lòng đọc và tuân thủ các hướng dẫn dưới đây.

## Mục lục

1. [Quy tắc chung](#quy-tắc-chung)
2. [Báo cáo lỗi](#báo-cáo-lỗi)
3. [Yêu cầu tính năng](#yêu-cầu-tính-năng)
4. [Đóng góp mã nguồn](#đóng-góp-mã-nguồn)
5. [Hướng dẫn commit message](#hướng-dẫn-commit-message)
6. [Quy trình pull request](#quy-trình-pull-request)

## Quy tắc chung

- Tôn trọng tất cả mọi người tham gia vào dự án.
- Đảm bảo rằng mọi đóng góp đều tuân thủ giấy phép MIT.
- Viết mã rõ ràng, dễ hiểu và tuân thủ các tiêu chuẩn mã nguồn của dự án.
- Đảm bảo rằng tất cả các bài kiểm tra đều được chạy thành công trước khi gửi pull request.

## Báo cáo lỗi

Nếu bạn tìm thấy lỗi, vui lòng tạo một issue mới với các thông tin sau:

1. **Mô tả chi tiết về lỗi.**
2. **Các bước để tái hiện lỗi.**
3. **Môi trường chạy (hệ điều hành, trình duyệt, phiên bản Node.js, v.v.).**
4. **Log lỗi (nếu có).**

## Yêu cầu tính năng

Nếu bạn có ý tưởng về tính năng mới hoặc cải tiến tính năng hiện có, vui lòng tạo một issue mới và cung cấp:

1. **Mô tả chi tiết về tính năng.**
2. **Lý do tại sao tính năng này cần thiết.**
3. **Cách tính năng này sẽ hoạt động.**

## Đóng góp mã nguồn

### Thiết lập môi trường phát triển

1. Fork repository này.
2. Clone fork repository về máy của bạn:
    ```bash
    git clone https://github.com/thaoanhhaa1/redux-social-media.git
    ```
3. Tạo một branch mới để thực hiện thay đổi:
    ```bash
    git checkout -b feature/your-feature-name
    ```
4. Cài đặt các dependencies:
    ```bash
    npm install
    ```

### Thực hiện thay đổi

- Đảm bảo rằng mã của bạn tuân thủ các tiêu chuẩn mã nguồn của dự án.
- Viết các bài kiểm tra đơn vị cho mã mới hoặc mã đã sửa.
- Đảm bảo rằng tất cả các bài kiểm tra đều chạy thành công:
    ```bash
    npm test
    ```

## Hướng dẫn commit message

- **feat:** Một tính năng mới.
- **fix:** Sửa lỗi.
- **docs:** Thay đổi liên quan đến tài liệu.
- **style:** Các thay đổi liên quan đến style (không ảnh hưởng đến logic của mã).
- **refactor:** Thay đổi mã nguồn mà không sửa lỗi hoặc thêm tính năng.
- **test:** Thêm hoặc sửa bài kiểm tra.
- **chore:** Các thay đổi liên quan đến cấu hình hoặc công cụ xây dựng.

Ví dụ:
  ```
  feat: Thêm chức năng đăng nhập qua Google
  fix: Sửa lỗi không thể đăng ký tài khoản mới
  docs: Cập nhật README với hướng dẫn cài đặt mới
  ```

## Quy trình pull request

1. Push branch của bạn lên repository fork của bạn:
    ```bash
    git push origin feature/your-feature-name
    ```
2. Tạo một pull request từ branch của bạn đến branch `main` của repository gốc.
3. Mô tả chi tiết về thay đổi của bạn trong pull request.
4. Đảm bảo rằng pull request của bạn đã sẵn sàng để được review:
    - Mã của bạn tuân thủ các tiêu chuẩn mã nguồn.
    - Tất cả các bài kiểm tra đều chạy thành công.
    - Đã cập nhật tài liệu nếu cần thiết.

Cảm ơn bạn đã đóng góp cho Social Media!
