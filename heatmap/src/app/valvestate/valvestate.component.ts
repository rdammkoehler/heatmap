import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {select, scaleLinear, extent, axisBottom, axisLeft, histogram, scaleBand, csv, max} from 'd3';


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
    const width = 500;
    const height = 50;
    const svg = select('.barchart').append('svg').attr('width', width).attr('height', height);
    const xScale = scaleBand().range([0, width]).padding(0.4);
    const yScale = scaleLinear().range([height + 20, 0]);
    const g = svg.append('g').attr('transform', 'translate(' + 25 + ',' + -20 + ')');
    csv('assets/valvestate.csv').then((data) => {
      xScale.domain(data.map((d) => d.index));
      // @ts-ignore
      yScale.domain([0, max(data, (d) => d.reading)]);
      // plot area
      // x axis
      g.append('g').attr('transform', 'translate(0,' + height + ')').call(axisBottom(xScale));
      // y axis
      // none (this is an on-off thing)
      // bars
      g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.index))
        .attr('width', xScale.bandwidth())
        .attr('y', (d) => yScale(d.reading))
        .attr('height', (d) => height - yScale(d.reading))
        .attr('fill', 'blue');
    });
  }
}
