
import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import { getVoiceConnection } from '@discordjs/voice';
import { safeRespond } from '../lib/util.js';
import { refreshPanel } from '../ui/panel.js';

export const command = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Parar e sair do canal de voz');

export async function execute(interaction) {
  const q = useQueue(interaction.guildId);
  if (q) q.delete();
  getVoiceConnection(interaction.guildId)?.destroy();
  await safeRespond(interaction, '⏹️ Parei e saí do canal.');
  setTimeout(() => refreshPanel(interaction.guildId), 200);
}
