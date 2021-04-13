if (typeof Object.assign !== 'function') {
    Object.assign = function (target: any, ...argument: any[]): any {
        for (let i = 1; i < argument.length; i++) {
            const source = argument[i]
            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }
}

if (![].fill) {
    Array.prototype.fill = function (value, ...argument: any[]) {
        const O = Object(this)
        const len = parseInt(O.length)
        const relativeStart = parseInt(argument[0] || 0)
        let k = relativeStart < 0
            ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len)
        const relativeEnd = parseInt(argument[1] || len)
        const final = relativeEnd < 0
            ? Math.max(len + relativeEnd, 0)
            : Math.min(relativeEnd, len)
        for (; k < final; k++) {
            O[k] = value
        }
        return O
    }
}