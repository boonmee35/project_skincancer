const connection = require('../db');

exports.getCategories = async (req, res) => {
    try {
        const sql = 'SELECT * FROM categories';
        const [results] = await connection.promise().query(sql);
        if (results.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.json(results);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.postCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const sql = 'INSERT INTO categories (category_name) VALUES (?)';
        const [results] = await connection.promise().query(sql, [name]);
        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ error: 'Category ID and name are required' });
    }
    try {
        const sql = 'UPDATE categories SET category_name = ? WHERE category_id = ?';
        const [results] = await connection.promise().query(sql, [name, id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    try {
        const sql = 'DELETE FROM categories WHERE category_id = ?';
        const [results] = await connection.promise().query(sql, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ error: 'Database query failed' });
    }
};