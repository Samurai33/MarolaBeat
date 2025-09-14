
import { joinVoiceChannel } from '@discordjs/voice';

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

// playWithRetry removido (não é mais necessário)
