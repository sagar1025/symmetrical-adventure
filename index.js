// const { WebcastPushConnection } = require('tiktok-live-connector');

// // Username of someone who is currently live
// let tiktokUsername = "sabrinarob64";

// // Create a new wrapper object and pass the username
// let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// // Connect to the chat (await can be used as well)
// tiktokLiveConnection.connect().then(state => {
//     console.info(`Connected to roomId ${state.roomId}`);
// }).catch(err => {
//     console.error('Failed to connect', err);
// })

// // Define the events that you want to handle
// // In this case we listen to chat messages (comments)
// tiktokLiveConnection.on('chat', data => {
//     console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
// })
const { clean } = require("./clean");
const { mapUniqueWords } = require('./mapUniqueWords');

const comments = ["Does it have anything to do with increased services that are provided between iPhone users (Facetime, iMessage, etc.).  I get that there are platforms that work for both so maybe it's a way for people to be polarized or people are just lazy and don't want to download additional apps."
, "apple hater nor a google fanboy, they both have pros and cons, I like what apple has done with their security and refusing to create a backdoor into their devices for federal agencies even under extreme pressure, I also dislike their closed ecosystem for apps and development compared to googles, you're not wrong that google has a habit of spinning up a product and then axing it without warning after years of neglecting it, I just think it's irrelevant to the point that apple should implement RCS and my opinion is that they're doing it on purpose to make iphone look good and further bias iphone users against android users by making their images look like trash because they're using a highly compressed image on the back of a protocol that's ancient and has a clear successor"
, "apple could very well integrate with the newer open protocol for messaging that enables similar features as imessage but they don't, because that'd make their texts the same as everyone elses"
,"Maybe I should change to Android so I can weed out those potential matches lol"
, "you could use one of those texting apps that gives you a fake number, additional level of security and i'm sure they're not using imessage lol"
,"Lol google bungled 14 different messaging platforms and let device manufacturers do their own too. And it's Apple's fault somehow?"
,"what does apple implementing an industry standard set forth by the GSM assosciation for cell phones have to do with googles implementation of messaging platforms?"
, "iMessage is a platform the people prefer, and google keeps abandoning their many attempts for years. SMS is the fallback standard that all phones have used for decades"
,"and RCS is now promoted in favor of SMS, RCS is not a google product."
,"then why do you keep talking about google abandoning platforms when we're discussing apples refusal to implement RCS?"
,"The whole point was that google could have done their own messaging platform correctly a long time ago. If the carriers force RCS then apple wont have a choice. As it's stands, it's their choice"
,"Does it have anything to do with increased services that are provided between iPhone users (Facetime, iMessage, etc.).  I get that there are platforms that work for both so maybe it's a way for people to be polarized or people are just lazy and don't want to download additional apps."]

const newComment = "Yeah I'm definitely not a die hard on either side of the spectrum, I just hate that google is now playing the victim only because they realize the disparity between the quality of messaging on iOS and android lol. It's like a get out jail free card for the apple"
const topN = [];//array of objects.
let uniqueWords = new Map();


comments.forEach((comment, idx) => {
    const words = comment.split(' ');
    words.forEach((word, idx) => {
        word = clean(word)
        if(word && word.length > 2) {
            uniqueWords = mapUniqueWords(uniqueWords, word);
        }
    });
});

newComment.split(' ').forEach((word, idx) => {
    const cleanWord = clean(word);
    if(cleanWord && cleanWord.length > 2) {
        //console.log(cleanWord);
        uniqueWords = mapUniqueWords(uniqueWords, cleanWord);
    }
});
//sort uniqueWords
const sorted = new Map([...uniqueWords.entries()].sort((a,b) => b[1] - a[1]));
console.log(sorted)