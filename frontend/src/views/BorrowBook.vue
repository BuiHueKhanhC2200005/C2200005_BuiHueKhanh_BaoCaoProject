<template>
  <div class="borrow-book">
    <h1>Mượn Sách</h1>

    <div v-if="book">
      <h2>{{ book.TenSach }}</h2>
      <p>Tác giả: {{ book.NguonGoc }}</p>
      <p class="book-price">{{ book.DonGia }} VND</p>

      <!-- Form cho việc chọn ngày mượn và ngày trả -->
      <div>
        <div>
          <label for="borrowDate">Ngày mượn:</label>
          <input type="date" id="borrowDate" v-model="borrowDate" required />
        </div>
        
        <div>
          <label for="returnDate">Ngày trả:</label>
          <input type="date" id="returnDate" v-model="returnDate" :min="minReturnDate" required />
        </div>

        <p v-if="returnDate && isReturnDateExceeded" class="error-message">Ngày trả không thể vượt quá 30 ngày kể từ ngày mượn.</p>

        <button @click="borrowBook" class="borrow-button" :disabled="isReturnDateExceeded || !borrowDate || !returnDate">Xác nhận mượn sách</button>
        <button @click="returnBook" class="return-button">Trả sách</button>
      </div>
    </div>
    <p v-else>Không tìm thấy sách.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: null,
      borrowDate: null,   // Ngày mượn
      returnDate: null,   // Ngày trả
    };
  },
  computed: {
    // Tính toán ngày trả tối thiểu (tức là ngày mượn)
    minReturnDate() {
      return this.borrowDate || '';
    },
    // Kiểm tra nếu ngày trả vượt quá 30 ngày kể từ ngày mượn
    isReturnDateExceeded() {
      if (this.borrowDate && this.returnDate) {
        const borrowDate = new Date(this.borrowDate);
        const returnDate = new Date(this.returnDate);
        const maxReturnDate = new Date(borrowDate);
        maxReturnDate.setDate(borrowDate.getDate() + 30);
        return returnDate > maxReturnDate;  // Kiểm tra nếu ngày trả vượt quá 30 ngày
      }
      return false;
    }
  },
  mounted() {
    this.fetchBook();
  },
  methods: {
    async fetchBook() {
      const bookId = this.$route.query.bookId;
      try {
        const response = await fetch(`http://localhost:3000/api/sach/${bookId}`);
        if (response.ok) {
          this.book = await response.json();
        } else {
          console.error('Lỗi khi lấy thông tin sách:', response.status);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sách:', error);
      }
    },
    async borrowBook() {
      const MaDocGia = prompt("Nhập mã độc giả để mượn sách:");
      if (!MaDocGia) {
        alert('Vui lòng nhập mã độc giả.');
        return;
      }

      const MaSach = this.book.MaSach;

      // Kiểm tra ngày trả hợp lệ
      if (this.isReturnDateExceeded) {
        alert('Ngày trả không thể vượt quá 30 ngày kể từ ngày mượn.');
        return;
      }

      const borrowDate = new Date(this.borrowDate);
      const returnDate = new Date(this.returnDate);
      const formattedReturnDate = returnDate.toISOString().split('T')[0]; // Định dạng yyyy-mm-dd

      try {
        const response = await fetch('http://localhost:3000/api/theodoimuonsach/muon-sach', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ MaDocGia, MaSach, borrowDate: borrowDate.toISOString().split('T')[0], returnDate: formattedReturnDate })
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Mượn sách thành công! Ngày trả sách: ${formattedReturnDate}`);
          this.book.SoQuyen -= 1; // Cập nhật số lượng trong giao diện
        } else {
          alert(data.message || 'Có lỗi xảy ra khi mượn sách');
        }
      } catch (error) {
        console.error ('Lỗi khi mượn sách:', error);
        alert('Lỗi khi mượn sách');
      }
    },
    async returnBook() {
      const MaDocGia = prompt("Nhập mã độc giả để trả sách:");
      if (!MaDocGia) return alert('Vui lòng nhập mã độc giả.');

      try {
        const response = await fetch('http://localhost:3000/api/theodoimuonsach/tra-sach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ MaDocGia, MaSach: this.book.MaSach })
        });
        const data = await response.json();
        if (response.ok) alert('Trả sách thành công');
        else alert(data.message || 'Có lỗi xảy ra khi trả sách');
      } catch (error) { alert('Lỗi khi trả sách'); }
    }
  }
};
</script>

<style scoped>
/* Container chính */
.borrow-book {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

/* Tiêu đề chính */
h1 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 15px;
}

/* Thông tin sách */
h2 {
  font-size: 20px;
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
}

.book-price {
  font-weight: bold;
  color: #e91e63;
  font-size: 16px;
  margin-bottom: 15px;
}

/* Ngày mượn và ngày trả */
label {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

input[type="date"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 5px;
  width: 100%;
  max-width: 200px;
}

/* Nút mượn sách */
.borrow-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.borrow-button:hover {
  background-color: #218838;
}

/* Nút trả sách */
.return-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.return-button:hover {
  background-color: #218838;
}

/* Tin nhắn khi không tìm thấy sách */
p {
  color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
}
</style>