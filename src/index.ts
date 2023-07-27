import {init} from './bootstrap.js';
import {Client, Events, GatewayIntentBits} from 'discord.js';

init();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env['DISCORD_TOKEN']);