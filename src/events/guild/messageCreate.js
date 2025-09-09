
import { Events } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { db } from '../../lib/db.js';
import { joinSmart, playWithRetry } from '../../lib/util.js';
import { refreshPanel } from '../../ui/panel.js';

export const name = Events.MessageCreate;

export async function execute(message) {
  if (message.author.bot || !message.guild) return;
  const cfg = db[message.guild.id];
  if (!cfg || message.channelId !== cfg.reqChan) return;

  if (/soundcloud\.com|spotify\.com/i.test(message.content)) {
    return message.reply('⚠️ Este MVP toca **apenas YouTube**.').catch(() => {});
  }

  const vc = message.member?.voice?.channel;
  if (!vc) return message.reply('❌ Entre num canal de voz primeiro.');

  joinSmart({ member: message.member });

  try {
    const main = useMainPlayer();
    await playWithRetry(main, vc, message.content, message.author, {
      metadata: message.channel,
      selfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true
    });
    if (message.deletable) message.delete().catch(() => {});
    setTimeout(() => refreshPanel(message.guild.id), 1000);
  } catch (e) {
    const msg = typeof e?.message === 'string' ? e.message : String(e);
    message.reply(`❌ ${msg}`).catch(() => {});
  }
}
