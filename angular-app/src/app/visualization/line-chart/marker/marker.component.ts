import { Component, Input } from '@angular/core';
import { DURATION } from '../../../../lib/constant';

export interface MarkerItem {
  x: number,
  y: number,
  startingY: number
}

@Component({
  selector: '[app-marker]',
  templateUrl: './marker.component.html'
})
export class MarkerComponent {
  @Input() item: MarkerItem;
  protected transition = t => t.duration(DURATION);
}
