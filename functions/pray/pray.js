import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export async function handler(event) {

    const body = JSON.parse(event.Records[0].Sns.Message);
    console.info("Event Body:", body);

    const client = new DynamoDBClient({ REGION: process.env.REGION });
    const user = body.member.user.id;
    console.info(`Prayer initiated by : ${user}`);

    const response = {
        body: {
            "content": ``
        }
    }
    //Get current prayers
    const getParams = {
        TableName: "Church",
        Key: {
            uid: { S: user },
        },
        ProjectionExpression: "prayers, ts",
    };
    console.info("Checking DynamoDB");
    const getResponse = await client.send(new GetItemCommand(getParams));
    console.info("Response from Dynamodb", getResponse);
    if (!getResponse.Item) {
        response.body.content = `${response.body.content}\n Welcome to the Church!`;
    }
    console.info("getResponse.Item: ", getResponse.Item);

    const getRecord = getResponse.Item ? unmarshall(getResponse.Item) : getResponse.Item;
    console.info("unmarshalled object: ", getRecord);

    const timeDiff = getRecord.ts ? Math.abs(new Date(getRecord.ts) - new Date()) : 360000;
    const minuteDiff = (timeDiff / (1000 * 60))
    if (minuteDiff > 5) {
        const newPrayerValue = getRecord ? getRecord.prayers + 1 : 1;
        const putParams = {
            TableName: "Church",
            Item: {
                uid: { S: user },
                prayers: { N: `${newPrayerValue}` },
                ts: { S: new Date().toString() }
            },
            ReturnValues: "ALL_OLD", //Has to be all old or none
        }
        const putResponse = await client.send(new PutItemCommand(putParams));
        console.info("Response from Dynamodb", putResponse);
        if (putResponse.$metadata.httpStatusCode == 200) {
            response.body.embeds = [
                {
                    "type": "rich",
                    "title": `Prayer Successful!`,
                    "description": `You are degeneracy manifest!\n\n**Prayer Level :** ${newPrayerValue - 1} -> :sparkles: **${newPrayerValue}** :sparkles:\n\nYou feel a little luckier...`,
                    "color": 0x676868,
                    "footer": {
                        "text": `Thank you for praying to the Church of Degen`
                    }
                }
            ];
        } else {
            response.body.content = `Prayer Failed! Yell at Sam to fix the bot!`;
        }
    } else {
        response.body.content = "You are praying too fast. please wait 5 minutes between each prayer";
    }


    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    await rest.patch(Routes.webhookMessage(body.application_id, body.token), response)
        .then(function (response) {
            console.info("response:", response);
        })
        .catch(function (error) {
            console.error(error);
        });
}