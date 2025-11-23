import * as me from 'melonjs';
import game from './../../game.js';

class CoinEntity extends me.Collectable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y-5,
            Object.assign({
                image: game.texture,
                region : "point",
                shapes :[new me.Ellipse(35 / 2, 35 / 2, 35, 35)] // coins are 35x35
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
        me.audio.play("cling2", false);
        // give some score
        let point_location = me.level.getCurrentLevelId();
        if (game.data.point < 6 && !game.point.collected.includes(point_location)) {
            game.point.collected.push(point_location);
            game.data.point += 1;
        }

        var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
            width: this.width * 1,
            height : this.height * 1,
            tint: "#f5d742",
            totalParticles: 100,
            angle: 0,
            angleVariation: 6.283185307179586,
            maxLife: 20,
            speed: 0.5
        });

        me.game.world.addChild(emitter,this.pos.z);
        emitter.burstParticles();


        //avoid further collision and delete it
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
};

export default CoinEntity;
