let Imgnav = { curstate: 0,
               imgCaptions: ["Joe Louis and Max Schmeling fight for the first time, 1936",
                             "Joe Louis and Max Schmeling as friends years later",
                             "Jack Dempsey as a young fighter",
                             "Sugar Ray Robinson with his wife, Edna Mae Holly",
                             "Jack Johnson as a young fighter"],
               imgFilepaths: ["assets/boxer_joelouis_fight.jpg",
                              "assets/boxer_joelouis_friends.jpg",
                              "assets/boxer_jackdempsey.jpg",
                              "assets/boxer_sugarray.jpg",
                              "assets/boxer_jackjohnson.jpg"],
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

let sizeimg = function () {
    let figEl = document.getElementById("imgfig");
    let imgEl = document.getElementById("imgimg");
    let figwidth = figEl.clientWidth;
    let figheightwithcaption = figEl.clientHeight;
    let figheight = figheightwithcaption - 25;
    let natheight = imgEl.naturalHeight;
    let natwidth = imgEl.naturalWidth;
    let aspectratio = natwidth/natheight;
    if (natheight > natwidth || figwidth/aspectratio > figheight) {
        imgEl.style.width = `${figheight*aspectratio}px`;
        imgEl.style.height = `${figheight}px`;
    } else {
        imgEl.style.height = `${figwidth/aspectratio}px`;
        imgEl.style.width = `${figwidth}px`;
    }
}

let nowimg = function() {
    let imgEl = document.getElementById("imgimg");
    let figCaption = document.getElementById("imgfigcaption");
    imgEl.src = Imgnav.imgFilepaths[Imgnav.curstate];
    imgEl.alt = Imgnav.imgCaptions[Imgnav.curstate];
    figCaption.innerHTML = Imgnav.imgCaptions[Imgnav.curstate];
}

let nextimg = function() {
    Imgnav.curstate = mod((Imgnav.curstate + 1), Imgnav.imgCaptions.length);
    nowimg();
}

let previmg = function() {
    Imgnav.curstate = mod((Imgnav.curstate - 1), Imgnav.imgCaptions.length);
    nowimg();
}

// button functionality assignment
let prevbutton = document.getElementById("figbackbutton");
let flscrnbutton = document.getElementById("figfullscreen");
let nextbutton = document.getElementById("figforwardbutton");

prevbutton.addEventListener("click", previmg);
// prevbutton.addEventListener("click", nextimg);
nextbutton.addEventListener("click", nextimg);

// image resizing assignment
let imgEl = document.getElementById("imgimg");
imgEl.addEventListener("load", sizeimg);
window.addEventListener("resize",sizeimg);

// add initial image on document load
let initimg = function() {
    nowimg();
    sizeimg();
}

document.onload = initimg()