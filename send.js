const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const { QUEUE_URL } = require('./config');


const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      "StreamFrom": {
        DataType: "String",
        StringValue: "Twitch"
      },
      "UserId": {
          DataType: "String",
          StringValue: 'SOME_USERID'
      }
    },
    MessageBody: 'SOME_COMMENT_FROM_STREAM',
    QueueUrl: QUEUE_URL
 };
 
 sqs.sendMessage(params, (err, data) => {
     if (err) {
       console.error("Error", err);
     } else {
       console.log("Success", data.MessageId);
     }
 });