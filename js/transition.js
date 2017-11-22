var TransitionState = {
    
    create: function () {
        
        this.staticbmd = game.make.bitmapData(256, 192);
        this.staticimg = this.staticbmd.addToWorld(0, 0, 0, 0, 4, 4);
        
        /*this.transitiontext1 = game.add.text(512, 210, "PLEASE", { font: "bold 300px Tahoma", fill: "#000000" });
        this.transitiontext1.anchor.setTo(0.5, 0.5);
        this.transitiontext1.alpha = 0.3;
        
        this.transitiontext2 = game.add.text(512, 510, "WAIT", { font: "bold 400px Tahoma", fill: "#000000" });
        this.transitiontext2.anchor.setTo(0.5, 0.5);
        this.transitiontext2.alpha = 0.3;*/
        
        this.transitionTimeLeft = transitionDuration;
        
        game.sound.stopAll();
        noise.play();
    
    },
    
    update: function () {
        
        this.transitionTimeLeft--;
        
        if (this.transitionTimeLeft <= 0) {
            
            game.sound.stopAll();
            game.state.start(transitionTarget);
            
        } else {
            
            this.staticbmd.processPixelRGB(randomBrightness, this, 0, 0, 256, 192);
            
        }
        
    }
    
};

var randomBrightness = function () {
        
    var brightness = Math.ceil(Math.random() * 200);
    return {r: brightness, g: brightness, b: brightness, a: 255};
        
}