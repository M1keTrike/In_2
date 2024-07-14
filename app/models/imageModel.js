const pool = require('../config/db');

const createImage = async (image) => {
  const { filename, path, mimetype } = image;
  const [result] = await pool.query('INSERT INTO images (filename, path, mimetype) VALUES (?, ?, ?)', [filename, path, mimetype]);
  return result.insertId;
};

const getImageById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM images WHERE id = ?', [id]);
  return rows[0];
};

const getAllImages = async () => {
  const [rows] = await pool.query('SELECT * FROM images');
  return rows;
};

const updateImage = async (id, image) => {
  const { filename, path, mimetype } = image;
  await pool.query('UPDATE images SET filename = ?, path = ?, mimetype = ? WHERE id = ?', [filename, path, mimetype, id]);
};

const deleteImage = async (id) => {
  await pool.query('DELETE FROM images WHERE id = ?', [id]);
};

module.exports = {
  createImage,
  getImageById,
  getAllImages,
  updateImage,
  deleteImage,
};
