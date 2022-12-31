import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import axios from "axios";

export async function handler(event) {

    const body = JSON.parse(event.Records[0].Sns.Message);
    console.info("Event Body:", body);

    const client = new DynamoDBClient({ REGION: process.env.REGION });
    const user = body.member.user.id;
    console.info(`Prayer initiated by : ${user}`);

    const response = {
        "content": ``
    }
    //Get current prayers
    const getParams = {
        TableName: "Church",
        Key: {
            user: { S: user },
        },
        ProjectionExpression: "prayers",
    };
    console.info("Checking DynamoDB");
    const getResponse = await client.send(new GetItemCommand(getParams));
    console.info("Response from Dynamodb", getResponse);
    if (!getResponse.Item) {
        response.content = `${response.content}\n Welcome to the Church!`;
    }
    console.info("getResponse.Item: ", getResponse.Item);
    const getRecord = unmarshall(getResponse.Item)
    console.info("unmarshalled object: ", getRecord);

    const newPrayerValue = getResponse.Item ? getRecord.prayers + 1 : 1;
    const putParams = {
        TableName: "Church",
        Item: {
            user: { S: user },
            prayers: { N: `${newPrayerValue}` }
        },
        ReturnValues: "ALL_OLD", //Has to be all old or none
    }
    const putResponse = await client.send(new PutItemCommand(putParams));
    console.info("Response from Dynamodb", putResponse);
    if (putResponse.Attributes) {
        response.content = `Prayer Successful!\n You are now level ${newPrayerValue}`;
    } else {
        response.content = `Prayer Failed! Yell at Sam to fix the bot!`;
    }

    await axios.patch(`https://discord.com/api/v10/webhooks/${body.application_id}/${body.token}/messages/@original`, response)
        .then(function (response) {
            console.info("response:", response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

// import { MessageEmbed } from "discord.js";
// import { pray } from '../../services/mongoService.js';
// async function prayer(msg) {
//     let results = await pray(msg.author);
//     if (results.success) {
//         const prayerMessage = new MessageEmbed();
//         prayerMessage.setTitle(':pray: Prayer Successful :pray:');
//         let message = `You are now devotion level ${results.userPrayObj.prayers} \n`;
//         if (results.rankUpgrade) {
//             message += `*notices your rank* OwO wHat's THIS???? You got a new rank UwU ! \n`;
//             message += `Your rank is now ${results.userPrayObj.rank}\n`;
//             message += `uwu owo uwu`;
//         } else {
//             message += `Your rank is ${results.userPrayObj.rank}`;
//         }
//         prayerMessage.setDescription(message);
//         msg.channel.send(prayerMessage);
//     } else {
//         const prayerMessage = new MessageEmbed();
//         const now = Date.now();
//         prayerMessage.setTitle('Prayer Failed');
//         let message = `${msg.author}, you are praying too much. You must wait ${((results.userPrayObj.lastPrayed + 300000) - now) / 1000} seconds before praying again \n`;
//         message += `Your devotion level is ${results.userPrayObj.prayers} and your rank is ${results.userPrayObj.rank}`
//         prayerMessage.setDescription(message);
//         msg.channel.send(prayerMessage);
//     }
// }