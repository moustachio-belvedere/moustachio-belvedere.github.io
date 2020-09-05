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
    
    let str = `<b>${pub.year}. <i>${pub.title}</i></b>.
               ${pub.authors}. ${pub.journal}.
               <a href="${pub.permalink}">${pub.permalink}</a>`;

    let rects = "";
    for (let cat of cats) {
        rects += ` <div class="pubcat" style="background-color:${catcol(cat)}; opacity:${categorymanager.catstates[cat] ? 1.0 : 0.3};">${cat}</div>`;
    }
    
    return str + rects;
}

let categorymanager = {
    getactivepubs: function () {
        let activepubs = [];
        for (let pub of this.pubs) {
            let cats = pub.categories.split(' ');
            if (cats.some(d => this.catstates[d])) {
                activepubs.push(pub);
            }
        }
        return activepubs;
    },
    update: function (cat) {
        this.catstates[cat] = !this.catstates[cat];

        let pubshow = this.getactivepubs();
        console.log(pubshow);

        let pubsel = d3.select('#publist')
                       .selectAll('li')
                       .remove();


        d3.select('#publist')
            .selectAll('li')
            .data(pubshow)
            .enter()
            .append('li')
            .html(v => articlestringify(v));

    }
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

function populatecats(pubs) {
    // get categories paragraph element
    let catlist = document.getElementById('catlist');
    let str = "<b>Select/deselect categories:</b>";
    catlist.innerHTML = str;

    // place category buttons
    d3.select('#catlist')
      .selectAll('div')
      .data(categorymanager.catunique).enter().append('div')
      .attr('class', 'pubcat catbutton')
      .attr('style', i => `background-color:${catcol(i)}`)
      .html(i => i)
      .on('click', function () {
          this.toggleState = !this.toggleState;
          d3.select(this)
            .style('opacity', this.toggleState ? '0.3' : '1.0');
        
          categorymanager.update(this.textContent);
      });
}

async function populatelist(pubs) {
    let ul = document.getElementById('publist');

    pubs.sort((a, b) => (a.year >= b.year) ? -1 : 1);

    // init category manager with all info
    categorymanager.pubs = pubs;
    categorymanager.catunique = catuniques(pubs);
    categorymanager.catstates = {};
    for (let cat of categorymanager.catunique) {
        categorymanager.catstates[cat] = true;
    }

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
