import * as me from 'melonjs';
import game from './../../game.js';

class FairyEntity extends me.Entity {

    constructor (x, y, settings) {
        settings.type="textBox";
        super(x, y, settings);

 
        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

         // enemies are not impacted by gravity
        this.body.gravityScale = 0;


        this.renderable = game.texture.createAnimationFromName([
            "Fairy1", "Fairy2"
        ]);

        this.renderable.addAnimation("idle", [{ name: "Fairy01", delay: 100}, { name: "Fairy02", delay: 100}]);
    }
    
}

export default FairyEntity