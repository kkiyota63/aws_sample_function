import os
import pymysql
import json

def lambda_handler(event, context):
    # RDS接続情報を環境変数から取得
    host = os.environ['DB_HOST']
    user = os.environ['DB_USER']
    password = os.environ['DB_PASS']
    database = 'test_db'  # ここでは固定値

    # RDSに接続
    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            # test_table の全レコードを取得するSQLを実行
            sql = "SELECT * FROM test_table"
            cursor.execute(sql)
            results = cursor.fetchall()

        # 取得したデータをJSON形式で返す
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message':  "Query executed successfully.",
                'data': results
            })
        }
    
    except Exception as e:
        #エラーが発生した場合はエラーメッセージを返す
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
    
    finally:
        connection.close()