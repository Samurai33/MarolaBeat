
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import { db, saveDB } from '../lib/db.js';
import client from '../lib/client.js';

export const IDS = { PAUSE: 'zb:pause', SKIP: 'zb:skip', STOP: 'zb:stop', VDN: 'zb:vdn', VUP: 'zb:vup' };

export const controlsRow = () =>
  new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId(IDS.PAUSE).setLabel('⏯️').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(IDS.SKIP).setLabel('⏭️').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(IDS.STOP).setLabel('⏹️').setStyle(ButtonStyle.Danger),
    new ButtonBuilder().setCustomId(IDS.VDN).setLabel('🔉').setStyle(ButtonStyle.Secondary),
    new ButtonBuilder().setCustomId(IDS.VUP).setLabel('🔊').setStyle(ButtonStyle.Secondary)
  );

export const nowPlaying = (q) => {
  const t = q?.currentTrack;
  const e = new EmbedBuilder().setColor(0x2f3136).setTitle('🎶 MarolaBeat — Hydra style');
  if (t) {
    e.setDescription(`**Tocando:** [${t.title}](${t.url})`);
    if (t.thumbnail) e.setThumbnail(t.thumbnail);
  } else {
    e.setDescription('Fila vazia. Envie **nome/URL do YouTube** neste canal.');
  }
  return e;
};

export async function ensurePanel(guild, chanId) {
  const chan = await guild.channels.fetch(chanId).catch(() => null);
  if (!chan) return null;
  const cfg = (db[guild.id] ||= {});
  if (cfg.panelId) {
    const msg = await chan.messages.fetch(cfg.panelId).catch(() => null);
    if (msg) return msg;
  }
  const m = await chan.send({ embeds: [nowPlaying(null)], components: [controlsRow()] });
  cfg.panelId = m.id;
  saveDB();
  return m;
}

export async function refreshPanel(gid) {
  const cfg = db[gid];
  if (!cfg?.reqChan) return;
  const g = await client.guilds.fetch(gid).catch(() => null);
  if (!g) return;
  const msg = await ensurePanel(g, cfg.reqChan);
  if (!msg) return;
  await msg.edit({ embeds: [nowPlaying(useQueue(gid))], components: [controlsRow()] }).catch(() => {});
}
