'use strict';

function catcol(cat) {
    let coldict = {
        "biomechanics": "#c4efff",
        "fractional-viscoelasticity": "#ffd39a",
        "plant-pathogens": "#dec4ff",
        "pectin": "#bfe33d",
        "software": "#f2b2ff",
        "algae": "#e6e675",
        "energy-harvesting": "#bfc7ff",
        "vibrations": "#db9ea6"
        }
    return coldict[cat];
}

function articlestringify(pub) {
    let cats = pub.categories
                  .split(' ')
                  .sort();
    
    let rects = "";
    for (let cat of cats) {
        rects += ` <div style="background-color:${catcol(cat)};">${cat}</div>`;
    }
    
    console.log(rects);

    let str = `<b>${pub.year}. <i>${pub.title}</i></b>.
               ${pub.authors}. ${pub.journal}.
               <a href="${pub.permalink}">${pub.permalink}</a>`;
    
    return str + rects;
}

async function populatelist(pubs) {
    let ul = document.getElementById('publist');

    pubs.sort((a, b) => (a.year >= b.year) ? -1 : 1);

    d3.select('#publist')
      .selectAll('li')
      .data(pubs)
      .enter()
      .append('li')
      .html(v => articlestringify(v));

}

fetch("content/pubs.json")
    .then(response => response.json())
    .then(data => populatelist(data));