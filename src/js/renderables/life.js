import * as me from 'melonjs';
import game from './../../game.js';

class LifeEntity extends me.Collectable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y-5,
            Object.assign({
                image: game.texture,
                region : "heart",
                shapes :[new me.Rect(0, 0, 48,44)]
            })
        );
    }

    // add a onResetEvent to enable object recycling
    onResetEvent(x, y, settings) {
        this.shift(x, y);
        // only check for collision against player
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }

    /**
     * collision handling
     */
    onCollision(/*response*/) {

        // do something when collide
        me.audio.play("cling", false);
        // give some score
        if (game.data.life < 5) {
            game.data.life += 1;
        } 

        //avoid further collision and delete it
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
};

export default LifeEntity;
