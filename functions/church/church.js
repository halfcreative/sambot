import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

const params = {
    TableName: "Church",
    // Specify which items in the results are returned.
    //   FilterExpression: "Subtitle = :topic AND Season = :s AND Episode = :e",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    //   ExpressionAttributeValues: {
    // ":topic": {S: "SubTitle2"},
    // ":s": {N: 1},
    // ":e": {N: 2},
    //   },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression: "uid, prayers"
};

export async function handler(event) {
    const body = JSON.parse(event.Records[0].Sns.Message);
    console.info("Event Body:", body);

    const client = new DynamoDBClient({ REGION: process.env.REGION });

    const response = {
        body: {
            "content": ``
        }
    }

    const scan = new ScanCommand(params);
    console.info('Sending scan command to ddb');
    const ddbResponse = await client.send(scan);
    console.info(`Response from Dynamodb : ${ddbResponse}`);
    if (!ddbResponse.Items) {
        console.info(`No Items returned from ddb`);
        response.body.content = "No members in the church at the moment";
    } else {
        response.body.embeds = [
            {
                "type": "rich",
                "title": `:church: Church of Degen :church:`,
                "description": `Welcome to the Church of Degeneracy! \n\n:angel: Embrace the degen and the degen will embrace you :angel:\n\nOur faith is currently **${ddbResponse.Items.length}** members strong\n\n**Rank | Name | Prayer Count **\n`,
                "color": 0x00FFFF
            }
        ]

        function mostPrayersCompare(a, b) {
            if (a.prayers < b.prayers) {
                return 1;
            }
            if (a.prayers > b.prayers) {
                return -1;
            }
            return 0;
        }

        const membersList = [];
        const membersListStringArray = [];
        for (let ddbmember of ddbResponse.Items) {
            const memberOBJ = unmarshall(ddbmember);
            console.log(memberOBJ);
            membersList.push(memberOBJ);
        }
        membersList.sort(mostPrayersCompare);
        for (let member of membersList) {
            membersListStringArray.push(`<@${member.uid}> : ${member.prayers}`);
        }
        response.body.embeds[0].description += membersListStringArray.join('\n');
        const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
        await rest.patch(Routes.webhookMessage(body.application_id, body.token), response)
            .then(function (response) {
                console.info("response:", response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

}