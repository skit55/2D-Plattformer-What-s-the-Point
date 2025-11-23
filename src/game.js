/**
 * hold all game specific data
 */
var game = {

    /**
     * object where to store game global scole
     */
    point : {
        collected : [],
    },
    map : {
        index : 1,
        name : ["BlattWelt-1","BlattWelt-2","BlattWelt-3","BergWelt-1","BergWelt-2","CaveWelt-1","CaveWelt-2","CaveWelt-3"],
    },
    data : {
        // point
        point : 0,
        life : 5,
        leaf : 0,
        pointy : 0,
        hearty : 0,
        fairy : 0,
        throw : 1,
        acid : 1, 
        parry : 1,
    },
    bullet : {
        size : 7,
        shot:false,
    },
    player : {
        sword : false,
        punkt: false,
    },

    // a reference to the texture atlas
    texture : null
};

export default game;

