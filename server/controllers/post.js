const connection = require('../db');
require('dotenv').config();

const url = process.env.URL;

exports.getPosts = async (req, res) => {
    try {
        const sql = `
            SELECT p.*, u.*, count(c.comment_id) as comment_count
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.user_id
            LEFT JOIN comments c ON p.post_id = c.post_id
            GROUP BY p.post_id
            ORDER BY p.created_at DESC
        `;
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

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }
    try {
        const sql = `
            SELECT p.*, u.*
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.user_id
            WHERE p.post_id = ?
        `;

        const [results] = await connection.promise().query(sql, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching post:', error);
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


exports.getCommentsByPostId = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT c.*, u.*
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.user_id
      WHERE c.post_id = ?
      ORDER BY c.created_at ASC
    `;
    const [rows] = await connection.promise().query(sql, [id]);

    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
};

exports.createComment = async (req, res) => {
  const { id } = req.params;
  const { user_id, comment_text } = req.body;

  if (!user_id || !comment_text) {
    return res.status(400).json({ error: 'User ID and comment text are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO comments (post_id, user_id, comment_text)
      VALUES (?, ?, ?)
    `;
    const [result] = await connection.promise().query(sqlInsert, [id, user_id, comment_text]);

    const insertedCommentId = result.insertId;

    const [rows] = await connection.promise().query(
      `
      SELECT c.*, u.*
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.user_id
      WHERE c.comment_id = ?
      `,
      [insertedCommentId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating comment:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
};

