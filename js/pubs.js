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
        rects += ` <div class="pubcat" style="background-color:${catcol(cat)};">${cat}</div>`;
    }
    
    let str = `<b>${pub.year}. <i>${pub.title}</i></b>.
               ${pub.authors}. ${pub.journal}.
               <a href="${pub.permalink}">${pub.permalink}</a>`;
    
    return str + rects;
}

function catuniques(pubs) {
    // get array of unique categories
    let occurences = [];
    for (let pub of pubs) {
        for (let cat of pub.categories.split(' ')) {
            (occurences.indexOf(cat) == -1) && occurences.push(cat);
        }
    }
    return occurences.sort();
}

let categorymanager = {
    catstates : {},
    update : function (cat) {
    // get more intuitive activity state
    console.log(cat, state);
    }
}

function populatecats(pubs) {
    // get categories paragraph element
    let catlist = document.getElementById('catlist');
    let str = "<b>Select/deselect categories:</b>";
    catlist.innerHTML = str;

    // get all unique categories with number of occurences
    let catunique = catuniques(pubs);
    // set state of all categories in categorymanager
    categorymanager.catstates = {};
    for (let cat of catunique) {
        categorymanager.catstates[cat] = true;
    }

    // place category buttons
    d3.select('#catlist')
      .selectAll('div')
      .data(catunique).enter().append('div')
      .attr('class', 'pubcat catbutton')
      .attr('style', i => `background-color:${catcol(i)}`)
      .html(i => i)
      .on('click', function () {
          this.toggleState = !this.toggleState;
          d3.select(this)
            .transition().duration(200)
            .style('opacity', this.toggleState ? '0.3' : '1.0');
        
          categorymanager.update(this.textContent);
      });
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

    populatecats(pubs);
}

fetch("content/pubs.json")
    .then(response => response.json())
    .then(data => populatelist(data));
