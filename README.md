ReactフロントエンドをS3+CloudFrontでホスティングし，
フロントからAPI Gateway経由でLambdaを呼び出して，
RDSのデータベースにアクセスするサーバーレス構成

create-react-appで作られたReactプロジェクトは、npm start
create vite@latestで作られたReactプロジェクトは、npm run dev


### CloudFrontとS3でデプロイする
https://qiita.com/yu-Matsu/items/88d9aae18bbdce723a0a

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

