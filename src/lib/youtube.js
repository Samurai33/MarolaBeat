// Integração simplificada com a API do YouTube Data v3
// Busca vídeos por nome ou URL e retorna informações essenciais
import { google } from 'googleapis';

const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });

export async function searchYouTube(query) {
  const res = await youtube.search.list({
    part: 'snippet',
    q: query,
    maxResults: 1,
    type: 'video',
  });
  if (!res.data.items || res.data.items.length === 0) return null;
  const video = res.data.items[0];
  return {
    id: video.id.videoId,
    title: video.snippet.title,
    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    thumbnail: video.snippet.thumbnails?.default?.url,
  };
}
