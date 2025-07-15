const connection = require('../db');
require('dotenv').config();

const url = process.env.URL;

exports.getPosts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
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

exports.createPost = async (req, res) => {
    const { content, user_id } = req.body;
    const image_url = req.file ? `${url}uploads/posts/${req.file.filename}` : null;

    if (!content || !user_id) {
        return res.status(400).json({ error: 'Content and user ID are required' });
    }

    try {
        const sql = 'INSERT INTO posts (content, image_url, user_id) VALUES (?, ?, ?)';
        const [result] = await connection.promise().query(sql, [content, image_url, user_id]);
        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

