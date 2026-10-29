import { Component } from '@angular/core';
import { GUILDS } from '../../content/guilds';

/**
 * The eight guilds (2026-10-29, the new identity): on the left the title, held in place while the register is read; on the right a parchment, "Registro das
 * guildas", with one row for each, the crest in a small frame, the name in Latin, a line on what it does and the trade in red.
 */
@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.html',
  styleUrl: './guilds.css',
})
export class Guilds {
  protected readonly guilds = GUILDS;
}
