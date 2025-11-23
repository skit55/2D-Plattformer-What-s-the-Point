import * as me from 'melonjs';

import game from './game.js';
import resources from './manifest.js';
import PlayerEntity from './js/renderables/player.js';
import * as enemy from './js/renderables/enemies.js';
import * as trigger from './js/renderables/trigger.js';
import CoinEntity from './js/renderables/coin.js';
import LifeEntity from './js/renderables/life.js';
import * as projectiles from './js/renderables/projectiles.js';
import PlayScreen from './js/stage/play.js';
import FairyEntity from './js/renderables/fairy.js';


/**
 *
 * Initialize the application
 */
me.device.onReady(() => {
    // init the video
    if (!me.video.init(800, 600, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO, preferWebGL1 : false, subPixel : false })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import("@melonjs/debug-plugin").then((debugPlugin) => {
            // automatically register the debug panel
            me.utils.function.defer(me.plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });
}


    // initialize the "sound engine"
    me.audio.init("mp3,ogg");

    // set all ressources to be loaded
    me.loader.preload(resources, () => {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", PlayerEntity);
        me.pool.register("LausEntity", enemy.SlimeEnemyEntity);
        me.pool.register("FlyEntity", enemy.FlyEnemyEntity);
        me.pool.register("PointEntity", CoinEntity, true);
        me.pool.register("bullet", projectiles.Bullet);
        me.pool.register("BossEntity",enemy.Pf);
        me.pool.register("SpiderEntity", enemy.SpiderEnemyEntity);
        me.pool.register("FrogEntity", enemy.FrogEnemyEntity);
        me.pool.register("SpiderTrigger", trigger.SpiderSpawn);
        me.pool.register("FairyEntity", FairyEntity);
        me.pool.register("CreditTrigger", trigger.CreditTrigger);
        me.pool.register("ExtraLife", LifeEntity);
        me.pool.register("EndMusic",trigger.EndMusic);
        me.pool.register("BossTrigger", trigger.bossTrigger);
        me.pool.register("StartPointy", trigger.StartPointy);
        me.pool.register("HeartBeat", trigger.HeartBeat);
        me.pool.register("frogAcid", projectiles.frogAcid);
        me.pool.register("reloadPage", trigger.reloadPage);

        
        
        // global keybind for mechanics
        me.input.bindKey(me.input.KEY.R, "sword", true);
        me.input.bindKey(me.input.KEY.T, "shield", true);
        me.input.bindKey(me.input.KEY.G, "shoot", true);
        // text register
        me.pool.register("TextTrigger", trigger.TextTrigger);
        me.pool.register("FeeText", trigger.FeeText);
        me.pool.register("bossfeeText", trigger.cavefeeText);

        // map jump
        me.input.bindKey(me.input.KEY.M, "map", true);



        // load the texture atlas file
        // this will be used by renderable object later
        game.texture = new me.TextureAtlas([
            me.loader.getJSON("texture-0"),
            me.loader.getImage("texture-0"),

            me.loader.getJSON("texture-1"),
            me.loader.getImage("texture-1"),
            
            me.loader.getJSON("texture-2"),
            me.loader.getImage("texture-2"),

            me.loader.getJSON("texture-3"),
            me.loader.getImage("texture-3"),

            me.loader.getJSON("texture-4"),
            me.loader.getImage("texture-4"),

            me.loader.getJSON("texture-5"),
            me.loader.getImage("texture-5"),
        ]);

        // add some keyboard shortcuts
        me.event.on(me.event.KEYDOWN, (action, keyCode /*, edge */) => {

            // change global volume setting
            if (keyCode === me.input.KEY.PLUS) {
                // increase volume
                me.audio.setVolume(me.audio.getVolume()+0.1);
            } else if (keyCode === me.input.KEY.MINUS) {
                // decrease volume
                me.audio.setVolume(me.audio.getVolume()-0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen()) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    });
    
});
