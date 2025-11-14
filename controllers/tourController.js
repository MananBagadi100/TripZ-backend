const pool = require('../config/db');

//get all the listed tours (public)
async function getAllTours(req, res) {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM tours ORDER BY created_at DESC"
        );
        return res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching tours" });
    }
}

//get details of a particular tour (public)
async function getTourById(req, res) {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM tours WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Tour not found" });
        }

        return res.json(rows[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching tour" });
    }
}

//creating a tour - (admin only)
async function createTour(req, res) {
    const { title, destination, price, start_date, duration, image_url } = req.body;

    try {
        await pool.query(
            `INSERT INTO tours (title, destination, price, start_date, duration, image_url)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, destination, price, start_date, duration, image_url]
        );

        return res.json({ message: "Tour created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating tour" });
    }
}

//update tour details - (admin only)
async function updateTour(req, res) {
    const { id } = req.params;
    const { title, destination, price, start_date, duration, image_url } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE tours 
             SET title=?, destination=?, price=?, start_date=?, duration=?, image_url=?
             WHERE id=?`,
            [title, destination, price, start_date, duration, image_url, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tour not found" });
        }

        return res.json({ message: "Tour updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error updating tour" });
    }
}


// delete tour (admin only)
async function deleteTour(req, res) {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            "DELETE FROM tours WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tour not found" });
        }

        return res.json({ message: "Tour deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting tour" });
    }
}

module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour
};