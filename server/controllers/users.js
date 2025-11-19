const connection = require('../db');
require('dotenv').config();
const path = require("path");
const fs = require("fs");

function getAvatarUrl(avatarPath) {
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')){
        return avatarPath;
    } else if (avatarPath.startsWith('/uploads/')) {
        return `${process.env.URL}${avatarPath}`;
    }
};

exports.getUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users WHERE role = "user" ORDER BY is_active';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        const formattedResults = results.map(user => ({
            ...user,
            avatar: getAvatarUrl(user.avatar),
            created_at: new Date(user.created_at).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const sql = 'SELECT * FROM users WHERE user_id = ?';
        const [results] = await connection.promise().query(sql, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const formattedResults = {
            ...results[0], 
            avatar: getAvatarUrl(results[0].avatar) 
        };

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, birthdate, sex } = req.body;

  try {
    const [oldData] = await connection
      .promise()
      .query("SELECT avatar FROM users WHERE user_id = ?", [id]);

    if (oldData.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    let newAvatar = oldData[0].avatar;

    if (req.file) {
      // ลบรูปเก่า
      if (oldData[0].avatar) {
        const oldPath = path.join(__dirname, "../", oldData[0].avatar);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Failed to delete old avatar:", err);
        });
      }
      newAvatar = `/uploads/profiles/${req.file.filename}`;
    }

    const sql = `
      UPDATE users 
      SET fullname = ?, email = ?, birthdate = ?, sex = ?, avatar = ? 
      WHERE user_id = ?
    `;
    await connection
      .promise()
      .query(sql, [fullname, email, birthdate, sex, newAvatar, id]);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

exports.updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active, reason } = req.body;

  try {
    const sql = `
      UPDATE users
      SET is_active = ?, reason = ?
      WHERE user_id = ?
    `;
    await connection.promise().query(sql, [is_active, reason, id]);
    res.json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};
