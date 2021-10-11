import Axios from 'axios'

export function createAxiosClient(opts: any) {
    if (typeof opts === 'string') {
        
    }
    return Axios.create({
        baseURL: `opts.port`,
    })
}