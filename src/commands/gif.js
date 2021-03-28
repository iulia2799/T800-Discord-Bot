const fetch = require('node-fetch');
require('dotenv').config();
module.exports = {
    name: 'gif',
    description: 'gif reaction',
    async execute(message, args) {
        let keywords = args;
        let url =`https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORLEY}&limit=8`;
        
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
        //message.channel.send("")
    }
}