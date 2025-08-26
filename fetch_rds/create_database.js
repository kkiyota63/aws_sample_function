import mysql from 'mysql2/promise';

export const handler = async (event, context) => {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;

  let connection;

  try {
    connection = await mysql.createConnection({
      host,
      user,
      password,
      multipleStatements: true
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS test_db");
    await connection.query("USE test_db");
    await connection.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        No INT,
        String VARCHAR(255)
      )
    `);
    await connection.query("DELETE FROM test_table");

    const insertSql = "INSERT INTO test_table (No, String) VALUES (?, ?)";
    const data = [
      [1, "a"],
      [2, "b"],
      [3, "c"]
    ];
    for (const row of data) {
      await connection.query(insertSql, row);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Database 'test_db' and table 'test_table' created successfully, data inserted."
      })
    };
  } catch (err) {
    console.error("Error:", err);
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
