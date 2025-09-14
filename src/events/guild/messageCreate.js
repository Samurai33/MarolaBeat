
import { Events } from 'discord.js';
import { db } from '../../lib/db.js';
import { joinSmart } from '../../lib/util.js';
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

  // Comando de tocar música agora é apenas via slash /play
}
