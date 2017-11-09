var MainMenuState = {
    
    create: function () {
            
        // Title
        var title = game.add.image(game.world.centerX, game.world.centerY - 25, "title");
        title.anchor.setTo(0.5, 0.5);
            
        // Play button
        var playbutton = game.add.button(game.world.centerX, game.world.centerY + 100, "playbutton", loadLevel, this, 1, 0, 1);
        playbutton.anchor.setTo(0.5, 0.5);
    
    },
    
    update: function () {
        
        if (oneKey.isDown) {
            game.state.start("Level1");
        } else if (twoKey.isDown) {
            game.state.start("Level2");
        } else if (threeKey.isDown) {
            game.state.start("Level3");
        }
        
    }
    
};

var loadLevel = function () {
    
    game.state.start("Level1");
    
}