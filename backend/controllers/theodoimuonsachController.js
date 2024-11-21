// controllers/theodoimuonsachController.js

const { ObjectId } = require('mongodb');


// Mượn sách
exports.muonSach = async (req, res) => {
  const { MaDocGia, MaSach } = req.body;
  const NgayMuon = new Date();

  try {
    const book = await req.app.locals.db.collection('Sach').findOne({ MaSach });
    if (!book || book.SoQuyen <= 0) {
      return res.status(400).json({ message: book ? 'Sách đã hết.' : 'Không tìm thấy sách.' });
    }

    await req.app.locals.db.collection('Sach').updateOne({ MaSach }, { $inc: { SoQuyen: -1 } });

    const borrowRecord = await req.app.locals.db.collection('TheoDoiMuonSach').insertOne({
      MaDocGia,
      MaSach,
      NgayMuon,
      NgayTra: null
    });

    res.status(200).json({ message: 'Mượn sách thành công.', borrowRecord });
  } catch (error) {
    console.error('Lỗi khi mượn sách:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi mượn sách.', error: error.message });
  }
};

// Trả sách
exports.traSach = async (req, res) => {
  const { MaDocGia, MaSach } = req.body;
  const NgayTra = new Date();

  try {
    const borrowRecord = await req.app.locals.db.collection('TheoDoiMuonSach').findOneAndUpdate(
      { MaDocGia, MaSach, NgayTra: null },
      { $set: { NgayTra } },
      { returnOriginal: false }
    );

    if (!borrowRecord) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi mượn sách.' });
    }

    await req.app.locals.db.collection('Sach').updateOne({ MaSach }, { $inc: { SoQuyen: 1 } });

    res.status(200).json({ message: 'Trả sách thành công.', borrowRecord });
  } catch (error) {
    console.error('Lỗi khi trả sách:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi trả sách.', error: error.message });
  }
};


exports.danhSachMuonSach = async (req, res) => {
  try {
    const borrowedBooks = await req.app.locals.db.collection('TheoDoiMuonSach').find({}).toArray();
    res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách mượn sách:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách mượn sách', error });
  }
};


exports.xoaMuonSach = async (req, res) => {
  const { id } = req.params; // lấy id từ URL
  
  try {
    // Chuyển id thành ObjectId của MongoDB
    const result = await req.app.locals.db.collection('TheoDoiMuonSach').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Xóa bản ghi mượn sách thành công.' });
    } else {
      res.status(404).json({ message: 'Bản ghi không tồn tại hoặc đã bị xóa.' });
    }
  } catch (error) {
    console.error('Lỗi khi xóa bản ghi mượn sách:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bản ghi mượn sách.', error: error.message });
  }
};
