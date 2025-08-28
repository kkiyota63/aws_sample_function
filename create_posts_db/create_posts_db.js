import mysql from "mysql2/promise";

export const handler = async (event, context) => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const dbName = process.env.DB_NAME || "app_db";

  let connection;

  // 共通のCORSヘッダー
  const corsHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",       
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    // プリフライト（OPTIONS）の場合はすぐ返す
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: "",
      };
    }

    // リクエストボディをパース
    const body = event.body ? JSON.parse(event.body) : {};
    const { title, content } = body;

    connection = await mysql.createConnection({
      host,
      user,
      password,
      multipleStatements: true,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL
      )
    `);

    // titleとcontentが送られてきた場合だけ挿入
    if (title && content) {
      const insertSql = "INSERT INTO posts (title, content) VALUES (?, ?)";
      await connection.query(insertSql, [title, content]);
    }

    // すべてのデータを取得
    const [rows] = await connection.query(
      "SELECT id, title, content FROM posts ORDER BY id ASC"
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Posts retrieved (and inserted if data provided).",
        posts: rows,
      }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,   // ← エラー時もCORSヘッダーが必要！
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
