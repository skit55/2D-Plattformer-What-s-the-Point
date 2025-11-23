import * as me from 'melonjs';
import game from './../../game.js';

class PlayerEntity extends me.Entity {
    constructor(x, y, settings) {
        // call the constructor
        super(x, y , settings);

        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        // player can exit the viewport (jumping, falling into a hole, etc.)
        this.alwaysUpdate = true;

        // walking & jumping speed
        this.body.setMaxVelocity(3, 15);
        this.body.setFriction(0.4, 0);

        this.jumpForce = 15;

        this.dying = false;

        this.multipleJump = 1;
        this.sword_timeout_id = undefined;
        this.sword_frame = 0;
        this.sword_animation = undefined;
        this.sword_cooldown = 1500
        this.sword_cooldown_timer = 0
        this.shield = false;


        this.direction = "right";


        // set the viewport to follow this renderable on both axis, and enable damping
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN,  "down");


        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.S,     "down");

        //me.input.registerPointerEvent("pointerdown", this, this.onCollision.bind(this));
        //me.input.bindPointer(me.input.pointer.RIGHT, me.input.KEY.LEFT);

        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_2}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.DOWN}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_3}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.LEFT}, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.RIGHT}, me.input.KEY.RIGHT);

        // map axes
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: -0.5}, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: 0.5}, me.input.KEY.RIGHT);
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LY, threshold: -0.5}, me.input.KEY.UP);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "slime_normal", "sword",

            // MK Blank
            "MK_blankwalk/MK_blankwalk1","MK_blankwalk/MK_blankwalk2","MK_blankwalk/MK_blankwalk3",
            "MK_blankwalk/MK_blankwalk4","MK_blankwalk/MK_blankwalk5","MK_blankwalk/MK_blankwalk6",
            "MK_blankwalk/MK_blankwalk7",
            "MK_blankidle/MK_blankidle1","MK_blankidle/MK_blankidle2","MK_blankidle/MK_blankidle3",
            "MK_blankidle/MK_blankidle4",
            "MK_blankturn/MK_blankturn1","MK_blankturn/MK_blankturn2","MK_blankturn/MK_blankturn3",
            "MK_blanksword/MK_blanksword1","MK_blanksword/MK_blanksword2","MK_blanksword/MK_blanksword3",
            "MK_blanksword/MK_blanksword4","MK_blanksword/MK_blanksword5",

            // MK One
            "MK_onewalk/MK_onewalk1","MK_onewalk/MK_onewalk2","MK_onewalk/MK_onewalk3",
            "MK_onewalk/MK_onewalk4","MK_onewalk/MK_onewalk5","MK_onewalk/MK_onewalk6",
            "MK_onewalk/MK_onewalk7",
            "MK_oneidle/MK_oneidle1","MK_oneidle/MK_oneidle2","MK_oneidle/MK_oneidle3",
            "MK_oneidle/MK_oneidle4",
            "MK_oneturn/MK_oneturn1","MK_oneturn/MK_oneturn2","MK_oneturn/MK_oneturn3",
            "MK_onesword/MK_onesword1","MK_onesword/MK_onesword2","MK_onesword/MK_onesword3",
            "MK_onesword/MK_onesword4","MK_onesword/MK_onesword5",

            // MK Two
            "MK_twowalk/MK_twowalk1","MK_twowalk/MK_twowalk2","MK_twowalk/MK_twowalk3",
            "MK_twowalk/MK_twowalk4","MK_twowalk/MK_twowalk5","MK_twowalk/MK_twowalk6",
            "MK_twowalk/MK_twowalk7",
            "MK_twoidle/MK_twoidle1","MK_twoidle/MK_twoidle2","MK_twoidle/MK_twoidle3",
            "MK_twoidle/MK_twoidle4",
            "MK_twoturn/MK_twoturn1","MK_twoturn/MK_twoturn2","MK_twoturn/MK_twoturn3",
            "MK_twosword/MK_twosword1","MK_twosword/MK_twosword2","MK_twosword/MK_twosword3",
            "MK_twosword/MK_twosword4","MK_twosword/MK_twosword5",

            // MK Three
            "MK_threewalk/MK_threewalk1","MK_threewalk/MK_threewalk2","MK_threewalk/MK_threewalk3",
            "MK_threewalk/MK_threewalk4","MK_threewalk/MK_threewalk5","MK_threewalk/MK_threewalk6",
            "MK_threewalk/MK_threewalk7",
            "MK_threeidle/MK_threeidle1","MK_threeidle/MK_threeidle2","MK_threeidle/MK_threeidle3",
            "MK_threeidle/MK_threeidle4",
            "MK_threeturn/MK_threeturn1","MK_threeturn/MK_threeturn2","MK_threeturn/MK_threeturn3",
            "MK_threesword/MK_threesword1","MK_threesword/MK_threesword2","MK_threesword/MK_threesword3",
            "MK_threesword/MK_threesword4","MK_threesword/MK_threesword5",

            // MK Four
            "MK_fourwalk/MK_fourwalk1","MK_fourwalk/MK_fourwalk2","MK_fourwalk/MK_fourwalk3",
            "MK_fourwalk/MK_fourwalk4","MK_fourwalk/MK_fourwalk5","MK_fourwalk/MK_fourwalk6",
            "MK_fourwalk/MK_fourwalk7",
            "MK_fouridle/MK_fouridle1","MK_fouridle/MK_fouridle2","MK_fouridle/MK_fouridle3",
            "MK_fouridle/MK_fouridle4",
            "MK_fourturn/MK_fourturn1","MK_fourturn/MK_fourturn2","MK_fourturn/MK_fourturn3",
            "MK_foursword/MK_foursword1","MK_foursword/MK_foursword2","MK_foursword/MK_foursword3",
            "MK_foursword/MK_foursword4","MK_foursword/MK_foursword5",

            // MK Five
            "MK_fivewalk/MK_fivewalk1","MK_fivewalk/MK_fivewalk2","MK_fivewalk/MK_fivewalk3",
            "MK_fivewalk/MK_fivewalk4","MK_fivewalk/MK_fivewalk5","MK_fivewalk/MK_fivewalk6",
            "MK_fivewalk/MK_fivewalk7",
            "MK_fivesword/MK_fivesword1","MK_fivesword/MK_fivesword2","MK_fivesword/MK_fivesword3",
            "MK_fivesword/MK_fivesword4","MK_fivesword/MK_fivesword5",

            // MK Point
            "MK_pointswalk/MK_pointswalk1","MK_pointswalk/MK_pointswalk2","MK_pointswalk/MK_pointswalk3",
            "MK_pointswalk/MK_pointswalk4","MK_pointswalk/MK_pointswalk5","MK_pointswalk/MK_pointswalk6",
            "MK_pointswalk/MK_pointswalk7",
            "MK_pointsidle/MK_pointsidle1","MK_pointsidle/MK_pointsidle2","MK_pointsidle/MK_pointsidle3",
            "MK_pointsidle/MK_pointsidle4",
            "MK_pointsturn/MK_pointsturn1","MK_pointsturn/MK_pointsturn2","MK_pointsturn/MK_pointsturn3",
            "MK_pointssword/MK_pointssword1","MK_pointssword/MK_pointssword2","MK_pointssword/MK_pointssword3",
            "MK_pointssword/MK_pointssword4","MK_pointssword/MK_pointssword5",
        ]);

        // define a basic walking animatin

        // MK Blank
        this.renderable.addAnimation("stand_0", [{ name: "MK_blankidle/MK_blankidle1", delay: 100 }, { name: "MK_blankidle/MK_blankidle2", delay: 100 }, { name: "MK_blankidle/MK_blankidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_0",
        [
            { name: "MK_blankwalk/MK_blankwalk1", delay: 100 }, { name: "MK_blankwalk/MK_blankwalk2", delay: 100 }, { name: "MK_blankwalk/MK_blankwalk3", delay: 100 },
            { name: "MK_blankwalk/MK_blankwalk4", delay: 100 }, { name: "MK_blankwalk/MK_blankwalk5", delay: 100 }, { name: "MK_blankwalk/MK_blankwalk6", delay: 100 },
            { name: "MK_blankwalk/MK_blankwalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_0",  [{ name: "MK_blankwalk/MK_blankwalk1", delay: 150 }, { name: "MK_blankwalk/MK_blankwalk5", delay: 150 }, { name: "MK_blankwalk/MK_blankwalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_0",
        [
            { name: "MK_blanksword/MK_blanksword1", delay: 100 }, { name: "MK_blanksword/MK_blanksword2", delay: 100 }, { name: "MK_blanksword/MK_blanksword3", delay: 100 }, 
            { name: "MK_blanksword/MK_blanksword4", delay: 100 }, { name: "MK_blanksword/MK_blanksword5", delay: 100 }
        ]);

        // MK One
        this.renderable.addAnimation("stand_1", [{ name: "MK_oneidle/MK_oneidle1", delay: 100 }, { name: "MK_oneidle/MK_oneidle2", delay: 100 }, { name: "MK_oneidle/MK_oneidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_1",  
        [
            { name: "MK_onewalk/MK_onewalk1", delay: 100 }, { name: "MK_onewalk/MK_onewalk2", delay: 100 }, { name: "MK_onewalk/MK_onewalk3", delay: 100 },
            { name: "MK_onewalk/MK_onewalk4", delay: 100 }, { name: "MK_onewalk/MK_onewalk5", delay: 100 }, { name: "MK_onewalk/MK_onewalk6", delay: 100 },
            { name: "MK_onewalk/MK_onewalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_1",  [{ name: "MK_onewalk/MK_onewalk1", delay: 150 }, { name: "MK_onewalk/MK_onewalk5", delay: 150 }, { name: "MK_onewalk/MK_onewalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_1", 
        [
            { name: "MK_onesword/MK_onesword1", delay: 100 }, { name: "MK_onesword/MK_onesword2", delay: 100 }, { name: "MK_onesword/MK_onesword3", delay: 100 }, 
            { name: "MK_onesword/MK_onesword4", delay: 100 }, { name: "MK_onesword/MK_onesword5", delay: 100 }
        ]);
        // MK Two
        this.renderable.addAnimation("stand_2", [{ name: "MK_twoidle/MK_twoidle1", delay: 100 }, { name: "MK_twoidle/MK_twoidle2", delay: 100 }, { name: "MK_twoidle/MK_twoidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_2",  
        [
            { name: "MK_twowalk/MK_twowalk1", delay: 100 }, { name: "MK_twowalk/MK_twowalk2", delay: 100 }, { name: "MK_twowalk/MK_twowalk3", delay: 100 },
            { name: "MK_twowalk/MK_twowalk4", delay: 100 }, { name: "MK_twowalk/MK_twowalk5", delay: 100 }, { name: "MK_twowalk/MK_twowalk6", delay: 100 },
            { name: "MK_twowalk/MK_twowalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_2",  [{ name: "MK_twowalk/MK_twowalk1", delay: 150 }, { name: "MK_twowalk/MK_twowalk5", delay: 150 }, { name: "MK_twowalk/MK_twowalk2", delay: 150 }]);

        this.renderable.addAnimation("sword_2", 
        [
            { name: "MK_twosword/MK_twosword1", delay: 100 }, { name: "MK_twosword/MK_twosword2", delay: 100 }, { name: "MK_twosword/MK_twosword3", delay: 100 }, 
            { name: "MK_twosword/MK_twosword4", delay: 100 }, { name: "MK_twosword/MK_twosword5", delay: 100 }
        ]);

        // MK Three
        this.renderable.addAnimation("stand_3", [{ name: "MK_threeidle/MK_threeidle1", delay: 100 }, { name: "MK_threeidle/MK_threeidle2", delay: 100 }, { name: "MK_threeidle/MK_threeidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_3",  
        [
            { name: "MK_threewalk/MK_threewalk1", delay: 100 }, { name: "MK_threewalk/MK_threewalk2", delay: 100 }, { name: "MK_threewalk/MK_threewalk3", delay: 100 },
            { name: "MK_threewalk/MK_threewalk4", delay: 100 }, { name: "MK_threewalk/MK_threewalk5", delay: 100 }, { name: "MK_threewalk/MK_threewalk6", delay: 100 },
            { name: "MK_threewalk/MK_threewalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_3",  [{ name: "MK_threewalk/MK_threewalk1", delay: 150 }, { name: "MK_threewalk/MK_threewalk5", delay: 150 }, { name: "MK_threewalk/MK_threewalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_3", 
        [
            { name: "MK_threesword/MK_threesword1", delay: 100 }, { name: "MK_threesword/MK_threesword2", delay: 100 }, { name: "MK_threesword/MK_threesword3", delay: 100 }, 
            { name: "MK_threesword/MK_threesword4", delay: 100 }, { name: "MK_threesword/MK_threesword5", delay: 100 }
        ]);
        // MK Four
        this.renderable.addAnimation("stand_4", [{ name: "MK_fouridle/MK_fouridle1", delay: 100 }, { name: "MK_fouridle/MK_fouridle2", delay: 100 }, { name: "MK_fouridle/MK_fouridle3", delay: 100 }]);
        this.renderable.addAnimation("walk_4",  
        [
            { name: "MK_fourwalk/MK_fourwalk1", delay: 100 }, { name: "MK_fourwalk/MK_fourwalk2", delay: 100 }, { name: "MK_fourwalk/MK_fourwalk3", delay: 100 },
            { name: "MK_fourwalk/MK_fourwalk4", delay: 100 }, { name: "MK_fourwalk/MK_fourwalk5", delay: 100 }, { name: "MK_fourwalk/MK_fourwalk6", delay: 100 },
            { name: "MK_fourwalk/MK_fourwalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_4",  [{ name: "MK_fourwalk/MK_fourwalk1", delay: 150 }, { name: "MK_fourwalk/MK_fourwalk5", delay: 150 }, { name: "MK_fourwalk/MK_fourwalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_4", 
        [
            { name: "MK_foursword/MK_foursword1", delay: 100 }, { name: "MK_foursword/MK_foursword2", delay: 100 }, { name: "MK_foursword/MK_foursword3", delay: 100 }, 
            { name: "MK_foursword/MK_foursword4", delay: 100 }, { name: "MK_foursword/MK_foursword5", delay: 100 }
        ]);
        // MK Five
        this.renderable.addAnimation("stand_5", [{ name: "MK_pointsidle/MK_pointsidle1", delay: 100 }, { name: "MK_pointsidle/MK_pointsidle2", delay: 100 }, { name: "MK_pointsidle/MK_pointsidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_5",  
        [
            { name: "MK_fivewalk/MK_fivewalk1", delay: 100 }, { name: "MK_fivewalk/MK_fivewalk2", delay: 100 }, { name: "MK_fivewalk/MK_fivewalk3", delay: 100 },
            { name: "MK_fivewalk/MK_fivewalk4", delay: 100 }, { name: "MK_fivewalk/MK_fivewalk5", delay: 100 }, { name: "MK_fivewalk/MK_fivewalk6", delay: 100 },
            { name: "MK_fivewalk/MK_fivewalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_5",  [{ name: "MK_fivewalk/MK_fivewalk1", delay: 150 }, { name: "MK_fivewalk/MK_fivewalk5", delay: 150 }, { name: "MK_fivewalk/MK_fivewalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_5", 
        [
            { name: "MK_fivesword/MK_fivesword1", delay: 100 }, { name: "MK_fivesword/MK_fivesword2", delay: 100 }, { name: "MK_fivesword/MK_fivesword3", delay: 100 }, 
            { name: "MK_fivesword/MK_fivesword4", delay: 100 }, { name: "MK_fivesword/MK_fivesword5", delay: 100 }
        ]);
        // MK Points
        this.renderable.addAnimation("stand_6", [{ name: "MK_pointsidle/MK_pointsidle1", delay: 100 }, { name: "MK_pointsidle/MK_pointsidle2", delay: 100 }, { name: "MK_pointsidle/MK_pointsidle3", delay: 100 }]);
        this.renderable.addAnimation("walk_6",  
        [
            { name: "MK_pointswalk/MK_pointswalk1", delay: 100 }, { name: "MK_pointswalk/MK_pointswalk2", delay: 100 }, { name: "MK_pointswalk/MK_pointswalk3", delay: 100 },
            { name: "MK_pointswalk/MK_pointswalk4", delay: 100 }, { name: "MK_pointswalk/MK_pointswalk5", delay: 100 }, { name: "MK_pointswalk/MK_pointswalk6", delay: 100 },
            { name: "MK_pointswalk/MK_pointswalk7", delay: 100 }
        ]);
        this.renderable.addAnimation("jump_6",  [{ name: "MK_pointswalk/MK_pointswalk1", delay: 150 }, { name: "MK_pointswalk/MK_pointswalk5", delay: 150 }, { name: "MK_pointswalk/MK_pointswalk2", delay: 150 }]);
        this.renderable.addAnimation("sword_6", 
        [
            { name: "MK_pointssword/MK_pointssword1", delay: 100 }, { name: "MK_pointssword/MK_pointssword2", delay: 100 }, { name: "MK_pointssword/MK_pointssword3", delay: 100 }, 
            { name: "MK_pointssword/MK_pointssword4", delay: 100 }, { name: "MK_pointssword/MK_pointssword5", delay: 100 }
        ]);

        this.renderable.addAnimation("shield",[{ name: "slime_normal"}])
        // set as default
        this.renderable.setCurrentAnimation("walk_0");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
    }

    /**
     ** update the force applied
     */
    update(dt) {
        if (this.sword_cooldown_timer > 0){
            this.sword_cooldown_timer -= dt;
        }

        if (me.input.isKeyPressed("left")){
            this.direction = "left";
            if (this.body.vel.y === 0) {
                this.renderable.setCurrentAnimation("walk_"+game.data.point);
            }
            this.body.force.x = -this.body.maxVel.x;
            this.renderable.flipX(true);
        } else if (me.input.isKeyPressed("right")) {
            this.direction = "right";
            if (this.body.vel.y === 0) {
                this.renderable.setCurrentAnimation("walk_"+game.data.point);
            }
            this.body.force.x = this.body.maxVel.x;
            this.renderable.flipX(false);
        }

        if (me.input.isKeyPressed("jump")) {
            this.renderable.setCurrentAnimation("jump_"+game.data.point);
            this.body.jumping = true;
            this.body.velocity=0;   
            if (this.multipleJump <= 2) {
                // easy "math" for double jump

                this.body.force.y = -this.jumpForce;
                if(this.multipleJump == 1){
                    me.audio.stop("jump");
                    me.audio.play("jump", false);
                }
                else{
                    me.audio.stop("dJump");
                    me.audio.play("dJump", false);
                }
                this.multipleJump += 1;
            }
        }

        if (this.body.force.x === 0 && this.body.force.y === 0) {
            this.renderable.setCurrentAnimation("stand_"+game.data.point);
        }

        if (me.input.isKeyPressed("sword") && this.sword_cooldown_timer <= 0) {
            // cooldown
            this.sword_cooldown_timer = this.sword_cooldown;

            // define x pos
            var x ;
            if (this.direction === "right") {
                x = 4;
            } else if (this.direction ==="left") {
                x = -3;
            }
            this.body.addShape(new me.Rect(x, 0, 65, 57));
            this.body.removeShapeAt(0);
            if (this.sword_timeout_id != undefined) {
                clearTimeout(this.sword_timeout_id)
            }
            if (this.sword_animation != undefined) {
                clearInterval(this.sword_animation);
                this.sword_frame = 0;
            }
            game.player.sword = true;
            this.sword_timeout_id = setTimeout( () => {
                game.player.sword = false;
            }, 1000);
            this.sword_animation = setInterval( () => {
                this.sword_frame++
            }, 100);
        } else {
            if (game.player.sword) {
                this.renderable.setCurrentAnimation("sword_"+game.data.point);
                this.renderable.setAnimationFrame(this.sword_frame);
            } else {
                clearInterval(this.sword_animation);
                this.sword_animation = 0;
                this.body.addShape(new me.Rect(0, 0, 35, 57));
                this.body.removeShapeAt(0);
            }
        }
        
        // game mechanics
        if (me.input.isKeyPressed("shield")) {
            this.shield = true;
            setTimeout( () => {
                this.shield = false;
            }, 1000);
        } else {
            if (this.shield) {
                // buff
                this.body.setMaxVelocity(3, 0);
                this.renderable.setCurrentAnimation("shield");
            } else {
                // reset jump and walk speed
                this.body.setMaxVelocity(3, 15);
            }
        }
        
        if (me.input.isKeyPressed("shoot")) {
            // determine spawn point
            if(game.data.point>0){
                let x = this.pos.x;
                if (this.direction === "right") {
                    x += 20;
                } else if (this.direction === "left") {
                    x -= 10;
                }
                let bullet = me.pool.pull("bullet", x, this.pos.y+42, this.direction, true);
                game.player.punkt=true;
                me.game.world.addChild(bullet);
                game.data.point--;

                if(game.data.throw == 1){
                    me.audio.play("thow1")
                    game.data.throw = 2;
                }
                else if(game.data.throw == 2){
                    me.audio.play("thow2")
                    game.data.throw = 3;
                }
                else if(game.data.throw == 3){
                    me.audio.play("thow3")
                    game.data.throw = 1;
                }
            }
            

        }

        // map jump
        if (me.input.isKeyPressed("map")) {
            if (game.map.index < 7) {
                me.level.load(game.map.name[game.map.index++]);
            }
        } else {
            if (game.map.index >= 7) {
                game.map.index = 0;
            }
        }

        // check if we fell into a hole
        if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())) {
            // if yes reset the game
            me.game.world.removeChild(this);
            this.hurt()
            me.game.viewport.fadeIn("#fff", 150, function(){
                me.audio.play("die", false);
                me.level.reload();
                me.game.viewport.fadeOut("#fff", 150);
            });
            return true;
        }

        // check if we moved (an "idle" animation would definitely be cleaner)
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
            (this.renderable && this.renderable.isFlickering())
        ) {
            super.update(dt);
            return true;
        }
        return false;
    }


    /**
     * colision handler
     */
    onCollision(response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // reset jump if we fall on WORLD SHAPE from above
                if(response.overlapV.y > 0){
                    this.multipleJump = 1;
                }

                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }

                // Custom collision response for slopes
                else if (other.type === "slope") {
                    // Always adjust the collision response upward
                    response.overlapV.y = Math.abs(response.overlap);
                    response.overlapV.x = 0;

                    // Respond to the slope (it is solid)
                    return true;
                }
                break;

            case me.collision.types.ENEMY_OBJECT:
                if (!other.isMovingEnemy && !other.type==="spawnTrigger") {
                    // spike or any other fixed danger
                    this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
                    this.hurt();
                }
                else {
                    // a regular moving enemy entity
                    if (other.type==="") {     
                        if (!game.player.sword) {
                            this.hurt();
                        }                 
                    }
                    // Not solid
                    return false;
                }
                break;
            
            
            case me.collision.types.PROJECTILE_OBJECT:
                
                if(!other.harm){
                    if (!game.player.sword) {
                        this.hurt();
                        me.game.world.removeChild(other);
                    }
                    else{
                        other.direction = other.direction == "left" ? "right" : "left"
                        other.harm = true;
                        //Parrysounds
                        if(game.data.parry == 1){
                            me.audio.play("Parry")
                            game.data.parry = 2;
                        }
                        else if(game.data.parry == 2){
                            me.audio.play("Parry2")
                            game.data.parry = 3;
                        }
                        else if(game.data.parry == 3){
                            me.audio.play("Parry3")
                            game.data.parry = 1;
                        }
                    }
                }
    

            default:
                // Do not respond to other objects (e.g. coins)
                return false;

        }

        // Make the object solid
        return true;
    }

    /**
     * ouch
     */
    hurt() {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {
            if (game.data.life>0){
                game.data.life--
                if(game.data.life==0){
                    //alert("Game Over!");
                    let helper = 0.0
                    
                    //Stops all tracks and plays GameOver Tune
                    me.audio.stopTrack()
                    me.audio.stop()
                    me.audio.play("GameOver");

                    game.textBox.displayTexts(["Game Over!"]);
                    

                    var intervalId = setInterval(()=>{
                        helper += 0.1;
                        game.overlay.setOpacity(helper);
                    },500)
                    setTimeout(()=>{
                        clearInterval(intervalId);
                        location.reload();
                    },5000)
                }
            }

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });

            // flash the screen
            me.game.viewport.fadeIn("#FFFFFF", 75);
            me.audio.play("die", false);
        }
    }
};

export default PlayerEntity;
