const { spawnSync } = require('child_process')
const { argv } = require('@jsk-std/rc')

const exec = [
    argv['inspect-port'] ? `--inspect-port=${argv['inspect-port']}` : '',
    `--watch 'src/' -e ts`,
    `--exec node -r ts-node/register --inspect ./src/index.ts`
]

const argOptions = []
const params = ['local']
for (const param of params) {
    if (argv[param]) {
        argOptions.push(`--${param}=${argv[param]}`)
    }
}

console.log(argOptions)

spawnSync(
    "nodemon " + exec.filter(Boolean).join(' '), 
    argOptions,
    { stdio: 'inherit', shell: true },
)
