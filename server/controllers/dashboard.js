const connection = require('../db');

exports.getSummary = async (req, res) => {
    try{
        const [users] = await connection.promise().query('SELECT COUNT(*) AS count FROM users WHERE role = "user"');
        const [article] = await connection.promise().query('SELECT COUNT(*) AS count FROM articles');
        const [posts] = await connection.promise().query('SELECT COUNT(*) AS count FROM posts');
        const [analysis] = await connection.promise().query('SELECT COUNT(*) AS count FROM analysis_results')

        res.json({
            users: users[0].count,
            articles: article[0].count,
            posts: posts[0].count,
            analyses: analysis[0].count,
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCountReport = async (req, res) => {
    try {
        const [posts] = await connection.promise().query(`SELECT COUNT(*) AS count FROM reported_posts WHERE status = 'กำลังดำเนินการ'`);
        const [comments] = await connection.promise().query(`SELECT COUNT(*) AS count FROM reported_comments WHERE status = 'กำลังดำเนินการ'`);

        res.json({
            posts: posts[0].count,
            comments: comments[0].count,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRiskDistribution = async (req, res) => {
  try {
    const categories = ['nv', 'bcc', 'scc', 'melanoma'];
    const levels = ['ความเสี่ยงต่ำ', 'ความเสี่ยงปานกลาง', 'ความเสี่ยงสูง', 'ความเสี่ยงสูงมาก'];
    const result = [];

    for (const category of categories) {
      const item = { name: category.toUpperCase() };

      for (const level of levels) {
        // นับผู้ใช้ที่ครั้งล่าสุดของแต่ละคนตรงกับ level
        const [rows] = await connection.promise().query(`
          SELECT COUNT(*) AS count
          FROM (
            SELECT user_id, level_${category}
            FROM analysis_results a
            WHERE created_at = (
              SELECT MAX(created_at)
              FROM analysis_results
              WHERE user_id = a.user_id
            )
          ) latest
          WHERE level_${category} = ?
        `, [level]);

        item[level] = rows[0].count;
      }

      result.push(item);
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getHighRiskCounts = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
try {
    const categories = ['nv', 'bcc', 'scc', 'melanoma'];
    const result = [];

    for (const category of categories) {
      // นับผู้ใช้ที่ "ค่าล่าสุด" ของ risk >= 0.5
      const [rows] = await connection.promise().query(`
        SELECT COUNT(*) AS count
          FROM (
            SELECT user_id, risk_${category}, MAX(created_at) as latest_date
            FROM analysis_results
            WHERE DATE(created_at) BETWEEN ? AND ?
            GROUP BY user_id
          ) latest
          WHERE risk_${category} >= 0.5
          `,
          [dateFrom, dateTo]
        );

      result.push({
        name: category.toLowerCase(),
        count: rows[0].count,
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAnalysisCountTrend = async (req, res) => {
  const { dateFrom, dateTo } = req.query;

  if (!dateFrom || !dateTo) {
    return res.status(400).json({ error: "Missing dateFrom or dateTo" });
  }

  try {
    const [rows] = await connection.promise().query(
      `
      SELECT DATE(created_at) AS period, COUNT(*) AS total
      FROM analysis_results
      WHERE DATE(created_at) BETWEEN ? AND ?
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
      `,
      [dateFrom, dateTo]
    );

    const formattedRows = rows.map(row => {
      const date = new Date(row.period);
      const label = date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return { ...row, period: label };
    });

    res.json(formattedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getLatestAnalyses = async (req, res) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT u.fullname, ar.*
            FROM analysis_results ar
            join users u on ar.user_id = u.user_id
            ORDER BY ar.created_at DESC 
            LIMIT 5
        `);

        const result = rows.map(row => ({
            ...row,
            created_at: new Date(row.created_at).toLocaleDateString('th-TH', {
                year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
            }),
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


