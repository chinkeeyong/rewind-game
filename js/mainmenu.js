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
            game.state.start("Level1");
        } else if (twoKey.isDown) {
            game.state.start("Level2");
        } else if (threeKey.isDown) {
            game.state.start("Level3");
        } else if (fourKey.isDown) {
            game.state.start("Level4");
        } else if (fiveKey.isDown) {
            game.state.start("Level5");
        } else if (sixKey.isDown) {
            game.state.start("Level6");
        } else if (sevenKey.isDown) {
            game.state.start("Level7");
        } else if (eightKey.isDown) {
            game.state.start("Winner");
        }
        
    },
    
    loadLevel: function () {
    
        game.state.start("Level1");
        
    }
    
};