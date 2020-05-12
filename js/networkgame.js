'use strict';

function createSpring(svg, xs, ys) {
    let buffer = 25;
    let halfwidth = 20;
    let quartperiod = 5;
    let data = [[xs, ys],
                [xs, ys + buffer],
                [xs - halfwidth, ys + buffer + quartperiod]];
    let spring_points = 6;
    let ssx = xs, ssy = ys + buffer + quartperiod;
    for (let i = 1; i < spring_points; i++) {
        let newpoint = [ssx + ((i%2)==1?1:-1)*halfwidth,
                        ssy + quartperiod*2*i];
        data.push(newpoint);
    }
    let fsx = data[data.length - 1][0], fsy = data[data.length - 1][1];
    data.push([xs, fsy + quartperiod]);
    data.push([xs, fsy + quartperiod + buffer]);

    svg.append('path')
        .attr('d', d3.line()(data))
        .attr('stroke', 'black')
        .attr('stroke-width', 3)
        .attr('fill', 'none');
}

function main() {
    let svg = d3.select("#maincanvas");
    let svgEl = document.getElementById("maincanvas");

    let xmid = svgEl.clientWidth/2;
    let ymid = svgEl.clientHeight/2;

    createSpring(svg, xmid, ymid-75);
}

main();

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

