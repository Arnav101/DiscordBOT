const fetch = require('node-fetch')

module.exports = {
	name: 'gif',
	description: 'GIF',
	async execute(message, args) {
		let url = `https://g.tenor.com/v1/search?q=${args}&key=${process.env.TENORKEY}`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.channel.send(json.results[index].url);
	},
};