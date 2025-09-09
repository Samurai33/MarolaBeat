
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import client from './src/lib/client.js';
import player from './src/player/player.js';
import { registerPlayerEvents } from './src/player/playerEvents.js';

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

// Registrar eventos do player
registerPlayerEvents(player);

client.login(process.env.DISCORD_TOKEN);
