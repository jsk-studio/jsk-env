const { spawnSync } = require('child_process')
const path = require('path')
const PATHS = {
    webpackNode: path.join(__dirname, '../webpack/webpackNode.config.js')
}

spawnSync('webpack --config', [
    PATHS.webpackNode
], { stdio: 'inherit', shell: true })