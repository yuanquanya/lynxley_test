/**
 * 数据库初始化脚本
 * 用法: node init-db.js
 * 
 * 此脚本会连接到 MySQL 并创建所需的数据库和表。
 * 确保 .env 文件中的连接信息正确。
 */

import 'dotenv/config';
import mysql from 'mysql2/promise';

async function initDatabase() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = parseInt(process.env.MYSQL_PORT || '3306');
  const user = process.env.MYSQL_USERNAME || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const database = process.env.MYSQL_DATABASE || 'lynxley_test';

  console.log(`🔌 正在连接 MySQL: ${host}:${port}...`);

  // 先连接不指定数据库，创建数据库
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  console.log('✅ MySQL 连接成功');

  // 创建数据库（如果不存在）
  await connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  console.log(`✅ 数据库 "${database}" 已就绪`);

  // 切换到目标数据库
  await connection.changeUser({ database });

  // 创建 users 表
  const createUsersTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
      username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
      password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
      display_name VARCHAR(100) COMMENT '显示名称',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';
  `;

  await connection.execute(createUsersTableSQL);
  console.log('✅ users 表已创建');

  // 创建 history 表（含 user_id）
  const createHistoryTableSQL = `
    CREATE TABLE IF NOT EXISTS history (
      id VARCHAR(50) PRIMARY KEY COMMENT '记录ID（时间戳）',
      user_id INT NOT NULL COMMENT '所属用户ID',
      assessment_id VARCHAR(50) COMMENT '评估ID',
      title VARCHAR(255) NOT NULL COMMENT '评估标题',
      score INT NOT NULL COMMENT '得分百分比',
      correct_count INT NOT NULL COMMENT '正确数量',
      total_count INT NOT NULL COMMENT '题目总数',
      time_taken VARCHAR(50) NOT NULL COMMENT '用时',
      breakdown JSON COMMENT '分类得分明细',
      answers JSON COMMENT '答题详情',
      date VARCHAR(100) NOT NULL COMMENT '答题日期',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
      INDEX idx_user_id (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='答题历史记录表';
  `;

  await connection.execute(createHistoryTableSQL);
  console.log('✅ history 表已创建');

  await connection.end();
  console.log('🎉 数据库初始化完成！');
}

initDatabase().catch((err) => {
  console.error('❌ 数据库初始化失败:', err.message);
  process.exit(1);
});
