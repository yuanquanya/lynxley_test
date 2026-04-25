/**
 * 共享数据库连接工具
 * Netlify Functions 中每次调用创建连接
 */
import mysql from 'mysql2/promise';

let pool = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      user: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'lynxley_test',
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 10000,
    });
  }
  return pool;
}

/**
 * 自动建表（首次调用时执行）
 */
export async function ensureTables() {
  const db = getPool();

  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      display_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createHistoryTableSQL = `
    CREATE TABLE IF NOT EXISTS history (
      id VARCHAR(50) PRIMARY KEY,
      user_id INT NOT NULL,
      assessment_id VARCHAR(50),
      title VARCHAR(255) NOT NULL,
      score INT NOT NULL,
      correct_count INT NOT NULL,
      total_count INT NOT NULL,
      time_taken VARCHAR(50) NOT NULL,
      breakdown JSON,
      answers JSON,
      date VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_user_id (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await db.execute(createUsersTableSQL);
  await db.execute(createHistoryTableSQL);
}
