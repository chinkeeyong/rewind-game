//Current time signature of the player within the track
var tracktime = 0;

//Rate and chronological direction of the playhead. -1 = rewind; 0 = pause; 1 = normal playback
var playdir = 0;
var playspeed = 2;

//Working variables used to display track time signature
var trackminutes = 0;
var trackminutesstring = "0";
var trackseconds = 0;
var tracksecondsstring = "0";
var trackframes = 0;
var trackframesstring = "0";

//Startpoint and endpoint animation speed
var bubblerotationspeed = 1.5;

//is the player currently running the level?
var running = false;

//used in level collision: are we out of bounds?
var outOfBounds = false;

//font styles
var trackUIstyle = { font: "bold 18px Tahoma", fill: "#FFFFFF" };
var noticestyle = { font: "18px Tahoma", fill: "#FFFFFF" };
var finalreportstyle = { font: "14px Tahoma", fill: "#FFFFFF" };

//pointer particle settings
var smallparticlespeed = 100;
var smallparticlelifespan = 300;
var framesPerParticle = 4;
var framesToNextParticle = 0;

//FX particle settings
var fxparticlespeed = 800;
var fxparticlelifespan = 500;

//Collision grace period in frames
var collisiongraceperiod = 3;
var collisiongraceremaining = 0;

//Final report messages
var finalreportfailtext = "Playback terminated. Click the starting point to try again.";
var finalreportsuccesstext = "Playback successful. Press SPACE to continue or R to reset.";