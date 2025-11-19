const connection = require('../db');
require('dotenv').config();

const url = process.env.URL;

exports.getCommentsByPostId = async (req, res) => {
  const { id } = req.params;

  try {
    const sql = `
      SELECT c.*, u.*
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.user_id
      WHERE c.post_id = ? AND c.status IN ('ปกติ', 'ถูกรายงาน')
      ORDER BY c.created_at 
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

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Comment ID is required' });
    }
    try {
        const sql = 'DELETE FROM comments WHERE comment_id = ?';
        const [result] = await connection.promise().query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.reportComment = async (req, res) => {
    const { id } = req.params; 
  const { user_id, reason } = req.body;

  if (  !reason) {
    return res.status(400).json({ error: 'Comment ID and reason are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO reported_comments (user_id, comment_id, reason)
      VALUES (?, ?, ?)
    `;
    const [result] = await connection.promise().query(sqlInsert, [user_id, id, reason]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Comment not found or report not created' });
    }

    const sqlUpdate = 'UPDATE comments SET status = "ถูกรายงาน" WHERE comment_id = ?';
    await connection.promise().query(sqlUpdate, [id]);

    res.status(201).json({ message: 'รายงานความคิดเห็นนี้เรียบร้อยแล้ว' });
  } catch (error) {
    console.error('Error reporting comment:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
}

exports.getCommentReport = async (req, res) => {
  try {
    const sql = `
      SELECT 
          rc.comment_id,
          c.comment_text,
          p.post_id,
          p.title AS post_title,
          p.content AS post_content,
          rc.reason,
          rc.created_at,
          counts.report_count
      FROM reported_comments rc
      JOIN (
          -- รายงานล่าสุดของแต่ละ comment
          SELECT comment_id, MAX(created_at) AS last_reported_at
          FROM reported_comments
          WHERE status = 'กำลังดำเนินการ'
          GROUP BY comment_id
      ) latest ON rc.comment_id = latest.comment_id AND rc.created_at = latest.last_reported_at
      JOIN (
          -- นับจำนวนรายงานทั้งหมดของคอมเมนต์
          SELECT comment_id, COUNT(*) AS report_count
          FROM reported_comments
          WHERE status = 'กำลังดำเนินการ'
          GROUP BY comment_id
      ) counts ON rc.comment_id = counts.comment_id
      LEFT JOIN comments c ON rc.comment_id = c.comment_id
      LEFT JOIN posts p ON c.post_id = p.post_id
      WHERE rc.status = 'กำลังดำเนินการ'
      ORDER BY latest.last_reported_at DESC;

    `;
    const [rows] = await connection.promise().query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No comment reports found' });
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
    console.error('Error fetching comment reports:', error);
    return res.status(500).json({ error: 'Database query failed' });
  }
};

exports.getReportedCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
        SELECT 
          rc.comment_id,
          c.comment_text,
          p.post_id,
          p.title AS post_title,
          p.content AS post_content,
          u.fullname,
          rc.reason,
          rc.created_at
        FROM reported_comments rc
        LEFT JOIN comments c ON rc.comment_id = c.comment_id
        LEFT JOIN posts p ON c.post_id = p.post_id
        LEFT JOIN users u ON rc.user_id = u.user_id
        WHERE rc.comment_id = ? AND rc.status = 'กำลังดำเนินการ'
        ORDER BY rc.created_at DESC
    `;
        const [rows] = await connection.promise().query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reported comment not found' });
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
        console.error('Error fetching reported comment:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.getReportedCommentByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `
        SELECT 
            cr.*, 
            c.comment_text,
            u.fullname AS reporter_name,
            a.fullname AS author_name,
            CASE
                WHEN cr.user_id = ? THEN 'reported_by_me'       -- เราเป็นผู้รายงาน
                WHEN c.user_id = ? THEN 'reported_about_me'    -- เราเป็นเจ้าของคอมเมนต์ที่ถูกรายงาน
                ELSE 'other'
            END AS report_type
        FROM reported_comments cr
        LEFT JOIN comments c ON cr.comment_id = c.comment_id
        LEFT JOIN users u ON cr.user_id = u.user_id          -- ผู้รายงาน
        LEFT JOIN users a ON c.user_id = a.user_id          -- เจ้าของคอมเมนต์
        WHERE cr.user_id = ? OR c.user_id = ?
        ORDER BY cr.status ASC, cr.created_at DESC;
    `;
        const [rows] = await connection.promise().query(sql, [id, id, id, id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reported comment not found' });
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
        console.error('Error fetching reported comment:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.manageReportedComments = async (req, res) => {
    const { id } = req.params;
    const { action, user_id, scope} = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Comment ID is required' });
    }

    try {
      if (action === "normal"){
        await connection.promise().query("UPDATE comments SET status = 'ปกติ' WHERE comment_id = ?", [id]);
      } else if (action === "hide"){
        await connection.promise().query("UPDATE comments SET status = 'ซ่อน' WHERE comment_id = ?", [id]);
      } else {
        return res.status(400).json({ error: 'Invalid action. Use "normal" or "hide".' });
      }

      const reviewText = action === "normal"
        ? "ทีมงานได้ทำการตรวจสอบความคิดเห็นนี้แล้ว พบว่าไม่มีความผิดตามข้อกล่าวหา รายงานนี้จึงถูกปฏิเสธ"
        : "ทีมงานได้ทำการตรวจสอบความคิดเห็นนี้แล้ว พบว่ามีความผิดตามข้อกล่าวหา จึงได้ดำเนินการซ่อนความคิดเห็นนี้จากระบบชุมชนของเรา";
        
      if (scope === "all") {
        await connection
            .promise()
            .query("UPDATE reported_comments SET status = 'ดำเนินการแล้ว', review_report = ? WHERE comment_id = ?", [reviewText, id]);
      } else if (scope === "single") {
        await connection
            .promise()
            .query("UPDATE reported_comments SET status = 'ดำเนินการแล้ว', review_report = ? WHERE comment_id = ? AND user_id = ?", [reviewText, id, user_id]);
      }
      return res.json({ message: 'ดำเนินการสำเร็จ' });
    } catch (error) {
      console.error('Error managing reported comment:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }
};

