# Kingdom Come: Deliverance II — RP Brasil (site)

Site do servidor **Kingdom Leon & Crow**: uma página só, minimalista, em preto, bege e vermelho (a paleta do painel do jogo).
Feito em **Angular 22** (componentes standalone, sem zone.js) e **pré-renderizado**: o build gera HTML pronto, que o Google
lê sem executar JavaScript e que dá para hospedar em qualquer lugar, sem servidor Node.

## Comandos

Precisa de Node **22.22.3 ou mais novo, ou 24.15+** (o Angular 22 exige). Na máquina do projeto está o Node 24.21.0 do nvm.

| Comando | O que faz |
| --- | --- |
| `npm install` | instala as dependências |
| `npm start` | abre o site em `http://localhost:4200`, recarregando ao salvar |
| `npm run build` | gera o site em `dist/kcd2-rp-brasil/browser` (é essa pasta que se publica) |
| `npm run build -- --base-href /kcd_2_ui/` | o mesmo, montado para o caminho do GitHub Pages (o que o workflow faz) |
| `npm test` | roda os testes (Vitest) |

O `build` e o `start` rodam antes dois verificadores: `scripts/seo-files.mjs` (escreve `robots.txt` e `sitemap.xml`) e
`scripts/check-assets.mjs` (**o build falha** se um texto aponta para uma imagem que não existe em `public/`).

## No ar

O site está em **https://mauroalvess.github.io/kcd_2_ui/** (GitHub Pages, HTTPS), publicado do repositório
`MauroAlvess/kcd_2_ui`. O código do repositório é privado; só o site é público.

- **Publicar uma mudança:** é só dar `git push` na branch `main`. O workflow *Publicar o site*
  (`.github/workflows/deploy.yml`) roda os testes, faz o build e publica, em uns 2 minutos. Dá para rodar à mão na aba
  *Actions* do repositório. Se um teste falhar, nada é publicado e o site continua como estava.
- **Endereço do site:** `"url"` em `src/site.config.json`. É dele que saem o link canônico, o `sitemap.xml`, a imagem de
  prévia do link no Discord/WhatsApp e o caminho para o qual o site é montado (`/kcd_2_ui/`).
- **Domínio próprio (quando tiver):** em *Settings → Pages → Custom domain* do repositório, ponha o domínio e crie no
  provedor do domínio um registro `CNAME` apontando para `mauroalvess.github.io`; depois troque o `"url"` para
  `"https://seudominio.com.br"` e dê push. O workflow passa a montar o site para `/` sozinho.
- **Convite do Discord permanente:** o convite atual (`"discord"` no mesmo arquivo) **expira em 13/11/2026**. No Discord:
  *Convidar pessoas → Editar link de convite → Expirar depois de: Nunca*, e troque o link no `site.config.json`.

As imagens são escritas com caminho relativo (`img/x.webp`, nunca `/img/x.webp`): assim o mesmo build funciona em
`/kcd_2_ui/` e na raiz de um domínio. O `check-assets` recusa um caminho que comece com `/img/`.

## Onde mexer

| Quero mudar | Onde |
| --- | --- |
| link do Discord, endereço, título e descrição do Google | `src/site.config.json` |
| palavras-chave | `KEYWORDS` em `src/app/core/site.ts` |
| itens do menu | `NAV` em `src/app/core/site.ts` |
| guildas, casas, passos, "mundo" | `src/app/content/*.ts` |
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

- `<html lang="pt-BR">`, um único `h1` (nome do servidor), um `h2` por seção, texto alternativo em todas as imagens.
- Título e descrição dentro dos limites do Google (testado); palavras-chave no `meta keywords` **e** escritas no texto da página.
- Cartões para Discord, WhatsApp e redes (Open Graph e Twitter) e dados estruturados `GameServer`, `Organization` e `WebSite`.
- Imagens em WebP em dois tamanhos, fontes próprias (sem Google Fonts) e a foto do topo pré-carregada.
- Depois de publicar: cadastre o site no [Google Search Console](https://search.google.com/search-console) (propriedade
  do tipo *Prefixo do URL*: `https://mauroalvess.github.io/kcd_2_ui/`) e envie o
  `https://mauroalvess.github.io/kcd_2_ui/sitemap.xml`. Sob um caminho o `robots.txt` não é lido pelos buscadores; o
  sitemap entregue no Search Console cumpre o papel dele.

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
