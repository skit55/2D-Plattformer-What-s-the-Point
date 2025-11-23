import * as me from 'melonjs';
import game from './../../game.js';

/**
 * a basic control to toggle fullscreen on/off
 */
class FSControl extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            region : "shadedDark30"
        });
        this.setOpacity(0.5);
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (!me.device.isFullscreen()) {
            me.device.requestFullscreen();
        } else {
            me.device.exitFullscreen();
        }
        return false;
    }
};

/**
 * a basic control to toggle fullscreen on/off
 */
class AudioControl extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            region : "shadedDark13" // ON by default
        });
        this.setOpacity(0.5);
        this.isMute = false;
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.5);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (this.isMute) {
            me.audio.unmuteAll();
            this.setRegion(game.texture.getRegion("shadedDark13"));
            this.isMute = false;
        } else {
            me.audio.muteAll();
            this.setRegion(game.texture.getRegion("shadedDark15"));
            this.isMute = true;
        }
        return false;
    }
};


class TextBox extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the super constructor
        super(
            me.game.viewport.width/2,
            me.game.viewport.height/3,
            {
                font : "PressStart2P",
                textAlign : "center",
                textBaseline : "bottom",
                text : "",
                //lineHeight: 10,
            }
        );

        //this.resize(0.8)
        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w/2, h/3, 0);
        }).bind(this));
    }

    displayText(text, duration=2500){
        this.setText(text);
        setTimeout(()=>{
            this.setText("");
        }, duration)
    }

    displayTexts(texts, each_duration=2500, pause=500){
        this.setText(texts[0]);
        setTimeout(()=>{
            this.setText("");
            setTimeout(()=>{
                if(texts.length >= 1){
                    texts.shift();
                    this.displayTexts(texts);
                }
            }, pause);
        }, each_duration);
    }
};

class HealthIndicator extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(
            me.game.viewport.width + x -10,
            y,
            {
                image: game.texture,
                region : "heart" // ON by default
            }
        );

        this.relative = new me.Vector2d(x -10, y);
        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w, 0, 0).add(this.relative);
        }).bind(this));
    }
    /**
    * update function
    */
    update( dt ) {
        if (this.life !== game.data.life) {
            this.life = game.data.life;
            if (this.index <= this.life){
                this.setOpacity(1);
            } else {
                this.setOpacity(0.05);
            }
            this.isDirty = true;
        }
        return super.update(dt);
    }
};

class PointIndicator extends me.GUI_Object {
    /**
     * constructor
     */
    constructor(x, y) {
        super(
            me.game.viewport.width/2 + x,
            y,
            {
                image: game.texture,
                region : "point"
            }
        );

        this.relative = new me.Vector2d(x, y);
        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w/2, 0, 0).add(this.relative);
        }).bind(this));
    }
    /**
    * update function
    */
    update( dt ) {

        if (this.point !== game.data.point) {
        console.log(this.point, game.data.point, this.index)
            this.point = game.data.point;
            if (this.index >= 7-this.point){
                this.setOpacity(1);
                /*sprite = this.sprite;
                sprite.tint.setColor(255, 192, 192);
                sprite.flicker(750, function () {
                    // clear the tint once the flickering effect is over
                    sprite.tint.setColor(255, 255, 255);
                });*/
                var helper = false;
                var intervalId = setInterval(()=>{
                    if(helper){
                        this.setOpacity(0.5);
                    } else {
                        this.setOpacity(1);
                    }
                    helper = !helper
                },100)
                setTimeout(()=>{
                    clearInterval(intervalId)
                    this.setOpacity(1);
                },1000)


            } else {
                this.setOpacity(0.2);
            }
            this.isDirty = true;
        }
        return super.update(dt);
    }
};

class PointIndicatorBackground extends me.Renderable {
    constructor() {
        // x, y, width, height
        super(me.game.viewport.width/2, 0, 320, 120);
        // set the depth of the renderable
        this.z = 100;
        this.setOpacity(0.2);

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(w/2, 0, 0);
        }).bind(this));
    }



    update(dt) {
        // don't redraw this item
        return false;
    }

    draw(renderer) {
        renderer.setColor('#fff');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
};

class Overlay extends me.Renderable {
    constructor() {
        // x, y, width, height
        super(0, 0, me.game.viewport.width*2, me.game.viewport.height*2);
        // set the depth of the renderable
        this.z = 999;
        this.setOpacity(0.0);

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(0, 0, 0);
        }).bind(this));
    }

    update(dt) {
        // don't redraw this item
        return false;
    }

    draw(renderer) {
        renderer.setColor('#000');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }
};

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        var textBox = new TextBox();
        this.addChild(textBox);
        game.textBox = textBox;

        // add our audio control object
        this.addChild(new AudioControl(36, 56));

        if (!me.device.isMobile) {
            // add our fullscreen control object
            this.addChild(new FSControl(36 + 10 + 48, 56));
        }

        this.maxHealth = 5;
        for(var i = 0; i < this.maxHealth; i++){
            var healthIndicator = this.addChild(new HealthIndicator(-36 - (60 * i), 56));
            healthIndicator.index = i + 1;
        }

        game.overlay = new Overlay()
        this.addChild(game.overlay)
        this.addChild(new PointIndicatorBackground())
        for(var i = 0; i < 6; i++){
            var pointIndicator = this.addChild(new PointIndicator(-(48 * (i+-2.5)), 46));
            pointIndicator.index = i + 1;
        }
    }
    update( dt ) {
    //    for (let i = 0; i < game.data.point; i++) {
    //        this.addChild(new ScorePoint(-30-i*20,-20));
    //    }
    
     
    return super.update(dt);
    }
};

export default UIContainer;
