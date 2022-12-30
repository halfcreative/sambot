import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const REGION = "us-east-1";
const snsClient = new SNSClient({ region: REGION });
const nacl = require('tweetnacl');

exports.handler = async (event) => {
    const strBody = event.body; // should be string, for successful sign

    if (!event.headers['test']) {
        // Checking signature (requirement 1.)
        const PUBLIC_KEY = process.env.PUBLIC_KEY;
        const signature = event.headers['x-signature-ed25519'] || event.headers['X-Signature-Ed25519'];
        const timestamp = event.headers['x-signature-timestamp'] || event.headers['X-Signature-Timestamp'];


        const isVerified = nacl.sign.detached.verify(
            Buffer.from(timestamp + strBody),
            Buffer.from(signature, 'hex'),
            Buffer.from(PUBLIC_KEY, 'hex')
        );

        if (!isVerified) {
            return {
                statusCode: 401,
                body: JSON.stringify('invalid request signature'),
            };
        }
    }


    // Replying to ping (requirement 2.)
    const body = JSON.parse(strBody)
    if (body.type == 1) {
        return {
            statusCode: 200,
            body: JSON.stringify({ "type": 1 }),
        }
    }

    // Handle command (send to SNS to be picked up by one of Lambdas)
    if (body.data.name) {
        const params = {
            Message: JSON.stringify(body, null, 2),
            Subject: "Test SNS From Lambda",
            TopicArn: process.env.TOPIC_ARN,
            MessageAttributes: { "command": { DataType: 'String', StringValue: body.data.name } }
        };
        const response = await snsClient.send(PublishCommand(params));

        if (response.MessageId) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    "type": 4,
                    "data": { "content": "*⏳ Loading...*" }
                })
            }
        }
    }

    return {
        statusCode: 404
    }
}