export const handler = (event) => {
    // event.bodyは文字列なのでパースする
    const body = JSON.parse(event.body)

    const response = {
        statusCode: 200,
        //JSON.stringifyでjsonにする
        body: JSON.stringify({message: `Hello ${body.name}`}), 
    };

    return response;
}