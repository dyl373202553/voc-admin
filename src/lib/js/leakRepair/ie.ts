export default () => {
    // @ts-ignore
    if (typeof Array.includes === "undefined") {
        Array.prototype.includes = function (obj) { // eslint-disable-line
            return this.indexOf(obj) >= 0
        }
    }
    // @ts-ignore
    if (typeof Array.findIndex === "undefined") {
        // Array.prototype.findIndex = function(obj) {
        //     for (var i in this) {
        //         if (this[i] == obj) {
        //             return i;
        //         }
        //     }
        //     return -1
        // }
        Object.defineProperty(Array.prototype, "findIndex", { // eslint-disable-line
            value: function (predicate: any) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError("\"this\" is null or not defined")
                }

                const o = Object(this)

                // 2. Let len be ? ToLength(? Get(O, "length")).
                const len = o.length >>> 0

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== "function") {
                    throw new TypeError("predicate must be a function")
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                const thisArg = arguments[1] // eslint-disable-line

                // 5. Let k be 0.
                let k = 0

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    const kValue = o[k]
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k
                    }
                    // e. Increase k by 1.
                    k++
                }

                // 7. Return -1.
                return -1
            }
        })
    }
    // @ts-ignore
    if (typeof Array.find === "undefined") {
        Array.prototype.find = function (fn: any) { // eslint-disable-line
            for (const i in this) {
                if (fn(this[i], i, this) === true) {
                    return this[i]
                }
            }
            return undefined
        }
    }

    // Date.prototype.clone=function(){
    //     return new Date(this.valueOf());
    // }
}
