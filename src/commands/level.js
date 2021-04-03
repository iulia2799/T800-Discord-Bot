const mongo = require('../mongo');
require('dotenv').config();
const profileSchema = require('../schemas/profile-schema');
module.exports = {
    name: 'level',
    description: 'level xp',
    async execute(message,len) {

            const { guild, member } = message

            addXP(guild.id, member.id, len, message)

    }
}

const getNeededXP = level => level*level*100

const addXP = async (guildId,userId,xpToAdd,message) => {
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
                ++level;
                xp-=needed;
                message.reply(`You are now level ${level} with ${xp}! You now need ${getNeededXP(level)}XP to level up again!`);
                //make embed to user interface......
                await profileSchema.updateOne({
                    guildId,
                    userId
                },{
                    level,
                    xp
                })
            }
        }finally {
            mongoose.connection.close();
        }
    })
}
module.exports.addXP = addXP