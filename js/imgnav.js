let Imgnav = { imgEl: document.getElementById("imgimg"),
               imgCaption: document.getElementById("imgfigcaption"),
               imgCaptions: ["Joe Louis and Max Schmeling fight for the first time, 1936",
                             "Joe Louis and Max Schmeling as friends years later",
                             "Jack Dempsey as a young fighter",
                             "Sugar Ray Robinson with his wife, Edna Mae Holly",
                             "Jack Johnson as a young fighter"],
               imgFilepaths: ["../assets/boxer_joelouis_fight.jpg",
                              "../assets/boxer_joelouis_friends.jpg",
                              "../assets/boxer_jackdempsey.jpg",
                              "../assets/boxer_sugarray.jpg",
                              "../assets/boxer_jackjohnson.jpg"],
}

function upDate(previewPic) {
    /* In this function you should 
    1) change the url for the background image of the div with the id = "image" 
    to the source file of the preview image */
    let imagesource = previewPic.src;
    document.getElementById('image').style.backgroundImage = `url(${imagesource})`;
    /*
    2) Change the text  of the div with the id = "image" 
    to the alt text of the preview image */
    let imagealt = previewPic.alt;
    document.getElementById('image').innerHTML = imagealt;
}

function unDo() {
    /* In this function you should 
    1) Update the url for the background image of the div with the id = "image" 
    back to the orginal-image. You can use the css code to see what that original URL was */
    document.getElementById('image').style.backgroundImage = "url('')";

    /*
    2) Change the text of the div with the id = "image" 
    back to the original text. You can use the html code to see what that original text was */
    document.getElementById('image').innerHTML = "Hover over an image below to display here.";
}

let figdirs 
let figcapts

function nextpicture