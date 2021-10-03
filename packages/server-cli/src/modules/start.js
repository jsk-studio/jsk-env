const { spawnSync } = require('child_process')
const path = require('path')

spawnSync("nodemon --watch 'src/' -e ts --exec node -r ts-node/register --inspect ./src/index.ts", [
], { stdio: 'inherit', shell: true })
