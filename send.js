const { WebcastPushConnection } = require('tiktok-live-connector');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const { QUEUE_URL } = require('./config');


// Username of someone who is currently live
const tiktokUsername = "";

// Create a new wrapper object and pass the username
const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// // Connect to the chat (await can be used as well)
tiktokLiveConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
});

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on('chat', data => {
    console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
    const params = {
        DelaySeconds: 10,
        MessageAttributes: {
          "StreamFrom": {
            DataType: "String",
            StringValue: "Tiktok"
          },
          "UserId": {
              DataType: "String",
              StringValue: data.userId
          }
        },
        MessageBody: data.comment,
        QueueUrl: QUEUE_URL
     };
     
     sqs.sendMessage(params, (err, data) => {
         if (err) {
           console.error("Error", err);
         } else {
           console.log("Success", data.MessageId);
         }
     });  
});
