!(function (e, r) {
  "object" == typeof exports
      ? (module.exports = exports = r(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")))
      : "function" == typeof define && define.amd
      ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], r)
      : r(e.CryptoJS);
})(this, function (t) {
  return (
      (function () {
          var e = t,
              r = e.lib.BlockCipher,
              i = e.algo,
              f = [],
              u = [],
              h = [],
              y = [],
              a = [],
              p = [],
              v = [],
              _ = [],
              k = [],
              l = [];
          !(function () {
              for (var e = [], r = 0; r < 256; r++) e[r] = r < 128 ? r << 1 : (r << 1) ^ 283;
              var i = 0,
                  o = 0;
              for (r = 0; r < 256; r++) {
                  var t = o ^ (o << 1) ^ (o << 2) ^ (o << 3) ^ (o << 4);
                  (t = (t >>> 8) ^ (255 & t) ^ 99), (f[i] = t);
                  var n = e[(u[t] = i)],
                      c = e[n],
                      s = e[c],
                      d = (257 * e[t]) ^ (16843008 * t);
                  (h[i] = (d << 24) | (d >>> 8)), (y[i] = (d << 16) | (d >>> 16)), (a[i] = (d << 8) | (d >>> 24)), (p[i] = d);
                  d = (16843009 * s) ^ (65537 * c) ^ (257 * n) ^ (16843008 * i);
                  (v[t] = (d << 24) | (d >>> 8)), (_[t] = (d << 16) | (d >>> 16)), (k[t] = (d << 8) | (d >>> 24)), (l[t] = d), i ? ((i = n ^ e[e[e[s ^ n]]]), (o ^= e[e[o]])) : (i = o = 1);
              }
          })();
          var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
              o = (i.AES = r.extend({
                  _doReset: function () {
                      if (!this._nRounds || this._keyPriorReset !== this._key) {
                          for (var e = (this._keyPriorReset = this._key), r = e.words, i = e.sigBytes / 4, o = 4 * (1 + (this._nRounds = 6 + i)), t = (this._keySchedule = []), n = 0; n < o; n++)
                              n < i
                                  ? (t[n] = r[n])
                                  : ((d = t[n - 1]),
                                    n % i
                                        ? 6 < i && n % i == 4 && (d = (f[d >>> 24] << 24) | (f[(d >>> 16) & 255] << 16) | (f[(d >>> 8) & 255] << 8) | f[255 & d])
                                        : ((d = (f[(d = (d << 8) | (d >>> 24)) >>> 24] << 24) | (f[(d >>> 16) & 255] << 16) | (f[(d >>> 8) & 255] << 8) | f[255 & d]), (d ^= S[(n / i) | 0] << 24)),
                                    (t[n] = t[n - i] ^ d));
                          for (var c = (this._invKeySchedule = []), s = 0; s < o; s++) {
                              n = o - s;
                              if (s % 4) var d = t[n];
                              else d = t[n - 4];
                              c[s] = s < 4 || n <= 4 ? d : v[f[d >>> 24]] ^ _[f[(d >>> 16) & 255]] ^ k[f[(d >>> 8) & 255]] ^ l[f[255 & d]];
                          }
                      }
                  },
                  encryptBlock: function (e, r) {
                      this._doCryptBlock(e, r, this._keySchedule, h, y, a, p, f);
                  },
                  decryptBlock: function (e, r) {
                      var i = e[r + 1];
                      (e[r + 1] = e[r + 3]), (e[r + 3] = i), this._doCryptBlock(e, r, this._invKeySchedule, v, _, k, l, u);
                      i = e[r + 1];
                      (e[r + 1] = e[r + 3]), (e[r + 3] = i);
                  },
                  _doCryptBlock: function (e, r, i, o, t, n, c, s) {
                      for (var d = this._nRounds, f = e[r] ^ i[0], u = e[r + 1] ^ i[1], h = e[r + 2] ^ i[2], y = e[r + 3] ^ i[3], a = 4, p = 1; p < d; p++) {
                          var v = o[f >>> 24] ^ t[(u >>> 16) & 255] ^ n[(h >>> 8) & 255] ^ c[255 & y] ^ i[a++],
                              _ = o[u >>> 24] ^ t[(h >>> 16) & 255] ^ n[(y >>> 8) & 255] ^ c[255 & f] ^ i[a++],
                              k = o[h >>> 24] ^ t[(y >>> 16) & 255] ^ n[(f >>> 8) & 255] ^ c[255 & u] ^ i[a++],
                              l = o[y >>> 24] ^ t[(f >>> 16) & 255] ^ n[(u >>> 8) & 255] ^ c[255 & h] ^ i[a++];
                          (f = v), (u = _), (h = k), (y = l);
                      }
                      (v = ((s[f >>> 24] << 24) | (s[(u >>> 16) & 255] << 16) | (s[(h >>> 8) & 255] << 8) | s[255 & y]) ^ i[a++]),
                          (_ = ((s[u >>> 24] << 24) | (s[(h >>> 16) & 255] << 16) | (s[(y >>> 8) & 255] << 8) | s[255 & f]) ^ i[a++]),
                          (k = ((s[h >>> 24] << 24) | (s[(y >>> 16) & 255] << 16) | (s[(f >>> 8) & 255] << 8) | s[255 & u]) ^ i[a++]),
                          (l = ((s[y >>> 24] << 24) | (s[(f >>> 16) & 255] << 16) | (s[(u >>> 8) & 255] << 8) | s[255 & h]) ^ i[a++]);
                      (e[r] = v), (e[r + 1] = _), (e[r + 2] = k), (e[r + 3] = l);
                  },
                  keySize: 8,
              }));
          e.AES = r._createHelper(o);
      })(),
      t.AES
  );
});
