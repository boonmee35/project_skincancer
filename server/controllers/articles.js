const connection = require('../db');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const url = process.env.URL;

exports.getArticles = async (req, res) => {
    try {
        const [results] = await connection.promise().query('SELECT a.*, c.category_name FROM articles a join categories c ON a.category_id = c.category_id ORDER BY a.created_at DESC');
        if (results.length === 0) {
            return res.status(404).json({ message: 'ไม่เจอบทความ' });
        }

        const formattedResults = results.map(result => ({
            ...result,
            image_url: result.image_url ? `${url}${result.image_url}` : null,
            cancer_types: JSON.parse(result.cancer_types || "[]"),
        }));

        res.json(formattedResults);

    }catch (error) {
        console.error('Error fetching articles:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    }
};

exports.getArticleById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'ไม่มีรหัสบทความ' });
    }
    try {
        const sql = 'SELECT a.*, c.category_name FROM articles a join categories c ON a.category_id = c.category_id WHERE a.article_id = ? ORDER BY a.created_at DESC';
        const [results] = await connection.promise().query(sql, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'ไม่เจอบทความ' });
        }

        const formattedResults = {
            ...results[0],
            image_url: results[0].image_url ? `${url}${results[0].image_url}` : null,
            cancer_types: JSON.parse(results[0].cancer_types || "[]"),
        };

        res.json(formattedResults);

    } catch (error) {
        console.error('Error fetching article:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    }
};

exports.getArticleByType = async (req, res) => {
  const { type } = req.params;

  if (!type) {
    return res.status(400).json({ message: "กรุณาระบุประเภทมะเร็งผิวหนัง" });
  }

  try {
    let query, params;

    // case: mel → เปลี่ยนเป็น melanoma
    if (type === "mel") {
      const mappedType = "melanoma";
      query = `
        SELECT a.*, c.category_name
        FROM articles a
        JOIN categories c ON a.category_id = c.category_id
        WHERE c.category_name = 'ความรู้เกี่ยวกับมะเร็งผิวหนัง'
          AND JSON_CONTAINS(a.cancer_types, ?)
      `;
      params = [JSON.stringify(mappedType)];
    }
    // case: nv → ดึงบทความ id = 12
    else if (type === "nv") {
      query = `
        SELECT a.*, c.category_name
        FROM articles a
        JOIN categories c ON a.category_id = c.category_id
        WHERE a.article_id = 12
      `;
      params = [];
    }
    // case อื่น → ใช้ค่าเดิม
    else {
      query = `
        SELECT a.*, c.category_name
        FROM articles a
        JOIN categories c ON a.category_id = c.category_id
        WHERE c.category_name = 'ความรู้เกี่ยวกับมะเร็งผิวหนัง'
          AND JSON_CONTAINS(a.cancer_types, ?)
      `;
      params = [JSON.stringify(type)];
    }

    const [results] = await connection.promise().query(query, params);

    if (!results.length) {
      return res.status(404).json({ message: `ไม่พบบทความสำหรับ ${type}` });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Error fetching articles by type:", error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
};



// exports.getProtectiveArticleByType = async (req, res) => {
//     const { type } = req.params;

//     if (!type) {
//         return res.status(400).json({ message: "กรุณาระบุประเภทมะเร็งผิวหนัง" });
//     }

//     const keywordMap = {
//         mel: ['melanoma', 'เมลาโนมา'],
//         bcc: ['bcc', 'บาซัล'],
//         scc: ['scc', 'สแควมัส'],
//         nv:  ['nv', 'ไฝ']
//     };

//     const keywords = keywordMap[type.toLowerCase()];
//     if (!keywords) {
//         return res.status(400).json({ message: "ประเภทไม่ถูกต้อง" });
//     }

//     try {
//         const query = `
//             SELECT a.*, c.category_name
//             FROM articles a
//             JOIN categories c ON a.category_id = c.category_id
//             WHERE c.category_name = 'การป้องกันและดูแลตัวเอง'
//               AND (${keywords.map(() => `a.title LIKE ?`).join(" OR ")})
//             LIMIT 1
//         `;

//         const params = keywords.map(k => `%${k}%`);
//         const [results] = await connection.promise().query(query, params);

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'ไม่พบบทความที่ตรงกับประเภท' });
//         }

//         const article = {
//             ...results[0],
//         };

//         res.json(article);

//     } catch (error) {
//         console.error("Error fetching protective article:", error);
//         return res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
//     }
// };

exports.getArticleMostViewed = async (req, res) => {
    try {
        const sql = 'SELECT a.*, c.category_name FROM articles a join categories c ON a.category_id = c.category_id ORDER BY view_count DESC LIMIT 3';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'ไม่เจอบทความ' });
        }

        const formattedResults = results.map(result => ({
            ...result,
            image_url: result.image_url ? `${url}${result.image_url}` : null,
            cancer_types: JSON.parse(result.cancer_types || "[]"),
        }));
        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching most viewed articles:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    }
};

exports.getRelatedArticles = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ไม่มีรหัสบทความ" });
  }

  try {
    // 1. ดึง category_id และ cancer_types ของบทความเป้าหมาย
    const getArticleSql =
      "SELECT category_id, cancer_types FROM articles WHERE article_id = ?";
    const [articleResults] = await connection
      .promise()
      .query(getArticleSql, [id]);

    if (articleResults.length === 0) {
      return res.status(404).json({ error: "ไม่เจอบทความ" });
    }

    const categoryId = articleResults[0].category_id;
    const cancerTypes = JSON.parse(articleResults[0].cancer_types || "[]");

    // 2. ดึงบทความที่มี category เดียวกัน และมี cancer_types เหมือนกันบางส่วน
    const relatedSql = `
      SELECT a.article_id, a.title, a.image_url, a.created_at, a.view_count, a.category_id, a.cancer_types, c.category_name
      FROM articles a
      JOIN categories c ON a.category_id = c.category_id 
      WHERE a.article_id != ?
        AND JSON_CONTAINS(a.cancer_types, ?)
      LIMIT 3
    `;

    const [relatedResults] = await connection
      .promise()
      .query(relatedSql, [ id, JSON.stringify(cancerTypes)]);

    const formattedResults = relatedResults.map((result) => ({
      ...result,
      image_url: result.image_url
        ? `${process.env.URL}${result.image_url}`
        : null,
      cancer_types: JSON.parse(result.cancer_types || "[]"),
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return res.status(500).json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อ" });
  }
};

// exports.getRelatedArticles = async (req, res) => {
//     const { id } = req.params;

//     if (!id) {
//         return res.status(400).json({ error: 'ไม่มีรหัสบทความ' });
//     }

//     try {
//         // 1. ดึง category_id ของบทความที่ระบุ
//         const getCategorySql = 'SELECT category_id FROM articles WHERE article_id = ?';
//         const [categoryResults] = await connection.promise().query(getCategorySql, [id]);

//         if (categoryResults.length === 0) {
//             return res.status(404).json({ error: 'ไม่เจอบทความ' });
//         }

//         const categoryId = categoryResults[0].category_id;

//         // 2. ดึงบทความอื่น ๆ ที่มี category_id เดียวกัน ยกเว้นตัวเอง และจำกัด 3 รายการ
//         const relatedSql = `
//             SELECT a.article_id, a.title, a.image_url, a.created_at, a.view_count, a.category_id, c.category_name 
//             FROM articles a
//             JOIN categories c ON a.category_id = c.category_id 
//             WHERE a.category_id = ? AND a.article_id != ? 
//             LIMIT 3
//         `;
//         const [relatedResults] = await connection.promise().query(relatedSql, [categoryId, id]);

//         const formattedResults = relatedResults.map(result => ({
//             ...result,
//             image_url: result.image_url ? `${process.env.URL}${result.image_url}` : null,
//             cancer_types: JSON.parse(result.cancer_types || "[]"),
//         }));

//         res.json(formattedResults);
//     } catch (error) {
//         console.error('Error fetching related articles:', error);
//         return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
//     }
// };

exports.postArticle = async (req, res) => {
  const { title, content, source, category_id, cancer_types } = req.body;
  const image_url = req.file ? `/uploads/articles/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ error: 'ไม่มีชื่อบทความและเนื้อหา' });
  }

  try {
    const sql = 'INSERT INTO articles (title, content, source, image_url, category_id, cancer_types) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.promise().query(sql, [title, content, source, image_url, category_id, cancer_types]);
    res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
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
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, source, category_id, cancer_types } = req.body;

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
      newImageUrl = `/uploads/articles/${req.file.filename}`;
    }

    const sql = 'UPDATE articles SET title = ?, content = ?, source = ?, image_url = ?, category_id = ?, cancer_types = ? WHERE article_id = ?';
    await connection.promise().query(sql, [title, content, source, newImageUrl, category_id, cancer_types, id]);

    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
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
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
  }
};