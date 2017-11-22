var WinnerState = {
    
    create: function () {
        
        // Title
        this.title = game.add.image(game.world.centerX, game.world.centerY - 220, "title");
        this.title.anchor.setTo(0.5, 0.5);
            
        // Endscreen
        this.endscreen = game.add.image(game.world.centerX, game.world.centerY, "endscreen");
        this.endscreen.anchor.setTo(0.5, 0.5);
            
        // Replay button
        this.replaybutton = game.add.button(game.world.centerX, game.world.centerY + 240, "playbutton", this.loadLevel, this, 1, 0, 1);
        this.replaybutton.angle = 180;
        this.replaybutton.anchor.setTo(0.5, 0.5);
    
    },
    
    loadLevel: function () {
    
        game.state.start("MainMenu");
        
    }
    
};