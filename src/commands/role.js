const {MessageEmbed} = require('discord.js')
module.exports = {
    name:"role",
    description:"A role utility command",
    category : "utility",
    run: async (message,args)=>{
        if(!message.member.permissions.has("ADMINISTRATOR"))
            return message.channel.send('You do not have admin permissions ${message.author.username}');
        if(args[0].toLowerCase() === "create"){
            let name = message.content.split(`-role create`).join("");
            let color;
            args.forEach((arg)=>{
                if(arg.startsWith("#")){
                    color=arg;
                }
            });
            if(!name){
                return message.channel.send('You did not provide a name for this role!');
            }
            if(!color){
                return message.channel.send('You did not provide a color for this role!');
            }
            if(color>=16777215)
                return message.channel.send('The hex code is too big, it should be between 0 and 16777215!');
            if(color<=0){
                return message.channel.send('The hex code cannot be negative!');
            }
            name = name.replace(`${color}`,``)
            try{
            let role_new = await message.guild.roles.create({
                data:{
                    name:name,
                    color:color,
                },
            });
            const Embed = new MessageEmbed()
                .setTitle('NEW ROLE')
                .setDescription(
                    `${message.author.username} has created the role "${name}"\n The color is: ${color}\nIts ID: ${role_new.id}`
                ).setColor(color);
            message.channel.send(Embed);}
            catch (e) {
                console.log(e);
            }
        } else if(args[0].toLowerCase() === "delete"){
            let roledel = message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find((r)=>r.name==args[1]);
            if(!roledel){
                return message.channel.send('You did not provide the name/ID of the role or the role does not exist!');

            }
            roledel.delete();
            const EmbedDel = new MessageEmbed()
                .setTitle("DELETED ROLE")
                .setColor(roledel.color)
                .setDescription(`${message.author.username} has deleted the role of "${roledel.name}".`);
            message.channel.send(EmbedDel);
        }
    },
};