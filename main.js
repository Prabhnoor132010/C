song="";

scoreRW=0;
scoreLW=0;

rWX=0;
rWY=0;

lWX=0;
lWY=0;


function preload() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup() {
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotposes);

}


function modelLoaded() {
    console.log("Model Loaded");
}



function gotposes(results) {
    if (results.length > 0) {
        console.log(results)

        lWX=results[0].pose.leftWrist.x;
        lWY=results[0].pose.leftWrist.y;


        rWX=results[0].pose.rightWrist.x;
        rWY=results[0].pose.rightWrist.y;

        scoreLW=results[0].pose.keypoints[9].score;
        scoreRW=results[0].pose.keypoints[10].score;
    } 
}


function draw() {
    
    image(video,0,0,600,500);


    if (scoreLW>0.0099) {
        playing.song();
        song=loadSound("music.mp3");
        fill("blue");
        stroke("red");
        circle(lWX,lWY,13);
        document.getElementById("speed").innerHTML= "Song is playing";
    }


    if (scoreRW>0.0099) {
        playing.stop();
        song=loadSound("bdayaudio.mp3");
        fill("blue");
        stroke("red");
        circle(rWX,rWY,13);
        document.getElementById("speed").innerHTML= "Song is playing";
    }

    
}


function isPlaying() {
    playing.isPlaying();
}
