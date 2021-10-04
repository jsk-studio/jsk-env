#!/usr/bin/env node
const { args } = require('@jsk-std/rc')
const { deleteFolderRecursive, copyFilesSync } = require('@jsk-std/io')
const path = require('path')
const compressing = require('compressing') 
const { spawnSync } = require('child_process');

let [rootDir] = args
const root = process.env.JSK_ROOT_DIR || rootDir || '.'
process.env.JSK_ROOT_DIR = rootDir = root

deleteFolderRecursive(path.join(rootDir, './dist'))

spawnSync('jsk-server build', [], { stdio: 'inherit', shell: true })

const bundleDir = `${rootDir}/dist/bundle`

copyFilesSync(rootDir, bundleDir, [
    './package.json',
    './dist/index.js',
    './conf/aliyun.toml',
    './conf/auth.toml',
    './conf/proxy.toml',
])

compressing.zip.compressDir(bundleDir, bundleDir + '.zip').then(() => {
    deleteFolderRecursive(bundleDir)
})
