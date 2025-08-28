import mysql from 'mysql2/promise';

export const handler = async (event, context) => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const dbName = process.env.DB_NAME || "app_db";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: ""
    };
  }

  let connection;

  try {
    // RDSへ接続
    connection = await mysql.createConnection({
      host,
      user,
      password,
      database: dbName
    });

    // クエリ実行
    const [rows] = await connection.execute('SELECT * FROM posts');

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",          // 全てのオリジンを許可
        "Access-Control-Allow-Methods": "GET,POST",  // 許可するメソッド
      },
      body: JSON.stringify(rows)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };

  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
