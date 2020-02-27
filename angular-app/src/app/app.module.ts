import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { AxesComponent } from './visualization/axes/axes.component';
import { LineChartComponent } from './visualization/line-chart/line-chart.component';
import { MarkerComponent } from './visualization/line-chart/marker/marker.component';
import { SvgTransitionDirective } from '../directives/svg-transition.directive';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent,
    AxesComponent,
    LineChartComponent,
    SvgTransitionDirective,
    MarkerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
