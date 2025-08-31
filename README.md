ReactフロントエンドをS3+CloudFrontでホスティングし，
フロントからAPI Gateway経由でLambdaを呼び出して，
RDSのデータベースにアクセスするサーバーレス構成

create-react-appで作られたReactプロジェクトは、npm start
create vite@latestで作られたReactプロジェクトは、npm run dev


### CloudFrontとS3でデプロイする
https://qiita.com/yu-Matsu/items/88d9aae18bbdce723a0a

### React + API Gateway + Lambda + DynamoDB で動画の再生回数を取得する仕組みを作ってみた
https://dev.classmethod.jp/articles/react-api-gateway-lambda-dynamodb-viewcount/

### API GatewayでLambdaを呼び出してCORS対応する方法
https://qiita.com/deritto777/items/62e33a7af26a5aa65b48

### 【AWS】Lambda から RDS に接続してデータベースを作成してみた
https://qiita.com/SoraoKosaka/items/3292df77702e6d1e09b9

### APIGatewayのCORS設定
// handlerの先頭に以下を挿入
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

//returnを以下のように変更
return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Posts retrieved (and inserted if data provided).",
        posts: rows,
      }),
    };


mainを最新に更新する場合
git checkout main
git pull --rebase

作業ブランチを最新に追従させる場合
git fetch origin 
git rebase origin/main

git switch -c feature/xxxで作業開始 (git switch -c featureでブランチを作成)
作業中にmainが進んだら，適宜git fetch→git rebase origin/mainで追従

