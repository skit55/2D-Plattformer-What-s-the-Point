/* eslint-disable no-extra-semi */
import * as me from 'melonjs';

import game from './../../game';
//import VirtualJoypad from './../renderables/controls.js';
import UIContainer from './../renderables/HUD.js';


class PlayScreen extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
      // load a level
        me.level.load("BlattWelt-1");

        // reset the score
        game.data.score = 0;

        // add our HUD to the game world
        if (typeof this.HUD === "undefined") {
            this.HUD = new UIContainer();
        }
        me.game.world.addChild(this.HUD);


        // display if debugPanel is enabled or on mobile
        /*if ((me.plugins.debugPanel && me.plugins.debugPanel.panel.visible) || me.device.touch) {
            if (typeof this.virtualJoypad === "undefined") {
                this.virtualJoypad = new VirtualJoypad();
            }
            me.game.world.addChild(this.virtualJoypad);
        }*/

        // play some music
        me.audio.playTrack("dst-gameforest");
        // setTimeout(()=>{
        //     me.audio.stopTrack("dst-gameforest")
        //     me.audio.play("Fairy");    
        //     me.audio.fade("Fairy", 0, 1, 1000);
        // },3000);
        


        // show one message after 1s (todo: instead trigger this somehow)
        // setTimeout(()=>{
        //     game.textBox.displayText('sdafasdf sdfl');
        // },1000)

        // // show multiple messages after 7s (todo: instead trigger this somehow)
        // setTimeout(()=>{
        //     game.textBox.displayTexts(["abcdefg", "hijklmnop", "qrstuvw", "xyz"]);
        // }, 7000)

    
    }


    /**
     *  action to perform on state change
     */
    onDestroyEvent() {

        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);

        // remove the joypad if initially added
        if (this.virtualJoypad && me.game.world.hasChild(this.virtualJoypad)) {
            me.game.world.removeChild(this.virtualJoypad);
        }

        // stop some music
        me.audio.stopTrack();
        me.audio.stop();
    }
};

export default PlayScreen;
