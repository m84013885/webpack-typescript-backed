/**
 *  根据时间戳返回两者时间差
 * @param {Number} timeStart
 * @param {Number} timeEnd
 */

export const renderTime = (timeStart: number, timeEnd: number) => {
    const timeStartYear = new Date(timeStart).getFullYear() // 开始年
    const timeStartMonth = new Date(timeStart).getMonth() + 1 // 开始月
    const timeStartDay = new Date(timeStart).getDate() // 开始日

    const timeEndYear = new Date(timeEnd).getFullYear() // 结束年
    const timeEndMonth = new Date(timeEnd).getMonth() + 1 // 结束月
    const timeEndDay = new Date(timeEnd).getDate() // 结束日

    let year = 0
    if (timeStartYear !== timeEndYear) {
        if (timeStartMonth >= timeEndMonth || timeStartDay >= timeEndDay) {
            year = timeEndYear - timeStartYear - 1
            timeStart = new Date(`${timeEndYear - 1}/${timeStartMonth}/${timeStartDay}`).getTime()   // 获取最后年的时间戳
        } else {
            year = timeEndYear - timeStartYear
            timeStart = new Date(`${timeEndYear}/${timeStartMonth}/${timeStartDay}`).getTime()   // 获取最后年的时间戳
        }
    }
    const time = (Math.abs(timeEnd - timeStart)) / 1000
    let day = time > 60 * 60 * 24 ? parseInt(time / (60 * 60 * 24) + '') : 0
    let hour = time > 60 * 60 ? parseInt(time / (60 * 60) + '') - (day * 24) : 0
    let minute = time > 60 ? parseInt(time / 60 + '') - (day * 24 * 60) - (hour * 60) : 0
    let second = parseInt(time + '') - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)

    return { year, day, hour, minute, second }
}

/**
 *  获取 url 后面通过?传参的参数
 * @param {String} name
 */
export const getQueryString = (name: string) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const url = window.location.href
    const search = url.substring(url.lastIndexOf('?') + 1)
    const r = search.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
}

/**
 * 对象深度克隆,
 * JSON.stringify深度克隆对象
 * 无法对函数 、RegExp等特殊对象的克隆,
 * 会抛弃对象的constructor,所有的构造函数会指向Object
 * 对象有循环引用,会报错
 * @param {Object}  obj 克隆的对象
 */

export const objDeepClone = (obj: any) => {
    return clone(obj)
}

const isType = (obj: any, type?: string) => {
    if (typeof obj !== 'object') return false;
    // 判断数据类型的经典方法：
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
        case 'Array':
            flag = typeString === '[object Array]';
            break;
        case 'Date':
            flag = typeString === '[object Date]';
            break;
        case 'RegExp':
            flag = typeString === '[object RegExp]';
            break;
        default:
            flag = false;
    }
    return flag;
};

/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = (parent: any) => {
    // 维护两个储存循环引用的数组
    const parents: any = []
    const children: any = []

    const _clone = (parent: any) => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent

        let child, proto

        if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = []
        } else if (isType(parent, 'RegExp')) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source)
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'Date')) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime())
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent)
            // 利用Object.create切断原型链
            child = Object.create(proto)
        }

        // 处理循环引用
        const index = parents.indexOf(parent)

        if (index !== -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index]
        }
        parents.push(parent)
        children.push(child)

        for (const i in parent) {
            // 递归
            child[i] = _clone(parent[i])
        }

        return child
    }
    return _clone(parent)
}

