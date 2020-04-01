import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {select, scaleLinear, extent} from 'd3';

@Component({
  selector: 'app-valvestate',
  templateUrl: './valvestate.component.html',
  styleUrls: ['./valvestate.component.scss']
})
export class ValvestateComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.drawChart();
  }

  drawChart(): void {

  }
}
