import { configs } from "@jsk-env/args"
export const authConfigs = configs['auth']

declare module '@jsk-env/args' {
    export interface EnvConfigs {
        auth: IAuthConfigs
    }
}

type MapKeyTypes<T> = { [key in string] : T } & T

type IAuthConfigs = {
    aliyun?: MapKeyTypes<IAliyunAuth>,
    wechat?: MapKeyTypes<IWechatAuth>,
    mysql?: MapKeyTypes<IMysqlAuth>,
    redis?: MapKeyTypes<IRedisAuth>,
}

type IAliyunAuth = {
    accessKeyId: string,
    accessKeySecret: string,
    accountId: number,
}

type IWechatAuth = {
    appId: string,
    appSecret: string,
}

type IMysqlAuth = {
    user: string,
    password: string,
}

type IRedisAuth = {
    password: string,
}