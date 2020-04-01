import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ValvestateComponent } from './valvestate/valvestate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeatmapComponent,
    ValvestateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
