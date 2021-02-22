module.exports = {
	name: 'try',
	description: 'TRIAL',
	execute(message, args) {
		if(args){
            message.reply(args);
        }
	},
};