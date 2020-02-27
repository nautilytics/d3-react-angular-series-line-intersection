import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AxesItem } from './axes/axes.component';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, range, min } from 'd3-array';
import * as moment from 'moment';
import { LineChartItem } from './line-chart/line-chart.component';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html'
})
export class VisualizationComponent implements OnInit {
  xScale = scaleTime();
  yScale = scaleLinear();
  width = 960;
  height = 500;
  margin = {
    left: 80,
    right: 80,
    bottom: 20,
    top: 20
  };
  data = [
    { y: 0, x: "2020-02-03T05:00:00.000Z" },
    { y: 3800, x: "2020-02-04T05:00:00.000Z" },
    { y: 4300, x: "2020-02-05T05:00:00.000Z" },
    { y: 6300, x: "2020-02-06T05:00:00.000Z" },
    { y: 9100, x: "2020-02-07T05:00:00.000Z" },
    { y: 10300, x: "2020-02-08T05:00:00.000Z" },
    { y: 11000, x: "2020-02-09T05:00:00.000Z" },
    { y: 12100, x: "2020-02-10T05:00:00.000Z" },
    { y: 13500, x: "2020-02-11T05:00:00.000Z" },
    { y: 14600, x: "2020-02-12T05:00:00.000Z" },
    { y: 16900, x: "2020-02-13T05:00:00.000Z" },
    { y: 18100, x: "2020-02-14T05:00:00.000Z" },
    { y: 19300, x: "2020-02-15T05:00:00.000Z" },
    { y: 20400, x: "2020-02-16T05:00:00.000Z" },
    { y: 24321.93, x: "2020-02-17T05:00:00.000Z" },
    { y: 29121.93, x: "2020-02-18T05:00:00.000Z" },
    { y: 29721.93, x: "2020-02-19T05:00:00.000Z" },
    { y: 30721.93, x: "2020-02-20T05:00:00.000Z" },
    { y: 31421.93, x: "2020-02-21T05:00:00.000Z" },
    { y: 32621.93, x: "2020-02-22T05:00:00.000Z" },
    { y: 33721.93, x: "2020-02-23T05:00:00.000Z" },
    { y: 35221.93, x: "2020-02-24T05:00:00.000Z" },
    { y: 35921.93, x: "2020-02-25T05:00:00.000Z" },
    { y: 36921.93, x: "2020-02-26T05:00:00.000Z" }
  ].map(d => ({ ...d, x: moment(d.x) }));
  markers = range(12).map((d, i) => {
    return {
      x: moment(min(this.data, d => d.x)).add(d * 2, 'days'),
      id: `marker-${i}`
    };
  });

  constructor(protected cdr: ChangeDetectorRef) {
  }

  get innerHeight(): number {
    return this.height - this.margin.top - this.margin.bottom;
  }

  get innerWidth(): number {
    return this.width - this.margin.left - this.margin.right;
  }

  ngOnInit(): void {
    this.setAxisScales();
  }

  setAxisScales() {
    // Set up an x- and y-scales
    this.xScale = this.xScale
      .range([0, this.innerWidth])
      .domain(extent(this.data, d => d.x));
    this.yScale = this.yScale
      .range([this.innerHeight, 0])
      .domain([0, max(this.data, d => d.y)]);
  }

  get gTransform(): string {
    return `translate(${this.margin.left},${this.margin.top})`;
  }

  formatAxes(): AxesItem {
    return {
      xScale: this.xScale,
      yScale: this.yScale,
      height: this.innerHeight
    };
  }

  formatLineChart(): LineChartItem {
    return {
      data: this.data,
      markers: this.markers,
      yScale: this.yScale,
      xScale: this.xScale
    };
  }
}
