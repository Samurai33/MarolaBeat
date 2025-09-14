import ytdl from '@distube/ytdl-core';
import { demuxProbe, createAudioResource } from '@discordjs/voice';

const UA = process.env.YT_USER_AGENT || 'Mozilla/5.0';
const COOKIE = process.env.YT_COOKIE || '';

export async function createYouTubeResource(url) {
  if (!ytdl.validateURL(url)) {
    throw new Error(`URL inválida para YouTube: ${url}`);
  }

  const stream = ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
    highWaterMark: 1 << 25, // ~33MB
    requestOptions: {
      headers: {
        'user-agent': UA,
        'cookie': COOKIE,
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    },
  });

  const probe = await demuxProbe(stream);
  const resource = createAudioResource(probe.stream, {
    inputType: probe.type,
    inlineVolume: true,
  });

  return {
    resource,
    cleanup: () => { try { stream.destroy(); } catch {} },
  };
}
