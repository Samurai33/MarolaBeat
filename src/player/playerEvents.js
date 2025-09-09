
import { refreshPanel } from '../ui/panel.js';

export function registerPlayerEvents(player) {
  player.events.on('audioTrackStart', (q, t) => {
    console.log(`[PLAYER] Iniciando: ${t.title} (${t.url})`);
    refreshPanel(q.guild.id);
  });
  player.events.on('audioTrackAdd', (q, t) => console.log(`[PLAYER] Adicionado à fila: ${t.title}`));
  player.events.on('audioTracksAdd', (q, t) => console.log(`[PLAYER] ${t.length} faixas adicionadas à fila.`));
  player.events.on('audioTrackFinish', (q) => {
    console.log('[PLAYER] Faixa finalizada.');
    refreshPanel(q.guild.id);
  });
  player.events.on('queueEnd', (q) => {
    console.log('[PLAYER] Fila vazia. Bot desconectando.');
    refreshPanel(q.guild.id);
  });
  player.events.on('error', (q, e) => {
    console.error('[PLAYER error]', e?.message || e);
    if (q?.guild?.id) refreshPanel(q.guild.id);
  });
  player.events.on('playerError', (q, e) => {
    console.error('[PLAYER playerError]', e?.message || e);
    if (q?.guild?.id) refreshPanel(q.guild.id);
  });
  player.events.on('connectionError', (q, e) => {
    console.error('[VOICE connectionError]', e?.message || e);
    if (q?.guild?.id) refreshPanel(q.guild.id);
  });
  player.events.on('debug', (q, m) => console.log('[PLAYER debug]', m));
  player.events.on('playerStart', (q, t) => console.log('[PLAYER playerStart]', t?.title));
  player.events.on('playerSkip', (q, t) => console.log('[PLAYER playerSkip]', t?.title));
}
