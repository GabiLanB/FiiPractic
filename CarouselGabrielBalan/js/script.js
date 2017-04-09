

var a = setInterval("changeImage(1)", 3000);
function reset() {

    clearInterval(a);
    a = setInterval("changeImage(1)", 3000);

}
var carousel = {
    images: ["img/slide1.jpg", "img/slide2.jpg", "img/slide3.jpg", "img/slide4.jpg", "img/slide5.jpg"], //array to store the images
    caption: ["ROME, ITALY: THE ETERNAL CITY", // caption array
			"LONDON - Great architecture, modern and historic living together side by side.",
			"Whatever you are looking for in a city you’ll find it in AMSTERDAM",
			"PARIS: Love, art, culture, fashion, gastronomy, history and architecture.",
			"Barcelona - boundless culture, fabled architecture and a world-class drinking and dining scene."],
    city: ["ROME", "LONDON", "AMSTERDAM", "PARIS", "BARCELONA"]
}
var imageNumber = 0; //create a variable to keep track the image number
var imageLength = carousel.images.length - 1; // to keep track the image legth
var caption = document.getElementById("caption");
var slideshow = document.getElementById("slideshow"); 
function animateCapture(){
    caption.animate([{ transform: 'translate(20px, 20px)' }, 
                    { transform: 'translate(0)' }], { 
                    duration: 2900});
}
var  animateCap = animateCapture(); //use this var to call the function when page load
function animateImage(){
    slideshow.animate([{ transform: 'scale(0.97,0.97)' }, 
                    { transform: 'scale(1,1)' }], { 
                    duration: 3000});
}
var animateImg = animateImage(); //use this var to call the function when page load
var clickDot = document.getElementsByClassName("dotsChild"); //make an array with dotsChild's class
function createDots() { //to create the DOTS image
    for (var i = 0; i < carousel.images.length; i++) {
        var dotsChild = document.createElement("DIV");
        var dotsImg = document.createElement("IMG");
        var dostCapture = document.createElement("P");
        dotsImg.src = carousel.images[i];
        dostCapture.innerHTML = carousel.city[i];
        dotsChild.appendChild(dotsImg);
        dotsChild.appendChild(dostCapture);
        document.getElementById("dots").appendChild(dotsChild);
        dotsChild.classList.add("dotsChild");
    }
}
function changeImage(x,i) { //x is the number that we're on in the array
    imageNumber += x;
    if (imageNumber > imageLength) { //if we reached end of the array....start over
        imageNumber = 0;
    }
    if (imageNumber < 0) { //on back to the first image-->go to the end of the array
        imageNumber = imageLength;
    }
    if(i!==undefined){
        imageNumber = i;
        setTimeout(reset(imageNumber),3000);
    }  
    for (var i = 0; i < clickDot.length; i++) {
         clickDot[i].style.filter = "blur(3px)"; //
     } 
    clickDot[imageNumber].style.filter = "blur(0)"; //
    slideshow.src = carousel.images[imageNumber];
    caption.innerHTML = carousel.caption[imageNumber];
    animateCapture();  
    animateImage();
    return false;
}
function dotClick() {
    for (var i = 0; i < clickDot.length; i++) {
        console.log(clickDot[i]);
        clickDot[i].addEventListener(
            'click', 
          (function(i) {
                return function(event) {
                changeImage(0,i);
              };
          })(i)
        );
    }
}
dotClick();