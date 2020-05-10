'use strict';

let svginit = function () {
    let canv
}

let canv = document.getElementById("maincanvas");

let lineGenerator = d3.line();
let springPoints = [[0, 100],
                    [20, 120],
                    [-20, 160],
                    [20, 200]
];
let pathData = lineGenerator(springPoints);


let newspring = document.createElement("path");
canv.appendChild(newspring);

d3.select('path')
    .attr('d', pathData);

// var svg = d3.select("svg");

// var circle = svg.selectAll("circle")
//     .data([32, 57, 112, 293]);

// var circleEnter = circle.enter().append("circle");