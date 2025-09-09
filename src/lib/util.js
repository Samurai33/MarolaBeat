
import { joinVoiceChannel } from '@discordjs/voice';
import { useMainPlayer } from 'discord-player';

export const userVC = (i) => i.member?.voice?.channel ?? null;

export function joinSmart(interaction) {
  const ch = userVC(interaction);
  if (!ch) {
    console.log('[VOICE] Usuário não está em um canal de voz.');
    return null;
  }
  console.log(`[VOICE] Conectando: ${ch.name} (${ch.id}) em ${ch.guild.name} (${ch.guild.id})`);
  try {
    const connection = joinVoiceChannel({
      channelId: ch.id,
      guildId: ch.guild.id,
      adapterCreator: ch.guild.voiceAdapterCreator,
      selfDeaf: true
    });
    return connection;
  } catch (error) {
    console.error('[VOICE] Erro ao conectar ao canal de voz:', error);
    return null;
  }
}

export async function safeRespond(interaction, content, { ephemeral = false, ...options } = {}) {
  const base = { content, ephemeral, ...options };
  try {
    if (interaction.deferred) return await interaction.editReply(base);
    if (interaction.replied)  return await interaction.followUp(base);
    return await interaction.reply(base);
  } catch (err) {
    if (err?.code === 10008) {
      try { return await interaction.followUp(base); } catch (e2) { console.error('[safeRespond followUp]', e2); }
    } else {
      console.error('[safeRespond]', err);
    }
  }
}

export async function playWithRetry(main, channel, query, requestedBy, nodeOptions) {
  const attempt = async () => main.play(channel, query, { requestedBy, nodeOptions });

  const withTimeout = async (ms) => {
    return await Promise.race([
      attempt(),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout: resolver/stream levou muito tempo')), ms))
    ]);
  };

  try {
    // 1ª tentativa (8s)
    return await withTimeout(8000);
  } catch (e) {
    console.warn('[playWithRetry][1ª falha]', e?.message || e);

    // Força reconexão de voz (especialmente no Windows)
    try {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: true
      });
    } catch {}

    // 2ª tentativa (12s)
    return await withTimeout(12000);
  }
}
