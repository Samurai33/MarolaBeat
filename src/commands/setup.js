
import { SlashCommandBuilder, ChannelType, PermissionsBitField } from 'discord.js';
import { db, saveDB } from '../lib/db.js';
import { ensurePanel } from '../ui/panel.js';
import { safeRespond } from '../lib/util.js';

export const command = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Cria o canal de pedidos e o painel de controle');

export async function execute(interaction) {
  await interaction.deferReply({ flags: 64 });

  const guild = interaction.guild;
  let channel = guild.channels.cache.get(db[guild.id]?.reqChan || '');
  if (!channel) {
    channel = await guild.channels.create({
      name: '🎵・pedidos',
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        }
      ]
    });
  }
  db[guild.id] = { ...(db[guild.id] || {}), reqChan: channel.id };
  saveDB();
  await ensurePanel(guild, channel.id);
  return safeRespond(interaction, '✅ Canal de pedidos pronto. Envie nome/URL do **YouTube** nele.', { flags: 64 });
}
