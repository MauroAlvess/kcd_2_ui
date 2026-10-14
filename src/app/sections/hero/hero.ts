import { Component } from '@angular/core';
import { SITE } from '../../core/site';
import { Button } from '../../shared/ui/button/button';

/**
 * The top of the page: the server's name as the page's only h1, what it is in one line, and the two things to do next. The
 * town square is the photograph that carries it, under a dark gradient; it is the largest image on the page, so it is the
 * one that loads first (`priority`).
 */
@Component({
  selector: 'app-hero',
  imports: [Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly site = SITE;
}
