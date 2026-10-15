import { Component, afterNextRender, computed, inject } from '@angular/core';
import { LiveStatus } from '../../../core/server-status';

const format = (value: number) => value.toLocaleString('pt-BR');

/**
 * How many players are in the game now and how many places the server has, in one small line. It says nothing until the
 * master list has answered (and again if it stops answering), and it keeps its room meanwhile, so the page does not
 * jump when the numbers arrive.
 */
@Component({
  selector: 'app-server-badge',
  templateUrl: './server-badge.html',
  styleUrl: './server-badge.css',
})
export class ServerBadge {
  private readonly live = inject(LiveStatus);

  protected readonly status = this.live.status;
  protected readonly players = computed(() => format(this.status().players));
  protected readonly max = computed(() => format(this.status().max));

  constructor() {
    afterNextRender(() => this.live.start());
  }
}
