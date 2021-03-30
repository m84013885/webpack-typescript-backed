import * as md5 from "md5"
const _fetch = async (obj: any) => {
    const CREDS = 'include'
    const SALT = ''

    // 判断接口状态码是否合理
    const checkStatus = (response: any) => {
        if (response.status >= 200 && response.status < 300) { return response }
        const error: any = new Error(response.statusText)
        error.response = response
        throw error
    }
    // 必要参数
    const Mustparameter = () => {
        return {
            ts: new Date().getTime(),
        }
    }
    // 拼接参数
    const sigSortObj = (obj: any) => {
        if (!obj) { return '' }
        const arr = []
        let sigString = ''
        for (const key in obj) { arr.push(key) }
        arr.sort()
        for (let i = arr.length - 1; i >= 0; i--) {
            const key = arr[i]
            const tail = i === 0 ? '' : '&'
            sigString = sigString + (key + '=' + encodeURIComponent(obj[key])) + tail
        }
        return sigString
    }
    // 获取sig
    const sigFunc = (query: any, body: any) => {
        query = Object.assign(Mustparameter(), query)
        const sigQueryString = sigSortObj(query)
        if (body) {
            const sigBodyString = sigSortObj(body)
            const sig = md5(`${sigBodyString}&${sigQueryString}&salt=${SALT}`)
            return `sig=${sig}&${sigQueryString}`
        }
        else {
            const sig = md5(`${sigQueryString}&salt=${SALT}`)
            return `sig=${sig}&${sigQueryString}`
        }
    }
    const urlTail = sigFunc(obj.query, obj.body)
    const url = `${obj.url}?${urlTail}`
    const method = obj.method || 'GET'
    const credentials = obj.credentials || CREDS
    const data = obj.body || null
    let confFetch: any = { method, credentials }
    if (method === 'POST') { confFetch = { method, credentials, body: JSON.stringify(data) } }
    return new Promise((resolve, reject) => {
        fetch(url, confFetch)
            .then(checkStatus)
            .then((res: any) => res.json())
            .then((res: any) => {
                resolve(res)
            })
            .catch((err: any) => { reject(err) })
    })
}

export default _fetch