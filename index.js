const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
client.commands = new Discord.Collection();

client.login(process.env.BOTTOKEN)
client.on("ready", () => {
    console.log('Ready');
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
    if(!message.content.startsWith('!') || message.author.bot) return;

    let tokens = message.content.split(' ');
    let command = tokens.shift().toLowerCase();
    let args = tokens.join(' ');
    command = command.substring(1);
    try{
        client.commands.get(command).execute(message, args);
    } catch (err) {
        console.error(err);
        message.reply('There was an error trying to execute that command.')
    }
})