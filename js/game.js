var game = new Phaser.Game(1024, 768, Phaser.AUTO, "canvas");
    
game.state.add("Load", LoadState);
game.state.add("MainMenu", MainMenuState);
game.state.add("Level1", Level1State);
game.state.add("Level2", Level2State);
game.state.add("Level3", Level3State);
game.state.add("Level4", Level4State);
game.state.add("Level5", Level5State);
game.state.add("Level6", Level6State);
game.state.add("Level7", Level7State);
        
game.state.start("Load");