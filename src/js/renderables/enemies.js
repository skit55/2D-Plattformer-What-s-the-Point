import * as me from 'melonjs';
import game from './../../game.js';

/**
 * An enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
class PathEnemyEntity extends me.Entity {
    /**
     * constructor
     * 
     */
    constructor(x, y, settings) {

        // save the area size defined in Tiled
        var width = settings.width || settings.framewidth;
        
        // adjust the setting size to the sprite one
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the super constructor
        super(x, y, settings);
        
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.walkLeft = false;

        // body walking & flying speed
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // only check for collision against player and world shape
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.WORLD_SHAPE | me.collision.types.PROJECTILE_OBJECT);

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;

        // default tint for particles
        this.particleTint = "#FFF";

        this.life = 1;
    }


    /**
     * manage the enemy movement
     */
    update(dt) {

        if (this.alive) {
            if (this.walkLeft === true)
                if (this.pos.x <= this.startX) {
                    // if reach start position
                    this.walkLeft = false;
                    this.renderable.flipX(true);
                } else {
                    this.body.force.x = -this.body.maxVel.x;
                }
            }

            if (this.walkLeft === false) {
                if (this.pos.x >= this.endX) {
                    // if reach the end position
                    this.walkLeft = true;
                    this.renderable.flipX(false);
                } else {
                    this.body.force.x = this.body.maxVel.x;
                }
        }

        // return true if we moved of if flickering
        return super.update(dt);
    }

    /**
     * collision handle
     */
    onCollision(response) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if ( this.alive && ( (response.overlapV.y > 0) && game.player.sword ||game.player.punkt) ) {
            this.hurt();
            if(this.life == 0){
                // make it dead
                this.alive = false;
                //avoid further collision and delete it
                this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                // make the body static
                this.body.setStatic(true);
                // set dead animation
                this.renderable.setCurrentAnimation("dead");

                var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
                    width: this.width / 4,
                    height : this.height / 4,
                    tint: this.particleTint,
                    totalParticles: 32,
                    angle: 0,
                    angleVariation: 6.283185307179586,
                    maxLife: 5,
                    speed: 3
                });

                me.game.world.addChild(emitter,this.pos.z);
                me.game.world.removeChild(this);
                emitter.burstParticles();

                // dead sfx
                me.audio.play("enemykill", false);
            }
        }
        return false;
    }

    hurt() {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {
            if (this.life>0){
                this.life--
            }

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });
        }
    }
};

class PathPFEnemyEntity extends me.Entity {
    /**
     * constructor
     * 
     */
    constructor(x, y, settings) {

        // save the area size defined in Tiled
        var width = settings.width || settings.framewidth;

        // adjust the setting size to the sprite one
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the super constructor
        super(x, y, settings);
        this.direction = "right";

        // shootings cooldown
        this.shoot_cooldown = 2000;
        this.shoot_timer = 0;

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.walkLeft = false;

        // body walking & flying speed
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // only check for collision against player and world shape
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.WORLD_SHAPE | me.collision.types.PROJECTILE_OBJECT);

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;

        // default tint for particles
        this.particleTint = "#FFF";

        this.life = 1;

        if(this.walkLeft==true){
            this.direction="left"
        }else{
            this.direction="right"
        }
        // this.intervall_id = setInterval(() =>{
        //     let x = this.pos.x;
        //     let y = this.pos.y + 40;
        //     if (this.direction === "left") {
        //         x -= 0;
        //     } else if (this.direction === "right") {
        //         x += 130;
        //     }
        //     let bullet = me.pool.pull("bullet", x, y, this.direction, false);//
        //     game.bullet.shot=true;
        //     me.game.world.addChild(bullet);
            
        // }, 2000);
        
    }


    /**
     * manage the enemy movement
     */
    update(dt) {

        if (this.alive) {
            if (this.shoot_timer > 0) {
                this.shoot_timer -= dt;
            }

            if (this.walkLeft === true){
                this.direction="left"
                if (this.pos.x <= this.startX) {
                    // if reach start position
                    
                    this.walkLeft = false;
                    this.renderable.flipX(true);
                } else {
                    this.body.force.x = -this.body.maxVel.x;
                }
              
            }

            if (this.walkLeft === false) {
                this.direction="right"
                if (this.pos.x >= this.endX) {
                    // if reach the end position
                    
                    this.walkLeft = true;
                    this.renderable.flipX(false);
                } else {
                    this.body.force.x = this.body.maxVel.x;
                }
               
            }

            if (this.shoot_timer <= 0) {
                // cooldown
                this.shoot_timer = this.shoot_cooldown;
                let x = this.pos.x;
                let y = this.pos.y + 40;
                if (this.direction === "left") {
                    x -= 0;
                } else if (this.direction === "right") {
                    x += 130;
                }
                let bullet = me.pool.pull("bullet", x, y, this.direction, false);//
                game.bullet.shot=true;
                me.game.world.addChild(bullet);
            }
        }
        // return true if we moved of if flickering
        return super.update(dt);
    }

    /**
     * collision handle
     */
    onCollision(response, other) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if ( this.alive && ( other.harm) ) { // nur Schaden bei Punktwurf
            this.hurt();
            me.game.world.removeChild(other);
            if(this.life == 0){
                //text beim Tod
                setTimeout(()=>{
                    game.textBox.displayTexts([
                    "You did it!"
                    ]);
                    }, 100);
                // make it dead
                this.alive = false;
                clearInterval(this.intervall_id);
                //avoid further collision and delete it
                this.body.setCollisionMask(me.collision.types.NO_OBJECT);
                // make the body static
                this.body.setStatic(true);
                // set dead animation
                this.renderable.setCurrentAnimation("dead");

                var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
                    width: this.width / 4,
                    height : this.height / 4,
                    tint: this.particleTint,
                    totalParticles: 32,
                    angle: 0,
                    angleVariation: 6.283185307179586,
                    maxLife: 5,
                    speed: 3
                });

                me.game.world.addChild(emitter,this.pos.z);
                me.game.world.removeChild(this);
                emitter.burstParticles();

                // dead sfx
                me.audio.play("BossKill", false);
            }
        }
        return false;
    }

    hurt() {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {
            if (this.life>0){
                this.life--
            }

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });
        }
    }
};




/**
 * An Slime enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class SlimeEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // super constructor
        super(x, y, settings);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "Blob_1", "Blob_2", "Blob_3",
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation ("walk", [{ name: "Blob_1", delay: 200 }, { name: "Blob_2", delay: 200 }]);
        // dead animatin
        this.renderable.addAnimation ("dead", ["Blob_3"]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        // particle tint matching the sprite color
        this.particleTint = "#98ca51";

    }
};

/**
 * An Fly enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class FlyEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // super constructor
        super(x, y, settings);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "fly_normal", "fly_fly", "fly_dead"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation ("walk", ["fly_normal", "fly_fly"]);
        // dead animatin
        this.renderable.addAnimation ("dead", ["fly_dead"]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        // particle tint matching the sprite color
        this.particleTint = "#000000";

    }
};

/**
 * Spider enemy entity
 */
export class SpiderEnemyEntity extends PathEnemyEntity {
    constructor(x, y, settings) {
        // call the constructor
        super(x, y , settings);
        this.renderable = game.texture.createAnimationFromName([
            "Spinne_walk/S_walk1", "Spinne_walk/S_walk2", "Spinne_walk/S_walk3","Spinne_walk/S_walk4",
            "Spinne_down/S_down1", "Spinne_down/S_down2",
            "Spinne_death/S_death1", "Spinne_death/S_death2", "Spinne_death/S_death3", "Spinne_death/S_death4"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation ("walk", [{ name: "Spinne_walk/S_walk1", delay: 100 }, { name: "Spinne_walk/S_walk2", delay: 100 }, { name: "Spinne_walk/S_walk3", delay: 100 }, { name: "Spinne_walk/S_walk4", delay: 100 }]);
        // dead animatin
        this.renderable.addAnimation ("dead", [{ name: "Spinne_death/S_death1", delay: 200 }, { name: "Spinne_death/S_death2", delay: 200 }, { name: "Spinne_death/S_death3", delay: 200 }, { name: "Spinne_death/S_death4", delay: 200 }]);

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        // particle tint matching the sprite color
        this.particleTint = "#FF35B8";
        this.life = 2;
    }
};

/**
 * Frog enemy entity
 */
export class FrogEnemyEntity extends PathEnemyEntity {
    constructor(x, y, settings) {
        // call the constructor
        super(x, y , settings);
        this.renderable = game.texture.createAnimationFromName([
            "frog_idle_walk/frog_1", "frog_idle_walk/frog_2", "frog_idle_walk/frog_3","frog_idle_walk/frog_4",
            "frog_idle_walk/frog_5", "frog_idle_walk/frog_6",
            "frog_idle_walk/frog_death"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }
        
        // walking animatin
        this.renderable.addAnimation ("walk", [{ name: "frog_idle_walk/frog_1", delay: 100 }, { name: "frog_idle_walk/frog_2", delay: 100 }, { name: "frog_idle_walk/frog_3", delay: 100 }, { name: "frog_idle_walk/frog_4", delay: 100 },{ name: "frog_idle_walk/frog_5", delay: 100 },{ name: "frog_idle_walk/frog_6", delay: 100 }]);
        // dead animatin
        this.renderable.addAnimation ("dead", [{ name: "frog_idle_walk/frog_death", delay: 200 }]);
        
        // set default one
        this.renderable.setCurrentAnimation("walk");
        
        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);
        
        // particle tint matching the sprite color
        this.particleTint = "#FF35B8";
        this.life = 2;
        
        // shootings cooldown
        this.shoot_cooldown = 2000;
        this.shoot_timer = 0;
        
        // 
        this.direction = "right";
    }
    
//     update(dt) {
//         if (this.alive) {
//             if (this.shoot_timer > 0) {
//                 this.shoot_timer -= dt;
//             }

//             if (this.walkLeft === true){
//                 this.direction="left"
//             }
//             if (this.walkLeft === false) {
//                 this.direction="right"
//             }
   
//             if (this.shoot_timer <= 0) {
//                 // cooldown
//                 this.shoot_timer = this.shoot_cooldown;
//                 let x = this.pos.x;
//                 let y = this.pos.y;
//                 if (this.direction === "left") {
//                     x -= 40;
//                 } else if (this.direction === "right") {
//                     x += 118;
//                 }
//                 let bullet = me.pool.pull("frogAcid", x, y, {}, this.direction, false);
//                 game.bullet.shot=true;
//                 me.game.world.addChild(bullet);
                
//                 //SpitSounds
//                 if(game.data.acid == 1){
//                     me.audio.play("FrogSteady1")
//                     game.data.acid = 2;
//                 }
//                 else if(game.data.acid == 2){
//                     me.audio.play("FrogSteady2")
//                     game.data.acid = 3;
//                 }
//                 else if(game.data.acid == 3){
//                     me.audio.play("FrogSteady3")
//                     game.data.acid = 1;
//                 }
//         }
//         // inherit update from parent
//         return super.update();
//     }
// };
}


/**
 * Punktefresser enemy entity
 */
export class Pf extends PathPFEnemyEntity {
    /**
     * constructor
     * 
     */
    constructor(x, y, settings) {
        // call the constructor
        super(x, y , settings);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        
        // set renderable
        this.renderable = game.texture.createAnimationFromName([ 
            // PF Idle
            "idle/PF_1","idle/PF_2","idle/PF_3",
            "idle/PF_4","idle/PF_5","idle/PF_6",
            "idle/PF_7",
            //PF ATTACK
            "attack/PF_attack1","attack/PF_attack2","attack/PF_attack3"
        ]);

        // define animation
        this.renderable.addAnimation("idle",[ 
            { name : "idle/PF_1" , delay : 100 },{ name : "idle/PF_2" , delay : 100 },{ name : "idle/PF_3" , delay : 100 },
            { name : "idle/PF_4" , delay : 100 },{ name : "idle/PF_5" , delay : 100 },{ name : "idle/PF_6" , delay : 100 },
            { name : "idle/PF_7" , delay : 100 }
        ]);
        this.renderable.addAnimation("dead",["idle/PF_1" ]);
        this.renderable.addAnimation("attack", [{ name : "attack/PF_attack1" , delay : 100 }, { name : "attack/PF_attack2" , delay : 100 }, { name : "attack/PF_attack3" , delay : 100 } ] )
        // set default one
        //this.renderable.setCurrentAnimation("idle");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 1.0);

        this.life=5;
    }
};