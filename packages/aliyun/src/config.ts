import { configs } from "@jsk-env/args"

export const aliyunConfigs = configs['aliyun']
declare module '@jsk-env/args' {
    export interface EnvConfigs {
        aliyun: IAliyunConfigs
    }
}

type IAliyunConfigs = {
    dev?: boolean,
    oss?: MapKeyTypes<IAliyunOSSItem>,
    res?: MapKeyTypes<IAliyunOSSResItem>,
    fc?: MapKeyTypes<IAliyunFCItem>,
    sms?: MapKeyTypes<IAliyunSMSItem>,
    mysql?:  MapKeyTypes<IMysqlItem>,
    redis?: MapKeyTypes<IRedisItem>,
}

type IMysqlItem = {
    database: string,
    host?: string
}

type IAliyunOSSItem = {
    region: string,
    bucket: string,
    endpoint: string,
}
type IAliyunOSSResItem = {
    client?: string,
    package?: string,
}
type IAliyunFCItem = {
    region: string,
    alias: string,
}
type IAliyunSMSItem = {
    sign: string,
    template: string,
}

type IRedisItem = {
    host: string,
}

type MapKeyTypes<T> = { [key in string] : T } & T
