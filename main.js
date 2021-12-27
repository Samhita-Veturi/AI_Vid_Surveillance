r = 0;
g = 0;
b = 0;
Video = "";
Obj_Detector = "";
Status = "";
var Objects = [];
function preload(){
    Video = createVideo('video.mp4');
    Video.hide();
}
function setup(){
    Canvas = createCanvas(500, 400);
    Canvas.center();
}
function Start(){
    Obj_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Object Status: Detecting Objects...."
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    Video.loop();
    Video.speed(1);
    Video.volume(0);
}
function draw(){
    image(Video, 0, 0, 500, 400);
    r = random(255);
    g = random(255);
    b = random(255);
    document.getElementById("Footer").style.backgroundColor = "rgb(" + r + ", " + g + ", " + b +")";
    if(Status != ""){
        Obj_Detector.detect(Video, gotResults);
        for(i = 0; i < Objects.length; i++){
            document.getElementById("Status").innerHTML = "Object Status: Objects Detected!";
            document.getElementById("Omega").innerHTML = "No. of objects detected: " + Objects.length;

            fill(r, g, b);
            noFill();
            Percentage = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + Percentage + "%", Objects[i].x + 10, Objects[i].y + 20);
            textSize(15);
            stroke(r, g, b);
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    Objects = results;
}