const multer = require("multer");
const path = require("path");

// สำหรับบทความ
const articleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/articles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const articleUpload = multer({ storage: articleStorage });

// สำหรับโปรไฟล์
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const profileUpload = multer({ storage: profileStorage });

// สำหรับโพสต์ในฟอรั่ม
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const postUpload = multer({ storage: postStorage });

module.exports = {
  articleUpload,
  profileUpload,
  postUpload,
};
