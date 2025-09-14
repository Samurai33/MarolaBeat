
import { SlashCommandBuilder } from 'discord.js';
import {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
  getVoiceConnection,
} from '@discordjs/voice';
import { createYouTubeResource } from '../utils/audio.js';
import { YouTube } from 'youtube-sr';

export const command = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Toca uma música do YouTube')
  .addStringOption(opt =>
    opt.setName('query')
      .setDescription('URL ou termos de busca do YouTube')
      .setRequired(true)
  );

export async function execute(interaction) {
  if (interaction.replied || interaction.deferred) {
    return interaction.followUp({ content: 'Já existe uma ação em andamento para este comando.', ephemeral: true });
  }

  await interaction.deferReply();

  const member = interaction.member;
  const voiceChannel = member?.voice?.channel;
  if (!voiceChannel) {
    return interaction.editReply('❌ Você precisa estar em um canal de voz.');
  }

  const query = interaction.options.getString('query', true).trim();
  let targetUrl = query;
  const isUrl = /^https?:\/\//i.test(query);

  try {
    if (!isUrl) {
      await interaction.editReply(`🔎 Buscando: \`${query}\` ...`);
      const res = await YouTube.search(query, { limit: 1, type: 'video' });
      if (!res?.length) return interaction.editReply('❌ Não encontrei resultados para sua busca.');
      targetUrl = `https://www.youtube.com/watch?v=${res[0].id}`;
      await interaction.editReply(`✅ Achei: **${res[0].title}**\n${targetUrl}`);
    } else {
      await interaction.editReply(`🎯 Alvo: ${targetUrl}`);
    }

    let connection = getVoiceConnection(interaction.guildId);
    if (!connection) {
      connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true,
      });
      await entersState(connection, VoiceConnectionStatus.Ready, 20_000);
    }

    const player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Pause } });
    const { resource, cleanup } = await createYouTubeResource(targetUrl);
    try { resource.volume?.setVolume(0.8); } catch {}

    connection.subscribe(player);
    player.play(resource);

    player.once(AudioPlayerStatus.Playing, () => {
      interaction.editReply(`▶️ Reproduzindo agora: ${targetUrl}`).catch(() => {});
    });

    player.on('error', (err) => {
      console.error('[PLAYER error]', err);
      try { cleanup?.(); } catch {}
      interaction.followUp({ content: `⚠️ Erro no player: ${String(err.message || err)}` }).catch(() => {});
    });

  } catch (err) {
    console.error('[CMD /play error]', err);
    return interaction.editReply(`❌ Falha ao tocar: ${String(err.message || err)}`);
  }
}
