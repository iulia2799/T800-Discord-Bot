const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
module.exports = {
    name: 'pause',
    description: 'pause the bot music bot',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.pause();
        await message.channel.send('music paused :smiling_face_with_tear:');
    }
}//to be continued
