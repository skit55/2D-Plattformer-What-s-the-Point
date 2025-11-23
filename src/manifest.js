var resources = [

    /* Graphics.
     * @example
     * { name: "example", type:"image", src: "data/img/example.png" },
     */
    { name: "TileLeaf",         type:"image",   src: "data/img/TileLeaf.png" },
    { name: "Plant",         type:"image",   src: "data/img/Plant.png" },
    { name: "cave_tiles",         type:"image",   src: "data/map/Cave/cave_tiles.png" },
    { name: "berge_tiles",         type:"image",   src: "data/map/berg/berge_tiles.png" },


    { name: "BlattWeltBackground-1",      type:"image",   src: "data/img/BlattWeltBackground-1.png" },
    { name: "BlattWeltBackground-2",      type:"image",   src: "data/img/BlattWeltBackground-2.png" },

    { name: "BergWeltBackground-1",      type:"image",   src: "data/map/berg/BergWeltBackground-1.png" },

    { name: "CaveWeltBackground-1",      type:"image",   src: "data/map/Cave/CaveWeltBackground-1.png" },
    { name: "CaveWeltBackground-2",      type:"image",   src: "data/map/Cave/CaveWeltBackground-2.png" },
    { name: "CaveWeltBackground-3",      type:"image",   src: "data/map/Cave/CaveWeltBackground-3.png" },
    { name: "CaveWeltForeground-1",      type:"image",   src: "data/map/Cave/CaveWeltForeground-1.png" },
    { name: "CaveWeltForeground-2",      type:"image",   src: "data/map/Cave/CaveWeltForeground-2.png" },

    /* Maps.
     * @example
     * { name: "example01", type: "tmx", src: "data/map/example01.tmx" },
     * { name: "example01", type: "tmx", src: "data/map/example01.json" },
     */
    { name: "BlattWelt-1",            type: "tmx",    src: "data/map/BlattWeltStage1.tmx" },
    { name: "BlattWelt-2",            type: "tmx",    src: "data/map/BlattWeltStage2.tmx" },
    { name: "BlattWelt-3",            type: "tmx",    src: "data/map/BlattWeltStage3.tmx" },
    { name: "BergWelt-1",            type: "tmx",    src: "data/map/berg/BergWeltStage1.tmx" },
    { name: "BergWelt-2",            type: "tmx",    src: "data/map/berg/BergWeltStage2.tmx" },
    { name: "CaveWelt-1",            type: "tmx",    src: "data/map/Cave/CaveWeltStage1.tmx" },
    { name: "CaveWelt-2",            type: "tmx",    src: "data/map/Cave/CaveWeltStage2.tmx" },
    { name: "CaveWelt-3",            type: "tmx",    src: "data/map/Cave/CaveWeltStage3.tmx" },

    /* Tilesets.
     * @example
     * { name: "example01", type: "tsx", src: "data/map/example01.tsx" },
     * { name: "example01", type: "tsx", src: "data/map/example01.json" },
     */
    { name: "LeafTile",         type: "tsx",    src: "data/map/LeafTile.json" },
    { name: "Plant",         type: "tsx",    src: "data/map/Plant.tsx" },
    { name: "TileLeaf",         type: "tsx",    src: "data/map/berg/TileLeaf.tsx" },
    { name: "cave_tiles",         type: "tsx",    src: "data/map/Cave/cave_tiles.tsx" },
    { name: "berge_tiles",         type: "tsx",    src: "data/map/berg/berge_tiles.tsx" },

    /* Background music.
     * @example
     * { name: "example_bgm", type: "audio", src: "data/bgm/" },
     */
    { name: "dst-gameforest",  type: "audio", src: "data/bgm/" },
    { name: "Fairy",           type: "audio", src: "data/bgm/" },
    { name: "BossMusic",       type: "audio", src: "data/bgm/" },
    { name: "PointyMountains", type: "audio", src: "data/bgm/" },
    { name: "Credits",         type: "audio", src: "data/bgm/" },

    /* Sound effects.
     * @example
     * { name: "example_sfx", type: "audio", src: "data/sfx/" }
     */
    { name: "cling",           type: "audio",  src: "data/sfx/" },
    { name: "die",             type: "audio",  src: "data/sfx/" },
    { name: "enemykill",       type: "audio",  src: "data/sfx/" },
    { name: "dJump",           type: "audio",  src: "data/sfx/" },
    { name: "FrogSteady1",     type: "audio",  src: "data/sfx/" },
    { name: "FrogSteady2",     type: "audio",  src: "data/sfx/" },
    { name: "FrogSteady3",     type: "audio",  src: "data/sfx/" },
    { name: "FrogDeath",       type: "audio",  src: "data/sfx/" },
    { name: "SlugSteady1",     type: "audio",  src: "data/sfx/" },
    { name: "SlugSteady2",     type: "audio",  src: "data/sfx/" },
    { name: "SlugSteady3",     type: "audio",  src: "data/sfx/" },
    { name: "SlugDeath",       type: "audio",  src: "data/sfx/" },
    { name: "SpiderSteady",    type: "audio",  src: "data/sfx/" },
    { name: "SpiderDeath",     type: "audio",  src: "data/sfx/" },
    { name: "jump",            type: "audio",  src: "data/sfx/" },
    { name: "cling2",          type: "audio",  src: "data/sfx/" },
    { name: "GameOver",        type: "audio",  src: "data/sfx/" },
    { name: "thow1",           type: "audio",  src: "data/sfx/" },
    { name: "thow3",           type: "audio",  src: "data/sfx/"},
    { name: "thow2",           type: "audio",  src: "data/sfx/" },
    { name: "Parry",           type: "audio",  src: "data/sfx/" },
    { name: "Parry2",          type: "audio",  src: "data/sfx/" },
    { name: "Parry3",          type: "audio",  src: "data/sfx/" },
    { name: "BossKill",        type: "audio",  src: "data/sfx/" },

    /* Atlases
     * @example
     * { name: "example_tps", type: "json", src: "data/img/example_tps.json" },
     */
    // texturePacker
    { name: "texture-0",      type: "json",       src: "data/img/texture-0.json" },
    { name: "texture-0",      type: "image",      src: "data/img/texture-0.png" },
    { name: "texture-1",      type: "json",       src: "data/img/texture-1.json" },
    { name: "texture-1",      type: "image",      src: "data/img/texture-1.png" },
    { name: "texture-2",      type: "json",       src: "data/img/texture-2.json" },
    { name: "texture-2",      type: "image",      src: "data/img/texture-2.png" },
    { name: "texture-3",      type: "json",       src: "data/img/texture-3.json" },
    { name: "texture-3",      type: "image",      src: "data/img/texture-3.png" },
    { name: "texture-4",      type: "json",       src: "data/img/texture-4.json" },
    { name: "texture-4",      type: "image",      src: "data/img/texture-4.png" },
    { name: "texture-5",      type: "json",       src: "data/img/texture-5.json" },
    { name: "texture-5",      type: "image",      src: "data/img/texture-5.png" },
    /* Bitmap Font
    * @example
    * { name: "example_fnt", type: "image", src: "data/img/example_fnt.png" },
    * { name: "example_fnt", type: "binary", src: "data/img/example_fnt.fnt" },
    */
    { name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"}
];

export default resources;
