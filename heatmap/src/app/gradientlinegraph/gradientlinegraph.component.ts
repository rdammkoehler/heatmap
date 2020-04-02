import {Component, OnInit} from '@angular/core';
import {select, scaleTime, scaleLinear, line, extent, axisBottom, axisLeft, area} from 'd3';

@Component({
  selector: 'app-gradientlinegraph',
  templateUrl: './gradientlinegraph.component.html',
  styleUrls: ['./gradientlinegraph.component.scss']
})
export class GradientlinegraphComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // this.drawChart();
    addEventListener('DOMContentLoaded', (event) => {
        const btcFeedUrl = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2020-04-01';
        fetch(btcFeedUrl)
          .then((response) => response.json())
          .then((data) => this.drawChart_grad(this.parseData(data)))
          .catch((err) => console.log(err));
      }
    );
  }

  parseData(data: { bpi: [string, number] }) {

    // structure looks like this;
    const exampleData = {
      bpi:
        {
          '2019-01-01': 3869.47,
          '2019-01-02': 3941.2167,
          '2019-01-03': 3832.155,
          '2019-01-04': 3863.6267
        },
      disclaimer: 'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
      time: {
        updated: 'Sep 10, 2019 22:48:50 UTC',
        updatedISO: '2019-09-10T22:48:50+00:00'
      }
    };

    const arr = [];
    // tslint:disable-next-line:forin
    for (const idx in data.bpi) {
      arr.push({date: new Date(idx), value: +data.bpi[idx]});
    }
    return arr;
  }

  // drawChart_orig(data) {
  //   const graphs = select('.gradientlinegraph');
  //   const chartWidth = 500;
  //   const chartHeight = 500;
  //   const margin = {top: 20, right: 20, bottom: 30, left: 50};
  //   const width = chartWidth - margin.left - margin.right;
  //   const height = chartHeight - margin.top - margin.bottom;
  //
  //   const chart = graphs.append('svg')
  //     .attr('width', chartWidth)
  //     .attr('height', chartHeight);
  //
  //   // tslint:disable-next-line:no-shadowed-variable
  //   const group = chart.append('g')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  //
  //   const xScaleFunc = scaleTime().rangeRound([0, width]);
  //   const yScaleFunc = scaleLinear().rangeRound([height, 0]);
  //
  //   // @ts-ignore
  //   const drawLineFunc = line().x((datum) => xScaleFunc(datum.date)).y((datum) => yScaleFunc(datum.value));
  //
  //   // @ts-ignore
  //   xScaleFunc.domain(extent(data, (datum) => datum.date));
  //   // @ts-ignore
  //   yScaleFunc.domain(extent(data, (datum) => datum.value));
  //
  //   // the area chart piece
  //   // @ts-ignore
  //   const area = area()
  //     .x((datum) => xScaleFunc(datum.date))
  //     .y0(height)
  //     .y1((datum) => yScaleFunc(datum.value));
  //
  //   // draw the chart
  //   group.append('path')
  //     .datum(data)
  //     .attr('class', 'area')
  //     .attr('d', area)
  //     .attr('fill', 'none')
  //     .attr('stroke', 'black')
  //     .attr('stroke-linejoin', 'round')
  //     .attr('stroke-linecap', 'round')
  //     .attr('stroke-width', 0.5)
  //     .attr('d', drawLineFunc);
  //
  //   // x axis labels
  //   const xAxisGroup = group.append('g')
  //     .attr('transform', 'translate(0,' + height + ')')
  //     .call(axisBottom(xScaleFunc));
  //   xAxisGroup.selectAll('text')
  //     .attr('fill', 'black');
  //   xAxisGroup
  //     .select('.domain')
  //     .remove();
  //
  //   // y axis label
  //   const yAxisGroup = group.append('g')
  //     .call(axisLeft(yScaleFunc));
  //   yAxisGroup.append('text')  // from here on we are just adding to the axis
  //     .attr('transform', 'rotate(-90)')
  //     .attr('y', 6)
  //     .attr('dy', '0.71em')
  //     .attr('text-anchor', 'end')
  //     .text('Price ($)');
  //   yAxisGroup.selectAll('text') // note: picks up the appended label too!
  //     .attr('fill', 'black');
  //
  //   // add grid lines
  //   const xTicks = axisBottom(xScaleFunc).ticks(8);
  //   const yTicks = axisLeft(yScaleFunc).ticks(10);
  //   chart
  //     .append('g')
  //     .attr('class', 'grid')
  //     .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
  //     .call(xTicks.tickSize(-height));
  //   chart
  //     .append('g')
  //     .attr('class', 'grid')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  //     .call(yTicks.tickSize(-width));
  //
  // }

  drawChart_grad(data) {
    const graphs = select('.gradientlinegraph');
    const chartWidth = 500;
    const chartHeight = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;
    const chart = graphs.append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .style('background', 'black');

    // tslint:disable-next-line:no-shadowed-variable
    const group = chart.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScaleFunc = scaleTime().rangeRound([0, width]);
    const yScaleFunc = scaleLinear().rangeRound([height, 0]);

    // @ts-ignore
    xScaleFunc.domain(extent(data, (datum) => datum.date));
    // @ts-ignore
    yScaleFunc.domain(extent(data, (datum) => datum.value));

    // a gradient fill
    const linearGradient = chart
      .append('defs')
      .append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '75%')  // bottom right corner
      .attr('y1', '75%')
      .attr('x2', '100%')  // top left corner
      .attr('y2', '100%');

    linearGradient
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', 'lightgreen')
      .style('stop-opacity', 1);

    linearGradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', 'transparent')
      .style('stop-opacity', 1);

    // the area chart piece
    const chartArea = area()
      .x((datum) => xScaleFunc(datum.date))
      .y0(height)
      .y1((datum) => yScaleFunc(datum.value));

    // draw the chart
    group.append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', chartArea)
      .style('fill', 'url(#gradient)')
      .attr('stroke', 'gray')
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-width', 0.5);

    // x axis labels
    const xAxisGroup = group.append('g')
      .attr('transform', 'translate(0,' + height + '))')
      .call(axisBottom(xScaleFunc));
    xAxisGroup.selectAll('text')
      .attr('fill', 'white');
    xAxisGroup
      .select('.domain')
      .remove();

    // y axis label
    const yAxisGroup = group.append('g')
      .call(axisLeft(yScaleFunc));
    yAxisGroup.append('text')  // from here on we are just adding to the axis
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');
    yAxisGroup.selectAll('text') // note: picks up the appended label too!
      .attr('fill', 'white');

    // add grid lines
    const xTicks = axisBottom(xScaleFunc).ticks(8); // how to make dynamic?
    const yTicks = axisLeft(yScaleFunc).ticks(10); // how to make dynamic?
    chart
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
      .call(xTicks.tickSize(-height));
    chart
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(yTicks.tickSize(-width));
  }

  // function drawChart_grad_w_trend(data) {
  //   const chartWidth = 500;
  //   const chartHeight = 500;
  //   const margin = {top: 20, right: 20, bottom: 30, left: 50};
  //   const width = chartWidth - margin.left - margin.right;
  //   const height = chartHeight - margin.top - margin.bottom;
  //
  //   const chart = graphs.append('svg')
  //     .attr('width', chartWidth)
  //     .attr('height', chartHeight)
  //     .style('background', 'black');
  //
  //   // tslint:disable-next-line:no-shadowed-variable
  //   const group = chart.append('g')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  //
  //   const xScaleFunc = scaleTime().rangeRound([0, width]);
  //   const yScaleFunc = scaleLinear().rangeRound([height, 0]);
  //
  //   xScaleFunc.domain(extent(data, (datum) => datum.date));
  //   yScaleFunc.domain(extent(data, (datum) => datum.value));
  //
  //   // a gradient fill
  //   const linearGradient = chart
  //     .append('defs')
  //     .append('linearGradient')
  //     .attr('id', 'steelGradient')
  //     .attr('x1', '0%')
  //     .attr('x2', '100%')
  //     .attr('y1', '0%')
  //     .attr('y2', '100%');
  //
  //   linearGradient
  //     .append('stop')
  //     .attr('offset', '20%')
  //     .style('stop-color', 'steelblue')
  //     .style('stop-opacity', 1);
  //
  //   linearGradient
  //     .append('stop')
  //     .attr('offset', '100%')
  //     .style('stop-color', 'transparent')
  //     .style('stop-opacity', 1);
  //
  //   // the area chart piece
  //   const area = area()
  //     .x((datum) => xScaleFunc(datum.date))
  //     .y0(height)
  //     .y1((datum) => yScaleFunc(datum.value));
  //
  //   // draw the chart
  //   group.append('path')
  //     .datum(data)
  //     .attr('class', 'area')
  //     .attr('d', area)
  //     .style('fill', 'url(#steelGradient)')
  //     .attr('stroke', 'gray')
  //     .attr('stroke-dasharray', '5,5')
  //     .attr('stroke-width', 0.5);
  //
  //   // x axis labels
  //   const xAxisGroup = group.append('g')
  //     .attr('transform', 'translate(0,' + height + ')')
  //     .call(axisBottom(xScaleFunc));
  //   xAxisGroup.selectAll('text')
  //     .attr('fill', 'white');
  //   xAxisGroup
  //     .select('.domain')
  //     .remove();
  //
  //   // y axis label
  //   const yAxisGroup = group.append('g')
  //     .call(axisLeft(yScaleFunc));
  //   yAxisGroup.append('text')  // from here on we are just adding to the axis
  //     .attr('transform', 'rotate(-90)')
  //     .attr('y', 6)
  //     .attr('dy', '0.71em')
  //     .attr('text-anchor', 'end')
  //     .text('Price ($)');
  //   yAxisGroup.selectAll('text') // note: picks up the appended label too!
  //     .attr('fill', 'white');
  //
  //   // add grid lines
  //   const xTicks = axisBottom(xScaleFunc).ticks(8); // how to make dynamic?
  //   const yTicks = axisLeft(yScaleFunc).ticks(10); // how to make dynamic?
  //   chart
  //     .append('g')
  //     .attr('class', 'grid')
  //     .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
  //     .call(xTicks.tickSize(-height).tickFormat(''));
  //   chart
  //     .append('g')
  //     .attr('class', 'grid')
  //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  //     .call(yTicks.tickSize(-width).tickFormat(''));
  //
  //   // add trend line
  //   function leastSquares(xseries, yseries) {
  //     const reduceSumFunc = (prev, cur) => prev + cur;
  //
  //     const xBar = xseries.reduce(reduceSumFunc) * 1.0 / xseries.length;
  //     const yBar = yseries.reduce(reduceSumFunc) * 1.0 / yseries.length;
  //
  //     const ssXX = xseries.map((d) => Math.pow(d - xBar, 2)).reduce(reduceSumFunc);
  //
  //     const ssYY = yseries.map((d) => Math.pow(d - yBar, 2)).reduce(reduceSumFunc);
  //
  //     const ssXY = xseries.map((d, i) => (d - xBar) * (yseries[i] - yBar)).reduce(reduceSumFunc);
  //
  //     const slope = ssXY / ssXX;
  //     const intercept = yBar - (xBar * slope);
  //     const rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
  //
  //     return [slope, intercept, rSquare];
  //   }
  //
  //   const xSeries = range(1, data.length + 1);
  //   const ySeries = data.map((datum) => datum.value);
  //   const lsc = leastSquares(xSeries, ySeries);
  //
  //   // maybe need to move through data until lrY1 > translated 0
  //   const lrY1 = +lsc[0] + +lsc[1];
  //   const lrY2 = +lsc[0] * +xSeries.length + +lsc[1];
  //   chart
  //     .append('line')
  //     .attr('x1', margin.left)
  //     .attr('y1', yScaleFunc(lrY1) - margin.top)
  //     .attr('x2', width + margin.left)
  //     .attr('y2', yScaleFunc(lrY2) - margin.top)
  //     .attr('stroke', 'orange')
  //     .attr('stroke-width', '2px')
  //     .attr('stroke-dasharray', '2,2,5');
  // }

}
