// controllers/authController.js

const users = [];  // Mảng này sẽ lưu trữ thông tin người dùng tạm thời

// Đăng ký người dùng
exports.registerUser = (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra nếu thiếu thông tin
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }

  // Kiểm tra nếu người dùng đã tồn tại
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Tên người dùng đã tồn tại.' });
  }

  // Thêm người dùng vào mảng (hoặc bạn có thể lưu vào cơ sở dữ liệu thực)
  users.push({ username, password });
  
  return res.status(201).json({ message: 'Đăng ký thành công' });
};

// Đăng nhập người dùng
// controllers/authController.js
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  // Kiểm tra thông tin đăng nhập
  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }
  
  // Xử lý đăng nhập (ví dụ, so sánh username và password với cơ sở dữ liệu)
  // Nếu đăng nhập thành công:
  res.status(200).json({ message: 'Đăng nhập thành công' });
  
  // Nếu có lỗi đăng nhập (ví dụ, sai thông tin đăng nhập):
  // res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
};

