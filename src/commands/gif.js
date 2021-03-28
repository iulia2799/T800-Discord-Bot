const fetch = require('node-fetch');
module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(message, args) {
        let url =`https://g.tenor.com/v1/search?q=${args}&key=${process.env.TENORLEY}&limit=8`;
        let keywords = args;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.result.length);
        message.channel.send(json.result[index].url);
        //message.channel.send("")
    }
}