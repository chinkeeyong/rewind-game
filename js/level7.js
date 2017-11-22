var Level7State = {
    
    create: function () {
        
        /*
        
        Editable Variables Here
        
        */
        
        //ID of this track
        this.trackid = 7;
        
        //Length of this track in centiseconds
        this.tracklength = 504;
        
        //Level layout
        
        this.level = game.add.group();
        
        this.levelstatic = game.add.sprite(62, 126, "level-7", null, this.level);
        
        //Level obstacles
        this.obstacles = game.add.group();
        
        this.guard1 = game.add.sprite(130, 296, "guard", null, this.obstacles);
        this.guard2 = game.add.sprite(130, 461, "guard", null, this.obstacles);
        this.guard3 = game.add.sprite(130, 623, "doubleguard", null, this.obstacles);
        this.guard4 = game.add.sprite(310, 535, "guard", null, this.obstacles);
        this.guard5 = game.add.sprite(448, 705, "guard", null, this.obstacles);
        this.guard6 = game.add.sprite(579, 535, "guard", null, this.obstacles);
        this.guard7 = game.add.sprite(712, 705, "guard", null, this.obstacles);
        
        this.guard1.anchor.setTo(0.17657342657, 0.17657342657);
        this.guard2.anchor.setTo(0.17657342657, 0.17657342657);
        this.guard3.anchor.setTo(0.5, 0.5);
        this.guard4.anchor.setTo(0.17657342657, 0.17657342657);
        this.guard5.anchor.setTo(0.17657342657, 0.17657342657);
        this.guard6.anchor.setTo(0.17657342657, 0.17657342657);
        this.guard7.anchor.setTo(0.17657342657, 0.17657342657);
        
        this.hgatesprite = game.add.graphics();
        this.hgatesprite.beginFill(0x333333);
        this.hgatesprite.drawRect(0, 0, 133, 16.87);
        this.hgatesprite.drawRect(266.14, 0, 133, 16.87);
        this.hgatesprite.endFill();
        
        this.hgate1 = game.add.sprite(329, 228, this.hgatesprite.generateTexture(), null, this.obstacles);
        this.hgate3 = game.add.sprite(292, 406, this.hgatesprite.generateTexture(), null, this.obstacles);
        
        this.hgatesprite.beginFill(0x333333);
        this.hgatesprite.drawRect(0, 0, 400.14, 16.87);
        this.hgatesprite.endFill();
        
        this.hgate2 = game.add.sprite(310, 316, this.hgatesprite.generateTexture(), null, this.obstacles);
        
        this.hgatesprite.destroy();
        
        this.vgatesprite = game.add.graphics();
        this.vgatesprite.beginFill(0x333333);
        this.vgatesprite.drawRect(0, 0, 16.87, 88.36);
        this.vgatesprite.drawRect(0, 140.34, 16.87, 125.81);
        this.vgatesprite.endFill();
        
        this.vgate1 = game.add.sprite(369, 213, this.vgatesprite.generateTexture(), null, this.obstacles);
        this.vgate2 = game.add.sprite(502, 176, this.vgatesprite.generateTexture(), null, this.obstacles);
        
        this.vgatesprite.beginFill(0x333333);
        this.vgatesprite.drawRect(0, 0, 16.87, 266.14);
        this.vgatesprite.endFill();
        
        this.vgate3 = game.add.sprite(638, 213, this.vgatesprite.generateTexture(), null, this.obstacles);
        
        this.vgatesprite.destroy();
        
        this.doubleguard1 = game.add.sprite(893, 296, "doubleguard", null, this.obstacles);
        this.doubleguard2 = game.add.sprite(893, 461, "doubleguard", null, this.obstacles);
        this.doubleguard3 = game.add.sprite(893, 623, "doubleguard", null, this.obstacles);
        
        this.doubleguard1.anchor.setTo(0.5, 0.5);
        this.doubleguard2.anchor.setTo(0.5, 0.5);
        this.doubleguard3.anchor.setTo(0.5, 0.5);
        
        this.obststatic = game.add.sprite(0, 176, "level-7-over", null, this.obstacles);
        
        //Startpoint position
        this.startx = 130;
        this.starty = 194;
        
        //Endpoint position
        this.endx = 893;
        this.endy = 194;
        
        //Name of the next level's state
        this.nextlevel = "Winner";
        
        /*
        
        Level Unique Objects
        
        */
        
        /*
        
        End of Editable Variables
        
        */
        
        //Start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
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
        
        this.guard1.angle = 45 + (tracktime * 1.5);
        this.guard2.angle = 135 + (tracktime * 1);
        this.guard3.angle = -135 - (tracktime * 0.5);
        
        this.guard4.angle = 45 + (45 * Math.sin(tracktime/40));
        this.guard5.angle = -135 + (45 * Math.sin(tracktime/40));
        this.guard6.angle = 45 + (45 * Math.sin(tracktime/40));
        this.guard7.angle = -135 + (45 * Math.sin(tracktime/40));
        
        this.hgate1.x = 310.5 + (47 * Math.cos(tracktime/4));
        this.hgate2.x = 310.5 - (47 * Math.cos(tracktime/6));
        this.hgate3.x = 310.5 - (47 * Math.cos(tracktime/8));
        
        this.vgate1.y = 194.5 + (18.5 * Math.cos(tracktime/4));
        this.vgate2.y = 194.5 - (18.5 * Math.cos(tracktime/6));
        this.vgate3.y = 194.5 + (18.5 * Math.cos(tracktime/8));
        
        this.doubleguard1.angle = -45 - (tracktime * 0.5);
        this.doubleguard2.angle = 45 - (tracktime * 1.5);
        this.doubleguard3.angle = -45 - (tracktime * 0.5);
        
        this.doubleguard2.y = 461 - (20 * Math.sin(tracktime/40));
        
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
        
    },
    
    makeMouseFX: function() {
        
        this.fxemitter.x = game.input.mousePointer.x;
        this.fxemitter.y = game.input.mousePointer.y;
        this.fxemitter.start(true, fxparticlelifespan, null, 10);
        
    }

};