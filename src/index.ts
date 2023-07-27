import {init} from './bootstrap.js';
import {Client, Events, GatewayIntentBits} from 'discord.js';
import {ICommand} from './interfaces/ICommand.js';
import * as fs from 'fs';
import * as path from 'path';

init();

const commands: ICommand[] = [];

const commandsPath = './dist/commands';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import((`./commands/${file}`))).default;
    if ('data' in command && 'execute' in command) {
        commands.push(command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await c.application.commands.set(commands.map(cmd => cmd.data.toJSON()));
    console.log(`Successfully reloaded ${data.size} application (/) commands.`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    const isCommand = interaction.isChatInputCommand();

    if (isCommand) {
        const name = interaction.commandName;
        const command = commands.find(command => command.data.name == name);

        if (command) {
            await command.execute(client, interaction);
            return;
        }

        interaction.reply({
            content: 'This command hasn\'t been implemented!',
            ephemeral: true
        })
        return;
    }
});

client.login(process.env['DISCORD_TOKEN']);