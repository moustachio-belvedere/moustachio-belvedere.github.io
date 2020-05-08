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
    let figheightwithcaption = figEl.clientHeight;
    let figheight = figheightwithcaption - 25;
    let natwidth = Imgnav.natWidth[Imgnav.curstate];
    let natheight = Imgnav.natHeight[Imgnav.curstate];
    let aspectratio = natwidth / natheight;
    if (natheight > natwidth || figwidth / aspectratio > figheight) {
        imgEl.style.width = `${figheight * aspectratio}px`;
        imgEl.style.height = `${figheight}px`;
    } else {
        imgEl.style.height = `${figwidth / aspectratio}px`;
        imgEl.style.width = `${figwidth}px`;
    }
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
    document.exitFullscreen();
    flscrnbutton.innerHTML = "<img src='assets/expand.svg'> Fullscreen";
    flscrnbutton.removeEventListener("click", fullscreenOff);
    flscrnbutton.addEventListener("click", fullscreenOn);
}

let fullscreenOn = function() {
    let imgshowcasediv = document.getElementsByClassName("imgshowcase")[0];
    imgshowcasediv.requestFullscreen();
    flscrnbutton.innerHTML = "<img src='assets/contract.svg'> Exit Fullscreen";
    flscrnbutton.removeEventListener("click", fullscreenOn);
    flscrnbutton.addEventListener("click", fullscreenOff);
}

let flscrnbutton = document.getElementById("figfullscreen");
if (document.fullscreenEnabled) {
    flscrnbutton.disabled = false;
    flscrnbutton.addEventListener("click", fullscreenOn);
} else {
    flscrnbutton.disabled = true;
}

// image resizing assignment
let imgEl = document.getElementById("imgimg");
window.addEventListener("resize",sizeimg);

// add initial image on document load
let initimg = function() {
    nowimg();
}

document.onload = initimg()