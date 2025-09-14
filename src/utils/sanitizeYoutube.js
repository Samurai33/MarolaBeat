// src/utils/sanitizeYoutube.js
export function sanitizeYouTubeUrl(input) {
  try {
    // aceita youtu.be e youtube.com/watch
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '');

    // Caso especial: watch?v=...&list=...
    if ((host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') && url.pathname === '/watch') {
      const v = url.searchParams.get('v');
      if (v) {
        // Tocar só o vídeo → remover ruídos de playlist/mix
        const clean = new URL('https://www.youtube.com/watch');
        clean.searchParams.set('v', v);
        return { kind: 'video', url: clean.toString() };
      }
    }

    // youtu.be/<id>
    if (host === 'youtu.be') {
      const id = url.pathname.slice(1);
      if (id) {
        const clean = new URL('https://www.youtube.com/watch');
        clean.searchParams.set('v', id);
        return { kind: 'video', url: clean.toString() };
      }
    }

    // playlist pura (sem v)
    if ((host.endsWith('youtube.com')) && (url.pathname === '/playlist' || (url.pathname === '/watch' && !url.searchParams.get('v') && url.searchParams.get('list')))) {
      return { kind: 'playlist', url: input };
    }

    // Tentar validar genericamente: se for watch com v, é vídeo
    if ((host.endsWith('youtube.com')) && url.pathname === '/watch' && url.searchParams.get('v')) {
      return { kind: 'video', url: input };
    }

    // fallback: retorna "unknown", deixa o caller decidir (buscar por termo, etc.)
    return { kind: 'unknown', url: input };
  } catch {
    return { kind: 'unknown', url: input };
  }
}
