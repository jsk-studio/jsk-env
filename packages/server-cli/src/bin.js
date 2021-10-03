#!/usr/bin/env node
const { spawnSync } = require('child_process')
const fs = require('fs');
const path = require('path')
const { args } = require('./utils/args')

const [cmd = '', ...options] = args

if (!cmd) {
    throw new Error(`Not Support this command: ${cmd}}`)
}

const commandPath = path.join(__dirname, 'modules', `${cmd}.js`)

if (!fs.existsSync(commandPath)) {
    throw new Error(`Not Support this command: ${cmd}}`)
}

spawnSync(`node ${commandPath}`, options, { stdio: 'inherit', shell: true })

