const assert = require('chai').assert;
const app = require('../src/commands/play');
const gif = require('../src/commands/gif');
const expect = require('chai').expect;
const {Client,MessageEmbed,Collection} = require('discord.js');
const client = new Client({
    partials: ['MESSAGE','REACTION']
});
describe('Music play',function (){
    it('test if music is played',function (){

        client.on('message',(message)=>{
            expect(app.execute(message,['manele'],'-play')).to.equal(message.content);
        })
        client.destroy();
        //expect(app.execute(input,['manele'],'play')).to.equal({});
    });
});
describe('Gifs',function (){
    it('test if gif is request',function (){

        client.on('message',(message)=>{
            expect(app.execute(message,'-gif')).to.equal(message.content);
        })
        client.destroy();


    });
});