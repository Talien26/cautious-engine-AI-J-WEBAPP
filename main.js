var song = '';
var leftWristX = '';
var leftWristY = '';
var rightWristX = '';
var rightWristy = '';
var scoreLeftWrist = ' ';
var scoreRightWrist = ' ';

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}
function modelLoaded(){
    console.log('PoseNet is initialized!')
} 
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#F4F5FF");
    stroke("#40E0D0");

    if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    innumberleftWristX = Number(leftWristX);
    set_decimal = floor(innumberleftWristX);
    Volume = set_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + Volume;

}
if(scoreRightWrist > 0.2)
{
    fill("#F4F5FF");
    stroke("#40E0D0");  
    circle(rightWristX, rightWristy, 20);

    if(rightWristy > 0 && rightWristy <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
        song.rate(0.5);
    }
    else if(rightWristy > 100 && rightWristy <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x"
        song.rate(1);
    }
    else if(rightWristy > 200 && rightWristy <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
        song.rate(1.5);
    }
    else if(rightWristy > 300 && rightWristy <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x"
        song.rate(2);
    }
    else if(rightWristy > 400 && rightWristy <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x"
        song.rate(2.5);
    }
}

}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Right Wrist = " + scoreRightWrist + " & Score Left Wrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftWristX + " And Left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightWristX + " And right wrist Y = " + rightWristy);
    }
}