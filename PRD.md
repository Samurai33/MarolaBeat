📄 PRD — MarolaBeat Discord Music Bot
1. Visão Geral

O MarolaBeat é um bot de música para Discord desenvolvido em Node.js (ESM), utilizando as bibliotecas discord.js v14, discord-player v7 e discord-player-youtubei.

Ele oferece reprodução de músicas com alta qualidade, integração com YouTube (via Youtubei), Spotify e SoundCloud, suporte a playlists, fila dinâmica e um painel interativo estilo Hydra com botões de controle.

O bot foi projetado para rodar em VPS Linux/Windows 24/7 com estabilidade, logs claros e configuração via .env.

2. Objetivos

Fornecer um bot de música estável e de alta qualidade para comunidades.

Permitir que os usuários toquem músicas por nome ou link.

Suportar playlists completas e múltiplas fontes de música (YouTube, Spotify, SoundCloud).

Oferecer comandos slash intuitivos e botões interativos para controle.

Manter logs e monitoramento para fácil manutenção.

Garantir compatibilidade cross-platform (Windows/Linux).

3. Escopo
Escopo Atual

Reprodução de músicas de YouTube (YoutubeiExtractor), Spotify e SoundCloud.

Slash commands registrados automaticamente no servidor alvo.

Comandos básicos de controle:
/play, /stop, /skip, /setup.

Fila dinâmica de músicas com atualização automática no painel Hydra.

Controle por botões interativos: Play/Pause, Skip, Stop, Volume +/−.

Logs claros em console para debug.

Configuração via .env:

DISCORD_TOKEN=...
CLIENT_ID=...
GUILD_ID=...
YOUTUBE_COOKIE=...

Fora do Escopo (atual)

Sistema de permissões avançado por role.

Filtros de áudio (bass, 8D, etc.).

Autodesconexão customizada com timeout configurável.

Suporte nativo a Deezer, Apple Music ou Tidal.

4. Usuários-Alvo

Servidores de RP (ex.: Marola RP) que desejam rádio/música ambiente imersiva.

Comunidades de jogos, estudo ou música que precisam de música em tempo real.

Administradores de Discord que buscam uma solução leve e fácil de manter.

5. Requisitos Funcionais

RF01: O bot deve se conectar a um canal de voz quando requisitado.

RF02: O bot deve reproduzir músicas de YouTube, Spotify e SoundCloud.

RF03: O bot deve responder a comandos slash (/play, /stop, /skip, /setup).

RF04: O bot deve manter e exibir uma fila de músicas.

RF05: O bot deve permitir controle de volume via botões.

RF06: O bot deve exibir painel Hydra-style atualizado com a música atual.

RF07: O bot deve registrar comandos de slash no servidor configurado via GUILD_ID.

6. Requisitos Não Funcionais

RNF01: O bot deve rodar 24/7 com PM2 em VPS Linux ou Windows.

RNF02: O código deve ser compatível com Node.js v20.12+ (LTS atual).

RNF03: Logs de erros devem ser claros e rastreáveis ([PLAYER error], [VOICE error], [CLIENT error]).

RNF04: O código deve seguir boas práticas de ESM e usar dotenv para variáveis sensíveis.

RNF05: O bot deve ser resiliente a erros de conexão (retry automático em operation aborted).

7. Futuro (Backlog / Roadmap)

🎛 Filtros de áudio (/filters com bassboost, nightcore, 8D, etc.).

🔄 Loop/Repeat (/loop, /repeat).

🔀 Shuffle da fila (/shuffle).

⏸️ Pause/Resume via comandos (/pause, /resume).

🔊 Comando /volume (ajuste direto por slash além dos botões).

👤 Sistema de permissões (restrição de uso a DJs/admins).

🕒 Autodisconnect configurável (sair após X minutos de inatividade).

🌐 Dashboard Web para controlar músicas fora do Discord.

📦 Containerização com Docker para deploy simplificado.

8. Métricas de Sucesso

Bot consegue tocar músicas sem quedas por longos períodos (8h+).

Tempo médio de resposta a um comando ≤ 3s.

99,5% uptime em VPS com PM2.

Capacidade de suportar 100+ usuários simultâneos em múltiplos servidores.