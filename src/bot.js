require('dotenv').config();

const {Client,MessageEmbed} = require('discord.js');

const client = new Client({
    partials: ['MESSAGE','REACTION']
});
const PREFIX = "-";

client.on('ready',()=>{
    console.log(`${client.user.username} has logged in.`);
});

client.on('message',(message)=>{
    if(message.author.bot == true) return;
   //console.log(`[${message.author.tag}]: ${message.content}`);
   if(message.content == 'how to embed'){
       const embed = new MessageEmbed().setTitle('a slick little embed.').setColor(0xff0000).setDescription('hello');
       message.channel.send(embed);
   }
   if(message.content=='hello'){
       message.reply('hello');
   }
   if(message.content.startsWith(PREFIX)){
       const [CMD_NAME, ...args] = message.content
           .trim()
           .substring(PREFIX.length)
           .split(/\s+/);
       if(CMD_NAME == "react"){
           if(args.length==0) return message.reply('please refer message');
           //const member = message.guild.members.cache.get(args[0]);
            message.channel.send(':poop:');
       }
   }
});

client.on('messageReactionAdd',(reaction,user)=>{
     const {name} = reaction.emoji;
     console.log('hi');
    if(reaction.message.id == '820319152459087883'){
        switch (name){
            case '💩':
                message.channel.send('FU');
                break;
            case '😢':
                message.channel.send('aww');
                break;

        }
     }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
