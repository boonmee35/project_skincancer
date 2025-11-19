const connection = require('../db');

exports.getAnalysisResults = async (req, res) => {
    try {
        const sql = 'SELECT ar.*, u.fullname FROM analysis_results ar join users u on ar.user_id = u.user_id ORDER BY created_at DESC';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No analysis results found' });
        }
        const formattedResults = results.map(result => ({
            ...result,
            created_at: new Date(result.created_at).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
            image_url: result.image_url ? `${process.env.URL}${result.image_url}` : null,
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching analysis results:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
}

exports.getAnalysisResultById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const sql = 'SELECT * FROM analysis_results WHERE user_id = ? ORDER BY created_at DESC';
        const [results] = await connection.promise().query(sql, [user_id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Analysis result not found' });
        }

        const formattedResults = results.map(result => ({
            ...result,
            created_at: new Date(result.created_at).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
            image_url: result.image_url ? `${process.env.URL}${result.image_url}` : null,
        }));

        res.json(formattedResults);
    } catch (error) {
        console.error('Error fetching analysis result:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.postAnalysisResult = async (req, res) => {
    const { user_id, is_detected } = req.body;
    const result = JSON.parse(req.body.result);
    const image = req.file ? `/uploads/analysis/${req.file.filename}` : null;

    if (!user_id || !result) {
        return res.status(400).json({ error: 'User ID and result are required' });
    }

    const getLevel = (prob) => {
        if (prob < 0.001) return "ไม่มีความเสี่ยง";
        if (prob < 0.3) return "ความเสี่ยงต่ำ";
        if (prob < 0.6) return "ความเสี่ยงปานกลาง";
        if (prob < 0.8) return "ความเสี่ยงสูง";
        return "ความเสี่ยงสูงมาก";
    };

    try {
        const sql = `
        INSERT INTO analysis_results
        (user_id, image_url, risk_nv, level_nv, risk_bcc, level_bcc, risk_scc, level_scc, risk_melanoma, level_melanoma, is_detected)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
        user_id,
        image,
        result.nv,
        getLevel(result.nv),
        result.bcc,
        getLevel(result.bcc),
        result.scc,
        getLevel(result.scc),
        result.mel,
        getLevel(result.mel),
        is_detected
        ];

        const [dbResult] = await connection.promise().query(sql, values);

        res.status(201).json({ message: "Saved successfully", id: dbResult.insertId });
    } catch (error) {
        console.error('Error saving analysis result:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }

};

exports.deleteAnalysisResult = async (req, res) => {
    const { id } = req.params;
    try{
        const sql = 'DELETE FROM analysis_results WHERE result_id = ?';
        const [result] = await connection.promise().query(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Analysis Result deleted successfully' });

    } catch (error) {
        console.error('Error deleting analysis result:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};