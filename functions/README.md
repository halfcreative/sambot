# Sambot 2.0 - Functions folder

## Purpose

The functions folder houses the aws lambda functions compromising Sambot. Each function in this folder will deploy to its own lambda function and will handle a single application command.

## Structure

All incoming discord commands will first hit the proxy_handler function. The proxy handler will take each message and pass it along to an SNS queue. The queue will have filter processors in place to route the messages to the appropriate lambda function.
