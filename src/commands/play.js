
import { SlashCommandBuilder } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import { userVC, joinSmart, safeRespond, playWithRetry } from '../lib/util.js';
import { refreshPanel } from '../ui/panel.js';

export const command = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Tocar música do YouTube por nome/URL')
  .addStringOption(o => o.setName('query').setDescription('Nome ou URL do YouTube').setRequired(true));

export async function execute(interaction) {
  const qstr = interaction.options.getString('query', true);
  if (/soundcloud\.com|spotify\.com/i.test(qstr)) {
    return safeRespond(interaction, '⚠️ Este MVP toca **apenas YouTube**.', { ephemeral: true });
  }
  const ch = userVC(interaction);
  if (!ch) return safeRespond(interaction, '❌ Entre num canal de voz primeiro.', { ephemeral: true });

  await interaction.deferReply(); // resposta pública
  joinSmart(interaction);

  try {
    const main = useMainPlayer();
    const { track } = await playWithRetry(main, ch, qstr, interaction.user, {
      metadata: interaction.channel,
      selfDeaf: true,
      leaveOnEmpty: true,
      leaveOnEnd: true,
      leaveOnStop: true
    });
    await safeRespond(interaction, `▶️ Tocando: **${track.title}**`);
    setTimeout(() => refreshPanel(interaction.guildId), 1000);
  } catch (e) {
    const msg = typeof e?.message === 'string' ? e.message : String(e);
    console.error('[CMD /play error]', e);
    await safeRespond(
      interaction,
      `❌ Falhou ao tocar.\n> ${msg.includes('timeout') ? 'O YouTube demorou demais para responder' : msg}`
    );
  }
}
