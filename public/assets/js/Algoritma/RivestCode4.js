!(function (e, r) {
    "object" == typeof exports
        ? (module.exports = exports = r(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")))
        : "function" == typeof define && define.amd
        ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], r)
        : r(e.CryptoJS);
})(this, function (s) {
    return (
        (function () {
            var e = s,
                r = e.lib.StreamCipher,
                i = e.algo,
                t = (i.RC4 = r.extend({
                    _doReset: function () {
                        for (var e = this._key, r = e.words, i = e.sigBytes, t = (this._S = []), o = 0; o < 256; o++) t[o] = o;
                        o = 0;
                        for (var c = 0; o < 256; o++) {
                            var s = o % i,
                                n = (r[s >>> 2] >>> (24 - (s % 4) * 8)) & 255;
                            c = (c + t[o] + n) % 256;
                            var f = t[o];
                            (t[o] = t[c]), (t[c] = f);
                        }
                        this._i = this._j = 0;
                    },
                    _doProcessBlock: function (e, r) {
                        e[r] ^= o.call(this);
                    },
                    keySize: 8,
                    ivSize: 0,
                }));
            function o() {
                for (var e = this._S, r = this._i, i = this._j, t = 0, o = 0; o < 4; o++) {
                    i = (i + e[(r = (r + 1) % 256)]) % 256;
                    var c = e[r];
                    (e[r] = e[i]), (e[i] = c), (t |= e[(e[r] + e[i]) % 256] << (24 - 8 * o));
                }
                return (this._i = r), (this._j = i), t;
            }
            e.RC4 = r._createHelper(t);
            var c = (i.RC4Drop = t.extend({
                cfg: t.cfg.extend({ drop: 192 }),
                _doReset: function () {
                    t._doReset.call(this);
                    for (var e = this.cfg.drop; 0 < e; e--) o.call(this);
                },
            }));
            e.RC4Drop = r._createHelper(c);
        })(),
        s.RC4
    );
});
