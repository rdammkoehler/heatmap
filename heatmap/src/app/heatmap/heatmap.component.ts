import {Component, Input, OnInit} from '@angular/core';
import {select} from 'd3-selection';
import {map} from 'd3-collection';
import {axisBottom, axisLeft, csv, mouse, scaleBand} from 'd3';
import {interpolateYlGn} from 'd3-scale-chromatic';


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  @Input()
  dataUrl = 'assets/heatmap_data.csv';
  // @Input()
  // reloadRate: number; // how often should the component load (in seconds)
  @Input()
  targetTemp: number = 75;
  @Input()
  targetRange: number = 0.15;
  @Input()
  colorShift: number = 5;
  @Input()
  granularity: number = 10;
  @Input()
  margin = {top: 0, right: 0, bottom: 30, left: 40};
  @Input()
  width: number = 450 - this.margin.left - this.margin.right;
  @Input()
  height: number = 450 - this.margin.top - this.margin.bottom;
  @Input()
  alertColor: string = 'red';

  constructor() {
  }

  ngOnInit(): void {
    // gotta be a slicker way to do this
    this.targetRange = Number(this.targetRange);
    this.targetTemp = Number(this.targetTemp);
    this.colorShift = Number(this.colorShift);
    this.granularity = Number(this.granularity);
    this.width = Number(this.width);
    this.height = Number(this.height);
    this.drawChart();
    console.log(this.colorShift, this.dataUrl, this.granularity, this.targetRange, this.targetTemp);
  }

  private drawChart() {
    const svg = select('#heatmap')
      .select('.map')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
    csv(this.dataUrl).then((data) => {
      // @ts-ignore
      const x = scaleBand().range([0, this.width]).padding(0.05).domain(map(data, (d) => d.col).keys());
      // @ts-ignore
      const y = scaleBand().range([this.height, 0]).padding(0.05).domain(map(data, (d) => d.row).keys());
      // x axis
      svg.append('g')
        .style('font-size', 15)
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(axisBottom(x).tickSize(0))
        .select('.domain').remove();
      // y axis
      svg.append('g')
        .style('font-size', 15)
        .call(axisLeft(y).tickSize(0))
        .select('.domain').remove();
      // cells
      const cell = svg.selectAll()
        .data(data, (d) => {
          return d.row + ':' + d.col;
        })
        .enter()
        .append('g');
      cell.append('rect')
        .attr('x', (d) => x(d.col))
        .attr('y', (d) => y(d.row))
        .attr('rx', 4)
        .attr('ry', 4)
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', (d) => this.color(d.temp))
        .style('stroke-width', 4)
        .style('stroke', 'none')
        .style('opacity', '0.8')
        .on('mouseover', mouseOver)
        .on('mousemove', mouseMove)
        .on('mouseleave', mouseLeave);
      cell.append('text')
        .attr('x', (d) => x(d.col) + (x.bandwidth() / 3))
        .attr('y', (d) => y(d.row) + (y.bandwidth() / 2))
        .attr('text-anchor', 'left')
        .attr('font-size', (y.bandwidth() / 2) + 'px')
        .attr('font-family', 'Courier')
        .text((d) => d.temp);
    });

    function mouseOver(_) {
      select('.tooltip').style('opacity', 1);
      select(this).style('stroke', 'black').style('opacity', 1);
    }

    function mouseMove(cell) {
      select('.tooltip').html('The exact value of<br>this cell is: ' + cell.temp)
        .style('left', mouse(this)[0] + 70 + 'px')
        .style('top', mouse(this)[1] + 'px');
    }

    function mouseLeave(_) {
      select('.tooltip').style('opacity', 0);
      select(this).style('stroke', 'none').style('opacity', 0.8);
    }

  }

  color(temp) {
    const target = this.targetTemp;
    const range = this.targetRange;
    if (temp > (target * (1 + range))
      || temp < (target * (1 - range))) {
      return this.alertColor;
    }
    const value = Math.trunc(10 * (1 - ((this.colorShift + target - temp) / this.granularity))) / 10;
    console.log(value);
    return interpolateYlGn(value);
  }

}
