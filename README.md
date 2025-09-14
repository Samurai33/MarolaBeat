# 🎵 MarolaBeat (2025) — Discord Music Bot

[![Node.js](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org)
[![Discord.js](https://img.shields.io/badge/discord.js-14.x-blue.svg)](https://discord.js.org)
[![YouTube](https://img.shields.io/badge/youtube-stable-red.svg)](https://youtube.com)

> **Bot de música robusto, moderno e legal para Discord.**
> - Streaming 100% YouTube, headers/cookie, sem play-dl.
> - Busca e painel interativo estilo Hydra.
> - Código limpo, modular, pronto para produção 24/7.

---

## 🚀 Requisitos
- **Node.js 20+** (LTS recomendado)
- **Token do Discord** ([crie aqui](https://discord.com/developers/applications))
- **Cookie do YouTube** (opcional, mas recomendado para estabilidade)

---

## 📦 Instalação

```bash
# Clone o projeto
git clone <repo-url> marolabeat
cd marolabeat

# Instale dependências
npm install
```

Crie um arquivo `.env` na raiz:

```ini
DISCORD_TOKEN=seu_token_aqui
YT_COOKIE=__Secure-xxxxxx
YT_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

---

## ▶️ Como rodar

```bash
# Desenvolvimento
npm run dev

# Produção
npm start

# Produção 24/7 (PM2)
npm install -g pm2
pm2 start index.js --name marolabeat
pm2 save
pm2 logs marolabeat
```

---

## 🎛️ Comandos Slash

- `/setup` — Cria canal **🎵・pedidos** + painel visual
- `/play <nome/url>` — Toca música do **YouTube** (busca ou URL)
- `/stop` — Para e desconecta o bot

> Volume: ajuste via botões do painel interativo

---

## 🛠️ Stack & Arquitetura

- **discord.js 14** — API moderna do Discord
- **@distube/ytdl-core** — Streaming YouTube robusto (headers/cookie)
- **youtube-sr** — Busca YouTube rápida e sem API key
- **@discordjs/voice** — Áudio/voz nativo
- **prism-media** — Demux/decodificação eficiente
- **Painel visual** — UI com botões (stop, volume)
- **.env** — Configuração segura

```
marolabeat/
├── index.js
├── package.json
├── .env
├── src/
│   ├── commands/
│   │   ├── play.js
│   │   ├── stop.js
│   │   └── setup.js
│   ├── events/
│   │   └── guild/interactionCreate.js
│   ├── lib/
│   └── utils/audio.js
└── README.md
```

---

## ⚡ Dicas e Troubleshooting

- **ERR_INVALID_URL**: Certifique-se de que o comando `/play` está usando o utilitário de áudio moderno (`@distube/ytdl-core`) e que o cookie do YouTube está correto.
- **Cannot play audio as no valid encryption package is installed**: Rode `npm install @discordjs/opus libsodium-wrappers sodium-native tweetnacl`.
- **Bot não entra no canal de voz**: Verifique permissões do bot e se o canal existe.
- **YouTube bloqueando**: Atualize o cookie e user-agent no `.env`.

---

## 🔮 Futuro & Roadmap

- `/pause`, `/resume`, `/queue`, `/np`, `/shuffle`, `/loop`
- Filtros de áudio (bassboost, nightcore, 8D, etc.)
- Autodisconnect configurável
- Painel web/dashboard
- Suporte a múltiplas plataformas (Spotify, SoundCloud, etc.)

---

## 🤝 Comunidade & Referências

- [discord.js Guide](https://discordjs.guide/)
- [@distube/ytdl-core](https://github.com/distubejs/ytdl-core)
- [youtube-sr](https://github.com/DevSnowflake/youtube-sr)
- [Bots open source: Hydra, Green-bot, DisTube, Erela.js]

---

## 📜 Licença

MIT © 2025 — Samurai33