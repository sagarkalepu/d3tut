d3.json("tweets.json").then((Data) => {
 dataViz(Data.tweets);
})

function dataViz(incomingData) {
 incomingData.forEach(d => {
	d.impact = d.favorites.length + d.retweets.length;
	d.tweetTime = new Date(d.timeStamp);
 })
 
 var maxImpact = d3.max(incomingData, d => d.impact);
 
 var startEnd = d3.extent(incomingData, d => d.tweetTime);
 console.log(startEnd);
 var timeRamp = d3.scaleTime().domain(startEnd).range([20, 480]);
 var yScale = d3.scaleLinear().domain([0 , maxImpact]).range([0, 460]);
 var radiusScale = d3.scaleLinear().domain([0, maxImpact]).range([1, 20]);
 var colorScale = d3.scaleLinear().domain([0, maxImpact]).range(["white", "#C00C00"]);
 
 d3.select("svg").attr("width", 500).attr("height", 500);
 
 console.log(incomingData);
 
 d3.select("svg")
 .selectAll("circle")
 	.data(incomingData)
 	.enter()
 	.append("circle")
 	.attr("r", d => radiusScale(d.impact))
 	.attr("cx", d => timeRamp(d.tweetTime))
 	.attr("cy", d => 480 - yScale(d.imapct))
 	.style("fill", d => colorScale(d.impact))
 	.style("stroke", "black")
 	.style("stroke-width", "1px");
}





/*
function dataViz(data) {
 console.log(data);
 var nestedTweets = d3.nest()
 	.key(d => d.user)
 .entries(data);

 
 console.log(nestedTweets);
	nestedTweets.forEach(d => {
	 d.numTweets = d.values.length
	})

	var maxTweets = d3.max(nestedTweets, d => d.numTweets);
	var yScale = d3.scaleLinear().domain([0, maxTweets]).range([0, 500]);
 
 	d3.select("svg").attr("width", 500).attr("height", 
500);
	
	d3.select("svg")
	 .selectAll("rect")
	 .data(nestedTweets)
	 .enter()
	 .append("rect")
	 .attr("width", 50)
	 .attr("height",d => yScale(d.numTweets))
	 .attr("x", (d ,i) => i * 50)
	 .attr("y", (d) => 500 - yScale(d.numTweets))
	 .style("fill", "#FE9922")
	 .style("stroke", "#9A8B7A")
	 .style("stroke-width", "1px");
}











/*
d3.csv("cities.csv").then(function(data) {
		console.log(data)
		dataViz(data);
	}
)


function dataViz(data) {
 var maxPopulation = d3.max(data, d => parseInt(d.population));
 var yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 460]);
 console.log(yScale(300));
 d3.select("svg").attr("style", "height: 480; width: 600px;");
 d3.select("svg")
 .selectAll("rect")
 .data(data)
 .enter()
 .append("rect")
 .attr("width", 50)
 .attr("height", d => yScale(parseInt(d.population)))
 .attr("x", (d, i) => i * 60)
 .attr("y", d => 480 - yScale(parseInt(d.population)))
 .style("fill", "#C00FEE")
 .style("stroke", "#C00C00")
 .style("stroke-width", "1px")
}

function dataViz(incomingData) {
  d3.select("body").selectAll("div.cities")            
    .data(incomingData)                                
    .enter()                                           
    .append("div")                                     
    .attr("class","cities")                            
    .html(d => d.label);  
	
	
d3.select("svg")
	.selectAll("rect")
	.data([15, 50, 22 ,8, 100, 10])
	.enter()
	.append("rect")
	.attr("width", 10)
	.attr("height", d => d)
		.style("opacity", 0.25)
	.attr("x", (d, i) => i * 10)
	.attr("y", d => 100 - d);
}
*/
