var Level1State = {
    
    create: function () {
        
        /*
        
        Editable Variables Here
        
        */
        
        //ID of this track
        this.trackid = 1;
        
        //Length of this track in centiseconds
        this.tracklength = 2000;
        
        //Level layout
        this.level = game.add.group();
        this.levelstatic = game.add.sprite(88, 276, "level-1", null, this.level);
        
        //Level obstacles
        this.obstacles = game.add.group();
        
        //Startpoint position
        this.startx = 156;
        this.starty = 375;
        
        //Endpoint position
        this.endx = 864;
        this.endy = 388;
        
        //Name of the next level's state
        this.nextlevel = "Level2";
        
        /*
        
        Level Unique Objects
        
        */
        
        //Tutorial sign 1
        
        this.tutsign1 = game.add.group();
        
        this.tutsign1arrow = game.add.sprite(155, 480, "arrow", 0, this.tutsign1);
        this.tutsign1arrow.anchor.setTo(0.5, 0.5);
        
        this.tutsign1text = game.add.text(105, 503, "START HERE", noticestyle, this.tutsign1);
        
        this.tutsign1tween = game.add.tween(this.tutsign1)
            .to ({ y: this.tutsign1.y - 5 }, 150, Phaser.Easing.Bounce.InOut, true, 0, -1, true);
        
        //Tutorial sign 2
        
        this.tutsign2 = game.add.group();
        
        this.tutsign2arrow = game.add.sprite(863, 294, "arrow", 0, this.tutsign2);
        this.tutsign2arrow.anchor.setTo(0.5, 0.5);
        this.tutsign2arrow.angle = 180;
        
        this.tutsign2text = game.add.text(781, 250, "MOVE MOUSE HERE", noticestyle, this.tutsign2);
        
        this.tutsign2tween = game.add.tween(this.tutsign2)
            .to ({ y: this.tutsign2.y - 5 }, 150, Phaser.Easing.Bounce.InOut, true, 0, -1, true);
        
        this.tutsign2.alpha = 0;
        
        //Tutorial sign 3
        
        this.tutsign3 = game.add.text(340, 307, "DON'T TOUCH THE WALLS", noticestyle);
        this.tutsign3.anchor.setTo(0.5, 0.5);
        this.tutsign3.angle = -14;
        this.tutsign3.alpha = 0;
        
        /*
        
        End of Editable Variables
        
        */
        
        //Track UI text in upper left
        this.tracktext = game.add.text(16, 16, "", trackUIstyle);
        
        //Track progress bar
        this.trackbar = game.add.graphics();
        
        //Controls UI
        this.controls = game.add.image(17, 51, "controls", 0);
        
        //Place startpoint
        this.startpoint = game.add.button(this.startx, this.starty, "bubble", this.startRun, this, 1, 0, 1);
        this.startpoint.anchor.setTo(0.5, 0.5);
        
        //Place endpoint
        this.endpoint = game.add.sprite(this.endx, this.endy, "bubble", 1);
        this.endpoint.anchor.setTo(0.5, 0.5);
        this.endpoint.events.onInputOver.add(this.finishRun, this);
        
        //Place final report text
        this.finalreport = game.add.text(16, 85, "", finalreportstyle);
        
        //This becomes true when the player finishes the level successfully
        this.runsucceeded = false;
        
        //Create pointer emitter
        this.pointeremitter = game.add.emitter(0, 0, 100);
        this.pointeremitter.gravity = 0;
        this.pointeremitter.makeParticles(pointerspark);
        this.pointeremitter.setXSpeed(-smallparticlespeed, smallparticlespeed);
        this.pointeremitter.setYSpeed(-smallparticlespeed, smallparticlespeed);
        
        //Create FX emitter
        this.fxemitter = game.add.emitter(0, 0, 20);
        this.fxemitter.gravity = 0;
        this.fxemitter.makeParticles(fxspark);
        this.fxemitter.setXSpeed(-fxparticlespeed, fxparticlespeed);
        this.fxemitter.setYSpeed(-fxparticlespeed, fxparticlespeed);
        
        //Reset track time
        tracktime = 0;
        
        //Initialize mobiles, track UI, music
        this.updateMobiles();
        this.updateTrackUI();
        
        game.sound.stopAll();
        musicpaused.play("", 0, 1, true);
        musicforward.play("", 0, 0, true);
        musicbackward.play("", 0, 0, true);
        
        
    },
    
    update: function () {
        
        //If player is running the level...
        if (running) {
            
            //Tick down collision grace period if we still have any
            if (collisiongraceremaining > 0) {
                
                collisiongraceremaining--;
                
            } else { //...otherwise, fail the run if pointer is not touching a part of the level
                
                outOfBounds = true;
                
                this.level.forEach(function(component) {
                    
                    if (component.input.pointerOver()) { 
                        outOfBounds = false;
                    }
                    
                }, this);
                
                //or touching an obstacle
                
                this.obstacles.forEach(function(component) {
                    
                    if (component.input.pointerOver()) { 
                        outOfBounds = true;
                    }
                    
                }, this);
            
                if (outOfBounds) {
                    this.failRun();
                }
                
            }
            
            //Check for keyboard inputs
            if (AKey.isDown || cursors.left.isDown) {
                playdir = -1;
                this.controls.frame = 1;
                musicforward.volume = 0;
                musicpaused.volume = 0;
                musicbackward.volume = 1;
            
            } else if (SKey.isDown || cursors.down.isDown) {
                playdir = 0;
                this.controls.frame = 2;
                musicforward.volume = 0;
                musicpaused.volume = 1;
                musicbackward.volume = 0;
            
            } else if (DKey.isDown || cursors.right.isDown) {
                playdir = 1;
                this.controls.frame = 3;
                musicforward.volume = 1;
                musicpaused.volume = 0;
                musicbackward.volume = 0;
            
            }
        
            //Increment the track time
            tracktime += playdir * playspeed;
        
            //If track is at start, stop rewinding
            if (tracktime < 0) {
                tracktime = 0;
                playdir = 0;
                this.controls.frame = 2;
                musicforward.volume = 0;
                musicpaused.volume = 1;
                musicbackward.volume = 0;
            }
        
            //If track is at end, stop playing
            if (tracktime > this.tracklength) {
                tracktime = this.tracklength;
                playdir = 0;
                this.controls.frame = 2;
                musicforward.volume = 0;
                musicpaused.volume = 1;
                musicbackward.volume = 0;
            }
            
            //Make mouse particles
            if (framesToNextParticle === 0) {
                this.pointeremitter.start(true, smallparticlelifespan, 0, 1);
                framesToNextParticle = framesPerParticle;
            } else {
                framesToNextParticle--;
            }
            
            //Update mobiles
            this.updateMobiles();
            
            //Update track UI
            this.updateTrackUI();
    
        } else {
            
            //If mouse is hovering over startpoint...
            if (this.startpoint.input.pointerOver()) {
                
                //Make mouse particles
                if (framesToNextParticle === 0) {
                    this.pointeremitter.start(true, smallparticlelifespan, 0, 1);
                    framesToNextParticle = framesPerParticle;
                } else {
                    framesToNextParticle--;
                }
                
            }
            
        }
        
        //Check for reset input
        if (RKey.isDown || cursors.up.isDown) {
            this.resetRun();
        }
        
        //Check for next level input
        if (Spacebar.isDown && this.runsucceeded) {
            transitionTarget = this.nextlevel;
            game.state.start("Transition");
        }
        
        //Rotate the startpoint and endpoint
        this.startpoint.angle += bubblerotationspeed;
        if (this.startpoint.angle > 180) {
            this.startpoint.angle -= 360;
        }
        this.endpoint.angle += bubblerotationspeed;
        if (this.endpoint.angle > 180) {
            this.endpoint.angle -= 360;
        }
        
        //Make mouse emitter follow mouse
        this.pointeremitter.x = game.input.mousePointer.x;
        this.pointeremitter.y = game.input.mousePointer.y;
        
        //Adjust mouse emitter particle scale
        this.pointeremitter.forEachAlive(function(p){
            p.height = 6 * p.lifespan / p.parent.lifespan;
            p.width = p.height;
        });
        
        //Adjust FX emitter particle scale
        this.fxemitter.forEachAlive(function(p){
            p.height = 10 * p.lifespan / p.parent.lifespan;
            p.width = p.height;
        });
        
    },
    
    updateTrackUI: function () {
    
        //Parse the track time into minutes, seconds, and frames (centiseconds)
        trackframes = tracktime;
 
        trackminutes = trackframes / 6000;
        trackminutes = Math.floor(trackminutes);
        trackminutesstring = trackminutes.toString();
        while (trackminutesstring.length < 2) {
            trackminutesstring = "0" + trackminutesstring;
        }
        trackframes = trackframes % 6000;

        trackseconds = trackframes / 100;
        trackseconds = Math.floor(trackseconds);
        tracksecondsstring = trackseconds.toString();
        while (tracksecondsstring.length < 2) {
            tracksecondsstring = "0" + tracksecondsstring;
        }
        trackframes = trackframes % 100;

        trackframesstring = trackframes.toString();
        while (trackframesstring.length < 2) {
            trackframesstring = "0" + trackframesstring;
        }
        
        //Update the track UI text
        this.tracktext.text = "TRACK " + this.trackid.toString() + " " + trackminutesstring + ":" + tracksecondsstring + ":" + trackframesstring;
        
        //Update the track progress bar
        this.trackbar.beginFill(0x444444);
        this.trackbar.drawRect(17, 40, 163, 3);
        this.trackbar.endFill();
        switch (this.controls.frame) {
            case 1:
                this.trackbar.beginFill(0x00ffff);
                break;
            case 2:
                this.trackbar.beginFill(0xffaa00);
                break;
            case 3:
                this.trackbar.beginFill(0x00ff00);
                break;
            default:
                this.trackbar.beginFill(0xff0000);
        }
        this.trackbar.drawRect(17, 40, (163 * tracktime) / this.tracklength, 3);
        this.trackbar.endFill();
    
    },
    
    updateMobiles: function () {
        
    },
    
    startRun: function() {
        
        if (!running) {
            
            //Switch off final report message
            this.finalreport.text = "";
            
            //Now we are running the level
            running = true;
            
            //Play the track from the start
            tracktime = 0;
            playdir = 1;
            this.controls.frame = 3;
        
            game.sound.stopAll();
            musicpaused.play("", 0, 0, true);
            musicforward.play("", 0, 1, true);
            musicbackward.play("", 0, 0, true);
            
            //Disable the startpoint
            this.startpoint.setFrames(1, 1, 1, 1);
            this.startpoint.inputEnabled = false;
            
            //Enable the endpoint
            this.endpoint.frame = 0;
            this.endpoint.inputEnabled = true;
            
            //Start level collision
            collisiongraceremaining = collisiongraceperiod;
            this.level.forEach(function(item) {
                
                item.inputEnabled = true;
                item.input.pixelPerfectOver = true;
                
            }, this);
            this.obstacles.forEach(function(item) {
                
                item.inputEnabled = true;
                item.input.pixelPerfectOver = true;
                
            }, this);
            
            //Make mouse FX
            this.makeMouseFX();
            
            //Switch to mid-run tutorial message
            this.tutsign1.alpha = 0;
            this.tutsign2.alpha = 1;
            this.tutsign3.alpha = 1;
            
        }
        
    },
    
    endRun: function() {
        
        if (running) {
            
            //We are no longer playing the level
            running = false;
            
            //Pause the track
            playdir = 0;
            this.controls.frame = 2;
            
            //Disable the endpoint
            this.endpoint.frame = 1;
            this.endpoint.inputEnabled = false;
            
            //Stop level collision
            this.level.setAll('inputEnabled', false);
            this.obstacles.setAll('inputEnabled', false);
            
            //Switch off mid-run tutorial message
            this.tutsign2.alpha = 0;
            this.tutsign3.alpha = 0;
            
        }
        
    },
    
    failRun: function() {
        
        if (running) {
            
            this.endRun();
            this.makeMouseFX();
            
            game.sound.stopAll();
            rscratch.play();
            
            //Enable the startpoint
            this.startpoint.setFrames(1, 0, 1, 0);
            this.startpoint.inputEnabled = true;
            
            //Show failure message
            this.finalreport.text = finalreportfailtext;
            
        }
        
    },
    
    finishRun: function() {
        
        if (running) {
            
            this.endRun();
            this.updateTrackUI();
            this.makeMouseFX();
            
            game.sound.stopAll();
            cymbal.play();
            
            //Run succeeded
            this.runsucceeded = true;
            
            //Show success message
            this.finalreport.text = finalreportsuccesstext;
            
        }
        
    },
    
    resetRun: function() {
        
        this.endRun();
        
        //Reset the track
        tracktime = 0;
        this.controls.frame = 0;
        this.updateMobiles();
        this.updateTrackUI();
        
        game.sound.stopAll();
        musicpaused.play("", 0, 1, true);
        musicforward.play("", 0, 0, true);
        musicbackward.play("", 0, 0, true);
            
        //Enable the startpoint
        this.startpoint.setFrames(1, 0, 1, 0);
        this.startpoint.inputEnabled = true;
        
        //Turn off final report message
        this.finalreport.text = "";
        
        //Reset run success
        this.runsucceeded = false;
        
        //Reset first tutorial message
        this.tutsign1.alpha = 1;
        
    },
    
    makeMouseFX: function() {
        
        this.fxemitter.x = game.input.mousePointer.x;
        this.fxemitter.y = game.input.mousePointer.y;
        this.fxemitter.start(true, fxparticlelifespan, null, 10);
        
    }

};