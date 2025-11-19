const connection = require('../db');

exports.getRiskRecommendations = async (req, res) => {
    try {
        const sql = 'SELECT * FROM risk_recommendations';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'ไม่พบคำแนะนำความเสี่ยง' });
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching risk recommendations:', error);
        return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    }
}