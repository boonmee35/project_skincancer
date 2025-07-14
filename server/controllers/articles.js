const connection = require('../db');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const url = process.env.URL;

exports.getArticles = async (req, res) => {
    try {
        const [results] = await connection.promise().query('SELECT a.*, c.category_name FROM articles a join categories c ON a.category_id = c.category_id');
        if (results.length === 0) {
            return res.status(404).json({ message: 'No articles found' });
        }
        res.json(results);

    }catch (error) {
        console.error('Error fetching articles:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Article ID is required' });
    }
    try {
        const sql = 'SELECT * FROM articles WHERE article_id = ?';
        const [results] = await connection.promise().query(sql, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getArticleMostViewed = async (req, res) => {
    try {
        const sql = 'SELECT * FROM articles ORDER BY view_count DESC LIMIT 3';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No articles found' });
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching most viewed articles:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.postArticle = async (req, res) => {
  const { title, content, source, category_id } = req.body;
  const image_url = req.file ? `${url}uploads/articles/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const sql = 'INSERT INTO articles (title, content, source, image_url, category_id) VALUES (?, ?, ?, ?, ?)';
    await connection.promise().query(sql, [title, content, source, image_url, category_id]);
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

exports.updateViewCount = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Article ID is required' });
    }
    try {
        const sql = 'UPDATE articles SET view_count = view_count + 1 WHERE article_id = ?';
        const [results] = await connection.promise().query(sql, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json({ message: 'View count updated successfully' });
    } catch (error) {
        console.error('Error updating view count:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, source, category_id } = req.body;

  if (!id || !title || !content) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // ค้นหารูปเก่า
    const [oldData] = await connection.promise().query('SELECT image_url FROM articles WHERE article_id = ?', [id]);
    if (oldData.length === 0) return res.status(404).json({ error: 'Article not found' });

    let newImageUrl = oldData[0].image_url;

    // ถ้ามีการอัปโหลดภาพใหม่
    if (req.file) {
      // ลบภาพเก่า
      if (oldData[0].image_url) {
        const oldPath = path.join(__dirname, "../", oldData[0].image_url);
        fs.unlink(oldPath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
      newImageUrl = `${url}uploads/articles/${req.file.filename}`;
    }

    const sql = 'UPDATE articles SET title = ?, content = ?, source = ?, image_url = ?, category_id = ? WHERE article_id = ?';
    await connection.promise().query(sql, [title, content, source, newImageUrl, category_id, id]);

    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'Article ID is required' });

  try {
    const [rows] = await connection.promise().query('SELECT image_url FROM articles WHERE article_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Article not found' });

    const imagePath = rows[0].image_url;

    // ลบจาก DB
    const [results] = await connection.promise().query('DELETE FROM articles WHERE article_id = ?', [id]);
    if (results.affectedRows === 0) return res.status(404).json({ error: 'Article not found' });

    // ลบไฟล์
    if (imagePath) {
      const fullPath = path.join(__dirname, "../", imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};