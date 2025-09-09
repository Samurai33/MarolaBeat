import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import * as discordPlayer from '@discord-player/extractor';
import ffmpeg from 'ffmpeg-static';
import client from '../lib/client.js';

if (ffmpeg) process.env.FFMPEG_PATH = ffmpeg;

const player = new Player(client, {
  connectionTimeout: 90_000,
  bufferingTimeout: 8_000,
  probeTimeout: 15_000,
  skipFFmpeg: false
});

await player.extractors.register(YoutubeiExtractor, {
  hl: 'pt-BR',
  gl: 'BR',
  client: 'ANDROID'
});

await player.extractors.loadMulti(discordPlayer.DefaultExtractors);

console.log('[FFMPEG]', process.env.FFMPEG_PATH ? 'ffmpeg-static OK' : 'usando PATH do sistema');

export default player;