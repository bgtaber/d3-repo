// @TODO: YOUR CODE HERE!

//Define SVG area dimensions
var svgWidth= 960;
var svgHeight= 500;

//Define the chart's margins as an object
var margin= {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
};

//Define dimensions of the chart area
var chartWidth= svgWidth-margin.left-margin.right;
var chartHeight= svgHeight-margin.top-margin.bottom;

//select div, append SVG area to it, and set its dimensions
var svg= d3.select("#scatter")
		   .append("svg")
		   .attr("width", svgWidth)
		   .attr("height", svgHeight)

// Append an SVG group, then set its margins
var chartGroup= svg.append("g")
				   .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Configure a parseTime function which will return a new Date object from a string
var parseTime=d3.timeParse("%B");
console.log(parseTime);

// //two variables chosen:
// var income= "income";
// var obseity= "obesity";

// //other variables:
// var healthcare= "healthcare";
// var age= "age";
// var poverty= "poverty";
// var smokes= "smokes";

//load data from assets/data/data.csv
d3.csv("assets/data/data.csv").then(function(state_Data) {
	//print(census_data)
	console.log(state_Data);

	//Format the data and cast as numbers
	state_Data.forEach(function(data) {
    // console.log(data)
		// state_Data['income']=parseTime(state_Data['income']);
		// state_Data['obesity']=parseTime(state_Data['obesity']);
		data['poverty']= +data['poverty'];
		data['age']= +data['age'];
		data['income']= +data['income'];
		data['healthcare']= +data['healthcare'];
		data['obesity']= +data['obesity'];
		data['smokes']= +data['smokes'];
	});

	//Configure a linear scale w/ a range between 0 and the chartWidth
	var xScale= d3.scaleLinear()
				  .range([0, chartWidth])
				  .domain([30000, d3.max(state_Data, data => data['income'])]);

	console.log(xScale);

	//Configure a linear scale w/ a range between the chartHeight and O
	//Set the domain for the yLinearScale function
	var yScale= d3.scaleLinear()
				  .range([chartHeight, 0])
				  .domain([15, d3.max(state_Data, data => data['obesity'])*1.2]);
	
	console.log(yScale);
  	// Create two new functions passing the scales in as arguments
  	// These will be used to create the chart's axes
  	var bottomAxis=d3.axisBottom(xScale); //this is your xAxis
  	var leftAxis=d3.axisLeft(yScale); //this is your yAxis

  	//Append an SVG group element to the SVG area, create the left axis inside of it
  	chartGroup.append("g")
  			  .classed("axis", true)
  			  .call(leftAxis);

  	//Append an SVG group element to the SVG area, create the bottom axis inside of it
  	//Tranlsate the bottom axis to the bottom of the page 
  	chartGroup.append("g")
  			  .classed("axis", true)
  			  .attr("transform", `translate(0,${chartHeight})`)
  			  .call(bottomAxis);

  	//Create scatterplot and append initial ciricles
  	var circlesGroup=chartGroup.selectAll("circle")
  								  .data(state_Data)
  								  .enter()
  								  .append("circle")
  				   				  .attr("cx", d=> xScale(d['income']))
  				   				  .attr("cy", d=> yScale(d['obesity']))
  				   				  .attr("r", 20)
  				   				  .classed("stateCircle", true)
  				   				  .attr("stroke-width", "1")
  				   				  .attr("stroke", "black");

                      chartGroup.selectAll(".stateText")
                                .data(state_Data)
                                .enter()
                                .append("text")
                                .classed("stateText", true)
                                .attr("x", d=>xScale(d.income));
 
    //Create group for two x-axis labels
    var labelsGroup=chartGroup.append("g")
    .attr("transform", `translate${svgWidth/2}, ${svgHeight +20})`);                               


  	//Create x axis title
  	var xAxisLabel=chartGroup.append("text")
                             .attr("x", 80)
                             .attr("y", 0)
                             .attr("value", "income")
  			                     .classed("active", true)
  			                     // .attr("x", chartWidth/2
                             .text("Income");			   				  

    //Create y axis title
    var yAxisLabel=chartGroup.append("text")
                             .attr("transform", "rotate(-90)")
                             .attr("y", margin.left-20)
                             .attr("x", 0- (chartHeight/2))
                             .attr("dy", "1em")
                             .classed("axis-text", true)
                             .text("Obesity")


  	//Step 1: Append tooltip div
  	var toolTip=d3.select("body")
  				  .append("div", "#scatter")
  				  .attr("class", "d3-tip");		  


  	// .catch(function(error) {
  	// 	console.log(error);
  	// });
});