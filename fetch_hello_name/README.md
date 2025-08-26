### パースとjson化とは？
pythonの場合
json.loadsで文字列→json
json.dumpsでjson→文字列

Node.jsの場合
JSON.parseで文字列→json
JSON.stringifyでjson→文字列

### eventとは？
Lambdaが起動したトリガーの情報が入っている。

・APIGateway経由で呼ばれた場合
HTTPリクエストの情報
{
  "resource": "/hello",
  "path": "/hello",
  "httpMethod": "GET",
  "headers": { ... },
  "queryStringParameters": {"name": "Alice"},
  "body": "{\"key\":\"value\"}",
  "isBase64Encoded": false
}

・S3イベントで呼ばれた場合
オブジェクト作成や削除イベントの情報
{
  "Records": [
    {
      "s3": {
        "bucket": {"name": "my-bucket"},
        "object": {"key": "file.txt"}
      }
    }
  ]
}

### contextとは？
Lambdaの実行環境に関する情報や制御のためのハンドル
context.function_name：Lambda関数名
context.memory_limit_in_mb：割り当てられたメモリ量
context.invoked_function_arn：実行された関数のARN
context.aws_request_id：リクエストごとのユニークID
context.log_group_name, context.log_stream_name：CloudWatch Logsの情報

### Lambdaのテストに入力するjson
{
  "body": "{\"name\": \"Koki\"}"
}
