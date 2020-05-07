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

let buttondefocus = function() {
    let buttons = document.getElementsByClassName("imgnavbuttons");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor="transparent";
    }
}

let nowimg = function() {
    let imgEl = document.getElementById("imgimg");
    let figCaption = document.getElementById("imgfigcaption");
    imgEl.src = Imgnav.imgFilepaths[Imgnav.curstate];
    imgEl.alt = Imgnav.imgCaptions[Imgnav.curstate];
    figCaption.innerHTML = Imgnav.imgCaptions[Imgnav.curstate];
    // buttondefocus();
}

let nextimg = function() {
    Imgnav.curstate = mod((Imgnav.curstate + 1), Imgnav.imgCaptions.length);
    console.log(Imgnav.curstate);
    nowimg();
}

let previmg = function() {
    Imgnav.curstate = mod((Imgnav.curstate - 1), Imgnav.imgCaptions.length);
    console.log(Imgnav.curstate);
    nowimg();
}

let prevbutton = document.getElementById("figbackbutton");
let flscrnbutton = document.getElementById("figfullscreen");
let nextbutton = document.getElementById("figforwardbutton");

prevbutton.addEventListener("click", previmg);
// prevbutton.addEventListener("click", nextimg);
nextbutton.addEventListener("click", nextimg);