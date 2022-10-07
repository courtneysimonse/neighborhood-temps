// !function (e, t) {
//   'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : ((e = 'undefined' != typeof globalThis ? globalThis : e || self) [''] = e[''] || {
//   }, e['']['/dist/mapbox-gl-arcgis-featureserver'] = e['']['/dist/mapbox-gl-arcgis-featureserver'] || {
//   }, e['']['/dist/mapbox-gl-arcgis-featureserver'].min = e['']['/dist/mapbox-gl-arcgis-featureserver'].min || {
//   }, e['']['/dist/mapbox-gl-arcgis-featureserver'].min.js = t())
// }
!function (e, t) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    //console.log(this);
    var e;
    e = 'undefined' != typeof window ? window : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this,
    e.FeatureService = t()
  }
}
(this,
  (function () {
  'use strict';
  var e = Math.PI / 180,
  t = 180 / Math.PI;
  function i(e) {
    var t = r(e[0] + 1, e[2]);
    return [r(e[0], e[2]),
    s(e[1] + 1, e[2]),
    t,
    s(e[1], e[2])]
  }
  function r(e, t) {
    return e / Math.pow(2, t) * 360 - 180
  }
  function s(e, i) {
    var r = Math.PI - 2 * Math.PI * e / Math.pow(2, i);
    return t * Math.atan(0.5 * (Math.exp(r) - Math.exp( - r)))
  }
  function n(e, t, i) {
    var r = h(e, t, i);
    return r[0] = Math.floor(r[0]),
    r[1] = Math.floor(r[1]),
    r
  }
  function a(e) {
    return [[2 * e[0],
    2 * e[1],
    e[2] + 1],
    [
      2 * e[0] + 1,
      2 * e[1],
      e[2] + 1
    ],
    [
      2 * e[0] + 1,
      2 * e[1] + 1,
      e[2] + 1
    ],
    [
      2 * e[0],
      2 * e[1] + 1,
      e[2] + 1
    ]]
  }
  function o(e) {
    return [e[0] >> 1,
    e[1] >> 1,
    e[2] - 1]
  }
  function l(e) {
    return a(o(e))
  }
  function u(e, t) {
    for (var i = 0; i < e.length; i++) if (d(e[i], t)) return !0;
    return !1
  }
  function d(e, t) {
    return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
  }
  function h(t, i, r) {
    var s = Math.sin(i * e),
    n = Math.pow(2, r),
    a = n * (t / 360 + 0.5);
    return (a %= n) < 0 && (a += n),
    [
      a,
      n * (0.5 - 0.25 * Math.log((1 + s) / (1 - s)) / Math.PI),
      r
    ]
  }
  var c = {
    tileToGeoJSON: function (e) {
      var t = i(e);
      return {
        type: 'Polygon',
        coordinates: [
          [[t[0],
          t[3]],
          [
            t[0],
            t[1]
          ],
          [
            t[2],
            t[1]
          ],
          [
            t[2],
            t[3]
          ],
          [
            t[0],
            t[3]
          ]]
        ]
      }
    },
    tileToBBOX: i,
    getChildren: a,
    getParent: o,
    getSiblings: l,
    hasTile: u,
    hasSiblings: function (e, t) {
      for (var i = l(e), r = 0; r < i.length; r++) if (!u(t, i[r])) return !1;
      return !0
    },
    tilesEqual: d,
    tileToQuadkey: function (e) {
      for (var t = '', i = e[2]; i > 0; i--) {
        var r = 0,
        s = 1 << i - 1;
        0 != (e[0] & s) && r++,
        0 != (e[1] & s) && (r += 2),
        t += r.toString()
      }
      return t
    },
    quadkeyToTile: function (e) {
      for (var t = 0, i = 0, r = e.length, s = r; s > 0; s--) {
        var n = 1 << s - 1,
        a = + e[r - s];
        1 === a && (t |= n),
        2 === a && (i |= n),
        3 === a && (t |= n, i |= n)
      }
      return [t,
      i,
      r]
    },
    pointToTile: n,
    bboxToTile: function (e) {
      var t = n(e[0], e[1], 32),
      i = n(e[2], e[3], 32),
      r = [
        t[0],
        t[1],
        i[0],
        i[1]
      ],
      s = function (e) {
        for (var t = 28, i = 0; i < t; i++) {
          var r = 1 << 32 - (i + 1);
          if ((e[0] & r) != (e[2] & r) || (e[1] & r) != (e[3] & r)) return i
        }
        return t
      }(r);
      return 0 === s ? [
        0,
        0,
        0
      ] : [
        r[0] >>> 32 - s,
        r[1] >>> 32 - s,
        s
      ]
    },
    pointToTileFraction: h
  },
  p = {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    read: function (e, t, i, r, s) {
      var n,
      a,
      o = 8 * s - r - 1,
      l = (1 << o) - 1,
      u = l >> 1,
      d = - 7,
      h = i ? s - 1 : 0,
      c = i ? - 1 : 1,
      p = e[t + h];
      for (h += c, n = p & (1 << - d) - 1, p >>= - d, d += o; d > 0; n = 256 * n + e[t + h], h += c, d -= 8);
      for (a = n & (1 << - d) - 1, n >>= - d, d += r; d > 0; a = 256 * a + e[t + h], h += c, d -= 8);
      if (0 === n) n = 1 - u;
       else {
        if (n === l) return a ? NaN : 1 / 0 * (p ? - 1 : 1);
        a += Math.pow(2, r),
        n -= u
      }
      return (p ? - 1 : 1) * a * Math.pow(2, n - r)
    },
    write: function (e, t, i, r, s, n) {
      var a,
      o,
      l,
      u = 8 * n - s - 1,
      d = (1 << u) - 1,
      h = d >> 1,
      c = 23 === s ? Math.pow(2, - 24) - Math.pow(2, - 77) : 0,
      p = r ? 0 : n - 1,
      f = r ? 1 : - 1,
      v = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
      for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0, a = d) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, - a)) < 1 && (a--, l *= 2), (t += a + h >= 1 ? c / l : c * Math.pow(2, 1 - h)) * l >= 2 && (a++, l /= 2), a + h >= d ? (o = 0, a = d) : a + h >= 1 ? (o = (t * l - 1) * Math.pow(2, s), a += h) : (o = t * Math.pow(2, h - 1) * Math.pow(2, s), a = 0)); s >= 8; e[i + p] = 255 & o, p += f, o /= 256, s -= 8);
      for (a = a << s | o, u += s; u > 0; e[i + p] = 255 & a, p += f, a /= 256, u -= 8);
      e[i + p - f] |= 128 * v
    }
  },
  f = y,
  v = p;
  function y(e) {
    this.buf = ArrayBuffer.isView && ArrayBuffer.isView(e) ? e : new Uint8Array(e || 0),
    this.pos = 0,
    this.type = 0,
    this.length = this.buf.length
  }
  y.Varint = 0,
  y.Fixed64 = 1,
  y.Bytes = 2,
  y.Fixed32 = 5;
  var g,
  F = 4294967296,
  w = 1 / F,
  m = 'undefined' == typeof TextDecoder ? null : new TextDecoder('utf8');
  function _(e) {
    return e.type === y.Bytes ? e.readVarint() + e.pos : e.pos + 1
  }
  function S(e, t, i) {
    return i ? 4294967296 * t + (e >>> 0) : 4294967296 * (t >>> 0) + (e >>> 0)
  }
  function b(e, t, i) {
    var r = t <= 16383 ? 1 : t <= 2097151 ? 2 : t <= 268435455 ? 3 : Math.floor(Math.log(t) / (7 * Math.LN2));
    i.realloc(r);
    for (var s = i.pos - 1; s >= e; s--) i.buf[s + r] = i.buf[s]
  }
  function T(e, t) {
    for (var i = 0; i < e.length; i++) t.writeVarint(e[i])
  }
  function V(e, t) {
    for (var i = 0; i < e.length; i++) t.writeSVarint(e[i])
  }
  function x(e, t) {
    for (var i = 0; i < e.length; i++) t.writeFloat(e[i])
  }
  function M(e, t) {
    for (var i = 0; i < e.length; i++) t.writeDouble(e[i])
  }
  function R(e, t) {
    for (var i = 0; i < e.length; i++) t.writeBoolean(e[i])
  }
  function O(e, t) {
    for (var i = 0; i < e.length; i++) t.writeFixed32(e[i])
  }
  function B(e, t) {
    for (var i = 0; i < e.length; i++) t.writeSFixed32(e[i])
  }
  function I(e, t) {
    for (var i = 0; i < e.length; i++) t.writeFixed64(e[i])
  }
  function k(e, t) {
    for (var i = 0; i < e.length; i++) t.writeSFixed64(e[i])
  }
  function P(e, t) {
    return (e[t] | e[t + 1] << 8 | e[t + 2] << 16) + 16777216 * e[t + 3]
  }
  function G(e, t, i) {
    e[i] = t,
    e[i + 1] = t >>> 8,
    e[i + 2] = t >>> 16,
    e[i + 3] = t >>> 24
  }
  function q(e, t) {
    return (e[t] | e[t + 1] << 8 | e[t + 2] << 16) + (e[t + 3] << 24)
  }
  y.prototype = {
    destroy: function () {
      this.buf = null
    },
    readFields: function (e, t, i) {
      for (i = i || this.length; this.pos < i; ) {
        var r = this.readVarint(),
        s = r >> 3,
        n = this.pos;
        this.type = 7 & r,
        e(s, t, this),
        this.pos === n && this.skip(r)
      }
      return t
    },
    readMessage: function (e, t) {
      return this.readFields(e, t, this.readVarint() + this.pos)
    },
    readFixed32: function () {
      var e = P(this.buf, this.pos);
      return this.pos += 4,
      e
    },
    readSFixed32: function () {
      var e = q(this.buf, this.pos);
      return this.pos += 4,
      e
    },
    readFixed64: function () {
      var e = P(this.buf, this.pos) + P(this.buf, this.pos + 4) * F;
      return this.pos += 8,
      e
    },
    readSFixed64: function () {
      var e = P(this.buf, this.pos) + q(this.buf, this.pos + 4) * F;
      return this.pos += 8,
      e
    },
    readFloat: function () {
      var e = v.read(this.buf, this.pos, !0, 23, 4);
      return this.pos += 4,
      e
    },
    readDouble: function () {
      var e = v.read(this.buf, this.pos, !0, 52, 8);
      return this.pos += 8,
      e
    },
    readVarint: function (e) {
      var t,
      i,
      r = this.buf;
      return t = 127 & (i = r[this.pos++]),
      i < 128 ? t : (t |= (127 & (i = r[this.pos++])) << 7, i < 128 ? t : (t |= (127 & (i = r[this.pos++])) << 14, i < 128 ? t : (t |= (127 & (i = r[this.pos++])) << 21, i < 128 ? t : function (e, t, i) {
        var r,
        s,
        n = i.buf;
        if (s = n[i.pos++], r = (112 & s) >> 4, s < 128) return S(e, r, t);
        if (s = n[i.pos++], r |= (127 & s) << 3, s < 128) return S(e, r, t);
        if (s = n[i.pos++], r |= (127 & s) << 10, s < 128) return S(e, r, t);
        if (s = n[i.pos++], r |= (127 & s) << 17, s < 128) return S(e, r, t);
        if (s = n[i.pos++], r |= (127 & s) << 24, s < 128) return S(e, r, t);
        if (s = n[i.pos++], r |= (1 & s) << 31, s < 128) return S(e, r, t);
        throw new Error('Expected varint not more than 10 bytes')
      }(t |= (15 & (i = r[this.pos])) << 28, e, this))))
    },
    readVarint64: function () {
      return this.readVarint(!0)
    },
    readSVarint: function () {
      var e = this.readVarint();
      return e % 2 == 1 ? (e + 1) / - 2 : e / 2
    },
    readBoolean: function () {
      return Boolean(this.readVarint())
    },
    readString: function () {
      var e = this.readVarint() + this.pos,
      t = this.pos;
      return this.pos = e,
      e - t >= 12 && m ? function (e, t, i) {
        return m.decode(e.subarray(t, i))
      }(this.buf, t, e) : function (e, t, i) {
        var r = '',
        s = t;
        for (; s < i; ) {
          var n,
          a,
          o,
          l = e[s],
          u = null,
          d = l > 239 ? 4 : l > 223 ? 3 : l > 191 ? 2 : 1;
          if (s + d > i) break;
          1 === d ? l < 128 && (u = l) : 2 === d ? 128 == (192 & (n = e[s + 1])) && (u = (31 & l) << 6 | 63 & n) <= 127 && (u = null) : 3 === d ? (n = e[s + 1], a = e[s + 2], 128 == (192 & n) && 128 == (192 & a) && ((u = (15 & l) << 12 | (63 & n) << 6 | 63 & a) <= 2047 || u >= 55296 && u <= 57343) && (u = null)) : 4 === d && (n = e[s + 1], a = e[s + 2], o = e[s + 3], 128 == (192 & n) && 128 == (192 & a) && 128 == (192 & o) && ((u = (15 & l) << 18 | (63 & n) << 12 | (63 & a) << 6 | 63 & o) <= 65535 || u >= 1114112) && (u = null)),
          null === u ? (u = 65533, d = 1) : u > 65535 && (u -= 65536, r += String.fromCharCode(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u),
          r += String.fromCharCode(u),
          s += d
        }
        return r
      }(this.buf, t, e)
    },
    readBytes: function () {
      var e = this.readVarint() + this.pos,
      t = this.buf.subarray(this.pos, e);
      return this.pos = e,
      t
    },
    readPackedVarint: function (e, t) {
      if (this.type !== y.Bytes) return e.push(this.readVarint(t));
      var i = _(this);
      for (e = e || [
      ]; this.pos < i; ) e.push(this.readVarint(t));
      return e
    },
    readPackedSVarint: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readSVarint());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readSVarint());
      return e
    },
    readPackedBoolean: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readBoolean());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readBoolean());
      return e
    },
    readPackedFloat: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readFloat());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readFloat());
      return e
    },
    readPackedDouble: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readDouble());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readDouble());
      return e
    },
    readPackedFixed32: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readFixed32());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readFixed32());
      return e
    },
    readPackedSFixed32: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readSFixed32());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readSFixed32());
      return e
    },
    readPackedFixed64: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readFixed64());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readFixed64());
      return e
    },
    readPackedSFixed64: function (e) {
      if (this.type !== y.Bytes) return e.push(this.readSFixed64());
      var t = _(this);
      for (e = e || [
      ]; this.pos < t; ) e.push(this.readSFixed64());
      return e
    },
    skip: function (e) {
      var t = 7 & e;
      if (t === y.Varint) for (; this.buf[this.pos++] > 127; );
       else if (t === y.Bytes) this.pos = this.readVarint() + this.pos;
       else if (t === y.Fixed32) this.pos += 4;
       else {
        if (t !== y.Fixed64) throw new Error('Unimplemented type: ' + t);
        this.pos += 8
      }
    },
    writeTag: function (e, t) {
      this.writeVarint(e << 3 | t)
    },
    realloc: function (e) {
      for (var t = this.length || 16; t < this.pos + e; ) t *= 2;
      if (t !== this.length) {
        var i = new Uint8Array(t);
        i.set(this.buf),
        this.buf = i,
        this.length = t
      }
    },
    finish: function () {
      return this.length = this.pos,
      this.pos = 0,
      this.buf.subarray(0, this.length)
    },
    writeFixed32: function (e) {
      this.realloc(4),
      G(this.buf, e, this.pos),
      this.pos += 4
    },
    writeSFixed32: function (e) {
      this.realloc(4),
      G(this.buf, e, this.pos),
      this.pos += 4
    },
    writeFixed64: function (e) {
      this.realloc(8),
      G(this.buf, - 1 & e, this.pos),
      G(this.buf, Math.floor(e * w), this.pos + 4),
      this.pos += 8
    },
    writeSFixed64: function (e) {
      this.realloc(8),
      G(this.buf, - 1 & e, this.pos),
      G(this.buf, Math.floor(e * w), this.pos + 4),
      this.pos += 8
    },
    writeVarint: function (e) {
      (e = + e || 0) > 268435455 || e < 0 ? function (e, t) {
        var i,
        r;
        e >= 0 ? (i = e % 4294967296 | 0, r = e / 4294967296 | 0) : (r = ~( - e / 4294967296), 4294967295 ^ (i = ~( - e % 4294967296)) ? i = i + 1 | 0 : (i = 0, r = r + 1 | 0));
        if (e >= 18446744073709552000 || e < - 18446744073709552000) throw new Error('Given varint doesn\'t fit into 10 bytes');
        t.realloc(10),
        function (e, t, i) {
          i.buf[i.pos++] = 127 & e | 128,
          e >>>= 7,
          i.buf[i.pos++] = 127 & e | 128,
          e >>>= 7,
          i.buf[i.pos++] = 127 & e | 128,
          e >>>= 7,
          i.buf[i.pos++] = 127 & e | 128,
          e >>>= 7,
          i.buf[i.pos] = 127 & e
        }(i, 0, t),
        function (e, t) {
          var i = (7 & e) << 4;
          if (t.buf[t.pos++] |= i | ((e >>>= 3) ? 128 : 0), !e) return;
          if (t.buf[t.pos++] = 127 & e | ((e >>>= 7) ? 128 : 0), !e) return;
          if (t.buf[t.pos++] = 127 & e | ((e >>>= 7) ? 128 : 0), !e) return;
          if (t.buf[t.pos++] = 127 & e | ((e >>>= 7) ? 128 : 0), !e) return;
          if (t.buf[t.pos++] = 127 & e | ((e >>>= 7) ? 128 : 0), !e) return;
          t.buf[t.pos++] = 127 & e
        }(r, t)
      }(e, this) : (this.realloc(4), this.buf[this.pos++] = 127 & e | (e > 127 ? 128 : 0), e <= 127 || (this.buf[this.pos++] = 127 & (e >>>= 7) | (e > 127 ? 128 : 0), e <= 127 || (this.buf[this.pos++] = 127 & (e >>>= 7) | (e > 127 ? 128 : 0), e <= 127 || (this.buf[this.pos++] = e >>> 7 & 127))))
    },
    writeSVarint: function (e) {
      this.writeVarint(e < 0 ? 2 * - e - 1 : 2 * e)
    },
    writeBoolean: function (e) {
      this.writeVarint(Boolean(e))
    },
    writeString: function (e) {
      e = String(e),
      this.realloc(4 * e.length),
      this.pos++;
      var t = this.pos;
      this.pos = function (e, t, i) {
        for (var r, s, n = 0; n < t.length; n++) {
          if ((r = t.charCodeAt(n)) > 55295 && r < 57344) {
            if (!s) {
              r > 56319 || n + 1 === t.length ? (e[i++] = 239, e[i++] = 191, e[i++] = 189) : s = r;
              continue
            }
            if (r < 56320) {
              e[i++] = 239,
              e[i++] = 191,
              e[i++] = 189,
              s = r;
              continue
            }
            r = s - 55296 << 10 | r - 56320 | 65536,
            s = null
          } else s && (e[i++] = 239, e[i++] = 191, e[i++] = 189, s = null);
          r < 128 ? e[i++] = r : (r < 2048 ? e[i++] = r >> 6 | 192 : (r < 65536 ? e[i++] = r >> 12 | 224 : (e[i++] = r >> 18 | 240, e[i++] = r >> 12 & 63 | 128), e[i++] = r >> 6 & 63 | 128), e[i++] = 63 & r | 128)
        }
        return i
      }(this.buf, e, this.pos);
      var i = this.pos - t;
      i >= 128 && b(t, i, this),
      this.pos = t - 1,
      this.writeVarint(i),
      this.pos += i
    },
    writeFloat: function (e) {
      this.realloc(4),
      v.write(this.buf, e, this.pos, !0, 23, 4),
      this.pos += 4
    },
    writeDouble: function (e) {
      this.realloc(8),
      v.write(this.buf, e, this.pos, !0, 52, 8),
      this.pos += 8
    },
    writeBytes: function (e) {
      var t = e.length;
      this.writeVarint(t),
      this.realloc(t);
      for (var i = 0; i < t; i++) this.buf[this.pos++] = e[i]
    },
    writeRawMessage: function (e, t) {
      this.pos++;
      var i = this.pos;
      e(t, this);
      var r = this.pos - i;
      r >= 128 && b(i, r, this),
      this.pos = i - 1,
      this.writeVarint(r),
      this.pos += r
    },
    writeMessage: function (e, t, i) {
      this.writeTag(e, y.Bytes),
      this.writeRawMessage(t, i)
    },
    writePackedVarint: function (e, t) {
      t.length && this.writeMessage(e, T, t)
    },
    writePackedSVarint: function (e, t) {
      t.length && this.writeMessage(e, V, t)
    },
    writePackedBoolean: function (e, t) {
      t.length && this.writeMessage(e, R, t)
    },
    writePackedFloat: function (e, t) {
      t.length && this.writeMessage(e, x, t)
    },
    writePackedDouble: function (e, t) {
      t.length && this.writeMessage(e, M, t)
    },
    writePackedFixed32: function (e, t) {
      t.length && this.writeMessage(e, O, t)
    },
    writePackedSFixed32: function (e, t) {
      t.length && this.writeMessage(e, B, t)
    },
    writePackedFixed64: function (e, t) {
      t.length && this.writeMessage(e, I, t)
    },
    writePackedSFixed64: function (e, t) {
      t.length && this.writeMessage(e, k, t)
    },
    writeBytesField: function (e, t) {
      this.writeTag(e, y.Bytes),
      this.writeBytes(t)
    },
    writeFixed32Field: function (e, t) {
      this.writeTag(e, y.Fixed32),
      this.writeFixed32(t)
    },
    writeSFixed32Field: function (e, t) {
      this.writeTag(e, y.Fixed32),
      this.writeSFixed32(t)
    },
    writeFixed64Field: function (e, t) {
      this.writeTag(e, y.Fixed64),
      this.writeFixed64(t)
    },
    writeSFixed64Field: function (e, t) {
      this.writeTag(e, y.Fixed64),
      this.writeSFixed64(t)
    },
    writeVarintField: function (e, t) {
      this.writeTag(e, y.Varint),
      this.writeVarint(t)
    },
    writeSVarintField: function (e, t) {
      this.writeTag(e, y.Varint),
      this.writeSVarint(t)
    },
    writeStringField: function (e, t) {
      this.writeTag(e, y.Bytes),
      this.writeString(t)
    },
    writeFloatField: function (e, t) {
      this.writeTag(e, y.Fixed32),
      this.writeFloat(t)
    },
    writeDoubleField: function (e, t) {
      this.writeTag(e, y.Fixed64),
      this.writeDouble(t)
    },
    writeBooleanField: function (e, t) {
      this.writeVarintField(e, Boolean(t))
    }
  };
  var j = g = {
  };
  function N(e) {
    let t;
    try {
      t = g.read(new f(e))
    } catch (e) {
      throw new Error('Could not parse arcgis-pbf buffer')
    }
    const i = t.queryResult.featureResult,
    r = i.transform,
    s = i.geometryType,
    n = i.objectIdFieldName,
    a = i.fields;
    for (let e = 0; e < a.length; e++) {
      const t = a[e];
      t.keyName = z(t)
    }
    const o = {
      type: 'FeatureCollection',
      features: [
      ]
    },
    l = function (e) {
      switch (e) {
        case 3:
          return A;
        case 2:
          return E;
        case 0:
          return D;
        default:
          return A
      }
    }(s),
    u = i.features.length;
    console.log(u);
    for (let e = 0; e < u; e++) {
      const t = i.features[e];
      o.features.push({
        type: 'Feature',
        id: $(a, t.attributes, n),
        properties: U(a, t.attributes),
        geometry: l(t, r)
      })
    }
    return {
      featureCollection: o,
      exceededTransferLimit: i.exceededTransferLimit
    }
  }
  function D(e, t) {
    return {
      type: 'Point',
      coordinates: W(e.geometry.coords, t)
    }
  }
  function E(e, t) {
    return {
      type: 'LineString',
      coordinates: L(e.geometry.coords, t, 0, 2 * e.geometry.lengths[0])
    }
  }
  function A(e, t) {
    const i = e.geometry.lengths.length,
    r = {
      type: 'Polygon',
      coordinates: [
      ]
    };
    if (1 === i) r.coordinates.push(L(e.geometry.coords, t, 0, 2 * e.geometry.lengths[0]));
     else {
      r.type = 'MultiPolygon';
      let s = 0;
      for (let n = 0; n < i; n++) {
        const i = s + 2 * e.geometry.lengths[n],
        a = L(e.geometry.coords, t, s, i);
        C(a) ? r.coordinates.push([a]) : r.coordinates.length > 0 && r.coordinates[r.coordinates.length - 1].push(a),
        s = i
      }
    }
    return r
  }
  function C(e) {
    for (var t, i = 0, r = 0, s = e.length, n = e[r]; r < s - 1; r++) i += ((t = e[r + 1]) [0] - n[0]) * (t[1] + n[1]),
    n = t;
    return i >= 0
  }
  function L(e, t, i, r) {
    const s = [
    ];
    if (0 === e.length) return s;
    const n = e[i],
    a = e[i + 1];
    s.push(W([n,
    a], t));
    let o = n,
    l = a;
    for (let n = i + 2; n < r; n += 2) {
      const i = J(o, e[n]),
      r = J(l, e[n + 1]),
      a = W([i,
      r], t);
      s.push(a),
      o = i,
      l = r
    }
    return s
  }
  function U(e, t) {
    const i = {
    };
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t[r][t[r].value_type] ? i[s.name] = t[r][t[r].value_type] : i[s.name] = null
    }
    return i
  }
  function $(e, t, i) {
    for (let r = 0; r < e.length; r++) {
      if (e[r].name === i) return t[r][t[r].value_type]
    }
    return null
  }
  function z(e) {
    switch (e.fieldType) {
      case 1:
        return 'sintValue';
      case 2:
        return 'floatValue';
      case 3:
        return 'doubleValue';
      case 4:
        return 'stringValue';
      case 5:
        return 'sint64Value';
      case 6:
        return 'uintValue';
      default:
        return null
    }
  }
  function W(e, t) {
    let i = e[0],
    r = e[1],
    s = e[2] ? e[2] : void 0;
    t.scale && (i *= t.scale.xScale, r *= - t.scale.yScale, void 0 !== s && (s *= t.scale.zScale)),
    t.translate && (i += t.translate.xTranslate, r += t.translate.yTranslate, void 0 !== s && (s += t.translate.zTranslate));
    const n = [
      i,
      r
    ];
    return void 0 !== s && n.push(s),
    n
  }
  function J(e, t) {
    return e + t
  }
  j.read = function (e, t) {
    return e.readFields(j._readField, {
      version: '',
      queryResult: null
    }, t)
  },
  j._readField = function (e, t, i) {
    1 === e ? t.version = i.readString() : 2 === e && (t.queryResult = j.QueryResult.read(i, i.readVarint() + i.pos))
  },
  j.write = function (e, t) {
    e.version && t.writeStringField(1, e.version),
    e.queryResult && t.writeMessage(2, j.QueryResult.write, e.queryResult)
  },
  j.GeometryType = {
    esriGeometryTypePoint: {
      value: 0,
      options: {
      }
    },
    esriGeometryTypeMultipoint: {
      value: 1,
      options: {
      }
    },
    esriGeometryTypePolyline: {
      value: 2,
      options: {
      }
    },
    esriGeometryTypePolygon: {
      value: 3,
      options: {
      }
    },
    esriGeometryTypeMultipatch: {
      value: 4,
      options: {
      }
    },
    esriGeometryTypeNone: {
      value: 127,
      options: {
      }
    }
  },
  j.FieldType = {
    esriFieldTypeSmallInteger: {
      value: 0,
      options: {
      }
    },
    esriFieldTypeInteger: {
      value: 1,
      options: {
      }
    },
    esriFieldTypeSingle: {
      value: 2,
      options: {
      }
    },
    esriFieldTypeDouble: {
      value: 3,
      options: {
      }
    },
    esriFieldTypeString: {
      value: 4,
      options: {
      }
    },
    esriFieldTypeDate: {
      value: 5,
      options: {
      }
    },
    esriFieldTypeOID: {
      value: 6,
      options: {
      }
    },
    esriFieldTypeGeometry: {
      value: 7,
      options: {
      }
    },
    esriFieldTypeBlob: {
      value: 8,
      options: {
      }
    },
    esriFieldTypeRaster: {
      value: 9,
      options: {
      }
    },
    esriFieldTypeGUID: {
      value: 10,
      options: {
      }
    },
    esriFieldTypeGlobalID: {
      value: 11,
      options: {
      }
    },
    esriFieldTypeXML: {
      value: 12,
      options: {
      }
    }
  },
  j.SQLType = {
    sqlTypeBigInt: {
      value: 0,
      options: {
      }
    },
    sqlTypeBinary: {
      value: 1,
      options: {
      }
    },
    sqlTypeBit: {
      value: 2,
      options: {
      }
    },
    sqlTypeChar: {
      value: 3,
      options: {
      }
    },
    sqlTypeDate: {
      value: 4,
      options: {
      }
    },
    sqlTypeDecimal: {
      value: 5,
      options: {
      }
    },
    sqlTypeDouble: {
      value: 6,
      options: {
      }
    },
    sqlTypeFloat: {
      value: 7,
      options: {
      }
    },
    sqlTypeGeometry: {
      value: 8,
      options: {
      }
    },
    sqlTypeGUID: {
      value: 9,
      options: {
      }
    },
    sqlTypeInteger: {
      value: 10,
      options: {
      }
    },
    sqlTypeLongNVarchar: {
      value: 11,
      options: {
      }
    },
    sqlTypeLongVarbinary: {
      value: 12,
      options: {
      }
    },
    sqlTypeLongVarchar: {
      value: 13,
      options: {
      }
    },
    sqlTypeNChar: {
      value: 14,
      options: {
      }
    },
    sqlTypeNVarchar: {
      value: 15,
      options: {
      }
    },
    sqlTypeOther: {
      value: 16,
      options: {
      }
    },
    sqlTypeReal: {
      value: 17,
      options: {
      }
    },
    sqlTypeSmallInt: {
      value: 18,
      options: {
      }
    },
    sqlTypeSqlXml: {
      value: 19,
      options: {
      }
    },
    sqlTypeTime: {
      value: 20,
      options: {
      }
    },
    sqlTypeTimestamp: {
      value: 21,
      options: {
      }
    },
    sqlTypeTimestamp2: {
      value: 22,
      options: {
      }
    },
    sqlTypeTinyInt: {
      value: 23,
      options: {
      }
    },
    sqlTypeVarbinary: {
      value: 24,
      options: {
      }
    },
    sqlTypeVarchar: {
      value: 25,
      options: {
      }
    }
  },
  j.QuantizeOriginPostion = {
    upperLeft: {
      value: 0,
      options: {
      }
    },
    lowerLeft: {
      value: 1,
      options: {
      }
    }
  },
  j.SpatialReference = {
  },
  j.SpatialReference.read = function (e, t) {
    return e.readFields(j.SpatialReference._readField, {
      wkid: 0,
      lastestWkid: 0,
      vcsWkid: 0,
      latestVcsWkid: 0,
      wkt: ''
    }, t)
  },
  j.SpatialReference._readField = function (e, t, i) {
    1 === e ? t.wkid = i.readVarint() : 2 === e ? t.lastestWkid = i.readVarint() : 3 === e ? t.vcsWkid = i.readVarint() : 4 === e ? t.latestVcsWkid = i.readVarint() : 5 === e && (t.wkt = i.readString())
  },
  j.SpatialReference.write = function (e, t) {
    e.wkid && t.writeVarintField(1, e.wkid),
    e.lastestWkid && t.writeVarintField(2, e.lastestWkid),
    e.vcsWkid && t.writeVarintField(3, e.vcsWkid),
    e.latestVcsWkid && t.writeVarintField(4, e.latestVcsWkid),
    e.wkt && t.writeStringField(5, e.wkt)
  },
  j.Field = {
  },
  j.Field.read = function (e, t) {
    return e.readFields(j.Field._readField, {
      name: '',
      fieldType: 0,
      alias: '',
      sqlType: 0,
      domain: '',
      defaultValue: ''
    }, t)
  },
  j.Field._readField = function (e, t, i) {
    1 === e ? t.name = i.readString() : 2 === e ? t.fieldType = i.readVarint() : 3 === e ? t.alias = i.readString() : 4 === e ? t.sqlType = i.readVarint() : 5 === e ? t.domain = i.readString() : 6 === e && (t.defaultValue = i.readString())
  },
  j.Field.write = function (e, t) {
    e.name && t.writeStringField(1, e.name),
    e.fieldType && t.writeVarintField(2, e.fieldType),
    e.alias && t.writeStringField(3, e.alias),
    e.sqlType && t.writeVarintField(4, e.sqlType),
    e.domain && t.writeStringField(5, e.domain),
    e.defaultValue && t.writeStringField(6, e.defaultValue)
  },
  j.Value = {
  },
  j.Value.read = function (e, t) {
    return e.readFields(j.Value._readField, {
      string_value: '',
      value_type: null,
      float_value: 0,
      double_value: 0,
      sint_value: 0,
      uint_value: 0,
      int64_value: 0,
      uint64_value: 0,
      sint64_value: 0,
      bool_value: !1
    }, t)
  },
  j.Value._readField = function (e, t, i) {
    1 === e ? (t.string_value = i.readString(), t.value_type = 'string_value') : 2 === e ? (t.float_value = i.readFloat(), t.value_type = 'float_value') : 3 === e ? (t.double_value = i.readDouble(), t.value_type = 'double_value') : 4 === e ? (t.sint_value = i.readSVarint(), t.value_type = 'sint_value') : 5 === e ? (t.uint_value = i.readVarint(), t.value_type = 'uint_value') : 6 === e ? (t.int64_value = i.readVarint(!0), t.value_type = 'int64_value') : 7 === e ? (t.uint64_value = i.readVarint(), t.value_type = 'uint64_value') : 8 === e ? (t.sint64_value = i.readSVarint(), t.value_type = 'sint64_value') : 9 === e && (t.bool_value = i.readBoolean(), t.value_type = 'bool_value')
  },
  j.Value.write = function (e, t) {
    e.string_value && t.writeStringField(1, e.string_value),
    e.float_value && t.writeFloatField(2, e.float_value),
    e.double_value && t.writeDoubleField(3, e.double_value),
    e.sint_value && t.writeSVarintField(4, e.sint_value),
    e.uint_value && t.writeVarintField(5, e.uint_value),
    e.int64_value && t.writeVarintField(6, e.int64_value),
    e.uint64_value && t.writeVarintField(7, e.uint64_value),
    e.sint64_value && t.writeSVarintField(8, e.sint64_value),
    e.bool_value && t.writeBooleanField(9, e.bool_value)
  },
  j.Geometry = {
  },
  j.Geometry.read = function (e, t) {
    return e.readFields(j.Geometry._readField, {
      lengths: [
      ],
      coords: [
      ]
    }, t)
  },
  j.Geometry._readField = function (e, t, i) {
    2 === e ? i.readPackedVarint(t.lengths) : 3 === e && i.readPackedSVarint(t.coords)
  },
  j.Geometry.write = function (e, t) {
    e.lengths && t.writePackedVarint(2, e.lengths),
    e.coords && t.writePackedSVarint(3, e.coords)
  },
  j.esriShapeBuffer = {
  },
  j.esriShapeBuffer.read = function (e, t) {
    return e.readFields(j.esriShapeBuffer._readField, {
      bytes: null
    }, t)
  },
  j.esriShapeBuffer._readField = function (e, t, i) {
    1 === e && (t.bytes = i.readBytes())
  },
  j.esriShapeBuffer.write = function (e, t) {
    e.bytes && t.writeBytesField(1, e.bytes)
  },
  j.Feature = {
  },
  j.Feature.read = function (e, t) {
    return e.readFields(j.Feature._readField, {
      attributes: [
      ],
      geometry: null,
      compressed_geometry: null,
      shapeBuffer: null,
      centroid: null
    }, t)
  },
  j.Feature._readField = function (e, t, i) {
    1 === e ? t.attributes.push(j.Value.read(i, i.readVarint() + i.pos)) : 2 === e ? (t.geometry = j.Geometry.read(i, i.readVarint() + i.pos), t.compressed_geometry = 'geometry') : 3 === e ? (t.shapeBuffer = j.esriShapeBuffer.read(i, i.readVarint() + i.pos), t.compressed_geometry = 'shapeBuffer') : 4 === e && (t.centroid = j.Geometry.read(i, i.readVarint() + i.pos))
  },
  j.Feature.write = function (e, t) {
    if (e.attributes) for (var i = 0; i < e.attributes.length; i++) t.writeMessage(1, j.Value.write, e.attributes[i]);
    e.geometry && t.writeMessage(2, j.Geometry.write, e.geometry),
    e.shapeBuffer && t.writeMessage(3, j.esriShapeBuffer.write, e.shapeBuffer),
    e.centroid && t.writeMessage(4, j.Geometry.write, e.centroid)
  },
  j.UniqueIdField = {
  },
  j.UniqueIdField.read = function (e, t) {
    return e.readFields(j.UniqueIdField._readField, {
      name: '',
      isSystemMaintained: !1
    }, t)
  },
  j.UniqueIdField._readField = function (e, t, i) {
    1 === e ? t.name = i.readString() : 2 === e && (t.isSystemMaintained = i.readBoolean())
  },
  j.UniqueIdField.write = function (e, t) {
    e.name && t.writeStringField(1, e.name),
    e.isSystemMaintained && t.writeBooleanField(2, e.isSystemMaintained)
  },
  j.GeometryProperties = {
  },
  j.GeometryProperties.read = function (e, t) {
    return e.readFields(j.GeometryProperties._readField, {
      shapeAreaFieldName: '',
      shapeLengthFieldName: '',
      units: ''
    }, t)
  },
  j.GeometryProperties._readField = function (e, t, i) {
    1 === e ? t.shapeAreaFieldName = i.readString() : 2 === e ? t.shapeLengthFieldName = i.readString() : 3 === e && (t.units = i.readString())
  },
  j.GeometryProperties.write = function (e, t) {
    e.shapeAreaFieldName && t.writeStringField(1, e.shapeAreaFieldName),
    e.shapeLengthFieldName && t.writeStringField(2, e.shapeLengthFieldName),
    e.units && t.writeStringField(3, e.units)
  },
  j.ServerGens = {
  },
  j.ServerGens.read = function (e, t) {
    return e.readFields(j.ServerGens._readField, {
      minServerGen: 0,
      serverGen: 0
    }, t)
  },
  j.ServerGens._readField = function (e, t, i) {
    1 === e ? t.minServerGen = i.readVarint() : 2 === e && (t.serverGen = i.readVarint())
  },
  j.ServerGens.write = function (e, t) {
    e.minServerGen && t.writeVarintField(1, e.minServerGen),
    e.serverGen && t.writeVarintField(2, e.serverGen)
  },
  j.Scale = {
  },
  j.Scale.read = function (e, t) {
    return e.readFields(j.Scale._readField, {
      xScale: 0,
      yScale: 0,
      mScale: 0,
      zScale: 0
    }, t)
  },
  j.Scale._readField = function (e, t, i) {
    1 === e ? t.xScale = i.readDouble() : 2 === e ? t.yScale = i.readDouble() : 3 === e ? t.mScale = i.readDouble() : 4 === e && (t.zScale = i.readDouble())
  },
  j.Scale.write = function (e, t) {
    e.xScale && t.writeDoubleField(1, e.xScale),
    e.yScale && t.writeDoubleField(2, e.yScale),
    e.mScale && t.writeDoubleField(3, e.mScale),
    e.zScale && t.writeDoubleField(4, e.zScale)
  },
  j.Translate = {
  },
  j.Translate.read = function (e, t) {
    return e.readFields(j.Translate._readField, {
      xTranslate: 0,
      yTranslate: 0,
      mTranslate: 0,
      zTranslate: 0
    }, t)
  },
  j.Translate._readField = function (e, t, i) {
    1 === e ? t.xTranslate = i.readDouble() : 2 === e ? t.yTranslate = i.readDouble() : 3 === e ? t.mTranslate = i.readDouble() : 4 === e && (t.zTranslate = i.readDouble())
  },
  j.Translate.write = function (e, t) {
    e.xTranslate && t.writeDoubleField(1, e.xTranslate),
    e.yTranslate && t.writeDoubleField(2, e.yTranslate),
    e.mTranslate && t.writeDoubleField(3, e.mTranslate),
    e.zTranslate && t.writeDoubleField(4, e.zTranslate)
  },
  j.Transform = {
  },
  j.Transform.read = function (e, t) {
    return e.readFields(j.Transform._readField, {
      quantizeOriginPostion: 0,
      scale: null,
      translate: null
    }, t)
  },
  j.Transform._readField = function (e, t, i) {
    1 === e ? t.quantizeOriginPostion = i.readVarint() : 2 === e ? t.scale = j.Scale.read(i, i.readVarint() + i.pos) : 3 === e && (t.translate = j.Translate.read(i, i.readVarint() + i.pos))
  },
  j.Transform.write = function (e, t) {
    e.quantizeOriginPostion && t.writeVarintField(1, e.quantizeOriginPostion),
    e.scale && t.writeMessage(2, j.Scale.write, e.scale),
    e.translate && t.writeMessage(3, j.Translate.write, e.translate)
  },
  j.FeatureResult = {
  },
  j.FeatureResult.read = function (e, t) {
    return e.readFields(j.FeatureResult._readField, {
      objectIdFieldName: '',
      uniqueIdField: null,
      globalIdFieldName: '',
      geohashFieldName: '',
      geometryProperties: null,
      serverGens: null,
      geometryType: 0,
      spatialReference: null,
      exceededTransferLimit: !1,
      hasZ: !1,
      hasM: !1,
      transform: null,
      fields: [
      ],
      values: [
      ],
      features: [
      ]
    }, t)
  },
  j.FeatureResult._readField = function (e, t, i) {
    1 === e ? t.objectIdFieldName = i.readString() : 2 === e ? t.uniqueIdField = j.UniqueIdField.read(i, i.readVarint() + i.pos) : 3 === e ? t.globalIdFieldName = i.readString() : 4 === e ? t.geohashFieldName = i.readString() : 5 === e ? t.geometryProperties = j.GeometryProperties.read(i, i.readVarint() + i.pos) : 6 === e ? t.serverGens = j.ServerGens.read(i, i.readVarint() + i.pos) : 7 === e ? t.geometryType = i.readVarint() : 8 === e ? t.spatialReference = j.SpatialReference.read(i, i.readVarint() + i.pos) : 9 === e ? t.exceededTransferLimit = i.readBoolean() : 10 === e ? t.hasZ = i.readBoolean() : 11 === e ? t.hasM = i.readBoolean() : 12 === e ? t.transform = j.Transform.read(i, i.readVarint() + i.pos) : 13 === e ? t.fields.push(j.Field.read(i, i.readVarint() + i.pos)) : 14 === e ? t.values.push(j.Value.read(i, i.readVarint() + i.pos)) : 15 === e && t.features.push(j.Feature.read(i, i.readVarint() + i.pos))
  },
  j.FeatureResult.write = function (e, t) {
    if (e.objectIdFieldName && t.writeStringField(1, e.objectIdFieldName), e.uniqueIdField && t.writeMessage(2, j.UniqueIdField.write, e.uniqueIdField), e.globalIdFieldName && t.writeStringField(3, e.globalIdFieldName), e.geohashFieldName && t.writeStringField(4, e.geohashFieldName), e.geometryProperties && t.writeMessage(5, j.GeometryProperties.write, e.geometryProperties), e.serverGens && t.writeMessage(6, j.ServerGens.write, e.serverGens), e.geometryType && t.writeVarintField(7, e.geometryType), e.spatialReference && t.writeMessage(8, j.SpatialReference.write, e.spatialReference), e.exceededTransferLimit && t.writeBooleanField(9, e.exceededTransferLimit), e.hasZ && t.writeBooleanField(10, e.hasZ), e.hasM && t.writeBooleanField(11, e.hasM), e.transform && t.writeMessage(12, j.Transform.write, e.transform), e.fields) for (var i = 0; i < e.fields.length; i++) t.writeMessage(13, j.Field.write, e.fields[i]);
    if (e.values) for (i = 0; i < e.values.length; i++) t.writeMessage(14, j.Value.write, e.values[i]);
    if (e.features) for (i = 0; i < e.features.length; i++) t.writeMessage(15, j.Feature.write, e.features[i])
  },
  j.CountResult = {
  },
  j.CountResult.read = function (e, t) {
    return e.readFields(j.CountResult._readField, {
      count: 0
    }, t)
  },
  j.CountResult._readField = function (e, t, i) {
    1 === e && (t.count = i.readVarint())
  },
  j.CountResult.write = function (e, t) {
    e.count && t.writeVarintField(1, e.count)
  },
  j.ObjectIdsResult = {
  },
  j.ObjectIdsResult.read = function (e, t) {
    return e.readFields(j.ObjectIdsResult._readField, {
      objectIdFieldName: '',
      serverGens: null,
      objectIds: [
      ]
    }, t)
  },
  j.ObjectIdsResult._readField = function (e, t, i) {
    1 === e ? t.objectIdFieldName = i.readString() : 2 === e ? t.serverGens = j.ServerGens.read(i, i.readVarint() + i.pos) : 3 === e && i.readPackedVarint(t.objectIds)
  },
  j.ObjectIdsResult.write = function (e, t) {
    e.objectIdFieldName && t.writeStringField(1, e.objectIdFieldName),
    e.serverGens && t.writeMessage(2, j.ServerGens.write, e.serverGens),
    e.objectIds && t.writePackedVarint(3, e.objectIds)
  },
  j.QueryResult = {
  },
  j.QueryResult.read = function (e, t) {
    return e.readFields(j.QueryResult._readField, {
      featureResult: null,
      Results: null,
      countResult: null,
      idsResult: null
    }, t)
  },
  j.QueryResult._readField = function (e, t, i) {
    1 === e ? (t.featureResult = j.FeatureResult.read(i, i.readVarint() + i.pos), t.Results = 'featureResult') : 2 === e ? (t.countResult = j.CountResult.read(i, i.readVarint() + i.pos), t.Results = 'countResult') : 3 === e && (t.idsResult = j.ObjectIdsResult.read(i, i.readVarint() + i.pos), t.Results = 'idsResult')
  },
  j.QueryResult.write = function (e, t) {
    e.featureResult && t.writeMessage(1, j.FeatureResult.write, e.featureResult),
    e.countResult && t.writeMessage(2, j.CountResult.write, e.countResult),
    e.idsResult && t.writeMessage(3, j.ObjectIdsResult.write, e.idsResult)
  };
  return class {
    constructor(e, t, i, r) {
      if (!e || !t || !i) throw new Error('Source id, map and arcgisOptions must be supplied as the first three arguments.');
      if (!i.url) throw new Error('A url must be supplied as part of the esriServiceOptions object.');
      this.sourceId = e,
      this._map = t,
      this._tileIndices = new Map,
      this._featureIndices = new Map,
      this._featureCollections = new Map,
      this._esriServiceOptions = Object.assign({
        useStaticZoomLevel: !1,
        minZoom: i.useStaticZoomLevel ? 7 : 2,
        simplifyFactor: 0.3,
        precision: 8,
        where: '1=1',
        to: null,
        from: null,
        outFields: '*',
        setAttributionFromService: !0,
        f: 'pbf',
        useSeviceBounds: !0,
        projectionEndpoint: `${ i.url.split('rest/services') [0] }rest/services/Geometry/GeometryServer/project`,
        token: null,
        fetchOptions: null
      }, i),
      this._fallbackProjectionEndpoint = 'https://tasks.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer/project',
      this.serviceMetadata = null,
      this._maxExtent = [
        - 1 / 0,
        1 / 0,
        - 1 / 0,
        1 / 0
      ];
      const s = r || {
      };
      this._map.addSource(e, Object.assign(s, {
        type: 'geojson',
        data: this._getBlankFc()
      })),
      this._getServiceMetadata().then((() =>{
        if (!this.supportsPbf) {
          if (!this.supportsGeojson) throw this._map.removeSource(e),
          new Error('Server does not support PBF or GeoJSON query formats.');
          this._esriServiceOptions.f = 'geojson'
        }
        if (this._esriServiceOptions.useSeviceBounds) {
          const e = this.serviceMetadata.extent;
          4326 === e.spatialReference.wkid ? this._setBounds([e.xmin,
          e.ymin,
          e.xmax,
          e.ymax]) : this._projectBounds()
        }
        '*' !== this._esriServiceOptions.outFields && (this._esriServiceOptions.outFields = `${ this._esriServiceOptions.outFields },${ this.serviceMetadata.uniqueIdField.name }`),
        this._setAttribution(),
        this.enableRequests(),
        this._clearAndRefreshTiles()
      }))
    }
    destroySource() {
      this.disableRequests(),
      this._map.removeSource(this.sourceId)
    }
    _getBlankFc() {
      return {
        type: 'FeatureCollection',
        features: [
        ]
      }
    }
    _setBounds(e) {
      this._maxExtent = e
    }
    get supportsGeojson() {
      return this.serviceMetadata.supportedQueryFormats.indexOf('geoJSON') > - 1
    }
    get supportsPbf() {
      return this.serviceMetadata.supportedQueryFormats.indexOf('PBF') > - 1
    }
    disableRequests() {
      this._map.off('moveend', this._boundEvent)
    }
    enableRequests() {
      this._boundEvent = this._findAndMapData.bind(this),
      this._map.on('moveend', this._boundEvent)
    }
    _clearAndRefreshTiles() {
      this._tileIndices = new Map,
      this._featureIndices = new Map,
      this._featureCollections = new Map,
      this._findAndMapData()
    }
    setWhere(e) {
      this._esriServiceOptions.where = e,
      this._clearAndRefreshTiles()
    }
    clearWhere() {
      this._esriServiceOptions.where = '1=1',
      this._clearAndRefreshTiles()
    }
    setDate(e, t) {
      this._esriServiceOptions.to = e,
      this._esriServiceOptions.from = t,
      this._clearAndRefreshTiles()
    }
    setToken(e) {
      this._esriServiceOptions.token = e,
      this._clearAndRefreshTiles()
    }
    _createOrGetTileIndex(e) {
      const t = this._tileIndices.get(e);
      if (t) return t;
      const i = new Map;
      return this._tileIndices.set(e, i),
      i
    }
    _createOrGetFeatureCollection(e) {
      const t = this._featureCollections.get(e);
      if (t) return t;
      const i = this._getBlankFc();
      return this._featureCollections.set(e, i),
      i
    }
    _createOrGetFeatureIdIndex(e) {
      const t = this._featureIndices.get(e);
      if (t) return t;
      const i = new Map;
      return this._featureIndices.set(e, i),
      i
    }
    async _findAndMapData() {
      const e = this._map.getZoom();
      if (e < this._esriServiceOptions.minZoom) return;
      const t = this._map.getBounds().toArray(),
      i = c.bboxToTile([t[0][0],
      t[0][1],
      t[1][0],
      t[1][1]]);
      if (this._esriServiceOptions.useSeviceBounds && this._maxExtent[0] !== - 1 / 0 && !this._doesTileOverlapBbox(this._maxExtent, t)) return;
      const r = this._esriServiceOptions.useStaticZoomLevel ? this._esriServiceOptions.minZoom : 2 * Math.floor(e / 2),
      s = this._createOrGetTileIndex(r),
      n = this._createOrGetFeatureIdIndex(r),
      a = this._createOrGetFeatureCollection(r),
      o = [
      ];
      if (i[2] < r) {
        let e = c.getChildren(i),
        s = e[0][2];
        for (; s < r; ) {
          const t = [
          ];
          e.forEach((e=>t.push(...c.getChildren(e)))),
          e = t,
          s = e[0][2]
        }
        for (let i = 0; i < e.length; i++) this._doesTileOverlapBbox(e[i], t) && o.push(e[i])
      } else o.push(i);
      for (let e = 0; e < o.length; e++) {
        const t = c.tileToQuadkey(o[e]);
        s.has(t) ? (o.splice(e, 1), e--) : s.set(t, !0)
      }
      if (0 === o.length) return void this._updateFcOnMap(a);
      const l = Math.abs(t[1][0] - t[0][0]) / this._map.getCanvas().width * this._esriServiceOptions.simplifyFactor;
      await this._loadTiles(o, l, n, a),
      this._updateFcOnMap(a)
    }
    async _loadTiles(e, t, i, r) {
      return new Promise((s=>{
        const n = e.map((e=>this._getTile(e, t)));
        Promise.all(n).then((e=>{
          e.forEach((e=>{
            e && this._iterateItems(e, i, r)
          })),
          s()
        }))
      }))
    }
    _iterateItems(e, t, i) {
      e.features.forEach((e=>{
        t.has(e.id) || (i.features.push(e), t.set(e.id))
      }))
    }
    get _time() {
      if (!this._esriServiceOptions.to) return !1;
      let e = this._esriServiceOptions.from,
      t = this._esriServiceOptions.to;
      return e instanceof Date && (e = e.valueOf()),
      t instanceof Date && (t = t.valueOf()),
      `${ e },${ t }`
    }
    _getTile(e, t) {
      const i = c.tileToBBOX(e),
      r = {
        spatialReference: {
          latestWkid: 4326,
          wkid: 4326
        },
        xmin: i[0],
        ymin: i[1],
        xmax: i[2],
        ymax: i[3]
      },
      s = new URLSearchParams({
        f: this._esriServiceOptions.f,
        geometry: JSON.stringify(r),
        where: this._esriServiceOptions.where,
        outFields: this._esriServiceOptions.outFields,
        outSR: 4326,
        returnZ: !1,
        returnM: !1,
        precision: this._esriServiceOptions.precision,
        quantizationParameters: JSON.stringify({
          extent: r,
          tolerance: t,
          mode: 'view'
        }),
        resultType: 'tile',
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryEnvelope',
        inSR: 4326
      });
      return this._time && s.append('time', this._time),
      this._appendTokenIfExists(s),
      new Promise((e=>{
        fetch(`${ this._esriServiceOptions.url }/query?${ s.toString() }`, this._esriServiceOptions.fetchOptions).then((e=>'pbf' === this._esriServiceOptions.f ? e.arrayBuffer() : e.json())).then((t=>{
          let i;
          try {
            i = 'pbf' === this._esriServiceOptions.f ? N(new Uint8Array(t)).featureCollection : t
          } catch (e) {
            console.error('Could not parse arcgis buffer. Please check the url you requested.')
          }
          e(i)
        }))
      }))
    }
    _updateFcOnMap(e) {
      this._map.getSource(this.sourceId).setData(e)
    }
    _doesTileOverlapBbox(e, t) {
      const i = 4 === e.length ? e : c.tileToBBOX(e);
      return !(i[2] < t[0][0]) && (!(i[0] > t[1][0]) && (!(i[3] < t[0][1]) && !(i[1] > t[1][1])))
    }
    _getServiceMetadata() {
      if (null !== this.serviceMetadata) return Promise.resolve(this.serviceMetadata);
      const e = new URLSearchParams({
        f: 'json'
      });
      return this._appendTokenIfExists(e),
      this._requestJson(`${ this._esriServiceOptions.url }?${ e.toString() }`, this._esriServiceOptions.fetchOptions).then((e=>{
        if (e.error) throw new Error(JSON.stringify(e.error));
        return this.serviceMetadata = e,
        this.serviceMetadata
      }))
    }
    getFeaturesByLonLat(e, t, i) {
      i = i || !1,
      t = t || 20;
      const r = new URLSearchParams({
        sr: 4326,
        geometryType: 'esriGeometryPoint',
        geometry: JSON.stringify({
          x: e.lng,
          y: e.lat,
          spatialReference: {
            wkid: 4326
          }
        }),
        returnGeometry: i,
        time: this._time,
        outFields: '*',
        spatialRel: 'esriSpatialRelIntersects',
        units: 'esriSRUnit_Meter',
        distance: t,
        f: 'geojson'
      });
      return this._appendTokenIfExists(r),
      new Promise((e=>{
        this._requestJson(`${ this._esriServiceOptions.url }/query?${ r.toString() }`, this._esriServiceOptions.fetchOptions).then((t=>e(t)))
      }))
    }
    getFeaturesByObjectIds(e, t) {
      Array.isArray(e) && (e = e.join(',')),
      t = t || !1;
      const i = new URLSearchParams({
        sr: 4326,
        objectIds: e,
        returnGeometry: t,
        outFields: '*',
        f: 'geojson'
      });
      return this._appendTokenIfExists(i),
      new Promise((e=>{
        this._requestJson(`${ this._esriServiceOptions.url }/query?${ i.toString() }`, this._esriServiceOptions.fetchOptions).then((t=>e(t)))
      }))
    }
    _projectBounds() {
      const e = new URLSearchParams({
        geometries: JSON.stringify({
          geometryType: 'esriGeometryEnvelope',
          geometries: [
            this.serviceMetadata.extent
          ]
        }),
        inSR: this.serviceMetadata.extent.spatialReference.wkid,
        outSR: 4326,
        f: 'json'
      });
      let t = {
      };
      this._projectionEndpointIsFallback() || (t = this._esriServiceOptions.fetchOptions, this._appendTokenIfExists(e)),
      this._requestJson(`${ this._esriServiceOptions.projectionEndpoint }?${ e.toString() }`, t).then((e=>{
        const t = e.geometries[0];
        this._maxExtent = [
          t.xmin,
          t.ymin,
          t.xmax,
          t.ymax
        ]
      })).catch((e=>{
        if (this._projectionEndpointIsFallback()) throw e;
        this._esriServiceOptions.projectionEndpoint = this._fallbackProjectionEndpoint,
        this._projectBounds()
      }))
    }
    _requestJson(e, t) {
      return new Promise(((i, r) =>{
        fetch(e, t).then((e=>e.json())).then((e=>{
          'error' in e && r(new Error('Endpoint doesnt exist')),
          i(e)
        })).catch((e=>r(e)))
      }))
    }
    _projectionEndpointIsFallback() {
      return this._esriServiceOptions.projectionEndpoint === this._fallbackProjectionEndpoint
    }
    _setAttribution() {
      const e = 'Powered by <a href="https://www.esri.com">Esri</a>',
      t = this._map._controls.find((e=>'_attribHTML' in e));
      if (!t) return;
      const i = t.options.customAttribution;
      'string' == typeof i ? t.options.customAttribution = `${ i } | ${ e }` : void 0 === i ? t.options.customAttribution = e : Array.isArray(i) && - 1 === i.indexOf(e) && i.push(e),
      this._esriServiceOptions.setAttributionFromService && this.serviceMetadata.copyrightText.length > 0 && (this._map.style.sourceCaches[this.sourceId]._source.attribution = this.serviceMetadata.copyrightText),
      t._updateAttributions()
    }
    _appendTokenIfExists(e) {
      const t = this._esriServiceOptions.token;
      null !== t && e.append('token', t)
    }
  }
}));
