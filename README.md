# Kingdom Come: Deliverance II — RP Brasil (site)

Site do servidor **Kingdom RP BRASIL**: uma página só, minimalista, em preto, bege e vermelho (a paleta do painel do jogo).
Feito em **Angular 22** (componentes standalone, sem zone.js) e **pré-renderizado**: o build gera HTML pronto, que o Google
lê sem executar JavaScript e que dá para hospedar em qualquer lugar, sem servidor Node.

## Comandos

Precisa de Node **22.22.3 ou mais novo, ou 24.15+** (o Angular 22 exige). Na máquina do projeto está o Node 24.21.0 do nvm.

| Comando | O que faz |
| --- | --- |
| `npm install` | instala as dependências |
| `npm start` | abre o site em `http://localhost:4200`, recarregando ao salvar |
| `npm run build` | gera o site em `dist/kcd2-rp-brasil/browser` (é essa pasta que se publica) |
| `npm run build -- --base-href /kcd_2_ui/` | o mesmo, montado para um caminho (só para testar o endereço antigo do GitHub Pages; o domínio próprio é na raiz) |
| `npm test` | roda os testes (Vitest) |

O `build` e o `start` rodam antes dois verificadores: `scripts/seo-files.mjs` (escreve `robots.txt` e `sitemap.xml`) e
`scripts/check-assets.mjs` (**o build falha** se um texto aponta para uma imagem que não existe em `public/`).

## No ar

O site está em **https://kingdomrpbrasil.com.br/** (GitHub Pages, HTTPS), publicado do repositório
`MauroAlvess/kcd_2_ui`. O código do repositório é privado; só o site é público. O endereço antigo,
`mauroalvess.github.io/kcd_2_ui`, o GitHub redireciona para o domínio.

- **Publicar uma mudança:** é só dar `git push` na branch `main`. O workflow *Publicar o site*
  (`.github/workflows/deploy.yml`) roda os testes, faz o build e publica, em uns 2 minutos. Dá para rodar à mão na aba
  *Actions* do repositório. Se um teste falhar, nada é publicado e o site continua como estava.
- **Endereço do site:** `"url"` em `src/site.config.json`. É dele que saem o link canônico, o `sitemap.xml`, a imagem de
  prévia do link no Discord/WhatsApp e o caminho para o qual o site é montado (`/` no domínio próprio; um endereço com
  caminho, como `https://mauroalvess.github.io/kcd_2_ui`, monta o site para `/kcd_2_ui/`).
- **Domínio próprio (já em uso: `kingdomrpbrasil.com.br`):** em *Settings → Pages → Custom domain* do repositório está o
  domínio, e no provedor há o registro `CNAME` (`www`) e os registros `A` do GitHub para a raiz. **O `"url"` do
  `site.config.json` tem de ser o mesmo endereço**: com o domínio no ar e o `"url"` ainda sob `/kcd_2_ui`, o site é
  montado para um caminho que não existe e as imagens e o CSS dão 404 (foi o que aconteceu no primeiro dia). Para trocar de
  domínio: troque aqui e em *Custom domain*, e dê push.
- **Convite do Discord:** `"discord"` no mesmo arquivo (o convite de 2026-10-15 é `https://discord.gg/p2wpuaGC3F`). Se o
  convite tiver prazo, o botão do site passa a levar a um link morto: no Discord, *Convidar pessoas → Editar link de convite →
  Expirar depois de: Nunca*, e troque o link no `site.config.json`.

As imagens são escritas com caminho relativo (`img/x.webp`, nunca `/img/x.webp`): assim o mesmo build funciona em
`/kcd_2_ui/` e na raiz de um domínio. O `check-assets` recusa um caminho que comece com `/img/`.

## Onde mexer

| Quero mudar | Onde |
| --- | --- |
| nome, link do Discord, endereço, título e descrição do Google, códigos do Search Console e do Bing | `src/site.config.json` |
| palavras-chave | `KEYWORDS` em `src/app/core/site.ts` |
| itens do menu | `NAV` em `src/app/core/site.ts` |
| guildas, casas, passos, "mundo", bens (casas, cavalos e cães) | `src/app/content/*.ts` |
| textos da lore | `src/app/sections/lore/lore.html` e `src/app/content/lore.ts` |
| cores, fontes, espaçamentos | `:root` em `src/styles.css` |

## Como está organizado

```
src/app/
  app.*                 a página: cabeçalho, 8 seções em ordem, rodapé
  core/                 site.ts (configuração, menu, palavras-chave) e seo.ts (título, metas, dados estruturados)
  layout/               header (menu fixo, com menu móvel) e footer
  sections/             uma pasta por seção: hero, guilds, family, factions, ascension, lore, world, join
  shared/ui/            peças reutilizáveis: button, section (tom claro/escuro, foto de fundo), section-heading, steps
  content/              os textos em listas tipadas, separados do layout
public/                 imagens (img/), ícones, og-image.jpg
tools/                  scripts que preparam as imagens (abaixo)
```

Cada seção é um componente próprio, sem depender das outras; o tom claro ou escuro vem do `<app-section>`, que passa
`--fg`, `--fg-muted`, `--rule` e `--accent` para o que está dentro, então um componente funciona nos dois fundos.

## Imagens

As originais ficam na pasta `img` ao lado deste projeto (`../img`). Elas são grandes demais para a web, então:

```
python tools/make-images.py      # gera public/img/*.webp (e os ícones) a partir de ../img, nos tamanhos de uso
python tools/make-og-image.py    # gera public/og-image.jpg, o cartão que aparece quando o link é colado no Discord
```

Precisam de Python com Pillow (`pip install pillow`); o segundo também de Edge ou Chrome instalado. O `banner.png` (o duelo
dos cavaleiros) não está mais na página; ele vem com o xadrez de "fundo transparente" desenhado nos pixels, e o script sabe
removê-lo (`knock_out_checkerboard`): a linha que o traz de volta está comentada em `CUTOUTS`, em `tools/make-images.py`.

## SEO

O nome é **Kingdom RP BRASIL** (era "Kingdom Leon & Crow" até 2026-10-15; não deve sobrar rastro dele em lugar nenhum, e há
testes para isso). A frase que se quer ser achado por ela é **"kingdom come deliverance 2 rp brasil"**, e a página a diz
nos lugares que um buscador lê primeiro:

- `<title>`: `Kingdom Come: Deliverance 2 RP Brasil | Kingdom RP BRASIL` (57 caracteres, a frase no começo e a marca no fim);
  descrição de até 160 caracteres que também começa pela frase. Os dois vêm de `src/site.config.json` e os testes conferem o
  tamanho e o começo.
- O `h1` diz "Kingdom Come: Deliverance II RP Brasil" (o nome oficial do jogo) e o texto logo abaixo diz "KCD 2 (Deliverance 2)":
  quem digita "2" e quem digita "II" acha a mesma página. `KEYWORDS` e `ALTERNATE_NAMES` (em `src/app/core/site.ts`) trazem as
  duas grafias; o Google ignora o `meta keywords`, mas outros buscadores ainda o leem.
- `<html lang="pt-BR">`, um único `h1`, um `h2` por seção, texto alternativo em todas as imagens, `canonical` e `hreflang`.
- Cartões para Discord, WhatsApp e redes (Open Graph e Twitter, com a imagem `og-image.jpg` de 1200x630) e dados
  estruturados `GameServer`, `Organization`, `WebSite` e `WebPage`, os três primeiros com **o mesmo nome**, para o Google
  mostrar "Kingdom RP BRASIL" como nome do site.
- Imagens em WebP em dois tamanhos, fontes próprias (sem Google Fonts) e a foto do topo pré-carregada.

**Ninguém consegue garantir a posição no Google**: ela depende de o Google ter lido o site (isso se pede, abaixo), da idade do
domínio e de quantos outros sites apontam para ele. O que dá para fazer, e o que já está feito:

1. Cadastrar o site no [Google Search Console](https://search.google.com/search-console). Propriedade do tipo *Domínio*
   (`kingdomrpbrasil.com.br`): o Google dá um registro `TXT` para pôr no DNS, sem mexer no site. Ou do tipo *Prefixo do URL*
   (`https://kingdomrpbrasil.com.br/`): o Google dá uma tag `<meta name="google-site-verification" content="CÓDIGO">`; ponha só
   o CÓDIGO em `"verification" → "google"` no `site.config.json`, publique, e clique em Verificar. O Bing tem o mesmo (Bing
   Webmaster Tools, `"verification" → "bing"`).
2. Em *Sitemaps*, enviar `https://kingdomrpbrasil.com.br/sitemap.xml` (o `robots.txt` já o anuncia). Em *Inspeção de URL*,
   colar `https://kingdomrpbrasil.com.br/` e clicar em *Solicitar indexação*.
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
