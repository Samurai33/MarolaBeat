import { Events } from 'discord.js';
import { useQueue } from 'discord-player';
import { getVoiceConnection } from '@discordjs/voice';
import { db } from '../../lib/db.js';
import { IDS, refreshPanel } from '../../ui/panel.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = new Map();
const commandsPath = path.join(__dirname, '..', '..', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(`file://${filePath}`);
  if (command.command) {
    commands.set(command.command.name, command);
  }
}

export const name = Events.InteractionCreate;

export async function execute(interaction) {
  if (interaction.isChatInputCommand()) {
    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  } else if (interaction.isButton()) {
    const cfg = db[interaction.guildId];
    if (!cfg || interaction.channelId !== cfg.reqChan) return;
    const q = useQueue(interaction.guildId);
    if (!q) return interaction.reply({ content: '⚠️ Nada tocando.', ephemeral: true });

    try {
      switch (interaction.customId) {
        case IDS.PAUSE:
          q.node.isPaused() ? q.node.resume() : q.node.pause();
          break;
        case IDS.SKIP:
          q.node.skip();
          break;
        case IDS.STOP:
          q.delete();
          getVoiceConnection(interaction.guildId)?.destroy();
          break;
        case IDS.VDN:
          q.node.setVolume(Math.max(0, (q.node.volume ?? 100) - 10));
          break;
        case IDS.VUP:
          q.node.setVolume(Math.min(200, (q.node.volume ?? 100) + 10));
          break;
      }
      await interaction.reply({ content: 'ok', ephemeral: true });
    } finally {
      refreshPanel(interaction.guildId);
    }
  }
}