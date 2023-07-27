import {Client, CommandInteraction, SlashCommandBuilder} from 'discord.js';
import {ICommand} from '../interfaces/ICommand.js';

const Ping: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),

    execute: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply('pong!');
    }
};

export default Ping;