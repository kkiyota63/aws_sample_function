import json 
import requests

def lambda_handler(event,context):
    #HTTPリクエストのBodyがjsonの場合、そのままだと文字列なのでパースする必要がある。
    body_str = event["body"]
    body = json.loads(body_str) #json.loadsで文字列→json
    city_id = body["city_id"]
    
    response = requests.get(f"https://weather.tsukumijima.net/api/forecast?city={city_id}")
    data = response.json()
    telop = data["forecasts"][0]["telop"]

    return {
        'statusCode': 200,
        'body': json.dumps({"message":f"{telop}",}, ensure_ascii=False) 
    }