// utils/normalizeInput.js
export function normalizeInputFromInteraction(interaction) {
  // 1) tenta pegar string do comando (ex.: /play query:...)
  const raw = interaction?.options?.getString?.('query') 
           ?? interaction?.options?.get('query')?.value 
           ?? null;

  // 2) se tiver anexo de áudio/URL
  const attachmentUrl = interaction?.options?.getAttachment?.('file')?.url 
                     ?? interaction?.targetMessage?.attachments?.first?.()?.url 
                     ?? null;

  // 3) se a interação veio de um link no contexto (message command)
  const messageUrl = interaction?.targetMessage?.content?.match?.(/https?:\/\/\S+/)?.[0] ?? null;

  const candidate = raw || attachmentUrl || messageUrl;

  if (!candidate || typeof candidate !== 'string' || candidate.trim().length === 0) {
    return { ok: false, reason: 'EMPTY_INPUT' };
  }

  const q = candidate.trim();

  // Aceita URLs e termos de busca; se não for URL, prefixa para search explícito
  const isUrl = /^https?:\/\//i.test(q);
  const final = isUrl ? q : `ytsearch:${q}`;

  return { ok: true, value: final };
}
