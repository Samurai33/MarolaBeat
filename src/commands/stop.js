
import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export const command = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Parar e sair do canal de voz');

export async function execute(interaction) {
  const connection = getVoiceConnection(interaction.guildId);
  if (!connection) {
    return interaction.reply({ content: '❌ Não estou em um canal de voz.', flags: 64 });
  }
  connection.destroy();
  await interaction.reply('⏹️ Música parada e desconectado do canal de voz.');
}
