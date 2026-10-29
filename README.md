# Kingdom Come: Deliverance II — RP Brasil (site)

Site do servidor **Kingdom RP BRASIL**: uma página só, com a **identidade nova** (2026-10-29, o pacote "Landing page" do dono): preto quente
(`#110e0a`), osso para o texto, ouro (`#d5a156`) para o que é dourado, o vermelho da Casa do Leão e o pergaminho dos painéis, com o brasão dourado
"Roleplay Brasileiro". Títulos em Libre Caslon Display com a palavra em itálico dourado, botões em Spectral SC, rótulos em Cinzel e texto em EB
Garamond (todas hospedadas junto do site, pelo `@fontsource`). Abre com a emboscada na estrada (`img/hero-*.webp`), a frase "O rei morreu. A coroa
está vaga." e um pergaminho, **"Escolha seu destino"**, com o servidor, quem está online, os três passos e os dois botões; segue com o reino (quatro
linhas que se revezam com uma foto cada enquanto a página fica parada, e duas fotos), as duas casas (Leão ou Corvo), as guildas (o registro em
pergaminho com os oito brasões), a hierarquia (a escada de sete degraus e todos os títulos dobrados), a história (o mapa e a crônica em sete linhas,
com a crônica inteira dobrada) e o chamado final. Sem scripts, ou para quem pediu menos movimento, as quatro linhas do reino aparecem uma sob a outra.
As imagens saem de `tools/make-landing-images.py` (rode com a pasta `assets` do zip extraído).
Na abertura há duas ações: "Entrar no Discord" e "Baixar launcher" (o endereço está em `launcher` no `src/site.config.json`: a última versão do launcher, qualquer que seja).
Feito em **Angular 22** (componentes standalone, sem zone.js) e **pré-renderizado**: o build gera HTML pronto, que o Google
lê sem executar JavaScript e que dá para hospedar em qualquer lugar, sem servidor Node.

## Comandos

Precisa de Node **22.22.3 ou mais novo, ou 24.15+** (o Angular 22 exige). Na máquina do projeto está o Node 24.21.0 do nvm.

| Comando                                   | O que faz                                                                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `npm install`                             | instala as dependências                                                                                          |
| `npm start`                               | abre o site em `http://localhost:4200`, recarregando ao salvar                                                   |
| `npm run build`                           | gera o site em `dist/kcd2-rp-brasil/browser` (é essa pasta que se publica)                                       |
| `npm run build -- --base-href /kcd_2_ui/` | o mesmo, montado para um caminho (só para testar o endereço antigo do GitHub Pages; o domínio próprio é na raiz) |
| `npm test`                                | roda os testes (Vitest)                                                                                          |

O `build` e o `start` rodam antes dois verificadores: `scripts/seo-files.mjs` (escreve `robots.txt` e `sitemap.xml`) e
`scripts/check-assets.mjs` (**o build falha** se um texto aponta para uma imagem que não existe em `public/`).

## No ar

O site está em **https://kingdomrpbrasil.com.br/** (GitHub Pages, HTTPS), publicado do repositório
`MauroAlvess/kcd_2_ui`. O código do repositório é privado; só o site é público. O endereço antigo,
`mauroalvess.github.io/kcd_2_ui`, o GitHub redireciona para o domínio.

- **Publicar uma mudança:** é só dar `git push` na branch `main`. O workflow _Publicar o site_
  (`.github/workflows/deploy.yml`) roda os testes, faz o build e publica, em uns 2 minutos. Dá para rodar à mão na aba
  _Actions_ do repositório. Se um teste falhar, nada é publicado e o site continua como estava.
- **Endereço do site:** `"url"` em `src/site.config.json`. É dele que saem o link canônico, o `sitemap.xml`, a imagem de
  prévia do link no Discord/WhatsApp e o caminho para o qual o site é montado (`/` no domínio próprio; um endereço com
  caminho, como `https://mauroalvess.github.io/kcd_2_ui`, monta o site para `/kcd_2_ui/`).
- **Domínio próprio (já em uso: `kingdomrpbrasil.com.br`):** em _Settings → Pages → Custom domain_ do repositório está o
  domínio, e no provedor há o registro `CNAME` (`www`) e os registros `A` do GitHub para a raiz. **O `"url"` do
  `site.config.json` tem de ser o mesmo endereço**: com o domínio no ar e o `"url"` ainda sob `/kcd_2_ui`, o site é
  montado para um caminho que não existe e as imagens e o CSS dão 404 (foi o que aconteceu no primeiro dia). Para trocar de
  domínio: troque aqui e em _Custom domain_, e dê push.
- **Convite do Discord:** `"discord"` no mesmo arquivo (o convite de 2026-10-15 é `https://discord.gg/p2wpuaGC3F`). Se o
  convite tiver prazo, o botão do site passa a levar a um link morto: no Discord, _Convidar pessoas → Editar link de convite →
  Expirar depois de: Nunca_, e troque o link no `site.config.json`.

As imagens são escritas com caminho relativo (`img/x.webp`, nunca `/img/x.webp`): assim o mesmo build funciona em
`/kcd_2_ui/` e na raiz de um domínio. O `check-assets` recusa um caminho que comece com `/img/`.

## Onde mexer

| Quero mudar                                                                                                                                    | Onde                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| nome, link do Discord, endereço, título e descrição do Google, códigos do Search Console e do Bing, id do servidor na lista (jogadores online) | `src/site.config.json`                                                                 |
| palavras-chave                                                                                                                                 | `KEYWORDS` em `src/app/core/site.ts`                                                   |
| itens do menu                                                                                                                                  | `NAV` em `src/app/core/site.ts`                                                        |
| as quatro linhas e as três fotos do reino, as guildas, os passos para entrar e os títulos da hierarquia                                         | `src/app/content/*.ts`                                                                 |
| textos da lore                                                                                                                                 | `src/app/content/lore.ts` (o título e a frase de abertura em `src/app/sections/lore/`) |
| a frase do topo e os textos de cada capítulo (título, frase de abertura, numeral)                                                              | o `.html` de cada seção em `src/app/sections/`                                         |
| cores, fontes, espaçamentos                                                                                                                    | `:root` em `src/styles.css`                                                            |

## Como está organizado

```
src/app/
  app.*                 a página: cabeçalho, a abertura, os 5 capítulos em ordem, rodapé
  core/                 site.ts (configuração, menu, palavras-chave) e seo.ts (título, metas, dados estruturados)
  layout/               header (fixo; transparente sobre o banner, sólido ao rolar; menu móvel abaixo de 52rem) e footer
  sections/             uma pasta por seção: hero, pitch (o reino), guilds, hierarchy, lore, join
  shared/ui/            peças reutilizáveis: button, section (a faixa preta, com foto ou cantos), reveal (aparecer ao rolar), section-heading (rótulo, título,
                        introdução), steps, icon (os desenhos de linha, no traço do painel do jogo: `icons.ts`
                        guarda todos; hoje só os botões os usam), rich (negrito da lore), server-badge (jogadores online), scroll-hint (a seta no canto) e
                        curtain (a entrada: quatro montes de nuvens fecham a tela e abrem para os quatro cantos, 2,7 s; sem
                        movimento reduzido nem scripts não há cortina; as duas molduras vêm de `tools/make-images.py`)
  content/              os textos em listas tipadas, separados do layout
public/                 imagens (img/), ícones, site.webmanifest, og-image-4.jpg
tools/                  scripts que preparam as imagens (abaixo) e `make-icon-sheet.mjs`, que mostra todos os ícones
                        juntos (`node tools/make-icon-sheet.mjs folha.html`, Node 24) antes de um novo entrar numa página
```

Cada seção é um componente próprio, sem depender das outras; o `<app-section>` passa `--fg`, `--fg-muted`, `--rule` e `--accent`
para o que está dentro. A página joga com dois tons (2026-10-29, o dono: "não gostei do bege, podemos fazer uma jogada de cores melhor para deixar tudo mais bonito, e usar nossas imagens de uma forma melhor"; o bege chapado e o preto de antes saíram): `<app-section tone="paper">` é a tela F2 refeita (o bege, a foto do painel impressa de leve por multiplicação, o grão, a luz do canto e as bordas escurecidas, a corda trançada no topo, tinta nas palavras, vermelho nos rótulos) e `tone="night"` é o azul-noite do banner (`--night`), com palavras em osso e rótulos em ouro, que pode levar uma foto sob uma tinta azul (`image` com `tint`). Papel: o reino e a hierarquia; noite: as guildas (floresta), a história (pátio do torneio) e a entrada; no meio, a faixa das duas casas, vermelha à esquerda (o Leão) e azul à direita (o Corvo), com os cavaleiros da folha `hero.png` do dono, cada um em pé na sua cor. Duas faixas têm um enfeite do painel do jogo, encostado no canto, sem margem (`<app-section corner="lion|raven">`), como uma moldura que
abre depois da abertura e fecha antes do Discord (2026-10-28, o dono: "na segunda seção a imagem de borda era só a da esquerda e na
última, antes do entrar no Discord, só a da direita inteira, dando essa sensação"): o leão em cima à esquerda no Reino (a primeira faixa depois da abertura) e o corvo
embaixo à direita na História (o respiro da faixa é mais alto que eles, então nenhuma palavra fica por baixo). A de Entrar, sobre a imagem "entre aqui",
fecha a página. Quase nada se move (2026-10-26, o dono: "eu gosto do minimalismo"): a descida suave entre as
faixas, o fio bordado, as nuvens nos cantos, a névoa do mapa e as fotos entre capítulos foram tentados e tirados. A única coisa que
acontece com a rolagem é pedida pelo dono ("à medida que vá rolando para baixo vai aparecendo as informações"): o que ainda está abaixo
da tela quando a página abre fica retido e aparece, uma vez, quando o leitor chega nele (sobe uns 1,25 rem e sai do nada em 0,9 s; os
blocos de uma fileira vêm um instante depois do primeiro). É a diretiva `appReveal` (`shared/ui/reveal`; o visual está em
`styles.css`, `.reveal-wait` e `.reveal-in`): a página escrita está completa (pré-renderizada, e sem scripts), nada é retido antes de o
navegador montá-la, o que já está na tela ou acima dela (um link para `#lore`, uma recarga no meio) fica como está, e quem pediu menos
movimento, ou tem um navegador sem `IntersectionObserver`, vê a página como está escrita.

## Imagens

As originais ficam na pasta `img` ao lado deste projeto (`../img`). Elas são grandes demais para a web, então:

```
python tools/make-images.py      # gera public/img/*.webp (e os ícones) a partir de ../img, nos tamanhos de uso
python tools/make-og-image.py    # gera public/og-image-4.jpg (o banner e o endereço), o cartão que aparece quando o link é colado no Discord
```

Precisam de Python com Pillow (`pip install pillow`); o do cartão, de Edge ou Chrome instalado.

- **O banner** (`../img/banner.png`, 1920 x 1080, 2026-10-28) abre a página inteiro, no seu formato, e as palavras sobem sobre o pé dele,
  que o próprio banner desfaz num azul-marinho (`#00062f`): um degradê no pé dele (`.media::after` em `hero.css`) o leva ao preto, e o preto acaba contra o bege da primeira seção. Num celular o letreiro dele ficaria pequeno demais, então ali ele é cortado ao meio (o brasão, o falcão e o leão, 3 : 5) e o nome do
  servidor aparece escrito embaixo. O `h1` é texto (escondido nas telas largas, onde o banner já o traz). **As cores do site NÃO saem dele**
  (2026-10-28, o dono: "não é porque o hero é azul que tudo precisa ser azul; podemos usar o nosso padrão de cores e identidade visual"): são
  as do painel do jogo e as do banner, em `:root` de `src/styles.css`: `--beige #d2b38c` (o papel do painel) e `--ink #201b17` (a tinta), `--red #7c0305` e `--red-hi #98090c` (os
  botões e os rótulos no papel), `--night #060b26` (o azul-noite do pé do banner), `--paper #ece6da` (o osso dos textos na noite) e `--gold #d5a156` (os rótulos e os filetes nela).
- **As imagens do vestido novo** (2026-10-29, todas feitas pelo `make-images.py` a partir da pasta `img` do dono): `paper-photo` (a foto "background hud H" clareada a uma
  impressão leve, para o papel), `rope` (a corda trançada, de "borda superior trançada card"), `knight-lion` e `knight-raven` (os dois cavaleiros de `hero.png`, recortados da
  folha), `forest` ("background caça") e `yard` ("new hero"), as duas últimas sob uma tinta azul. O grão do papel é um SVG dentro do próprio CSS (`section.css`).
- **As três fotos do reino** (`shot-taverna`, `shot-duelo`, `shot-vila`) são capturas do próprio servidor, da pasta `fotos` ao lado do projeto;
  o `make-images.py` as corta em 720 e 1200 px. Num celular as três passam a uma fileira que se desliza de lado.
- O vídeo do topo, o mapa das casas, o cartaz das regras, os dois cavaleiros, as fotos sob o papel dos cartões, o letreiro "titulo site", o
  brasão do apoiador e os brasões da árvore da família, das posses, do cavalo, da carroça e do cachorro (as seções Família e Posses) saíram
  da página (e dos scripts); as originais continuam na pasta `img` e no histórico do git.

## Jogadores online

O contador _"N jogadores online agora de M vagas"_ (no topo da página e no cartão de boas-vindas) lê a **lista pública de
servidores do MafiaHub**, a mesma do navegador de servidores do jogo (`https://masterlist.mafiahub.dev/servers`, que aceita
ser lida por qualquer página). O servidor é achado pelo **id do cadastro** (`"listing" → "id"` em `src/site.config.json`, o
mesmo da página do servidor em mafiahub.dev), **nunca pelo endereço**: o site não sabe onde o servidor está, e um teste
garante que nenhum IP aparece na página nem na configuração.

- A página pronta (a que o Google lê) não traz números. O navegador pergunta quando a página termina de desenhar e depois a
  cada 45 segundos, só enquanto a aba está à vista (`src/app/core/server-status.ts`). Se a lista não responde, o contador
  guarda o último número por 5 minutos e depois some; o lugar dele fica reservado, então nada pula na tela.
- **"Vagas"** é o `max_players` do servidor (512 hoje). Quantos jogadores já entraram, no total, não está na lista: mostrar
  isso pede um endereço HTTPS no próprio servidor (uma página HTTPS não pode ler um endereço `http://`).
- Servidor fora do ar: a lista esquece um servidor uns 2 minutos depois do último sinal dele, e o contador passa a dizer
  _"Servidor fora do ar no momento"_.
- Para quem visita: o navegador faz um pedido ao `masterlist.mafiahub.dev` (um serviço de terceiros), além do pedido ao site.
- Se o servidor for cadastrado de novo no MafiaHub, o id muda: troque em `site.config.json`. **Id vazio desliga o contador.**

## SEO

O nome é **Kingdom RP BRASIL** (o nome anterior foi trocado em 2026-10-15; não deve sobrar rastro dele em lugar nenhum, e há
testes para isso). A frase que se quer ser achado por ela é **"kingdom come deliverance 2 rp brasil"**, e a página a diz
nos lugares que um buscador lê primeiro:

- `<title>`: `Kingdom Come: Deliverance 2 RP Brasil | Kingdom RP BRASIL` (57 caracteres, a frase no começo e a marca no fim);
  descrição de até 160 caracteres que também começa pela frase. Os dois vêm de `src/site.config.json` e os testes conferem o
  tamanho e o começo.
- O `h1` diz "Kingdom Come: Deliverance II RP Brasil" (o nome oficial do jogo) e o texto logo abaixo diz "KCD 2 (Deliverance 2)":
  quem digita "2" e quem digita "II" acha a mesma página. `KEYWORDS` e `ALTERNATE_NAMES` (em `src/app/core/site.ts`) trazem as
  duas grafias; o Google ignora o `meta keywords`, mas outros buscadores ainda o leem.
- `<html lang="pt-BR">`, um único `h1`, um `h2` por seção, texto alternativo em todas as imagens, `canonical` e `hreflang`.
- Cartões para Discord, WhatsApp e redes (Open Graph e Twitter, com a imagem `og-image-4.jpg` de 1200x630: o banner e o endereço) e dados
  estruturados `GameServer`, `Organization`, `WebSite` e `WebPage`, os três primeiros com **o mesmo nome**, para o Google
  mostrar "Kingdom RP BRASIL" como nome do site.
- O lema do servidor (_"O rei morreu. A coroa de Kuttenberg está vaga."_) como `slogan` do `GameServer` e da
  `Organization`; um `site.webmanifest` com os ícones de 192 e 512 px (o site salvo na tela do celular); o `sitemap.xml` com
  as imagens principais (cartão e banner), para a busca de imagens.
- Imagens em WebP em dois tamanhos, fontes próprias (sem Google Fonts) e o banner do topo pré-carregado.

**Ninguém consegue garantir a posição no Google**: ela depende de o Google ter lido o site (isso se pede, abaixo), da idade do
domínio e de quantos outros sites apontam para ele. O que dá para fazer, e o que já está feito:

1. Cadastrar o site no [Google Search Console](https://search.google.com/search-console). Propriedade do tipo _Domínio_
   (`kingdomrpbrasil.com.br`): o Google dá um registro `TXT` para pôr no DNS, sem mexer no site. Ou do tipo _Prefixo do URL_
   (`https://kingdomrpbrasil.com.br/`): o Google dá uma tag `<meta name="google-site-verification" content="CÓDIGO">`; ponha só
   o CÓDIGO em `"verification" → "google"` no `site.config.json`, publique, e clique em Verificar. O Bing tem o mesmo (Bing
   Webmaster Tools, `"verification" → "bing"`).
2. Em _Sitemaps_, enviar `https://kingdomrpbrasil.com.br/sitemap.xml` (o `robots.txt` já o anuncia). Em _Inspeção de URL_,
   colar `https://kingdomrpbrasil.com.br/` e clicar em _Solicitar indexação_.
3. Links vindos de fora: o site no campo de endereço da lista de servidores do MafiaHub, no Discord (descrição e canal de
   boas-vindas), em posts do KCD 2 no Reddit/Steam/grupos brasileiros. Quanto mais sites sérios apontam para o domínio, mais
   alto ele sobe, e é a parte que mais pesa.
4. Daí em diante é esperar: o primeiro rastreio leva de dias a poucas semanas. Para ver como está: no Google, `site:kingdomrpbrasil.com.br`.

## Outra hospedagem

O GitHub Pages já publica o site (acima). Para hospedar em outro lugar, publique o conteúdo de
`dist/kcd2-rp-brasil/browser`, com o `"url"` apontando para o novo endereço. Num nginx, por exemplo:

```nginx
server {
    server_name seudominio.com.br;
    root /var/www/kcd2-rp-brasil;
    index index.html;

    # arquivos com hash no nome (js, css, fontes) nunca mudam
    location ~* \.(js|css|woff2?)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
    location /img/ { add_header Cache-Control "public, max-age=2592000"; }
    location = /index.html { add_header Cache-Control "no-cache"; }
}
```
