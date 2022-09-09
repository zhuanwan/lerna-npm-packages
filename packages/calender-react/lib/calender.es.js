import Ze, { useState as U, useRef as K, useLayoutEffect as Et, useEffect as Be } from "react";
function Oe(c) {
  return c instanceof Date;
}
function Qe(c, g) {
  return new Date(c, g + 1, 0).getDate();
}
function qe(c) {
  const g = c.split("-");
  return new Date(g[0], g[1] - 1, g[2], 0, 0, 0);
}
function et(c) {
  return c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate();
}
function H(c) {
  return c = new Date(c), new Date(c.getFullYear(), c.getMonth(), c.getDate(), 0, 0, 0);
}
function Dt(c, g, E, d, R) {
  let x = [];
  const Y = H(new Date());
  let M = new Date(c, g, 1, 0, 0, 0), h = Qe(c, g), T = M.getDate() - M.getDay(), u = !0, m = 0;
  for (; u; ) {
    let _ = new Date(c, g, T, 0, 0, 0), W = et(_), l = !1, Z = !1, V = !1, j = !1, w = !1;
    T === 1 ? Z = !0 : T === h && (V = !0), T <= 0 || T > h ? j = !0 : qe(W) < Y ? w = !0 : +qe(W) == +Y && (l = !0);
    let L = T;
    (T > h || T <= 0) && (L = _.getDate()), x[m] = {
      date: _,
      dataDayString: W,
      dates: L,
      isToday: l,
      isFirstDay: Z,
      isLastDay: V,
      isInvalidDay: j,
      isLessThanToday: w,
      active: E ? !d && +_ - +E === 0 : !1,
      isStartDayChecked: d && !!R[0] && +R[0] - +_ === 0,
      isEndDayChecked: !!R[1] && +R[1] - +_ === 0,
      range: d && !!R[0] && !!R[1] && +_ - +R[0] >= 0 && +R[1] - +_ >= 0
    }, m++, T++, u = m <= 41;
  }
  return x;
}
function _t(c) {
  return c * (180 / Math.PI);
}
function bt(c, g) {
  const E = g.x - c.x, d = g.y - c.y;
  if (E > 0 && d === 0)
    return 0;
  if (E === 0 && d > 0)
    return 90;
  if (E < 0 && d === 0)
    return 180;
  if (E === 0 && d < 0)
    return 270;
  const R = _t(Math.atan(d / E));
  return E < 0 && d < 0 || E < 0 && d > 0 ? R + 180 : E > 0 && d < 0 ? R + 360 : R;
}
function Je(...c) {
  const g = [];
  for (const E of c)
    Object.prototype.toString.call(E) === "[object String]" && g.push(E), Object.prototype.toString.call(E) === "[object Object]" && Object.keys(E).forEach((d) => {
      E[d] && g.push(d);
    });
  return g.join(" ");
}
var je = { exports: {} }, ge = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ge;
function Rt() {
  if (Ge)
    return ge;
  Ge = 1;
  var c = Ze, g = Symbol.for("react.element"), E = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, R = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Y(M, h, T) {
    var u, m = {}, _ = null, W = null;
    T !== void 0 && (_ = "" + T), h.key !== void 0 && (_ = "" + h.key), h.ref !== void 0 && (W = h.ref);
    for (u in h)
      d.call(h, u) && !x.hasOwnProperty(u) && (m[u] = h[u]);
    if (M && M.defaultProps)
      for (u in h = M.defaultProps, h)
        m[u] === void 0 && (m[u] = h[u]);
    return { $$typeof: g, type: M, key: _, ref: W, props: m, _owner: R.current };
  }
  return ge.Fragment = E, ge.jsx = Y, ge.jsxs = Y, ge;
}
var he = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function wt() {
  return ze || (ze = 1, process.env.NODE_ENV !== "production" && function() {
    var c = Ze, g = Symbol.for("react.element"), E = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), Y = Symbol.for("react.provider"), M = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), l = Symbol.iterator, Z = "@@iterator";
    function V(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = l && e[l] || e[Z];
      return typeof t == "function" ? t : null;
    }
    var j = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(e) {
      {
        for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
          r[a - 1] = arguments[a];
        L("error", e, r);
      }
    }
    function L(e, t, r) {
      {
        var a = j.ReactDebugCurrentFrame, v = a.getStackAddendum();
        v !== "" && (t += "%s", r = r.concat([v]));
        var y = r.map(function(f) {
          return String(f);
        });
        y.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var be = !1, B = !1, pe = !1, ie = !1, $ = !1, S;
    S = Symbol.for("react.module.reference");
    function se(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === d || e === x || $ || e === R || e === T || e === u || ie || e === W || be || B || pe || typeof e == "object" && e !== null && (e.$$typeof === _ || e.$$typeof === m || e.$$typeof === Y || e.$$typeof === M || e.$$typeof === h || e.$$typeof === S || e.getModuleId !== void 0));
    }
    function ce(e, t, r) {
      var a = e.displayName;
      if (a)
        return a;
      var v = t.displayName || t.name || "";
      return v !== "" ? r + "(" + v + ")" : r;
    }
    function q(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case d:
          return "Fragment";
        case E:
          return "Portal";
        case x:
          return "Profiler";
        case R:
          return "StrictMode";
        case T:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case M:
            var t = e;
            return q(t) + ".Consumer";
          case Y:
            var r = e;
            return q(r._context) + ".Provider";
          case h:
            return ce(e, e.render, "ForwardRef");
          case m:
            var a = e.displayName || null;
            return a !== null ? a : k(e.type) || "Memo";
          case _: {
            var v = e, y = v._payload, f = v._init;
            try {
              return k(f(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var J = Object.assign, P = 0, X, ue, le, ye, me, fe, de;
    function Ee() {
    }
    Ee.__reactDisabledLog = !0;
    function Re() {
      {
        if (P === 0) {
          X = console.log, ue = console.info, le = console.warn, ye = console.error, me = console.group, fe = console.groupCollapsed, de = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        P++;
      }
    }
    function we() {
      {
        if (P--, P === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: J({}, e, {
              value: X
            }),
            info: J({}, e, {
              value: ue
            }),
            warn: J({}, e, {
              value: le
            }),
            error: J({}, e, {
              value: ye
            }),
            group: J({}, e, {
              value: me
            }),
            groupCollapsed: J({}, e, {
              value: fe
            }),
            groupEnd: J({}, e, {
              value: de
            })
          });
        }
        P < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Q = j.ReactCurrentDispatcher, ee;
    function z(e, t, r) {
      {
        if (ee === void 0)
          try {
            throw Error();
          } catch (v) {
            var a = v.stack.trim().match(/\n( *(at )?)/);
            ee = a && a[1] || "";
          }
        return `
` + ee + e;
      }
    }
    var te = !1, re;
    {
      var Ce = typeof WeakMap == "function" ? WeakMap : Map;
      re = new Ce();
    }
    function De(e, t) {
      if (!e || te)
        return "";
      {
        var r = re.get(e);
        if (r !== void 0)
          return r;
      }
      var a;
      te = !0;
      var v = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = Q.current, Q.current = null, Re();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (G) {
              a = G;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (G) {
              a = G;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (G) {
            a = G;
          }
          e();
        }
      } catch (G) {
        if (G && a && typeof G.stack == "string") {
          for (var s = G.stack.split(`
`), O = a.stack.split(`
`), b = s.length - 1, C = O.length - 1; b >= 1 && C >= 0 && s[b] !== O[C]; )
            C--;
          for (; b >= 1 && C >= 0; b--, C--)
            if (s[b] !== O[C]) {
              if (b !== 1 || C !== 1)
                do
                  if (b--, C--, C < 0 || s[b] !== O[C]) {
                    var A = `
` + s[b].replace(" at new ", " at ");
                    return e.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", e.displayName)), typeof e == "function" && re.set(e, A), A;
                  }
                while (b >= 1 && C >= 0);
              break;
            }
        }
      } finally {
        te = !1, Q.current = y, we(), Error.prepareStackTrace = v;
      }
      var oe = e ? e.displayName || e.name : "", Ve = oe ? z(oe) : "";
      return typeof e == "function" && re.set(e, Ve), Ve;
    }
    function Te(e, t, r) {
      return De(e, !1);
    }
    function n(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function i(e, t, r) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return De(e, n(e));
      if (typeof e == "string")
        return z(e);
      switch (e) {
        case T:
          return z("Suspense");
        case u:
          return z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case h:
            return Te(e.render);
          case m:
            return i(e.type, t, r);
          case _: {
            var a = e, v = a._payload, y = a._init;
            try {
              return i(y(v), t, r);
            } catch {
            }
          }
        }
      return "";
    }
    var o = Object.prototype.hasOwnProperty, F = {}, I = j.ReactDebugCurrentFrame;
    function p(e) {
      if (e) {
        var t = e._owner, r = i(e.type, e._source, t ? t.type : null);
        I.setExtraStackFrame(r);
      } else
        I.setExtraStackFrame(null);
    }
    function _e(e, t, r, a, v) {
      {
        var y = Function.call.bind(o);
        for (var f in e)
          if (y(e, f)) {
            var s = void 0;
            try {
              if (typeof e[f] != "function") {
                var O = Error((a || "React class") + ": " + r + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              s = e[f](t, f, a, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              s = b;
            }
            s && !(s instanceof Error) && (p(v), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", r, f, typeof s), p(null)), s instanceof Error && !(s.message in F) && (F[s.message] = !0, p(v), w("Failed %s type: %s", r, s.message), p(null));
          }
      }
    }
    var ne = Array.isArray;
    function D(e) {
      return ne(e);
    }
    function tt(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, r = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return r;
      }
    }
    function rt(e) {
      try {
        return Fe(e), !1;
      } catch {
        return !0;
      }
    }
    function Fe(e) {
      return "" + e;
    }
    function Me(e) {
      if (rt(e))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tt(e)), Fe(e);
    }
    var ve = j.ReactCurrentOwner, nt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ie, Ne, Se;
    Se = {};
    function at(e) {
      if (o.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ot(e) {
      if (o.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function it(e, t) {
      if (typeof e.ref == "string" && ve.current && t && ve.current.stateNode !== t) {
        var r = k(ve.current.type);
        Se[r] || (w('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(ve.current.type), e.ref), Se[r] = !0);
      }
    }
    function st(e, t) {
      {
        var r = function() {
          Ie || (Ie = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        r.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: r,
          configurable: !0
        });
      }
    }
    function ct(e, t) {
      {
        var r = function() {
          Ne || (Ne = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        r.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: r,
          configurable: !0
        });
      }
    }
    var ut = function(e, t, r, a, v, y, f) {
      var s = {
        $$typeof: g,
        type: e,
        key: t,
        ref: r,
        props: f,
        _owner: y
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: v
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function lt(e, t, r, a, v) {
      {
        var y, f = {}, s = null, O = null;
        r !== void 0 && (Me(r), s = "" + r), ot(t) && (Me(t.key), s = "" + t.key), at(t) && (O = t.ref, it(t, v));
        for (y in t)
          o.call(t, y) && !nt.hasOwnProperty(y) && (f[y] = t[y]);
        if (e && e.defaultProps) {
          var b = e.defaultProps;
          for (y in b)
            f[y] === void 0 && (f[y] = b[y]);
        }
        if (s || O) {
          var C = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && st(f, C), O && ct(f, C);
        }
        return ut(e, s, O, v, a, ve.current, f);
      }
    }
    var ke = j.ReactCurrentOwner, Le = j.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var t = e._owner, r = i(e.type, e._source, t ? t.type : null);
        Le.setExtraStackFrame(r);
      } else
        Le.setExtraStackFrame(null);
    }
    var xe;
    xe = !1;
    function Pe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === g;
    }
    function Ae() {
      {
        if (ke.current) {
          var e = k(ke.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ft(e) {
      {
        if (e !== void 0) {
          var t = e.fileName.replace(/^.*[\\\/]/, ""), r = e.lineNumber;
          return `

Check your code at ` + t + ":" + r + ".";
        }
        return "";
      }
    }
    var We = {};
    function dt(e) {
      {
        var t = Ae();
        if (!t) {
          var r = typeof e == "string" ? e : e.displayName || e.name;
          r && (t = `

Check the top-level render call using <` + r + ">.");
        }
        return t;
      }
    }
    function $e(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var r = dt(t);
        if (We[r])
          return;
        We[r] = !0;
        var a = "";
        e && e._owner && e._owner !== ke.current && (a = " It was passed a child from " + k(e._owner.type) + "."), ae(e), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', r, a), ae(null);
      }
    }
    function Xe(e, t) {
      {
        if (typeof e != "object")
          return;
        if (D(e))
          for (var r = 0; r < e.length; r++) {
            var a = e[r];
            Pe(a) && $e(a, t);
          }
        else if (Pe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var v = V(e);
          if (typeof v == "function" && v !== e.entries)
            for (var y = v.call(e), f; !(f = y.next()).done; )
              Pe(f.value) && $e(f.value, t);
        }
      }
    }
    function vt(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var r;
        if (typeof t == "function")
          r = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === h || t.$$typeof === m))
          r = t.propTypes;
        else
          return;
        if (r) {
          var a = k(t);
          _e(r, e.props, "prop", a, e);
        } else if (t.PropTypes !== void 0 && !xe) {
          xe = !0;
          var v = k(t);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", v || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gt(e) {
      {
        for (var t = Object.keys(e.props), r = 0; r < t.length; r++) {
          var a = t[r];
          if (a !== "children" && a !== "key") {
            ae(e), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), ae(null);
            break;
          }
        }
        e.ref !== null && (ae(e), w("Invalid attribute `ref` supplied to `React.Fragment`."), ae(null));
      }
    }
    function Ue(e, t, r, a, v, y) {
      {
        var f = se(e);
        if (!f) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = ft(v);
          O ? s += O : s += Ae();
          var b;
          e === null ? b = "null" : D(e) ? b = "array" : e !== void 0 && e.$$typeof === g ? (b = "<" + (k(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : b = typeof e, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", b, s);
        }
        var C = lt(e, t, r, v, y);
        if (C == null)
          return C;
        if (f) {
          var A = t.children;
          if (A !== void 0)
            if (a)
              if (D(A)) {
                for (var oe = 0; oe < A.length; oe++)
                  Xe(A[oe], e);
                Object.freeze && Object.freeze(A);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Xe(A, e);
        }
        return e === d ? gt(C) : vt(C), C;
      }
    }
    function ht(e, t, r) {
      return Ue(e, t, r, !0);
    }
    function pt(e, t, r) {
      return Ue(e, t, r, !1);
    }
    var yt = pt, mt = ht;
    he.Fragment = d, he.jsx = yt, he.jsxs = mt;
  }()), he;
}
(function(c) {
  process.env.NODE_ENV === "production" ? c.exports = Rt() : c.exports = wt();
})(je);
const N = je.exports.jsx, Ye = je.exports.jsxs, Ct = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"], Ke = H(new Date()), He = 40;
function St(c) {
  const {
    defaultCheckedDate: g,
    dayCheckedCb: E,
    defaultCheckedRange: d,
    rangeCheckedCb: R,
    isRange: x = !1
  } = c, [Y, M] = U(2021), [h, T] = U(2), [u, m] = U(new Date()), [_, W] = U(H(new Date())), [l, Z] = U([]), [V, j] = U([]), [w, L] = U(0), [be, B] = U(0), pe = K(null), ie = K(null), $ = K(0), S = K({
    pageX: 0,
    pageY: 0,
    distanceX: 0,
    distanceY: 0
  }), se = K(!0), ce = K(!1), q = K(null), [k, J] = U(!1), [P, X] = U(0), ue = () => {
    var F;
    const n = [], i = u.getFullYear(), o = u.getMonth() + 1;
    M(i), T(o);
    for (let I = 0; I < 3; I++)
      n[I] = Dt(i, o - 2 + I, _, x, l);
    j(n), L(0), B(-$.current), x ? ((F = l[0]) == null ? void 0 : F.getFullYear()) === u.getFullYear() && l[0].getMonth() === u.getMonth() && m(l[0]) : _.getFullYear() === u.getFullYear() && _.getMonth() === u.getMonth() && m(_);
  }, le = () => {
    const n = [], i = u.getFullYear(), o = u.getMonth() + 1, F = u.getDate(), I = u.getDay();
    M(i), T(o);
    for (let p = 0; p < 3; p++) {
      let _e = [];
      for (let ne = 0; ne < 7; ne++) {
        let D = new Date(i, o - 1, F, 0, 0, 0);
        D.setDate(D.getDate() - 7 * (1 - p) - (I - ne)), _e[ne] = {
          date: D,
          dataDayString: et(D),
          dates: D.getDate(),
          isToday: +new Date(D) == +Ke,
          isFirstDay: D.getFullYear() - i === 0 && D.getMonth() + 1 - o === 0 && D.getDate() === 1,
          isLastDay: D.getFullYear() - i === 0 && D.getMonth() + 1 - o === 0 && D.getDate() === Qe(i, o),
          isInvalidDay: D.getFullYear() - i != 0 || D.getMonth() + 1 - o != 0,
          isLessThanToday: D < Ke,
          active: !x && +D - +_ === 0,
          isStartDayChecked: x && !!l[0] && +l[0] - +D === 0,
          isEndDayChecked: !!l[1] && +l[1] - +D === 0,
          range: x && !!l[0] && !!l[1] && +D - +l[0] >= 0 && +l[1] - +D >= 0
        };
      }
      n[p] = _e;
    }
    j(n), L(0), B(-$.current);
  }, ye = () => {
    const n = new Date(Y - 1, h - 1, 1, 0, 0, 0);
    m(n), X(P + 1);
  }, me = () => {
    let n = new Date(Y + 1, h - 1, 1, 0, 0, 0);
    m(n), X(P + 1);
  }, fe = () => {
    const n = new Date(Y, h - 2, 1, 0, 0, 0);
    m(n), X(P + 1);
  }, de = () => {
    let n = new Date(Y, h, 1, 0, 0, 0);
    m(n), X(P + 1);
  }, Ee = () => {
    const n = u == null ? void 0 : u.setDate(u.getDate() - 7);
    m(new Date(n)), X(P + 1);
  }, Re = () => {
    const n = u == null ? void 0 : u.setDate(u.getDate() + 7);
    m(new Date(n)), X(P + 1);
  }, we = (n) => {
    ce.current = !0, S.current = {
      pageX: n.clientX,
      pageY: n.clientY,
      distanceX: 0,
      distanceY: 0
    }, document.addEventListener("mousemove", ee, !1), document.addEventListener("mouseup", te, !1);
  }, Q = (n) => {
    L(0);
    const i = n.touches[0].pageX, o = n.touches[0].pageY;
    if (se.current)
      se.current = !1, S.current = {
        pageX: i,
        pageY: o,
        distanceX: 0,
        distanceY: 0
      };
    else {
      const F = i - S.current.pageX, I = o - S.current.pageY, p = bt({
        x: S.current.pageX,
        y: S.current.pageY
      }, {
        x: i,
        y: o
      });
      (p > 0 && p < 45 || p > 315 && p < 360 || p > 135 && p < 215) && n.preventDefault(), S.current = {
        ...S.current,
        distanceX: F,
        distanceY: I
      }, B(-$.current + F);
    }
  }, ee = (n) => {
    if (!ce.current)
      return;
    const i = n.clientX - S.current.pageX, o = n.clientY - S.current.pageY;
    S.current = {
      ...S.current,
      distanceX: i,
      distanceY: o
    }, L(0), B(-$.current + i);
  }, z = () => {
    se.current = !0, ce.current = !1, S.current.distanceX > He ? (q.current = k ? Ee : fe, L(400), B(0)) : S.current.distanceX < -He ? (q.current = k ? Re : de, L(400), B(-$.current * 2)) : (L(0), q.current = null, B(-$.current)), S.current = {
      pageX: 0,
      pageY: 0,
      distanceX: 0,
      distanceY: 0
    };
  }, te = () => {
    z(), document.removeEventListener("mousemove", ee, !1), document.removeEventListener("mouseup", te, !1);
  }, re = () => {
    var n;
    (n = q.current) == null || n.call(q);
  }, Ce = (n, i, o) => {
    const F = [...o];
    for (const I of F)
      for (const p of I)
        p.range = !1, p.isStartDayChecked = !1, p.isEndDayChecked = !1, n && +p.date - +n === 0 && (p.isStartDayChecked = !0), i && +p.date - +i === 0 && (p.isEndDayChecked = !0), n && i && +p.date - +n >= 0 && +p.date - +i <= 0 && (p.range = !0);
    return F;
  }, De = (n) => {
    n.isInvalidDay || (x ? (!l[0] && !l[1] ? (n.isStartDayChecked = !0, l[0] = n.date) : l[0] && !l[1] ? +n.date - +l[0] <= 0 ? (l[0] = n.date, n.isStartDayChecked = !0) : (l[1] = n.date, n.isEndDayChecked = !0) : l[0] && l[1] && (n.isStartDayChecked = !0, l[0] = n.date, l[1] = null), j(Ce(l[0], l[1], V)), R && R([l[0], l[1]])) : (V.forEach((i) => {
      i.forEach((o) => {
        o.dataDayString === n.dataDayString ? o.active = !0 : o.active = !1;
      });
    }), W(H(n.date)), j([...V]), E && E(n)), m(n.date));
  }, Te = () => {
    const n = !k;
    n ? le() : ue(), J(n);
  };
  return Et(() => {
    var i;
    const n = ((i = pe.current) == null ? void 0 : i.clientWidth) || 0;
    $.current = n, x ? d && d[0] && d[1] && Oe(d[0]) && Oe(d[1]) && +d[0] - +d[1] < 0 && (Z([H(d[0]), H(d[1])]), m(d[0])) : g && Oe(g) && (m(new Date(g)), W(H(new Date(g)))), X(P + 1);
  }, []), Be(() => {
    P && (k ? le() : ue());
  }, [P]), Be(() => {
    var n;
    return (n = ie.current) == null || n.addEventListener("touchmove", Q, {
      passive: !1
    }), () => {
      var i;
      (i = ie.current) == null || i.removeEventListener("touchmove", Q);
    };
  }, []), /* @__PURE__ */ Ye("div", {
    className: "wh-calender",
    children: [/* @__PURE__ */ Ye("div", {
      className: "header-box",
      children: [/* @__PURE__ */ N("span", {
        className: "year-arrow-left",
        onClick: ye
      }), /* @__PURE__ */ N("span", {
        className: "month-arrow-left",
        onClick: fe
      }), /* @__PURE__ */ Ye("div", {
        className: "header-box-view",
        children: [Y, "-", h <= 9 ? "0" + h : h]
      }), /* @__PURE__ */ N("span", {
        className: "month-arrow-right",
        onClick: de
      }), /* @__PURE__ */ N("span", {
        className: "year-arrow-right",
        onClick: me
      })]
    }), /* @__PURE__ */ N("div", {
      className: "week-box",
      children: Ct.map((n) => /* @__PURE__ */ N("div", {
        className: "week",
        children: n
      }, n))
    }), /* @__PURE__ */ N("div", {
      className: `calender-box ${k ? "up" : ""}`,
      ref: pe,
      children: /* @__PURE__ */ N("div", {
        ref: ie,
        className: "calender-box-inner",
        onTransitionEnd: re,
        onMouseDown: we,
        onTouchEnd: z,
        style: {
          width: $.current * 3,
          transform: "translate3d(" + be + "px, 0, 0)",
          transitionDuration: w + "ms"
        },
        children: V.map((n, i) => /* @__PURE__ */ N("div", {
          className: "item",
          style: {
            width: $.current
          },
          children: n.map((o, F) => /* @__PURE__ */ N("span", {
            className: Je("date", {
              isInvalidDay: o.isInvalidDay,
              active: o.active,
              isStartDayChecked: o.isStartDayChecked,
              isEndDayChecked: o.isEndDayChecked,
              range: o.range
            }),
            onClick: () => De(o),
            "data-date": o.dataDayString,
            children: /* @__PURE__ */ N("span", {
              className: Je("day", {
                isInvalidDay: o.isInvalidDay,
                active: o.active,
                isStartDayChecked: o.isStartDayChecked,
                isEndDayChecked: o.isEndDayChecked,
                range: o.range
              }),
              children: o.dates
            })
          }, o.dataDayString))
        }, i))
      })
    }), /* @__PURE__ */ N("div", {
      className: "show-week",
      children: /* @__PURE__ */ N("span", {
        className: `btn ${k ? "down" : "up"}`,
        onClick: Te
      })
    })]
  });
}
export {
  St as default
};
