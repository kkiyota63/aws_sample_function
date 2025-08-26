import mysql from 'mysql2/promise';

export const handler = async (event, context) => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const database = 'test_db'; // 固定

  let connection;

  try {
    // RDSへ接続
    connection = await mysql.createConnection({
      host,
      user,
      password,
      database
    });

    // クエリ実行
    const [rows] = await connection.execute('SELECT * FROM test_table');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Query executed successfully.',
        data: rows
      })
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
