#!/usr/bin/env node
const { spawnSync } = require('child_process')
const fs = require('fs');
const path = require('path')
const { args, argv } = require('@jsk-std/rc')

const [cmd = '', ...options] = args

if (!cmd) {
    throw new Error(`Not Support this command: ${cmd}}`)
}

if (argv.port) {
    process.env.PORT = argv.port
}

const params = ['local', 'port', 'inspect-port']
for (const param of params) {
    if (argv[param]) {
        options.push(`--${param}=${argv[param]}`)
    }
}
const commandPath = path.join(__dirname, 'modules', `${cmd}.js`)

if (!fs.existsSync(commandPath)) {
    throw new Error(`Not Support this command: ${cmd}}`)
}

spawnSync(`node ${commandPath}`, options, { stdio: 'inherit', shell: true })

