import { Events, REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  console.log(`[BOT] Logado como ${client.user.tag}`);

  const commands = [];
  const commandsPath = path.join(__dirname, '..', '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`file://${filePath}`);
    commands.push(command.command.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log('[SLASH] Comandos registrados no GUILD_ID.');
  } catch (error) {
    console.error('[SLASH] Falha ao registrar comandos:', error);
  }
}