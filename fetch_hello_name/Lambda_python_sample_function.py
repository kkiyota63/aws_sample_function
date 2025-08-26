import json 

def lambda_handler(event,context):
    #HTTPリクエストのBodyがjsonの場合、そのままだと文字列なのでパースする必要がある。
    body_str = event["body"]
    body = json.loads(body_str) #json.loadsで文字列→json
    name = body["name"]

    return {
        'statusCode': 200,
        'body': json.dumps({"message":f"Hello {name}!"}) #json.dumpsでjson→loads
    }