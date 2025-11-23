import * as me from 'melonjs';
import game from './../../game.js';
import { setTimeout } from 'core-js';
import * as enemy from './enemies.js';

export class SpiderSpawn extends me.Entity {
    /**
     * constructor
     * 
     */
    constructor(x, y, settings) {
        settings.type = "spawnTrigger"; 
        // call the super constructor
        super(x, y, settings);
        this.frameheight = settings.frameheight;
        this.framewidth = settings.framewidth;
        this.width = settings.width;
        this.height = settings.height;
        this.shape = new me.Rect(0, 0, settings.framewidth, settings.frameheight);
        // prevent spawn more than 1 time
        this.spawn = true;

    }
    

    onCollision(response, other) {
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && this.spawn) {
            me.game.world.removeChild(this);
            // let blob = me.pool.pull("SpiderEntity",this.pos.x, this.pos.y, 
            // {
            //     width : this.width,
            //     height : this.height,
            //     framewidth: this.framewidth,
            //     frameheight: this.frameheight,
            //     shape : this.shape,

            // });
            //me.game.world.addChild(blob);
            this.spawn = false;            

            
        }
    }
}

export class bossTrigger extends me.Entity {
    /**
     * constructor
     * 
     */
    constructor(x, y, settings) {
        settings.type = "spawnTrigger"; 
        // call the super constructor
        super(x, y, settings);
        this.x_spawn = settings.x_spawn;
        this.y_spawn = settings.y_spawn + settings.spawn_height - settings.frameheight ;
        this.frameheight = settings.frameheight;
        this.framewidth = settings.framewidth;
        this.width = settings.spawn_width;
        this.height = settings.spawn_height;
        this.shape = new me.Rect(0, 0, settings.framewidth, settings.frameheight);
        // prevent spawn more than 1 time
        this.spawn = true;
        
    }
    

    onCollision(response, other) {
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && this.spawn) {
            me.game.world.removeChild(this);

            setTimeout(()=>{
                me.audio.fade("PointyMountains", 1, 0,1000)
            },0);

            setTimeout(()=>{
                me.audio.play("BossMusic")
                me.audio.fade("BossMusic", 0, 1, 1000)
                game.textBox.displayTexts(["Use 'G' to throw points at enemy!"]);
            },1000);

            let pf = me.pool.pull("BossEntity",this.x_spawn,  this.y_spawn, 
            {
                width : this.width,
                height : this.height,
                framewidth: this.framewidth,
                frameheight: this.frameheight,
                shape : this.shape,

            });
            me.game.world.addChild(pf);
            this.spawn = false;         

        }
    }
}


export class TextTrigger extends me.Entity {
    /**
     * constructor
     * 
     */
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
     // // show multiple messages after 7s (todo: instead trigger this somehow)
       
     onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            // delete trigger
            me.game.world.removeChild(this);
            setTimeout(()=>{
            game.textBox.displayTexts([
            "The prophecy...",
            "*descends*",
            ]);
            }, 100);    
        
        }
    }
}

export class CreditTrigger extends me.Entity {
    /**
     * constructor
     */
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
 
     onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            // delete trigger
            me.game.world.removeChild(this);
            setTimeout(()=>{
            game.textBox.displayTexts([
            "Thanks for Playing!",
            "Made by : Vera Klemt, Jan Bykow, Celeste Wolf", 
            "William Orpine, Orkun Ozturk, Paula Hansch, Irem Kurt",
            "Assets von: SunnyLand Forest by ansimuz", "2D Platformer des Medienerstellungsprojekts  2023"
            ]);
            }, 30); 

            setTimeout(()=>{
                me.audio.fade("BossMusic", 1, 0, 700)
            },0);
            setTimeout(()=>{
                me.audio.stopTrack()
                me.audio.stop()
                me.audio.playTrack("Credits");
                me.audio.fade("Credits", 0, 1, 700);
            },700);   
        }
    }
    
}
export class FeeText extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
    

    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && game.data.fairy == 0) {
            game.data.fairy = 1;
            // delete trigger
            me.game.world.removeChild(this);
            //fades music out in 1 sec
            setTimeout(()=>{ 
                setTimeout(()=>{
                me.audio.fade("dst-gameforest", 1, 0,700 )
            },0);
            //stops leaftheme (after fading to mute) and fades in fairy tune in one second (all after leaftheme is muted)
            setTimeout(()=>{
                me.audio.stopTrack("dst-gameforest")
                me.audio.play("Fairy");    
                me.audio.fade("Fairy", 0, 1, 700);
            },700);

            game.textBox.displayTexts(["Long ago, the elders have foreseen",
            "...",
            "They said,", "the Ladybug Folk will be looted from.",
            "All the fortune", "will be taken away",
            "...",
            "It will seem as though times are pointless.",
            "However...",
            "The one ladybug was not entirely pointless.",
            "It was he who could save their folk.",
             "It is you!",
            "...",
            "Take the heavenly smitten sword!",
            "(use R to wield your sword!)",
            "Only thou can wield the sword", "and save your people. ", 
            "Best of Luck brave swordsbug!"
            ]);
            }, 20);    
    
        } 
    }
}

export class cavefeeText extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
    

    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            // delete trigger
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
            setTimeout(()=>{ 
            // TO DO
            game.textBox.displayTexts(
                [
                    "text hier",
                ]
            );
            }, 20);    
        } 
    }
}

export class EndMusic extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && game.data.leaf == 0) {
            //set pointy to 1 so trigger cant activate a second time
            game.data.leaf = 1;
            // delete trigger
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
                    me.audio.stopTrack();
                    me.audio.stop();
                    me.audio.playTrack("dst-gameforest");    
                    me.audio.fade("dst-gameforest", 0, 1, 1000);
            } 
        }
}

//trigger for Music start for PointyMountains
export class StartPointy extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && game.data.pointy == 0) {
            // delete trigger
            game.data.pointy = 1;
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
                setTimeout(()=>{
                    me.audio.fade("dst-gameforest", 1, 0, 250)
                },0);
                setTimeout(()=>{
                    me.audio.stopTrack()
                    me.audio.stop()
                    me.audio.playTrack("PointyMountains");
                    me.audio.fade("PointyMountains", 0, 1, 250);
                },250);
            } 
        }
}
//starts HeartBeat
export class HeartBeat extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="textBox";
        super(x, y, settings);
    }
    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT && game.data.hearty == 0) {
            // delete trigger
            game.data.hearty = 1;
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
                    me.audio.stopTrack();
                    me.audio.stop();
                    me.audio.playTrack("HeartBeat");  
            } 
        }
}

export class reloadPage extends me.Entity {
    
    constructor(x, y, settings){ 
        // call the super constructor
        settings.type="reload";
        super(x, y, settings);
    }
    onCollision(response, other) {
        // collision with only with player
        if(other.body.collisionType === me.collision.types.PLAYER_OBJECT) {
            // delete trigger
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            me.game.world.removeChild(this);
            location.reload();
            } 
        }
}

