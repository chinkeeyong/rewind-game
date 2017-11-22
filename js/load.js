var spark;

var LoadState = {
    
    preload: function () {
        
        game.load.image("title", "assets/title.png");
        game.load.spritesheet("playbutton", "assets/playbutton.png", 64, 64);
        game.load.spritesheet("controls", "assets/controls.png", 163, 25);
        game.load.spritesheet("bubble", "assets/bubble.png", 50, 50);
        game.load.image("arrow", "assets/arrow.png");
        game.load.image("guard", "assets/guard.png");
        game.load.image("doubleguard", "assets/doubleguard.png");
        
        game.load.image("level-1", "assets/level-1.png");
        
        game.load.image("level-2", "assets/level-2.png");
        game.load.image("level-2-mob1", "assets/level-2-mob1.png");
        
        game.load.image("level-3", "assets/level-3.png");
        
        game.load.image("level-6", "assets/level-6.png");
        
        game.load.image("level-7", "assets/level-7.png");
        game.load.image("level-7-over", "assets/level-7-over.png");
        
        game.load.image("endscreen", "assets/endscreen.png");
        
        game.load.audio("electrodynamix", ["assets/electrodynamix.mp3", "assets/electrodynamix.ogg"]);
        game.load.audio("electrodynamix-bass", ["assets/electrodynamix-bass.mp3", "assets/electrodynamix-bass.ogg"]);
        game.load.audio("electrodynamix-reversed", ["assets/electrodynamix-reversed.mp3", "assets/electrodynamix-reversed.ogg"]);
        game.load.audio("cymbal", "assets/cymbal.wav");
        game.load.audio("rscratch", "assets/rscratch.wav");
        
    },
    
    create: function () {
        
        //This game runs at 50 fps
        game.time.advancedTiming = true;
        game.time.desiredFps = 50;
        
        //Draw pointer spark graphics
        sparkgraphics = game.add.graphics();
        sparkgraphics.beginFill(0xffffff);
        sparkgraphics.drawCircle(0, 0, 6);
        sparkgraphics.endFill();
        pointerspark = sparkgraphics.generateTexture();
        sparkgraphics.destroy();
        
        //Draw FX spark graphics
        sparkgraphics = game.add.graphics();
        sparkgraphics.beginFill(0xffffff);
        sparkgraphics.drawCircle(0, 0, 10);
        sparkgraphics.endFill();
        fxspark = sparkgraphics.generateTexture();
        sparkgraphics.destroy();

        //Setup key listeners
        AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        SKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        RKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        Spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = game.input.keyboard.createCursorKeys();
        
        oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        fourKey = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        fiveKey = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        sixKey = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        sevenKey = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
        eightKey = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
        
        //Setup audio
        
        musicforward = game.add.audio("electrodynamix", 1, true);
        musicbackward = game.add.audio("electrodynamix-reversed", 1, true);
        musicpaused = game.add.audio("electrodynamix-bass", 1, true);
        cymbal = game.add.audio("cymbal");
        rscratch = game.add.audio("rscratch");
        
        currentmusic = musicpaused;
    
        game.state.start("MainMenu");
    
    }

};