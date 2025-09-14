
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import client from './src/lib/client.js';
import { Collection } from 'discord.js';

async function main() {

client.commands = new Collection();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carregar eventos
const eventsPath = path.join(__dirname, 'src', 'events');
const eventFolders = fs.readdirSync(eventsPath);

for (const folder of eventFolders) {
  const folderPath = path.join(eventsPath, folder);
  const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const filePath = path.join(folderPath, file);
    const event = await import(`file://${filePath}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}


  // Carregar comandos
const commandsPath = path.join(__dirname, 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    if ('command' in command && 'execute' in command) {
        client.commands.set(command.command.name, command);
    }
}


client.login(process.env.DISCORD_TOKEN);
}

main();
