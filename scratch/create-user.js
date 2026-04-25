/**
 * 一次性脚本：创建用户 20242013
 */
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'lynxley_test',
});

async function main() {
  // 建表
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  const username = '20242013';
  const password = '20';
  const displayName = '20242013';

  // 检查是否已存在
  const [existing] = await pool.execute('SELECT id FROM users WHERE username = ?', [username]);
  if (existing.length > 0) {
    console.log(`用户 "${username}" 已存在 (id=${existing[0].id})，无需重复创建。`);
    await pool.end();
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
    [username, hash, displayName]
  );
  console.log(`✅ 用户创建成功！ id=${result.insertId}, username=${username}`);
  await pool.end();
}

main().catch(err => {
  console.error('创建用户失败:', err.message);
  process.exit(1);
});
