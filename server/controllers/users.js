const connection = require('../db');

exports.getUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(results);
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
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, role } = req.body;
    if (!fullname || !email || !role) {
        return res.status(400).json({ error: 'Fullname, email, and role are required' });
    }
    try {
        const sql = 'UPDATE users SET fullname = ?, email = ?, role = ? WHERE user_id = ?';
        const [result] = await connection.promise().query(sql, [username, email, role, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};