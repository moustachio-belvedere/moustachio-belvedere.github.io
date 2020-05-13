'use strict';

function createSpring(svg, xs, ys, classname = "moveableEl") {
    let spring = svg.append("g")
                    .attr("class", classname);

    let buffer = 20;
    let halfwidth = 20;
    let quartperiod = 4;
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
    
    spring.append("path")
            .attr("d", d3.line()(data))
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("fill", "none");

    let radius = 5;
    spring.append("circle")
            .attr("cx", data[0][0])
            .attr("cy", data[0][1])
            .attr("r", radius)
            .attr("stroke", "cyan")
            .attr("stroke-width", 2);

    spring.append("circle")
            .attr("cx", data[data.length - 1][0])
            .attr("cy", data[data.length - 1][1])
            .attr("r", radius)
            .attr("stroke", "cyan")
            .attr("stroke-width", 2);

    return spring;
}

function createSpringPot(svg, xs, ys) {
    let springpot = svg.append("g");

    let halfwidth = 20;
    let hypotenuse = Math.sqrt(halfwidth**2 + halfwidth**2);
    let buffer = (88 - 2*halfwidth)/2;

    let buff1 = [[xs, ys],
                 [xs, ys + buffer]];
    springpot.append("path")
            .attr("d", d3.line()(buff1))
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("fill", "none");

    let buff2 = [[xs, ys + 88 - buffer],
                 [xs, ys + 88]];
    springpot.append("path")
        .attr("d", d3.line()(buff2))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    springpot.append ("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", hypotenuse)
                .attr("height", hypotenuse)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 3)
                .attr("transform", `translate(${xs - halfwidth}, ${ys + 44}) rotate(-45)`);

    let radius = 5;
    springpot.append("circle")
        .attr("cx", xs)
        .attr("cy", ys)
        .attr("r", radius)
        .attr("stroke", "cyan")
        .attr("stroke-width", 2);

    springpot.append("circle")
        .attr("cx", xs)
        .attr("cy", ys + 88)
        .attr("r", radius)
        .attr("stroke", "cyan")
        .attr("stroke-width", 2);

    return springpot;
}

function createDashPot(svg, xs, ys) {
    let dashpot = svg.append("g");

    let buffer = 26;
    let halfwidth = 20;

    let data = [[xs, ys],
                [xs, ys + buffer]];
    dashpot.append("path")
        .attr("d", d3.line()(data))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    let caplength = 2*halfwidth - 2;
    let capline = [[xs - halfwidth, ys + buffer + caplength],
                   [xs - halfwidth, ys + buffer],
                   [xs + halfwidth, ys + buffer],
                   [xs + halfwidth, ys + buffer + caplength]];
    dashpot.append("path")
        .attr("d", d3.line()(capline))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    let plungergap = 18, sidegap = 4;
    let plungertop = [[xs - (halfwidth - sidegap), ys + buffer + plungergap],
                      [xs + (halfwidth - sidegap), ys + buffer + plungergap]];
    dashpot.append("path")
        .attr("d", d3.line()(plungertop))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    let plungerstem = [[xs, ys + buffer + plungergap],
                       [xs, ys + 88]];
    dashpot.append("path")
        .attr("d", d3.line()(plungerstem))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "none");

    let radius = 5;
    dashpot.append("circle")
        .attr("cx", xs)
        .attr("cy", ys)
        .attr("r", radius)
        .attr("stroke", "cyan")
        .attr("stroke-width", 2);

    dashpot.append("circle")
        .attr("cx", xs)
        .attr("cy", ys + 88)
        .attr("r", radius)
        .attr("stroke", "cyan")
        .attr("stroke-width", 2);

    return dashpot;
}

function main() {
    const svg = d3.select("#maincanvas");
    let svgEl = document.getElementById("maincanvas");

    let drag = d3.behavior.drag()
                          .origin(function (d) { return d; })
                          .on("dragstart", dragstarted)
                          .on("drag", dragged)
                          .on("dragend", dragended);

    let xmid = svgEl.clientWidth/2;
    let ymid = svgEl.clientHeight/2;

    let s1 = createSpring(svg, xmid-75, ymid-75);
    let sp1 = createSpringPot(svg, xmid, ymid-75);
    let dp1 = createDashPot(svg, xmid+75, ymid-75);
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

