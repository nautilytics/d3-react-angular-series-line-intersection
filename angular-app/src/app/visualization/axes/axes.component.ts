import { Component, ElementRef, Input, NgZone, OnChanges, OnInit, ViewChild } from '@angular/core';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';

export interface AxesItem {
  xScale: any;
  yScale: any;
  height: number;
}

@Component({
  selector: '[app-axes]',
  templateUrl: './axes.component.html'
})
export class AxesComponent implements OnInit, OnChanges {
  @Input() item: AxesItem;
  @ViewChild('xAxisEl', { static: true }) xAxisEl: ElementRef;
  @ViewChild('yAxisEl', { static: true }) yAxisEl: ElementRef;

  constructor(private zone: NgZone) {
  }

  renderXAxis(): void {
    const xAxis = select(this.xAxisEl.nativeElement);

    this.zone.runOutsideAngular(() => {
      xAxis
        .call(axisBottom(this.item.xScale));
    });
  }

  renderYAxis(): void {
    const yAxis = select(this.yAxisEl.nativeElement);

    this.zone.runOutsideAngular(() => {
      yAxis.call(
        axisLeft(this.item.yScale)
          .tickFormat(format('$,.0f')),
      );

      yAxis.select('.domain').remove();
      yAxis.selectAll('.tick line').remove();
    });
  }

  renderAxes(): void {
    this.renderXAxis();
    this.renderYAxis();
  }

  ngOnChanges() {
    this.renderAxes();
  }

  ngOnInit() {
    this.renderAxes();
  }

  get xAxisTransform(): string {
    return `translate(0, ${this.item.height})`;
  }
}
