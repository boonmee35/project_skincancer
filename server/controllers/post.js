const connection = require('../db');

exports.getPosts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

