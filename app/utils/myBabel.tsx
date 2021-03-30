

if (typeof Object.assign != 'function') {
    Object.assign = function (target: any) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
}

if (![].fill) {
    Array.prototype.fill = function (value) {
        var O = Object(this);
        var len = parseInt(O.length);
        var relativeStart = parseInt(arguments[1] || 0);
        var k = relativeStart < 0
            ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len);
        var relativeEnd = parseInt(arguments[2] || len);
        var final = relativeEnd < 0
            ? Math.max(len + relativeEnd, 0)
            : Math.min(relativeEnd, len);
        for (; k < final; k++) {
            O[k] = value;
        }
        return O;
    };
}