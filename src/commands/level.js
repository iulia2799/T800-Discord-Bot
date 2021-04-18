const mongo = require('../mongo');
require('dotenv').config();
const profileSchema = require('../schemas/profile-schema');
const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'level',
    description: 'level xp',
    async execute(message,len) {

            const { guild, member } = message

            addXP(guild.id, member.id,member, len, message)

    }
}

const getNeededXP = level => level+150

const addXP = async (guildId,userId,member,xpToAdd,message) => {
    await mongo().then(async mongoose =>{
        try{
           const result =  await profileSchema.findOneAndUpdate({
                guildId,
                userId
            },{
                guildId,
                userId,
                $inc : {
                    xp:xpToAdd
                }
            },{
                upsert : true,
                new : true
            });
            console.log('RESULT:',result);
            let {xp,level}=result;
            const needed = getNeededXP(level);
            if(xp >=needed){
                if(level<7)
                {   ++level;
                    xp-=needed;
                    if(level==7){
                        //message.reply(`You are now level ${level} with ${xp}! You are now at the top of hierarchy!`);

                        const embed = new MessageEmbed()
                            .setTitle('LEVEL EXP')
                            .setColor(0xff0000)
                            .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`, 'https://discord.js.org')
                            .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/1200px-Queen_Elizabeth_II_in_March_2015.jpg')
                            .setDescription(`You are now level ${level} with ${xp}! You are now at the top of hierarchy!`);
                        message.reply(embed);
                    }
                    const embed = new MessageEmbed()
                        .setTitle('LEVEL EXP')
                        .setColor(0xff0000)
                        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`, 'https://discord.js.org')
                        .setImage('https://i.pinimg.com/originals/76/63/5a/76635a97f495407899c68b16ad16248a.png')
                        .setDescription(`You are now level ${level} with ${xp}! You now need ${getNeededXP(level)-xp}XP to level up again!`);
                    message.reply(embed);
                }

                //make embed to user interface......
                await profileSchema.updateOne({
                    guildId,
                    userId
                },{
                    level,
                    xp
                })
            }
            if(message.content === '-level'){
                if(level<7) {
                    //message.reply(`You are now level ${level} with ${xp}! You now need ${getNeededXP(level)}XP to level up again!`);
                    const embed = new MessageEmbed()
                        .setTitle('LEVEL EXP')
                        .setColor(0xff0000)
                        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`, 'https://discord.js.org')
                        .setImage('https://i.pinimg.com/originals/76/63/5a/76635a97f495407899c68b16ad16248a.png')
                        .setDescription(`You are now level ${level} with ${xp}! You now need ${getNeededXP(level)-xp}XP to level up again!`);
                    message.reply(embed);
                }
                else
                {//message.reply(`You are now level ${level} with ${xp}! You are now at the top of hierarchy!`);
                    const embed = new MessageEmbed()
                        .setTitle('LEVEL EXP')
                        .setColor(0xff0000)
                        .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL()}`, 'https://discord.js.org')
                        .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/1200px-Queen_Elizabeth_II_in_March_2015.jpg')
                        .setDescription(`You are now level ${level} with ${xp}! You are now at the top of hierarchy!`);
                    message.reply(embed);

                }
            }
            if(level === 1){
                let role = message.guild.roles.cache.find(r => r.name === "Rebel");
                member.roles.add(role).catch(console.error);
            }
            if(level === 2){
                let role = message.guild.roles.cache.find(r => r.name === "T800");
                member.roles.add(role).catch(console.error);
            }
            if(level === 3){
                let role = message.guild.roles.cache.find(r => r.name === "T1000");
                member.roles.add(role).catch(console.error);
            }
            if(level === 4){
                let role = message.guild.roles.cache.find(r => r.name === "SkyNet");
                member.roles.add(role).catch(console.error);
            }
            if(level === 5){
                let role = message.guild.roles.cache.find(r => r.name === "Pepe the Terminator");
                member.roles.add(role).catch(console.error);
            }
            if(level === 6){
                let role = message.guild.roles.cache.find(r => r.name === "Vision");
                member.roles.add(role).catch(console.error);
            }
            if(level === 7){
                let role = message.guild.roles.cache.find(r => r.name === "Budha");
                member.roles.add(role).catch(console.error);
            }
        }finally {
            mongoose.connection.close();
        }
    })
}
module.exports.addXP = addXP