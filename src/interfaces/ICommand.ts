import {Client, CommandInteraction, SlashCommandBuilder} from 'discord.js';

export interface ICommand {
    data: SlashCommandBuilder;
    execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}