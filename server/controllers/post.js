const connection = require('../db');
require('dotenv').config();
const dayjs = require("dayjs");

const url = process.env.URL;

function getAvatarUrl(avatarPath) {
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')){
        return avatarPath;
    } else if (avatarPath.startsWith('/uploads/')) {
        return `${process.env.URL}${avatarPath}`;
    }
};

exports.getPosts = async (req, res) => {
  try {
    // ดึงโพสต์ทั้งหมด + JOIN ผู้ใช้ + นับคอมเมนต์
    const sqlPosts = `
      SELECT 
            p.*, 
            u.fullname, 
            u.avatar, 
            COUNT(CASE 
                    WHEN c.status IN ('ปกติ', 'ถูกรายงาน') 
                    THEN c.comment_id 
                END) AS comment_count
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.user_id
        LEFT JOIN comments c ON p.post_id = c.post_id
        WHERE p.status IN ('ปกติ', 'ถูกรายงาน')
        GROUP BY p.post_id
        ORDER BY p.created_at DESC;

    `;

    const [posts] = await connection.promise().query(sqlPosts);

    // ดึงจำนวนโพสต์ทั้งหมด
    const [[{ total }]] = await connection.promise().query("SELECT COUNT(*) AS total FROM posts");

    // แปลงเวลา + ส่งรวม
    const formattedPosts = posts.map(post => ({
      ...post,
      avatar: getAvatarUrl(post.avatar),
      created_at: new Date(post.created_at).toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    }));

    res.json({
      total,
      posts: formattedPosts,
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const sql = `
            SELECT 
              p.post_id, p.user_id, p.title, p.content, p.created_at AS post_created_at,
              u.user_id AS u_id, u.fullname, u.avatar
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.user_id
            WHERE p.post_id = ?
        `;

        const [results] = await connection.promise().query(sql, [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const formattedPost = {
            ...results[0],
            avatar: getAvatarUrl(results[0].avatar),
            created_at: new Date(results[0].post_created_at).toLocaleString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        };

        res.json(formattedPost);
    } catch (error) {
        console.error('Error fetching post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};


exports.postHistory = async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        // ดึงจำนวนทั้งหมดก่อน
        const countSql = `SELECT COUNT(*) AS total FROM posts WHERE user_id = ?`;
        const [countResult] = await connection.promise().query(countSql, [user_id]);
        const total = countResult[0]?.total || 0;

        // ดึงรายการโพสต์
        const sql = `
            SELECT 
              p.post_id, p.user_id, p.title, p.content, p.created_at AS post_created_at,
              u.fullname, u.avatar,
              COUNT(c.comment_id) AS comment_count
            FROM posts p
            LEFT JOIN users u ON p.user_id = u.user_id
            LEFT JOIN comments c ON p.post_id = c.post_id
            WHERE p.user_id = ? AND p.status IN ('ปกติ', 'ถูกรายงาน')
            GROUP BY p.post_id
            ORDER BY p.created_at DESC
        `;
        const [results] = await connection.promise().query(sql, [user_id]);

        const posts = results.map(post => ({
            ...post,
            avatar: getAvatarUrl(post.avatar),
            created_at: new Date(post.post_created_at).toLocaleString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
        }));

        res.json({ total, posts });
    } catch (error) {
        console.error('Error fetching user posts:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};


exports.createPost = async (req, res) => {
    const { title, content, user_id } = req.body;

    if (!content || !user_id) {
        return res.status(400).json({ error: 'Content and user ID are required' });
    }

    try {
        const sql = 'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)';
        const [result] = await connection.promise().query(sql, [title, content, user_id]);
        res.status(201).json({ message: 'บันทึกโพสต์เรียบร้อยแล้ว', postId: result.insertId });
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    if (!id || !content || !user_id) {
        return res.status(400).json({ error: 'Post ID, content, and user ID are required' });
    }
    try {
        const sql = 'UPDATE posts SET title = ?, content = ? WHERE post_id = ? AND user_id = ?';
        const [result] = await connection.promise().query(sql, [title, content, id, user_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found or not authorized' });
        }
        res.json({ message: 'แก้ไขโพสต์เรียบร้อย' });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const sql = 'DELETE FROM posts WHERE post_id = ?';
        const [result] = await connection.promise().query(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.reportPost = async (req, res) => {
    const { id } = req.params;
    const { user_id, reason } = req.body;

    if (!user_id || !reason) {
        return res.status(400).json({ error: 'Post ID, user ID, and reason are required' });
    }

    try{
        const sql = 'INSERT INTO reported_posts (post_id, user_id, reason) VALUES (?, ?, ?)';
        const [result] = await connection.promise().query(sql, [id, user_id, reason]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found or report not created' });
        }

        const sqlUpdate = 'UPDATE posts SET status = "ถูกรายงาน" WHERE post_id = ?';
        await connection.promise().query(sqlUpdate, [id]);

        res.status(201).json({ message: 'รายงานโพสต์นี้เรียบร้อยแล้ว' });

    }catch (error) {
        console.error('Error reporting post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getReportedPosts = async (req, res) => {
  try {
    const sql = `
      SELECT 
          rp.post_id,
          p.title,
          p.content,
          u.fullname,
          u.avatar,
          rp.reason,
          rp.created_at,
          counts.report_count
      FROM reported_posts rp
      JOIN (
          -- หารายงานล่าสุดของแต่ละโพสต์
          SELECT post_id, MAX(created_at) AS last_reported_at
          FROM reported_posts
          WHERE status = 'กำลังดำเนินการ'
          GROUP BY post_id
      ) latest ON rp.post_id = latest.post_id AND rp.created_at = latest.last_reported_at
      JOIN (
          -- นับจำนวนรายงานทั้งหมดของแต่ละโพสต์
          SELECT post_id, COUNT(*) AS report_count
          FROM reported_posts
          WHERE status = 'กำลังดำเนินการ'
          GROUP BY post_id
      ) counts ON rp.post_id = counts.post_id
      LEFT JOIN posts p ON rp.post_id = p.post_id
      LEFT JOIN users u ON rp.user_id = u.user_id
      WHERE rp.status = 'กำลังดำเนินการ'
      ORDER BY latest.last_reported_at DESC
    `;

    const [rows] = await connection.promise().query(sql);

    const formattedRows = rows.map(row => ({
      ...row,
      avatar: getAvatarUrl(row.avatar),
      created_at: new Date(row.created_at).toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching reported posts:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
};

exports.getReportedPostByID = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
        SELECT rp.*, p.title, p.content, u.fullname
        FROM reported_posts rp
        LEFT JOIN posts p ON rp.post_id = p.post_id
        LEFT JOIN users u ON rp.user_id = u.user_id
        WHERE rp.post_id = ?
        ORDER BY rp.created_at DESC 
    `;
        const [rows] = await connection.promise().query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reported post not found' });
        }
        const formattedRows = rows.map(row => ({
            ...row,
            created_at: new Date(row.created_at).toLocaleString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',})
        }));
        res.json(formattedRows);
    } catch (error) {
        console.error('Error fetching reported post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getReportedPostByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
        SELECT 
            rp.*, 
            p.title, 
            p.content,
            u.fullname AS reporter_name,
            a.fullname AS author_name,
            CASE 
                WHEN rp.user_id = ? THEN 'reported_by_me'       -- เราเป็นผู้รายงาน
                WHEN p.user_id = ? THEN 'reported_about_me'    -- เราเป็นเจ้าของโพสต์ที่ถูกรายงาน
                ELSE 'other'
            END AS report_type
        FROM reported_posts rp
        LEFT JOIN posts p ON rp.post_id = p.post_id
        LEFT JOIN users u ON rp.user_id = u.user_id          -- ผู้รายงาน
        LEFT JOIN users a ON p.user_id = a.user_id          -- เจ้าของโพสต์
        WHERE rp.user_id = ? OR p.user_id = ?               -- เงื่อนไขรวม 2 แบบ
        ORDER BY rp.status ASC, rp.created_at DESC; 
    `;
        const [rows] = await connection.promise().query(sql, [id, id, id, id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reported post not found' });
        }
        const formattedRows = rows.map(row => ({
            ...row,
            created_at: new Date(row.created_at).toLocaleString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',})
        }));
        res.json(formattedRows);
    } catch (error) {
        console.error('Error fetching reported post:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};


exports.manageReportedPosts = async (req, res) => {
    const { id } = req.params;
    const { action, user_id, scope} = req.body; 

    if (!id) {
        return res.status(400).json({ error: 'Posts ID is required' });
    }

      try {
        if (action === "normal") {
        await connection
            .promise()
            .query("UPDATE posts SET status = 'ปกติ' WHERE post_id = ?", [id]);
        } else if (action === "hide") {
        await connection
            .promise()
            .query("UPDATE posts SET status = 'ซ่อน' WHERE post_id = ?", [id]);
        } else {
        return res.status(400).json({ error: "Invalid action" });
        }

        const reviewText = action === "normal"
        ? "ทีมงานได้ทำการตรวจสอบโพสต์นี้แล้ว พบว่าไม่มีความผิดตามข้อกล่าวหา รายงานนี้จึงถูกปฏิเสธ"
        : "ทีมงานได้ทำการตรวจสอบโพสต์นี้แล้ว พบว่ามีความผิดตามข้อกล่าวหา จึงได้ดำเนินการซ่อนโพสต์นี้จากระบบชุมชนของเรา";  

        if (scope === "all") {
        await connection
            .promise()
            .query("UPDATE reported_posts SET status = 'ดำเนินการแล้ว', review_report = ? WHERE post_id = ?", [reviewText, id]);
        } else if (scope === "single") {
        await connection
            .promise()
            .query("UPDATE reported_posts SET status = 'ดำเนินการแล้ว', review_report = ? WHERE post_id = ? AND user_id = ?", [reviewText, id, user_id]);
        }

        return res.json({ message: "ดำเนินการสำเร็จ" });
    } catch (error) {
        console.error("Error managing reported posts:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};



