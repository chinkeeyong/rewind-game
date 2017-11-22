var MainMenuState = {
    
    create: function () {
            
        // Title
        this.title = game.add.image(game.world.centerX, game.world.centerY - 25, "title");
        this.title.anchor.setTo(0.5, 0.5);
            
        // Play button
        this.playbutton = game.add.button(game.world.centerX, game.world.centerY + 100, "playbutton", this.loadLevel, this, 1, 0, 1);
        this.playbutton.anchor.setTo(0.5, 0.5);
    
    },
    
    update: function () {
        
        if (oneKey.isDown) {
            transitionTarget = "Level1";
            game.state.start("Transition");
        } else if (twoKey.isDown) {
            transitionTarget = "Level2";
            game.state.start("Transition");
        } else if (threeKey.isDown) {
            transitionTarget = "Level3";
            game.state.start("Transition");
        } else if (fourKey.isDown) {
            transitionTarget = "Level4";
            game.state.start("Transition");
        } else if (fiveKey.isDown) {
            transitionTarget = "Level5";
            game.state.start("Transition");
        } else if (sixKey.isDown) {
            transitionTarget = "Level6";
            game.state.start("Transition");
        } else if (sevenKey.isDown) {
            transitionTarget = "Level7";
            game.state.start("Transition");
        } else if (eightKey.isDown) {
            transitionTarget = "Winner";
            game.state.start("Transition");
        }
        
    },
    
    loadLevel: function () {
    
        transitionTarget = "Level1";
        game.state.start("Transition");
        
    }
    
};