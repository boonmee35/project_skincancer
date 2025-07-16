const jwt = require('jsonwebtoken');
const connection = require('../db');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    const { fullname, birthdate, sex, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try{
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await connection.promise().query(checkEmailQuery, [email]);

        if (rows.length > 0) {
            return res.json({ error: 'อีเมลนี้มีผู้ใช้แล้ว' });
        }

        const insertUserQuery = 'INSERT INTO users (fullname, birthdate, sex, email, password) VALUES (?, ?, ?, ?, ?)';
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.promise().query(insertUserQuery, [fullname, birthdate, sex, email, hashedPassword]);
        return res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' });

    }catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) return res.status(400).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
    
    try {
      const [users] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      const user = users[0];
      
      if (!user) return res.status(404).json({ error: 'ไม่เจอผู้ใช้' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });
      const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, {
        expiresIn: '7d',
      });
      
      res.json({ message: 'เข้าสู่ระบบสำเร็จ', token, user: { id: user.user_id, fullname: user.fullname, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ✅ Step 1: ตรวจสอบอีเมล
exports.verifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "กรุณากรอกอีเมล" });

  try {
    const [rows] = await connection.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "ไม่พบอีเมลนี้ในระบบ" });
    }

    return res.json({ step: 2, message: "ยืนยันอีเมลสำเร็จ" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};

// ✅ Step 2: รีเซ็ตรหัสผ่าน
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await connection.promise().query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

    return res.json({ step: 3, message: "รีเซ็ตรหัสผ่านเรียบร้อยแล้ว" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
  }
};

