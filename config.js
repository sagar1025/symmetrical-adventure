const dotenv = require('dotenv');

dotenv.config();
module.exports = {
    QUEUE_URL: process.env.QUEUE_URL,
};