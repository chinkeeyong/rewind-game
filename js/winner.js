var WinnerState = {
    
    create: function () {
        
        // Title
        this.title = game.add.image(512, 164, "title");
        this.title.anchor.setTo(0.5, 0.5);
            
        // Endscreen
        this.endscreen = game.add.image(512, 384, "endscreen");
        this.endscreen.anchor.setTo(0.5, 0.5);
            
        // Replay button
        this.replaybutton = game.add.button(512, 624, "playbutton", this.loadLevel, this, 1, 0, 1);
        this.replaybutton.angle = 180;
        this.replaybutton.anchor.setTo(0.5, 0.5);
        
        musicforward.play("", 0, 1, true);
    
    },
    
    loadLevel: function () {
        
        transitionTarget = "MainMenu";
        game.state.start("Transition");
        
    }
    
};