#!/usr/bin/env node
const { args } = require('@jsk-env/server-cli')
const { deleteFolderRecursive, createFolders } = require('@jsk-std/io')
const path = require('path')
const compressing = require('compressing') 
const fs = require('fs')

let [rootDir] = args
const root = process.env.JSK_ROOT_DIR || rootDir || '.'
process.env.JSK_ROOT_DIR = rootDir = root

const { spawnSync } = require('child_process');

deleteFolderRecursive(path.join(rootDir, './dist'))

spawnSync('jsk-server build', [], { stdio: 'inherit', shell: true })

const bundleDir = `${rootDir}/dist/bundle`

createFolders([
    bundleDir + '/dist',
    bundleDir + '/conf',
])

copyFiles(rootDir, bundleDir, [
    './package.json',
    './dist/index.js',
    './conf/aliyun.toml',
    './conf/auth.toml',
    './conf/proxy.toml',
])

compressing.zip.compressDir(bundleDir, bundleDir + '.zip').then(() => {
    deleteFolderRecursive(bundleDir)
})


function copyFiles(root, target, files) {
    for (const file of files) {
        const url = path.join(root, file)
        if (!fs.existsSync(url)) {
            continue
        }
        fs.copyFileSync(path.resolve(url), path.join(target, file))
    }
}