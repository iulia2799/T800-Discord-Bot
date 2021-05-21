require('chai').assert;
const app = require('../src/commands/play');
const expect = require('chai').expect;
const {Client} = require('discord.js');
const client = new Client({
    partials: ['MESSAGE','REACTION']
});
describe('Music play',function (){
    it('test if music is played',function (){

        client.on('message',(message)=>{
            expect(app.execute(message,['manele'],'play')).to.equal('Florin Salam - Nu e suta, nu e mie (Official Video) [MANELE 2021]');
        })
        client.destroy();
        //expect(app.execute(input,['manele'],'play')).to.equal({});
    });
    it('test if it stops music',function (){
        client.on('message',(message)=>{
            expect(app.execute(message,[],'stop')).to.equal(undefined, undefined);
        })
        client.destroy();
    })
    it('test if it skips music',function (){
        client.on('message',(message)=>{
            expect(app.execute(message,[],'skip')).to.equal(undefined, undefined);
        })
        client.destroy();
    })
});