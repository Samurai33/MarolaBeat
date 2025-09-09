
import { SlashCommandBuilder, ChannelType, PermissionsBitField } from 'discord.js';
import { db, saveDB } from '../lib/db.js';
import { ensurePanel } from '../ui/panel.js';
import { safeRespond } from '../lib/util.js';

export const command = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Cria o canal de pedidos e o painel de controle');

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const g = interaction.guild;
  let chan = g.channels.cache.get(db[g.id]?.reqChan || '');
  if (!chan) {
    chan = await g.channels.create({
      name: '🎵・pedidos',
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: g.roles.everyone,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        }
      ]
    });
  }
  db[g.id] = { ...(db[g.id] || {}), reqChan: chan.id };
  saveDB();
  await ensurePanel(g, chan.id);
  return safeRespond(interaction, '✅ Canal de pedidos pronto. Envie nome/URL do **YouTube** nele.');
}
