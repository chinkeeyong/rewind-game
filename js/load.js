var spark;

var LoadState = {
    
    preload: function () {
        
        game.load.image("title", "assets/title.png");
        game.load.spritesheet("playbutton", "assets/playbutton.png", 64, 64);
        game.load.spritesheet("controls", "assets/controls.png", 163, 25);
        game.load.spritesheet("bubble", "assets/bubble.png", 50, 50);
        game.load.spritesheet("arrow", "assets/arrow.png", 54, 30);
        
        game.load.image("level-1", "assets/level-1.png");
        
        game.load.image("level-2", "assets/level-2.png");
        game.load.image("level-2-mob1", "assets/level-2-mob1.png");
        
        game.load.image("level-3", "assets/level-3.png");
        
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
    
        game.state.start("MainMenu");
    
    }

};