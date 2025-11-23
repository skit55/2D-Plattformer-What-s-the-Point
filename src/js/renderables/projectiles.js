import * as me from 'melonjs';
import game from './../../game.js';

export class Bullet extends me.Renderable {

    /**
     * constructor
     */
    constructor(x, y, direction, harm) {
        super(x, y, game.bullet.size, game.bullet.size);
        this.direction = direction;
        this.harm=harm;
        // add a physic body and configure it
        this.body = new me.Body(this);
        // add a default collision shape
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        // initial force
        this.body.vel.set(10,0);
        // max velocity
        this.body.setMaxVelocity(10, 0)
        // this object is officially a projectile
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        // always update, so that we can track it when outside the screen
        this.alwaysUpdate = true;
    }

    /**
     * call when the object instance is being recycled
     */
    onResetEvent(x, y) {
        this.pos.set(x, y);
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        // remove bullet if outside of viewport
        if (!this.inViewport) {
            me.game.world.removeChild(this);
        }
        if (this.direction === "right") {
            this.body.vel.x += this.body.maxVel.x * me.timer.tick;
        } else if (this.direction === "left") {
            this.body.vel.x -= this.body.maxVel.x * me.timer.tick;
        }
        return super.update(dt);
    }

    /**
     * @param response
     * @param other
     * @returns {boolean}
     */
    onCollision(response, other) {

        if (other.body.collisionType === me.collision.types.WORLD_SHAPE) {
            me.game.world.removeChild(this);
            return false;
        }
    
    }

    /**
     * draw the bullet
     */
    draw(renderer) {
        let color = renderer.getColor();
        renderer.setColor('#000000');
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        renderer.setColor(color);
    }
}

export class frogAcid extends me.Entity {

    /**
     * constructor
     */
    constructor(x, y, settings, direction, harm) {
        settings.width = 30;
        settings.height = 70;

        super(x, y, settings);

        this.renderable = game.texture.createAnimationFromName([
            "frog & poison getrennt/poison_1","frog & poison getrennt/poison_2","frog & poison getrennt/poison_3",
            "frog & poison getrennt/posion_4","frog & poison getrennt/poison_5"
        ]);

        this.renderable.addAnimation("pew", 
        [ 
            { name: "frog & poison getrennt/poison_1", delay : 100 }, { name: "frog & poison getrennt/poison_2", delay : 100 }, 
            { name: "frog & poison getrennt/poison_3", delay : 100 }, { name: "frog & poison getrennt/posion_4", delay : 100 },
            { name: "frog & poison getrennt/poison_5", delay : 100 }
        ]);
        
        this.direction = direction;
        this.harm=harm;
        // add a physic body and configure it
        this.body = new me.Body(this);
        // add a default collision shape
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
        // initial force
        this.body.vel.set(10,0);
        // max velocity
        this.body.setMaxVelocity(10, 0)
        // this object is officially a projectile
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        // always update, so that we can track it when outside the screen
        this.alwaysUpdate = true;

        this.renderable.setCurrentAnimation("pew");

        this.anchorPoint.set(0.5, 1.0);
    }

    /**
     * call when the object instance is being recycled
     */
    onResetEvent(x, y) {
        this.pos.set(x, y);
    }

    /**
     *
     * @param dt
     * @returns {boolean}
     */
    update(dt) {
        // remove bullet if outside of viewport
        if (!this.inViewport) {
            me.game.world.removeChild(this);
        }
        if (this.direction === "right") {
            this.renderable.flipX(false);
            this.body.vel.x += this.body.maxVel.x * me.timer.tick;
        } else if (this.direction === "left") {
            this.renderable.flipX(true);
            this.body.vel.x -= this.body.maxVel.x * me.timer.tick;
        }
        return super.update(dt);
    }

    /**
     * @param response
     * @param other
     * @returns {boolean}
     */
    onCollision(response, other) {

        if (other.body.collisionType === me.collision.types.WORLD_SHAPE) {
            me.game.world.removeChild(this);
            return false;
        }
    
    }

    /**
     * draw the bullet
     */
}