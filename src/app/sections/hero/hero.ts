import { Component } from '@angular/core';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';
import { ServerBadge } from '../../shared/ui/server-badge/server-badge';

/**
 * The top of the page: the game's own view of a duel in the tourney yard (the picture the user calls "new hero", 2026-10-25: "coloque
 * essa imagem no lugar da atual na hero inicial"), across the whole window, darkened on the left and at the foot where the words
 * stand. In front: the server's name as the page's only h1, drawn as the lettering the user made ("titulo site", gold and bone), the
 * line that tells the story in one breath, and the two things to do, the Discord and the launcher. On a narrow screen the picture is a
 * band across the top and the words stand under it.
 *
 * It was the tower on its rock until 2026-10-25 ("background hud H"), and a video of Kuttenberg until 2026-10-20 ("o vídeo não vai
 * dar pelo visto"): a video has its own shape, and the opening was as tall as the window.
 */
@Component({
  selector: 'app-hero',
  imports: [Button, ServerBadge],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE;
}
