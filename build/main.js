(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
  var __spreadValues = (a3, b3) => {
    for (var prop in b3 || (b3 = {}))
      if (__hasOwnProp.call(b3, prop))
        __defNormalProp(a3, prop, b3[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b3)) {
        if (__propIsEnum.call(b3, prop))
          __defNormalProp(a3, prop, b3[prop]);
      }
    return a3;
  };
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key2 of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key2) && key2 !== "default")
          __defProp(target, key2, { get: () => module[key2], enumerable: !(desc = __getOwnPropDesc(module, key2)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __decorateClass = (decorators, target, key2, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key2) : target;
    for (var i3 = decorators.length - 1, decorator; i3 >= 0; i3--)
      if (decorator = decorators[i3])
        result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key2, result);
    return result;
  };

  // node_modules/preact/dist/preact.module.js
  function a(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function h(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function v(l3, u3, i3) {
    var t4, r3, o3, f3 = {};
    for (o3 in u3)
      o3 == "key" ? t4 = u3[o3] : o3 == "ref" ? r3 = u3[o3] : f3[o3] = u3[o3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), typeof l3 == "function" && l3.defaultProps != null)
      for (o3 in l3.defaultProps)
        f3[o3] === void 0 && (f3[o3] = l3.defaultProps[o3]);
    return y(l3, f3, t4, r3, null);
  }
  function y(n2, i3, t4, r3, o3) {
    var f3 = { type: n2, props: i3, key: t4, ref: r3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: o3 == null ? ++u : o3 };
    return o3 == null && l.vnode != null && l.vnode(f3), f3;
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function k(n2, l3) {
    if (l3 == null)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? k(n2) : null;
  }
  function b(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
          break;
        }
      return b(n2);
    }
  }
  function m(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l3, u3, i3, t4, r3, o3;
        n3.__d && (r3 = (t4 = (l3 = n3).__v).__e, (o3 = l3.__P) && (u3 = [], (i3 = a({}, t4)).__v = t4.__v + 1, j(o3, t4, i3, l3.__n, o3.ownerSVGElement !== void 0, t4.__h != null ? [r3] : null, u3, r3 == null ? k(t4) : r3, t4.__h), z(u3, t4), t4.__e != r3 && b(t4)));
      });
  }
  function w(n2, l3, u3, i3, t4, r3, o3, f3, s4, a3) {
    var h2, v3, p2, _2, b3, m3, g3, w3 = i3 && i3.__k || c, A = w3.length;
    for (u3.__k = [], h2 = 0; h2 < l3.length; h2++)
      if ((_2 = u3.__k[h2] = (_2 = l3[h2]) == null || typeof _2 == "boolean" ? null : typeof _2 == "string" || typeof _2 == "number" || typeof _2 == "bigint" ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, { children: _2 }, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2) != null) {
        if (_2.__ = u3, _2.__b = u3.__b + 1, (p2 = w3[h2]) === null || p2 && _2.key == p2.key && _2.type === p2.type)
          w3[h2] = void 0;
        else
          for (v3 = 0; v3 < A; v3++) {
            if ((p2 = w3[v3]) && _2.key == p2.key && _2.type === p2.type) {
              w3[v3] = void 0;
              break;
            }
            p2 = null;
          }
        j(n2, _2, p2 = p2 || e, t4, r3, o3, f3, s4, a3), b3 = _2.__e, (v3 = _2.ref) && p2.ref != v3 && (g3 || (g3 = []), p2.ref && g3.push(p2.ref, null, _2), g3.push(v3, _2.__c || b3, _2)), b3 != null ? (m3 == null && (m3 = b3), typeof _2.type == "function" && _2.__k === p2.__k ? _2.__d = s4 = x(_2, s4, n2) : s4 = P(n2, _2, p2, w3, b3, s4), typeof u3.type == "function" && (u3.__d = s4)) : s4 && p2.__e == s4 && s4.parentNode != n2 && (s4 = k(p2));
      }
    for (u3.__e = m3, h2 = A; h2--; )
      w3[h2] != null && (typeof u3.type == "function" && w3[h2].__e != null && w3[h2].__e == u3.__d && (u3.__d = k(i3, h2 + 1)), N(w3[h2], w3[h2]));
    if (g3)
      for (h2 = 0; h2 < g3.length; h2++)
        M(g3[h2], g3[++h2], g3[++h2]);
  }
  function x(n2, l3, u3) {
    for (var i3, t4 = n2.__k, r3 = 0; t4 && r3 < t4.length; r3++)
      (i3 = t4[r3]) && (i3.__ = n2, l3 = typeof i3.type == "function" ? x(i3, l3, u3) : P(u3, i3, i3, t4, i3.__e, l3));
    return l3;
  }
  function P(n2, l3, u3, i3, t4, r3) {
    var o3, f3, e3;
    if (l3.__d !== void 0)
      o3 = l3.__d, l3.__d = void 0;
    else if (u3 == null || t4 != r3 || t4.parentNode == null)
      n:
        if (r3 == null || r3.parentNode !== n2)
          n2.appendChild(t4), o3 = null;
        else {
          for (f3 = r3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t4)
              break n;
          n2.insertBefore(t4, r3), o3 = r3;
        }
    return o3 !== void 0 ? o3 : t4.nextSibling;
  }
  function C(n2, l3, u3, i3, t4) {
    var r3;
    for (r3 in u3)
      r3 === "children" || r3 === "key" || r3 in l3 || H(n2, r3, null, u3[r3], i3);
    for (r3 in l3)
      t4 && typeof l3[r3] != "function" || r3 === "children" || r3 === "key" || r3 === "value" || r3 === "checked" || u3[r3] === l3[r3] || H(n2, r3, l3[r3], u3[r3], i3);
  }
  function $(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || s.test(l3) ? u3 : u3 + "px";
  }
  function H(n2, l3, u3, i3, t4) {
    var r3;
    n:
      if (l3 === "style")
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l3 in i3)
              u3 && l3 in u3 || $(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i3 && u3[l3] === i3[l3] || $(n2.style, l3, u3[l3]);
        }
      else if (l3[0] === "o" && l3[1] === "n")
        r3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? i3 || n2.addEventListener(l3, r3 ? T : I, r3) : n2.removeEventListener(l3, r3 ? T : I, r3);
      else if (l3 !== "dangerouslySetInnerHTML") {
        if (t4)
          l3 = l3.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
          try {
            n2[l3] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u3, i3, t4, r3, o3, f3, e3, c3) {
    var s4, h2, v3, y2, p2, k3, b3, m3, g3, x3, A, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, o3 = [e3]), (s4 = l.__b) && s4(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (m3 = u3.props, g3 = (s4 = P2.contextType) && t4[s4.__c], x3 = s4 ? g3 ? g3.props.value : s4.__ : t4, i3.__c ? b3 = (h2 = u3.__c = i3.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = h2 = new P2(m3, x3) : (u3.__c = h2 = new _(m3, x3), h2.constructor = P2, h2.render = O), g3 && g3.sub(h2), h2.props = m3, h2.state || (h2.state = {}), h2.context = x3, h2.__n = t4, v3 = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m3, h2.__s))), y2 = h2.props, p2 = h2.state, v3)
            P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && m3 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m3, x3), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m3, h2.__s, x3) === false || u3.__v === i3.__v) {
              h2.props = m3, h2.state = h2.__s, u3.__v !== i3.__v && (h2.__d = false), h2.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), h2.__h.length && f3.push(h2);
              break n;
            }
            h2.componentWillUpdate != null && h2.componentWillUpdate(m3, h2.__s, x3), h2.componentDidUpdate != null && h2.__h.push(function() {
              h2.componentDidUpdate(y2, p2, k3);
            });
          }
          h2.context = x3, h2.props = m3, h2.state = h2.__s, (s4 = l.__r) && s4(u3), h2.__d = false, h2.__v = u3, h2.__P = n2, s4 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t4 = a(a({}, t4), h2.getChildContext())), v3 || h2.getSnapshotBeforeUpdate == null || (k3 = h2.getSnapshotBeforeUpdate(y2, p2)), A = s4 != null && s4.type === d && s4.key == null ? s4.props.children : s4, w(n2, Array.isArray(A) ? A : [A], u3, i3, t4, r3, o3, f3, e3, c3), h2.base = u3.__e, u3.__h = null, h2.__h.length && f3.push(h2), b3 && (h2.__E = h2.__ = null), h2.__e = false;
        } else
          o3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t4, r3, o3, f3, c3);
      (s4 = l.diffed) && s4(u3);
    } catch (n3) {
      u3.__v = null, (c3 || o3 != null) && (u3.__e = e3, u3.__h = !!c3, o3[o3.indexOf(e3)] = null), l.__e(n3, u3, i3);
    }
  }
  function z(n2, u3) {
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function L(l3, u3, i3, t4, r3, o3, f3, c3) {
    var s4, a3, v3, y2 = i3.props, p2 = u3.props, d3 = u3.type, _2 = 0;
    if (d3 === "svg" && (r3 = true), o3 != null) {
      for (; _2 < o3.length; _2++)
        if ((s4 = o3[_2]) && "setAttribute" in s4 == !!d3 && (d3 ? s4.localName === d3 : s4.nodeType === 3)) {
          l3 = s4, o3[_2] = null;
          break;
        }
    }
    if (l3 == null) {
      if (d3 === null)
        return document.createTextNode(p2);
      l3 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p2.is && p2), o3 = null, c3 = false;
    }
    if (d3 === null)
      y2 === p2 || c3 && l3.data === p2 || (l3.data = p2);
    else {
      if (o3 = o3 && n.call(l3.childNodes), a3 = (y2 = i3.props || e).dangerouslySetInnerHTML, v3 = p2.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (y2 = {}, _2 = 0; _2 < l3.attributes.length; _2++)
            y2[l3.attributes[_2].name] = l3.attributes[_2].value;
        (v3 || a3) && (v3 && (a3 && v3.__html == a3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l3, p2, y2, r3, c3), v3)
        u3.__k = [];
      else if (_2 = u3.props.children, w(l3, Array.isArray(_2) ? _2 : [_2], u3, i3, t4, r3 && d3 !== "foreignObject", o3, f3, o3 ? o3[0] : i3.__k && k(i3, 0), c3), o3 != null)
        for (_2 = o3.length; _2--; )
          o3[_2] != null && h(o3[_2]);
      c3 || ("value" in p2 && (_2 = p2.value) !== void 0 && (_2 !== y2.value || _2 !== l3.value || d3 === "progress" && !_2) && H(l3, "value", _2, y2.value, false), "checked" in p2 && (_2 = p2.checked) !== void 0 && _2 !== l3.checked && H(l3, "checked", _2, y2.checked, false));
    }
    return l3;
  }
  function M(n2, u3, i3) {
    try {
      typeof n2 == "function" ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, i3);
    }
  }
  function N(n2, u3, i3) {
    var t4, r3;
    if (l.unmount && l.unmount(n2), (t4 = n2.ref) && (t4.current && t4.current !== n2.__e || M(t4, null, u3)), (t4 = n2.__c) != null) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      t4.base = t4.__P = null;
    }
    if (t4 = n2.__k)
      for (r3 = 0; r3 < t4.length; r3++)
        t4[r3] && N(t4[r3], u3, typeof n2.type != "function");
    i3 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function S(u3, i3, t4) {
    var r3, o3, f3;
    l.__ && l.__(u3, i3), o3 = (r3 = typeof t4 == "function") ? null : t4 && t4.__k || i3.__k, f3 = [], j(i3, u3 = (!r3 && t4 || i3).__k = v(d, null, [u3]), o3 || e, e, i3.ownerSVGElement !== void 0, !r3 && t4 ? [t4] : o3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, f3, !r3 && t4 ? t4 : o3 ? o3.__e : i3.firstChild, r3), z(f3, u3);
  }
  var n, l, u, i, t, r, o, f, e, c, s;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      init_preact_shim();
      e = {};
      c = [];
      s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = c.slice, l = { __e: function(n2, l3) {
        for (var u3, i3, t4; l3 = l3.__; )
          if ((u3 = l3.__c) && !u3.__)
            try {
              if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t4 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t4 = u3.__d), t4)
                return u3.__E = u3;
            } catch (l4) {
              n2 = l4;
            }
        throw n2;
      } }, u = 0, i = function(n2) {
        return n2 != null && n2.constructor === void 0;
      }, _.prototype.setState = function(n2, l3) {
        var u3;
        u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u3), this.props)), n2 && a(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), m(this));
      }, _.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
      }, _.prototype.render = d, t = [], r = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;
    }
  });

  // build_tools/preact-shim.js
  var init_preact_shim = __esm({
    "build_tools/preact-shim.js"() {
      init_preact_module();
    }
  });

  // node_modules/howler/dist/howler.js
  var require_howler = __commonJS({
    "node_modules/howler/dist/howler.js"(exports) {
      init_preact_shim();
      (function() {
        "use strict";
        var HowlerGlobal2 = function() {
          this.init();
        };
        HowlerGlobal2.prototype = {
          init: function() {
            var self = this || Howler3;
            self._counter = 1e3;
            self._html5AudioPool = [];
            self.html5PoolSize = 10;
            self._codecs = {};
            self._howls = [];
            self._muted = false;
            self._volume = 1;
            self._canPlayEvent = "canplaythrough";
            self._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
            self.masterGain = null;
            self.noAudio = false;
            self.usingWebAudio = true;
            self.autoSuspend = true;
            self.ctx = null;
            self.autoUnlock = true;
            self._setup();
            return self;
          },
          volume: function(vol) {
            var self = this || Howler3;
            vol = parseFloat(vol);
            if (!self.ctx) {
              setupAudioContext();
            }
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              self._volume = vol;
              if (self._muted) {
                return self;
              }
              if (self.usingWebAudio) {
                self.masterGain.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
              }
              for (var i3 = 0; i3 < self._howls.length; i3++) {
                if (!self._howls[i3]._webAudio) {
                  var ids2 = self._howls[i3]._getSoundIds();
                  for (var j3 = 0; j3 < ids2.length; j3++) {
                    var sound2 = self._howls[i3]._soundById(ids2[j3]);
                    if (sound2 && sound2._node) {
                      sound2._node.volume = sound2._volume * vol;
                    }
                  }
                }
              }
              return self;
            }
            return self._volume;
          },
          mute: function(muted) {
            var self = this || Howler3;
            if (!self.ctx) {
              setupAudioContext();
            }
            self._muted = muted;
            if (self.usingWebAudio) {
              self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler3.ctx.currentTime);
            }
            for (var i3 = 0; i3 < self._howls.length; i3++) {
              if (!self._howls[i3]._webAudio) {
                var ids2 = self._howls[i3]._getSoundIds();
                for (var j3 = 0; j3 < ids2.length; j3++) {
                  var sound2 = self._howls[i3]._soundById(ids2[j3]);
                  if (sound2 && sound2._node) {
                    sound2._node.muted = muted ? true : sound2._muted;
                  }
                }
              }
            }
            return self;
          },
          stop: function() {
            var self = this || Howler3;
            for (var i3 = 0; i3 < self._howls.length; i3++) {
              self._howls[i3].stop();
            }
            return self;
          },
          unload: function() {
            var self = this || Howler3;
            for (var i3 = self._howls.length - 1; i3 >= 0; i3--) {
              self._howls[i3].unload();
            }
            if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== "undefined") {
              self.ctx.close();
              self.ctx = null;
              setupAudioContext();
            }
            return self;
          },
          codecs: function(ext) {
            return (this || Howler3)._codecs[ext.replace(/^x-/, "")];
          },
          _setup: function() {
            var self = this || Howler3;
            self.state = self.ctx ? self.ctx.state || "suspended" : "suspended";
            self._autoSuspend();
            if (!self.usingWebAudio) {
              if (typeof Audio !== "undefined") {
                try {
                  var test = new Audio();
                  if (typeof test.oncanplaythrough === "undefined") {
                    self._canPlayEvent = "canplay";
                  }
                } catch (e3) {
                  self.noAudio = true;
                }
              } else {
                self.noAudio = true;
              }
            }
            try {
              var test = new Audio();
              if (test.muted) {
                self.noAudio = true;
              }
            } catch (e3) {
            }
            if (!self.noAudio) {
              self._setupCodecs();
            }
            return self;
          },
          _setupCodecs: function() {
            var self = this || Howler3;
            var audioTest = null;
            try {
              audioTest = typeof Audio !== "undefined" ? new Audio() : null;
            } catch (err) {
              return self;
            }
            if (!audioTest || typeof audioTest.canPlayType !== "function") {
              return self;
            }
            var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
            var ua = self._navigator ? self._navigator.userAgent : "";
            var checkOpera = ua.match(/OPR\/([0-6].)/g);
            var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
            var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
            var safariVersion = ua.match(/Version\/(.*?) /);
            var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
            self._codecs = {
              mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!mpegTest,
              opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
              aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return self;
          },
          _unlockAudio: function() {
            var self = this || Howler3;
            if (self._audioUnlocked || !self.ctx) {
              return;
            }
            self._audioUnlocked = false;
            self.autoUnlock = false;
            if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
              self._mobileUnloaded = true;
              self.unload();
            }
            self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);
            var unlock = function(e3) {
              while (self._html5AudioPool.length < self.html5PoolSize) {
                try {
                  var audioNode = new Audio();
                  audioNode._unlocked = true;
                  self._releaseHtml5Audio(audioNode);
                } catch (e4) {
                  self.noAudio = true;
                  break;
                }
              }
              for (var i3 = 0; i3 < self._howls.length; i3++) {
                if (!self._howls[i3]._webAudio) {
                  var ids2 = self._howls[i3]._getSoundIds();
                  for (var j3 = 0; j3 < ids2.length; j3++) {
                    var sound2 = self._howls[i3]._soundById(ids2[j3]);
                    if (sound2 && sound2._node && !sound2._node._unlocked) {
                      sound2._node._unlocked = true;
                      sound2._node.load();
                    }
                  }
                }
              }
              self._autoResume();
              var source = self.ctx.createBufferSource();
              source.buffer = self._scratchBuffer;
              source.connect(self.ctx.destination);
              if (typeof source.start === "undefined") {
                source.noteOn(0);
              } else {
                source.start(0);
              }
              if (typeof self.ctx.resume === "function") {
                self.ctx.resume();
              }
              source.onended = function() {
                source.disconnect(0);
                self._audioUnlocked = true;
                document.removeEventListener("touchstart", unlock, true);
                document.removeEventListener("touchend", unlock, true);
                document.removeEventListener("click", unlock, true);
                document.removeEventListener("keydown", unlock, true);
                for (var i4 = 0; i4 < self._howls.length; i4++) {
                  self._howls[i4]._emit("unlock");
                }
              };
            };
            document.addEventListener("touchstart", unlock, true);
            document.addEventListener("touchend", unlock, true);
            document.addEventListener("click", unlock, true);
            document.addEventListener("keydown", unlock, true);
            return self;
          },
          _obtainHtml5Audio: function() {
            var self = this || Howler3;
            if (self._html5AudioPool.length) {
              return self._html5AudioPool.pop();
            }
            var testPlay = new Audio().play();
            if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
              testPlay.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              });
            }
            return new Audio();
          },
          _releaseHtml5Audio: function(audio) {
            var self = this || Howler3;
            if (audio._unlocked) {
              self._html5AudioPool.push(audio);
            }
            return self;
          },
          _autoSuspend: function() {
            var self = this;
            if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            for (var i3 = 0; i3 < self._howls.length; i3++) {
              if (self._howls[i3]._webAudio) {
                for (var j3 = 0; j3 < self._howls[i3]._sounds.length; j3++) {
                  if (!self._howls[i3]._sounds[j3]._paused) {
                    return self;
                  }
                }
              }
            }
            if (self._suspendTimer) {
              clearTimeout(self._suspendTimer);
            }
            self._suspendTimer = setTimeout(function() {
              if (!self.autoSuspend) {
                return;
              }
              self._suspendTimer = null;
              self.state = "suspending";
              var handleSuspension = function() {
                self.state = "suspended";
                if (self._resumeAfterSuspend) {
                  delete self._resumeAfterSuspend;
                  self._autoResume();
                }
              };
              self.ctx.suspend().then(handleSuspension, handleSuspension);
            }, 3e4);
            return self;
          },
          _autoResume: function() {
            var self = this;
            if (!self.ctx || typeof self.ctx.resume === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            if (self.state === "running" && self.ctx.state !== "interrupted" && self._suspendTimer) {
              clearTimeout(self._suspendTimer);
              self._suspendTimer = null;
            } else if (self.state === "suspended" || self.state === "running" && self.ctx.state === "interrupted") {
              self.ctx.resume().then(function() {
                self.state = "running";
                for (var i3 = 0; i3 < self._howls.length; i3++) {
                  self._howls[i3]._emit("resume");
                }
              });
              if (self._suspendTimer) {
                clearTimeout(self._suspendTimer);
                self._suspendTimer = null;
              }
            } else if (self.state === "suspending") {
              self._resumeAfterSuspend = true;
            }
            return self;
          }
        };
        var Howler3 = new HowlerGlobal2();
        var Howl3 = function(o3) {
          var self = this;
          if (!o3.src || o3.src.length === 0) {
            console.error("An array of source files must be passed with any new Howl.");
            return;
          }
          self.init(o3);
        };
        Howl3.prototype = {
          init: function(o3) {
            var self = this;
            if (!Howler3.ctx) {
              setupAudioContext();
            }
            self._autoplay = o3.autoplay || false;
            self._format = typeof o3.format !== "string" ? o3.format : [o3.format];
            self._html5 = o3.html5 || false;
            self._muted = o3.mute || false;
            self._loop = o3.loop || false;
            self._pool = o3.pool || 5;
            self._preload = typeof o3.preload === "boolean" || o3.preload === "metadata" ? o3.preload : true;
            self._rate = o3.rate || 1;
            self._sprite = o3.sprite || {};
            self._src = typeof o3.src !== "string" ? o3.src : [o3.src];
            self._volume = o3.volume !== void 0 ? o3.volume : 1;
            self._xhr = {
              method: o3.xhr && o3.xhr.method ? o3.xhr.method : "GET",
              headers: o3.xhr && o3.xhr.headers ? o3.xhr.headers : null,
              withCredentials: o3.xhr && o3.xhr.withCredentials ? o3.xhr.withCredentials : false
            };
            self._duration = 0;
            self._state = "unloaded";
            self._sounds = [];
            self._endTimers = {};
            self._queue = [];
            self._playLock = false;
            self._onend = o3.onend ? [{ fn: o3.onend }] : [];
            self._onfade = o3.onfade ? [{ fn: o3.onfade }] : [];
            self._onload = o3.onload ? [{ fn: o3.onload }] : [];
            self._onloaderror = o3.onloaderror ? [{ fn: o3.onloaderror }] : [];
            self._onplayerror = o3.onplayerror ? [{ fn: o3.onplayerror }] : [];
            self._onpause = o3.onpause ? [{ fn: o3.onpause }] : [];
            self._onplay = o3.onplay ? [{ fn: o3.onplay }] : [];
            self._onstop = o3.onstop ? [{ fn: o3.onstop }] : [];
            self._onmute = o3.onmute ? [{ fn: o3.onmute }] : [];
            self._onvolume = o3.onvolume ? [{ fn: o3.onvolume }] : [];
            self._onrate = o3.onrate ? [{ fn: o3.onrate }] : [];
            self._onseek = o3.onseek ? [{ fn: o3.onseek }] : [];
            self._onunlock = o3.onunlock ? [{ fn: o3.onunlock }] : [];
            self._onresume = [];
            self._webAudio = Howler3.usingWebAudio && !self._html5;
            if (typeof Howler3.ctx !== "undefined" && Howler3.ctx && Howler3.autoUnlock) {
              Howler3._unlockAudio();
            }
            Howler3._howls.push(self);
            if (self._autoplay) {
              self._queue.push({
                event: "play",
                action: function() {
                  self.play();
                }
              });
            }
            if (self._preload && self._preload !== "none") {
              self.load();
            }
            return self;
          },
          load: function() {
            var self = this;
            var url = null;
            if (Howler3.noAudio) {
              self._emit("loaderror", null, "No audio support.");
              return;
            }
            if (typeof self._src === "string") {
              self._src = [self._src];
            }
            for (var i3 = 0; i3 < self._src.length; i3++) {
              var ext, str;
              if (self._format && self._format[i3]) {
                ext = self._format[i3];
              } else {
                str = self._src[i3];
                if (typeof str !== "string") {
                  self._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                  continue;
                }
                ext = /^data:audio\/([^;,]+);/i.exec(str);
                if (!ext) {
                  ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
                }
                if (ext) {
                  ext = ext[1].toLowerCase();
                }
              }
              if (!ext) {
                console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
              }
              if (ext && Howler3.codecs(ext)) {
                url = self._src[i3];
                break;
              }
            }
            if (!url) {
              self._emit("loaderror", null, "No codec support for selected audio sources.");
              return;
            }
            self._src = url;
            self._state = "loading";
            if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
              self._html5 = true;
              self._webAudio = false;
            }
            new Sound3(self);
            if (self._webAudio) {
              loadBuffer(self);
            }
            return self;
          },
          play: function(sprite, internal) {
            var self = this;
            var id = null;
            if (typeof sprite === "number") {
              id = sprite;
              sprite = null;
            } else if (typeof sprite === "string" && self._state === "loaded" && !self._sprite[sprite]) {
              return null;
            } else if (typeof sprite === "undefined") {
              sprite = "__default";
              if (!self._playLock) {
                var num = 0;
                for (var i3 = 0; i3 < self._sounds.length; i3++) {
                  if (self._sounds[i3]._paused && !self._sounds[i3]._ended) {
                    num++;
                    id = self._sounds[i3]._id;
                  }
                }
                if (num === 1) {
                  sprite = null;
                } else {
                  id = null;
                }
              }
            }
            var sound2 = id ? self._soundById(id) : self._inactiveSound();
            if (!sound2) {
              return null;
            }
            if (id && !sprite) {
              sprite = sound2._sprite || "__default";
            }
            if (self._state !== "loaded") {
              sound2._sprite = sprite;
              sound2._ended = false;
              var soundId = sound2._id;
              self._queue.push({
                event: "play",
                action: function() {
                  self.play(soundId);
                }
              });
              return soundId;
            }
            if (id && !sound2._paused) {
              if (!internal) {
                self._loadQueue("play");
              }
              return sound2._id;
            }
            if (self._webAudio) {
              Howler3._autoResume();
            }
            var seek = Math.max(0, sound2._seek > 0 ? sound2._seek : self._sprite[sprite][0] / 1e3);
            var duration = Math.max(0, (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3 - seek);
            var timeout = duration * 1e3 / Math.abs(sound2._rate);
            var start = self._sprite[sprite][0] / 1e3;
            var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3;
            sound2._sprite = sprite;
            sound2._ended = false;
            var setParams = function() {
              sound2._paused = false;
              sound2._seek = seek;
              sound2._start = start;
              sound2._stop = stop;
              sound2._loop = !!(sound2._loop || self._sprite[sprite][2]);
            };
            if (seek >= stop) {
              self._ended(sound2);
              return;
            }
            var node = sound2._node;
            if (self._webAudio) {
              var playWebAudio = function() {
                self._playLock = false;
                setParams();
                self._refreshBuffer(sound2);
                var vol = sound2._muted || self._muted ? 0 : sound2._volume;
                node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                sound2._playStart = Howler3.ctx.currentTime;
                if (typeof node.bufferSource.start === "undefined") {
                  sound2._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
                } else {
                  sound2._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
                }
                if (timeout !== Infinity) {
                  self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                }
                if (!internal) {
                  setTimeout(function() {
                    self._emit("play", sound2._id);
                    self._loadQueue();
                  }, 0);
                }
              };
              if (Howler3.state === "running" && Howler3.ctx.state !== "interrupted") {
                playWebAudio();
              } else {
                self._playLock = true;
                self.once("resume", playWebAudio);
                self._clearTimer(sound2._id);
              }
            } else {
              var playHtml5 = function() {
                node.currentTime = seek;
                node.muted = sound2._muted || self._muted || Howler3._muted || node.muted;
                node.volume = sound2._volume * Howler3.volume();
                node.playbackRate = sound2._rate;
                try {
                  var play = node.play();
                  if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                    self._playLock = true;
                    setParams();
                    play.then(function() {
                      self._playLock = false;
                      node._unlocked = true;
                      if (!internal) {
                        self._emit("play", sound2._id);
                      } else {
                        self._loadQueue();
                      }
                    }).catch(function() {
                      self._playLock = false;
                      self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                      sound2._ended = true;
                      sound2._paused = true;
                    });
                  } else if (!internal) {
                    self._playLock = false;
                    setParams();
                    self._emit("play", sound2._id);
                  }
                  node.playbackRate = sound2._rate;
                  if (node.paused) {
                    self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    return;
                  }
                  if (sprite !== "__default" || sound2._loop) {
                    self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                  } else {
                    self._endTimers[sound2._id] = function() {
                      self._ended(sound2);
                      node.removeEventListener("ended", self._endTimers[sound2._id], false);
                    };
                    node.addEventListener("ended", self._endTimers[sound2._id], false);
                  }
                } catch (err) {
                  self._emit("playerror", sound2._id, err);
                }
              };
              if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
                node.src = self._src;
                node.load();
              }
              var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler3._navigator.isCocoonJS;
              if (node.readyState >= 3 || loadedNoReadyState) {
                playHtml5();
              } else {
                self._playLock = true;
                self._state = "loading";
                var listener = function() {
                  self._state = "loaded";
                  playHtml5();
                  node.removeEventListener(Howler3._canPlayEvent, listener, false);
                };
                node.addEventListener(Howler3._canPlayEvent, listener, false);
                self._clearTimer(sound2._id);
              }
            }
            return sound2._id;
          },
          pause: function(id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "pause",
                action: function() {
                  self.pause(id);
                }
              });
              return self;
            }
            var ids2 = self._getSoundIds(id);
            for (var i3 = 0; i3 < ids2.length; i3++) {
              self._clearTimer(ids2[i3]);
              var sound2 = self._soundById(ids2[i3]);
              if (sound2 && !sound2._paused) {
                sound2._seek = self.seek(ids2[i3]);
                sound2._rateSeek = 0;
                sound2._paused = true;
                self._stopFade(ids2[i3]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (!sound2._node.bufferSource) {
                      continue;
                    }
                    if (typeof sound2._node.bufferSource.stop === "undefined") {
                      sound2._node.bufferSource.noteOff(0);
                    } else {
                      sound2._node.bufferSource.stop(0);
                    }
                    self._cleanBuffer(sound2._node);
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.pause();
                  }
                }
              }
              if (!arguments[1]) {
                self._emit("pause", sound2 ? sound2._id : null);
              }
            }
            return self;
          },
          stop: function(id, internal) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "stop",
                action: function() {
                  self.stop(id);
                }
              });
              return self;
            }
            var ids2 = self._getSoundIds(id);
            for (var i3 = 0; i3 < ids2.length; i3++) {
              self._clearTimer(ids2[i3]);
              var sound2 = self._soundById(ids2[i3]);
              if (sound2) {
                sound2._seek = sound2._start || 0;
                sound2._rateSeek = 0;
                sound2._paused = true;
                sound2._ended = true;
                self._stopFade(ids2[i3]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (sound2._node.bufferSource) {
                      if (typeof sound2._node.bufferSource.stop === "undefined") {
                        sound2._node.bufferSource.noteOff(0);
                      } else {
                        sound2._node.bufferSource.stop(0);
                      }
                      self._cleanBuffer(sound2._node);
                    }
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.currentTime = sound2._start || 0;
                    sound2._node.pause();
                    if (sound2._node.duration === Infinity) {
                      self._clearSound(sound2._node);
                    }
                  }
                }
                if (!internal) {
                  self._emit("stop", sound2._id);
                }
              }
            }
            return self;
          },
          mute: function(muted, id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "mute",
                action: function() {
                  self.mute(muted, id);
                }
              });
              return self;
            }
            if (typeof id === "undefined") {
              if (typeof muted === "boolean") {
                self._muted = muted;
              } else {
                return self._muted;
              }
            }
            var ids2 = self._getSoundIds(id);
            for (var i3 = 0; i3 < ids2.length; i3++) {
              var sound2 = self._soundById(ids2[i3]);
              if (sound2) {
                sound2._muted = muted;
                if (sound2._interval) {
                  self._stopFade(sound2._id);
                }
                if (self._webAudio && sound2._node) {
                  sound2._node.gain.setValueAtTime(muted ? 0 : sound2._volume, Howler3.ctx.currentTime);
                } else if (sound2._node) {
                  sound2._node.muted = Howler3._muted ? true : muted;
                }
                self._emit("mute", sound2._id);
              }
            }
            return self;
          },
          volume: function() {
            var self = this;
            var args = arguments;
            var vol, id;
            if (args.length === 0) {
              return self._volume;
            } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                vol = parseFloat(args[0]);
              }
            } else if (args.length >= 2) {
              vol = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "volume",
                  action: function() {
                    self.volume.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id === "undefined") {
                self._volume = vol;
              }
              id = self._getSoundIds(id);
              for (var i3 = 0; i3 < id.length; i3++) {
                sound2 = self._soundById(id[i3]);
                if (sound2) {
                  sound2._volume = vol;
                  if (!args[2]) {
                    self._stopFade(id[i3]);
                  }
                  if (self._webAudio && sound2._node && !sound2._muted) {
                    sound2._node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                  } else if (sound2._node && !sound2._muted) {
                    sound2._node.volume = vol * Howler3.volume();
                  }
                  self._emit("volume", sound2._id);
                }
              }
            } else {
              sound2 = id ? self._soundById(id) : self._sounds[0];
              return sound2 ? sound2._volume : 0;
            }
            return self;
          },
          fade: function(from, to, len, id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "fade",
                action: function() {
                  self.fade(from, to, len, id);
                }
              });
              return self;
            }
            from = Math.min(Math.max(0, parseFloat(from)), 1);
            to = Math.min(Math.max(0, parseFloat(to)), 1);
            len = parseFloat(len);
            self.volume(from, id);
            var ids2 = self._getSoundIds(id);
            for (var i3 = 0; i3 < ids2.length; i3++) {
              var sound2 = self._soundById(ids2[i3]);
              if (sound2) {
                if (!id) {
                  self._stopFade(ids2[i3]);
                }
                if (self._webAudio && !sound2._muted) {
                  var currentTime = Howler3.ctx.currentTime;
                  var end = currentTime + len / 1e3;
                  sound2._volume = from;
                  sound2._node.gain.setValueAtTime(from, currentTime);
                  sound2._node.gain.linearRampToValueAtTime(to, end);
                }
                self._startFadeInterval(sound2, from, to, len, ids2[i3], typeof id === "undefined");
              }
            }
            return self;
          },
          _startFadeInterval: function(sound2, from, to, len, id, isGroup) {
            var self = this;
            var vol = from;
            var diff = to - from;
            var steps = Math.abs(diff / 0.01);
            var stepLen = Math.max(4, steps > 0 ? len / steps : len);
            var lastTick = Date.now();
            sound2._fadeTo = to;
            sound2._interval = setInterval(function() {
              var tick = (Date.now() - lastTick) / len;
              lastTick = Date.now();
              vol += diff * tick;
              vol = Math.round(vol * 100) / 100;
              if (diff < 0) {
                vol = Math.max(to, vol);
              } else {
                vol = Math.min(to, vol);
              }
              if (self._webAudio) {
                sound2._volume = vol;
              } else {
                self.volume(vol, sound2._id, true);
              }
              if (isGroup) {
                self._volume = vol;
              }
              if (to < from && vol <= to || to > from && vol >= to) {
                clearInterval(sound2._interval);
                sound2._interval = null;
                sound2._fadeTo = null;
                self.volume(to, sound2._id);
                self._emit("fade", sound2._id);
              }
            }, stepLen);
          },
          _stopFade: function(id) {
            var self = this;
            var sound2 = self._soundById(id);
            if (sound2 && sound2._interval) {
              if (self._webAudio) {
                sound2._node.gain.cancelScheduledValues(Howler3.ctx.currentTime);
              }
              clearInterval(sound2._interval);
              sound2._interval = null;
              self.volume(sound2._fadeTo, id);
              sound2._fadeTo = null;
              self._emit("fade", id);
            }
            return self;
          },
          loop: function() {
            var self = this;
            var args = arguments;
            var loop, id, sound2;
            if (args.length === 0) {
              return self._loop;
            } else if (args.length === 1) {
              if (typeof args[0] === "boolean") {
                loop = args[0];
                self._loop = loop;
              } else {
                sound2 = self._soundById(parseInt(args[0], 10));
                return sound2 ? sound2._loop : false;
              }
            } else if (args.length === 2) {
              loop = args[0];
              id = parseInt(args[1], 10);
            }
            var ids2 = self._getSoundIds(id);
            for (var i3 = 0; i3 < ids2.length; i3++) {
              sound2 = self._soundById(ids2[i3]);
              if (sound2) {
                sound2._loop = loop;
                if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                  sound2._node.bufferSource.loop = loop;
                  if (loop) {
                    sound2._node.bufferSource.loopStart = sound2._start || 0;
                    sound2._node.bufferSource.loopEnd = sound2._stop;
                    if (self.playing(ids2[i3])) {
                      self.pause(ids2[i3], true);
                      self.play(ids2[i3], true);
                    }
                  }
                }
              }
            }
            return self;
          },
          rate: function() {
            var self = this;
            var args = arguments;
            var rate, id;
            if (args.length === 0) {
              id = self._sounds[0]._id;
            } else if (args.length === 1) {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                rate = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              rate = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof rate === "number") {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "rate",
                  action: function() {
                    self.rate.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id === "undefined") {
                self._rate = rate;
              }
              id = self._getSoundIds(id);
              for (var i3 = 0; i3 < id.length; i3++) {
                sound2 = self._soundById(id[i3]);
                if (sound2) {
                  if (self.playing(id[i3])) {
                    sound2._rateSeek = self.seek(id[i3]);
                    sound2._playStart = self._webAudio ? Howler3.ctx.currentTime : sound2._playStart;
                  }
                  sound2._rate = rate;
                  if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                    sound2._node.bufferSource.playbackRate.setValueAtTime(rate, Howler3.ctx.currentTime);
                  } else if (sound2._node) {
                    sound2._node.playbackRate = rate;
                  }
                  var seek = self.seek(id[i3]);
                  var duration = (self._sprite[sound2._sprite][0] + self._sprite[sound2._sprite][1]) / 1e3 - seek;
                  var timeout = duration * 1e3 / Math.abs(sound2._rate);
                  if (self._endTimers[id[i3]] || !sound2._paused) {
                    self._clearTimer(id[i3]);
                    self._endTimers[id[i3]] = setTimeout(self._ended.bind(self, sound2), timeout);
                  }
                  self._emit("rate", sound2._id);
                }
              }
            } else {
              sound2 = self._soundById(id);
              return sound2 ? sound2._rate : self._rate;
            }
            return self;
          },
          seek: function() {
            var self = this;
            var args = arguments;
            var seek, id;
            if (args.length === 0) {
              if (self._sounds.length) {
                id = self._sounds[0]._id;
              }
            } else if (args.length === 1) {
              var ids2 = self._getSoundIds();
              var index = ids2.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else if (self._sounds.length) {
                id = self._sounds[0]._id;
                seek = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              seek = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            if (typeof id === "undefined") {
              return 0;
            }
            if (typeof seek === "number" && (self._state !== "loaded" || self._playLock)) {
              self._queue.push({
                event: "seek",
                action: function() {
                  self.seek.apply(self, args);
                }
              });
              return self;
            }
            var sound2 = self._soundById(id);
            if (sound2) {
              if (typeof seek === "number" && seek >= 0) {
                var playing = self.playing(id);
                if (playing) {
                  self.pause(id, true);
                }
                sound2._seek = seek;
                sound2._ended = false;
                self._clearTimer(id);
                if (!self._webAudio && sound2._node && !isNaN(sound2._node.duration)) {
                  sound2._node.currentTime = seek;
                }
                var seekAndEmit = function() {
                  if (playing) {
                    self.play(id, true);
                  }
                  self._emit("seek", id);
                };
                if (playing && !self._webAudio) {
                  var emitSeek = function() {
                    if (!self._playLock) {
                      seekAndEmit();
                    } else {
                      setTimeout(emitSeek, 0);
                    }
                  };
                  setTimeout(emitSeek, 0);
                } else {
                  seekAndEmit();
                }
              } else {
                if (self._webAudio) {
                  var realTime = self.playing(id) ? Howler3.ctx.currentTime - sound2._playStart : 0;
                  var rateSeek = sound2._rateSeek ? sound2._rateSeek - sound2._seek : 0;
                  return sound2._seek + (rateSeek + realTime * Math.abs(sound2._rate));
                } else {
                  return sound2._node.currentTime;
                }
              }
            }
            return self;
          },
          playing: function(id) {
            var self = this;
            if (typeof id === "number") {
              var sound2 = self._soundById(id);
              return sound2 ? !sound2._paused : false;
            }
            for (var i3 = 0; i3 < self._sounds.length; i3++) {
              if (!self._sounds[i3]._paused) {
                return true;
              }
            }
            return false;
          },
          duration: function(id) {
            var self = this;
            var duration = self._duration;
            var sound2 = self._soundById(id);
            if (sound2) {
              duration = self._sprite[sound2._sprite][1] / 1e3;
            }
            return duration;
          },
          state: function() {
            return this._state;
          },
          unload: function() {
            var self = this;
            var sounds = self._sounds;
            for (var i3 = 0; i3 < sounds.length; i3++) {
              if (!sounds[i3]._paused) {
                self.stop(sounds[i3]._id);
              }
              if (!self._webAudio) {
                self._clearSound(sounds[i3]._node);
                sounds[i3]._node.removeEventListener("error", sounds[i3]._errorFn, false);
                sounds[i3]._node.removeEventListener(Howler3._canPlayEvent, sounds[i3]._loadFn, false);
                sounds[i3]._node.removeEventListener("ended", sounds[i3]._endFn, false);
                Howler3._releaseHtml5Audio(sounds[i3]._node);
              }
              delete sounds[i3]._node;
              self._clearTimer(sounds[i3]._id);
            }
            var index = Howler3._howls.indexOf(self);
            if (index >= 0) {
              Howler3._howls.splice(index, 1);
            }
            var remCache = true;
            for (i3 = 0; i3 < Howler3._howls.length; i3++) {
              if (Howler3._howls[i3]._src === self._src || self._src.indexOf(Howler3._howls[i3]._src) >= 0) {
                remCache = false;
                break;
              }
            }
            if (cache && remCache) {
              delete cache[self._src];
            }
            Howler3.noAudio = false;
            self._state = "unloaded";
            self._sounds = [];
            self = null;
            return null;
          },
          on: function(event, fn, id, once) {
            var self = this;
            var events = self["_on" + event];
            if (typeof fn === "function") {
              events.push(once ? { id, fn, once } : { id, fn });
            }
            return self;
          },
          off: function(event, fn, id) {
            var self = this;
            var events = self["_on" + event];
            var i3 = 0;
            if (typeof fn === "number") {
              id = fn;
              fn = null;
            }
            if (fn || id) {
              for (i3 = 0; i3 < events.length; i3++) {
                var isId = id === events[i3].id;
                if (fn === events[i3].fn && isId || !fn && isId) {
                  events.splice(i3, 1);
                  break;
                }
              }
            } else if (event) {
              self["_on" + event] = [];
            } else {
              var keys = Object.keys(self);
              for (i3 = 0; i3 < keys.length; i3++) {
                if (keys[i3].indexOf("_on") === 0 && Array.isArray(self[keys[i3]])) {
                  self[keys[i3]] = [];
                }
              }
            }
            return self;
          },
          once: function(event, fn, id) {
            var self = this;
            self.on(event, fn, id, 1);
            return self;
          },
          _emit: function(event, id, msg) {
            var self = this;
            var events = self["_on" + event];
            for (var i3 = events.length - 1; i3 >= 0; i3--) {
              if (!events[i3].id || events[i3].id === id || event === "load") {
                setTimeout(function(fn) {
                  fn.call(this, id, msg);
                }.bind(self, events[i3].fn), 0);
                if (events[i3].once) {
                  self.off(event, events[i3].fn, events[i3].id);
                }
              }
            }
            self._loadQueue(event);
            return self;
          },
          _loadQueue: function(event) {
            var self = this;
            if (self._queue.length > 0) {
              var task = self._queue[0];
              if (task.event === event) {
                self._queue.shift();
                self._loadQueue();
              }
              if (!event) {
                task.action();
              }
            }
            return self;
          },
          _ended: function(sound2) {
            var self = this;
            var sprite = sound2._sprite;
            if (!self._webAudio && sound2._node && !sound2._node.paused && !sound2._node.ended && sound2._node.currentTime < sound2._stop) {
              setTimeout(self._ended.bind(self, sound2), 100);
              return self;
            }
            var loop = !!(sound2._loop || self._sprite[sprite][2]);
            self._emit("end", sound2._id);
            if (!self._webAudio && loop) {
              self.stop(sound2._id, true).play(sound2._id);
            }
            if (self._webAudio && loop) {
              self._emit("play", sound2._id);
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              sound2._playStart = Howler3.ctx.currentTime;
              var timeout = (sound2._stop - sound2._start) * 1e3 / Math.abs(sound2._rate);
              self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
            }
            if (self._webAudio && !loop) {
              sound2._paused = true;
              sound2._ended = true;
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              self._clearTimer(sound2._id);
              self._cleanBuffer(sound2._node);
              Howler3._autoSuspend();
            }
            if (!self._webAudio && !loop) {
              self.stop(sound2._id, true);
            }
            return self;
          },
          _clearTimer: function(id) {
            var self = this;
            if (self._endTimers[id]) {
              if (typeof self._endTimers[id] !== "function") {
                clearTimeout(self._endTimers[id]);
              } else {
                var sound2 = self._soundById(id);
                if (sound2 && sound2._node) {
                  sound2._node.removeEventListener("ended", self._endTimers[id], false);
                }
              }
              delete self._endTimers[id];
            }
            return self;
          },
          _soundById: function(id) {
            var self = this;
            for (var i3 = 0; i3 < self._sounds.length; i3++) {
              if (id === self._sounds[i3]._id) {
                return self._sounds[i3];
              }
            }
            return null;
          },
          _inactiveSound: function() {
            var self = this;
            self._drain();
            for (var i3 = 0; i3 < self._sounds.length; i3++) {
              if (self._sounds[i3]._ended) {
                return self._sounds[i3].reset();
              }
            }
            return new Sound3(self);
          },
          _drain: function() {
            var self = this;
            var limit = self._pool;
            var cnt = 0;
            var i3 = 0;
            if (self._sounds.length < limit) {
              return;
            }
            for (i3 = 0; i3 < self._sounds.length; i3++) {
              if (self._sounds[i3]._ended) {
                cnt++;
              }
            }
            for (i3 = self._sounds.length - 1; i3 >= 0; i3--) {
              if (cnt <= limit) {
                return;
              }
              if (self._sounds[i3]._ended) {
                if (self._webAudio && self._sounds[i3]._node) {
                  self._sounds[i3]._node.disconnect(0);
                }
                self._sounds.splice(i3, 1);
                cnt--;
              }
            }
          },
          _getSoundIds: function(id) {
            var self = this;
            if (typeof id === "undefined") {
              var ids2 = [];
              for (var i3 = 0; i3 < self._sounds.length; i3++) {
                ids2.push(self._sounds[i3]._id);
              }
              return ids2;
            } else {
              return [id];
            }
          },
          _refreshBuffer: function(sound2) {
            var self = this;
            sound2._node.bufferSource = Howler3.ctx.createBufferSource();
            sound2._node.bufferSource.buffer = cache[self._src];
            if (sound2._panner) {
              sound2._node.bufferSource.connect(sound2._panner);
            } else {
              sound2._node.bufferSource.connect(sound2._node);
            }
            sound2._node.bufferSource.loop = sound2._loop;
            if (sound2._loop) {
              sound2._node.bufferSource.loopStart = sound2._start || 0;
              sound2._node.bufferSource.loopEnd = sound2._stop || 0;
            }
            sound2._node.bufferSource.playbackRate.setValueAtTime(sound2._rate, Howler3.ctx.currentTime);
            return self;
          },
          _cleanBuffer: function(node) {
            var self = this;
            var isIOS = Howler3._navigator && Howler3._navigator.vendor.indexOf("Apple") >= 0;
            if (Howler3._scratchBuffer && node.bufferSource) {
              node.bufferSource.onended = null;
              node.bufferSource.disconnect(0);
              if (isIOS) {
                try {
                  node.bufferSource.buffer = Howler3._scratchBuffer;
                } catch (e3) {
                }
              }
            }
            node.bufferSource = null;
            return self;
          },
          _clearSound: function(node) {
            var checkIE = /MSIE |Trident\//.test(Howler3._navigator && Howler3._navigator.userAgent);
            if (!checkIE) {
              node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
          }
        };
        var Sound3 = function(howl) {
          this._parent = howl;
          this.init();
        };
        Sound3.prototype = {
          init: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            parent._sounds.push(self);
            self.create();
            return self;
          },
          create: function() {
            var self = this;
            var parent = self._parent;
            var volume = Howler3._muted || self._muted || self._parent._muted ? 0 : self._volume;
            if (parent._webAudio) {
              self._node = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
              self._node.gain.setValueAtTime(volume, Howler3.ctx.currentTime);
              self._node.paused = true;
              self._node.connect(Howler3.masterGain);
            } else if (!Howler3.noAudio) {
              self._node = Howler3._obtainHtml5Audio();
              self._errorFn = self._errorListener.bind(self);
              self._node.addEventListener("error", self._errorFn, false);
              self._loadFn = self._loadListener.bind(self);
              self._node.addEventListener(Howler3._canPlayEvent, self._loadFn, false);
              self._endFn = self._endListener.bind(self);
              self._node.addEventListener("ended", self._endFn, false);
              self._node.src = parent._src;
              self._node.preload = parent._preload === true ? "auto" : parent._preload;
              self._node.volume = volume * Howler3.volume();
              self._node.load();
            }
            return self;
          },
          reset: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._rateSeek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            return self;
          },
          _errorListener: function() {
            var self = this;
            self._parent._emit("loaderror", self._id, self._node.error ? self._node.error.code : 0);
            self._node.removeEventListener("error", self._errorFn, false);
          },
          _loadListener: function() {
            var self = this;
            var parent = self._parent;
            parent._duration = Math.ceil(self._node.duration * 10) / 10;
            if (Object.keys(parent._sprite).length === 0) {
              parent._sprite = { __default: [0, parent._duration * 1e3] };
            }
            if (parent._state !== "loaded") {
              parent._state = "loaded";
              parent._emit("load");
              parent._loadQueue();
            }
            self._node.removeEventListener(Howler3._canPlayEvent, self._loadFn, false);
          },
          _endListener: function() {
            var self = this;
            var parent = self._parent;
            if (parent._duration === Infinity) {
              parent._duration = Math.ceil(self._node.duration * 10) / 10;
              if (parent._sprite.__default[1] === Infinity) {
                parent._sprite.__default[1] = parent._duration * 1e3;
              }
              parent._ended(self);
            }
            self._node.removeEventListener("ended", self._endFn, false);
          }
        };
        var cache = {};
        var loadBuffer = function(self) {
          var url = self._src;
          if (cache[url]) {
            self._duration = cache[url].duration;
            loadSound(self);
            return;
          }
          if (/^data:[^;]+;base64,/.test(url)) {
            var data2 = atob(url.split(",")[1]);
            var dataView = new Uint8Array(data2.length);
            for (var i3 = 0; i3 < data2.length; ++i3) {
              dataView[i3] = data2.charCodeAt(i3);
            }
            decodeAudioData(dataView.buffer, self);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open(self._xhr.method, url, true);
            xhr.withCredentials = self._xhr.withCredentials;
            xhr.responseType = "arraybuffer";
            if (self._xhr.headers) {
              Object.keys(self._xhr.headers).forEach(function(key2) {
                xhr.setRequestHeader(key2, self._xhr.headers[key2]);
              });
            }
            xhr.onload = function() {
              var code = (xhr.status + "")[0];
              if (code !== "0" && code !== "2" && code !== "3") {
                self._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
                return;
              }
              decodeAudioData(xhr.response, self);
            };
            xhr.onerror = function() {
              if (self._webAudio) {
                self._html5 = true;
                self._webAudio = false;
                self._sounds = [];
                delete cache[url];
                self.load();
              }
            };
            safeXhrSend(xhr);
          }
        };
        var safeXhrSend = function(xhr) {
          try {
            xhr.send();
          } catch (e3) {
            xhr.onerror();
          }
        };
        var decodeAudioData = function(arraybuffer, self) {
          var error = function() {
            self._emit("loaderror", null, "Decoding audio data failed.");
          };
          var success = function(buffer) {
            if (buffer && self._sounds.length > 0) {
              cache[self._src] = buffer;
              loadSound(self, buffer);
            } else {
              error();
            }
          };
          if (typeof Promise !== "undefined" && Howler3.ctx.decodeAudioData.length === 1) {
            Howler3.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
          } else {
            Howler3.ctx.decodeAudioData(arraybuffer, success, error);
          }
        };
        var loadSound = function(self, buffer) {
          if (buffer && !self._duration) {
            self._duration = buffer.duration;
          }
          if (Object.keys(self._sprite).length === 0) {
            self._sprite = { __default: [0, self._duration * 1e3] };
          }
          if (self._state !== "loaded") {
            self._state = "loaded";
            self._emit("load");
            self._loadQueue();
          }
        };
        var setupAudioContext = function() {
          if (!Howler3.usingWebAudio) {
            return;
          }
          try {
            if (typeof AudioContext !== "undefined") {
              Howler3.ctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              Howler3.ctx = new webkitAudioContext();
            } else {
              Howler3.usingWebAudio = false;
            }
          } catch (e3) {
            Howler3.usingWebAudio = false;
          }
          if (!Howler3.ctx) {
            Howler3.usingWebAudio = false;
          }
          var iOS = /iP(hone|od|ad)/.test(Howler3._navigator && Howler3._navigator.platform);
          var appVersion = Howler3._navigator && Howler3._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var version2 = appVersion ? parseInt(appVersion[1], 10) : null;
          if (iOS && version2 && version2 < 9) {
            var safari = /safari/.test(Howler3._navigator && Howler3._navigator.userAgent.toLowerCase());
            if (Howler3._navigator && !safari) {
              Howler3.usingWebAudio = false;
            }
          }
          if (Howler3.usingWebAudio) {
            Howler3.masterGain = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
            Howler3.masterGain.gain.setValueAtTime(Howler3._muted ? 0 : Howler3._volume, Howler3.ctx.currentTime);
            Howler3.masterGain.connect(Howler3.ctx.destination);
          }
          Howler3._setup();
        };
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return {
              Howler: Howler3,
              Howl: Howl3
            };
          });
        }
        if (typeof exports !== "undefined") {
          exports.Howler = Howler3;
          exports.Howl = Howl3;
        }
        if (typeof global !== "undefined") {
          global.HowlerGlobal = HowlerGlobal2;
          global.Howler = Howler3;
          global.Howl = Howl3;
          global.Sound = Sound3;
        } else if (typeof window !== "undefined") {
          window.HowlerGlobal = HowlerGlobal2;
          window.Howler = Howler3;
          window.Howl = Howl3;
          window.Sound = Sound3;
        }
      })();
      (function() {
        "use strict";
        HowlerGlobal.prototype._pos = [0, 0, 0];
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
        HowlerGlobal.prototype.stereo = function(pan) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          for (var i3 = self._howls.length - 1; i3 >= 0; i3--) {
            self._howls[i3].stereo(pan);
          }
          return self;
        };
        HowlerGlobal.prototype.pos = function(x3, y2, z2) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          y2 = typeof y2 !== "number" ? self._pos[1] : y2;
          z2 = typeof z2 !== "number" ? self._pos[2] : z2;
          if (typeof x3 === "number") {
            self._pos = [x3, y2, z2];
            if (typeof self.ctx.listener.positionX !== "undefined") {
              self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
            }
          } else {
            return self._pos;
          }
          return self;
        };
        HowlerGlobal.prototype.orientation = function(x3, y2, z2, xUp, yUp, zUp) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          var or = self._orientation;
          y2 = typeof y2 !== "number" ? or[1] : y2;
          z2 = typeof z2 !== "number" ? or[2] : z2;
          xUp = typeof xUp !== "number" ? or[3] : xUp;
          yUp = typeof yUp !== "number" ? or[4] : yUp;
          zUp = typeof zUp !== "number" ? or[5] : zUp;
          if (typeof x3 === "number") {
            self._orientation = [x3, y2, z2, xUp, yUp, zUp];
            if (typeof self.ctx.listener.forwardX !== "undefined") {
              self.ctx.listener.forwardX.setTargetAtTime(x3, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardY.setTargetAtTime(y2, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardZ.setTargetAtTime(z2, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setOrientation(x3, y2, z2, xUp, yUp, zUp);
            }
          } else {
            return or;
          }
          return self;
        };
        Howl.prototype.init = function(_super) {
          return function(o3) {
            var self = this;
            self._orientation = o3.orientation || [1, 0, 0];
            self._stereo = o3.stereo || null;
            self._pos = o3.pos || null;
            self._pannerAttr = {
              coneInnerAngle: typeof o3.coneInnerAngle !== "undefined" ? o3.coneInnerAngle : 360,
              coneOuterAngle: typeof o3.coneOuterAngle !== "undefined" ? o3.coneOuterAngle : 360,
              coneOuterGain: typeof o3.coneOuterGain !== "undefined" ? o3.coneOuterGain : 0,
              distanceModel: typeof o3.distanceModel !== "undefined" ? o3.distanceModel : "inverse",
              maxDistance: typeof o3.maxDistance !== "undefined" ? o3.maxDistance : 1e4,
              panningModel: typeof o3.panningModel !== "undefined" ? o3.panningModel : "HRTF",
              refDistance: typeof o3.refDistance !== "undefined" ? o3.refDistance : 1,
              rolloffFactor: typeof o3.rolloffFactor !== "undefined" ? o3.rolloffFactor : 1
            };
            self._onstereo = o3.onstereo ? [{ fn: o3.onstereo }] : [];
            self._onpos = o3.onpos ? [{ fn: o3.onpos }] : [];
            self._onorientation = o3.onorientation ? [{ fn: o3.onorientation }] : [];
            return _super.call(this, o3);
          };
        }(Howl.prototype.init);
        Howl.prototype.stereo = function(pan, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "stereo",
              action: function() {
                self.stereo(pan, id);
              }
            });
            return self;
          }
          var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
          if (typeof id === "undefined") {
            if (typeof pan === "number") {
              self._stereo = pan;
              self._pos = [pan, 0, 0];
            } else {
              return self._stereo;
            }
          }
          var ids2 = self._getSoundIds(id);
          for (var i3 = 0; i3 < ids2.length; i3++) {
            var sound2 = self._soundById(ids2[i3]);
            if (sound2) {
              if (typeof pan === "number") {
                sound2._stereo = pan;
                sound2._pos = [pan, 0, 0];
                if (sound2._node) {
                  sound2._pannerAttr.panningModel = "equalpower";
                  if (!sound2._panner || !sound2._panner.pan) {
                    setupPanner(sound2, pannerType);
                  }
                  if (pannerType === "spatial") {
                    if (typeof sound2._panner.positionX !== "undefined") {
                      sound2._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                      sound2._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                      sound2._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                    } else {
                      sound2._panner.setPosition(pan, 0, 0);
                    }
                  } else {
                    sound2._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                  }
                }
                self._emit("stereo", sound2._id);
              } else {
                return sound2._stereo;
              }
            }
          }
          return self;
        };
        Howl.prototype.pos = function(x3, y2, z2, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "pos",
              action: function() {
                self.pos(x3, y2, z2, id);
              }
            });
            return self;
          }
          y2 = typeof y2 !== "number" ? 0 : y2;
          z2 = typeof z2 !== "number" ? -0.5 : z2;
          if (typeof id === "undefined") {
            if (typeof x3 === "number") {
              self._pos = [x3, y2, z2];
            } else {
              return self._pos;
            }
          }
          var ids2 = self._getSoundIds(id);
          for (var i3 = 0; i3 < ids2.length; i3++) {
            var sound2 = self._soundById(ids2[i3]);
            if (sound2) {
              if (typeof x3 === "number") {
                sound2._pos = [x3, y2, z2];
                if (sound2._node) {
                  if (!sound2._panner || sound2._panner.pan) {
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.positionX !== "undefined") {
                    sound2._panner.positionX.setValueAtTime(x3, Howler.ctx.currentTime);
                    sound2._panner.positionY.setValueAtTime(y2, Howler.ctx.currentTime);
                    sound2._panner.positionZ.setValueAtTime(z2, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setPosition(x3, y2, z2);
                  }
                }
                self._emit("pos", sound2._id);
              } else {
                return sound2._pos;
              }
            }
          }
          return self;
        };
        Howl.prototype.orientation = function(x3, y2, z2, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "orientation",
              action: function() {
                self.orientation(x3, y2, z2, id);
              }
            });
            return self;
          }
          y2 = typeof y2 !== "number" ? self._orientation[1] : y2;
          z2 = typeof z2 !== "number" ? self._orientation[2] : z2;
          if (typeof id === "undefined") {
            if (typeof x3 === "number") {
              self._orientation = [x3, y2, z2];
            } else {
              return self._orientation;
            }
          }
          var ids2 = self._getSoundIds(id);
          for (var i3 = 0; i3 < ids2.length; i3++) {
            var sound2 = self._soundById(ids2[i3]);
            if (sound2) {
              if (typeof x3 === "number") {
                sound2._orientation = [x3, y2, z2];
                if (sound2._node) {
                  if (!sound2._panner) {
                    if (!sound2._pos) {
                      sound2._pos = self._pos || [0, 0, -0.5];
                    }
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.orientationX !== "undefined") {
                    sound2._panner.orientationX.setValueAtTime(x3, Howler.ctx.currentTime);
                    sound2._panner.orientationY.setValueAtTime(y2, Howler.ctx.currentTime);
                    sound2._panner.orientationZ.setValueAtTime(z2, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setOrientation(x3, y2, z2);
                  }
                }
                self._emit("orientation", sound2._id);
              } else {
                return sound2._orientation;
              }
            }
          }
          return self;
        };
        Howl.prototype.pannerAttr = function() {
          var self = this;
          var args = arguments;
          var o3, id, sound2;
          if (!self._webAudio) {
            return self;
          }
          if (args.length === 0) {
            return self._pannerAttr;
          } else if (args.length === 1) {
            if (typeof args[0] === "object") {
              o3 = args[0];
              if (typeof id === "undefined") {
                if (!o3.pannerAttr) {
                  o3.pannerAttr = {
                    coneInnerAngle: o3.coneInnerAngle,
                    coneOuterAngle: o3.coneOuterAngle,
                    coneOuterGain: o3.coneOuterGain,
                    distanceModel: o3.distanceModel,
                    maxDistance: o3.maxDistance,
                    refDistance: o3.refDistance,
                    rolloffFactor: o3.rolloffFactor,
                    panningModel: o3.panningModel
                  };
                }
                self._pannerAttr = {
                  coneInnerAngle: typeof o3.pannerAttr.coneInnerAngle !== "undefined" ? o3.pannerAttr.coneInnerAngle : self._coneInnerAngle,
                  coneOuterAngle: typeof o3.pannerAttr.coneOuterAngle !== "undefined" ? o3.pannerAttr.coneOuterAngle : self._coneOuterAngle,
                  coneOuterGain: typeof o3.pannerAttr.coneOuterGain !== "undefined" ? o3.pannerAttr.coneOuterGain : self._coneOuterGain,
                  distanceModel: typeof o3.pannerAttr.distanceModel !== "undefined" ? o3.pannerAttr.distanceModel : self._distanceModel,
                  maxDistance: typeof o3.pannerAttr.maxDistance !== "undefined" ? o3.pannerAttr.maxDistance : self._maxDistance,
                  refDistance: typeof o3.pannerAttr.refDistance !== "undefined" ? o3.pannerAttr.refDistance : self._refDistance,
                  rolloffFactor: typeof o3.pannerAttr.rolloffFactor !== "undefined" ? o3.pannerAttr.rolloffFactor : self._rolloffFactor,
                  panningModel: typeof o3.pannerAttr.panningModel !== "undefined" ? o3.pannerAttr.panningModel : self._panningModel
                };
              }
            } else {
              sound2 = self._soundById(parseInt(args[0], 10));
              return sound2 ? sound2._pannerAttr : self._pannerAttr;
            }
          } else if (args.length === 2) {
            o3 = args[0];
            id = parseInt(args[1], 10);
          }
          var ids2 = self._getSoundIds(id);
          for (var i3 = 0; i3 < ids2.length; i3++) {
            sound2 = self._soundById(ids2[i3]);
            if (sound2) {
              var pa = sound2._pannerAttr;
              pa = {
                coneInnerAngle: typeof o3.coneInnerAngle !== "undefined" ? o3.coneInnerAngle : pa.coneInnerAngle,
                coneOuterAngle: typeof o3.coneOuterAngle !== "undefined" ? o3.coneOuterAngle : pa.coneOuterAngle,
                coneOuterGain: typeof o3.coneOuterGain !== "undefined" ? o3.coneOuterGain : pa.coneOuterGain,
                distanceModel: typeof o3.distanceModel !== "undefined" ? o3.distanceModel : pa.distanceModel,
                maxDistance: typeof o3.maxDistance !== "undefined" ? o3.maxDistance : pa.maxDistance,
                refDistance: typeof o3.refDistance !== "undefined" ? o3.refDistance : pa.refDistance,
                rolloffFactor: typeof o3.rolloffFactor !== "undefined" ? o3.rolloffFactor : pa.rolloffFactor,
                panningModel: typeof o3.panningModel !== "undefined" ? o3.panningModel : pa.panningModel
              };
              var panner = sound2._panner;
              if (panner) {
                panner.coneInnerAngle = pa.coneInnerAngle;
                panner.coneOuterAngle = pa.coneOuterAngle;
                panner.coneOuterGain = pa.coneOuterGain;
                panner.distanceModel = pa.distanceModel;
                panner.maxDistance = pa.maxDistance;
                panner.refDistance = pa.refDistance;
                panner.rolloffFactor = pa.rolloffFactor;
                panner.panningModel = pa.panningModel;
              } else {
                if (!sound2._pos) {
                  sound2._pos = self._pos || [0, 0, -0.5];
                }
                setupPanner(sound2, "spatial");
              }
            }
          }
          return self;
        };
        Sound.prototype.init = function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            _super.call(this);
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            }
          };
        }(Sound.prototype.init);
        Sound.prototype.reset = function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            } else if (self._panner) {
              self._panner.disconnect(0);
              self._panner = void 0;
              parent._refreshBuffer(self);
            }
            return _super.call(this);
          };
        }(Sound.prototype.reset);
        var setupPanner = function(sound2, type) {
          type = type || "spatial";
          if (type === "spatial") {
            sound2._panner = Howler.ctx.createPanner();
            sound2._panner.coneInnerAngle = sound2._pannerAttr.coneInnerAngle;
            sound2._panner.coneOuterAngle = sound2._pannerAttr.coneOuterAngle;
            sound2._panner.coneOuterGain = sound2._pannerAttr.coneOuterGain;
            sound2._panner.distanceModel = sound2._pannerAttr.distanceModel;
            sound2._panner.maxDistance = sound2._pannerAttr.maxDistance;
            sound2._panner.refDistance = sound2._pannerAttr.refDistance;
            sound2._panner.rolloffFactor = sound2._pannerAttr.rolloffFactor;
            sound2._panner.panningModel = sound2._pannerAttr.panningModel;
            if (typeof sound2._panner.positionX !== "undefined") {
              sound2._panner.positionX.setValueAtTime(sound2._pos[0], Howler.ctx.currentTime);
              sound2._panner.positionY.setValueAtTime(sound2._pos[1], Howler.ctx.currentTime);
              sound2._panner.positionZ.setValueAtTime(sound2._pos[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setPosition(sound2._pos[0], sound2._pos[1], sound2._pos[2]);
            }
            if (typeof sound2._panner.orientationX !== "undefined") {
              sound2._panner.orientationX.setValueAtTime(sound2._orientation[0], Howler.ctx.currentTime);
              sound2._panner.orientationY.setValueAtTime(sound2._orientation[1], Howler.ctx.currentTime);
              sound2._panner.orientationZ.setValueAtTime(sound2._orientation[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setOrientation(sound2._orientation[0], sound2._orientation[1], sound2._orientation[2]);
            }
          } else {
            sound2._panner = Howler.ctx.createStereoPanner();
            sound2._panner.pan.setValueAtTime(sound2._stereo, Howler.ctx.currentTime);
          }
          sound2._panner.connect(sound2._node);
          if (!sound2._paused) {
            sound2._parent.pause(sound2._id, true).play(sound2._id, true);
          }
        };
      })();
    }
  });

  // jscc_temp/src/main.ts
  init_preact_shim();
  init_preact_module();

  // jscc_temp/src/display/menu.ts
  init_preact_shim();

  // jscc_temp/src/game.ts
  init_preact_shim();

  // jscc_temp/src/utils/enums.ts
  init_preact_shim();
  var GameType;
  (function(GameType4) {
    GameType4[GameType4["Sprint"] = 0] = "Sprint";
    GameType4[GameType4["Marathon"] = 1] = "Marathon";
    GameType4[GameType4["Survival"] = 3] = "Survival";
    GameType4[GameType4["Dig"] = 4] = "Dig";
    GameType4[GameType4["ScoreAttack"] = 5] = "ScoreAttack";
    GameType4[GameType4["Master"] = 6] = "Master";
    GameType4[GameType4["Unknown"] = 7] = "Unknown";
    GameType4[GameType4["Retro"] = 8] = "Retro";
    GameType4[GameType4["Grades"] = 9] = "Grades";
  })(GameType || (GameType = {}));
  var Mino;
  (function(Mino2) {
    Mino2[Mino2["I"] = 0] = "I";
    Mino2[Mino2["J"] = 1] = "J";
    Mino2[Mino2["L"] = 2] = "L";
    Mino2[Mino2["O"] = 3] = "O";
    Mino2[Mino2["S"] = 4] = "S";
    Mino2[Mino2["T"] = 5] = "T";
    Mino2[Mino2["Z"] = 6] = "Z";
  })(Mino || (Mino = {}));
  var GameState;
  (function(GameState2) {
    GameState2[GameState2["Normal"] = 0] = "Normal";
    GameState2[GameState2["Win"] = 1] = "Win";
    GameState2[GameState2["Countdown"] = 2] = "Countdown";
    GameState2[GameState2["NotPlayed"] = 3] = "NotPlayed";
    GameState2[GameState2["Paused"] = 4] = "Paused";
    GameState2[GameState2["Loss"] = 5] = "Loss";
    GameState2[GameState2["BlockOut"] = 9] = "BlockOut";
  })(GameState || (GameState = {}));
  var Gravity;
  (function(Gravity3) {
    Gravity3[Gravity3["Auto"] = 0] = "Auto";
    Gravity3[Gravity3["0G"] = 1] = "0G";
    Gravity3[Gravity3["1/64G"] = 2] = "1/64G";
    Gravity3[Gravity3["1/32G"] = 3] = "1/32G";
    Gravity3[Gravity3["1/16G"] = 4] = "1/16G";
    Gravity3[Gravity3["1/8G"] = 5] = "1/8G";
    Gravity3[Gravity3["1/4G"] = 6] = "1/4G";
    Gravity3[Gravity3["1/2G"] = 7] = "1/2G";
    Gravity3[Gravity3["1G"] = 8] = "1G";
    Gravity3[Gravity3["20G"] = 9] = "20G";
  })(Gravity || (Gravity = {}));
  var SoftDrop;
  (function(SoftDrop3) {
    SoftDrop3[SoftDrop3["Auto"] = 0] = "Auto";
    SoftDrop3[SoftDrop3["0G"] = 1] = "0G";
    SoftDrop3[SoftDrop3["1/64G"] = 2] = "1/64G";
    SoftDrop3[SoftDrop3["1/32G"] = 3] = "1/32G";
    SoftDrop3[SoftDrop3["1/16G"] = 4] = "1/16G";
    SoftDrop3[SoftDrop3["1/8G"] = 5] = "1/8G";
    SoftDrop3[SoftDrop3["1/4G"] = 6] = "1/4G";
    SoftDrop3[SoftDrop3["1/2G"] = 7] = "1/2G";
    SoftDrop3[SoftDrop3["1G"] = 8] = "1G";
    SoftDrop3[SoftDrop3["20G"] = 9] = "20G";
  })(SoftDrop || (SoftDrop = {}));
  var RotSys;
  (function(RotSys2) {
    RotSys2[RotSys2["Super"] = 0] = "Super";
    RotSys2[RotSys2["C2"] = 1] = "C2";
    RotSys2[RotSys2["Arika"] = 2] = "Arika";
    RotSys2[RotSys2["DTET"] = 3] = "DTET";
    RotSys2[RotSys2["QQ"] = 4] = "QQ";
    RotSys2[RotSys2["Atari"] = 5] = "Atari";
    RotSys2[RotSys2["Tengen"] = 6] = "Tengen";
    RotSys2[RotSys2["N-Blox"] = 7] = "N-Blox";
    RotSys2[RotSys2["Nintendo"] = 8] = "Nintendo";
    RotSys2[RotSys2["MS"] = 9] = "MS";
    RotSys2[RotSys2["E-60"] = 10] = "E-60";
    RotSys2[RotSys2["IBM PC"] = 11] = "IBM PC";
    RotSys2[RotSys2["JJ"] = 12] = "JJ";
    RotSys2[RotSys2["5k"] = 13] = "5k";
    RotSys2[RotSys2["Plus"] = 14] = "Plus";
    RotSys2[RotSys2["DX"] = 15] = "DX";
  })(RotSys || (RotSys = {}));
  var Size;
  (function(Size2) {
    Size2[Size2["Full"] = 0] = "Full";
    Size2[Size2["Small"] = 1] = "Small";
    Size2[Size2["Medium"] = 2] = "Medium";
    Size2[Size2["Large"] = 3] = "Large";
    Size2[Size2["Extra Large"] = 4] = "Extra Large";
  })(Size || (Size = {}));
  var Soundbank;
  (function(Soundbank2) {
    Soundbank2[Soundbank2["PPT"] = 0] = "PPT";
    Soundbank2[Soundbank2["TGM3"] = 1] = "TGM3";
    Soundbank2[Soundbank2["NullPM"] = 2] = "NullPM";
    Soundbank2[Soundbank2["Yotipo"] = 3] = "Yotipo";
    Soundbank2[Soundbank2["TOJ"] = 4] = "TOJ";
    Soundbank2[Soundbank2["Retro"] = 5] = "Retro";
    Soundbank2[Soundbank2["Friends"] = 6] = "Friends";
    Soundbank2[Soundbank2["T99"] = 7] = "T99";
    Soundbank2[Soundbank2[".com"] = 8] = ".com";
    Soundbank2[Soundbank2["Party"] = 9] = "Party";
    Soundbank2[Soundbank2["Ultimate"] = 10] = "Ultimate";
    Soundbank2[Soundbank2["Ace"] = 11] = "Ace";
    Soundbank2[Soundbank2["Tetr.js"] = 12] = "Tetr.js";
  })(Soundbank || (Soundbank = {}));
  var Block;
  (function(Block2) {
    Block2[Block2["Bevelled"] = 0] = "Bevelled";
    Block2[Block2["Flat"] = 1] = "Flat";
    Block2[Block2["Glossy"] = 2] = "Glossy";
    Block2[Block2["Arika"] = 3] = "Arika";
    Block2[Block2["Aqua"] = 4] = "Aqua";
    Block2[Block2["Arcade"] = 5] = "Arcade";
    Block2[Block2["N-Blox"] = 6] = "N-Blox";
    Block2[Block2["Bone"] = 7] = "Bone";
    Block2[Block2["Retro"] = 8] = "Retro";
    Block2[Block2["Friends"] = 9] = "Friends";
    Block2[Block2["T99"] = 10] = "T99";
    Block2[Block2[".com"] = 11] = ".com";
    Block2[Block2["PPT"] = 12] = "PPT";
  })(Block || (Block = {}));
  var NextType;
  (function(NextType2) {
    NextType2[NextType2["TGM3"] = 0] = "TGM3";
    NextType2[NextType2["NullPM"] = 1] = "NullPM";
    NextType2[NextType2["TGM1"] = 2] = "TGM1";
    NextType2[NextType2["Tetr.js"] = 3] = "Tetr.js";
  })(NextType || (NextType = {}));
  var Voicebank;
  (function(Voicebank2) {
    Voicebank2[Voicebank2["Alexey"] = 0] = "Alexey";
    Voicebank2[Voicebank2["Friends"] = 1] = "Friends";
    Voicebank2[Voicebank2["TOJ"] = 2] = "TOJ";
  })(Voicebank || (Voicebank = {}));
  var Ghost;
  (function(Ghost2) {
    Ghost2[Ghost2["Grey"] = 0] = "Grey";
    Ghost2[Ghost2["Colored"] = 1] = "Colored";
    Ghost2[Ghost2["Off"] = 2] = "Off";
    Ghost2[Ghost2["Hidden"] = 3] = "Hidden";
  })(Ghost || (Ghost = {}));
  var Outline;
  (function(Outline2) {
    Outline2[Outline2["Off"] = 0] = "Off";
    Outline2[Outline2["On"] = 1] = "On";
    Outline2[Outline2["Hidden"] = 2] = "Hidden";
    Outline2[Outline2["Only"] = 3] = "Only";
  })(Outline || (Outline = {}));
  var IRSMode;
  (function(IRSMode2) {
    IRSMode2[IRSMode2["Off"] = 0] = "Off";
    IRSMode2[IRSMode2["Tap"] = 1] = "Tap";
    IRSMode2[IRSMode2["Hold"] = 2] = "Hold";
    IRSMode2[IRSMode2["Additive"] = 3] = "Additive";
  })(IRSMode || (IRSMode = {}));
  var IHSMode;
  (function(IHSMode2) {
    IHSMode2[IHSMode2["Off"] = 0] = "Off";
    IHSMode2[IHSMode2["Tap"] = 1] = "Tap";
    IHSMode2[IHSMode2["Hold"] = 2] = "Hold";
  })(IHSMode || (IHSMode = {}));

  // jscc_temp/src/utils/utils.ts
  init_preact_shim();
  var $2 = (id) => document.getElementById(id);
  var $$ = (selectors) => document.querySelectorAll(selectors);
  var $setText = (ele, text) => ele.textContent = text;
  function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  function range(start, end, inc) {
    inc = inc || 1;
    const array = [];
    for (let i3 = start; i3 < end; i3 += inc) {
      array.push(i3);
    }
    return array;
  }

  // jscc_temp/src/leaderboard/replays.ts
  init_preact_shim();

  // jscc_temp/src/settings.ts
  init_preact_shim();

  // jscc_temp/src/utils/data.ts
  init_preact_shim();

  // jscc_temp/src/utils/decorators.ts
  init_preact_shim();
  function lazy(target, name, {
    get: initializer,
    enumerable,
    configurable,
    set: setter
  } = {}) {
    const { constructor } = target;
    if (initializer === void 0) {
      throw `@lazy can't be set as a property \`${name}\` on ${constructor.name} class, using a getter instead!`;
    }
    if (setter) {
      throw `@lazy can't be annotated with get ${name}() existing a setter on ${constructor.name} class!`;
    }
    function set(that, value) {
      if (value === void 0) {
        value = that;
        that = this;
      }
      Object.defineProperty(that, name, {
        enumerable,
        configurable,
        value
      });
      return value;
    }
    return {
      get() {
        if (this === target) {
          return initializer();
        }
        if (this.constructor !== constructor && Object.getPrototypeOf(this).constructor === constructor) {
          return initializer();
        }
        return set(this, initializer.call(this));
      },
      set
    };
  }

  // jscc_temp/src/utils/randomizer.ts
  init_preact_shim();
  var Random = class {
    constructor() {
      this.seed = 1;
    }
    next() {
      return this.gen() / 2147483647;
    }
    gen() {
      return this.seed = this.seed * 16807 % 2147483647;
    }
  };
  var rng = new Random();

  // jscc_temp/src/utils/data.ts
  var version = "0.7.7";
  var Mutable = class {
  };
  Mutable.allclear = 0;
  Mutable.combo = 0;
  Mutable.level = 0;
  Mutable.leveltgm = 0;
  Mutable.leveltgmvisible = 0;
  Mutable.lines = 0;
  Mutable.lineAmount = 0;
  Mutable.lineARE = 0;
  Mutable.lineAREb = 0;
  Mutable.lineDrought = 0;
  Mutable.score = 0n;
  Mutable.newScore = 0n;
  Mutable.statsFinesse = 0;
  Mutable.piecesSet = 0;
  Mutable.scoreTime = 0;
  Mutable.scoreStartTime = 0;
  Mutable.digLines = [];
  Mutable.b2b = 0;
  Mutable.gravity = 0;
  Mutable.gravityArr = (() => {
    const array = [];
    array.push(0);
    for (let i3 = 1; i3 < 64; i3 *= 2)
      array.push(i3 / 64);
    for (let i3 = 1; i3 <= 20; i3 += 19)
      array.push(i3);
    return array;
  })();
  Mutable.lineLimit = 0;
  Mutable.cellSize = 0;
  Mutable.column = 0;
  Mutable.lockDelayLimit = void 0;
  Mutable.sdArray = [];
  Mutable.frame = 0;
  Mutable.frameSkipped = 0;
  Mutable.frameLastRise = 0;
  Mutable.frameLastHarddropDown = 0;
  Mutable.digZenBuffer = 0;
  Mutable.lastPiecesSet = 0;
  Mutable.toGreyRow = 0;
  Mutable.lastX = 0;
  Mutable.lastY = 0;
  Mutable.lastPos = 0;
  Mutable.lastLockDelay = 0;
  Mutable.usedHardDrop = false;
  Mutable.spinY = 0;
  Mutable.spinX = 0;
  Mutable.rotationFailed = false;
  Mutable.classicRuleDelayLast = 0;
  Mutable.lastYFrame = 0;
  Mutable.classicSoftDrop = 0;
  Mutable.classicGravTest = 0;
  Mutable.classicStoredY = 0;
  Mutable.keysDown = 0;
  Mutable.lastKeys = 0;
  Mutable.released = 0;
  Mutable.alarm = false;
  Mutable.lineClear = 0;
  Mutable.playedLevelingbgmGrades = [false, false];
  Mutable.playedLevelingbgmMarathon = [false, false];
  Mutable.lastbgmTime = 0;
  Mutable.killAllbgm = false;
  Mutable.currentLoading = "";
  Mutable.scoreNes = 0;
  Mutable.nontetNes = 0;
  Mutable.tetNes = 0;
  Mutable.tetRateNes = 0;
  Mutable.isSpin = false;
  Mutable.isMini = false;
  Mutable.lockflashX = 0;
  Mutable.lockflashY = 0;
  Mutable.lockflash = 0;
  Mutable.lockflashOn = false;
  Mutable.alarmtest = false;
  Mutable.clearRows = [];
  Mutable.levelCheck = 0;
  var binds = {
    pause: 27,
    moveLeft: 37,
    moveRight: 39,
    moveLeft3: 0,
    moveRight3: 0,
    moveDown: 40,
    hardDrop: 32,
    holdPiece: 67,
    rotRight: 88,
    rotLeft: 90,
    rot180: 16,
    retry: 82
  };
  function setBinds(newBinds) {
    binds = newBinds;
  }
  var flags = {
    hardDrop: 1,
    moveRight: 2,
    moveLeft: 4,
    moveDown: 8,
    holdPiece: 16,
    rotRight: 32,
    rotLeft: 64,
    rot180: 128,
    moveRight3: 256,
    moveLeft3: 512
  };
  var uitypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");
  var base = 1 / 65536;
  var speedTableTGM = [
    { level: 0, speed: base * 1024 },
    { level: 30, speed: base * 1536 },
    { level: 35, speed: base * 2048 },
    { level: 40, speed: base * 2560 },
    { level: 50, speed: base * 3072 },
    { level: 60, speed: base * 4096 },
    { level: 70, speed: base * 8192 },
    { level: 80, speed: base * 12288 },
    { level: 90, speed: base * 16384 },
    { level: 100, speed: base * 20480 },
    { level: 120, speed: base * 24576 },
    { level: 140, speed: base * 28672 },
    { level: 160, speed: base * 32768 },
    { level: 170, speed: base * 36865 },
    { level: 200, speed: base * 1024 },
    { level: 220, speed: base * 8192 },
    { level: 230, speed: base * 16384 },
    { level: 233, speed: base * 24576 },
    { level: 236, speed: base * 32768 },
    { level: 239, speed: base * 40960 },
    { level: 243, speed: base * 49152 },
    { level: 247, speed: base * 57344 },
    { level: 251, speed: 1 },
    { level: 300, speed: 2 },
    { level: 330, speed: 3 },
    { level: 360, speed: 4 },
    { level: 400, speed: 5 },
    { level: 420, speed: 4 },
    { level: 450, speed: 3 },
    { level: 500, speed: 20 },
    { level: 9999999999999, speed: 20 }
  ];
  var miscTableTGM = [
    {
      level: 0,
      are: 25,
      areline: 40,
      arelineb: 0,
      das: 14,
      lockdelay: 30
    },
    {
      level: 500,
      are: 25,
      areline: 25,
      arelineb: 0,
      das: 8,
      lockdelay: 30
    },
    {
      level: 600,
      are: 25,
      areline: 16,
      arelineb: -9,
      das: 8,
      lockdelay: 30
    },
    {
      level: 700,
      are: 16,
      areline: 12,
      arelineb: -4,
      das: 8,
      lockdelay: 30
    },
    {
      level: 800,
      are: 12,
      areline: 6,
      arelineb: -6,
      das: 8,
      lockdelay: 30
    },
    {
      level: 900,
      are: 12,
      areline: 6,
      arelineb: -6,
      das: 6,
      lockdelay: 17
    },
    {
      level: 1e3,
      are: 6,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 17
    },
    {
      level: 1100,
      are: 5,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 15
    },
    {
      level: 1200,
      are: 4,
      areline: 6,
      arelineb: 0,
      das: 6,
      lockdelay: 15
    },
    {
      level: 99999999999999,
      are: 4,
      areline: 6,
      das: 6,
      lockdelay: 15
    }
  ];
  var TetroI = [
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroJ = [
    [
      [2, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [2, 2, 2, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 2, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 2, 0],
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroL = [
    [
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [3, 3, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [3, 3, 3, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 3, 3, 0],
      [0, 3, 0, 0],
      [0, 3, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [3, 0, 0, 0],
      [3, 3, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroO = [
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [4, 4, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroS = [
    [
      [0, 5, 0, 0],
      [5, 5, 0, 0],
      [5, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [5, 5, 0, 0],
      [0, 5, 5, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 5, 0],
      [0, 5, 5, 0],
      [0, 5, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [5, 5, 0, 0],
      [0, 5, 5, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroT = [
    [
      [0, 6, 0, 0],
      [6, 6, 0, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [6, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 6, 0, 0],
      [0, 6, 6, 0],
      [0, 6, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 6, 0, 0],
      [6, 6, 6, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var TetroZ = [
    [
      [7, 0, 0, 0],
      [7, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 7, 7, 0],
      [7, 7, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 7, 0, 0],
      [0, 7, 7, 0],
      [0, 0, 7, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 7, 7, 0],
      [7, 7, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  var RectI = [
    [0, 1, 4, 2],
    [2, 0, 3, 4],
    [0, 2, 4, 3],
    [1, 0, 2, 4]
  ];
  var RectJ = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectL = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectO = [
    [1, 0, 3, 2],
    [1, 0, 3, 2],
    [1, 0, 3, 2],
    [1, 0, 3, 2]
  ];
  var RectS = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectT = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var RectZ = [
    [0, 0, 3, 2],
    [1, 0, 3, 3],
    [0, 1, 3, 3],
    [0, 0, 2, 3]
  ];
  var SpinCheckI = {
    highX: [
      [1, 2, 2, 1],
      [1, 3, 1, 3],
      [1, 2, 2, 1],
      [0, 2, 0, 2]
    ],
    highY: [
      [0, 2, 0, 2],
      [1, 2, 2, 1],
      [1, 3, 1, 3],
      [1, 2, 2, 1]
    ],
    lowX: [
      [-1, 4, -1, 4],
      [2, 2, 2, 2],
      [-1, 4, -1, 4],
      [1, 1, 1, 1]
    ],
    lowY: [
      [1, 1, 1, 1],
      [-1, 4, -1, 4],
      [2, 2, 2, 2],
      [-1, 4, -1, 4]
    ]
  };
  var SpinCheckJ = {
    highX: [
      [1, 2],
      [2, 2],
      [1, 0],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [1, 2],
      [2, 2],
      [1, 0]
    ],
    lowX: [
      [0, 2],
      [0, 0],
      [2, 0],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [0, 2],
      [0, 0],
      [2, 0]
    ]
  };
  var SpinCheckL = {
    highX: [
      [1, 0],
      [2, 2],
      [1, 2],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [1, 0],
      [2, 2],
      [1, 2]
    ],
    lowX: [
      [2, 0],
      [0, 0],
      [0, 2],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [2, 0],
      [0, 0],
      [0, 3]
    ]
  };
  var SpinCheckS = {
    highX: [
      [0, 2],
      [1, 2],
      [2, 0],
      [1, 0]
    ],
    highY: [
      [0, 1],
      [2, 0],
      [2, 1],
      [0, 2]
    ],
    lowX: [
      [0, -1],
      [1, 2],
      [-1, 3],
      [1, 0]
    ],
    lowY: [
      [0, 1],
      [-1, 3],
      [2, 1],
      [3, -1]
    ]
  };
  var SpinCheckT = {
    highX: [
      [0, 2],
      [2, 2],
      [0, 2],
      [0, 0]
    ],
    highY: [
      [0, 0],
      [0, 2],
      [2, 2],
      [0, 2]
    ],
    lowX: [
      [0, 2],
      [0, 0],
      [0, 2],
      [2, 2]
    ],
    lowY: [
      [2, 2],
      [0, 2],
      [0, 0],
      [0, 2]
    ]
  };
  var SpinCheckZ = {
    highX: [
      [2, 0],
      [2, 1],
      [0, 2],
      [0, 1]
    ],
    highY: [
      [0, 1],
      [2, 0],
      [2, 1],
      [0, 2]
    ],
    lowX: [
      [-1, 3],
      [2, 1],
      [3, -1],
      [0, 1]
    ],
    lowY: [
      [0, 1],
      [-1, 3],
      [2, 1],
      [3, -1]
    ]
  };
  var WKTableSRSI_R = [
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2]
    ],
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1]
    ],
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1]
    ]
  ];
  var WKTableSRSI_L = [
    [
      [0, 0],
      [-1, 0],
      [2, 0],
      [-1, -2],
      [2, 1]
    ],
    [
      [0, 0],
      [2, 0],
      [-1, 0],
      [2, -1],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [-2, 0],
      [1, 2],
      [-2, -1]
    ],
    [
      [0, 0],
      [-2, 0],
      [1, 0],
      [-2, 1],
      [1, -2]
    ]
  ];
  var WKTableSRSI_2 = [
    [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [1, 0],
      [2, 0],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, -1],
      [0, -2],
      [-1, 0]
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [-1, 0],
      [-2, 0],
      [0, -1]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, -1],
      [0, -2],
      [1, 0]
    ]
  ];
  var WKTableSRSX_R = [
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ]
  ];
  var WKTableSRSX_L = [
    [
      [0, 0],
      [1, 0],
      [1, -1],
      [0, 2],
      [1, 2]
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, -2],
      [1, -2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [0, 2],
      [-1, 2]
    ],
    [
      [0, 0],
      [-1, 0],
      [-1, 1],
      [0, -2],
      [-1, -2]
    ]
  ];
  var WKTableSRSX_2 = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [1, 1],
      [2, 1],
      [-1, 0],
      [-2, 0],
      [-1, 1],
      [-2, 1],
      [0, -1],
      [3, 0],
      [-3, 0]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [-1, 1],
      [-1, 2],
      [0, -1],
      [0, -2],
      [-1, -1],
      [-1, -2],
      [1, 0],
      [0, 3],
      [0, -3]
    ],
    [
      [0, 0],
      [-1, 0],
      [-2, 0],
      [-1, -1],
      [-2, -1],
      [1, 0],
      [2, 0],
      [1, -1],
      [2, -1],
      [0, 1],
      [-3, 0],
      [3, 0]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
      [0, -1],
      [0, -2],
      [1, -1],
      [1, -2],
      [-1, 0],
      [0, 3],
      [0, -3]
    ]
  ];
  var WKTableSRSI = [WKTableSRSI_R, WKTableSRSI_L, WKTableSRSI_2];
  var WKTableSRSX = [WKTableSRSX_R, WKTableSRSX_L, WKTableSRSX_2];
  var WKTableSRS = [
    WKTableSRSI,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX,
    WKTableSRSX
  ];
  var WKTableCultris = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
    [1, 1],
    [-2, 0],
    [2, 0],
    [0, -1]
  ];
  var WKTableDRS_R = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [1, 1],
    [-1, 1],
    [0, -1]
  ];
  var WKTableDRS_L = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, 1],
    [-1, 1],
    [1, 1],
    [0, -1]
  ];
  var WKTableDRS = [WKTableDRS_R, WKTableDRS_L, WKTableDRS_L];
  var WKTableDX_R = [
    [
      [0, 0],
      [-1, -1]
    ],
    [
      [0, 0],
      [1, -1]
    ],
    [
      [0, 0],
      [1, 1]
    ],
    [
      [0, 0],
      [-1, 1]
    ]
  ];
  var WKTableDX_L = [
    [
      [0, 0],
      [1, -1]
    ],
    [
      [0, 0],
      [1, 1]
    ],
    [
      [0, 0],
      [-1, 1]
    ],
    [
      [0, 0],
      [-1, -1]
    ]
  ];
  var WKTableDX_2 = [
    [
      [0, 0],
      [0, -2]
    ],
    [
      [0, 0],
      [-2, 0]
    ],
    [
      [0, 0],
      [0, 2]
    ],
    [
      [0, 0],
      [2, 0]
    ]
  ];
  var WKTableDX = [WKTableDX_R, WKTableDX_L, WKTableDX_2];
  var OffsetSRS = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  ];
  var OffsetARS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [-1, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ]
  ];
  var OffsetDRS = [
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  ];
  var OffsetQRS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ]
  ];
  var OffsetAtari = [
    [
      [0, -1],
      [-1, 0],
      [0, -2],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [-2, 0],
      [-2, 0],
      [-2, 0],
      [-2, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ]
  ];
  var OffsetNBlox = [
    [
      [0, 0],
      [-1, 0],
      [0, -1],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ]
  ];
  var OffsetNintendo = [
    [
      [0, 1],
      [0, 0],
      [0, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetMS = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [0, 1],
      [1, 0],
      [1, 1]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [0, 1],
      [1, 0],
      [1, 1]
    ]
  ];
  var OffsetE60 = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetJJSRS = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 0],
      [1, 0],
      [1, 0],
      [1, 0]
    ]
  ];
  var Offset5000 = [
    [
      [0, 1],
      [-1, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ]
  ];
  var OffsetPlus = [
    [
      [0, 0],
      [0, 0],
      [0, -1],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [1, 1],
      [0, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [1, 0]
    ],
    [
      [1, 1],
      [1, 0],
      [1, 0],
      [2, 0]
    ]
  ];
  var OffsetDX = [
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ],
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0]
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1]
    ]
  ];
  var InitInfoSRS = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  var InitInfoARS = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoDRS = [
    [0, 1, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoQRS = [
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 3],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 0]
  ];
  var InitInfoAtari = [
    [1, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoNBlox = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var InitInfoNintendo = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoMS = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoE60 = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoJJSRS = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0]
  ];
  var InitInfo5000 = [
    [0, 0, 3],
    [0, 0, 1],
    [1, 0, 3],
    [0, 0, 0],
    [0, 0, 0],
    [0, -1, 2],
    [0, 0, 0]
  ];
  var InitInfoPlus = [
    [0, 0, 0],
    [1, 0, 2],
    [1, 0, 2],
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 2],
    [1, 1, 0]
  ];
  var InitInfoDX = [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 2],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 2],
    [0, 1, 0]
  ];
  var ColorSRS = [1, 2, 3, 4, 5, 6, 7];
  var ColorARS = [7, 2, 3, 4, 6, 1, 5];
  var ColorQRS = [7, 1, 3, 4, 5, 6, 2];
  var ColorTengen = [7, 3, 6, 2, 5, 4, 1];
  var ColorAtari = [7, 4, 6, 2, 1, 5, 3];
  var ColorNBlox = [3, 6, 2, 7, 1, 4, 5];
  var ColorC2 = [5, 2, 6, 4, 1, 7, 9];
  var ColorNintendo = [9, 2, 7, 9, 2, 9, 7];
  var ColorMS = [7, 6, 4, 1, 2, 8, 5];
  var ColorE60 = [5, 5, 5, 5, 5, 5, 5];
  var ColorIBM = [7, 9, 6, 2, 5, 3, 1];
  var ColorJJSRS = [5, 1, 3, 4, 7, 6, 2];
  var Color5000 = [7, 6, 8, 4, 5, 1, 2];
  var ColorDX = [9, 7, 2, 4, 3, 5, 6];
  var RotSysData = [
    {
      initinfo: InitInfoSRS,
      offset: OffsetSRS,
      color: ColorSRS,
      id: RotSys.Super
    },
    {
      initinfo: InitInfoSRS,
      offset: OffsetSRS,
      color: ColorC2,
      id: RotSys.C2
    },
    {
      initinfo: InitInfoARS,
      offset: OffsetARS,
      color: ColorARS,
      id: RotSys.Arika
    },
    {
      initinfo: InitInfoDRS,
      offset: OffsetDRS,
      color: ColorARS,
      id: RotSys.DTET
    },
    {
      initinfo: InitInfoQRS,
      offset: OffsetQRS,
      color: ColorQRS,
      id: RotSys.QQ
    },
    {
      initinfo: InitInfoAtari,
      offset: OffsetAtari,
      color: ColorAtari,
      id: RotSys.Atari
    },
    {
      initinfo: InitInfoAtari,
      offset: OffsetAtari,
      color: ColorTengen,
      id: RotSys.Tengen
    },
    {
      initinfo: InitInfoNBlox,
      offset: OffsetNBlox,
      color: ColorNBlox,
      id: RotSys["N-Blox"]
    },
    {
      initinfo: InitInfoNintendo,
      offset: OffsetNintendo,
      color: ColorNintendo,
      id: RotSys.Nintendo
    },
    {
      initinfo: InitInfoMS,
      offset: OffsetMS,
      color: ColorMS,
      id: RotSys.MS
    },
    {
      initinfo: InitInfoE60,
      offset: OffsetE60,
      color: ColorE60,
      id: RotSys["E-60"]
    },
    {
      initinfo: InitInfoE60,
      offset: OffsetE60,
      color: ColorIBM,
      id: RotSys["IBM PC"]
    },
    {
      initinfo: InitInfoJJSRS,
      offset: OffsetJJSRS,
      color: ColorJJSRS,
      id: RotSys.JJ
    },
    {
      initinfo: InitInfo5000,
      offset: Offset5000,
      color: Color5000,
      id: RotSys["5k"]
    },
    {
      initinfo: InitInfoPlus,
      offset: OffsetPlus,
      color: ColorARS,
      id: RotSys.Plus
    },
    {
      initinfo: InitInfoDX,
      offset: OffsetDX,
      color: ColorDX,
      id: RotSys.DX
    }
  ];
  var PieceData = {
    I: {
      index: Mino.I,
      tetro: TetroI,
      rect: RectI,
      spin: SpinCheckI
    },
    J: {
      index: Mino.J,
      tetro: TetroJ,
      rect: RectJ,
      spin: SpinCheckJ
    },
    L: {
      index: Mino.L,
      tetro: TetroL,
      rect: RectL,
      spin: SpinCheckL
    },
    O: {
      index: Mino.O,
      tetro: TetroO,
      rect: RectO,
      spin: void 0
    },
    S: {
      index: Mino.S,
      tetro: TetroS,
      rect: RectS,
      spin: SpinCheckS
    },
    T: {
      index: Mino.T,
      tetro: TetroT,
      rect: RectT,
      spin: SpinCheckT
    },
    Z: {
      index: Mino.Z,
      tetro: TetroZ,
      rect: RectZ,
      spin: SpinCheckZ
    }
  };
  var pieces = [
    PieceData.I,
    PieceData.J,
    PieceData.L,
    PieceData.O,
    PieceData.S,
    PieceData.T,
    PieceData.Z
  ];
  var finesse = [
    [
      [1, 2, 1, 0, 1, 2, 1],
      [2, 2, 2, 2, 1, 1, 2, 2, 2, 2],
      [1, 2, 1, 0, 1, 2, 1],
      [2, 2, 2, 2, 1, 1, 2, 2, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1],
      [1, 2, 2, 1, 0, 1, 2, 2, 1]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2],
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2],
      [2, 3, 2, 1, 2, 3, 3, 2, 2]
    ],
    [
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2],
      [1, 2, 1, 0, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 3, 2, 2]
    ]
  ];
  var arrRowGen = {
    simple(arr, offset, range2, width) {
      const holex = ~~(rng.next() * range2) + offset;
      for (let x3 = 0; x3 < width; x3++) {
        arr[holex + x3] = 0;
      }
    },
    simplemessy(arr, ratio, width) {
      let hashole = false;
      for (let x3 = 0; x3 < width; x3++) {
        if (rng.next() >= ratio) {
          hashole = true;
          arr[x3] = 0;
        }
      }
      if (hashole === false) {
        arr[~~(rng.next() * 10)] = 0;
      }
    }
  };
  var arrStages = [
    {
      begin: 0,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 5,
      delay: 60 * 7,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 20,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 40,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 2, 3, 4);
      }
    },
    {
      begin: 50,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 70,
      delay: 60 * 5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 80,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 90,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 100,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 120,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 150,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 170,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 7, 4);
      }
    },
    {
      begin: 200,
      delay: 60 * 3.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 220,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 250,
      delay: 60 * 2.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 300,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 320,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 350,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 390,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 400,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 430,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 450,
      delay: 60 * 7,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.1, stack2.width);
      }
    },
    {
      begin: 470,
      delay: 60 * 7,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 500,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 550,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.8, stack2.width);
      }
    },
    {
      begin: 600,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 650,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.6, stack2.width);
      }
    },
    {
      begin: 700,
      delay: 60 * 3.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 750,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 780,
      delay: 60 * 2.5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.4, stack2.width);
      }
    },
    {
      begin: 800,
      delay: 60 * 2,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.9, stack2.width);
      }
    },
    {
      begin: 900,
      delay: 60 * 1.75,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 950,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1e3,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1020,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1050,
      delay: 60 * 4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 1, 1, 8);
      }
    },
    {
      begin: 1100,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 2, 1, 6);
      }
    },
    {
      begin: 1150,
      delay: 60 * 3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 3, 1, 4);
      }
    },
    {
      begin: 1200,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1210,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1210,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 4, 1, 2);
      }
    },
    {
      begin: 1250,
      delay: 60 * 2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 9, 1, 1);
      }
    },
    {
      begin: 1260,
      delay: 60 * 0.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 9, 1, 1);
      }
    },
    {
      begin: 1300,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0, stack2.width);
      }
    },
    {
      begin: 1350,
      delay: 60 * 3,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.1, stack2.width);
      }
    },
    {
      begin: 1400,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.15, stack2.width);
      }
    },
    {
      begin: 1450,
      delay: 60 * 4,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.2, stack2.width);
      }
    },
    {
      begin: 1480,
      delay: 60 * 5,
      gen: (arr, stack2) => {
        arrRowGen.simplemessy(arr, 0.2, stack2.width);
      }
    },
    {
      begin: 1500,
      delay: 60 * 1.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1550,
      delay: 60 * 1.4,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1600,
      delay: 60 * 1.3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1650,
      delay: 60 * 1.2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 9, 2);
      }
    },
    {
      begin: 1700,
      delay: 60 * 1.3,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1800,
      delay: 60 * 1.2,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1850,
      delay: 60 * 1.15,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1900,
      delay: 60 * 1.1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 1950,
      delay: 60 * 1.05,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2e3,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2050,
      delay: 60 * 0.95,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2100,
      delay: 60 * 0.9,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2150,
      delay: 60 * 0.85,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2180,
      delay: 60 * 0.8,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2190,
      delay: 60 * 1,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2200,
      delay: 60 * 0.8,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2300,
      delay: 60 * 0.75,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2400,
      delay: 60 * 0.7,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2450,
      delay: 60 * 0.6,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    },
    {
      begin: 2500,
      delay: 60 * 0.5,
      gen: (arr, _2) => {
        arrRowGen.simple(arr, 0, 10, 1);
      }
    }
  ];
  var sprintRanks = [
    {
      t: 600,
      u: "\u4FEE\u4ED9\u53BB\u5427",
      b: "Zen"
    },
    {
      t: 540,
      u: "\u6C42\u8FDB9\u5206\u949F",
      b: "9 min...?"
    },
    {
      t: 480,
      u: "\u6C42\u8FDB8\u5206\u949F",
      b: "8 min...?"
    },
    {
      t: 420,
      u: "\u6C42\u8FDB7\u5206\u949F",
      b: "7 min...?"
    },
    {
      t: 360,
      u: "\u6C42\u8FDB6\u5206\u949F",
      b: "6 min...?"
    },
    {
      t: 300,
      u: "\u6C42\u8FDB5\u5206\u949F",
      b: "5 min...?"
    },
    {
      t: 240,
      u: "\u7EC8\u4E8E\u2026\u2026",
      b: "Finally..."
    },
    {
      t: 210,
      u: "<small>\u4F60\u4E00\u5B9A\u662F\u5728\u9017\u6211</small>",
      b: "Too slow."
    },
    {
      t: 180,
      u: "\u6E23\u6E23",
      b: "Well..."
    },
    {
      t: 160,
      u: "<small>\u901F\u5EA6\u901F\u5EA6\u52A0\u5FEB</small>",
      b: "Go faster."
    },
    {
      t: 140,
      u: "<small>\u8FD8\u80FD\u518D\u7ED9\u529B\u70B9\u4E48</small>",
      b: "Any more?"
    },
    {
      t: 120,
      u: "2\u5206\u949F\uFF1F",
      b: "Beat 2 min."
    },
    {
      t: 110,
      u: "\u4E0D\u96BE\u561B",
      b: "So easy."
    },
    {
      t: 100,
      u: "\u65B0\u4E16\u754C",
      b: "New world."
    },
    {
      t: 90,
      u: "\u8D85\u8D8A\u79D2\u9488",
      b: "1 drop/sec!"
    },
    {
      t: 80,
      u: "\u606D\u559C\u5165\u95E8",
      b: "Not bad."
    },
    {
      t: 73,
      u: "\u6E10\u5165\u4F73\u5883",
      b: "Going deeper."
    },
    {
      t: 69,
      u: "\u5C31\u5DEE10\u79D2",
      b: "10 sec faster."
    },
    {
      t: 63,
      u: "\u8FD8\u6709\u51E0\u79D2",
      b: "Approaching."
    },
    {
      t: 60,
      u: "\u6700\u540E\u4E00\u70B9",
      b: "Almost there!"
    },
    {
      t: 56,
      u: "1\u5206\u949F\u5C31\u591F\u4E86",
      b: "1-min Sprinter!"
    },
    {
      t: 53,
      u: "\u5E76\u4E0D\u662F\u6C99\u5305",
      b: "<small>No longer rookie.</small>"
    },
    {
      t: 50,
      u: "50\u4E0D\u662F\u68A6",
      b: "Beat 50."
    },
    {
      t: 48,
      u: "\u6BCF\u79D22\u5757",
      b: "2 drops/sec!"
    },
    {
      t: 45,
      u: "\u5F88\u80FD\u6253\u561B",
      b: "u can tetris."
    },
    {
      t: 42,
      u: "\u6709\u70B9\u5389\u5BB3",
      b: "Interesting."
    },
    {
      t: 40,
      u: "\u4E8E\u662F\u5462\uFF1F",
      b: "So?"
    },
    {
      t: 38,
      u: "\u9AD8\u624B",
      b: "Good."
    },
    {
      t: 35,
      u: "\u505C\u4E0D\u4E0B\u6765",
      b: "Unstoppable."
    },
    {
      t: 33,
      u: "\u89E6\u624B",
      b: "Octopus"
    },
    {
      t: 31,
      u: "\u6BCF\u79D23\u5757",
      b: "3 drops/sec!"
    },
    {
      t: 30,
      u: "\u522B\u8FD9\u6837",
      b: "Noooo"
    },
    {
      t: 29,
      u: "\u4F60\u8D62\u4E86",
      b: "You win."
    },
    {
      t: 27,
      u: "\u8FD9\u4E0D\u9B54\u6CD5",
      b: "Magic."
    },
    {
      t: 25,
      u: "\u95EA\u7535",
      b: "Lightning!"
    },
    {
      t: 24,
      u: "\u6BCF\u79D24\u5757",
      b: "4 drops/sec!"
    },
    {
      t: 23,
      u: "\u795E\u517D",
      b: "Alien."
    },
    {
      t: 22,
      u: "\u795E\u517D\u4ED6\u5988",
      b: "Beats Alien."
    },
    {
      t: 21,
      u: "\u62EF\u6551\u5730\u7403",
      b: "<small>Save the world?</small>"
    },
    {
      t: 20,
      u: "\u4F60\u786E\u5B9A\uFF1F",
      b: "r u sure?"
    },
    {
      t: 19,
      u: "5\u5757\u6BCF\u79D2",
      b: "5pps"
    },
    {
      t: 18,
      u: "\u2026\u2026",
      b: "..."
    },
    {
      t: 16.66,
      u: "\u2026\u2026\u2026\u2026",
      b: "......"
    },
    {
      t: 14.28,
      u: "6\u5757\u6BCF\u79D2",
      b: "6pps"
    },
    {
      t: 12.5,
      u: "7\u5757\u6BCF\u79D2",
      b: "7pps"
    },
    {
      t: 11.11,
      u: "8\u5757\u6BCF\u79D2",
      b: "8pps"
    },
    {
      t: 10,
      u: "9\u5757\u6BCF\u79D2",
      b: "9pps"
    },
    {
      t: 9,
      u: "10\u5757\u6BCF\u79D2",
      b: "10pps"
    },
    {
      t: 0,
      u: "\u2190_\u2190",
      b: "\u2192_\u2192"
    },
    {
      t: -1 / 0,
      u: "\u2191_\u2191",
      b: "\u2193_\u2193"
    }
  ];
  var _Elements = class {
    static get msg() {
      return $2("msg");
    }
    static get statsIpieces() {
      return $2("ivalue");
    }
    static get stats() {
      return $2("stats");
    }
    static get statsTime() {
      return $2("time");
    }
    static get statsLines() {
      return $2("line");
    }
    static get statsPiece() {
      return $2("piece");
    }
    static get statsFinesse() {
      return $2("finesse");
    }
    static get statsScore() {
      return $2("score");
    }
    static get statsLevel() {
      return $2("level");
    }
    static get h3() {
      return $$("h3");
    }
    static get set() {
      return $2("settings");
    }
    static get leaderboard() {
      return $2("leaderboard");
    }
    static get hidescroll() {
      return $2("hidescroll");
    }
    static get holdCanvas() {
      return $2("hold");
    }
    static get bgStackCanvas() {
      return $2("bgStack");
    }
    static get stackCanvas() {
      return $2("stack");
    }
    static get activeCanvas() {
      return $2("active");
    }
    static get previewCanvas() {
      return $2("preview");
    }
    static get spriteCanvas() {
      return $2("sprite");
    }
    static get timeCanvas() {
      return $$("#time > canvas")[0];
    }
    static get holdCtx() {
      return _Elements.holdCanvas.getContext("2d");
    }
    static get bgStackCtx() {
      return _Elements.bgStackCanvas.getContext("2d");
    }
    static get stackCtx() {
      return _Elements.stackCanvas.getContext("2d");
    }
    static get activeCtx() {
      return _Elements.activeCanvas.getContext("2d");
    }
    static get previewCtx() {
      return _Elements.previewCanvas.getContext("2d");
    }
    static get spriteCtx() {
      return _Elements.spriteCanvas.getContext("2d");
    }
    static get timeCtx() {
      return _Elements.timeCanvas.getContext("2d");
    }
  };
  var Elements = _Elements;
  __decorateClass([
    lazy
  ], Elements, "msg", 1);
  __decorateClass([
    lazy
  ], Elements, "statsIpieces", 1);
  __decorateClass([
    lazy
  ], Elements, "stats", 1);
  __decorateClass([
    lazy
  ], Elements, "statsTime", 1);
  __decorateClass([
    lazy
  ], Elements, "statsLines", 1);
  __decorateClass([
    lazy
  ], Elements, "statsPiece", 1);
  __decorateClass([
    lazy
  ], Elements, "statsFinesse", 1);
  __decorateClass([
    lazy
  ], Elements, "statsScore", 1);
  __decorateClass([
    lazy
  ], Elements, "statsLevel", 1);
  __decorateClass([
    lazy
  ], Elements, "h3", 1);
  __decorateClass([
    lazy
  ], Elements, "set", 1);
  __decorateClass([
    lazy
  ], Elements, "leaderboard", 1);
  __decorateClass([
    lazy
  ], Elements, "hidescroll", 1);
  __decorateClass([
    lazy
  ], Elements, "holdCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "bgStackCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "stackCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "activeCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "previewCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "spriteCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "timeCanvas", 1);
  __decorateClass([
    lazy
  ], Elements, "holdCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "bgStackCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "stackCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "activeCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "previewCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "spriteCtx", 1);
  __decorateClass([
    lazy
  ], Elements, "timeCtx", 1);
  var gravityUnit = 1 / 64;

  // jscc_temp/src/utils/enum.ts
  init_preact_shim();
  function getStringKeys(obj) {
    return Object.keys(obj).filter((key2) => !Number.isNaN(parseInt(obj[key2])));
  }

  // jscc_temp/src/settings.ts
  var Setting = class {
    constructor(name, defaultValue, validator) {
      this.customGet = (v3) => v3;
      this.name = name;
      this.value = defaultValue;
      this.defaultValue = defaultValue;
      this.validator = validator;
    }
    set(value) {
      if (this.validator(value)) {
        this.value = value;
        return true;
      }
      console.warn(`Invalid value for setting ${this.name}: ${value}`);
      return false;
    }
    get() {
      return this.customGet(this.value);
    }
    displayName() {
      return this.value.toString();
    }
    reset() {
      this.value = this.defaultValue;
    }
    setCustomGet(get) {
      this.customGet = get;
      return this;
    }
    createElement(parent) {
    }
  };
  var EnumSetting = class extends Setting {
    constructor(name, defaultValue, values) {
      super(name, defaultValue, (value) => {
        return values[value] !== void 0;
      });
      this.values = values;
    }
    displayName() {
      return this.values[this.value];
    }
  };
  var RangeSetting = class extends Setting {
    constructor(name, defaultValue, min, max, step = 1) {
      super(name, defaultValue, (value) => {
        if (value >= min && value <= max) {
          this.value = Math.ceil(value / step) * step;
          return true;
        }
        return false;
      });
      this.min = min;
      this.max = max;
      this.step = step;
    }
  };
  var BooleanSetting = class extends Setting {
    constructor(name, defaultValue) {
      super(name, defaultValue, (value) => typeof value === "boolean");
    }
    displayName() {
      return this.value ? "On" : "Off";
    }
  };
  var NamedBooleanSetting = class extends BooleanSetting {
    constructor(name, defaultValue, display) {
      super(name, defaultValue);
      this.display = display;
    }
    displayName() {
      return this.display[this.value ? 0 : 1];
    }
  };
  var gravities = [
    "Auto",
    "0G",
    "1/64G",
    "1/32G",
    "1/16G",
    "1/8G",
    "1/4G",
    "1/2G",
    "1G",
    "20G"
  ];
  var defaultSettings = {
    DAS: new RangeSetting("DAS", 10, 0, 30),
    ARR: new RangeSetting("ARR", 2, 0, 30),
    Gravity: new EnumSetting("Gravity", 0, gravities),
    SoftDrop: new EnumSetting("Soft Drop", 0, gravities),
    LockDelay: new RangeSetting("Lock Delay", 30, 0, 100),
    RotSys: new EnumSetting("Rotation System", 0, getStringKeys(RotSys)).setCustomGet((value) => RotSysData[value]),
    Next: new RangeSetting("Next", 6, 0, 6),
    Size: new EnumSetting("Size", 0, getStringKeys(Size)),
    Sound: new BooleanSetting("Sound", true),
    Volume: new RangeSetting("Volume", 50, 0, 100),
    MusicVol: new RangeSetting("Music Volume", 50, 0, 100),
    Soundbank: new EnumSetting("Soundbank", 12, getStringKeys(Soundbank)),
    NextSound: new BooleanSetting("Next Sound", true),
    NextType: new EnumSetting("Next Type", 3, getStringKeys(NextType)),
    Voice: new BooleanSetting("Voice", false),
    Voicebank: new EnumSetting("Voicebank", 2, getStringKeys(Voicebank)),
    Block: new EnumSetting("Block", 13, getStringKeys(Block)),
    Ghost: new EnumSetting("Ghost", 1, getStringKeys(Ghost)),
    Grid: new BooleanSetting("Grid", true),
    Outline: new EnumSetting("Outline", 1, getStringKeys(Outline)),
    DASCut: new BooleanSetting("DAS Cut", false),
    NextSide: new NamedBooleanSetting("Next Side", false, ["Right", "Left"]),
    Messages: new NamedBooleanSetting("Messages", true, ["Right", "Left"]),
    MatrixSway: new BooleanSetting("Matrix Sway", true),
    IRSMode: new EnumSetting("IRS Mode", 0, getStringKeys(IRSMode)),
    IHSMode: new EnumSetting("IHS Mode", 0, getStringKeys(IHSMode)),
    InitialVis: new BooleanSetting("Initial Visibility", true),
    Monochrome: new BooleanSetting("Monochrome", false),
    ResetPB: new BooleanSetting("Reset PB", false)
  };
  var SettingManager = class {
    #settings = {};
    #currentName = "default";
    setSettings(name, settings2) {
      this.#settings[name] = settings2;
    }
    set(name, value) {
      const val = this.#settings[this.#currentName][name].set(value);
      if (this.#currentName === "default") {
        const settingsCopy = {};
        for (const key2 in this.#settings["default"]) {
          settingsCopy[key2] = this.#settings["default"][key2].value;
        }
        localStorage.setItem("settings", JSON.stringify(settingsCopy));
      }
      return val;
    }
    get(name) {
      return this.#settings[this.#currentName][name].get();
    }
    getRaw(name) {
      return this.#settings[this.#currentName][name];
    }
    switchSettings(name) {
      this.#currentName = name;
    }
  };
  for (const name in defaultSettings) {
    Object.defineProperty(SettingManager.prototype, name, {
      get() {
        return this.get(name);
      },
      set(value) {
        this.set(name, value);
      }
    });
  }
  var settings = new SettingManager();
  settings.setSettings("default", defaultSettings);

  // jscc_temp/src/leaderboard/replays.ts
  var replaydata = $2("replaydata");
  function tryreplaydata() {
    const strreplay = replaydata.value;
    Game.init("replay", strreplay);
  }
  function showreplaydata(strreplay) {
    replaydata.value = strreplay;
    replaydata.select();
    menu(6, 1);
  }
  function curreplaydata() {
    const objKeys = Mutable.replay.keys;
    Mutable.replay.keys = keysEncode(Mutable.replay.keys);
    const strreplay = JSON.stringify(Mutable.replay);
    Mutable.replay.keys = objKeys;
    return strreplay;
  }
  function run(params) {
    Mutable.watchingReplay = true;
    if (params !== void 0) {
      try {
        if (typeof params !== "string")
          throw "wtf";
        if (params === "" || params.slice(0, 1) !== "{")
          throw "please paste replay data, correctly...";
        Mutable.replay = JSON.parse(params);
        if (typeof Mutable.replay !== "object")
          throw "json parse fail";
        if (Mutable.replay.type === void 0 || Mutable.replay.keys === void 0 || Mutable.replay.settings === void 0 || Mutable.replay.seed === void 0) {
          throw "something's missing...";
        }
        Mutable.replay.keys = keysDecode(Mutable.replay.keys);
        if (Mutable.replay.keys === null)
          throw "keys decode fail";
      } catch (e3) {
        alert("invalid replay data... \u56DE\u653E\u6570\u636E\u6709\u8BEF...\n" + e3.toString());
        return;
      }
    }
    Game.type = Mutable.replay.type;
    Game.params = Mutable.replay.params;
    settings.setSettings("replay", Mutable.replay.settings);
    rng.seed = Mutable.replay.seed;
  }

  // jscc_temp/src/display/sound/sound.ts
  init_preact_shim();
  var import_howler = __toModule(require_howler());
  var piecetypes = "tgm,npm,tgm1,tetrjs".split(",");
  var gametypes = "ppt,tgm,npm,yotipo,toj,nes,tf,99,com,party,ultimate,ace,tetrjs".split(",");
  var voxtypes = ["alexey", "friends", "toj"];
  var waveData = [
    { path: "alarm", type: "fixed" },
    { path: "bravo", type: "game" },
    { path: "levelup", type: "game" },
    { path: "step", type: "game" },
    { path: "endingstart", type: "ui" },
    { path: "erase1", type: "game" },
    { path: "erase2", type: "game" },
    { path: "erase3", type: "game" },
    { path: "erase4", type: "game" },
    { path: "gameover", type: "ui" },
    { path: "garbage", type: "game" },
    { path: "lock", type: "game" },
    { path: "tspin0", type: "game" },
    { path: "tspin1", type: "game" },
    { path: "tspin2", type: "game" },
    { path: "tspin3", type: "game" },
    { path: "piece0", type: "piece" },
    { path: "piece1", type: "piece" },
    { path: "piece2", type: "piece" },
    { path: "piece3", type: "piece" },
    { path: "piece4", type: "piece" },
    { path: "piece5", type: "piece" },
    { path: "piece6", type: "piece" },
    { path: "harddrop", type: "game" },
    { path: "move", type: "game" },
    { path: "rotate", type: "game" },
    { path: "initialrotate", type: "game" },
    { path: "hold", type: "game" },
    { path: "initialhold", type: "game" },
    { path: "ready", type: "ui" },
    { path: "go", type: "ui" },
    { path: "linefall", type: "game" },
    { path: "b2b_erase4", type: "vox" },
    { path: "b2b_tspin1", type: "vox" },
    { path: "b2b_tspin2", type: "vox" },
    { path: "b2b_tspin3", type: "vox" },
    { path: "erase1", type: "vox" },
    { path: "erase2", type: "vox" },
    { path: "erase3", type: "vox" },
    { path: "erase4", type: "vox" },
    { path: "lose", type: "vox" },
    { path: "ren1", type: "vox" },
    { path: "ren2", type: "vox" },
    { path: "ren3", type: "vox" },
    { path: "tspin0", type: "vox" },
    { path: "tspin1", type: "vox" },
    { path: "tspin2", type: "vox" },
    { path: "tspin3", type: "vox" },
    { path: "win", type: "vox" },
    { path: "ren/ren1", type: "game" },
    { path: "ren/ren2", type: "game" },
    { path: "ren/ren3", type: "game" },
    { path: "ren/ren4", type: "game" },
    { path: "ren/ren5", type: "game" },
    { path: "ren/ren6", type: "game" },
    { path: "ren/ren7", type: "game" },
    { path: "ren/ren8", type: "game" },
    { path: "ren/ren9", type: "game" },
    { path: "ren/ren10", type: "game" },
    { path: "ren/ren11", type: "game" },
    { path: "ren/ren12", type: "game" },
    { path: "ren/ren13", type: "game" },
    { path: "ren/ren14", type: "game" },
    { path: "ren/ren15", type: "game" },
    { path: "ren/ren16", type: "game" },
    { path: "ren/ren17", type: "game" },
    { path: "ren/ren18", type: "game" },
    { path: "ren/ren19", type: "game" },
    { path: "ren/ren20", type: "game" },
    { path: "b2b_erase4", type: "game" },
    { path: "b2b_tspin1", type: "game" },
    { path: "b2b_tspin2", type: "game" },
    { path: "b2b_tspin3", type: "game" }
  ];
  var Eles = class {
    static get soundLoadingBar() {
      return $2("sound-loading-bar");
    }
    static get soundLabel() {
      return $2("sound-name");
    }
    static get soundsLoading() {
      return $2("sounds-loading");
    }
  };
  __decorateClass([
    lazy
  ], Eles, "soundLoadingBar", 1);
  __decorateClass([
    lazy
  ], Eles, "soundLabel", 1);
  __decorateClass([
    lazy
  ], Eles, "soundsLoading", 1);
  var sidebgmraised = false;
  var soundLoaded = "";
  var amountToLoad = 0;
  var soundsLoaded = 0;
  function addToLoad(name) {
    soundsLoaded++;
    Eles.soundLoadingBar.value = soundsLoaded;
    $setText(Eles.soundLabel, name);
    if (Eles.soundLoadingBar.value == Eles.soundLoadingBar.max) {
      Eles.soundsLoading.classList.add("gone");
    }
  }
  var Sound2 = class {
    constructor() {
      this.sounds = {};
      this.music = {};
      this.voices = {};
    }
    addSound(iname, path, loop) {
      this.sounds[iname] = new import_howler.Howl({
        src: [path],
        volume: settings.Volume / 100,
        loop,
        onload() {
          addToLoad(this._src);
        },
        onloaderror() {
          console.error(`loading ${this._src} failed!`);
        }
      });
    }
    addVoice(iname, path) {
      this.voices[iname] = new import_howler.Howl({
        src: [path],
        volume: settings.Volume / 100,
        onload() {
          addToLoad(this._src);
        }
      });
    }
    addMusic(iname, path) {
      this.music[iname + "start"] = new import_howler.Howl({
        src: [path("start")],
        volume: settings.MusicVol / 100,
        onend: () => {
          this.currentMusic = this.music[this.currentMusicName + "loop"].play();
        }
      });
      this.music[iname + "loop"] = new import_howler.Howl({
        src: [path("loop")],
        volume: settings.MusicVol / 100,
        loop: true
      });
    }
    addSideMusic(iname, path) {
      this.music[iname + "start"] = new import_howler.Howl({
        src: [path("start")],
        volume: 0,
        onend: () => {
          this.currentMusic = this.music[this.sideMusicName + "loop"].play();
        }
      });
      this.music[iname + "loop"] = new import_howler.Howl({
        src: [path("loop")],
        volume: 0,
        loop: true
      });
    }
    init(type) {
      const soundbank = settings.Soundbank;
      const nextType = settings.NextType;
      const voicebank = settings.Voicebank;
      const nextSound = settings.NextSound;
      const voice = settings.Voice;
      const sound2 = settings.Sound;
      if (`${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound2}` === soundLoaded) {
        return;
      }
      if (sound2) {
        Eles.soundsLoading.classList.remove("gone");
      }
      soundsLoaded = 0;
      Eles.soundLoadingBar.value = 0;
      amountToLoad = waveData.length;
      import_howler.Howler.unload();
      if (!sound2)
        return;
      const navLanguage = navigator.language;
      const languageBase = navLanguage.substring(0, 2);
      for (const { path: iname, type: type2 } of waveData) {
        switch (type2) {
          case "game":
            this.addSound(iname, `assets/sfx/game/${gametypes[soundbank]}/${iname}.wav`);
            break;
          case "vox":
            if (!voice)
              break;
            this.addVoice(iname, `assets/vox/${voxtypes[voicebank]}/${iname}.wav`);
            break;
          case "ui":
            this.addSound(iname, `assets/sfx/ui/${gametypes[soundbank]}/${iname}_${soundbank == 12 ? languageBase : ""}.wav`);
            break;
          case "piece":
            if (nextSound) {
              let language = "";
              if (nextType == 3) {
                if (navLanguage == "ja" && [
                  "piece1",
                  "piece2",
                  "piece4",
                  "piece6"
                ].indexOf(iname) >= 0) {
                  language = "_jp";
                } else if ((navLanguage == "en-US" || navLanguage == "en") && iname == "piece6") {
                  language = "_us";
                } else if (languageBase == "zh" && iname == "piece6") {
                  language = "_us";
                } else if (languageBase == "es") {
                  language = "_es";
                  if (navLanguage == "es-ES" && iname == "piece6") {
                    language += "_spain";
                  }
                } else if (languageBase == "fr") {
                  language = "_fr";
                }
              }
              this.addSound(iname, `assets/sfx/piece/${piecetypes[nextType]}/${iname}${language}.wav`);
            }
            break;
          case "bgm":
            this.addMusic(iname, (v3) => `assets/bgm/${iname}${v3}.ogg`);
            break;
          case "bgmside":
            this.addSideMusic(iname, (v3) => `assets/bgm/${iname}${v3}.ogg`);
            break;
          case "fixed":
            this.addSound(iname, "assets/sfx/fixed/" + iname + ".wav", iname === "alarm");
            break;
        }
      }
      soundLoaded = `${soundbank} ${nextType} ${voicebank} ${nextSound} ${voice} ${sound2}`;
      Eles.soundLoadingBar.max = Object.keys(this.sounds).length + Object.keys(this.voices).length;
    }
    updateVolume() {
      for (const currentname in this.music) {
        this.music[currentname].volume(settings.MusicVol / 100);
      }
      for (const currentname in this.sounds) {
        this.sounds[currentname].volume(settings.Volume / 100);
      }
      for (const currentname in this.voices) {
        this.voices[currentname].volume(settings.Volume / 100);
      }
    }
    playSFX(name, arg) {
      let noStop;
      if (name == "ren/ren") {
        noStop = true;
      }
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        if (noStop !== true) {
          this.sounds[name].stop();
        }
        this.sounds[name].play();
      }
    }
    playvox(name, arg) {
      if (settings.Sound && settings.Voice) {
        if (arg !== void 0) {
          name += arg;
        }
        this.voices[name].stop();
        this.voices[name].play();
      }
    }
    stopSFX(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.sounds[name].stop();
      }
    }
    loadbgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.music[name + "start"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "start.ogg"],
          volume: settings.MusicVol / 100,
          onend: () => {
            this.currentMusic = this.music[this.currentMusicName + "loop"].play();
          }
        });
        this.music[name + "loop"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "loop.ogg"],
          volume: settings.MusicVol / 100,
          loop: true
        });
      }
    }
    loadsidebgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.music[name + "start"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "start.ogg"],
          volume: 0,
          onend: () => {
            this.sideMusic = this.music[this.sideMusicName + "loop"].play();
          }
        });
        this.music[name + "loop"] = new import_howler.Howl({
          src: ["assets/bgm/" + name + "loop.ogg"],
          volume: 0,
          loop: true
        });
      }
    }
    playbgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.currentMusicName = name;
        this.currentMusic = this.music[name + "start"].play();
      }
    }
    playsidebgm(name, arg) {
      if (settings.Sound) {
        if (arg !== void 0) {
          name += arg;
        }
        this.sideMusicName = name;
        this.sideMusic = this.music[name + "start"].play();
      }
    }
    killbgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].stop();
        }
      }
    }
    raisesidebgm() {
      sound.syncbgm();
      if (settings.Sound) {
        if (sidebgmraised == false) {
          this.music[this.sideMusicName + "start"].fade(0, settings.MusicVol / 100, 500);
          this.music[this.sideMusicName + "loop"].fade(0, settings.MusicVol / 100, 500);
          sidebgmraised = true;
        }
      }
    }
    lowersidebgm() {
      if (!settings.Sound && !sidebgmraised) {
        return;
      }
      const vol = settings.MusicVol;
      const musName = this.sideMusicName;
      if (musName) {
        this.music[musName + "start"].fade(vol / 100, 0, 500);
        this.music[musName + "loop"].fade(vol / 100, 0, 500);
        sidebgmraised = false;
      }
    }
    cutsidebgm() {
      if (!settings.Sound && sidebgmraised != true)
        return;
      const vol = settings.MusicVol;
      const musName = this.sideMusicName;
      this.music[musName + "start"].fade(vol / 100, 0, 1);
      this.music[musName + "loop"].fade(vol / 100, 0, 1);
      sidebgmraised = false;
    }
    mutebgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].mute(true);
        }
      }
    }
    unmutebgm() {
      if (settings.Sound) {
        for (const currentname in this.music) {
          this.music[currentname].mute(false);
        }
      }
    }
    seekbgm(arg) {
      if (settings.Sound) {
        for (const currentname in this.music) {
          console.log(this.music[currentname].seek());
          this.music[currentname].seek(arg);
        }
      }
    }
    seeksidebgm(arg) {
      if (settings.Sound) {
        this.music[this.sideMusicName + "start"].seek(arg);
        this.music[this.sideMusicName + "loop"].seek(arg);
      }
    }
    syncbgm(arg) {
      if (settings.Sound) {
        this.music[this.sideMusicName + "start"].seek(this.music[this.currentMusicName + "start"].seek());
        this.music[this.sideMusicName + "loop"].seek(this.music[this.currentMusicName + "loop"].seek());
      }
    }
  };
  var sound = new Sound2();

  // jscc_temp/src/display/tetrion/preview.ts
  init_preact_shim();

  // jscc_temp/src/logic/hold.ts
  init_preact_shim();

  // jscc_temp/src/logic/view.ts
  init_preact_shim();
  function bg(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#1c1c1c";
    for (let x3 = -1; x3 < ctx.canvas.width + 1; x3 += Mutable.cellSize) {
      ctx.fillRect(x3, 0, 2, ctx.canvas.height);
    }
    for (let y2 = -1; y2 < ctx.canvas.height + 1; y2 += Mutable.cellSize) {
      ctx.fillRect(0, y2, ctx.canvas.width, 2);
    }
  }
  function drawCell(x3, y2, color, ctx, darkness) {
    const spriteCanvas = Elements.spriteCanvas;
    x3 = Math.floor(x3 * Mutable.cellSize);
    y2 = Math.floor(y2 * Mutable.cellSize);
    ctx.drawImage(spriteCanvas, color * Mutable.cellSize, 0, Mutable.cellSize, Mutable.cellSize, x3, y2, Mutable.cellSize, Mutable.cellSize);
    if (darkness) {
      ctx.fillStyle = `rgba(0,0,0,${darkness})`;
      ctx.fillRect(x3, y2, Mutable.cellSize, Mutable.cellSize);
    }
  }
  var nes = [
    ["#c1c1c1", "#ffffff00"],
    ["#3ebeff", "#ffffff"],
    ["#0058f8", "#ffffff00"],
    ["#f83800", "#ffffff00"],
    ["#ffa347", "#ffffff"],
    ["#80d010", "#ffffff00"],
    ["#db00cd", "#ffffff"],
    ["#ab0023", "#ffffff00"],
    ["#898989", "#ffffff00"],
    ["#0058f8", "#ffffff"]
  ];
  var tetrjs = [
    ["#EEEEEE", "#E0E0E0", "#BDBDBD"],
    ["#26C6DA", "#00BCD4", "#00ACC1"],
    ["#42A5F5", "#2196F3", "#1E88E5"],
    ["#FFA726", "#FF9800", "#FB8C00"],
    ["#FFEE58", "#FFEB3B", "#FDD835"],
    ["#66BB6A", "#4CAF50", "#43A047"],
    ["#AB47BC", "#9C27B0", "#8E24AA"],
    ["#EF5350", "#F44336", "#E53935"],
    ["#616161", "#424242", "#212121"],
    ["#EEEEEE", "#E0E0E0", "#BDBDBD"]
  ];
  var shaded = [
    ["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"],
    ["#25bb9b", "#4cd7b6", "#009f81", "#008568"],
    ["#3397d9", "#57b1f6", "#007dbd", "#0064a2"],
    ["#e67e23", "#ff993f", "#c86400", "#a94b00"],
    ["#efc30f", "#ffdf3a", "#d1a800", "#b38e00"],
    ["#9ccd38", "#b9e955", "#81b214", "#659700"],
    ["#9c5ab8", "#b873d4", "#81409d", "#672782"],
    ["#e64b3c", "#ff6853", "#c62c25", "#a70010"],
    ["#898989", "#a3a3a3", "#6f6f6f", "#575757"],
    ["#c1c1c1", "#dddddd", "#a6a6a6", "#8b8b8b"]
  ];
  var glossy = [
    ["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"],
    ["#7bffdf", "#9fffff", "#ccffff", "#008165", "#00442e"],
    ["#6cdcff", "#93feff", "#c2ffff", "#00629f", "#002c60"],
    ["#ffc166", "#ffe386", "#ffffb0", "#aa4800", "#650500"],
    ["#ffff6a", "#ffff8c", "#ffffb8", "#b68a00", "#714f00"],
    ["#efff81", "#ffffa2", "#ffffcd", "#6b9200", "#2c5600"],
    ["#dc9dfe", "#ffbeff", "#ffe9ff", "#5d287e", "#210043"],
    ["#ff9277", "#ffb497", "#ffe0bf", "#a7000a", "#600000"],
    ["#cbcbcb", "#ededed", "#ffffff", "#545454", "#1f1f1f"],
    ["#ffffff", "#ffffff", "#ffffff", "#888888", "#4d4d4d"]
  ];
  var tgm = [
    ["#ababab", "#5a5a5a", "#9b9b9b", "#626262"],
    ["#00e8f0", "#0070a0", "#00d0e0", "#0080a8"],
    ["#00a8f8", "#0000b0", "#0090e8", "#0020c0"],
    ["#f8a800", "#b84000", "#e89800", "#c85800"],
    ["#e8e000", "#886800", "#d8c800", "#907800"],
    ["#78f800", "#007800", "#58e000", "#008800"],
    ["#f828f8", "#780078", "#e020e0", "#880088"],
    ["#f08000", "#a00000", "#e86008", "#b00000"],
    ["#7b7b7b", "#303030", "#6b6b6b", "#363636"],
    ["#ababab", "#5a5a5a", "#9b9b9b", "#626262"]
  ];
  var friends = [
    ["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"],
    ["#5fcefe", "#09aef7", "#21beff", "#0f9bd7", "#098cc4", "#02586c"],
    ["#4786e2", "#2159de", "#3177df", "#2141c6", "#1b46a9", "#012476"],
    ["#feae5f", "#ff7900", "#fc942e", "#e35b02", "#db5802", "#993300"],
    ["#fed678", "#ffb618", "#ffc729", "#e39f02", "#ec8e02", "#996600"],
    ["#9fe732", "#63c710", "#84d718", "#59b101", "#559d0d", "#025c01"],
    ["#db60cf", "#c529a6", "#d33ab9", "#af298a", "#9a2183", "#660066"],
    ["#fe9292", "#f72039", "#fe4e71", "#d70f37", "#c70e33", "#9e0c29"],
    ["#494949", "#353535", "#3c3c3c", "#303030", "#2a2a2a", "#171717"],
    ["#aeaeae", "#808080", "#909090", "#737373", "#666666", "#373737"]
  ];
  var t99 = [
    ["#909090", "#d8d6d6", "#5d5d5d", "#9ea09f", "#797979"],
    ["#00e5ff", "#82ffff", "#00aaba", "#1ce7f7", "#00c2d3"],
    ["#1a00fa", "#4287ff", "#000092", "#202aee", "#0000c4"],
    ["#ff6d08", "#ffa76b", "#d14200", "#fb7325", "#f74800"],
    ["#ffdd0d", "#fff45c", "#d59b00", "#f5c81b", "#f2b200"],
    ["#69ff0c", "#a8ff6f", "#13c500", "#62fc1e", "#2fe900"],
    ["#b400fd", "#ea78fe", "#70009a", "#bf20f0", "#7f00c8"],
    ["#ff093b", "#ff7094", "#ba0625", "#fb0b3f", "#ef0020"],
    ["#5e5e5e", "#a6a4a4", "#3c3c3c", "#303030", "#2a2a2a"],
    ["#909090", "#d8d6d6", "#2b2b2b", "#6d6f6f", "#474747"]
  ];
  var tetcom = [
    ["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"],
    ["#32808c", "#006274", "#00dff7", "#012c33"],
    ["#28568d", "#003374", "#008bf3", "#021c3c"],
    ["#926a2f", "#744300", "#f9af00", "#331e00"],
    ["#8d8128", "#746600", "#f6e300", "#332e01"],
    ["#218939", "#007419", "#00f84b", "#00330b"],
    ["#7b2f92", "#580074", "#d300f9", "#270033"],
    ["#8c3232", "#740000", "#f70000", "#330000"],
    ["#3e3e3e", "#2d2d2d", "#606060", "#000000"],
    ["#bdbdbd", "#7f7f7f", "#e2e2e2", "#333333"]
  ];
  var ppt = [
    [
      "#687070",
      "#e8e8e8",
      "#c8ccc8",
      "#b8b8b8",
      "#d5d5d5",
      "#f0f0f0",
      "#c0c4c0"
    ],
    [
      "#086c70",
      "#d0fcf8",
      "#008cd8",
      "#05709d",
      "#00a4d8",
      "#00b4d0",
      "#0094d0"
    ],
    [
      "#001060",
      "#80d4f8",
      "#004cb8",
      "#0038a0",
      "#005cb8",
      "#0098d0",
      "#0044a8"
    ],
    [
      "#703000",
      "#f8dcb0",
      "#f05800",
      "#c85110",
      "#f87400",
      "#f8a400",
      "#f85c00"
    ],
    [
      "#b86000",
      "#f8f4d8",
      "#f8b818",
      "#f8a810",
      "#f8c800",
      "#f8e458",
      "#f8b000"
    ],
    [
      "#104c28",
      "#c0fc78",
      "#78c428",
      "#509828",
      "#68bc28",
      "#78d828",
      "#50a820"
    ],
    [
      "#680088",
      "#f8a8f8",
      "#982c98",
      "#802c98",
      "#902c90",
      "#a82c98",
      "#802480"
    ],
    [
      "#600800",
      "#e89c68",
      "#a01418",
      "#850b00",
      "#d82430",
      "#e86868",
      "#c51923"
    ],
    [
      "#131616",
      "#6d6d6d",
      "#474747",
      "#3f433f",
      "#4c4c4c",
      "#868686",
      "#393c39"
    ],
    [
      "#687070",
      "#e8e8e8",
      "#c8ccc8",
      "#b8b8b8",
      "#d5d5d5",
      "#f0f0f0",
      "#c0c4c0"
    ]
  ];
  function makeSprite() {
    const spriteCanvas = Elements.spriteCanvas;
    const spriteCtx = Elements.spriteCtx;
    spriteCanvas.width = Mutable.cellSize * 10;
    spriteCanvas.height = Mutable.cellSize;
    for (let i3 = 0; i3 < 10; i3++) {
      const iCurrent = i3;
      const x3 = i3 * Mutable.cellSize;
      if (settings.Monochrome) {
        i3 = 0;
      }
      let k3;
      let grad;
      if (settings.Block === 0) {
        spriteCtx.fillStyle = shaded[i3][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = shaded[i3][3];
        spriteCtx.fillRect(x3, Mutable.cellSize / 2, Mutable.cellSize, Mutable.cellSize / 2);
        spriteCtx.fillStyle = shaded[i3][0];
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 2, Mutable.cellSize / 2);
        spriteCtx.lineTo(x3, Mutable.cellSize);
        spriteCtx.fill();
        spriteCtx.fillStyle = shaded[i3][2];
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 2, Mutable.cellSize / 2);
        spriteCtx.lineTo(x3 + Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fill();
      } else if (settings.Block === 1) {
        spriteCtx.fillStyle = tetrjs[i3][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
      } else if (settings.Block === 2) {
        k3 = Math.max(~~(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize, Mutable.cellSize);
        grad.addColorStop(0.5, glossy[i3][3]);
        grad.addColorStop(1, glossy[i3][4]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize, Mutable.cellSize);
        grad.addColorStop(0, glossy[i3][2]);
        grad.addColorStop(0.5, glossy[i3][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize - k3, Mutable.cellSize - k3);
        grad = spriteCtx.createLinearGradient(x3 + k3, k3, x3 + Mutable.cellSize - k3, Mutable.cellSize - k3);
        grad.addColorStop(0, shaded[i3][0]);
        grad.addColorStop(0.5, glossy[i3][0]);
        grad.addColorStop(0.5, shaded[i3][0]);
        grad.addColorStop(1, glossy[i3][0]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + k3, k3, Mutable.cellSize - k3 * 2, Mutable.cellSize - k3 * 2);
      } else if (settings.Block === 3) {
        k3 = Math.max(~~(Mutable.cellSize * 0.125), 1);
        spriteCtx.fillStyle = tgm[i3][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = tgm[i3][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, ~~(Mutable.cellSize / 2));
        grad = spriteCtx.createLinearGradient(x3, k3, x3, Mutable.cellSize - k3);
        grad.addColorStop(0, tgm[i3][2]);
        grad.addColorStop(1, tgm[i3][3]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + k3, k3, Mutable.cellSize - k3 * 2, Mutable.cellSize - k3 * 2);
        grad = spriteCtx.createLinearGradient(x3, k3, x3, Mutable.cellSize);
        grad.addColorStop(0, tgm[i3][0]);
        grad.addColorStop(1, tgm[i3][3]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, k3, k3, Mutable.cellSize - k3);
        grad = spriteCtx.createLinearGradient(x3, 0, x3, Mutable.cellSize - k3);
        grad.addColorStop(0, tgm[i3][2]);
        grad.addColorStop(1, tgm[i3][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + Mutable.cellSize - k3, 0, k3, Mutable.cellSize - k3);
      } else if (settings.Block === 4) {
        k3 = Math.max(~~(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize, Mutable.cellSize);
        grad.addColorStop(0.5, glossy[i3][3]);
        grad.addColorStop(1, glossy[i3][4]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(x3, k3, x3, Mutable.cellSize);
        grad.addColorStop(0, shaded[i3][0]);
        grad.addColorStop(0.1, glossy[i3][2]);
        grad.addColorStop(0.4, shaded[i3][0]);
        grad.addColorStop(0.5, shaded[i3][2]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + k3, k3, Mutable.cellSize - k3 * 2, Mutable.cellSize - k3 * 2);
      } else if (settings.Block === 5) {
        k3 = Math.max(~~(Mutable.cellSize * 0.1), 1);
        grad = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize, Mutable.cellSize);
        grad.addColorStop(0.5, tgm[i3][3]);
        grad.addColorStop(1, tgm[i3][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize, Mutable.cellSize);
        grad.addColorStop(0, glossy[i3][2]);
        grad.addColorStop(0.5, glossy[i3][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3, 0, Mutable.cellSize - k3, Mutable.cellSize - k3);
        grad = spriteCtx.createLinearGradient(x3 + k3, k3, x3 + Mutable.cellSize - k3, Mutable.cellSize - k3);
        grad.addColorStop(0, tgm[i3][2]);
        grad.addColorStop(0.3, tgm[i3][2]);
        grad.addColorStop(0.4, tgm[i3][0]);
        grad.addColorStop(0.7, tgm[i3][0]);
        grad.addColorStop(0.87, tgm[i3][1]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + k3, k3, Mutable.cellSize - k3 * 2, Mutable.cellSize - k3 * 2);
        spriteCtx.fillStyle = tgm[i3][1];
        spriteCtx.fillRect(x3 + 1.5 * k3, 1.5 * k3, Mutable.cellSize / 8, Mutable.cellSize / 8);
      } else if (settings.Block === 6) {
        const k4 = Math.max(~~(Mutable.cellSize * 0.1), 1);
        spriteCtx.fillStyle = glossy[i3][4];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        grad = spriteCtx.createLinearGradient(x3 + Mutable.cellSize - k4, k4, x3 + k4, Mutable.cellSize - k4);
        grad.addColorStop(0, glossy[i3][0]);
        grad.addColorStop(0.5, glossy[i3][0]);
        grad.addColorStop(0.5, shaded[i3][0]);
        grad.addColorStop(1, shaded[i3][0]);
        spriteCtx.fillStyle = grad;
        spriteCtx.fillRect(x3 + k4, k4, Mutable.cellSize - k4 * 2, Mutable.cellSize - k4 * 2);
        spriteCtx.fillStyle = shaded[i3][1];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 5.5, 0 + Mutable.cellSize / 5.5, Mutable.cellSize / 1.64, Mutable.cellSize / 1.64);
      } else if (settings.Block === 7) {
        k3 = Math.max(~~(Mutable.cellSize * 0.1), 1);
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = shaded[i3][1];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 7.5, 0 + Mutable.cellSize / 7.5, Mutable.cellSize / 1.4, Mutable.cellSize / 1.4);
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3 + Mutable.cellSize / 3.5, 0 + Mutable.cellSize / 3.5, Mutable.cellSize / 2.44, Mutable.cellSize / 2.44);
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3 + Mutable.cellSize / 2.7, 0 + Mutable.cellSize / 8, Mutable.cellSize / 4.14, Mutable.cellSize / 1.2);
      } else if (settings.Block === 8) {
        spriteCtx.fillStyle = "#000";
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = nes[i3][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize / 1.125, Mutable.cellSize / 1.125);
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(x3, 0, Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(x3 + Mutable.cellSize / 8, 0 + Mutable.cellSize / 8, Mutable.cellSize / 8, Mutable.cellSize / 4);
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(x3 + Mutable.cellSize / 8, 0 + Mutable.cellSize / 8, Mutable.cellSize / 4, Mutable.cellSize / 8);
        spriteCtx.fillStyle = nes[i3][1];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 8, 0 + Mutable.cellSize / 8, Mutable.cellSize / 1.6, Mutable.cellSize / 1.6);
      } else if (settings.Block === 9) {
        spriteCtx.fillStyle = friends[i3][5];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = friends[i3][1];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 18, 0 + Mutable.cellSize / 18, Mutable.cellSize / 1.125, Mutable.cellSize / 1.125);
        spriteCtx.fillStyle = "#fff";
        spriteCtx.fillRect(x3 + Mutable.cellSize / 18, 0 + Mutable.cellSize / 18, Mutable.cellSize / 9, Mutable.cellSize / 9);
        spriteCtx.fillStyle = friends[i3][0];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 6, 0 + Mutable.cellSize / 18, Mutable.cellSize / 1.5, Mutable.cellSize / 18);
        spriteCtx.fillStyle = friends[i3][0];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 18, 0 + Mutable.cellSize / 6, Mutable.cellSize / 18, Mutable.cellSize / 1.5);
        spriteCtx.fillStyle = friends[i3][4];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 1.125, 0 + Mutable.cellSize / 6, Mutable.cellSize / 18, Mutable.cellSize / 1.5);
        spriteCtx.fillStyle = friends[i3][4];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 6, 0 + Mutable.cellSize / 1.125, Mutable.cellSize / 1.5, Mutable.cellSize / 18);
        spriteCtx.fillStyle = friends[i3][2];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 4.5, 0 + Mutable.cellSize / 4.5, Mutable.cellSize / 1.8, Mutable.cellSize / 1.8);
        spriteCtx.fillStyle = friends[i3][3];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 3.6, 0 + Mutable.cellSize / 3.6, Mutable.cellSize / 2.25, Mutable.cellSize / 2.25);
      } else if (settings.Block === 10) {
        spriteCtx.fillStyle = t99[i3][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        const grad2 = spriteCtx.createLinearGradient(x3, 0, x3 + Mutable.cellSize / 7, Mutable.cellSize / 2);
        grad2.addColorStop(0, "#FFFFFFEE");
        grad2.addColorStop(1, "#FFFFFF66");
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 2);
        spriteCtx.quadraticCurveTo(x3 + Mutable.cellSize / 1.5, Mutable.cellSize / 4, x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / 4);
        spriteCtx.lineTo(x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / 8);
        spriteCtx.fillStyle = grad2;
        spriteCtx.fill();
        spriteCtx.fillStyle = t99[i3][1];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize / 8);
        spriteCtx.fillStyle = t99[i3][2];
        spriteCtx.fillRect(x3, Mutable.cellSize / (8 / 7), Mutable.cellSize, Mutable.cellSize / 8);
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3, 0);
        spriteCtx.lineTo(x3, Mutable.cellSize);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / (8 / 7));
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.fillStyle = t99[i3][3];
        spriteCtx.fill();
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize, 0);
        spriteCtx.lineTo(x3 + Mutable.cellSize, Mutable.cellSize);
        spriteCtx.lineTo(x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / (8 / 7));
        spriteCtx.lineTo(x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / 8);
        spriteCtx.fillStyle = t99[i3][4];
        spriteCtx.fill();
      } else if (settings.Block === 11) {
        spriteCtx.fillStyle = tetcom[i3][0];
        roundRect(spriteCtx, x3, 0, Mutable.cellSize, Mutable.cellSize, Mutable.cellSize / 12, true, false);
        spriteCtx.fillStyle = tetcom[i3][1];
        roundRect(spriteCtx, x3 + Mutable.cellSize / 18, 0 + Mutable.cellSize / 18, Mutable.cellSize / 1.125, Mutable.cellSize / 1.125, Mutable.cellSize / 12, true, false);
        const grd = spriteCtx.createRadialGradient(x3 + Mutable.cellSize / 2, 0 + Mutable.cellSize, Mutable.cellSize / 32, x3 + Mutable.cellSize / 2, 0 + Mutable.cellSize / 1.5, Mutable.cellSize);
        grd.addColorStop(0, tetcom[i3][2]);
        grd.addColorStop(1, tetcom[i3][3]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(x3 + Mutable.cellSize / (16 / 2.5), 0 + Mutable.cellSize / (16 / 2.5), Mutable.cellSize / (16 / 11), Mutable.cellSize / (16 / 11));
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / (16 / 2.5), 0 + Mutable.cellSize / (16 / 2.5));
        spriteCtx.bezierCurveTo(x3 + Mutable.cellSize / (16 / 2.5), Mutable.cellSize / 2, x3 + Mutable.cellSize / (16 / 13.5), Mutable.cellSize / 2, x3 + Mutable.cellSize / (16 / 13.5), Mutable.cellSize / (16 / 2.5));
        grad = spriteCtx.createLinearGradient(x3, 0, x3, Mutable.cellSize / 2);
        grad.addColorStop(0, "#FFFFFF44");
        grad.addColorStop(1, "#FFFFFF88");
        spriteCtx.fillStyle = grad;
        spriteCtx.fill();
        grad = spriteCtx.createLinearGradient(x3 + Mutable.cellSize / 2, 0, x3 + Mutable.cellSize / (16 / 5), Mutable.cellSize / 2);
        grad.addColorStop(0.65, "#FFFFFF00");
        grad.addColorStop(0.8, "#FFFFFF");
        spriteCtx.fillStyle = grad;
        spriteCtx.fill();
      } else if (settings.Block === 12) {
        spriteCtx.fillStyle = ppt[i3][0];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.fillStyle = ppt[i3][4];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 16, Mutable.cellSize / 16, Mutable.cellSize / (16 / 14), Mutable.cellSize / (16 / 14));
        let grd = spriteCtx.createRadialGradient(x3 + Mutable.cellSize / 2, 0 + Mutable.cellSize, Mutable.cellSize / 64, x3 + Mutable.cellSize / 2, 0 + Mutable.cellSize, Mutable.cellSize / 2);
        grd.addColorStop(0, ppt[i3][5]);
        grd.addColorStop(1, ppt[i3][6]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(x3 + Mutable.cellSize / 16, Mutable.cellSize / 2, Mutable.cellSize / (16 / 14), Mutable.cellSize / (16 / 7));
        grd = spriteCtx.createLinearGradient(x3, 0, x3, Mutable.cellSize / 2);
        grd.addColorStop(0.2, ppt[i3][6]);
        grd.addColorStop(1, ppt[i3][4]);
        spriteCtx.fillStyle = grd;
        spriteCtx.fillRect(x3 + Mutable.cellSize / 16, Mutable.cellSize / 16, Mutable.cellSize / (16 / 14), Mutable.cellSize / (16 / 7));
        spriteCtx.fillStyle = ppt[i3][1];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 32, Mutable.cellSize / 32, Mutable.cellSize / (32 / 30), Mutable.cellSize / (32 / 3));
        spriteCtx.fillStyle = ppt[i3][3];
        spriteCtx.fillRect(x3 + Mutable.cellSize / 32, Mutable.cellSize / (32 / 28), Mutable.cellSize / (32 / 30), Mutable.cellSize / (32 / 3));
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 34, Mutable.cellSize / 32);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 34, Mutable.cellSize / (32 / 31));
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / (8 / 7));
        spriteCtx.lineTo(x3 + Mutable.cellSize / 8, Mutable.cellSize / 8);
        spriteCtx.fillStyle = ppt[i3][2];
        spriteCtx.fill();
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / (34 / 33), Mutable.cellSize / 32);
        spriteCtx.lineTo(x3 + Mutable.cellSize / (34 / 33), Mutable.cellSize / (32 / 31));
        spriteCtx.lineTo(x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / (8 / 7));
        spriteCtx.lineTo(x3 + Mutable.cellSize / (8 / 7), Mutable.cellSize / 8);
        spriteCtx.fillStyle = ppt[i3][2];
        spriteCtx.fill();
      } else if (settings.Block === 13) {
        spriteCtx.fillStyle = tetrjs[i3][2];
        spriteCtx.fillRect(x3, 0, Mutable.cellSize, Mutable.cellSize);
        spriteCtx.beginPath();
        spriteCtx.moveTo(x3 + Mutable.cellSize / 16, Mutable.cellSize / 16);
        spriteCtx.lineTo(x3 + Mutable.cellSize / 16, Mutable.cellSize / (16 / 10));
        spriteCtx.quadraticCurveTo(x3 + Mutable.cellSize / (16 / 8), Mutable.cellSize / (16 / 5), x3 + Mutable.cellSize / (16 / 15), Mutable.cellSize / (16 / 4));
        spriteCtx.lineTo(x3 + Mutable.cellSize / (16 / 15), Mutable.cellSize / (16 / 1));
        spriteCtx.fillStyle = tetrjs[i3][0];
        spriteCtx.fill();
      }
      i3 = iCurrent;
    }
  }
  function roundRect(ctx, x3, y2, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (const side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x3 + radius.tl, y2);
    ctx.lineTo(x3 + width - radius.tr, y2);
    ctx.quadraticCurveTo(x3 + width, y2, x3 + width, y2 + radius.tr);
    ctx.lineTo(x3 + width, y2 + height - radius.br);
    ctx.quadraticCurveTo(x3 + width, y2 + height, x3 + width - radius.br, y2 + height);
    ctx.lineTo(x3 + radius.bl, y2 + height);
    ctx.quadraticCurveTo(x3, y2 + height, x3, y2 + height - radius.bl);
    ctx.lineTo(x3, y2 + radius.tl);
    ctx.quadraticCurveTo(x3, y2, x3 + radius.tl, y2);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
  function draw(tetro, cx, cy, ctx, color, darkness) {
    for (let x3 = 0, len = tetro.length; x3 < len; x3++) {
      for (let y2 = 0, wid = tetro[x3].length; y2 < wid; y2++) {
        if (tetro[x3][y2]) {
          drawCell(x3 + cx, y2 + cy, color !== void 0 ? color : tetro[x3][y2], ctx, darkness);
        }
      }
    }
  }
  var key = {
    8: "Backspace",
    9: "Tab",
    13: "Enter",
    16: "Shift",
    17: "Ctrl",
    18: "Alt",
    19: "Pause",
    20: "Caps Lock",
    27: "Esc",
    32: "Space",
    33: "PgUp",
    34: "PgDn",
    35: "End",
    36: "Home",
    37: "\u2190",
    38: "\u2191",
    39: "\u2192",
    40: "\u2193",
    45: "Insert",
    46: "Delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: ";",
    61: "=",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    96: "0kpad",
    97: "1kpad",
    98: "2kpad",
    99: "3kpad",
    100: "4kpad",
    101: "5kpad",
    102: "6kpad",
    103: "7kpad",
    104: "8kpad",
    105: "9kpad",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'",
    undefined: "---",
    0: "---"
  };
  function keyUpDown(e3) {
    if ([32, 37, 38, 39, 40].indexOf(e3.keyCode) !== -1)
      e3.preventDefault();
    if (e3.type === "keydown" && e3.keyCode === binds.pause) {
      if (Game.paused) {
        Game.unpause();
      } else {
        Game.pause();
      }
    }
    if (e3.type === "keydown" && e3.keyCode === binds.retry) {
      Game.init(Game.type, Game.params);
    }
    if (!Mutable.watchingReplay) {
      if (e3.type === "keydown") {
        if (e3.keyCode === binds.moveLeft) {
          Mutable.keysDown |= flags.moveLeft;
        } else if (e3.keyCode === binds.moveRight) {
          Mutable.keysDown |= flags.moveRight;
        } else if (e3.keyCode === binds.moveDown) {
          Mutable.keysDown |= flags.moveDown;
        } else if (e3.keyCode === binds.hardDrop) {
          Mutable.keysDown |= flags.hardDrop;
        } else if (e3.keyCode === binds.rotRight) {
          Mutable.keysDown |= flags.rotRight;
        } else if (e3.keyCode === binds.rotLeft) {
          Mutable.keysDown |= flags.rotLeft;
        } else if (e3.keyCode === binds.rot180) {
          Mutable.keysDown |= flags.rot180;
        } else if (e3.keyCode === binds.moveLeft3) {
          Mutable.keysDown |= flags.moveLeft3;
        } else if (e3.keyCode === binds.moveRight3) {
          Mutable.keysDown |= flags.moveRight3;
        } else if (e3.keyCode === binds.holdPiece) {
          Mutable.keysDown |= flags.holdPiece;
        }
      } else if (e3.type === "keyup") {
        if (e3.keyCode === binds.moveLeft && Mutable.keysDown & flags.moveLeft) {
          Mutable.keysDown ^= flags.moveLeft;
        } else if (e3.keyCode === binds.moveRight && Mutable.keysDown & flags.moveRight) {
          Mutable.keysDown ^= flags.moveRight;
        } else if (e3.keyCode === binds.moveDown && Mutable.keysDown & flags.moveDown) {
          Mutable.keysDown ^= flags.moveDown;
        } else if (e3.keyCode === binds.hardDrop && Mutable.keysDown & flags.hardDrop) {
          Mutable.keysDown ^= flags.hardDrop;
        } else if (e3.keyCode === binds.rotRight && Mutable.keysDown & flags.rotRight) {
          Mutable.keysDown ^= flags.rotRight;
        } else if (e3.keyCode === binds.rotLeft && Mutable.keysDown & flags.rotLeft) {
          Mutable.keysDown ^= flags.rotLeft;
        } else if (e3.keyCode === binds.rot180 && Mutable.keysDown & flags.rot180) {
          Mutable.keysDown ^= flags.rot180;
        } else if (e3.keyCode === binds.moveLeft3 && Mutable.keysDown & flags.moveLeft3) {
          Mutable.keysDown ^= flags.moveLeft3;
        } else if (e3.keyCode === binds.moveRight3 && Mutable.keysDown & flags.moveRight3) {
          Mutable.keysDown ^= flags.moveRight3;
        } else if (e3.keyCode === binds.holdPiece && Mutable.keysDown & flags.holdPiece) {
          Mutable.keysDown ^= flags.holdPiece;
        }
      }
    }
  }

  // jscc_temp/src/logic/hold.ts
  var Hold = class {
    constructor() {
      this.soundCancel = 0;
    }
    draw() {
      if (this.soundCancel == 0 && Game.paused == false) {
        sound.playSFX("hold");
      }
      this.soundCancel = 0;
      const holdEle = $2("hold");
      holdEle.classList.remove("glow-flash-animation");
      void holdEle.offsetWidth;
      holdEle.classList.add("glow-flash-animation");
      clear(Elements.holdCtx);
      let p2;
      if (this.piece.ihs == true) {
        p2 = preview.grabBag[0];
      } else {
        $2("ihs-indicator").classList.add("gone");
        p2 = this.piece;
      }
      const rot = settings.RotSys;
      const initInfo = rot.initinfo[p2];
      if (pieces[p2] != void 0) {
        const rect = pieces[p2].rect;
        draw(pieces[p2].tetro[initInfo[2]], -rect[initInfo[2]][0] + (4 - rect[initInfo[2]][2] + rect[initInfo[2]][0]) / 2, -rect[initInfo[2]][1] + (3 - rect[initInfo[2]][3] + rect[initInfo[2]][1]) / 2, Elements.holdCtx, rot.color[p2]);
      }
    }
  };
  var hold = new Hold();

  // jscc_temp/src/utils/blackjack.ts
  init_preact_shim();
  function wrapGenerator(gen) {
    let iter = gen();
    return {
      next: () => {
        return iter.next().value;
      },
      reset: () => {
        iter = gen();
      },
      [Symbol.iterator]: () => {
        return iter;
      }
    };
  }
  function shuffleArray(array) {
    for (let i3 = array.length - 1; i3 > 0; i3--) {
      const j3 = Math.floor(rng.next() * (i3 + 1));
      [array[i3], array[j3]] = [array[j3], array[i3]];
    }
    return array;
  }
  var bagOfRegex = /^(\d+)?\+?(\d+)? ?bag of (.*)$/;
  var sequenceOfRegex = /^(\d+) ?(random)? ?sequence of (.*)$/;
  var withRegex = /^(.*) with (\d+) history(?: (\d+) rolls)?(?: starting with (.*))?$/;
  var listItemRegex = /^(\d*)?\*?(.*)$/;
  var firstRegex = /^(.*) but first (.*)$/;
  function listNormalize(list) {
    return list.split(",").flatMap((x3) => {
      const str = x3.trim();
      if (str.length === 0)
        return [];
      const match = listItemRegex.exec(str);
      if (!match)
        return [];
      const [, count, item] = match;
      if (!count)
        return item;
      else
        return Array(parseInt(count, 10)).fill(item);
    });
  }
  var whitespaceRegex = /\s+/g;
  function chooseRandom(list) {
    return list[Math.floor(rng.next() * list.length)];
  }
  function createRandomizer(str) {
    str = str.replace(whitespaceRegex, " ");
    let first;
    let res = null;
    res = firstRegex.exec(str);
    if (res) {
      const [, list2, firstList] = res;
      first = listNormalize(firstList);
      str = list2;
    }
    res = bagOfRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[3]);
      const count = res[1] ? parseInt(res[1], 10) : list2.length;
      const bonus = res[2] ? parseInt(res[2], 10) : 0;
      const len = count + bonus;
      return function* () {
        let bag = shuffleArray(list2.slice());
        let bonusBag2 = [];
        if (first) {
          const piece2 = chooseRandom(first);
          yield piece2;
          bag = bag.filter((x3) => x3 !== piece2);
        }
        while (true) {
          for (let i3 = 0; i3 < len; i3++) {
            if (!bag.length) {
              if (bonus) {
                if (!bonusBag2.length)
                  bonusBag2 = shuffleArray(list2.slice());
                yield bonusBag2.pop();
              } else {
                yield chooseRandom(list2);
              }
            } else {
              yield bag.pop();
            }
          }
          bag = shuffleArray(list2.slice());
        }
      };
    }
    res = sequenceOfRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[3]);
      const len = res[1] ? parseInt(res[1]) : void 0;
      const random = res[2] === "random";
      let newList = first ? [chooseRandom(first)] : [];
      if (len) {
        while (newList.length < len) {
          if (random) {
            newList.push(chooseRandom(list2));
          } else {
            newList.push(...list2);
          }
        }
        newList = newList.slice(0, len);
      } else {
        newList = list2;
      }
      return function* () {
        while (true) {
          yield* newList;
        }
      };
    }
    res = withRegex.exec(str);
    if (res) {
      const list2 = listNormalize(res[1]);
      const historyLen = parseInt(res[2]);
      const rolls = res[3] ? parseInt(res[3]) : void 0;
      const history = res[4] ? listNormalize(res[4]) : [];
      return function* () {
        if (first) {
          const piece2 = chooseRandom(first);
          yield piece2;
          if (history.length === historyLen)
            history.shift();
          history.push(piece2);
        }
        while (true) {
          const arr = shuffleArray(list2.slice());
          for (let i3 = 0; i3 < (rolls ?? list2.length); i3++) {
            const piece2 = chooseRandom(arr);
            if (!history.includes(piece2) || rolls && i3 + 1 == rolls) {
              yield piece2;
              if (history.length === historyLen)
                history.shift();
              history.push(piece2);
              break;
            }
          }
        }
      };
    }
    const list = listNormalize(str);
    return function* () {
      if (first)
        yield chooseRandom(first);
      while (true) {
        yield list[Math.floor(rng.next() * list.length)];
      }
    };
  }
  var rand = (str) => wrapGenerator(createRandomizer(str));
  var tgm1 = rand(`I,J,L,O,S,T,Z
		with 4 history 4 rolls starting with Z,Z,Z,Z
		but first I,J,L,T`);
  var tgm2 = rand(`I,J,L,O,S,T,Z
		with 4 history 6 rolls starting with Z,S,Z,S
		but first I,J,L,T`);
  var tgm3 = rand(`5*I,5*J,5*L,5*O,5*S,5*T,5*Z
		with 4 history 6 rolls starting with Z,S,Z,S
		${""}
		but first I,J,L,T`);
  var ace = rand("bag of I,J,L,O,S,T,Z but first I,J,L,T");
  var guideline = rand("bag of I,J,L,O,S,T,Z");
  var alexey = rand("I,J,L,O,S,T,Z");
  var nes2 = rand("I,J,L,O,S,T,Z with 1 history");
  var square = rand("bag of 9*I,9*J,9*L,9*O,9*S,9*T,9*Z");
  var sega = rand("1000 random sequence of I,J,L,O,S,T,Z");
  var bonusBag = rand("7+1 bag of I,J,L,O,S,T,Z");
  var bag8 = rand("8 bag of I,J,L,O,S,T,Z");
  var iOnly = rand("I");
  var noI = rand("bag of J,L,O,S,T,Z");

  // jscc_temp/src/display/tetrion/piece.ts
  init_preact_shim();

  // jscc_temp/src/display/tetrion/stack.ts
  init_preact_shim();

  // jscc_temp/src/display/tetrion/matrix.ts
  init_preact_shim();
  var matrix = {
    position: {
      horizontal: 0,
      vertical: 0
    },
    velocity: {
      right: 0,
      left: 0,
      down: 0
    }
  };
  var MatrixDir;
  (function(MatrixDir2) {
    MatrixDir2[MatrixDir2["RIGHT"] = 0] = "RIGHT";
    MatrixDir2[MatrixDir2["LEFT"] = 1] = "LEFT";
    MatrixDir2[MatrixDir2["DOWN"] = 2] = "DOWN";
  })(MatrixDir || (MatrixDir = {}));
  var MatrixPosition;
  (function(MatrixPosition2) {
    MatrixPosition2["HORIZONTAL"] = "horizontal";
    MatrixPosition2["VERTICAL"] = "vertical";
  })(MatrixPosition || (MatrixPosition = {}));
  function shiftMatrix(direction) {
    if (settings.MatrixSway) {
      if (direction === 0) {
        matrix.velocity.left = 0;
        matrix.velocity.right = 1;
      } else if (direction === 1) {
        matrix.velocity.right = 0;
        matrix.velocity.left = 1;
      } else if (direction === 2) {
        matrix.velocity.down = 1;
      }
    }
  }
  var Sign;
  (function(Sign2) {
    Sign2[Sign2["POSITIVE"] = 1] = "POSITIVE";
    Sign2[Sign2["NEGATIVE"] = -1] = "NEGATIVE";
  })(Sign || (Sign = {}));
  function matrixReturn(direction, type, sign) {
    const { velocity, position } = matrix;
    if (velocity[direction] > 1) {
      velocity[direction] = 1;
    }
    if (position[type] < 0.5 && position[type] > -0.5) {
      position[type] += sign * 0.2;
    }
    velocity[direction] -= 0.2;
    if (velocity[direction] < 0) {
      velocity[direction] = 0;
    }
  }
  function updateMatrixPosition() {
    if (matrix.velocity.right === 0 && matrix.velocity.left === 0) {
      matrix.position.horizontal /= 1.1;
    } else if (matrix.velocity.right !== 0) {
      matrixReturn(0, MatrixPosition.HORIZONTAL, 1);
    } else if (matrix.velocity.left !== 0) {
      matrixReturn(1, MatrixPosition.HORIZONTAL, -1);
    }
    if (matrix.velocity.down === 0) {
      matrix.position.vertical /= 1.1;
    } else {
      matrixReturn(2, MatrixPosition.VERTICAL, 1);
    }
    if (Math.abs(matrix.position.horizontal) < 0.01) {
      matrix.position.horizontal = 0;
    }
    if (matrix.position.vertical < 0.01) {
      matrix.position.vertical = 0;
    }
    $2("b").style.transform = `translate(${matrix.position.horizontal / 3}em, ${matrix.position.vertical / 3}em)`;
  }

  // jscc_temp/src/utils/lang.ts
  init_preact_shim();
  var strs = {
    ready: {
      en: "READY",
      es: "LISTOS",
      fr: "PR\xCAT?"
    },
    start: {
      en: "GO!",
      es: "\xA1YA!",
      fr: "C'EST PARTI!"
    },
    combo: {
      en: "<b>%d</b> COMBO!"
    },
    ren: {
      en: "<b>%d</b> REN!"
    },
    b2b: {
      en: "<b>BACK-TO</b>-BACK %s"
    },
    b2b_streak: {
      en: "%d <b>STREAK!</b>"
    },
    streak: {
      en: "<b>%d</b> STREAK"
    },
    spin: {
      en: "%s-<b>SPIN</b>"
    },
    mini: {
      en: " %s-<b>SPIN</b> MINI"
    },
    line: {
      en: "$line%d"
    },
    line1: {
      en: "SINGLE"
    },
    line2: {
      en: "DOUBLE"
    },
    line3: {
      en: "TRIPLE"
    },
    line4: {
      en: "QUAD"
    },
    line5: {
      en: "QUINT"
    },
    line6: {
      en: "SEXT"
    },
    line7: {
      en: "SEPT"
    },
    line8: {
      en: "OCT"
    },
    line9: {
      en: "NON"
    },
    line10: {
      en: "DECI"
    },
    line11: {
      en: "UNDECI"
    },
    line12: {
      en: "DODECI"
    },
    line13: {
      en: "TREEDECI"
    },
    line14: {
      en: "QUADREDECI"
    },
    line15: {
      en: "QUINTDECI"
    },
    line16: {
      en: "SEXDECI"
    },
    line17: {
      en: "SEPTDECI"
    },
    line18: {
      en: "OCTDECI"
    },
    line19: {
      en: "NONDECI"
    },
    line20: {
      en: "VIGESI"
    },
    line21: {
      en: "UNVIGESI"
    },
    lock_out: {
      en: "LOCK OUT!"
    },
    perfect_clear: {
      en: "<b>PERFECT</b> CLEAR!"
    },
    level: {
      en: "<b>LEVEL</b> %d"
    },
    level_m: {
      en: "<b>LEVEL</b> M%d"
    },
    "setting-Size-title": {
      en: "Game Size"
    },
    "setting-Size-desc": {
      en: "The size the game takes in the browser window"
    },
    "setting-Next-title": {
      en: "Next Queue Count"
    },
    "setting-Next-desc": {
      en: "Changes the length in pieces of the next queue"
    },
    "setting-NextSide-title": {
      en: "Next Queue Side"
    },
    "setting-NextSide-desc": {
      en: "Changes the side of the next queue"
    },
    "setting-Block-title": {
      en: "Block Skin"
    },
    "setting-Block-desc": {
      en: "The desired block skin"
    },
    "setting-Monochrome-title": {
      en: "Monochrome"
    },
    "setting-Monochrome-desc": {
      en: "Use only white for block skins"
    },
    "setting-Outline-title": {
      en: "Outline"
    },
    "setting-Outline-desc": {
      en: "Options for an outline around the pieces. 'Hidden' hides the stack."
    },
    "setting-Ghost-title": {
      en: "Ghost"
    },
    "setting-Ghost-desc": {
      en: "Options for the ghost piece. 'Hidden' hides the active piece."
    },
    "setting-Grid-title": {
      en: "Grid"
    },
    "setting-Grid-desc": {
      en: "Displays the background grid."
    },
    "setting-Messages-title": {
      en: "Action Text"
    },
    "setting-Messages-desc": {
      en: 'Displays flying text for things like "SINGLE", "DOUBLE", etc. Also shows the combo and back-to-back streak counter.'
    },
    "setting-MatrixSway-title": {
      en: "Matrix Sway"
    },
    "setting-MatrixSway-desc": {
      en: "When enabled, the playfield will react to the force of the pieces and move slightly."
    },
    "setting-InitialVis-title": {
      en: "Visual Initial Systems"
    },
    "setting-InitialVis-desc": {
      en: "When enabled, the initials systems will show during gameplay"
    },
    "setting-Sound-title": { en: "Enable Sound" },
    "setting-Sound-desc": {
      en: "Completely enable or disable the sound system"
    },
    "setting-Volume-title": { en: "Sound Volume" },
    "setting-Volume-desc": { en: "" },
    "setting-MusicVol-title": { en: "Music Volume" },
    "setting-MusicVol-desc": { en: "" },
    "setting-Soundbank-title": { en: "Soundbank" },
    "setting-Soundbank-desc": { en: "Modifies the audio bank of the game" },
    "setting-NextSound-title": { en: "Next Queue Audio Indicator" },
    "setting-NextSound-desc": {
      en: "Plays a sound for a specific piece when it arrives in the next queue"
    },
    "setting-NextType-title": { en: "Next Queue Soundbank" },
    "setting-NextType-desc": {
      en: "Modifies the audio bank of the next queue audio indicators"
    },
    "setting-Voice-title": { en: "Voice" },
    "setting-Voice-desc": { en: "Enable the announcer" },
    "setting-Voicebank-title": { en: "Voicebank" },
    "setting-Voicebank-desc": { en: "Modifies the soundbank of the announcer" },
    "setting-ARR-title": { en: "Autoshift Delay" },
    "setting-ARR-desc": {
      en: "How long it takes before the autoshift kicks in; default 10 frames"
    },
    "setting-DAS-title": { en: "Autoshift Rate" },
    "setting-DAS-desc": { en: "How fast the autoshift goes; default 2 frames" },
    "setting-Gravity-title": { en: "Gravity" },
    "setting-Gravity-desc": {
      en: "Override the speed at which pieces fall; default 'Auto'"
    },
    "setting-SoftDrop-title": { en: "Soft Drop Speed" },
    "setting-SoftDrop-desc": {
      en: "Speed at which the piece soft drops; default 1G"
    },
    "setting-LockDelay-title": { en: "Lock Delay" },
    "setting-LockDelay-desc": {
      en: "The amount of time a piece can stay landed before it locks to the stack; default 30 frames"
    },
    "setting-IRSMode-title": { en: "Initial Rotation" },
    "setting-IRSMode-desc": {
      en: "Allow the rotation of a piece before it appears"
    },
    "setting-IHSMode-title": { en: "Initial Hold" },
    "setting-IHSMode-desc": {
      en: "Allow the holding of a piece before it appears"
    },
    "setting-RotSys-title": { en: "Rotation System" },
    "setting-RotSys-desc": {
      en: "The desired rotation system; default 'Super'"
    },
    "setting-DigCheckered-title": { en: "Checkered" },
    "setting-DigCheckered-desc": {
      en: "Dig through a checkered stack instead of a diagonal one"
    },
    "setting-GradesGameRule-title": { en: "Game Rule" },
    "setting-GradesGameRule-desc": { en: "Determines the tuning of the game" },
    "setting-MarathonGoal-title": { en: "Goal" },
    "setting-MarathonGoal-desc": { en: "Lines to reach before winning" },
    "setting-MarathonLevelCap-title": { en: "Level Cap" },
    "setting-MarathonLevelCap-desc": {
      en: "When on, set the maximum level to 15. When off, level will continously rise with the lock delay shortening after 20G."
    },
    "setting-MarathonEntryDelay-title": { en: "Entry Delay" },
    "setting-MarathonEntryDelay-desc": {
      en: "Determines how long the game pauses between pieces"
    },
    "setting-MarathonNoGravity-title": { en: "0G Mode" },
    "setting-MarathonNoGravity-desc": {
      en: "Disable gravity for a more relaxed game"
    },
    "setting-MarathonInvisible-title": { en: "Invisible Bonus" },
    "setting-MarathonInvisible-desc": {
      en: "Make the stack become invisible at level 21"
    },
    "setting-SurvivalZenMode-title": { en: "Zen Mode" },
    "setting-SurvivalZenMode-desc": {
      en: "Garbage will appear by piece instead of by time"
    },
    "setting-SurvivalStartingLevel-title": { en: "Starting Level" },
    "setting-SurvivalStartingLevel-desc": {
      en: "Determines how far ahead you'll start in the challenge (not compatible with zen, currently)"
    },
    "setting-SprintLimit-title": { en: "Goal" },
    "setting-SprintLimit-desc": { en: "Total lines to clear" },
    "setting-SprintPieceSet-title": { en: "Piece Set" },
    "setting-SprintPieceSet-desc": {
      en: "The types of pieces used during the game"
    },
    "setting-SprintBackfire-title": { en: "Backfire" },
    "setting-SprintBackfire-desc": { en: "Have lines sent back to you" },
    "setting-RetroGameType-title": { en: "Game Type" },
    "setting-RetroGameType-desc": {
      en: "A-Type: Play Forever \nB-Type: Reach 25 Lines"
    },
    "setting-RetroStartingLevel-title": { en: "Starting Level" },
    "setting-RetroStartingLevel-desc": { en: "Choose a level to start" },
    "setting-RetroSkin-title": { en: "Retro Skin" },
    "setting-RetroSkin-desc": { en: "Enable the colour-changing retro skin" },
    "setting-RetroHardDrop-title": { en: "Hard Drop" },
    "setting-RetroHardDrop-desc": { en: "Allow the use of hard drop" },
    "setting-RetroFlashing-title": { en: "Flashing Effect" },
    "setting-RetroFlashing-desc": {
      en: "Show a screen flash upon clearing a Quad"
    },
    "setting-MasterLock-title": { en: "Lockdown Mode" },
    "setting-MasterLock-desc": {
      en: "Determines how the lockdown will function.\n\nForgiving: Lock delay will reset upon all manipulations\n\nLimited: Lock delay will reset for a limited amount of manipulations\n\nStrict: Lock delay will reset only when a piece has fallen"
    },
    "setting-ResetPB-title": { en: "Reset PB" },
    "setting-ResetPB-desc": { en: "Reset if over personal best" },
    "setting-DigZen-title": { en: "Zen Mode" },
    "setting-DigZen-desc": { en: "" },
    "menu-back": { en: "Back" },
    "menu-start": { en: "Start" },
    "menu-done": { en: "Done" },
    "menu-retry": { en: "Retry" },
    "menu-replay": { en: "Replay" },
    "menu-settings": { en: "Settings" },
    "menu-controls": { en: "Controls" },
    "game-sprint": { en: "Sprint" },
    "game-survival": { en: "Survival" },
    "game-marathon": { en: "Marathon" },
    "game-retro": { en: "Retro" },
    "game-master": { en: "Master" },
    "game-dig": { en: "Dig" },
    "game-grades": { en: "Grades (WIP)" }
  };
  var lang = navigator.language.substring(0, 2);
  var reg = /%(s|d|b|D)/g;
  function t2(str, ...replacements) {
    let final = strs[str][lang] ?? strs[str].en;
    if (str && replacements.length > 0) {
      let i3 = 0;
      final = final.replace(reg, () => replacements[i3++]);
      if (final[0] == "$") {
        const sliced = final.substring(1);
        final = strs[sliced][lang];
      }
    }
    return final;
  }

  // jscc_temp/src/display/tetrion/messages.ts
  init_preact_shim();
  function showTetrisMessage(contents) {
    if (settings.Messages) {
      const clearEle = $2("clear");
      clearEle.innerHTML = contents;
      clearEle.classList.remove("flyaway");
      void clearEle.offsetWidth;
      clearEle.classList.add("flyaway");
      const comboname = settings.Voice && settings.Voicebank == 2 ? "ren" : "combo";
      const renEle = $2("renmsg");
      const renDiv = $2("rendiv");
      if (Mutable.combo < 2) {
        renEle.innerHTML = "";
      } else if (Mutable.combo > 19) {
        renEle.innerHTML = t2(comboname, Mutable.combo - 1);
        renDiv.style["animation-duration"] = "0.041s";
      } else {
        renEle.innerHTML = t2(comboname, Mutable.combo - 1);
        renDiv.style["animation-duration"] = 0.5 - 0.485 * ((Mutable.combo - 2) / 18) + "s";
      }
      const b2bEle = $2("b2bmsg");
      const b2bDiv = $2("b2bdiv");
      if (Mutable.b2b <= 0) {
        b2bEle.innerHTML = "";
      } else {
        b2bEle.innerHTML = t2("streak", Mutable.b2b);
        b2bDiv.classList.remove("b2b-fade");
        void b2bDiv.offsetWidth;
        b2bDiv.classList.add("b2b-fade");
      }
    }
  }
  function showSpinMessage(piece2, mini) {
    showTetrisMessage(t2(mini ? "mini" : "spin", piece2));
  }
  function sendClearTetrisMessage(spin, mini) {
    const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
    let message = "";
    if (spin) {
      message = t2("spin", pieceName);
    } else if (mini) {
      message = t2("mini", pieceName);
    }
    if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
      message = t2("b2b", message) + "<br>";
    }
    message += t2("line", Mutable.lineClear);
    if (Mutable.b2b > 1 && (Mutable.lineClear > 3 || spin)) {
      message += "<br>" + t2("b2b_streak", Mutable.b2b) + "</small>";
    }
    showTetrisMessage(message);
  }
  function clearTetrisMessage() {
    $2("clear").innerHTML = "";
    $2("renmsg").innerHTML = "";
    $2("b2bmsg").innerHTML = "";
  }

  // jscc_temp/src/display/tetrion/stats.ts
  init_preact_shim();

  // jscc_temp/src/utils/string.ts
  init_preact_shim();

  // jscc_temp/src/utils/math.ts
  init_preact_shim();
  function mod(v3, n2) {
    return (v3 % n2 + n2) % n2;
  }
  function clamp(v3, min, max) {
    return Math.min(Math.max(v3, min), max);
  }
  function fixed(v3, digits) {
    return Math.round(v3 * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  // jscc_temp/src/utils/string.ts
  function padZero(v3) {
    return (v3 < 10 ? "0" : "") + v3.toString();
  }
  function timeString(ms) {
    const seconds = fixed(ms % 6e4 / 1e3, 2);
    const minutes = ~~(ms / 6e4);
    return `${padZero(minutes)}:${seconds < 10 ? "0" : ""}${seconds.toFixed(2)}`;
  }

  // jscc_temp/src/display/tetrion/stats.ts
  function statistics() {
    const {
      timeCanvas,
      timeCtx
    } = Elements;
    const time = timeString(Mutable.scoreTime || 0);
    const fsbl = 30;
    let skipL = Mutable.frameSkipped % (fsbl * 2);
    let skipR = Mutable.frameSkipped % (fsbl * 2);
    skipL = skipL - fsbl < 0 ? 0 : skipL - fsbl;
    skipR = skipR > fsbl ? fsbl : skipR;
    skipL = skipL / fsbl * timeCanvas.width;
    skipR = skipR / fsbl * timeCanvas.width;
    timeCtx.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
    timeCtx.fillText(time, timeCanvas.width / 2, timeCanvas.height / 2);
    timeCtx.fillRect(skipL, timeCanvas.height - 0.2, skipR, timeCanvas.height);
  }
  function statisticsStack() {
    const {
      statsPiece,
      statsLines,
      statsLevel,
      statsIpieces,
      statsScore,
      statsFinesse
    } = Elements;
    $setText(statsPiece, Mutable.piecesSet);
    $setText(statsFinesse, Mutable.statsFinesse);
    const scoreEle = $2("score");
    const scoreLabelEle = $2("score-label");
    const newScoreEle = $2("nesscore");
    const nesratetr = $2("nesratetr");
    if (Game.type === GameType.Retro) {
      scoreEle.classList.add("gone");
      scoreLabelEle.classList.remove("gone");
      newScoreEle.classList.remove("gone");
      nesratetr.classList.remove("gone");
    } else if (Game.type === GameType.Grades) {
      scoreEle.classList.add("gone");
      scoreLabelEle.classList.add("gone");
    } else {
      scoreEle.classList.remove("gone");
      scoreLabelEle.classList.remove("gone");
      newScoreEle.classList.add("gone");
      nesratetr.classList.add("gone");
    }
    const levelEle = $2("level");
    if (Game.type === GameType.Sprint || Game.type === GameType.ScoreAttack) {
      $setText(statsLines, Mutable.lineLimit - Mutable.lines);
      $setText(statsLevel, "");
    } else if (Game.type === GameType.Marathon || Game.type === 7) {
      $setText(statsLines, Mutable.lines);
      if (Game.params.noGravity != true) {
        levelEle.innerHTML = t2("level", Mutable.level + 1);
      }
    } else if (Game.type === GameType.Retro) {
      $setText(statsLines, Mutable.lines);
      levelEle.innerHTML = t2("level", Mutable.level + 1);
      if (Mutable.lineDrought < 13) {
        $setText(statsIpieces, Mutable.lineAmount);
      }
      if (Game.params.bType == true) {
        $setText(statsLines, Mutable.lineLimit - Mutable.lines);
      }
    } else if (Game.type === GameType.Master) {
      $setText(statsLines, Mutable.lines);
      levelEle.innerHTML = t2("level_m", Mutable.level + 1);
    } else if (Game.type === GameType.Survival) {
      if (Game.params.digOffset || Game.params.digOffset !== 0) {
        $setText(statsLevel, Game.params.digOffset + "+");
      } else {
        $setText(statsLevel, "");
      }
      $setText(statsLines, Mutable.lines);
    } else if (Game.type === GameType.Grades) {
      $setText(statsLines, Mutable.lines);
      $setText(statsLevel, `${Mutable.leveltgmvisible}/${(Math.floor(Mutable.leveltgm / 100 % 10) + 1) * 100}`);
    } else {
      $setText(statsLines, Mutable.lines);
      $setText(statsLevel, "");
    }
    const holdTextEle = $2("holdtext");
    if (Game.type !== 8) {
      holdTextEle.innerHTML = "<span class='white-border-span'>Hold</span>";
    } else {
      holdTextEle.innerHTML = "";
    }
    if (Game.type === GameType.Retro) {
      $2("lineshower").classList.remove("gone");
    } else {
      $2("lineshower").classList.add("gone");
    }
    if (Game.type !== GameType.Master) {
      $2("rainbow").classList.add("gone");
    } else {
    }
    if (Game.type === GameType.Retro && Game.params.retroSkin == true) {
      makeSprite();
      switch (parseInt(Mutable.level.toString().charAt(Mutable.level.toString().length - 1))) {
        case 0:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#3ebeff", "#ffffff00"];
          break;
        case 1:
          nes[9] = ["#00a800", "#ffffff"];
          nes[2] = ["#00a800", "#ffffff00"];
          nes[7] = ["#80d010", "#ffffff00"];
          break;
        case 2:
          nes[9] = ["#db00cd", "#ffffff"];
          nes[2] = ["#db00cd", "#ffffff00"];
          nes[7] = ["#f878f8", "#ffffff00"];
          break;
        case 3:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#5bdb57", "#ffffff00"];
          break;
        case 4:
          nes[9] = ["#e7005b", "#ffffff"];
          nes[2] = ["#e7005b", "#ffffff00"];
          nes[7] = ["#58f898", "#ffffff00"];
          break;
        case 5:
          nes[9] = ["#58f898", "#ffffff"];
          nes[2] = ["#58f898", "#ffffff00"];
          nes[7] = ["#6b88ff", "#ffffff00"];
          break;
        case 6:
          nes[9] = ["#f83800", "#ffffff"];
          nes[2] = ["#f83800", "#ffffff00"];
          nes[7] = ["#7f7f7f", "#ffffff00"];
          break;
        case 7:
          nes[9] = ["#6b47ff", "#ffffff"];
          nes[2] = ["#6b47ff", "#ffffff00"];
          nes[7] = ["#ab0023", "#ffffff00"];
          break;
        case 8:
          nes[9] = ["#0058f8", "#ffffff"];
          nes[2] = ["#0058f8", "#ffffff00"];
          nes[7] = ["#f83800", "#ffffff00"];
          break;
        case 9:
          nes[9] = ["#f83800", "#ffffff"];
          nes[2] = ["#f83800", "#ffffff00"];
          nes[7] = ["#ffa347", "#ffffff00"];
          break;
      }
    } else {
      nes[0] = ["#c1c1c1", "#ffffff00"];
      nes[1] = ["#3ebeff", "#ffffff"];
      nes[2] = ["#0058f8", "#ffffff00"];
      nes[3] = ["#f83800", "#ffffff00"];
      nes[4] = ["#ffa347", "#ffffff"];
      nes[5] = ["#80d010", "#ffffff00"];
      nes[6] = ["#db00cd", "#ffffff"];
      nes[7] = ["#ab0023", "#ffffff00"];
      nes[8] = ["#898989", "#ffffff00"];
      nes[9] = ["#0058f8", "#ffffff"];
    }
    $setText(statsScore, (~~Mutable.newScore).toLocaleString());
  }

  // jscc_temp/src/random_stuff.ts
  init_preact_shim();
  var scoreNes = 0;
  function scoreNesRefresh() {
    scoreNes = clamp(scoreNes, 0, 999999);
    $setText($2("nesscore"), scoreNes);
  }
  function tetRateNesRefresh() {
    const nesRate = $2("nesrate");
    if (Mutable.tetRateNes <= 0.25 && (Mutable.tetNes > 0 || Mutable.nontetNes > 3) && Game.params.proMode == true) {
      nesRate.style.color = "#ff0000";
      nesRate.classList.add("drought-flash");
    } else {
      nesRate.style.color = "#ffffff";
      nesRate.classList.remove("drought-flash");
    }
    $setText(nesRate, Math.floor(Mutable.tetRateNes * 100).toString() + "%");
  }
  function updateScoreTime() {
    Mutable.scoreTime = Date.now() - Mutable.scoreStartTime - Game.pauseTime;
  }
  addEventListener("keydown", keyUpDown, false);
  addEventListener("keyup", keyUpDown, false);

  // jscc_temp/src/display/tetrion/stack.ts
  var Stack = class {
    new(x3, y2, hy) {
      const cells = new Array(x3);
      for (let i3 = 0; i3 < x3; i3++) {
        cells[i3] = new Array(hy + y2);
      }
      this.width = x3;
      this.height = hy + y2;
      this.hiddenHeight = hy;
      this.grid = cells;
      this.dirty = true;
    }
    addPiece(tetro) {
      shiftMatrix(MatrixDir.DOWN);
      $2("a").classList.remove("greyed");
      Mutable.lineClear = 0;
      let once = false;
      Mutable.lockflashX = piece.x;
      Mutable.lockflashY = piece.y;
      Mutable.lockflashTetro = tetro;
      Mutable.lockflash = 2;
      Mutable.lockflashOn = true;
      spinCheck();
      let range2 = [];
      let valid = false;
      for (let x3 = 0; x3 < tetro.length; x3++) {
        for (let y2 = 0; y2 < tetro[x3].length; y2++) {
          if (tetro[x3][y2] && y2 + piece.y >= 0) {
            this.grid[x3 + piece.x][y2 + piece.y] = settings.RotSys.color[piece.index];
            if (!once || x3 + piece.x < Mutable.column) {
              Mutable.column = x3 + piece.x;
              once = true;
            }
            if (range2.indexOf(y2 + piece.y) === -1) {
              range2.push(y2 + piece.y);
              if (y2 + piece.y >= this.hiddenHeight)
                valid = true;
            }
          }
        }
      }
      if (!valid) {
        Game.state = GameState.BlockOut;
        $setText(Elements.msg, t2("lock_out"));
        Game.types[Game.type].die();
        menu(3);
        sound.playSFX("gameover");
        sound.playvox("lose");
        return;
      }
      range2 = range2.sort((a3, b3) => a3 - b3);
      for (let row = range2[0], len = row + range2.length; row < len; row++) {
        let count = 0;
        for (let x3 = 0; x3 < this.width; x3++) {
          if (this.grid[x3][row])
            count++;
        }
        if (count === this.width) {
          Mutable.lineClear++;
          const rowInDig = Mutable.digLines.indexOf(row);
          if (rowInDig !== -1) {
            for (let y2 = 0; y2 < rowInDig; y2++) {
              Mutable.digLines[y2]++;
            }
            Mutable.digLines.splice(rowInDig, 1);
          }
          Mutable.clearRows.push(row);
          for (let y2 = row; y2 >= row; y2--) {
            for (let x3 = 0; x3 < this.width; x3++) {
              this.grid[x3][y2] = 0;
            }
          }
          for (let x3 = 0; x3 < this.width; x3++) {
            this.grid[x3][0] = void 0;
          }
        }
      }
      if (Mutable.lineClear !== 0) {
        Mutable.lockflash = 0;
        Mutable.lockflashOn = false;
      }
      if (piece.areLimit == 0 && (Game.params.entryDelay == false || Game.params.entryDelay == void 0)) {
        stack.clearLines();
      }
      if (Game.type === GameType.Grades) {
        Mutable.levelCheck = Mutable.leveltgm;
      }
      let scoreAdd = BigInt(Mutable.level + 1);
      let garbage = 0;
      const pieceName = ["I", "J", "L", "O", "S", "T", "Z"][piece.index];
      if (Game.type === GameType.Retro) {
        if (Mutable.lineClear !== 0) {
          switch (Mutable.lineClear) {
            case 1:
              Mutable.scoreNes += 40 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("SINGLE");
              break;
            case 2:
              Mutable.scoreNes += 100 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("DOUBLE");
              break;
            case 3:
              Mutable.scoreNes += 300 * (Mutable.level + 1);
              Mutable.nontetNes += Mutable.lineClear;
              showTetrisMessage("TRIPLE");
              break;
            case 4:
              Mutable.scoreNes += 1200 * (Mutable.level + 1);
              Mutable.tetNes += Mutable.lineClear;
              showTetrisMessage("TETRIS");
              break;
          }
          scoreNesRefresh();
          Mutable.tetRateNes = Mutable.tetNes / (Mutable.tetNes + Mutable.nontetNes);
          tetRateNesRefresh();
          sound.playSFX("erase", Mutable.lineClear);
          sound.playvox("erase", Mutable.lineClear);
        }
      } else if (Mutable.lineClear !== 0) {
        if (Mutable.isSpin) {
          scoreAdd = scoreAdd * ([800n, 1200n, 1600n, 2000n][Mutable.lineClear - 1] * 2n ** BigInt(Mutable.b2b + Mutable.combo));
          garbage = [
            [2, 4, 6, 8],
            [3, 6, 9, 12]
          ][Mutable.b2b != 0 ? 1 : 0][Mutable.lineClear - 1];
          if (piece.index == 5) {
            if (Mutable.b2b > 0) {
              sound.playvox("b2b_tspin", Mutable.lineClear);
            } else {
              sound.playvox("tspin", Mutable.lineClear);
            }
          } else {
            sound.playvox("erase", Mutable.lineClear);
          }
          if (Mutable.b2b > 0) {
            sound.playSFX("b2b_tspin", Mutable.lineClear);
          } else {
            sound.playSFX("tspin", Mutable.lineClear);
          }
          if (Mutable.isMini) {
            Mutable.newScore += [0n, 200n, 400n, 600n, 800n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          } else if (Mutable.b2b > 0) {
            Mutable.newScore += BigInt(Math.floor([400, 800, 1200, 1600, 3e3][Mutable.lineClear] * (Mutable.level + 1) * 1.5));
          } else {
            Mutable.newScore += [400n, 800n, 1200n, 1600n, 3000n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          }
          Mutable.b2b += 1;
        } else if (Mutable.lineClear === 4) {
          scoreAdd *= 800n * 2n ** BigInt(Mutable.b2b + Mutable.combo);
          garbage = [4, 5][Mutable.b2b != 0 ? 1 : 0];
          if (Mutable.b2b > 0) {
            Mutable.newScore += BigInt(Math.floor(800 * (Mutable.level + 1) * 1.5));
            sound.playvox("b2b_erase", Mutable.lineClear);
            sound.playSFX("b2b_erase", Mutable.lineClear);
          } else {
            Mutable.newScore += BigInt(800 * (Mutable.level + 1));
            sound.playvox("erase", Mutable.lineClear);
            sound.playSFX("erase", Mutable.lineClear);
          }
          Mutable.b2b += 1;
        } else {
          scoreAdd *= [100n, 300n, 500n, 800n][Mutable.lineClear - 1] * 2n ** BigInt(Mutable.combo);
          Mutable.newScore += BigInt([100, 300, 500, 800][Mutable.lineClear - 1] * (Mutable.level + 1));
          Mutable.b2b = 0;
          $2("b2bmsg").innerHTML = "";
          garbage = [0, 1, 2, 4][Mutable.lineClear - 1];
          sound.playSFX("erase", Mutable.lineClear);
          sound.playvox("erase", Mutable.lineClear);
        }
        garbage += ~~(Mutable.combo / 2);
        if (Mutable.combo < 1) {
        } else if (Mutable.combo < 5) {
          sound.playvox("ren1");
        } else if (Mutable.combo < 10) {
          sound.playvox("ren2");
        } else {
          sound.playvox("ren3");
        }
        if (Mutable.combo > 0) {
          if (Mutable.combo > 7 && settings.Soundbank == 6) {
            sound.playSFX("ren/ren", 7);
          } else if (Mutable.combo > 4 && settings.Soundbank == 9) {
            sound.playSFX("ren/ren", 4);
          } else if (Mutable.combo > 20) {
            sound.playSFX("ren/ren", 20);
          } else {
            sound.playSFX("ren/ren", Mutable.combo);
          }
        }
        Mutable.combo += 1;
        if (Mutable.combo > 1) {
          Mutable.newScore += BigInt(50 * (Mutable.combo - 1) * Mutable.level);
        }
        if (Game.type === GameType.Grades) {
          if (Mutable.lineClear == 1) {
            Mutable.leveltgm += 1;
            Mutable.leveltgmvisible += 1;
          } else if (Mutable.lineClear == 2) {
            Mutable.leveltgm += 2;
            Mutable.leveltgmvisible += 2;
          } else if (Mutable.lineClear == 3) {
            Mutable.leveltgm += 4;
            Mutable.leveltgmvisible += 4;
          } else if (Mutable.lineClear == 4) {
            Mutable.leveltgm += 6;
            Mutable.leveltgmvisible += 6;
          }
        }
        sendClearTetrisMessage(Mutable.isSpin, Mutable.isMini && Mutable.isSpin);
        Game.types[Game.type].lineClear(Mutable.lineClear);
      } else {
        if (Mutable.isSpin) {
          scoreAdd *= 2n ** BigInt(Mutable.b2b) * 400n;
          if (settings.Soundbank != 0 && Mutable.lineClear == 0) {
            sound.playSFX("tspin", Mutable.lineClear);
          }
          showSpinMessage(pieceName, Mutable.isMini);
          if (!Mutable.isMini) {
            Mutable.newScore += [400n, 800n, 1200n, 1600n][Mutable.lineClear] * BigInt(Mutable.level + 1);
          } else {
            Mutable.newScore += 100n * BigInt(Mutable.level + 1);
          }
          if (piece.index == 5) {
            sound.playvox("tspin", Mutable.lineClear);
          }
        } else {
          scoreAdd = 0n;
        }
        if (Mutable.combo > 1) {
          if (settings.Voice && settings.Voicebank == 2) {
            showTetrisMessage(t2("ren", Mutable.combo - 1));
          } else {
            showTetrisMessage(t2("combo", Mutable.combo - 1));
          }
        }
        if (Mutable.combo > 10) {
          sound.playSFX("bravo");
        }
        Mutable.combo = 0;
        $2("renmsg").innerHTML = "";
      }
      Mutable.lines += Mutable.lineClear;
      if (Game.type !== 9) {
        Mutable.levelCheck = Mutable.level;
      }
      if (Game.type === GameType.Marathon || Game.type === GameType.Master) {
        if (Game.params.levelCap == 1) {
          Mutable.level = Math.min(~~(Mutable.lines / 10), 14);
        } else {
          Mutable.level = ~~(Mutable.lines / 10);
        }
      } else if (Game.type === 7) {
        Mutable.level = ~~(Mutable.lines / 30);
      } else if (Game.type === GameType.Retro) {
        const startLevel = Game.params.startingLevel;
        const startingLines = Math.min(Math.max(100, startLevel * 10 - 50), startLevel * 10 + 10);
        Mutable.level = ~~Math.max((Mutable.lines + 10 - startingLines + startLevel * 10) / 10, startLevel);
        makeSprite();
        stack.draw();
      }
      if (Game.type !== 9) {
        if (Mutable.levelCheck !== Mutable.level) {
          sound.playSFX("levelup");
          const levelEle = $2("level");
          levelEle.classList.remove("level-flash");
          void levelEle.offsetWidth;
          levelEle.classList.add("level-flash");
        }
      }
      if (Game.type === GameType.Marathon) {
        const stackEle = $2("stack");
        if (Game.params.invisibleMarathon == true && Mutable.level > 19) {
          if (Mutable.watchingReplay) {
            stackEle.classList.add("invisible-replay");
          } else {
            stackEle.classList.add("invisible");
          }
        } else {
          stackEle.classList.remove("invisible-replay");
          stackEle.classList.remove("invisible");
        }
      }
      if (Mutable.level >= 20 && Game.type === GameType.Marathon) {
        if (Mutable.playedLevelingbgmMarathon[1] === false) {
          sound.killbgm();
          sound.playbgm("marathon3");
          Mutable.playedLevelingbgmMarathon[1] = true;
        }
      } else if (Mutable.level >= 10 && Game.type === GameType.Marathon) {
        if (Mutable.playedLevelingbgmMarathon[0] === false) {
          sound.killbgm();
          sound.playbgm("marathon2");
          Mutable.playedLevelingbgmMarathon[0] = true;
        }
      }
      if (Mutable.leveltgm >= 700 && Game.type === GameType.Grades) {
        if (Mutable.playedLevelingbgmGrades[1] === false) {
          sound.killbgm();
          sound.playbgm("grade3");
          Mutable.playedLevelingbgmGrades[1] = true;
        }
      } else if (Mutable.leveltgm >= 500 && Game.type === GameType.Grades) {
        if (Mutable.playedLevelingbgmGrades[0] === false) {
          sound.killbgm();
          sound.playbgm("grade2");
          Mutable.playedLevelingbgmGrades[0] = true;
        }
      }
      Mutable.score += BigInt(scoreAdd ** 16n ** BigInt(Mutable.allclear));
      makeSprite();
      stack.draw();
      let pc = true;
      for (let x3 = 0; x3 < this.width; x3++)
        for (let y2 = 0; y2 < this.height; y2++)
          if (this.grid[x3][y2])
            pc = false;
      if (pc) {
        Mutable.score += 1000000n * 16n ** BigInt(Mutable.allclear);
        Mutable.allclear++;
        sound.playSFX("bravo");
        showTetrisMessage(t2("perfect_clear"));
        garbage += 10;
      }
      const { backFire } = Game.params;
      if (backFire) {
        if (backFire === 1) {
          garbage = [0, 0, 1, 2, 4][Mutable.lineClear];
        } else if (backFire === 3) {
          garbage *= ~~(Mutable.lines / 2);
        }
        if (garbage !== 0) {
          if (backFire === 1) {
            const bottomRow = [];
            for (let x3 = 0; x3 < this.width; x3++) {
              bottomRow.push(this.grid[x3][this.height - 1] > 0 ? 8 : 0);
            }
            for (let y2 = 0; y2 < garbage; y2++) {
              this.rowRise(bottomRow, piece);
            }
          } else if (backFire === 2 || backFire === 3) {
            const hole = ~~(rng.next() * 10);
            const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
            arrRow[hole] = 0;
            for (let y2 = 0; y2 < garbage; y2++) {
              this.rowRise(arrRow, piece);
            }
          }
        }
      }
      Mutable.statsFinesse += piece.finesse - finesse[piece.index][piece.pos][Mutable.column];
      Mutable.piecesSet++;
      if (Game.type === GameType.Grades) {
        if (Mutable.leveltgmvisible % 100 !== 99) {
          Mutable.leveltgm++;
          Mutable.leveltgmvisible++;
        }
        if (Game.type === GameType.Grades) {
          if (Math.floor(Mutable.levelCheck / 100 % 10) !== Math.floor(Mutable.leveltgm / 100 % 10)) {
            sound.playSFX("levelup");
          }
        }
      }
      Mutable.column = 0;
      function checkAlarm(grid) {
        let clearPath = false;
        for (let i3 = 0; i3 < stack.width; i3++) {
          for (let j3 = 0; j3 <= stack.height; j3++) {
            if (j3 == stack.height) {
              clearPath = true;
            }
            if (grid[i3][j3] !== void 0 && grid[i3][j3] !== 0) {
              break;
            }
          }
          if (clearPath) {
            break;
          }
        }
        Mutable.alarmtest = false;
        for (const test in grid) {
          if (grid[test][8] != void 0 && Mutable.alarm == false && clearPath == false || grid[test][11] != void 0 && Mutable.alarm == true) {
            Mutable.alarmtest = true;
          }
        }
        if (clearPath && Mutable.alarm == true) {
          Mutable.alarmtest = false;
        }
        if (Mutable.alarmtest == true && Mutable.alarm == false) {
          Mutable.alarm = true;
          Mutable.alarmtest = false;
          sound.playSFX("alarm");
          $2("bgStack").classList.add("alarm");
          if (Game.type === GameType.Survival || Game.type === 7 || Game.type === GameType.Master && Game.params.delayStrictness === 2) {
            console.log("eee");
            sound.raisesidebgm();
          }
        } else if (Mutable.alarmtest == false && Mutable.alarm == true) {
          Mutable.alarm = false;
          sound.stopSFX("alarm");
          $2("bgStack").classList.remove("alarm");
          if (Game.type === GameType.Survival || Game.type === 7 || Game.type === GameType.Master && Game.params.delayStrictness === 2) {
            sound.lowersidebgm();
          }
        }
      }
      checkAlarm(stack.grid);
      this.dirty = true;
    }
    clearLines() {
      Mutable.clearRows.forEach((element) => {
        for (let y2 = element; y2 >= 1; y2--) {
          for (let x3 = 0; x3 < stack.width; x3++) {
            stack.grid[x3][y2] = stack.grid[x3][y2 - 1];
          }
        }
      });
      if (Mutable.clearRows.length !== 0) {
        if (Mutable.lineARE != 0) {
          sound.playSFX("linefall");
        }
        Mutable.clearRows = [];
        stack.draw();
      }
    }
    rowRise(arrRow, objPiece) {
      let isEmpty = true;
      for (let x3 = 0; x3 < this.width; x3++) {
        for (let y2 = 0; y2 < this.height - 1; y2++) {
          this.grid[x3][y2] = this.grid[x3][y2 + 1];
        }
        if (arrRow[x3])
          isEmpty = false;
        this.grid[x3][this.height - 1] = arrRow[x3];
      }
      let topout = false;
      for (let y2 = 0; y2 < Mutable.digLines.length; y2++) {
        Mutable.digLines[y2]--;
        if (Mutable.digLines[y2] < 0) {
          topout = true;
        }
      }
      if (topout) {
        Game.state = GameState.BlockOut;
        $setText(Elements.msg, "TOP OUT!");
        menu(3);
        Game.types[Game.type].die();
        sound.playSFX("gameover");
        sound.playvox("lose");
      }
      if (!isEmpty) {
        Mutable.digLines.push(this.height - 1);
      }
      if (!piece.dead) {
        if (!piece.moveValid(0, 0, piece.tetro)) {
          piece.y -= 1;
          if (piece.y + pieces[piece.index].rect[3] <= this.hiddenHeight - 2) {
            Game.state = GameState.BlockOut;
            $setText(Elements.msg, "OOPS!");
            menu(3);
            Game.types[Game.type].die();
            sound.playSFX("gameover");
            sound.playvox("lose");
          }
        }
        piece.dirty = true;
      }
      this.dirty = true;
    }
    draw() {
      clear(Elements.stackCtx);
      if (settings.Outline === 0 || settings.Outline === 1 || settings.Outline === 2 && (Game.state === GameState.Loss || Game.state === GameState.Win)) {
        draw(this.grid, 0, -this.hiddenHeight, Elements.stackCtx, void 0, 0.3);
      }
      if (settings.Outline === 1 || settings.Outline === 3) {
        const b3 = ~~(Mutable.cellSize / 8);
        const c3 = Mutable.cellSize;
        const hhc = this.hiddenHeight * c3;
        const pi = Math.PI;
        const lineCanvas = document.createElement("canvas");
        lineCanvas.width = Elements.stackCanvas.width;
        lineCanvas.height = Elements.stackCanvas.height;
        const lineCtx = lineCanvas.getContext("2d");
        lineCtx.fillStyle = "rgba(255,255,255,.5)";
        lineCtx.beginPath();
        for (let x3 = 0, len = this.width; x3 < len; x3++) {
          for (let y2 = 0, wid = this.height; y2 < wid; y2++) {
            if (this.grid[x3][y2]) {
              if (x3 < this.width - 1 && !this.grid[x3 + 1][y2]) {
                lineCtx.fillRect(x3 * c3 + c3 - b3, y2 * c3 - hhc, b3, c3);
              }
              if (x3 > 0 && !this.grid[x3 - 1][y2]) {
                lineCtx.fillRect(x3 * c3, y2 * c3 - hhc, b3, c3);
              }
              if (y2 < this.height - 1 && !this.grid[x3][y2 + 1]) {
                lineCtx.fillRect(x3 * c3, y2 * c3 - hhc + c3 - b3, c3, b3);
              }
              if (!this.grid[x3][y2 - 1]) {
                lineCtx.fillRect(x3 * c3, y2 * c3 - hhc, c3, b3);
              }
              if (x3 < this.width - 1 && y2 < this.height - 1) {
                if (!this.grid[x3 + 1][y2] && !this.grid[x3][y2 + 1]) {
                  lineCtx.clearRect(x3 * c3 + c3 - b3, y2 * c3 - hhc + c3 - b3, b3, b3);
                  lineCtx.fillRect(x3 * c3 + c3 - b3, y2 * c3 - hhc + c3 - b3, b3, b3);
                } else if (!this.grid[x3 + 1][y2 + 1] && this.grid[x3 + 1][y2] && this.grid[x3][y2 + 1]) {
                  lineCtx.moveTo(x3 * c3 + c3, y2 * c3 - hhc + c3 - b3);
                  lineCtx.lineTo(x3 * c3 + c3, y2 * c3 - hhc + c3);
                  lineCtx.lineTo(x3 * c3 + c3 - b3, y2 * c3 - hhc + c3);
                  lineCtx.arc(x3 * c3 + c3, y2 * c3 - hhc + c3, b3, 3 * pi / 2, pi, true);
                }
              }
              if (x3 < this.width - 1 && y2 > -this.hiddenHeight) {
                if (!this.grid[x3 + 1][y2] && !this.grid[x3][y2 - 1]) {
                  lineCtx.clearRect(x3 * c3 + c3 - b3, y2 * c3 - hhc, b3, b3);
                  lineCtx.fillRect(x3 * c3 + c3 - b3, y2 * c3 - hhc, b3, b3);
                } else if (!this.grid[x3 + 1][y2 - 1] && this.grid[x3 + 1][y2] && this.grid[x3][y2 - 1]) {
                  lineCtx.moveTo(x3 * c3 + c3 - b3, y2 * c3 - hhc);
                  lineCtx.lineTo(x3 * c3 + c3, y2 * c3 - hhc);
                  lineCtx.lineTo(x3 * c3 + c3, y2 * c3 - hhc + b3);
                  lineCtx.arc(x3 * c3 + c3, y2 * c3 - hhc, b3, pi / 2, pi, false);
                }
              }
              if (x3 > 0 && y2 < this.height - 1) {
                if (!this.grid[x3 - 1][y2] && !this.grid[x3][y2 + 1]) {
                  lineCtx.clearRect(x3 * c3, y2 * c3 - hhc + c3 - b3, b3, b3);
                  lineCtx.fillRect(x3 * c3, y2 * c3 - hhc + c3 - b3, b3, b3);
                } else if (!this.grid[x3 - 1][y2 + 1] && this.grid[x3 - 1][y2] && this.grid[x3][y2 + 1]) {
                  lineCtx.moveTo(x3 * c3, y2 * c3 - hhc + c3 - b3);
                  lineCtx.lineTo(x3 * c3, y2 * c3 - hhc + c3);
                  lineCtx.lineTo(x3 * c3 + b3, y2 * c3 - hhc + c3);
                  lineCtx.arc(x3 * c3, y2 * c3 - hhc + c3, b3, pi * 2, 3 * pi / 2, true);
                }
              }
              if (x3 > 0 && y2 > -this.hiddenHeight) {
                if (!this.grid[x3 - 1][y2] && !this.grid[x3][y2 - 1]) {
                  lineCtx.clearRect(x3 * c3, y2 * c3 - hhc, b3, b3);
                  lineCtx.fillRect(x3 * c3, y2 * c3 - hhc, b3, b3);
                } else if (!this.grid[x3 - 1][y2 - 1] && this.grid[x3 - 1][y2] && this.grid[x3][y2 - 1]) {
                  lineCtx.moveTo(x3 * c3 + b3, y2 * c3 - hhc);
                  lineCtx.lineTo(x3 * c3, y2 * c3 - hhc);
                  lineCtx.lineTo(x3 * c3, y2 * c3 - hhc + b3);
                  lineCtx.arc(x3 * c3, y2 * c3 - hhc, b3, pi / 2, pi * 2, true);
                }
              }
            }
          }
        }
        lineCtx.fill();
        Elements.stackCtx.globalCompositeOperation = "source-over";
        Elements.stackCtx.drawImage(lineCanvas, 0, 0);
        Elements.stackCtx.fillStyle = "#ffffff";
      }
      statisticsStack();
      this.dirty = false;
    }
  };
  function testSpace(x3, y2) {
    if (stack.grid[x3] !== void 0 && y2 < 24) {
      return stack.grid[x3][y2] !== void 0;
    }
    return true;
  }
  function spinCheck() {
    Mutable.isSpin = false;
    Mutable.isMini = false;
    if (piece.index !== 0 && piece.index !== 3) {
      let spinCheckCount = 0;
      for (let i3 = 0; i3 < pieces[piece.index].spin.highX[0].length; i3++) {
        if (testSpace(piece.x + pieces[piece.index].spin.highX[piece.pos][i3], piece.y + pieces[piece.index].spin.highY[piece.pos][i3]) == true) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount < 2) {
        Mutable.isMini = true;
      }
      for (let i3 = 0; i3 < pieces[piece.index].spin.lowX[0].length; i3++) {
        if (testSpace(piece.x + pieces[piece.index].spin.lowX[piece.pos][i3], piece.y + pieces[piece.index].spin.lowY[piece.pos][i3]) == true) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount >= 3 && Mutable.spinX == piece.x && Mutable.spinY == piece.y && !Mutable.rotationFailed) {
        Mutable.isSpin = true;
      }
    } else if (piece.index == 0) {
      let spinCheckCount = 0;
      for (let i3 = 0; i3 < 2; i3++) {
        if (testSpace(piece.x + pieces[piece.index].spin.highX[piece.pos][i3], piece.y + pieces[piece.index].spin.highY[piece.pos][i3]) == true || testSpace(piece.x + pieces[piece.index].spin.highX[piece.pos][i3 + 2], piece.y + pieces[piece.index].spin.highY[piece.pos][i3 + 2]) == true) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount < 2) {
        Mutable.isMini = true;
      }
      for (let i3 = 0; i3 < 2; i3++) {
        if (testSpace(piece.x + pieces[piece.index].spin.lowX[piece.pos][i3], piece.y + pieces[piece.index].spin.lowY[piece.pos][i3]) == true || testSpace(piece.x + pieces[piece.index].spin.lowX[piece.pos][i3 + 2], piece.y + pieces[piece.index].spin.lowY[piece.pos][i3 + 2]) == true) {
          spinCheckCount++;
        }
      }
      if (spinCheckCount >= 3 && Mutable.spinX == piece.x && Mutable.spinY == piece.y && !Mutable.rotationFailed) {
        Mutable.isSpin = true;
      }
    }
  }
  var stack = new Stack();

  // jscc_temp/src/display/tetrion/piece.ts
  var Piece = class {
    constructor() {
      this.landed = false;
      this.x;
      this.y;
      this.pos = 0;
      this.tetro;
      this.index;
      this.gravity = gravityUnit;
      this.lockDelay = 0;
      this.lockDelayLimit = 30;
      this.are = 0;
      this.areLimit = 0;
      this.irsDir = 0;
      this.ihs = false;
      this.shiftDelay = 0;
      this.shiftDir = 0;
      this.shiftReleased = false;
      this.arrDelay = 0;
      this.held = false;
      this.finesse = 0;
      this.dirty = false;
      this.dead = true;
      this.rotateLimit = 0;
      this.moveLimit = 0;
      this.delayCounting = false;
    }
    new(index) {
      $2("irs-indicator").classList.add("gone");
      $2("ihs-indicator").classList.add("gone");
      const rot = settings.RotSys.initinfo[index];
      this.pos = rot[2];
      this.x = ~~((stack.width - 4) / 2) + rot[0];
      if (Game.type === GameType.Retro || Game.type === GameType.Grades) {
        this.y = stack.hiddenHeight - 1 + rot[1];
      } else {
        this.y = stack.hiddenHeight + rot[1];
      }
      this.rotateLimit = 0;
      this.moveLimit = 0;
      this.delayCounting = false;
      this.index = index;
      this.tetro = [];
      this.held = false;
      $2("a").classList.remove("greyed");
      this.ihs = false;
      this.finesse = 0;
      this.dirty = true;
      this.dead = false;
      this.lockDelay = 0;
      this.classicRuleDelayLast = 0;
      if (settings.NextSound) {
        sound.playSFX("piece" + preview.grabBag[0]);
      }
      const lineVector = $2("linevector");
      const ivector = $2("ivalue");
      if (index == 0 && Game.type === GameType.Retro) {
        Mutable.lineDrought = 0;
        Mutable.lineAmount++;
        ivector.style.color = "#ffffff";
        lineVector.classList.remove("drought-flash");
        lineVector.src = "./assets/linevector.svg";
        $setText(Elements.statsIpieces, Mutable.lineAmount);
      } else {
        Mutable.lineDrought++;
        if (Mutable.lineDrought >= 13) {
          if (Game.params.proMode == true) {
            sound.raisesidebgm();
          }
          ivector.style.color = "#ff0000";
          lineVector.classList.add("drought-flash");
          lineVector.src = "./assets/linevectorred.svg";
          if (Mutable.lineDrought < 25) {
          } else {
          }
          $setText(Elements.statsIpieces, Mutable.lineDrought);
        } else if (Game.params.proMode == true) {
          sound.lowersidebgm();
        }
      }
      if (this.irsDir !== 0) {
        sound.playSFX("initialrotate");
        const curPos = this.pos;
        const newPos = mod(this.pos + this.irsDir, 4);
        const rot2 = settings.RotSys.offset[this.index];
        const offsetX = rot2[newPos][0] - rot2[curPos][0];
        const offsetY = rot2[newPos][1] - rot2[curPos][1];
        this.tetro = pieces[index].tetro[newPos];
        if (!this.moveValid(offsetX, offsetY, this.tetro)) {
          this.tetro = pieces[index].tetro[curPos];
        } else {
          this.x += offsetX;
          this.y += offsetY;
          this.pos = newPos;
        }
        this.irsDir = 0;
      } else {
        this.tetro = pieces[index].tetro[this.pos];
      }
      this.lockDelayLimit = settings.LockDelay;
      if (Game.type === GameType.Master) {
        this.gravity = 20;
        if (Mutable.level < 20) {
          this.lockDelayLimit = [
            30,
            25,
            22,
            20,
            20,
            18,
            17,
            17,
            15,
            15,
            13,
            13,
            13,
            13,
            13,
            12,
            12,
            12,
            11,
            11
          ][Mutable.level];
        } else {
          this.lockDelayLimit = 11;
        }
      } else if (settings.Gravity !== 0) {
        this.gravity = Mutable.gravityArr[settings.Gravity - 1];
      } else if (Game.type === GameType.Marathon) {
        if (Mutable.level < 18) {
          const x3 = Mutable.level + 1;
          this.gravity = 1 / ((0.8 - (x3 - 1) * 7e-3) ** (x3 - 1) * 60);
        } else if (Mutable.level < 19) {
          this.gravity = 19.99;
        } else {
          this.gravity = 20;
          this.lockDelayLimit = ~~(30 * Math.pow(0.93, Math.pow(Mutable.level - 19, 0.8)));
        }
      } else if (Game.type === GameType.Retro) {
        if (Mutable.level <= 29) {
          this.gravity = [
            1 / 48,
            1 / 43,
            1 / 38,
            1 / 33,
            1 / 28,
            1 / 23,
            1 / 18,
            1 / 13,
            1 / 8,
            1 / 6,
            1 / 5,
            1 / 5,
            1 / 5,
            1 / 4,
            1 / 4,
            1 / 4,
            1 / 3,
            1 / 3,
            1 / 3,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1 / 2,
            1
          ][Mutable.level];
        } else {
          this.gravity = 1;
        }
      } else if (Game.type === GameType.Grades) {
        let speedI = 0;
        while (Mutable.leveltgm > speedTableTGM[speedI].level) {
          if (Mutable.leveltgm < speedTableTGM[speedI + 1].level) {
            piece.gravity = speedTableTGM[speedI].speed;
          }
          speedI++;
        }
        if (Mutable.leveltgm < 100) {
          settings.Ghost = 1;
        } else {
          settings.Ghost = 2;
        }
        let miscI = 0;
        while (Mutable.leveltgm > miscTableTGM[miscI].level) {
          if (Mutable.leveltgm < miscTableTGM[miscI + 1].level) {
            piece.areLimit = miscTableTGM[miscI].are;
            Mutable.lineARE = miscTableTGM[miscI].areline;
            Mutable.lineAREb = miscTableTGM[miscI].arelineb;
            settings.DAS = miscTableTGM[miscI].das;
            settings.LockDelay = miscTableTGM[miscI].lockdelay;
          }
          miscI++;
        }
      } else {
        this.gravity = gravityUnit;
      }
      if (Game.type === GameType.Sprint) {
        if (this.lockDelayLimit < 8) {
          this.lockDelayLimit = 8;
        }
      }
      let blockOut = false;
      if (!this.moveValid(0, 0, this.tetro)) {
        if (Game.type === 8) {
          blockOut = true;
        } else if (!this.moveValid(0, -1, this.tetro)) {
          if (!this.moveValid(0, -2, this.tetro)) {
            blockOut = true;
          } else {
            piece.y -= 2;
          }
        } else {
          piece.y -= 1;
        }
      }
      if (blockOut == true) {
        if (Game.type !== 8) {
          piece.y -= 2;
        }
        Game.state = GameState.BlockOut;
        $setText(Elements.msg, "BLOCK OUT!");
        if (Game.params.tournament == true) {
          $setText(Elements.msg, "GAME SET");
        }
        Game.types[Game.type].die();
        menu(3);
        sound.playSFX("gameover");
        sound.playvox("lose");
        return;
      }
      if (this.gravity >= 20) {
        this.checkFall();
      }
      this.landed = !this.moveValid(0, 1, this.tetro);
      if (flags.moveDown & Mutable.keysDown) {
        const grav = Mutable.gravityArr[settings.SoftDrop + 1];
        if (grav >= 20)
          this.y += this.getDrop(grav);
      }
      if (this.landed && this.lockDelay >= this.lockDelayLimit) {
        this.checkLock();
      }
      this.delayCounting = false;
    }
    tryKickList(kickList, rotated, newPos, offsetX, offsetY) {
      let failedRotations = 0;
      Mutable.rotationFailed = false;
      for (let k3 = 0, len = kickList.length; k3 < len; k3++) {
        if (this.moveValid(offsetX + kickList[k3][0], offsetY + kickList[k3][1], rotated)) {
          this.x += offsetX + kickList[k3][0];
          this.y += offsetY + kickList[k3][1];
          this.tetro = rotated;
          this.pos = newPos;
          this.finesse++;
          break;
        } else {
          failedRotations++;
        }
      }
      if (failedRotations >= kickList.length) {
        Mutable.rotationFailed = true;
      }
    }
    rotate(direction) {
      if (this.delayCounting === true) {
        this.rotateLimit++;
      }
      sound.playSFX("rotate");
      const curPos = mod(this.pos, 4);
      const newPos = mod(this.pos + direction, 4);
      const rotated = pieces[this.index].tetro[newPos];
      const rotSys = settings.RotSys;
      const rot = rotSys.offset[this.index];
      const offsetX = rot[newPos][0] - rot[curPos][0];
      const offsetY = rot[newPos][1] - rot[curPos][1];
      let kickList = [];
      if (rotSys.id === 2 || rotSys.id === 14) {
        if (this.index === PieceData.I.index) {
          if (curPos === 1 || curPos === 3)
            kickList = [
              [0, 0],
              [1, 0],
              [-1, 0],
              [2, 0]
            ];
          else
            kickList = [
              [0, 0],
              [0, -1],
              [0, -2]
            ];
        } else if (newPos === 0 || (this.index === PieceData.S.index || this.index === PieceData.Z.index) && newPos === 2)
          kickList = [
            [0, 0],
            [1, 0],
            [-1, 0],
            [0, -1]
          ];
        else
          kickList = [
            [0, 0],
            [1, 0],
            [-1, 0]
          ];
        this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
      } else {
        const kickIndex = [1, -1, 2].indexOf(direction);
        if (rotSys.id === 0)
          kickList = WKTableSRS[this.index][kickIndex][curPos];
        else if (rotSys.id === 1)
          kickList = WKTableCultris;
        else if (rotSys.id === 15)
          kickList = WKTableDX[kickIndex][curPos];
        else
          kickList = WKTableDRS[kickIndex];
        this.tryKickList(kickList, rotated, newPos, offsetX, offsetY);
      }
      Mutable.spinX = Math.floor(piece.x);
      Mutable.spinY = Math.floor(piece.y);
      spinCheck();
      if (settings.Soundbank == 0 && Mutable.isSpin) {
        sound.playSFX("tspin0");
      }
      Mutable.isSpin = false;
      Mutable.isMini = false;
    }
    checkShift() {
      if (Mutable.keysDown & flags.moveLeft && !(Mutable.lastKeys & flags.moveLeft)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = -1;
        this.finesse++;
      } else if (Mutable.keysDown & flags.moveRight && !(Mutable.lastKeys & flags.moveRight)) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 1;
        this.finesse++;
      }
      if (this.shiftDir === 1 && !(Mutable.keysDown & flags.moveRight) && Mutable.lastKeys & flags.moveRight && Mutable.keysDown & flags.moveLeft) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = -1;
      } else if (this.shiftDir === -1 && !(Mutable.keysDown & flags.moveLeft) && Mutable.lastKeys & flags.moveLeft && Mutable.keysDown & flags.moveRight) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 1;
      } else if (!(Mutable.keysDown & flags.moveRight) && Mutable.lastKeys & flags.moveRight && Mutable.keysDown & flags.moveLeft) {
        this.shiftDir = -1;
      } else if (!(Mutable.keysDown & flags.moveLeft) && Mutable.lastKeys & flags.moveLeft && Mutable.keysDown & flags.moveRight) {
        this.shiftDir = 1;
      } else if (!(Mutable.keysDown & flags.moveLeft) && Mutable.lastKeys & flags.moveLeft || !(Mutable.keysDown & flags.moveRight) && Mutable.lastKeys & flags.moveRight) {
        this.shiftDelay = 0;
        this.arrDelay = 0;
        this.shiftReleased = true;
        this.shiftDir = 0;
      }
      const dascut = settings.DASCut;
      const ARR = settings.ARR;
      const DAS = settings.DAS;
      if (this.shiftDir) {
        if (this.shiftReleased && DAS !== 0) {
          this.shift(this.shiftDir);
          this.shiftDelay++;
          this.shiftReleased = false;
        } else if (this.shiftDelay < DAS) {
          this.shiftDelay++;
        } else if (this.shiftDelay === DAS) {
          this.shift(this.shiftDir);
          if (ARR !== 0 || dascut)
            this.shiftDelay++;
        } else if (this.arrDelay < ARR) {
          this.arrDelay++;
          if (this.arrDelay === ARR && ARR !== 0) {
            this.shift(this.shiftDir);
          }
        }
      }
      if (flags.moveLeft3 & Mutable.keysDown && !(Mutable.lastKeys & flags.moveLeft3)) {
        this.multiShift(-1, 3);
        this.finesse++;
      } else if (flags.moveRight3 & Mutable.keysDown && !(Mutable.lastKeys & flags.moveRight3)) {
        this.multiShift(1, 3);
        this.finesse++;
      }
    }
    shift(direction) {
      this.arrDelay = 0;
      const ARR = settings.ARR;
      const DAS = settings.DAS;
      if (ARR === 0 && this.shiftDelay === DAS) {
        if (this.moveValid(direction, 0, this.tetro)) {
          if (direction == 1) {
            shiftMatrix(MatrixDir.RIGHT);
          } else {
            shiftMatrix(MatrixDir.LEFT);
          }
          this.x += direction;
          if (this.gravity >= 20) {
            this.checkFall();
          }
          if (flags.moveDown & Mutable.keysDown) {
            const grav = Mutable.gravityArr[settings.SoftDrop + 1];
            if (grav >= 20)
              this.y += this.getDrop(grav);
          }
        }
      } else if (this.moveValid(direction, 0, this.tetro)) {
        if (this.delayCounting == true) {
          this.moveLimit++;
        }
        this.x += direction;
        sound.playSFX("move");
      } else if (direction == 1) {
        shiftMatrix(MatrixDir.RIGHT);
      } else {
        shiftMatrix(MatrixDir.LEFT);
      }
      if (!this.moveValid(direction, 0, this.tetro) && Game.type === GameType.Retro) {
        this.arrDelay = ARR - 1;
        this.shiftDelay = DAS + 1;
      }
    }
    multiShift(direction, count) {
      for (let i3 = 0; i3 < count && this.moveValid(direction, 0, this.tetro); ++i3) {
        this.x += direction;
        if (this.gravity >= 20) {
          this.checkFall();
        }
        if (flags.moveDown & Mutable.keysDown) {
          const grav = Mutable.gravityArr[settings.SoftDrop + 1];
          if (grav >= 20)
            this.y += this.getDrop(grav);
        }
      }
    }
    shiftDown() {
      if (this.moveValid(0, 1, this.tetro)) {
        const grav = Mutable.gravityArr[settings.SoftDrop + 1];
        if (grav >= 1) {
          this.y += this.getDrop(grav);
        } else {
          this.y += grav;
        }
      }
    }
    hardDrop() {
      if (Game.type !== 8 || Game.params.allowHardDrop == true) {
        if (Game.params.classicRule === true) {
          Mutable.usedHardDrop = false;
        } else {
          sound.playSFX("harddrop");
          Mutable.usedHardDrop = true;
        }
        const distance = this.getDrop(2147483647);
        this.y += distance;
        Mutable.score += BigInt(distance + this.lockDelayLimit - this.lockDelay);
        Mutable.newScore += BigInt(distance * 2);
        Mutable.scoreNes += distance * 2;
        scoreNesRefresh();
        if (Game.params.classicRule !== true) {
          this.lockDelay = this.lockDelayLimit;
        }
      }
    }
    getDrop(distance) {
      if (Game.type !== 8) {
        if (!this.moveValid(0, 0, this.tetro))
          return 0;
        let i3;
        for (i3 = 1; i3 <= distance; i3++) {
          if (!this.moveValid(0, i3, this.tetro))
            return i3 - 1;
        }
        return i3 - 1;
      } else {
        if (!this.moveValid(0, 0, this.tetro))
          return 0;
        let i3;
        for (i3 = 1; i3 <= distance; i3++) {
          if (!this.moveValid(0, i3, this.tetro))
            return i3 - 1;
        }
        return i3 - 1;
      }
    }
    hold() {
      if (Game.type !== 8) {
        const temp = hold.piece;
        if (!this.held) {
          if (hold.piece !== void 0) {
            hold.piece = this.index;
            this["new"](temp);
          } else {
            hold.piece = this.index;
            this["new"](preview.next());
          }
          this.held = true;
          $2("a").classList.add("greyed");
          hold.draw();
        }
      }
    }
    moveValid(cx, cy, tetro) {
      cx = cx + this.x;
      cy = Math.floor(cy + this.y);
      for (let x3 = 0; x3 < tetro.length; x3++) {
        for (let y2 = 0; y2 < tetro[x3].length; y2++) {
          if (tetro[x3][y2] && (cx + x3 < 0 || cx + x3 >= stack.width || cy + y2 >= stack.height || cy + y2 >= 0 && stack.grid[cx + x3][cy + y2])) {
            return false;
          }
        }
      }
      if (Game.type === GameType.Grades || Game.type === GameType.Master && (Game.params.delayStrictness == 1 || Game.params.delayStrictness == 2)) {
        if (Game.params.classicRule !== true && Game.type === GameType.Grades || Game.params.delayStrictness == 1) {
          if (this.landed) {
            this.delayCounting = true;
            if (this.moveLimit < 11 && this.rotateLimit < 8) {
              this.lockDelay = 0;
            }
          } else {
            this.lockDelay = 0;
          }
        } else if (Game.params.classicRule == true || Game.params.delayStrictness == 2) {
          if (this.classicRuleDelayLast < Math.floor(this.y)) {
            this.lockDelay = 0;
          }
          if (this.classicRuleDelayLast < Math.floor(this.y)) {
            this.classicRuleDelayLast = Math.floor(this.y);
          }
          if (!this.landed) {
          }
        }
      } else {
        this.lockDelay = 0;
      }
      return true;
    }
    checkFall() {
      const grav = this.gravity;
      if (grav > 1) {
        this.y += this.getDrop(grav);
      } else {
        this.y += grav;
      }
      if (Math.abs(this.y - Math.round(this.y)) < 1e-6)
        this.y = Math.round(this.y);
    }
    checkLock() {
      if (this.landed) {
        this.y = Math.floor(this.y);
        if (this.lockDelay >= this.lockDelayLimit) {
          this.dead = true;
          stack.addPiece(this.tetro);
          if (Mutable.usedHardDrop === false) {
            if (Game.type === GameType.Retro) {
              Mutable.scoreNes += Math.floor(Mutable.classicSoftDrop);
              scoreNesRefresh();
              Mutable.classicSoftDrop = 0;
              Mutable.lastYFrame = 0;
            }
            sound.playSFX("lock");
            if (Game.params.classicRule == true) {
              this.lockDelay = 0;
            }
          }
          Mutable.usedHardDrop = false;
          this.dirty = true;
          if (Game.state === GameState.Loss) {
            if (Game.params.tournament === true) {
              $setText(Elements.msg, "GAME SET");
            }
            return;
          } else {
            this.held = false;
            Game.checkWin();
            if (Game.state === GameState.Normal && piece.dead) {
              if (Game.type === GameType.Master) {
                if (Mutable.level < 20) {
                  this.areLimit = [
                    18,
                    18,
                    18,
                    15,
                    15,
                    12,
                    12,
                    12,
                    12,
                    12,
                    12,
                    12,
                    10,
                    10,
                    10,
                    8,
                    8,
                    8,
                    8,
                    8
                  ][Mutable.level];
                } else {
                  this.lockDelayLimit = 11;
                  this.areLimit = 6;
                }
                if (Mutable.lineClear !== 0) {
                  Mutable.lineARE = this.areLimit;
                  this.areLimit += Mutable.lineARE;
                } else {
                  Mutable.lineARE = 0;
                }
              } else if (Game.type === GameType.Retro) {
                if (piece.y >= 21) {
                  this.areLimit = 10;
                } else if (piece.y >= 17) {
                  this.areLimit = 12;
                } else if (piece.y >= 13) {
                  this.areLimit = 14;
                } else if (piece.y >= 9) {
                  this.areLimit = 16;
                } else {
                  this.areLimit = 18;
                }
                if (Mutable.lineClear !== 0) {
                  Mutable.lineARE = 17;
                  this.areLimit += Mutable.lineARE;
                } else {
                  Mutable.lineARE = 0;
                }
              } else if (Game.type === GameType.Grades) {
                if (Mutable.lineClear !== 0) {
                  this.areLimit += Mutable.lineARE;
                  this.areLimit += Mutable.lineAREb;
                }
              } else if (Game.type === GameType.Marathon) {
                if (Game.params.entryDelay == 1) {
                  Mutable.lineARE = 12;
                  this.areLimit = 6;
                  if (Mutable.lineClear !== 0) {
                    this.areLimit = 24;
                  }
                }
                if (Game.params.entryDelay == 2) {
                  Mutable.lineARE = 40;
                  this.areLimit = 25;
                  if (Mutable.lineClear !== 0) {
                    this.areLimit = 65;
                  }
                }
              } else {
                this.areLimit = 0;
              }
              if (this.areLimit === 0) {
                this["new"](preview.next());
              } else {
                Game.state = GameState.Paused;
                this.are = 0;
              }
            }
          }
        }
      }
    }
    update() {
      this.landed = !this.moveValid(0, 1, this.tetro);
      if (!(this.moveLimit < 10 && this.rotateLimit < 8)) {
        this.lockDelay = this.lockDelayLimit;
      }
      if (Game.type === GameType.Retro) {
        if (flags.moveDown & Mutable.keysDown) {
          if (Mutable.lastYFrame !== 0) {
            Mutable.classicSoftDrop += piece.y - Mutable.lastYFrame;
          }
          Mutable.lastYFrame = piece.y;
        } else {
          Mutable.classicSoftDrop = 0;
        }
        if (this.landed) {
          if (flags.moveDown & Mutable.keysDown) {
            Mutable.classicGravTest += Mutable.gravityArr[settings.SoftDrop];
          }
          Mutable.classicGravTest += Mutable.classicStoredY;
          Mutable.classicGravTest += this.gravity;
          if (Mutable.classicGravTest >= 1) {
            this.lockDelay = 99;
            Mutable.classicGravTest = 0;
          }
        } else {
          this.y += this.gravity;
          piece.y += Mutable.classicGravTest;
          Mutable.classicStoredY = piece.y % 1;
          Mutable.classicGravTest = 0;
        }
      } else if (flags.moveDown & Mutable.keysDown) {
        if (Mutable.lastYFrame !== 0 && piece.y - Mutable.lastYFrame > 0) {
          Mutable.newScore += BigInt(Math.floor(piece.y - Mutable.lastYFrame));
          $setText(Elements.statsScore, (~~Mutable.newScore).toLocaleString());
        }
        Mutable.lastYFrame = piece.y;
      }
      if (this.moveValid(0, 1, this.tetro) && Game.type !== 8) {
        this.checkFall();
      }
      if (this.landed) {
        if (flags.moveDown & Mutable.keysDown && Game.type === GameType.Grades) {
          if (Game.params.classicRule == true) {
            this.lockDelay = this.lockDelayLimit;
          } else {
            this.lockDelay += 3;
          }
        }
        if (!Game.params.noGravity) {
          this.lockDelay++;
        }
        this.checkLock();
      }
    }
    draw() {
      clear(Elements.activeCtx);
      if (!this.dead) {
        this.drawGhost();
        if (settings.Ghost !== 3) {
          let a3;
          if (this.landed) {
            if (Mutable.stepSEPlayed !== true && Game.type !== 8) {
              sound.playSFX("step");
              Mutable.stepSEPlayed = true;
            }
            a3 = this.lockDelay / this.lockDelayLimit;
            if (this.lockDelayLimit === 0)
              a3 = 0;
            a3 = Math.pow(a3, 2) * 0.5;
          } else {
            Mutable.stepSEPlayed = false;
          }
          draw(this.tetro, this.x, Math.floor(this.y) - stack.hiddenHeight, Elements.activeCtx, settings.RotSys.color[this.index], a3);
        }
      }
    }
    drawGhost() {
      Elements.activeCtx.globalAlpha = 0.4;
      if (settings.Ghost === 0 && !this.landed) {
        draw(this.tetro, this.x, Math.floor(this.y + this.getDrop(2147483647)) - stack.hiddenHeight, Elements.activeCtx, 0);
      } else if (settings.Ghost === 1 && !this.landed) {
        draw(this.tetro, this.x, Math.floor(this.y + this.getDrop(2147483647)) - stack.hiddenHeight, Elements.activeCtx, settings.RotSys.color[this.index]);
      }
      Elements.activeCtx.globalAlpha = 1;
    }
  };
  var piece = new Piece();
  function resetPiece() {
    piece = new Piece();
  }

  // jscc_temp/src/display/tetrion/preview.ts
  var Preview = class {
    constructor() {
      this.grabBag = [];
      this.randomizer = guideline;
    }
    fillGrabBag() {
      while (this.grabBag.length <= 7) {
        this.grabBag.push(PieceData[this.randomizer.next()].index);
      }
      this.dirty = true;
    }
    reset() {
      this.grabBag = [];
      this.randomizer.reset();
      this.fillGrabBag();
      this.draw();
    }
    next() {
      const next = this.grabBag.shift();
      this.fillGrabBag();
      return next;
    }
    draw() {
      clear(Elements.previewCtx);
      const drawCount = settings.Next === void 0 ? 6 : settings.Next;
      if (Game.state === GameState.Normal) {
      }
      for (let i3 = 0; i3 < drawCount; i3++) {
        let p2 = this.grabBag[i3];
        const initInfo = settings.RotSys.initinfo[p2];
        const r3 = initInfo[2];
        const rect = pieces[p2].rect;
        const rotSysColor = settings.RotSys.color[p2];
        if (i3 == 0) {
          if (piece.ihs == true) {
            if (hold.piece == null) {
              p2 = this.grabBag[i3 + 1];
            } else {
              p2 = hold.piece;
            }
          }
          switch (piece.irsDir) {
            case -1:
              draw(pieces[p2].tetro[(r3 + 3) % 4], -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2, -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i3 * 3, Elements.previewCtx, rotSysColor);
              break;
            case 0:
              draw(pieces[p2].tetro[r3], -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2, -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i3 * 3, Elements.previewCtx, rotSysColor);
              $2("irs-indicator").classList.add("gone");
              break;
            case 1:
              draw(pieces[p2].tetro[(r3 + 1) % 4], -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2, -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i3 * 3, Elements.previewCtx, rotSysColor);
              break;
            case 2:
              draw(pieces[p2].tetro[(r3 + 2) % 4], -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2, -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i3 * 3, Elements.previewCtx, rotSysColor);
              break;
          }
        } else {
          if (piece.ihs == true && hold.piece == null) {
            p2 = this.grabBag[i3 + 1];
          }
          draw(pieces[p2].tetro[r3], -rect[r3][0] + (4 - rect[r3][2] + rect[r3][0]) / 2, -rect[r3][1] + (3 - rect[r3][3] + rect[r3][1]) / 2 + i3 * 3, Elements.previewCtx, rotSysColor);
        }
      }
      this.dirty = false;
    }
  };
  var preview = new Preview();

  // jscc_temp/src/display/size.ts
  init_preact_shim();

  // jscc_temp/src/touch.ts
  init_preact_shim();
  var touchLayout = $2("touchLayout");
  var FollowingButton = class {
    constructor(button) {
      this.rectX0 = button.offsetLeft;
      this.rectY0 = button.offsetTop;
      this.rectX1 = button.offsetLeft + button.offsetWidth;
      this.rectY1 = button.offsetTop + button.offsetHeight;
      this.x = (this.rectX0 + this.rectX1) / 2;
      this.y = (this.rectY0 + this.rectY1) / 2;
      this.recentTouches = [];
      this.enabled = true;
    }
  };
  var FollowingButtonSet = class {
    touchStart(pos) {
    }
    posToBinds(pos) {
      let mindist = Infinity;
      let minbtnid = void 0;
      for (let i3 = 0; i3 < touchButtons.length; i3++) {
        const btnflw = touchButtons[i3].follow;
        const dist = Math.hypot(pos.x - btnflw.x, pos.y - btnflw.y);
        if (dist < mindist) {
          mindist = dist;
          minbtnid = i3;
        }
      }
      return minbtnid;
    }
  };
  FollowingButtonSet.RANGE = 96;
  var touchLeft = $2("touchLeft");
  var touchRight = $2("touchRight");
  var touchDown = $2("touchDown");
  var touchDrop = $2("touchDrop");
  var touchHold = $2("touchHold");
  var touchRotLeft = $2("touchRotLeft");
  var touchRotRight = $2("touchRotRight");
  var touchRot180 = $2("touchRot180");
  var touchButtons = [
    touchLeft,
    touchRight,
    touchDown,
    touchDrop,
    touchHold,
    touchRotRight,
    touchRotLeft,
    touchRot180
  ];
  touchLeft.bindsMemberName = "moveLeft";
  touchRight.bindsMemberName = "moveRight";
  touchDown.bindsMemberName = "moveDown";
  touchDrop.bindsMemberName = "hardDrop";
  touchHold.bindsMemberName = "holdPiece";
  touchRotRight.bindsMemberName = "rotRight";
  touchRotLeft.bindsMemberName = "rotLeft";
  touchRot180.bindsMemberName = "rot180";
  for (let i3 = 0; i3 < touchButtons.length; i3++) {
    const btn = touchButtons[i3];
    btn.follow = new FollowingButton(btn);
  }
  function touchButtonsLayout() {
    const dpiX = 96;
    const dpiY = 96;
    const winW = window.innerWidth / dpiX;
    const winH = window.innerHeight / dpiY;
    const buttonH = 0.7;
    let buttonW = 1;
    const fontSize = 0.55;
    const margin = 0.1;
    const unit = "in";
    const setPos = (elem, posX, posY, sizeW, sizeH, alignX, alignY, offsetX, offsetY) => {
      elem.style.width = "" + sizeW + unit;
      elem.style.height = "" + sizeH + unit;
      elem.style.left = "" + (offsetX + alignX * 0.5 * (winW - sizeW) + posX * sizeW - (alignX - 1) * margin / 2) + unit;
      elem.style.top = "" + (offsetY + alignY * 0.5 * (winH - sizeH) + posY * sizeH - (alignY - 1) * margin / 2) + unit;
      elem.classList.remove("gone");
      elem.style.fontSize = "" + fontSize + unit;
    };
    const layouts = {
      NONE: function() {
        for (let i3 = 0, len = touchButtons.length; i3 < len; i3++)
          touchButtons[i3].classList.add("gone");
      },
      KBD_R: function() {
        setPos(touchRotLeft, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRot180, 0.5, -2, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRotRight, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchHold, 1.5, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
      },
      KBD_L: function() {
        setPos(touchRotLeft, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRot180, -0.4, -2, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, -1.5, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
      },
      JOY: function() {
        let oy;
        let ay;
        if (winH - winW > buttonH * 1.5) {
          oy = -1;
          ay = 2;
        } else {
          oy = 0;
          ay = 1;
        }
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchRotLeft, -0.5, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRot180, -0.5, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchHold, -1, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRight, 1, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDown, 0.5, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDrop, 0.5, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
      },
      JOY2: function() {
        let oy;
        let ay;
        if (winH - winW > buttonH * 1.5) {
          oy = -1;
          ay = 2;
        } else {
          oy = 0;
          ay = 1;
        }
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchRotLeft, -1, 1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRot180, -1, -1 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRotRight, 0, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchHold, -2, 0 + oy, buttonW, buttonH, 2, ay, 0, 0);
        setPos(touchRight, 2, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchLeft, 0, 0 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDown, 1, 1 + oy, buttonW, buttonH, 0, ay, 0, 0);
        setPos(touchDrop, 1, -1 + oy, buttonW, buttonH, 0, ay, 0, 0);
      },
      NARROW: function() {
        setPos(touchLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRight, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchDown, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
          setPos(touchDrop, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        } else {
          setPos(touchDown, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
          setPos(touchDrop, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        }
        setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRotRight, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchHold, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRot180, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
      },
      NARROW_L: function() {
        setPos(touchRotLeft, -2, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchRot180, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        } else {
          setPos(touchRot180, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        }
        setPos(touchLeft, 0, -1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchDown, 0, 0, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchRight, 0, 1.2, buttonW, buttonH, 0, 1, 0, 0);
        setPos(touchHold, 0, -2.4, buttonW, buttonH, 0, 1, 0, 0);
      },
      NARROW_LM: function() {
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 2, 0, buttonW, buttonH, 0, 2, 0, 0);
        if (winH - winW > buttonH * 1.5) {
          setPos(touchDown, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
          setPos(touchDrop, 1, -1, buttonW, buttonH, 0, 2, 0, 0);
        } else {
          setPos(touchDown, 0, -1, buttonW, buttonH, 0, 2, 0, 0);
          setPos(touchDrop, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        }
        setPos(touchRotLeft, 0, -1.2, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, 0, -2.4, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRot180, 0, -3.6, buttonW, buttonH, 2, 2, 0, 0);
      },
      DELUXE: function() {
        buttonW = 0.8;
        if ((winW - 0.1) / 4 < buttonW) {
          buttonW = (winW - 0.1) / 4;
        }
        setPos(touchLeft, 0, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchRight, 1, 0, buttonW, buttonH, 0, 2, 0, 0);
        setPos(touchDown, 0, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchDrop, 0, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotLeft, -1, 0, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchRotRight, -1, -1, buttonW, buttonH, 2, 2, 0, 0);
        setPos(touchHold, 0.5, -1, buttonW, buttonH, 0, 2, 0, 0);
        touchRot180.classList.add("gone");
      }
    };
    setPos(touchLayout, 0, 0, buttonW, buttonH, 2, 0, 0, 0);
    if (currLayout === -2) {
      layouts["NONE"]();
    } else if (currLayout === -1) {
      if (winW < buttonW * 3) {
        layouts["NONE"]();
      } else if (winW - winH * 0.5 > buttonW * 4.5 || winH - winW > 4 * buttonH && winW > buttonW * 5.5) {
        layouts["KBD_R"]();
      } else if (winW - winH * 0.5 > buttonW * 3) {
        layouts["JOY"]();
      } else if (winH - winW > 0) {
        layouts["NARROW"]();
      } else if (winW >= buttonW * 4) {
        layouts["DELUXE"]();
      } else {
        layouts["NONE"]();
      }
    } else {
      layouts[[
        "KBD_R",
        "KBD_L",
        "JOY",
        "JOY2",
        "NARROW",
        "NARROW_L",
        "NARROW_LM",
        "DELUXE"
      ][currLayout]]();
    }
  }
  var nLayouts = 7;
  var currLayout = -2;
  function touch(e3) {
    if ((e3.type === "touchstart" || e3.type === "click") && e3.target === touchLayout) {
      currLayout++;
      if (currLayout === nLayouts) {
        currLayout = -2;
      }
      resize();
    }
    if (e3.type === "touchstart" || e3.type === "touchmove" || e3.type === "touchend") {
      for (const i3 in binds)
        keyUpDown({
          type: "keyup",
          keyCode: binds[i3],
          preventDefault: () => {
          }
        });
      for (let i3 = 0, l3 = e3.touches.length; i3 < l3; i3++) {
        const tX = e3.touches[i3].pageX;
        const tY = e3.touches[i3].pageY;
        for (let j3 = 0; j3 < touchButtons.length; j3++) {
          const oRef = touchButtons[j3];
          if (tX >= oRef.offsetLeft && tX < oRef.offsetLeft + oRef.offsetWidth && tY >= oRef.offsetTop && tY < oRef.offsetTop + oRef.offsetHeight) {
            keyUpDown({
              type: "keydown",
              keyCode: binds[oRef.bindsMemberName],
              preventDefault: () => {
              }
            });
            e3.preventDefault();
          }
        }
      }
    }
  }
  var preventDefault = (e3) => {
    e3.preventDefault();
  };
  document.addEventListener("touchstart", touch, false);
  document.addEventListener("touchmove", touch, false);
  document.addEventListener("touchend", touch, false);
  document.addEventListener("click", touch, false);
  document.addEventListener("gesturestart", preventDefault, false);
  document.addEventListener("gestureend", preventDefault, false);
  document.addEventListener("gesturechange", preventDefault, false);

  // jscc_temp/src/display/size.ts
  function resize() {
    const {
      stats,
      stackCanvas,
      activeCanvas,
      bgStackCanvas,
      holdCanvas,
      previewCanvas,
      msg,
      h3,
      timeCanvas,
      timeCtx,
      bgStackCtx
    } = Elements;
    const a3 = $2("a");
    const b3 = $2("b");
    const c3 = $2("c");
    const d3 = $2("d");
    const content = $2("content");
    const padH = 12;
    let screenHeight = window.innerHeight - padH * 2;
    const screenWidth = ~~(screenHeight * 1);
    if (screenWidth > window.innerWidth)
      screenHeight = ~~(window.innerWidth / 1);
    Mutable.cellSize = Math.max(~~(screenHeight / 20), 10);
    if (settings.Size === 1 && Mutable.cellSize >= 16)
      Mutable.cellSize = 16;
    else if (settings.Size === 2 && Mutable.cellSize >= 24)
      Mutable.cellSize = 24;
    else if (settings.Size === 3 && Mutable.cellSize >= 32)
      Mutable.cellSize = 32;
    else if (settings.Size === 4 && Mutable.cellSize >= 48)
      Mutable.cellSize = 48;
    const pad = window.innerHeight - (Mutable.cellSize * 20 + 2);
    const padFinal = Math.min(pad / 2, padH);
    content.style.padding = padFinal + "px 0";
    stats.style.bottom = pad - padFinal + "px";
    a3.style.padding = "0 0.5rem " + ~~(Mutable.cellSize / 2) + "px";
    stackCanvas.width = activeCanvas.width = bgStackCanvas.width = Mutable.cellSize * 10;
    stackCanvas.height = activeCanvas.height = bgStackCanvas.height = Mutable.cellSize * 20;
    b3.style.width = stackCanvas.width + "px";
    b3.style.height = stackCanvas.height + "px";
    holdCanvas.width = Mutable.cellSize * 4;
    holdCanvas.height = Mutable.cellSize * 3;
    a3.style.width = holdCanvas.width + "px";
    a3.style.height = holdCanvas.height + "px";
    previewCanvas.width = Mutable.cellSize * 4;
    previewCanvas.height = stackCanvas.height - Mutable.cellSize * 2;
    c3.style.width = previewCanvas.width + "px";
    c3.style.height = b3.style.height;
    $2("msgdiv").style.lineHeight = b3.style.height;
    msg.style.fontSize = ~~(stackCanvas.width / 6) + "px";
    msg.style.lineHeight = msg.style.fontSize;
    stats.style.fontSize = ~~(stackCanvas.width / 11) + "px";
    document.documentElement.style.fontSize = ~~(stackCanvas.width / 16) + "px";
    for (let i3 = 0, len = h3.length; i3 < len; i3++) {
      h3[i3].style.lineHeight = Mutable.cellSize * 2 + "px";
      h3[i3].style.fontSize = stats.style.fontSize;
    }
    stats.style.width = d3.clientWidth + "px";
    timeCanvas.width = d3.clientWidth;
    timeCanvas.height = timeCanvas.clientHeight || timeCanvas.offsetHeight || timeCanvas.getBoundingClientRect().height;
    timeCtx.font = '1em Roboto Mono, "Trebuchet MS"';
    timeCtx.textAlign = "center";
    timeCtx.textBaseline = "middle";
    touchButtonsLayout();
    makeSprite();
    if (settings.Grid)
      bg(bgStackCtx);
    try {
      piece.draw();
      stack.draw();
      preview.draw();
      if (hold.piece !== void 0) {
        hold.draw();
      }
      statistics();
      statisticsStack();
    } catch (e3) {
    }
  }

  // jscc_temp/src/gametypes/sprint.ts
  init_preact_shim();

  // jscc_temp/src/gametypes/base.ts
  init_preact_shim();
  var GameType3 = class {
    win() {
    }
    die() {
    }
    done() {
    }
    lineClear(lineClear) {
    }
  };

  // jscc_temp/src/gametypes/sprint.ts
  var Sprint = class extends GameType3 {
    update() {
    }
    init() {
      sound.loadbgm("sprint");
      Game.params.pieceSet = Game.settings.sprint.piece.val;
      preview.randomizer.reset();
      switch (Game.params.pieceSet) {
        case 0:
          preview.randomizer = guideline;
          break;
        case 1:
          preview.randomizer = noI;
          break;
        case 2:
          preview.randomizer = iOnly;
          break;
      }
      preview.reset();
      Game.params.backFire = Game.settings.sprint.backfire.val;
      switch (Game.settings.sprint.limit.val) {
        case 0:
          Mutable.lineLimit = 40;
          break;
        case 1:
          Mutable.lineLimit = 100;
          break;
        case 2:
          Mutable.lineLimit = 200;
          break;
      }
    }
    win() {
      const sprintPB = localStorage.getItem("sprint40pb");
      if ((!sprintPB || Mutable.scoreTime < parseFloat(sprintPB)) && Mutable.watchingReplay == false && Game.params.pieceSet == 0 && Game.params.backFire == 0 && Mutable.lineLimit == 40) {
        localStorage.setItem("sprint40pb", Mutable.scoreTime.toString());
        $setText($2("sprint-pb"), timeString(Mutable.scoreTime));
      }
    }
  };

  // jscc_temp/src/gametypes/dig.ts
  init_preact_shim();
  var Dig = class extends GameType3 {
    update() {
      if (Game.params.zen) {
        for (; Mutable.lastPiecesSet < Mutable.piecesSet; Mutable.lastPiecesSet++) {
          Mutable.digZenBuffer++;
          const piecePerRise = [
            8,
            6.5,
            4,
            3.5,
            10 / 3,
            3,
            2.8,
            2.6,
            2.4,
            2.2,
            2
          ][clamp(Mutable.level, 0, 10)];
          if (Mutable.digZenBuffer - piecePerRise > -1e-9) {
            Mutable.digZenBuffer -= piecePerRise;
            if (Math.abs(Mutable.digZenBuffer) < -1e-9) {
              Mutable.digZenBuffer = 0;
            }
            const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
            arrRow[~~(rng.next() * 10)] = 0;
            stack.rowRise(arrRow, piece);
            sound.playSFX("garbage");
          }
        }
      }
    }
    init() {
      sound.loadbgm("sprint");
      Mutable.lastPiecesSet = 0;
      Mutable.digZenBuffer = 0;
      if (Game.settings.dig.checker.val == 1) {
        Game.params.digraceType = "checker";
      } else {
        Game.params.digraceType = "easy";
      }
      if (Game.params.digraceType === void 0 || Game.params.digraceType === "checker") {
        Mutable.digLines = range(stack.height - 10, stack.height);
        $setText(Elements.statsLines, 10);
        for (let y2 = stack.height - 1; y2 > stack.height - 10 - 1; y2--) {
          for (let x3 = 0; x3 < stack.width; x3++) {
            if (x3 + y2 & 1)
              stack.grid[x3][y2] = 8;
          }
        }
      } else if (Game.params.digraceType === "easy") {
        const begin = ~~(rng.next() * stack.width);
        const dire = ~~(rng.next() * 2) * 2 - 1;
        Mutable.digLines = range(stack.height - 10, stack.height);
        $setText(Elements.statsLines, 10);
        for (let y2 = stack.height - 1; y2 > stack.height - 10 - 1; y2--) {
          for (let x3 = 0; x3 < stack.width; x3++) {
            if ((begin + dire * y2 + x3 + stack.width * 2) % 10 !== 0)
              stack.grid[x3][y2] = 8;
          }
        }
      }
      Game.params.zen = Game.settings.dig.zen.val == 1;
    }
    lineClear(lines) {
    }
  };

  // jscc_temp/src/gametypes/marathon.ts
  init_preact_shim();
  var Marathon = class extends GameType3 {
    update() {
    }
    init() {
      switch (Game.settings.marathon.limit.val) {
        case 0:
          Game.params.marathonLimit = 150;
          break;
        case 1:
          Game.params.marathonLimit = 200;
          break;
        case 2:
          Game.params.marathonLimit = void 0;
          break;
        case 3:
          Game.params.marathonLimit = 300;
          break;
      }
      Game.params.entryDelay = Game.settings.marathon.delay.val;
      if (Game.settings.marathon.nograv.val == 1) {
        Game.params.noGravity = true;
      } else {
        Game.params.noGravity = false;
      }
      if (Game.settings.marathon.invisible.val == 1) {
        Game.params.invisibleMarathon = true;
      }
      if (Game.settings.marathon.cap.val == 1) {
        Game.params.levelCap = 1;
      }
      sound.loadbgm("marathon");
      sound.loadbgm("marathon2");
      sound.loadbgm("marathon3");
      settings.Gravity = 0;
    }
  };

  // jscc_temp/src/gametypes/master.ts
  init_preact_shim();
  var Master = class extends GameType3 {
    update() {
    }
    init() {
      if (Game.params.delayStrictness === 2) {
        sound.loadbgm("masterstrict");
        sound.loadsidebgm("masterstrictdire");
      } else {
        sound.loadbgm("master");
      }
      Game.params.delayStrictness = Game.settings.master.lock.val;
    }
  };

  // jscc_temp/src/gametypes/retro.ts
  init_preact_shim();
  var Retro = class extends GameType3 {
    update() {
    }
    init() {
      if (Game.params.proMode == false) {
        sound.loadbgm("retro");
      } else {
        sound.cutsidebgm();
        sound.loadbgm("retropro");
        sound.loadsidebgm("retroprodrought");
      }
      if (Game.settings.retro.type.val == 1) {
        Game.params.bType = true;
      }
      if (Game.settings.retro.level.val >= 16) {
        Game.params.proMode = true;
      }
      if (Game.settings.retro.drop.val == 1) {
        Game.params.allowHardDrop = true;
      }
      if (Game.settings.retro.skin.val == 1) {
        Game.params.retroSkin = true;
      }
      Game.params.startingLevel = Game.settings.retro.level.val;
      settings.Next = 1;
      settings.set("RotSys", RotSys.Nintendo);
      settings.LockDelay = 80;
      settings.DAS = 16;
      settings.ARR = 6;
      settings.SoftDrop = 5;
      settings.Ghost = 2;
      if (Game.params.retroSkin == true) {
        settings.Block = 8;
      }
      settings.Outline = 0;
      settings.Grid = false;
      settings.Gravity = 0;
      preview.randomizer = nes2;
    }
  };

  // jscc_temp/src/gametypes/scoreattack.ts
  init_preact_shim();
  var ScoreAttack = class extends GameType3 {
    update() {
    }
    init() {
      sound.loadbgm("sprint");
      Mutable.lineLimit = 200;
    }
  };

  // jscc_temp/src/gametypes/grades.ts
  init_preact_shim();
  var Grades = class extends GameType3 {
    update() {
    }
    init() {
      piece.areLimit = 25;
      Mutable.lineARE = 40;
      Mutable.lineAREb = 0;
      settings.Next = 3;
      settings.DAS = 14;
      settings.LockDelay = 30;
      if (Game.params.classicRule === true) {
        settings.set("RotSys", RotSys.Arika);
        settings.Block = 3;
      } else {
        settings.set("RotSys", RotSys.Super);
        settings.Block = 2;
      }
      if (Game.settings.grades.rule.val == 1) {
        Game.params.classicRule = false;
      } else {
        Game.params.classicRule = true;
      }
      sound.loadbgm("grade1");
      sound.loadbgm("grade2");
      sound.loadbgm("grade3");
      preview.randomizer = tgm3;
    }
  };

  // jscc_temp/src/gametypes/survival.ts
  init_preact_shim();
  var frameLastRise;
  var Survival = class extends GameType3 {
    init() {
      sound.cutsidebgm();
      sound.loadbgm("survival");
      sound.loadsidebgm("survivaldire");
      frameLastRise = 0;
      Mutable.frameLastRise = 0;
      if (Game.settings.survival.zen.val == 1) {
        Game.params.zen = true;
      }
      Game.params.digOffset = 500 * Game.settings.survival.slevel.val;
    }
    update() {
      const fromLastRise = Mutable.frame - frameLastRise;
      const fromLastHD = flags.hardDrop & Mutable.keysDown ? Mutable.frame - Mutable.frameLastRise : 0;
      const arrRow = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
      let curStage = 0;
      const objCurStage = arrStages[curStage];
      while (curStage < arrStages.length && arrStages[curStage].begin <= Mutable.lines + (Game.params.digOffset || 0)) {
        curStage++;
      }
      curStage--;
      if (fromLastRise >= objCurStage.delay || fromLastHD >= 20 && fromLastRise >= 15) {
        const arrRainbow = [
          2,
          -1,
          1,
          5,
          4,
          3,
          7,
          6,
          -1,
          8,
          8,
          8,
          8,
          6,
          6,
          2,
          1,
          5,
          8,
          -1,
          7,
          7,
          -1,
          8,
          8
        ];
        const flagAll = ~~(objCurStage.begin / 50) % 2;
        let idxRainbow = ~~(objCurStage.begin / 100);
        if (idxRainbow >= arrRainbow.length) {
          idxRainbow = arrRainbow.length - 1;
        }
        const colorUsed = arrRainbow[idxRainbow];
        for (let x3 = 0; x3 < stack.width; x3 += flagAll === 1 ? 1 : stack.width - 1) {
          if (colorUsed === -1) {
            arrRow[x3] = ~~(rng.next() * 8 + 1);
          } else {
            arrRow[x3] = colorUsed;
          }
        }
        objCurStage.gen(arrRow, stack);
        stack.rowRise(arrRow, piece);
        frameLastRise = Mutable.frame;
        sound.playSFX("garbage");
        let topOut = false;
        for (const test in stack.grid) {
          if (stack.grid[test][0] != void 0) {
            topOut = true;
          }
        }
        if (topOut) {
          piece.dead = true;
          Game.state = GameState.BlockOut;
          $setText(Elements.msg, "TOP OUT!");
          menu(3);
          Game.types[Game.type].die();
          sound.playSFX("gameover");
          sound.playvox("lose");
          return;
        }
      }
    }
  };

  // jscc_temp/src/game.ts
  var _Game = class {
    static init(gt, params) {
      if (gt !== "replay") {
        _Game.types[_Game.type].done();
      }
      try {
        sound.killbgm();
      } catch (e3) {
      }
      const linevectorEle = $2("linevector");
      const levelEle = $2("level");
      $2("ivalue").style.color = "#ffffff";
      linevectorEle.classList.remove("drought-flash");
      linevectorEle.src = "./assets/linevector.svg";
      levelEle.classList.remove("level-flash");
      Mutable.leveltgm = 0;
      Mutable.leveltgmvisible = 0;
      Mutable.scoreNes = 0;
      Mutable.newScore = 0n;
      Mutable.tetRateNes = 0;
      Mutable.tetNes = 0;
      Mutable.nontetNes = 0;
      scoreNesRefresh();
      tetRateNesRefresh();
      Mutable.lineDrought = 0;
      Mutable.lineAmount = 0;
      makeSprite();
      sound.init();
      Mutable.column = 0;
      Mutable.keysDown = 0;
      Mutable.lastKeys = 0;
      Mutable.released = 255;
      resetPiece();
      preview.reset();
      Mutable.frame = 0;
      Mutable.frameSkipped = 0;
      Mutable.lastPos = "reset";
      stack["new"](10, 20, 4);
      Mutable.toGreyRow = stack.height - 1;
      hold.piece = void 0;
      if (settings.Gravity === Gravity.Auto)
        Mutable.gravity = gravityUnit;
      Mutable.b2b = 0;
      Mutable.combo = 0;
      Mutable.allclear = 0;
      Mutable.statsFinesse = 0;
      Mutable.lines = 0;
      Mutable.score = 0n;
      Mutable.piecesSet = 0;
      if (_Game.type == GameType.Retro) {
        Mutable.level = _Game.params.startingLevel;
      } else {
        Mutable.level = 0;
      }
      Mutable.digLines = [];
      if (_Game.params.noGravity == true) {
        settings.Gravity = 1;
      }
      clear(Elements.stackCtx);
      clear(Elements.activeCtx);
      clear(Elements.holdCtx);
      if (gt === "replay") {
        run(params);
      } else {
        Mutable.watchingReplay = false;
        _Game.type = gt;
        _Game.params = params || {};
        _Game.types[_Game.type].init();
        const seed = ~~(Math.random() * 2147483645) + 1;
        rng.seed = seed;
        Mutable.replay = {};
        Mutable.replay.keys = {};
        Mutable.replay.seed = seed;
        Mutable.replay.type = _Game.type;
        Mutable.replay.params = _Game.params;
        Mutable.replay.settings = settings;
      }
      if (_Game.type === 7) {
        sound.cutsidebgm();
        sound.loadbgm("survival");
        sound.loadsidebgm("survivaldire");
      }
      if (_Game.type === void 0) {
        _Game.type = 0;
        sound.loadbgm("sprint");
      }
      if (_Game.type !== GameType.Sprint && _Game.type !== GameType.ScoreAttack && _Game.type !== GameType.Retro) {
        if (_Game.params.bType == true) {
          Mutable.lineLimit = 25;
        } else {
          Mutable.lineLimit = 0;
        }
      }
      if (_Game.params.tournament === true) {
        $2("b").classList.add("tournament");
      } else {
        $2("b").classList.remove("tournament");
      }
      menu();
      if (_Game.paused || _Game.state === GameState.NotPlayed) {
        _Game.inloop = true;
        window.requestAnimationFrame(() => _Game.gameLoop());
      }
      _Game.startTime = Date.now();
      _Game.startPauseTime = 0;
      _Game.pauseTime = 0;
      Mutable.scoreTime = 0;
      _Game.paused = false;
      statisticsStack();
      preview.draw();
      _Game.state = GameState.Countdown;
      resize();
    }
    static addGameType(num, type) {
      _Game.types[num] = type;
    }
    static pause() {
      if (_Game.state === GameState.Normal || _Game.state === GameState.Paused) {
        _Game.paused = true;
        _Game.startPauseTime = Date.now();
        $setText(Elements.msg, "Paused");
        menu(4);
      }
    }
    static unpause() {
      _Game.paused = false;
      _Game.pauseTime += Date.now() - _Game.startPauseTime;
      $setText(Elements.msg, "");
      menu();
      _Game.inloop = true;
      window.requestAnimationFrame(() => _Game.gameLoop());
    }
    static mainLoop() {
      if (!(Mutable.lastKeys & flags.holdPiece) && flags.holdPiece & Mutable.keysDown) {
        piece.hold();
      }
      if (_Game.state === GameState.Loss) {
        return;
      }
      if (flags.rotLeft & Mutable.keysDown && !(Mutable.lastKeys & flags.rotLeft)) {
        piece.rotate(-1);
        piece.finesse++;
      } else if (flags.rotRight & Mutable.keysDown && !(Mutable.lastKeys & flags.rotRight)) {
        piece.rotate(1);
        piece.finesse++;
      } else if (flags.rot180 & Mutable.keysDown && !(Mutable.lastKeys & flags.rot180)) {
        piece.rotate(2);
        piece.finesse++;
      }
      piece.checkShift();
      if (flags.moveDown & Mutable.keysDown) {
        piece.shiftDown();
      }
      if (!(Mutable.lastKeys & flags.hardDrop) && flags.hardDrop & Mutable.keysDown) {
        Mutable.frameLastHarddropDown = Mutable.frame;
        piece.hardDrop();
      }
      piece.update();
      _Game.types[_Game.type].update();
    }
    static update() {
      if (Mutable.lastKeys !== Mutable.keysDown && !Mutable.watchingReplay) {
        Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
      } else if (Mutable.frame in Mutable.replay.keys) {
        Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
      }
      _Game.mainLoop();
      updateScoreTime();
      if (Mutable.lastKeys !== Mutable.keysDown) {
        Mutable.lastKeys = Mutable.keysDown;
      }
    }
    static gameLoop() {
      const fps = 60;
      updateMatrixPosition();
      if (Mutable.lockflash > 0) {
        if (piece.tetro != void 0) {
          for (let i3 = 0; i3 < 4; i3++) {
            for (let j3 = 0; j3 < 4; j3++) {
              if (Mutable.lockflashTetro[i3][j3] > 0) {
                Elements.stackCtx.fillStyle = "#ffffff";
                Elements.stackCtx.fillRect((Mutable.lockflashX + i3) * Mutable.cellSize, (Math.floor(Mutable.lockflashY + j3) - 4) * Mutable.cellSize, Mutable.cellSize, Mutable.cellSize);
              }
            }
          }
        }
        Mutable.lockflash--;
      } else if (Mutable.lockflashOn) {
        stack.draw();
        Mutable.lockflash = 0;
        Mutable.lockflashOn = false;
      }
      if (_Game.state !== 0 && _Game.state !== 4 && _Game.state !== 2 || Mutable.killAllbgm == true) {
        sound.killbgm();
        Mutable.alarm = false;
        sound.stopSFX("alarm");
        $2("bgStack").classList.remove("alarm");
      }
      const timeEle = $2("time");
      if (_Game.type === GameType.Sprint) {
        const sprintPB = parseFloat(localStorage.getItem("sprint40pb"));
        if (Mutable.scoreTime >= sprintPB + 100) {
          Elements.timeCtx.fillStyle = "#f00";
          timeEle.classList.add("drought-flash");
          if (settings.ResetPB) {
            _Game.init(_Game.type, _Game.params);
          }
        } else {
          Elements.timeCtx.fillStyle = "#fff";
          timeEle.classList.remove("drought-flash");
        }
      } else {
        Elements.timeCtx.fillStyle = "#fff";
        timeEle.classList.remove("drought-flash");
      }
      if (!_Game.paused && _Game.state !== 3) {
        window.requestAnimationFrame(_Game.gameLoop);
        const repeat = ~~((Date.now() - _Game.startTime - _Game.pauseTime) / 1e3 * fps) - Mutable.frame;
        if (repeat > 1) {
          Mutable.frameSkipped += repeat - 1;
        } else if (repeat <= 0) {
          Mutable.frameSkipped += repeat - 1;
        }
        for (let repf = 0; repf < repeat; repf++) {
          if (_Game.state === GameState.Normal) {
            _Game.update();
          } else if (_Game.state === GameState.Countdown || _Game.state === GameState.Paused) {
            if (Mutable.lastKeys !== Mutable.keysDown && !Mutable.watchingReplay) {
              Mutable.replay.keys[Mutable.frame] = Mutable.keysDown;
            } else if (Mutable.frame in Mutable.replay.keys) {
              Mutable.keysDown = Mutable.replay.keys[Mutable.frame];
            }
            if (Mutable.keysDown & flags.moveLeft) {
              piece.shiftDelay = settings.DAS;
              piece.shiftReleased = false;
              piece.shiftDir = -1;
            } else if (Mutable.keysDown & flags.moveRight) {
              piece.shiftDelay = settings.DAS;
              piece.shiftReleased = false;
              piece.shiftDir = 1;
            } else {
              piece.shiftDelay = 0;
              piece.shiftReleased = true;
              piece.shiftDir = 0;
            }
            if (settings.IRSMode != 0) {
              if (flags.rotLeft & Mutable.keysDown && !(Mutable.lastKeys & flags.rotLeft)) {
                const amt = 3;
                if (settings.IRSMode == 3) {
                  piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
                } else {
                  piece.irsDir = -1;
                }
                if (settings.InitialVis) {
                  sound.playSFX("rotate");
                  preview.draw();
                }
              } else if (flags.rotRight & Mutable.keysDown && !(Mutable.lastKeys & flags.rotRight)) {
                const amt = 1;
                if (settings.IRSMode == 3) {
                  piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
                } else {
                  piece.irsDir = amt;
                }
                if (settings.InitialVis) {
                  sound.playSFX("rotate");
                  preview.draw();
                }
              } else if (flags.rot180 & Mutable.keysDown && !(Mutable.lastKeys & flags.rot180)) {
                const amt = 2;
                if (settings.IRSMode == 3) {
                  piece.irsDir = (piece.irsDir + 1 + amt) % 4 - 1;
                } else {
                  piece.irsDir = amt;
                }
                if (settings.InitialVis) {
                  sound.playSFX("rotate");
                  preview.draw();
                }
              } else if (piece.irsDir != 0 && (flags.rotLeft & Mutable.keysDown) == 0 && (flags.rotRight & Mutable.keysDown) == 0 && (flags.rot180 & Mutable.keysDown) == 0 && settings.IRSMode == 2) {
                piece.irsDir = 0;
                if (settings.InitialVis) {
                  sound.playSFX("rotate");
                  preview.draw();
                }
              }
            }
            const irsIndicator = $2("irs-indicator");
            if (!(Mutable.lastKeys & flags.holdPiece) && flags.holdPiece & Mutable.keysDown && piece.ihs == false && settings.IHSMode != 0) {
              if (_Game.type !== 8) {
                piece.ihs = true;
                irsIndicator.classList.add("gone");
                if (settings.InitialVis) {
                  hold.draw();
                  preview.draw();
                }
              }
            } else if (piece.ihs == true && (flags.holdPiece & Mutable.keysDown) !== 16 && settings.IHSMode == 2) {
              if (_Game.type !== 8) {
                piece.ihs = false;
                $2("ihs-indicator").classList.add("gone");
                if (settings.InitialVis) {
                  hold.draw();
                  preview.draw();
                }
              }
            }
            if (Mutable.lastKeys !== Mutable.keysDown) {
              Mutable.lastKeys = Mutable.keysDown;
            }
            const { delayStrictness, tournament } = _Game.params;
            let time1;
            let time2;
            if (tournament === true) {
              time1 = 10;
              time2 = 20;
            } else {
              time1 = 5;
              time2 = 10;
            }
            if (_Game.state === GameState.Countdown) {
              if (piece.irsDir !== 0) {
                irsIndicator.classList.remove("gone");
              }
              if (piece.ihs === true) {
                $2("ihs-indicator").classList.remove("gone");
              }
              const strictInd = $2("strict-ind");
              const myVideo = $2("myVideo");
              if (delayStrictness === 2) {
                myVideo.classList.remove("gone");
                strictInd.classList.remove("gone");
              } else {
                myVideo.classList.add("gone");
                strictInd.classList.add("gone");
              }
              if (Mutable.frame === 0) {
                statisticsStack();
                makeSprite();
                Mutable.playedLevelingbgmGrades = [false, false];
                Mutable.playedLevelingbgmMarathon = [false, false];
                Mutable.killAllbgm = true;
                $setText(Elements.msg, t2("ready"));
                clearTetrisMessage();
                $2("msgdiv").classList.remove("startanim");
                if (tournament === true) {
                  sound.playSFX("tourneyready");
                } else {
                  sound.playSFX("ready");
                }
                Mutable.clearRows = [];
                sound.killbgm();
              } else if (Mutable.frame === ~~(fps * time1 / 6)) {
                Mutable.killAllbgm = false;
                if (tournament === true) {
                  $setText(Elements.msg, "START!");
                  sound.playSFX("tourneystart");
                  $2("msgdiv").classList.add("startanim");
                } else {
                  $setText(Elements.msg, t2("start"));
                  sound.playSFX("go");
                }
                preview.draw();
                sound.killbgm();
              } else if (Mutable.frame === ~~(fps * time2 / 6)) {
                $2("msgdiv").classList.remove("startanim");
                $setText(Elements.msg, "");
                Mutable.scoreStartTime = Date.now();
                if (_Game.type === GameType.Master) {
                  if (delayStrictness === 2) {
                    sound.playbgm("masterstrict");
                    sound.playsidebgm("masterstrictdire");
                  } else {
                    sound.playbgm("master");
                  }
                } else if (_Game.type === GameType.Marathon) {
                  sound.playbgm("marathon");
                } else if (_Game.type === GameType.Sprint || _Game.type === GameType.Dig || _Game.type === GameType.ScoreAttack) {
                  sound.playbgm("sprint");
                } else if (_Game.type === GameType.Survival || _Game.type === 7) {
                  sound.cutsidebgm();
                  sound.playbgm("survival");
                  sound.playsidebgm("survivaldire");
                } else if (_Game.type === GameType.Retro) {
                  if (_Game.params.proMode == false) {
                    sound.playbgm("retro");
                  } else {
                    sound.cutsidebgm();
                    sound.playbgm("retropro");
                    sound.playsidebgm("retroprodrought");
                  }
                } else if (_Game.type === GameType.Grades) {
                  sound.playbgm("grade1");
                }
                sound.lowersidebgm();
              }
              Mutable.scoreTime = 0;
            } else {
              if (Mutable.lineClear == 4) {
                if (_Game.type === GameType.Retro && _Game.settings.retro.flash.val === 1) {
                  if (piece.are % 2 == 0) {
                    document.body.style.backgroundColor = "white";
                  } else {
                    document.body.style.backgroundColor = "black";
                  }
                }
              }
              if (piece.irsDir !== 0) {
                irsIndicator.classList.remove("gone");
              }
              if (piece.ihs === true) {
                $2("ihs-indicator").classList.remove("gone");
              }
              if (piece.are >= Mutable.lineARE) {
                stack.clearLines();
              }
              piece.are++;
              updateScoreTime();
            }
            if (_Game.state === GameState.Countdown && Mutable.frame >= fps * time2 / 6 || _Game.state === GameState.Paused && piece.are >= piece.areLimit) {
              document.body.style.backgroundColor = "black";
              _Game.state = GameState.Normal;
              if (piece.ihs && _Game.type !== 8) {
                hold.soundCancel = 1;
                piece.index = preview.next();
                sound.playSFX("initialhold");
                piece.hold();
              } else {
                piece["new"](preview.next());
              }
              piece.draw();
              updateScoreTime();
            }
          } else if (_Game.state === GameState.Loss || _Game.state === GameState.Win) {
            $2("stack").classList.remove("invisible-replay");
            $2("stack").classList.remove("invisible");
            if (Mutable.toGreyRow >= stack.hiddenHeight) {
              if (Mutable.frame % 2) {
                for (let x3 = 0; x3 < stack.width; x3++) {
                  if (stack.grid[x3][Mutable.toGreyRow])
                    stack.grid[x3][Mutable.toGreyRow] = _Game.state === GameState.Loss ? 8 : 0;
                }
                stack.draw();
                Mutable.toGreyRow--;
              }
            } else {
              _Game.state = GameState.NotPlayed;
            }
          }
          Mutable.frame++;
        }
        statistics();
        if (piece.x !== Mutable.lastX || Math.floor(piece.y) !== Mutable.lastY || piece.pos !== Mutable.lastPos || piece.lockDelay !== Mutable.lastLockDelay || piece.dirty) {
          piece.draw();
        }
        Mutable.lastX = piece.x;
        Mutable.lastY = Math.floor(piece.y);
        Mutable.lastPos = piece.pos;
        Mutable.lastLockDelay = piece.lockDelay;
        piece.dirty = false;
        if (stack.dirty) {
          stack.draw();
        }
        if (preview.dirty) {
          preview.draw();
        }
      } else {
        _Game.inloop = false;
      }
    }
    static checkWin() {
      if (_Game.type === GameType.Sprint || _Game.type === GameType.Retro && _Game.params.bType == true) {
        if (Mutable.lines >= Mutable.lineLimit) {
          _Game.state = GameState.Win;
          if (_Game.params?.backFire) {
            Elements.msg.innerHTML = "GREAT!";
          } else {
            let rank = null;
            const time = (Date.now() - Mutable.scoreStartTime - _Game.pauseTime) / 1e3;
            for (let i3 = 0; i3 < sprintRanks.length; i3++) {
              if (time > sprintRanks[i3].t) {
                rank = sprintRanks[i3];
                break;
              }
            }
            if (_Game.type !== 8) {
              Elements.msg.innerHTML = "<small>" + rank.b + "</small>";
            }
          }
          piece.dead = true;
          menu(3);
          sound.playSFX("endingstart");
          sound.playvox("win");
          _Game.types[_Game.type].win();
        }
      } else {
        let isend = false;
        if (_Game.type === GameType.Marathon) {
          if (settings.Gravity !== 0 && Mutable.lines >= 200 && _Game.params.noGravity != true) {
          } else if (_Game.params.marathonLimit != void 0 && Mutable.lines >= _Game.params.marathonLimit) {
            isend = true;
          }
        } else if (_Game.type === GameType.ScoreAttack) {
          if (Mutable.lines >= Mutable.lineLimit) {
            isend = true;
          }
        } else if (_Game.type === GameType.Dig) {
          if (Mutable.digLines.length === 0) {
            isend = true;
          }
        } else if (_Game.type === GameType.Master) {
          if (Mutable.lines >= 300) {
            isend = true;
          }
        } else if (_Game.type === 7) {
          if (Mutable.lines >= 400) {
            isend = true;
          }
        }
        if (isend) {
          _Game.state = GameState.Win;
          $setText(Elements.msg, "GREAT!");
          piece.dead = true;
          menu(3);
          sound.playSFX("endingstart");
          sound.playvox("win");
        }
      }
    }
  };
  var Game = _Game;
  Game.type = 0;
  Game.params = {};
  Game.state = GameState.NotPlayed;
  Game.paused = false;
  Game.types = {};
  Game.inloop = false;
  Game.defaultGameSettings = {
    marathon: {
      limit: {
        val: 0,
        max: 3
      },
      delay: {
        val: 1,
        max: 2
      },
      nograv: {
        val: 0,
        max: 1
      },
      invisible: {
        val: 0,
        max: 1
      },
      cap: {
        val: 0,
        max: 1
      }
    },
    sprint: {
      limit: {
        val: 0,
        max: 2
      },
      piece: {
        val: 0,
        max: 2
      },
      backfire: {
        val: 0,
        max: 3
      }
    },
    dig: {
      checker: {
        val: 0,
        max: 1
      },
      zen: {
        val: 0,
        max: 1
      }
    },
    survival: {
      zen: {
        val: 0,
        max: 1
      },
      slevel: {
        val: 0,
        max: 4
      }
    },
    master: {
      lock: {
        val: 1,
        max: 2
      }
    },
    retro: {
      type: {
        val: 0,
        max: 1
      },
      skin: {
        val: 1,
        max: 1
      },
      drop: {
        val: 0,
        max: 1
      },
      level: {
        val: 0,
        max: 19
      },
      flash: {
        val: 1,
        max: 1
      }
    },
    grades: {
      rule: {
        val: 1,
        max: 1
      }
    }
  };
  Game.settings = _Game.defaultGameSettings;
  Game.addGameType(GameType.Sprint, new Sprint());
  Game.addGameType(GameType.Marathon, new Marathon());
  Game.addGameType(GameType.ScoreAttack, new ScoreAttack());
  Game.addGameType(GameType.Dig, new Dig());
  Game.addGameType(GameType.Master, new Master());
  Game.addGameType(GameType.Retro, new Retro());
  Game.addGameType(GameType.Grades, new Grades());
  Game.addGameType(GameType.Survival, new Survival());

  // jscc_temp/src/display/menu.ts
  var setLoop;
  var arrowReleased = true;
  var arrowDelay = 0;
  function resetGameSettings() {
    Game.settings = Game.defaultGameSettings;
    localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
  }
  function changeGameSetting(game, key2, val) {
    Game.settings[game][key2].val = val;
    localStorage.setItem("Game.settings", JSON.stringify(Game.settings));
  }
  var menuStack = [];
  function menu(menuIndex, stackOper) {
    const menus = $$(".menu");
    sound.init();
    let current;
    for (let i3 = 0, len = menus.length; i3 < len; i3++) {
      if (menus[i3].classList.contains("on")) {
        current = i3;
      }
      menus[i3].classList.remove("on");
    }
    if (menuIndex !== void 0) {
      menus[menuIndex].classList.add("on");
    }
    if (stackOper === 1) {
      if (current !== void 0) {
        menuStack.push(current);
      }
    } else if (stackOper === -1) {
      current = menuStack.pop();
      if (current !== void 0 && menuIndex === void 0) {
        menus[current].classList.add("on");
      }
    } else if (stackOper !== 0) {
      menuStack = [];
    }
  }
  var s2;
  var settingsArrow;
  function settingsLoop() {
    if (arrowReleased || arrowDelay >= 6) {
      if (settingsArrow) {
        settings[s2] = settings[s2] === 0 ? settings[s2].length - 1 : settings[s2] - 1;
      } else {
        settings[s2] = settings[s2] === settings[s2].length - 1 ? 0 : settings[s2] + 1;
      }
      arrowReleased = false;
    } else {
      arrowDelay++;
    }
    setLoop = setTimeout(settingsLoop, 50);
  }
  function arrowRelease(e3) {
    resize();
    arrowReleased = true;
    arrowDelay = 0;
    clearTimeout(setLoop);
    this.onmouseup = void 0;
    this.onmouseout = void 0;
    this.ontouchend = void 0;
    this.ontouchcancel = void 0;
    if (e3 && e3.preventDefault) {
      e3.preventDefault();
    }
  }
  function left(e3) {
    settingsArrow = 1;
    s2 = this.parentNode.id;
    this.onmouseup = arrowRelease;
    this.onmouseout = arrowRelease;
    this.ontouchend = arrowRelease;
    this.ontouchcancel = arrowRelease;
    if (e3 && e3.preventDefault) {
      e3.preventDefault();
    }
    settingsLoop();
  }
  function right(e3) {
    settingsArrow = 0;
    s2 = this.parentNode.id;
    this.onmouseup = arrowRelease;
    this.onmouseout = arrowRelease;
    this.ontouchend = arrowRelease;
    this.ontouchcancel = arrowRelease;
    if (e3 && e3.preventDefault) {
      e3.preventDefault();
    }
    settingsLoop();
  }
  function parseVersion(v3) {
    return v3 ? v3.split(".").map(Number) : [0, 0, 0];
  }
  function differentVersion(v1, v22) {
    const v1p = parseVersion(v1);
    const v2p = parseVersion(v22);
    return v1p[0] !== v2p[0] || v1p[1] !== v2p[1];
  }
  function data() {
    if (differentVersion(localStorage.getItem("version"), version)) {
      localStorage.removeItem("settings");
      localStorage.removeItem("Game.settings");
      localStorage.removeItem("binds");
      localStorage.setItem("version", version);
      resetGameSettings();
      return;
    }
    const storedSettings = localStorage.getItem("settings");
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      for (const setting in parsed) {
        settings[setting] = parsed[setting];
      }
    }
    const bindData = localStorage.getItem("binds");
    if (bindData) {
      setBinds(JSON.parse(bindData));
    }
  }
  function main() {
    for (const s4 in settings) {
      const setting = settings.getRaw(s4);
      const div = document.createElement("div");
      const sname = document.createElement("b");
      const iLeft = document.createElement("i");
      const span = document.createElement("span");
      const iRight = document.createElement("i");
      div.id = s4;
      $setText(sname, setting.displayName());
      $setText(span, setting.value);
      iLeft.className = "material-icons left";
      iRight.className = "material-icons right";
      $setText(iLeft, "\uE314");
      $setText(iRight, "\uE315");
      iLeft.onmousedown = left;
      iLeft.ontouchstart = left;
      iRight.onmousedown = right;
      iRight.ontouchstart = right;
      Elements.set.appendChild(div);
      div.appendChild(sname);
      div.appendChild(iLeft);
      div.appendChild(span);
      div.appendChild(iRight);
    }
  }

  // jscc_temp/src/components/main.tsx
  init_preact_shim();

  // jscc_temp/src/components/center/SectionMiddle.tsx
  init_preact_shim();

  // jscc_temp/src/components/center/AudioMenu.tsx
  init_preact_shim();

  // jscc_temp/src/components/settings/GroupListSetting.tsx
  init_preact_shim();

  // jscc_temp/src/components/utils/ButtonGroup.tsx
  init_preact_shim();

  // node_modules/preact/hooks/dist/hooks.module.js
  init_preact_shim();
  init_preact_module();
  var t3;
  var u2;
  var r2;
  var o2 = 0;
  var i2 = [];
  var c2 = l.__b;
  var f2 = l.__r;
  var e2 = l.diffed;
  var a2 = l.__c;
  var v2 = l.unmount;
  function m2(t4, r3) {
    l.__h && l.__h(u2, t4, o2 || r3), o2 = 0;
    var i3 = u2.__H || (u2.__H = { __: [], __h: [] });
    return t4 >= i3.__.length && i3.__.push({}), i3.__[t4];
  }
  function l2(n2) {
    return o2 = 1, p(w2, n2);
  }
  function p(n2, r3, o3) {
    var i3 = m2(t3++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : w2(void 0, r3), function(n3) {
      var t4 = i3.t(i3.__[0], n3);
      i3.__[0] !== t4 && (i3.__ = [t4, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
  }
  function s3(n2) {
    return o2 = 5, d2(function() {
      return { current: n2 };
    }, []);
  }
  function d2(n2, u3) {
    var r3 = m2(t3++, 7);
    return k2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function x2() {
    var t4;
    for (i2.sort(function(n2, t5) {
      return n2.__v.__b - t5.__v.__b;
    }); t4 = i2.pop(); )
      if (t4.__P)
        try {
          t4.__H.__h.forEach(g2), t4.__H.__h.forEach(j2), t4.__H.__h = [];
        } catch (u3) {
          t4.__H.__h = [], l.__e(u3, t4.__v);
        }
  }
  l.__b = function(n2) {
    u2 = null, c2 && c2(n2);
  }, l.__r = function(n2) {
    f2 && f2(n2), t3 = 0;
    var r3 = (u2 = n2.__c).__H;
    r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), r3.__h = []);
  }, l.diffed = function(t4) {
    e2 && e2(t4);
    var o3 = t4.__c;
    o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === l.requestAnimationFrame || ((r2 = l.requestAnimationFrame) || function(n2) {
      var t5, u3 = function() {
        clearTimeout(r3), b2 && cancelAnimationFrame(t5), setTimeout(n2);
      }, r3 = setTimeout(u3, 100);
      b2 && (t5 = requestAnimationFrame(u3));
    })(x2)), u2 = null;
  }, l.__c = function(t4, u3) {
    u3.some(function(t5) {
      try {
        t5.__h.forEach(g2), t5.__h = t5.__h.filter(function(n2) {
          return !n2.__ || j2(n2);
        });
      } catch (r3) {
        u3.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), u3 = [], l.__e(r3, t5.__v);
      }
    }), a2 && a2(t4, u3);
  }, l.unmount = function(t4) {
    v2 && v2(t4);
    var u3, r3 = t4.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
      try {
        g2(n2);
      } catch (n3) {
        u3 = n3;
      }
    }), u3 && l.__e(u3, r3.__v));
  };
  var b2 = typeof requestAnimationFrame == "function";
  function g2(n2) {
    var t4 = u2, r3 = n2.__c;
    typeof r3 == "function" && (n2.__c = void 0, r3()), u2 = t4;
  }
  function j2(n2) {
    var t4 = u2;
    n2.__c = n2.__(), u2 = t4;
  }
  function k2(n2, t4) {
    return !n2 || n2.length !== t4.length || t4.some(function(t5, u3) {
      return t5 !== n2[u3];
    });
  }
  function w2(n2, t4) {
    return typeof t4 == "function" ? t4(n2) : t4;
  }

  // jscc_temp/src/components/utils/ButtonGroup.tsx
  function ButtonGroup({ onClick, data: data2, selected }) {
    const [selectedIndex, setSelectedIndex] = l2(selected);
    return /* @__PURE__ */ v("div", {
      class: "btn-group"
    }, data2.map((item, index) => /* @__PURE__ */ v("button", __spreadValues({
      key: index,
      onClick: () => {
        onClick(index);
        setSelectedIndex(index);
      }
    }, selectedIndex == index ? { class: "active" } : {}), item)));
  }

  // jscc_temp/src/components/settings/GroupListSetting.tsx
  function GroupListSetting({
    setting,
    onClick,
    data: data2,
    selected
  }) {
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("h4", {
      class: "option-header"
    }, t2(`setting-${setting}-title`)), /* @__PURE__ */ v("p", {
      class: "option-description"
    }, t2(`setting-${setting}-desc`)), /* @__PURE__ */ v(ButtonGroup, {
      data: data2,
      selected,
      onClick
    }));
  }

  // jscc_temp/src/components/settings/GroupSetting.tsx
  init_preact_shim();
  function GroupSetting({
    setting,
    onClick,
    data: data2,
    selected
  }) {
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("h4", {
      class: "option-header"
    }, t2(`setting-${setting}-title`)), /* @__PURE__ */ v("p", {
      class: "option-description"
    }, t2(`setting-${setting}-desc`)), /* @__PURE__ */ v(ButtonGroup, {
      data: data2,
      selected,
      onClick
    }));
  }

  // jscc_temp/src/components/settings/GroupSliderSetting.tsx
  init_preact_shim();
  function GroupSliderSetting({
    setting,
    onInput,
    getName = (value) => value.toString(),
    value: initValue,
    min,
    max,
    step = 1
  }) {
    const [value, setValue] = l2(initValue);
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("h4", {
      class: "option-header"
    }, t2(`setting-${setting}-title`)), /* @__PURE__ */ v("div", {
      class: "slidecontainer"
    }, /* @__PURE__ */ v("input", {
      type: "range",
      min,
      max,
      step,
      value,
      class: "slider",
      onInput: (e3) => {
        const val = parseInt(e3.currentTarget.value);
        setValue(val);
        onInput(val);
      }
    }), /* @__PURE__ */ v("p", {
      class: "slidervalue"
    }, getName(value))));
  }

  // jscc_temp/src/components/utils/Btn.tsx
  init_preact_shim();
  function Btn({ click, children, class: clazz = "" }) {
    return /* @__PURE__ */ v("a", {
      class: "btn " + clazz,
      onClick: click
    }, children);
  }

  // jscc_temp/src/components/center/AudioMenu.tsx
  function AudioMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Audio"), /* @__PURE__ */ v(GroupSetting, {
      setting: "Sound",
      data: ["Off", "On"],
      selected: settings.Sound ? 1 : 0,
      onClick: (index) => {
        settings.Sound = index == 1;
      }
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "Volume",
      min: 0,
      max: 100,
      value: settings.Volume ?? 50,
      onInput: (value) => {
        settings.Volume = value;
      },
      getName: (index) => `${index}%`
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "MusicVol",
      min: 0,
      max: 100,
      value: settings.MusicVol ?? 50,
      onInput: (value) => {
        settings.MusicVol = value;
      },
      getName: (index) => `${index}%`
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "Soundbank",
      data: getStringKeys(Soundbank),
      selected: settings.Soundbank,
      onClick: (index) => {
        settings.Soundbank = index;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "NextSound",
      data: ["Off", "On"],
      selected: settings.NextSound ? 1 : 0,
      onClick: (index) => {
        settings.NextSound = index == 1;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "NextType",
      data: getStringKeys(NextType),
      onClick: (index) => {
        settings.NextType = index;
      },
      selected: settings.NextType
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Voice",
      data: ["Off", "On"],
      selected: settings.Voice ? 1 : 0,
      onClick: (index) => {
        settings.Voice = index == 1;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "Voicebank",
      data: getStringKeys(Voicebank),
      selected: settings.Voicebank,
      onClick: (index) => {
        settings.Voicebank = index;
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => menu(12)
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/ControlsMenu.tsx
  init_preact_shim();

  // jscc_temp/src/components/utils/Icon.tsx
  init_preact_shim();
  var ids = {
    "rising-arrow": /* @__PURE__ */ v(d, null, "\uE8E5"),
    wrench: /* @__PURE__ */ v(d, null, "\uE869"),
    dpad: /* @__PURE__ */ v(d, null, "\uE021"),
    replay: /* @__PURE__ */ v(d, null, "\uE04A"),
    left: /* @__PURE__ */ v(d, null, "\uE5C4"),
    right: /* @__PURE__ */ v(d, null, "\uE5C8"),
    "soft-drop": /* @__PURE__ */ v(d, null, "\uE906"),
    "hard-drop": /* @__PURE__ */ v(d, null, "\uE2C4"),
    hold: /* @__PURE__ */ v(d, null, "\uE8D4"),
    "rot-right": /* @__PURE__ */ v(d, null, "\uE15A"),
    "rot-left": /* @__PURE__ */ v(d, null, "\uE166"),
    "rot-180": /* @__PURE__ */ v(d, null, "\uE5D5"),
    retry: /* @__PURE__ */ v(d, null, "\uE040"),
    pause: /* @__PURE__ */ v(d, null, "\uE034")
  };
  function Icon({ id }) {
    return /* @__PURE__ */ v("i", {
      class: "material-icons"
    }, ids[id]);
  }

  // jscc_temp/src/components/center/ControlsMenu.tsx
  var newKey;
  var currCell;
  var tempKey;
  document.addEventListener("keyup", (e3) => {
    if (currCell) {
      newKey = e3.keyCode;
      if (newKey === 8) {
        newKey = void 0;
      }
      if (newKey) {
        for (const i3 in binds) {
          if (newKey === binds[i3]) {
            binds[i3] = void 0;
            $setText($2(i3), key.undefined);
          }
        }
      }
      binds[currCell.id] = newKey;
      $setText(currCell, key[newKey] || newKey);
      localStorage.setItem("binds", JSON.stringify(binds));
      currCell = void 0;
    }
  }, false);
  function ControlButton({ default: def, icon, text, id }) {
    const keycode = binds[id];
    const keyText = key[keycode] || keycode;
    const [txt, setTxt] = l2(keyText || def);
    const ref = s3(null);
    return /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", null, text, " ", /* @__PURE__ */ v(Icon, {
      id: icon
    })), /* @__PURE__ */ v("td", {
      id,
      ref,
      onClick: () => {
        if (currCell) {
          binds[currCell.id] = tempKey;
          $setText(currCell, key[tempKey] || tempKey);
        }
        tempKey = binds[id];
        setTxt("Press key");
        currCell = ref.current;
      }
    }, txt));
  }
  function ControlsMenu() {
    return /* @__PURE__ */ v("div", {
      class: "menu"
    }, /* @__PURE__ */ v("h2", {
      class: "no-margin"
    }, "Controls"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Click on the item you want to change, then press any key."), /* @__PURE__ */ v("table", {
      id: "controls",
      style: "margin-top: 0px"
    }, /* @__PURE__ */ v(ControlButton, {
      default: "\u2190",
      text: "Move",
      icon: "left",
      id: "moveLeft"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "\u2192",
      text: "Move",
      icon: "right",
      id: "moveRight"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "---",
      text: "Triple",
      icon: "left",
      id: "moveLeft3"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "---",
      text: "Triple",
      icon: "right",
      id: "moveRight3"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "\u2193",
      text: "Move",
      icon: "soft-drop",
      id: "moveDown"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "Space",
      text: "Drop",
      icon: "hard-drop",
      id: "hardDrop"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "C",
      text: "Hold",
      icon: "hold",
      id: "holdPiece"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "X",
      text: "Spin",
      icon: "rot-right",
      id: "rotRight"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "Z",
      text: "Spin",
      icon: "rot-left",
      id: "rotLeft"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "Shift",
      text: "Spin",
      icon: "rot-180",
      id: "rot180"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "R",
      text: "Retry",
      icon: "retry",
      id: "retry"
    }), /* @__PURE__ */ v(ControlButton, {
      default: "Esc",
      text: "Pause",
      icon: "pause",
      id: "pause"
    })), /* @__PURE__ */ v(Btn, {
      click: () => menu(0),
      class: "btn-bottom"
    }, t2("menu-done")));
  }

  // jscc_temp/src/components/center/DigMenu.tsx
  init_preact_shim();
  function DigMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Dig"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Clear the bottom as line as soon as possible"), /* @__PURE__ */ v(GroupSetting, {
      setting: "DigCheckered",
      data: ["Off", "On"],
      selected: Game.settings.dig.checker.val ? 1 : 0,
      onClick: (index) => {
        changeGameSetting("dig", "checker", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "DigZen",
      data: ["Off", "On"],
      selected: Game.settings.dig.zen.val ? 1 : 0,
      onClick: (index) => {
        changeGameSetting("dig", "zen", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(4),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/FailedMenu.tsx
  init_preact_shim();
  function FailedMenu() {
    return /* @__PURE__ */ v("nav", {
      id: "go",
      class: "menu"
    }, /* @__PURE__ */ v("div", {
      class: "btn-container btn-container-bottom"
    }, /* @__PURE__ */ v(Btn, {
      click: () => Game.init(Game.type, Game.params)
    }, t2("menu-retry")), /* @__PURE__ */ v(Btn, {
      click: () => Game.init("replay"),
      class: "btn-inline width-50"
    }, t2("menu-replay")), /* @__PURE__ */ v(Btn, {
      click: () => showreplaydata(curreplaydata()),
      class: "btn-inline width25-7"
    }, /* @__PURE__ */ v("i", {
      class: "material-icons"
    }, "\uE161")), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(1),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(0)
    }, t2("menu-back"))));
  }

  // jscc_temp/src/components/center/GradesMenu.tsx
  init_preact_shim();
  function GradesMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Grades"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, /* @__PURE__ */ v("span", {
      style: "color: red"
    }, "UNFINISHED"), /* @__PURE__ */ v("br", null), "Play as fast as possible to earn the highest grade!"), /* @__PURE__ */ v(GroupSetting, {
      setting: "GradesGameRule",
      data: ["Classic", "World"],
      selected: Game.settings.grades.rule.val,
      onClick: (index) => {
        changeGameSetting("grades", "rule", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(9),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/GraphicsMenu.tsx
  init_preact_shim();
  function GraphicsMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Graphics"), /* @__PURE__ */ v(GroupListSetting, {
      setting: "Size",
      data: getStringKeys(Size),
      selected: settings.Size,
      onClick: (index) => {
        settings.Size = index;
      }
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "Next",
      max: 6,
      min: 0,
      step: 1,
      value: settings.Next,
      onInput: (value) => {
        settings.Next = value;
      },
      getName: (index) => index != 0 ? `${index} PIECES` : "DISABLED"
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "NextSide",
      data: ["Left", "Right"],
      selected: settings.NextSide ? 1 : 0,
      onClick: (index) => {
        settings.NextSide = index == 1;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "Block",
      data: getStringKeys(Block),
      selected: settings.Block,
      onClick: (index) => {
        settings.Block = index;
        makeSprite();
      }
    }), /* @__PURE__ */ v("canvas", {
      id: "sprite"
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Monochrome",
      data: ["Off", "On"],
      selected: settings.Monochrome ? 1 : 0,
      onClick: (index) => {
        settings.Monochrome = index == 1;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Outline",
      data: getStringKeys(Outline),
      selected: settings.Outline,
      onClick: (index) => {
        settings.Outline = index;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Ghost",
      data: getStringKeys(Ghost),
      selected: settings.Ghost,
      onClick: (index) => {
        settings.Ghost = index;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Grid",
      data: ["Off", "On"],
      selected: settings.Grid ? 1 : 0,
      onClick: (index) => {
        settings.Grid = index == 1;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "Messages",
      data: ["Off", "On"],
      selected: settings.Messages ? 1 : 0,
      onClick: (index) => {
        settings.Messages = index == 1;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "MatrixSway",
      data: ["Off", "On"],
      selected: settings.MatrixSway ? 1 : 0,
      onClick: (index) => {
        settings.MatrixSway = index == 1;
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "InitialVis",
      data: ["Off", "On"],
      selected: settings.InitialVis ? 1 : 0,
      onClick: (index) => {
        settings.InitialVis = index == 1;
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => menu(12)
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/MainMenu.tsx
  init_preact_shim();
  function MainMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu on"
    }, /* @__PURE__ */ v("h1", {
      style: "font-weight: 4; font-size: 2rem; margin: 0px"
    }, "Polyomino"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, version), /* @__PURE__ */ v("div", {
      class: "btn-container no-margin"
    }, /* @__PURE__ */ v("a", {
      class: "btn btn-inline",
      target: "_blank",
      rel: "noreferrer",
      href: "javascript:void(0)",
      style: "margin-bottom: 1.1em"
    }, "Discord"), /* @__PURE__ */ v(Btn, {
      click: () => menu(9, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-sprint")), /* @__PURE__ */ v(Btn, {
      click: () => menu(10, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-marathon")), /* @__PURE__ */ v(Btn, {
      click: () => menu(11, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-master")), /* @__PURE__ */ v(Btn, {
      click: () => menu(8, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-retro")), /* @__PURE__ */ v(Btn, {
      click: () => menu(7, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-dig")), /* @__PURE__ */ v(Btn, {
      click: () => menu(16, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-survival")), /* @__PURE__ */ v(Btn, {
      click: () => menu(17, 1),
      class: "margin-bottom-1-1"
    }, /* @__PURE__ */ v(Icon, {
      id: "rising-arrow"
    }), t2("game-grades")), /* @__PURE__ */ v(Btn, {
      click: () => menu(2)
    }, /* @__PURE__ */ v(Icon, {
      id: "dpad"
    }), t2("menu-controls")), /* @__PURE__ */ v(Btn, {
      click: () => menu(12)
    }, /* @__PURE__ */ v(Icon, {
      id: "wrench"
    }), t2("menu-settings")), /* @__PURE__ */ v(Btn, {
      click: () => menu(6, 1)
    }, /* @__PURE__ */ v(Icon, {
      id: "replay"
    }), t2("menu-replay"))));
  }

  // jscc_temp/src/components/center/MarathonMenu.tsx
  init_preact_shim();
  function MarathonMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Marathon"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Standard game. Aim for a high score."), /* @__PURE__ */ v(GroupSetting, {
      setting: "MarathonGoal",
      data: ["150", "200", "300", "Endless"],
      selected: Game.settings.marathon.limit.val,
      onClick: (index) => {
        changeGameSetting("marathon", "limit", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "MarathonLevelCap",
      data: ["Off", "On"],
      selected: Game.settings.marathon.cap.val,
      onClick: (index) => {
        changeGameSetting("marathon", "cap", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "MarathonEntryDelay",
      data: ["None", "Short", "Long"],
      selected: Game.settings.marathon.delay.val,
      onClick: (index) => {
        changeGameSetting("marathon", "delay", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "MarathonNoGravity",
      data: ["Off", "On"],
      selected: Game.settings.marathon.nograv.val,
      onClick: (index) => {
        changeGameSetting("marathon", "nograv", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "MarathonInvisible",
      data: ["Off", "On"],
      selected: Game.settings.marathon.invisible.val,
      onClick: (index) => {
        changeGameSetting("marathon", "invisible", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(1),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/MasterMenu.tsx
  init_preact_shim();
  function MasterMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Master"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Super-fast game. Aim for 300 lines."), /* @__PURE__ */ v(GroupSetting, {
      setting: "MasterLock",
      data: ["Forgiving", "Limited", "Strict"],
      selected: Game.settings.master.lock.val,
      onClick: (index) => {
        changeGameSetting("master", "lock", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(6),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/PauseMenu.tsx
  init_preact_shim();
  function PauseMenu() {
    return /* @__PURE__ */ v("nav", {
      id: "pause",
      class: "menu"
    }, /* @__PURE__ */ v("div", {
      class: "btn-container btn-container-bottom"
    }, /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => Game.unpause()
    }, "Resume"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => Game.init(Game.type, Game.params)
    }, "Restart"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(0)
    }, "Main Menu")));
  }

  // jscc_temp/src/components/center/RankingsMenu.tsx
  init_preact_shim();
  function RankingsMenu() {
    return /* @__PURE__ */ v("div", {
      id: "leader",
      class: "menu"
    }, /* @__PURE__ */ v("h2", null, "Rankings"), /* @__PURE__ */ v("div", {
      id: "leaderboard"
    }), /* @__PURE__ */ v("div", {
      style: "clear: both"
    }, /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(void 0, -1)
    }, "Back")));
  }

  // jscc_temp/src/components/center/ReplayMenu.tsx
  init_preact_shim();
  function ReplayMenu() {
    return /* @__PURE__ */ v("nav", {
      id: "replay",
      class: "menu"
    }, /* @__PURE__ */ v("h2", null, "Replay"), /* @__PURE__ */ v("p", null, "Ctrl+C / Ctrl+V"), /* @__PURE__ */ v("textarea", {
      id: "replaydata",
      spellcheck: false
    }), /* @__PURE__ */ v("ul", null, /* @__PURE__ */ v("li", null, /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => {
        tryreplaydata();
        sound.init();
      }
    }, "Watch")), /* @__PURE__ */ v("li", null, /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(void 0, -1)
    }, "Back"))));
  }

  // jscc_temp/src/components/center/RetroMenu.tsx
  init_preact_shim();
  function RetroMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Retro"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Classic game with a variety of options."), /* @__PURE__ */ v("div", {
      class: "no-margin btn-container"
    }, /* @__PURE__ */ v(GroupSetting, {
      setting: "RetroGameType",
      data: ["A-Type", "B-Type"],
      selected: Game.settings.retro.type.val,
      onClick: (index) => {
        changeGameSetting("retro", "type", index);
      }
    }), /* @__PURE__ */ v("h4", {
      class: "option-header"
    }, "Starting Level"), /* @__PURE__ */ v("p", {
      class: "option-description"
    }, "Choose a level to start"), /* @__PURE__ */ v("div", {
      class: "btn-group btn-ensquishened",
      style: "margin-left: 1em"
    }, /* @__PURE__ */ v("button", {
      id: "retro-level-0",
      onclick: "changeSetting('retro', 'level', 0)"
    }, "00"), /* @__PURE__ */ v("button", {
      id: "retro-level-1",
      onclick: "changeSetting('retro', 'level', 1)"
    }, "01"), /* @__PURE__ */ v("button", {
      id: "retro-level-2",
      onclick: "changeSetting('retro', 'level', 2)"
    }, "02"), /* @__PURE__ */ v("button", {
      id: "retro-level-3",
      onclick: "changeSetting('retro', 'level', 3)"
    }, "03"), /* @__PURE__ */ v("button", {
      id: "retro-level-4",
      onclick: "changeSetting('retro', 'level', 4)"
    }, "04"), /* @__PURE__ */ v("button", {
      id: "retro-level-5",
      onclick: "changeSetting('retro', 'level', 5)"
    }, "05"), /* @__PURE__ */ v("button", {
      id: "retro-level-6",
      onclick: "changeSetting('retro', 'level', 6)"
    }, "06"), /* @__PURE__ */ v("button", {
      id: "retro-level-7",
      onclick: "changeSetting('retro', 'level', 7)"
    }, "07"), /* @__PURE__ */ v("button", {
      id: "retro-level-8",
      onclick: "changeSetting('retro', 'level', 8)"
    }, "08"), /* @__PURE__ */ v("button", {
      id: "retro-level-9",
      onclick: "changeSetting('retro', 'level', 9)"
    }, "09")), /* @__PURE__ */ v("div", {
      class: "btn-group btn-ensquishened",
      style: "margin-left: 1em"
    }, /* @__PURE__ */ v("button", {
      id: "retro-level-10",
      onclick: "changeSetting('retro', 'level', 10)"
    }, "10"), /* @__PURE__ */ v("button", {
      id: "retro-level-11",
      onclick: "changeSetting('retro', 'level', 11)"
    }, "11"), /* @__PURE__ */ v("button", {
      id: "retro-level-12",
      onclick: "changeSetting('retro', 'level', 12)"
    }, "12"), /* @__PURE__ */ v("button", {
      id: "retro-level-13",
      onclick: "changeSetting('retro', 'level', 13)"
    }, "13"), /* @__PURE__ */ v("button", {
      id: "retro-level-14",
      onclick: "changeSetting('retro', 'level', 14)"
    }, "14"), /* @__PURE__ */ v("button", {
      id: "retro-level-15",
      onclick: "changeSetting('retro', 'level', 15)"
    }, "15"), /* @__PURE__ */ v("button", {
      id: "retro-level-16",
      onclick: "changeSetting('retro', 'level', 16)"
    }, "16"), /* @__PURE__ */ v("button", {
      id: "retro-level-17",
      onclick: "changeSetting('retro', 'level', 17)"
    }, "17"), /* @__PURE__ */ v("button", {
      id: "retro-level-18",
      onclick: "changeSetting('retro', 'level', 18)"
    }, "18"), /* @__PURE__ */ v("button", {
      id: "retro-level-19",
      onclick: "changeSetting('retro', 'level', 19)"
    }, "19")), /* @__PURE__ */ v(GroupSetting, {
      setting: "RetroHardDrop",
      data: ["Off", "On"],
      selected: Game.settings.retro.drop.val,
      onClick: (index) => {
        changeGameSetting("retro", "drop", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "RetroFlashing",
      data: ["Off", "On"],
      selected: Game.settings.retro.flash.val,
      onClick: (index) => {
        changeGameSetting("retro", "flash", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v("a", {
      class: "btn btn-inline width-50",
      onClick: () => Game.init(8, { proMode: false })
    }, "Start"), /* @__PURE__ */ v("a", {
      class: "btn btn-inline width25-7",
      onClick: () => menu(void 0, -1)
    }, "Back")));
  }

  // jscc_temp/src/components/center/SettingsMenu.tsx
  init_preact_shim();
  function SettingsMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Settings"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(13)
    }, "Tuning"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(15)
    }, "Graphics"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(14)
    }, "Audio"), /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(0)
    }, "Back"));
  }

  // jscc_temp/src/components/center/SprintMenu.tsx
  init_preact_shim();
  function SprintMenu() {
    const sprintPB = localStorage.getItem("sprint40pb");
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Sprint"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Clear the lines as fast as you can! ", /* @__PURE__ */ v("br", null), "Fastest time:", " ", /* @__PURE__ */ v("span", {
      id: "sprint-pb"
    }, timeString(sprintPB ? parseFloat(sprintPB) : 0))), /* @__PURE__ */ v("div", {
      class: "no-margin btn-container"
    }, /* @__PURE__ */ v(GroupSetting, {
      setting: "SprintLimit",
      data: ["40", "100", "200"],
      selected: Game.settings.sprint.limit.val,
      onClick: (index) => {
        changeGameSetting("sprint", "limit", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "SprintPieceSet",
      data: ["Standard", "No I", "I Only"],
      selected: Game.settings.sprint.piece.val,
      onClick: (index) => {
        changeGameSetting("sprint", "piece", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "SprintBackfire",
      data: ["Off", "Low", "Med", "High"],
      selected: Game.settings.sprint.backfire.val,
      onClick: (index) => {
        changeGameSetting("sprint", "backfire", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(0),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back"))));
  }

  // jscc_temp/src/components/center/SurvialMenu.tsx
  init_preact_shim();
  function SurvialMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Survival"), /* @__PURE__ */ v("p", {
      class: "no-margin"
    }, "Clear the bottom as line as soon as possible"), /* @__PURE__ */ v(GroupSetting, {
      setting: "SurvivalZenMode",
      data: ["Off", "On"],
      selected: Game.settings.survival.zen.val,
      onClick: (index) => {
        changeGameSetting("survival", "zen", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "SurvivalStartingLevel",
      data: ["0", "500", "1000", "1500", "2000"],
      selected: Game.settings.survival.slevel.val,
      onClick: (index) => {
        changeGameSetting("survival", "slevel", index);
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => Game.init(3),
      class: "btn-inline width-50"
    }, t2("menu-start")), /* @__PURE__ */ v(Btn, {
      click: () => menu(void 0, -1),
      class: "btn-inline width25-7"
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/TuningMenu.tsx
  init_preact_shim();
  function TuningMenu() {
    return /* @__PURE__ */ v("nav", {
      class: "menu"
    }, /* @__PURE__ */ v("h1", {
      class: "boldish"
    }, "Tuning"), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "DAS",
      max: 30,
      min: 0,
      step: 1,
      value: settings.DAS ?? 10,
      onInput: (value) => {
        settings.DAS = value;
      },
      getName: (index) => `${index} FRAMES; ${Math.round((1e3 / 60 * index + 1e-5) * 100) / 100} MS`
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "ARR",
      max: 10,
      min: 0,
      step: 1,
      value: settings.ARR ?? 2,
      onInput: (value) => {
        settings.ARR = value;
      },
      getName: (index) => index != 0 ? `${index} FRAMES; ${Math.round((60 / index + 1e-5) * 100) / 100} HZ` : "INSTANT"
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "Gravity",
      max: 9,
      min: 0,
      step: 1,
      value: settings.Gravity ?? 0,
      onInput: (value) => {
        settings.Gravity = value;
      },
      getName: (index) => Gravity[index]
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "SoftDrop",
      max: 7,
      min: 0,
      step: 1,
      value: settings.SoftDrop ?? 6,
      onInput: (value) => {
        settings.SoftDrop = value;
      },
      getName: (index) => SoftDrop[index + 2]
    }), /* @__PURE__ */ v(GroupSliderSetting, {
      setting: "LockDelay",
      max: 100,
      min: 0,
      step: 0.1,
      value: settings.LockDelay ?? 30,
      onInput: (value) => {
        settings.LockDelay = value;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "IRSMode",
      data: getStringKeys(IRSMode),
      selected: settings.IRSMode,
      onClick: (index) => {
        settings.IRSMode = index;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "IHSMode",
      data: getStringKeys(IHSMode),
      selected: settings.IHSMode,
      onClick: (index) => {
        settings.IHSMode = index;
      }
    }), /* @__PURE__ */ v(GroupListSetting, {
      setting: "RotSys",
      data: getStringKeys(RotSys),
      selected: settings.RotSys,
      onClick: (index) => {
        settings.set("RotSys", index);
      }
    }), /* @__PURE__ */ v(GroupSetting, {
      setting: "ResetPB",
      data: ["Off", "On"],
      selected: settings.ResetPB ? 1 : 0,
      onClick: (index) => {
        settings.ResetPB = index == 1;
      }
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v(Btn, {
      click: () => menu(12)
    }, t2("menu-back")));
  }

  // jscc_temp/src/components/center/SectionMiddle.tsx
  function SectionMiddle() {
    return /* @__PURE__ */ v("div", {
      id: "b"
    }, /* @__PURE__ */ v("canvas", {
      id: "bgStack"
    }), /* @__PURE__ */ v("canvas", {
      id: "stack"
    }, "You need an up-to-date web browser to play this game."), /* @__PURE__ */ v("canvas", {
      id: "active"
    }), /* @__PURE__ */ v("div", {
      id: "msgdiv"
    }, /* @__PURE__ */ v("span", {
      id: "msg"
    })), /* @__PURE__ */ v("div", {
      id: "cleardiv"
    }, /* @__PURE__ */ v("span", {
      id: "clear"
    })), /* @__PURE__ */ v("div", {
      id: "rendiv"
    }, /* @__PURE__ */ v("span", {
      id: "renmsg"
    })), /* @__PURE__ */ v("div", {
      id: "b2bdiv"
    }, /* @__PURE__ */ v("span", {
      id: "b2bmsg"
    })), /* @__PURE__ */ v(MainMenu, null), /* @__PURE__ */ v("div", {
      class: "menu"
    }, /* @__PURE__ */ v("h2", {
      id: "settings-button"
    }, "Settings"), /* @__PURE__ */ v("div", {
      id: "settings"
    }), /* @__PURE__ */ v("div", {
      id: "settings-done"
    }, /* @__PURE__ */ v("a", {
      class: "btn",
      onClick: () => menu(0)
    }, "Done"))), /* @__PURE__ */ v(ControlsMenu, null), /* @__PURE__ */ v(FailedMenu, null), /* @__PURE__ */ v(PauseMenu, null), /* @__PURE__ */ v(RankingsMenu, null), /* @__PURE__ */ v(ReplayMenu, null), /* @__PURE__ */ v(DigMenu, null), /* @__PURE__ */ v(RetroMenu, null), /* @__PURE__ */ v(SprintMenu, null), /* @__PURE__ */ v(MarathonMenu, null), /* @__PURE__ */ v(MasterMenu, null), /* @__PURE__ */ v(SettingsMenu, null), /* @__PURE__ */ v(TuningMenu, null), /* @__PURE__ */ v(AudioMenu, null), /* @__PURE__ */ v(GraphicsMenu, null), /* @__PURE__ */ v(SurvialMenu, null), /* @__PURE__ */ v(GradesMenu, null));
  }

  // jscc_temp/src/components/left/SectionLeft.tsx
  init_preact_shim();

  // jscc_temp/src/components/left/Stats.tsx
  init_preact_shim();
  function Stats({}) {
    return /* @__PURE__ */ v("table", {
      id: "stats"
    }, /* @__PURE__ */ v("tr", {
      id: "nesratetr",
      class: "gone"
    }, /* @__PURE__ */ v("th", {
      class: "white-border-span",
      style: "font-size: 0.5em"
    }, /* @__PURE__ */ v("b", null, "Tetris"), " Rate"), /* @__PURE__ */ v("td", {
      id: "nesrate"
    }, "0")), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      id: "score-label",
      class: "white-border-span"
    }, "Score"), /* @__PURE__ */ v("td", {
      id: "score"
    }, "0"), /* @__PURE__ */ v("td", {
      id: "nesscore"
    }, "0")), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      id: "level",
      class: "white-border-span"
    }), /* @__PURE__ */ v("th", {
      id: "strict-ind"
    }, "STRICT MODE")), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      class: "white-border-span"
    }, "Lines"), /* @__PURE__ */ v("td", {
      id: "levelline"
    }, /* @__PURE__ */ v("div", {
      id: "promode"
    }), /* @__PURE__ */ v("div", {
      id: "line"
    }, "0"))), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      class: "white-border-span"
    }, "Pieces"), /* @__PURE__ */ v("td", {
      id: "piece"
    }, "0")), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      class: "white-border-span"
    }, "Finesse"), /* @__PURE__ */ v("td", {
      id: "finesse"
    }, "0")), /* @__PURE__ */ v("tr", null, /* @__PURE__ */ v("th", {
      id: "time"
    }, /* @__PURE__ */ v("canvas", null))));
  }

  // jscc_temp/src/components/left/SectionLeft.tsx
  function SectionLeft() {
    return /* @__PURE__ */ v("div", {
      id: "d"
    }, /* @__PURE__ */ v("h3", {
      id: "holdtext"
    }, /* @__PURE__ */ v("span", {
      class: "white-border-span"
    }, "Hold")), /* @__PURE__ */ v("div", {
      id: "a"
    }, /* @__PURE__ */ v("canvas", {
      id: "hold",
      class: "glow-flash-animation"
    }), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v("div", {
      id: "divInp"
    })), /* @__PURE__ */ v("h3", {
      id: "ihs-indicator",
      class: "flashing"
    }, "INITIAL"), /* @__PURE__ */ v(Stats, null));
  }

  // jscc_temp/src/components/right/SectionRight.tsx
  init_preact_shim();

  // jscc_temp/src/components/utils/ProgressBar.tsx
  init_preact_shim();

  // jscc_temp/src/utils/random-id.ts
  init_preact_shim();
  function guid(len) {
    return Math.random().toString(36).substring(2, len);
  }

  // jscc_temp/src/components/utils/ProgressBar.tsx
  function ProgressBar({
    id,
    "label-id": labelId,
    value,
    max
  }) {
    const eleId = id || `progress-bar-${guid(5)}`;
    return /* @__PURE__ */ v(d, null, labelId && /* @__PURE__ */ v("label", {
      id: labelId,
      for: eleId,
      style: "display: block"
    }), /* @__PURE__ */ v("progress", {
      id: eleId,
      value,
      max
    }));
  }

  // jscc_temp/src/components/utils/LineShower.tsx
  init_preact_shim();
  function LineShower() {
    return /* @__PURE__ */ v("div", {
      id: "lineshower",
      style: "\n				font-size: 2.5em;\n				transform: translate(0, 9em);\n				display: none;\n			"
    }, /* @__PURE__ */ v("img", {
      id: "linevector",
      src: "./assets/linevector.svg"
    }), /* @__PURE__ */ v("p", {
      id: "ivalue",
      style: `
					margin: 0px;
					text-align: center;
					font-family: 'Roboto Mono';
					font-weight: 200;
				`
    }, "0"));
  }

  // jscc_temp/src/components/right/SectionRight.tsx
  function SectionRight() {
    return /* @__PURE__ */ v("div", {
      id: "c"
    }, /* @__PURE__ */ v("div", {
      id: "sounds-loading"
    }, /* @__PURE__ */ v(ProgressBar, {
      id: "sound-loading-bar",
      "label-id": "sound-name",
      value: 0,
      max: 100
    })), /* @__PURE__ */ v("h3", {
      id: "irs-indicator",
      class: "flashing"
    }, "INITIAL"), /* @__PURE__ */ v("h3", {
      style: "font-weight: 300"
    }, /* @__PURE__ */ v("span", {
      class: "white-border-span"
    }, "Next")), /* @__PURE__ */ v("canvas", {
      id: "preview"
    }), /* @__PURE__ */ v(LineShower, null));
  }

  // jscc_temp/src/components/main.tsx
  function MainComponent() {
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v(SectionLeft, null), /* @__PURE__ */ v(SectionMiddle, null), /* @__PURE__ */ v(SectionRight, null));
  }

  // jscc_temp/src/main.ts
  data();
  S(v(MainComponent, {}), $2("content"));
  addEventListener("resize", resize, false);
  addEventListener("load", resize, false);
  main();
})();
/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
//# sourceMappingURL=main.js.map
