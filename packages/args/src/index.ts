import fs from 'fs'
import toml from 'toml'
import path from 'path'
import { xSingleton } from '@jsk-std/x'
import _merge from 'lodash/merge'

export function readTomlConfig<T = any>(resolvePath: string): Partial<T> {
    const rootPathStr = process.env.JSK_CONFIG_PATHS || path.resolve('./conf')
    const rootPaths = rootPathStr.split(' ')
    let res = {} as T
    let merged = false
    for (const rootPath of rootPaths) {
        const mpath = path.resolve(`${rootPath}/${resolvePath}.toml`)
        const devpath = path.resolve(`${rootPath}/${resolvePath}.dev.toml`)
        if (fs.existsSync(mpath)) {
            const str = fs.readFileSync(mpath, 'utf-8')
            res = _merge(res, toml.parse(str))
            merged = true
        }
        if (fs.existsSync(devpath)) {
            const str = fs.readFileSync(devpath, 'utf-8')
            res = _merge(res, toml.parse(str), { dev: true })
            merged = true
        }
    }
    if (!merged) {
        throw new Error('Can not read configs files: ' + rootPathStr + '---' + resolvePath)
    }
    return res
}

export interface EnvConfigs {}

export const configs: EnvConfigs = xSingleton(key => {
    return readTomlConfig(key)
})