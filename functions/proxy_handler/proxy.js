import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import nacl from "tweetnacl";

const REGION = process.env.REGION;
const snsClient = new SNSClient({ region: REGION });

export async function handler(event, context, callback) {
    console.info(`Event recieved`);
    const strBody = event.body; // should be string, for successful sign

    if (!event.headers['test']) {
        console.info("verifying signature");
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
            console.warn("Invalid Request Signature");
            return {
                statusCode: 401,
                body: JSON.stringify('invalid request signature'),
            };
        } else {
            console.info("Request Signature Verified")
        }
    }

    // Replying to ping (requirement 2.)
    const body = JSON.parse(strBody);
    console.info(`Body type : ${body.type}`);
    if (body.type == 1) {
        return {
            statusCode: 200,
            body: JSON.stringify({ "type": 1 }),
        }
    }

    // Handle command (send to SNS to be picked up by one of Lambdas)
    if (body.data.name) {
        console.info(`Command name recieved: ${body.data.name}`);
        const params = {
            Message: JSON.stringify(body, null, 2),
            Subject: "Test SNS From Lambda",
            TopicArn: process.env.TOPIC_ARN,
            MessageAttributes: { "command": { DataType: 'String', StringValue: body.data.name } }
        };
        console.info("Pushing to SNS");
        const response = await snsClient.send(new PublishCommand(params));
        console.info("SNS Response: ", response);
        if (response.MessageId) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    "type": 4,
                    "data": { "content": "*Loading...*" }
                })
            }
        }
    }

    return {
        statusCode: 404
    }
}