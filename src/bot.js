require('dotenv').config();

const {Client,MessageEmbed,Collection} = require('discord.js');
const fs = require('fs');
const mongo = require('./mongo');
const levels = require('./commands/level');
const client = new Client({
    partials: ['MESSAGE','REACTION']
});
client.commands = new Collection();
const PREFIX = "-";
const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
client.on('ready',async ()=>{
    console.log(`${client.user.username} has logged in.`);

    await mongo().then(mongoose =>{
        try{
           console.log('Connected to mongo');
        }catch (e) {
            //handle error
        } finally {
           mongoose.connection.close();
        }
    })
});

client.on('message',(message)=>{
    if(message.author.bot == true) return;
   //console.log(`[${message.author.tag}]: ${message.content}`);
    const len = message.content.length;
    client.commands.get('level').execute(message,len);
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
       if(CMD_NAME === 'play'){
        client.commands.get('play').execute(message, args,CMD_NAME);
    } if(CMD_NAME === 'pause'){
        client.commands.get('pause').execute(message,args);
    }

       if(CMD_NAME==='leave'){
           client.commands.get('leave').execute(message,args);
       }
       if(CMD_NAME === 'skip'){
           client.commands.get('play').execute(message,args,CMD_NAME);
       }
       if(CMD_NAME === 'stop'){
           client.commands.get('play').execute(message,args,CMD_NAME);
       }
       if(CMD_NAME === 'gif'){
           client.commands.get('gif').execute(message,args);
       }
       //if(CMD_NAME === 'level'){
          // client.commands.get('level').execute(message);
      // }
       if(CMD_NAME==='shutdown'){
           if(message.author.id === '686877248447578150' || message.author.id === '549331714552496149')
               message.channel.send('Shutting down...').then(m => {
                   client.destroy();
               });
           else{
               message.channel.send('You do not own me');
           }
       }
//>>>>>>> 8ba9d0d8d4d2ba83d1e98c708f54f4b1abeaa8f7
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
