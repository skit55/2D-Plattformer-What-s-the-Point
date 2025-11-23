## Prerequisites

Ensure you have [Node.js](http://nodejs.org/) installed, then install all the build dependencies in the folder where you cloned the repository :

    $ [sudo] npm install

## Usage

- `npm run dev` to start the dev server on watch mode at `localhost:9000`.
- `npm run build` to generate a minified, production-ready build, in the `public` folder

> Note: when generating the production build, Webpack will attempt to filter files under the data folder to only copy final assets and ignore project files (e.g. .ftpp project files from Free Texture Packer). If you find your file being wrongly ignore you can easily add the corresponding extension in the [webpack.config.js](webpack.config.js) file

## Folder structure

```none
src
└── data
│    ├── bgm
│    ├── fnt
|    ├── img
|    ├── map
|    └── sfx
└── js
|    ├── renderables
|    └── stage
├── index.js
├── index.css
├── index.html
├── manifest.js
public
├── data
├── bundle.js
└── index.html
```

- `src`
  - the root folder for your game source code
  - The entry file is [index.js](src/index.js).
  - [index.css](src/index.css) and [index.html](src/index.html) are default templates that can be customized
  - [manifest.js](src/manifest.js) is a list of asset to be preloaded by melonJS (these won't be automatically imported and bundled by webpack)
- `src/js`
  - add your source classes here
- `src/data`
  - where to add your game assets
- `public`
  - where the production-ready build files will be copied/generated when using `npm run build`

Debug plugin
-------------------------------------------------------------------------------
The boilerplate include the melonJS plugin, and will automatically import and instantiate it when running under a development environement.

the Debug Panel is hidden by default and can be displayed using the "S" key, see [here](https://github.com/melonjs/debug-plugin/blob/main/README.md) for more details about the plugin.