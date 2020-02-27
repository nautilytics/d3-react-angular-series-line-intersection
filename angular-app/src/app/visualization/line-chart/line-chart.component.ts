import { Component, OnInit, Input } from '@angular/core';
import { Intersection, Point2D, ShapeInfo } from "kld-intersections";
import { line as d3_line } from "d3-shape";
import { MarkerItem } from './marker/marker.component';

export interface LineChartItem {
  data: any[];
  markers: any[];
  xScale: any;
  yScale: any;
}

@Component({
  selector: '[app-line-chart]',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent implements OnInit {
  @Input() item: LineChartItem;
  markers: any[];
  line = d3_line()
    .x(d => this.item.xScale(d.x))
    .y(d => this.item.yScale(d.y));

  constructor() {
  }

  ngOnInit() {
    // Create a SVG path representing the line
    const linePath = ShapeInfo.path(this.line(this.item.data) || "M0 0 Z");

    // Find y intersection points for each item
    this.markers = this.item.markers.map(d => {

      // Create a straight line from top to bottom at the x position
      const x = this.item.xScale(d.x);
      const yAxisLine = ShapeInfo.line(
        new Point2D(x, this.item.yScale.range()[0]),
        new Point2D(x, this.item.yScale.range()[1])
      );
      const intersections = Intersection.intersect(linePath, yAxisLine);

      // Place the point at the intersection point (or the y-axis mid-point if no intersection is found)
      return {
        ...d,
        x: this.item.xScale(d.x),
        startingY: this.item.yScale.range()[0],
        y: intersections.points[0] ? intersections.points[0].y : this.item.yScale.range()[0] / 2,
      }
    });
  }

  getLinePath(): string {
    return this.line(this.item.data);
  }

  formatMarkerItem(item): MarkerItem {
    return {
      x: item.x,
      y: item.y,
      startingY: item.startingY
    }
  }
}
