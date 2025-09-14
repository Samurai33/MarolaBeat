import { Events } from 'discord.js';

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
    // Sempre faz refresh do painel antes de executar o comando
    const cfg = db[interaction.guildId];
    if (cfg && cfg.reqChan) {
      await refreshPanel(interaction.guildId);
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error('[interactionCreate error]', error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: '❌ Ocorreu um erro ao processar este comando.', ephemeral: true }).catch(() => {});
      } else {
        await interaction.followUp({ content: '❌ Ocorreu um erro ao processar este comando.' }).catch(() => {});
      }
    }
  } else if (interaction.isButton()) {
    const cfg = db[interaction.guildId];
    if (!cfg || interaction.channelId !== cfg.reqChan) return;
    // Controles de player removidos. Apenas responde OK para manter compatibilidade visual.
    await interaction.reply({ content: 'ok', ephemeral: true });
    refreshPanel(interaction.guildId);
  }
}