
drawer = function(data, id){
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 600 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom,
      svg = d3.select("#" + id)
                 .append("svg")
                 .attr("preserveAspectRatio", "xMinYMin meet")
                 .attr("viewBox","0 5 " + (width + 50)  + " " + (height+50))
                   //class to make it responsive
                 .classed("svg-content-responsive", true);

  var formatValue = d3.format(",d");

  var x = d3.scaleLog()
      .rangeRound([0, width]);

  var g = svg.append("g")
      .attr("class", id)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.value; }));


    //.html(&#x3BC);

}
//function type(d) {
//  if (!d.value) return;
//  d.value = +d.value;
//  return d;
//}
drawDots = function(data, id){
  var margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 600 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;

  var formatValue = d3.format(",d");

  var x = d3.scaleLog()
      .rangeRound([0, width]);

  x.domain(d3.extent(data, function(d) { return d.value; }));

  var simulation = d3.forceSimulation(data)
      .force("x", d3.forceX(function(d) { return x(d.value); }).strength(1))
      .force("y", d3.forceY(height / 2))
      .force("collide", d3.forceCollide(4))
      .stop();

  for (var i = 0; i < 20; ++i) simulation.tick();

  var g = d3.select("." + id)

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(20, ".0s"));

  var cell = g.append("g")
      .attr("class", "cells")
    .selectAll("g").data(d3.voronoi()
        .extent([[-margin.left, -margin.top], [width + margin.right, height + margin.top]])
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
      .polygons(data)).enter().append("g");

  cell.append("circle")
      .attr("r", 3)
      .attr("cy", 1000)
      .transition()
      .delay(20000)
      .duration(1500)
      .attr("cx", function(d) { return d.data.x; })
      .attr("cy", function(d) { return d.data.y; });

  cell.append("path")
      .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

  cell.append("title")
      .text(function(d) { return d.data.id + "\n" + formatValue(d.data.value); });

    var mean = d3.mean(data, function(d) { return d.value; })

    g.append("text")
    .style("stroke", "none")
    .attr("y", 300)
    .attr("x", x(mean))
    .transition()
    .delay(21000)
    .duration(3000)
    .style("stroke", "black")
    .attr("y", 75)
    .text('μ');
}
