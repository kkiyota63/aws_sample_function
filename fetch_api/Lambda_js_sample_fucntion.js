export const handler = async (event) => {
    // event.bodyは文字列なのでパースする
    const body = JSON.parse(event.body);
    const city_id = body.city_id;

    // 外部APIを叩く
    const res = await fetch(`https://weather.tsukumijima.net/api/forecast?city=${city_id}`);
    const data = await res.json();  // JSONに変換

    // forecasts配列の最初のtelopを取得
    const telop = data.forecasts[0].telop;

    // Lambdaのレスポンスを組み立てる
    return {
        statusCode: 200,
        body: JSON.stringify({ message: `${telop}!` }),
    };
};
