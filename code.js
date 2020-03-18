
///////////// Chapter 1. Data Loading //////////////
var data_location = 'iris.data'
var iris_data;
d3.csv(data_location).then(function(data){
  data.forEach(function(d){
    // convert string to number
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
  });
  iris_data = data;
  console.log(iris_data);
  // perform initialization after data is loaded.
  draw_scatterpoints();
  assign_brush_events();
});
///////////// Chapter 1. End /////////////

///////////// Chapter 2. Scatter Plot Initialization //////////////
const padding = 10
const scatterplot_size = 400
const scatterpoint_radius = 5
const svg_width = scatterplot_size * 2 + padding * 4
const svg_height = scatterplot_size + padding * 2

// draw svg canvas
var svg = d3.select('#svg_chart').append('svg')
  .attr('width', svg_width)
  .attr('height', svg_height);

// draw scatterplot borders
svg.append('rect')
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('x', padding)
  .attr('y', padding)
  .attr('width', scatterplot_size)
  .attr('height', scatterplot_size);
svg.append('rect')
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('x', scatterplot_size + padding * 3)
  .attr('y', padding)
  .attr('width', scatterplot_size)
  .attr('height', scatterplot_size);

// useful scales for mapping cx and cy for scatter points
var sepal_length_scale = d3.scaleLinear()
  .range([scatterpoint_radius, scatterplot_size-scatterpoint_radius])
  .domain([4.3, 7.9]);

var sepal_width_scale = d3.scaleLinear()
  .range([scatterpoint_radius, scatterplot_size-scatterpoint_radius])
  .domain([2.0, 4.4]);

var petal_length_scale = d3.scaleLinear()
  .range([scatterpoint_radius, scatterplot_size-scatterpoint_radius])
  .domain([1.0, 6.9]);

var petal_width_scale = d3.scaleLinear()
  .range([scatterpoint_radius, scatterplot_size-scatterpoint_radius])
  .domain([0.1, 2.5]);

var class_color = d3.scaleOrdinal(d3.schemePastel1)

// make scatterplot point groups
var sepal_scatterplot = svg.append('g')
  .attr('class', 'sepal_group')
  .attr('transform', `translate(${padding},${padding})`);

var petal_scatterplot = svg.append('g')
  .attr('class', 'petal_group')
  .attr('transform', `translate(${scatterplot_size + padding * 3},${padding})`);

function draw_scatterpoints(){
  //TODO: Finish drawing scatterplots by adding legends and axis.
  //Work on Sepal Scatterplots
    // Add the x-axis.
    sepal_scatterplot.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(d3.axisBottom(sepal_length_scale));

    // Add the y-axis.
    sepal_scatterplot.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(sepal_width_scale));
/*
    // Add an x-axis label.
    sepal_scatterplot.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("income per capita, (dollars)");

    // Add a y-axis label.
    sepal_scatterplot.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("life expectancy (years)");
*/
  //TODO: append points to the scatterplot.
  var sepal_points = sepal_scatterplot.selectAll('circle').data(iris_data);
  var petal_points = petal_scatterplot.selectAll('circle').data(iris_data);

}
///////////// Chapter 2. End /////////////

///////////////// Chapter 3. Brush /////////////////
function assign_brush_events(){
  var sepal_points = sepal_scatterplot.selectAll('circle');
  var petal_points = petal_scatterplot.selectAll('circle');
  var circles = svg.selectAll('circle');
  var brush = d3.brush()
    .extent([[0, 0], [scatterplot_size, scatterplot_size]])
    .on('start', brushstarted)
    .on('brush', brushed)
    .on('end', brushend);
  sepal_scatterplot.call(brush);
  petal_scatterplot.call(brush);

  var selecting_scatterplot;

  //TODO: implement the following 3 sub-functions
  function brushstarted(){

  }

  function brushed(){
    if (d3.event.selection === null) return;
    var [[x0, y0], [x1, y1]] = d3.event.selection;

  }

  function brushend(){

  }
}
///////////// Chapter 3. End /////////////
