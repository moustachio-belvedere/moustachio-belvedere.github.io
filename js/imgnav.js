'use strict';

let Imgnav = { curstate: 0,
               imgCaptions: ["Joe Louis and Max Schmeling, 1936",
                             "Joe Louis and Max Schmeling, 1971",
                             "Jack Dempsey as a young fighter",
                             "Sugar Ray Robinson with his wife, Edna",
                             "Jack Johnson as a young fighter"],
               imgFilepaths: ["assets/boxer_joelouis_fight.jpg",
                              "assets/boxer_joelouis_friends.jpg",
                              "assets/boxer_jackdempsey.jpg",
                              "assets/boxer_sugarray.jpg",
                              "assets/boxer_jackjohnson.jpg"],
                natWidth: [2738, 354, 384, 308, 800],
                natHeight: [1840, 281, 545, 386, 1332]
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

let sizeimg = function () {
    let figEl = document.getElementById("imgfig");
    let imgEl = document.getElementById("imgimg");

    let figwidth = figEl.clientWidth;
    let figheight = figEl.clientHeight;
    let natwidth = Imgnav.natWidth[Imgnav.curstate];
    let natheight = Imgnav.natHeight[Imgnav.curstate];
    let aspectratio = natwidth / natheight;
    if (natheight > natwidth || figwidth / aspectratio > figheight) {
        imgEl.style.width = `${figheight * aspectratio}px`;
        imgEl.style.height = `${figheight}px`;
    } else {
        figEl.style.position = "relative";
        imgEl.style.position = "absolute";
        imgEl.style.top = "0";
        imgEl.style.bottom = "0"
        imgEl.style.left = "0";
        imgEl.style.right = "0";
        imgEl.style.margin = "auto";
        imgEl.style.verticalAlign = "middle";

        imgEl.style.height = `${figwidth / aspectratio}px`;
        imgEl.style.width = `${figwidth}px`;
    }
}

let FSsizeimg = function () {
    let figEl = document.getElementById("imgfig");
    let imgEl = document.getElementById("imgimg");
    let showcaseEl = document.getElementsByClassName("imgshowcase")[0];
    let figCaptionEl = document.getElementById("imgfigcaption");
    let navButtons = document.getElementsByClassName("imgnavbuttons");

    showcaseEl.style.maxWidth = "none";
    showcaseEl.style.width = "100vw";
    showcaseEl.style.maxHeight = "none";
    showcaseEl.style.height = "85vh";

    figEl.style.maxHeight = "100vh";
    figEl.style.maxWidth = "100vw";
    imgEl.style.maxHeight = "100vh";
    imgEl.style.maxWidth = "100vw";

    figEl.style.verticalAlign = "middle";
    figEl.style.padding = "auto";
    figEl.style.position = "relative";

    figCaptionEl.style.fontSize = "15px";
    figCaptionEl.style.color = "white";
    figCaptionEl.style.height = "5%"
    figCaptionEl.style.width = "100%";

    figEl.style.width = "100%";
    figEl.style.height = "75%";
    
    imgEl.style.position = "relative";
    imgEl.style.top = "0";
    imgEl.style.bottom = "0";
    imgEl.style.left = "0";
    imgEl.style.right = "0";
    imgEl.style.margin = "auto";
    imgEl.style.verticalAlign = "middle";

    for (let navButton of navButtons) {
        navButton.style.height = "100%"
        navButton.style.width = "21%"
    }

    sizeimg();
}

let FSdownsize = function () {
    let figEl = document.getElementById("imgfig");
    let imgEl = document.getElementById("imgimg");
    let showcaseEl = document.getElementsByClassName("imgshowcase")[0];
    let figCaptionEl = document.getElementById("imgfigcaption");
    let navButtons = document.getElementsByClassName("imgnavbuttons");
    figEl.removeAttribute("style");
    imgEl.removeAttribute("style");
    showcaseEl.removeAttribute("style");
    figCaptionEl.removeAttribute("style");
    for (let navButton of navButtons) {
        navButton.removeAttribute("style");
    }
    sizeimg();
}

let nowimg = function () {
    let imgEl = document.getElementById("imgimg");
    let figCaption = document.getElementById("imgfigcaption");
    imgEl.src = Imgnav.imgFilepaths[Imgnav.curstate];
    imgEl.alt = Imgnav.imgCaptions[Imgnav.curstate];
    figCaption.innerHTML = Imgnav.imgCaptions[Imgnav.curstate];
    sizeimg();
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
let nextbutton = document.getElementById("figforwardbutton");

prevbutton.addEventListener("click", previmg);
nextbutton.addEventListener("click", nextimg);

// fullscreen button functionality
let fullscreenOff = function() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
            .then(() => { })
            .catch((err) => console.error(err))
    }
    flscrnbutton.innerHTML = "<img src='assets/expand.svg'> Fullscreen";
    flscrnbutton.removeEventListener("click", fullscreenOff);
    flscrnbutton.addEventListener("click", fullscreenOn);
    FSdownsize();
}

let fullscreenOn = function() {
    let imgshowcasediv = document.getElementsByClassName("imgshowcase")[0];
    imgshowcasediv.requestFullscreen();
    flscrnbutton.innerHTML = "<img src='assets/contract.svg'> Exit";
    flscrnbutton.removeEventListener("click", fullscreenOn);
    flscrnbutton.addEventListener("click", fullscreenOff);
    FSsizeimg();
}

let flscrnbutton = document.getElementById("figfullscreen");
if (document.fullscreenEnabled) {
    flscrnbutton.disabled = false;
    flscrnbutton.addEventListener("click", fullscreenOn);
} else {
    flscrnbutton.disabled = true;
}

let fsCatcher = function() {
    if (!document.fullscreenElement) {
        fullscreenOff();
    }
}
document.addEventListener("fullscreenchange", fsCatcher);

// image resizing assignment
let imgEl = document.getElementById("imgimg");
window.addEventListener("resize",sizeimg);

// add initial image on document load
let initimg = function() {
    nowimg();
}

document.onload = initimg()