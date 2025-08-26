import os
import json 
import pymysql

def lambda_handler(event,context):
    # RDS接続情報を環境変数から取得
    host = os.environ['DB_HOST']
    user = os.environ['DB_USER']
    password = os.environ['DB_PASS']

    #初期接続時はデータベース指定なしで接続
    connection = pymysql.connect(
        host = host,
        user = user,
        password = password,
        charset='utf8mb4',
        cursorclass = pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            # 1.データベース「test_db」を作成(存在しない場合)
            cursor.execute("CREATE DATABASE IF NOT EXISTS test_db")
            # 2.使用するデータベースを切り替え
            cursor.execute("USE test_db")
            # 3.テーブル「test_table」を作成
            cursor.execute("CREATE TABLE IF NOT EXISTS test_table (No INT, String VARCHAR(255))")
            # 4.データの挿入
            insert_sql = "INSERT INTO test_table (No, String) VALUES (%s, %s)"
            data = [(1, "a"),(2,"b"),(3,"c")]
            cursor.executemany(insert_sql, data)

        # 変更をコミット
        connection.commit()
        return {
            "statusCode": 200,
            "body" :json.dumps({
                "message": "Database 'test_db' and table 'test_table' created successfully, data inserted."
            })
        }
    
    except Exception as e:
        print("Error ", e)
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
    
    finally:
        connection.close()