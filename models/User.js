// models/user.js

const pool = require('../config/database');

const User = {
  create: async (user) => {
    const [result] = await pool.query('INSERT INTO users SET ?', user);
    return result.insertId;
  },
  findByEmail: async (email,password) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? and password = ?' , [email,password]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', id);
    return rows[0];
  },
  update: async (id, fields) => {
    await pool.query('UPDATE users SET ? WHERE id = ?', [fields, id]);
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }
};

module.exports = User;
