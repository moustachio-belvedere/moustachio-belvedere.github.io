'use strict';

// let svginit = function () {
//     let canv
// }

// let canv = document.getElementById("maincanvas");

// let lineGenerator = d3.line();
// let springPoints = [[0, 0],
//                     [0, 100],
//                     [20, 120],
//                     [-20, 160],
//                     [20, 200]
// ];
// let pathData = lineGenerator(springPoints);

// let newspring = document.createElement("path");
// canv.appendChild(newspring);

// d3.select('path')
//     .attr('d', pathData)
//     .attr('stroke-width', 2)
//     .attr('stroke', 'black')
//     .attr('fill', 'none');

// var svg = d3.select("svg");

// var circle = svg.selectAll("circle")
//     .data([32, 57, 112, 293]);

// var circleEnter = circle.enter().append("circle");
// function responsivefy(svg) {
//     // get container + svg aspect ratio
//     var container = d3.select(svg.node().parentNode),
//         width = parseInt(svg.style("width")),
//         height = parseInt(svg.style("height")),
//         aspect = width / height;

//     // add viewBox and preserveAspectRatio properties,
//     // and call resize so that svg resizes on inital page load
//     svg.attr("viewBox", "0 0 " + width + " " + height)
//         .attr("perserveAspectRatio", "xMinYMid")
//         .call(resize);

//     // to register multiple listeners for same event type, 
//     // you need to add namespace, i.e., 'click.foo'
//     // necessary if you call invoke this function for multiple svgs
//     // api docs: https://github.com/mbostock/d3/wiki/Selections#on
//     d3.select(window).on("resize." + container.attr("id"), resize);

//     // get width of container and resize svg to fit it
//     function resize() {
//         var targetWidth = parseInt(container.style("width"));
//         svg.attr("width", targetWidth);
//         svg.attr("height", Math.round(targetWidth / aspect));
//     }
// }

// d3.select("#canvasdiv").append("svg")
//     .attr("width", 960)
//     .attr("height", 500)
//     .call(responsivefy);

// create data
var data = [{ x: 0, y: 0 }, { x: 150, y: 150 }, { x: 300, y: 100 }, { x: 450, y: 20 }, { x: 600, y: 130 }]

// create svg element:
var svg = d3.select("#maincanvas")

// prepare a helper function
var lineFunc = d3.line()
    .x(function (d) { return d.x })
    .y(function (d) { return d.y })

// Add the path using this helper function
svg.append('path')
    .attr('d', lineFunc(data))
    .attr('stroke', 'black')
    .attr('fill', 'none');