import { v4 as uuid } from 'uuid';
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    const { ism, source, definition } = data;
    if (!ism || !source || !definition) throw new Error('')

    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // The attributes of the item to be created
            ismID: uuid(), // A unique uuid for the ism
            ism,
            source,
            definition
        }
    };

    try {
        await dynamoDb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
}