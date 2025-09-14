
# 🎵 MarolaBeat (2025) — Discord Music Bot

[![Node.js](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org)  

Bot de música estilo **Hydra** para Discord, desenvolvido em **Node.js**, usando apenas **YouTube API oficial** para busca e **play-dl** para streaming. Código limpo, moderno, sem dependências antigas.  

✅ Estável 24/7 com **PM2**  
✅ Alta qualidade (FFmpeg embutido via `ffmpeg-static`)  
✅ Suporte a **YouTube** (apenas)  
✅ Painel interativo com botões (Play/Stop/Volume)  

---

## 🚀 Pré-requisitos
- **Node.js 20+ (LTS)**  
- **FFmpeg** → já embutido (`ffmpeg-static`)  
- Bot do Discord criado no [Developer Portal](https://discord.com/developers/applications)  
  - **Token** do bot → `DISCORD_TOKEN`  
  - **Application ID** → `CLIENT_ID`  
  - **Guild ID** (ID do servidor alvo) → `GUILD_ID`  

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url> marolabeat
   cd marolabeat
````

2. Instale dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz:

   ```ini
   DISCORD_TOKEN=seu_token_aqui
   CLIENT_ID=sua_application_id
   GUILD_ID=seu_guild_id
   YOUTUBE_COOKIE=""
   ```

---

## ▶️ Execução

### Desenvolvimento

```bash
npm run dev
```

### Produção simples

```bash
npm start
```

### Produção 24/7 (PM2)

```bash
npm install -g pm2
pm2 start index.js --name marolabeat
pm2 save
pm2 logs marolabeat
```

---

## 🎛️ Comandos Slash


* `/setup` → Cria canal **🎵・pedidos** + painel visual
* `/play <nome/url>` → Toca música do **YouTube**
* `/stop` → Para e desconecta o bot
* *(Volume via botões interativos)*

---

## 🎚️ Painel Hydra

O bot cria automaticamente um painel fixo com botões de controle:


* ⏹️ **Stop**
* 🔉 **Volume −10**
* 🔊 **Volume +10**

---

## 📂 Estrutura do Projeto

```
marolabeat/
├── index.js              # Código principal
├── package.json
├── config.json           # Persistência leve (painel/canais)
├── .env                  # Variáveis de ambiente
└── README.md
```

---


## 🔮 Backlog Futuro

* `/pause`, `/resume`, `/queue`, `/np`, `/shuffle`, `/loop` (não implementados)
* Filtros de áudio (bassboost, nightcore, 8D, etc.)
* Autodisconnect configurável
* Painel web (dashboard)

---

## 📜 Licença

MIT © 2025 — Samurai33