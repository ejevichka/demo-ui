var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
const t$4 = globalThis, e$6 = t$4.ShadowRoot && (void 0 === t$4.ShadyCSS || t$4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$3 = Symbol(), o$5 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$6 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$5.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$5.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$5 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$3), i$5 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$3);
}, S$1 = (s2, o2) => {
  if (e$6) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$4.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$3 = e$6 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$5(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$4, defineProperty: e$5, getOwnPropertyDescriptor: h$2, getOwnPropertyNames: r$4, getOwnPropertySymbols: o$4, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$2 = a$1.trustedTypes, l$2 = c$2 ? c$2.emptyScript : "", p$2 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$3 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$2 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i4 = t2;
  switch (s2) {
    case Boolean:
      i4 = null !== t2;
      break;
    case Number:
      i4 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i4 = JSON.parse(t2);
      } catch (t3) {
        i4 = null;
      }
  }
  return i4;
} }, f$1 = (t2, s2) => !i$4(t2, s2), b$1 = { attribute: true, type: String, converter: u$3, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i4 = Symbol(), h2 = this.getPropertyDescriptor(t2, i4, s2);
      void 0 !== h2 && e$5(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i4) {
    const { get: e2, set: r2 } = h$2(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2 == null ? void 0 : e2.call(this);
      r2 == null ? void 0 : r2.call(this, s3), this.requestUpdate(t2, h2, i4);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$4(t3), ...o$4(t3)];
      for (const i4 of s2) this.createProperty(i4, t3[i4]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i4] of s2) this.elementProperties.set(t3, i4);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i4 = this._$Eu(t3, s2);
      void 0 !== i4 && this._$Eh.set(i4, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i4 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i4.unshift(c$3(s3));
    } else void 0 !== s2 && i4.push(c$3(s2));
    return i4;
  }
  static _$Eu(t2, s2) {
    const i4 = s2.attribute;
    return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i4 of s2.keys()) this.hasOwnProperty(i4) && (t2.set(i4, this[i4]), delete this[i4]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i4) {
    this._$AK(t2, i4);
  }
  _$ET(t2, s2) {
    var _a2;
    const i4 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i4);
    if (void 0 !== e2 && true === i4.reflect) {
      const h2 = (void 0 !== ((_a2 = i4.converter) == null ? void 0 : _a2.toAttribute) ? i4.converter : u$3).toAttribute(s2, i4.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2, _b;
    const i4 = this.constructor, e2 = i4._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i4.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u$3;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? ((_b = this._$Ej) == null ? void 0 : _b.get(e2)) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i4, e2 = false, h2) {
    var _a2;
    if (void 0 !== t2) {
      const r2 = this.constructor;
      if (false === e2 && (h2 = this[t2]), i4 ?? (i4 = r2.getPropertyOptions(t2)), !((i4.hasChanged ?? f$1)(h2, s2) || i4.useDefault && i4.reflect && h2 === ((_a2 = this._$Ej) == null ? void 0 : _a2.get(t2)) && !this.hasAttribute(r2._$Eu(t2, i4)))) return;
      this.C(t2, s2, i4);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i4, reflect: e2, wrapped: h2 }, r2) {
    i4 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i4 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i4] of t3) {
        const { wrapped: t4 } = i4, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i4, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t3) => this._$ET(t3, this[t3]))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$2 == null ? void 0 : p$2({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = globalThis, i$3 = (t2) => t2, s$2 = t$3.trustedTypes, e$4 = s$2 ? s$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$1 = "$lit$", o$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$1 = "?" + o$3, r$3 = `<${n$1}>`, l$1 = document, c$1 = () => l$1.createComment(""), a = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u$2 = Array.isArray, d = (t2) => u$2(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), f = "[ 	\n\f\r]", v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y2 = /^(?:script|style|textarea|title)$/i, x = (t2) => (i4, ...s2) => ({ _$litType$: t2, strings: i4, values: s2 }), b = x(1), E = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$1.createTreeWalker(l$1, 129);
function V(t2, i4) {
  if (!u$2(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$4 ? e$4.createHTML(i4) : i4;
}
const N = (t2, i4) => {
  const s2 = t2.length - 1, e2 = [];
  let n3, l2 = 2 === i4 ? "<svg>" : 3 === i4 ? "<math>" : "", c2 = v$1;
  for (let i5 = 0; i5 < s2; i5++) {
    const s3 = t2[i5];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v$1 ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y2.test(u2[2]) && (n3 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n3 ?? v$1, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$1 : c2 === _ || c2 === m$1 ? c2 = v$1 : (c2 = p$1, n3 = void 0);
    const x2 = c2 === p$1 && t2[i5 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v$1 ? s3 + r$3 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h$1 + s3.slice(d2) + o$3 + x2) : s3 + o$3 + (-2 === d2 ? i5 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i4 ? "</svg>" : 3 === i4 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i4 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i4);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i4 || 3 === i4) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$1)) {
          const i5 = v2[a2++], s2 = r2.getAttribute(t3).split(o$3), e3 = /([.?@])?(.*)/.exec(i5);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$3) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y2.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$3), i5 = t3.length - 1;
          if (i5 > 0) {
            r2.textContent = s$2 ? s$2.emptyScript : "";
            for (let s2 = 0; s2 < i5; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i5], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$1) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$3, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$3.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i4) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M$1(t2, i4, s2 = t2, e2) {
  var _a2, _b;
  if (i4 === E) return i4;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = a(i4) ? void 0 : i4._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i4 = M$1(t2, h2._$AS(t2, i4.values), h2, e2)), i4;
}
class R {
  constructor(t2, i4) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i4;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i4 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? l$1).importNode(i4, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n3 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i5;
        2 === r2.type ? i5 = new k(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i5 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i5 = new Z(h2, this, t2)), this._$AV.push(i5), r2 = s2[++n3];
      }
      o2 !== (r2 == null ? void 0 : r2.index) && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l$1, e2;
  }
  p(t2) {
    let i4 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i4), i4 += s2.strings.length - 2) : s2._$AI(t2[i4])), i4++;
  }
}
class k {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i4, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i4, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i4 = this._$AM;
    return void 0 !== i4 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i4.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i4 = this) {
    t2 = M$1(this, t2, i4), a(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l$1.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i4, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i4);
    else {
      const t3 = new R(e2, this), s3 = t3.u(this.options);
      t3.p(i4), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i4 = C.get(t2.strings);
    return void 0 === i4 && C.set(t2.strings, i4 = new S(t2)), i4;
  }
  k(t2) {
    u$2(this._$AH) || (this._$AH = [], this._$AR());
    const i4 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i4.length ? i4.push(s2 = new k(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i4[e2], s2._$AI(h2), e2++;
    e2 < i4.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i4.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$3(t2).nextSibling;
      i$3(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i4, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i4, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i4 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M$1(this, t2, i4, 0), o2 = !a(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = M$1(this, e3[s2 + n3], i4, n3), r2 === E && (r2 = this._$AH[n3]), o2 || (o2 = !a(r2) || r2 !== this._$AH[n3]), r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i4, s2, e2, h2) {
    super(t2, i4, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i4 = this) {
    if ((t2 = M$1(this, t2, i4, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class Z {
  constructor(t2, i4, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M$1(this, t2);
  }
}
const j = { I: k }, B = t$3.litHtmlPolyfillSupport;
B == null ? void 0 : B(S, k), (t$3.litHtmlVersions ?? (t$3.litHtmlVersions = [])).push("3.3.2");
const D = (t2, i4, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i4;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new k(i4.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$1 = globalThis;
let i$2 = class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = D(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return E;
  }
};
i$2._$litElement$ = true, i$2["finalized"] = true, (_a = s$1.litElementHydrateSupport) == null ? void 0 : _a.call(s$1, { LitElement: i$2 });
const o$2 = s$1.litElementPolyfillSupport;
o$2 == null ? void 0 : o$2({ LitElement: i$2 });
(s$1.litElementVersions ?? (s$1.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = { attribute: true, type: String, converter: u$3, reflect: false, hasChanged: f$1 }, r$2 = (t2 = o$1, e2, r2) => {
  const { kind: n3, metadata: i4 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i4);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i4, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2, true, r3);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r$2(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r$1(r2) {
  return n2({ ...r2, state: true, attribute: false });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$3 = (e2, t2, c2) => (c2.configurable = true, c2.enumerable = true, Reflect.decorate && "object" != typeof t2 && Object.defineProperty(e2, t2, c2), c2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$2(e2, r2) {
  return (n3, s2, i4) => {
    const o2 = (t2) => {
      var _a2;
      return ((_a2 = t2.renderRoot) == null ? void 0 : _a2.querySelector(e2)) ?? null;
    };
    return e$3(n3, s2, { get() {
      return o2(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, e$1 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$1 = class i2 {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i4) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i4;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: t } = j, i3 = (o2) => o2, r = (o2) => void 0 === o2.strings, s = () => document.createComment(""), v = (o2, n3, e2) => {
  var _a2;
  const l2 = o2._$AA.parentNode, d2 = void 0 === n3 ? o2._$AB : n3._$AA;
  if (void 0 === e2) {
    const i4 = l2.insertBefore(s(), d2), n4 = l2.insertBefore(s(), d2);
    e2 = new t(i4, n4, o2, o2.options);
  } else {
    const t2 = e2._$AB.nextSibling, n4 = e2._$AM, c2 = n4 !== o2;
    if (c2) {
      let t3;
      (_a2 = e2._$AQ) == null ? void 0 : _a2.call(e2, o2), e2._$AM = o2, void 0 !== e2._$AP && (t3 = o2._$AU) !== n4._$AU && e2._$AP(t3);
    }
    if (t2 !== d2 || c2) {
      let o3 = e2._$AA;
      for (; o3 !== t2; ) {
        const t3 = i3(o3).nextSibling;
        i3(l2).insertBefore(o3, d2), o3 = t3;
      }
    }
  }
  return e2;
}, u$1 = (o2, t2, i4 = o2) => (o2._$AI(t2, i4), o2), m = {}, p = (o2, t2 = m) => o2._$AH = t2, M = (o2) => o2._$AH, h = (o2) => {
  o2._$AR(), o2._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u = (e2, s2, t2) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t2; l2++) r2.set(e2[l2], l2);
  return r2;
}, c = e$1(class extends i$1 {
  constructor(e2) {
    if (super(e2), e2.type !== t$1.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t2) {
    let r2;
    void 0 === t2 ? t2 = s2 : void 0 !== s2 && (r2 = s2);
    const l2 = [], o2 = [];
    let i4 = 0;
    for (const s3 of e2) l2[i4] = r2 ? r2(s3, i4) : i4, o2[i4] = t2(s3, i4), i4++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t2) {
    return this.dt(e2, s2, t2).values;
  }
  update(s2, [t2, r2, c2]) {
    const d2 = M(s2), { values: p$12, keys: a2 } = this.dt(t2, r2, c2);
    if (!Array.isArray(d2)) return this.ut = a2, p$12;
    const h$12 = this.ut ?? (this.ut = []), v$12 = [];
    let m2, y3, x2 = 0, j2 = d2.length - 1, k2 = 0, w = p$12.length - 1;
    for (; x2 <= j2 && k2 <= w; ) if (null === d2[x2]) x2++;
    else if (null === d2[j2]) j2--;
    else if (h$12[x2] === a2[k2]) v$12[k2] = u$1(d2[x2], p$12[k2]), x2++, k2++;
    else if (h$12[j2] === a2[w]) v$12[w] = u$1(d2[j2], p$12[w]), j2--, w--;
    else if (h$12[x2] === a2[w]) v$12[w] = u$1(d2[x2], p$12[w]), v(s2, v$12[w + 1], d2[x2]), x2++, w--;
    else if (h$12[j2] === a2[k2]) v$12[k2] = u$1(d2[j2], p$12[k2]), v(s2, d2[x2], d2[j2]), j2--, k2++;
    else if (void 0 === m2 && (m2 = u(a2, k2, w), y3 = u(h$12, x2, j2)), m2.has(h$12[x2])) if (m2.has(h$12[j2])) {
      const e2 = y3.get(a2[k2]), t3 = void 0 !== e2 ? d2[e2] : null;
      if (null === t3) {
        const e3 = v(s2, d2[x2]);
        u$1(e3, p$12[k2]), v$12[k2] = e3;
      } else v$12[k2] = u$1(t3, p$12[k2]), v(s2, d2[x2], t3), d2[e2] = null;
      k2++;
    } else h(d2[j2]), j2--;
    else h(d2[x2]), x2++;
    for (; k2 <= w; ) {
      const e2 = v(s2, v$12[w + 1]);
      u$1(e2, p$12[k2]), v$12[k2++] = e2;
    }
    for (; x2 <= j2; ) {
      const e2 = d2[x2++];
      null !== e2 && h(e2);
    }
    return this.ut = a2, p(s2, v$12), E;
  }
});
const cssVar = (value) => r$5(value);
const colors = {
  // Slate (neutral)
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  // Amber (default brand)
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f"
  },
  // Blue (bluemarket)
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a"
  },
  // Rose (redmarket / errors)
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337"
  },
  // Orange (brownmarket)
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12"
  },
  // Indigo (default theme)
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81"
  },
  // Emerald (success)
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b"
  },
  white: "#ffffff",
  black: "#000000"
};
const spacing = {
  zero: "0",
  "3xs": "2px",
  "2xs": "4px",
  xs: "8px",
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  "2xl": "32px",
  "3xl": "40px",
  "4xl": "48px",
  "5xl": "64px"
};
const radius = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "999px"
};
const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.07)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
  glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
  glassHeavy: "0 32px 64px rgba(0, 0, 0, 0.25)"
};
const blur = {
  glass: "20px",
  glassHeavy: "40px",
  glassLight: "12px"
};
const typography = {
  fontFamily: "'Onest', system-ui, sans-serif",
  fontSize: {
    xs: "12px",
    sm: "14px",
    base: "14px",
    md: "16px",
    lg: "18px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "24px"
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  },
  lineHeight: {
    tight: "16px",
    normal: "20px",
    relaxed: "24px"
  }
};
const textStyles = {
  headingS: {
    fontFamily: typography.fontFamily,
    fontSize: "18px",
    fontWeight: typography.fontWeight.semibold,
    lineHeight: "24px"
  },
  paragraphM: {
    fontFamily: typography.fontFamily,
    fontSize: "16px",
    fontWeight: typography.fontWeight.normal,
    lineHeight: "24px"
  },
  paragraphMBold: {
    fontFamily: typography.fontFamily,
    fontSize: "16px",
    fontWeight: typography.fontWeight.bold,
    lineHeight: "24px"
  },
  paragraphS: {
    fontFamily: typography.fontFamily,
    fontSize: "14px",
    fontWeight: typography.fontWeight.normal,
    lineHeight: "20px"
  },
  paragraphSMedium: {
    fontFamily: typography.fontFamily,
    fontSize: "14px",
    fontWeight: typography.fontWeight.medium,
    lineHeight: "20px"
  },
  paragraphXS: {
    fontFamily: typography.fontFamily,
    fontSize: "12px",
    fontWeight: typography.fontWeight.normal,
    lineHeight: "16px"
  },
  paragraphXSMedium: {
    fontFamily: typography.fontFamily,
    fontSize: "12px",
    fontWeight: typography.fontWeight.medium,
    lineHeight: "16px"
  }
};
const semantic = {
  background: {
    ghost: colors.white,
    outline: colors.white,
    primary: colors.indigo[600],
    secondary: colors.slate[100],
    separator: colors.slate[200]
  },
  content: {
    primary: colors.indigo[600],
    secondary: colors.slate[600],
    onGhost: colors.slate[800],
    onGhostLow: colors.slate[400],
    onOutline: colors.slate[800],
    onOutlineLow: colors.slate[400],
    onPrimary: colors.indigo[50]
  },
  border: {
    outline: colors.slate[200]
  }
};
const animation = {
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms"
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.22, 1, 0.36, 1)"
  }
};
const themes = {
  default: { primary: colors.indigo, name: "Default" },
  amber: { primary: colors.amber, name: "Amber" },
  blue: { primary: colors.blue, name: "Blue" },
  rose: { primary: colors.rose, name: "Rose" },
  orange: { primary: colors.orange, name: "Orange" }
};
const tokens = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  animation,
  blur,
  colors,
  cssVar,
  radius,
  semantic,
  shadows,
  spacing,
  textStyles,
  themes,
  typography
}, Symbol.toStringTag, { value: "Module" }));
const glassStyles = i$5`
  /* Base glass panel */
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(${r$5(blur.glass)});
    -webkit-backdrop-filter: blur(${r$5(blur.glass)});
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: ${r$5(shadows.glass)};
  }

  .glass-dark {
    background: rgba(23, 20, 33, 0.6);
    backdrop-filter: blur(${r$5(blur.glass)});
    -webkit-backdrop-filter: blur(${r$5(blur.glass)});
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: ${r$5(shadows.glass)};
  }

  /* Heavy blur glass (main containers) */
  .glass-heavy {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(${r$5(blur.glassHeavy)});
    -webkit-backdrop-filter: blur(${r$5(blur.glassHeavy)});
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: ${r$5(shadows.glassHeavy)};
  }

  .glass-heavy-dark {
    background: rgba(23, 20, 33, 0.6);
    backdrop-filter: blur(${r$5(blur.glassHeavy)});
    -webkit-backdrop-filter: blur(${r$5(blur.glassHeavy)});
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: ${r$5(shadows.glassHeavy)};
  }

  /* Nested glass (sidebar, cards) */
  .glass-nested {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(${r$5(blur.glassLight)});
    -webkit-backdrop-filter: blur(${r$5(blur.glassLight)});
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .glass-nested-dark {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(${r$5(blur.glassLight)});
    -webkit-backdrop-filter: blur(${r$5(blur.glassLight)});
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  /* Specular highlight */
  .glass-highlight::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 50%,
      transparent 100%
    );
    pointer-events: none;
    border-radius: inherit;
  }

  /* Liquid overlay for modals */
  .liquid-overlay {
    background: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
`;
const animationStyles = i$5`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.4s ease-out;
  }

  .animate-fade-in-scale {
    animation: fadeInScale 0.3s ease-out;
  }

  .animate-slide-in {
    animation: slideInFromBottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .animate-pulse {
    animation: pulse 0.8s ease-in-out infinite;
  }

  .animate-bounce {
    animation: bounce 0.6s ease-in-out infinite;
  }
`;
const SLIDE_DURATION = 1;
const MORPH_DURATION = 0.7;
const EASING = {
  slide: "cubic-bezier(0.22, 1, 0.36, 1)",
  // Spring-like for slide
  morph: "cubic-bezier(0.22, 1, 0.36, 1)",
  // Spring-like for morph
  content: "ease-out"
  // Content fade
};
const stageAnimationStyles = i$5`
  /* Base container styles with CSS custom properties */
  .chat-container {
    position: fixed;
    z-index: 9999;
    overflow: hidden;

    /* Animatable properties */
    width: var(--chat-width);
    height: var(--chat-height);
    border-radius: var(--chat-radius);

    /* Transitions */
    transition:
      width var(--transition-duration) var(--transition-easing),
      height var(--transition-duration) var(--transition-easing),
      border-radius var(--transition-duration) var(--transition-easing),
      transform var(--transition-duration) var(--transition-easing),
      box-shadow var(--transition-duration) var(--transition-easing),
      left var(--transition-duration) var(--transition-easing),
      right var(--transition-duration) var(--transition-easing),
      bottom var(--transition-duration) var(--transition-easing);
  }

  /* Collapsed: bottom-right corner */
  .chat-container.collapsed {
    --chat-width: 56px;
    --chat-height: 56px;
    --chat-radius: 28px;
    --transition-duration: ${r$5(SLIDE_DURATION)}s;
    --transition-easing: ${r$5(EASING.slide)};

    bottom: 24px;
    right: 24px;
    left: auto;
    transform: none;
    cursor: pointer;
  }

  .chat-container.collapsed:hover {
    transform: scale(1.1);
  }

  .chat-container.collapsed:active {
    transform: scale(0.95);
  }

  /* InputBar: centered horizontally at bottom */
  .chat-container.inputBar {
    --chat-width: min(600px, calc(100vw - 32px));
    --chat-height: 56px;
    --chat-radius: 28px;
    --transition-duration: ${r$5(SLIDE_DURATION)}s;
    --transition-easing: ${r$5(EASING.slide)};

    bottom: 24px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  /* Expanded: centered modal */
  .chat-container.expanded {
    --chat-width: min(782px, calc(100vw - 32px));
    --chat-height: min(532px, calc(100dvh - 100px));
    --chat-radius: ${r$5(radius["xl"])};
    --transition-duration: ${r$5(MORPH_DURATION)}s;
    --transition-easing: ${r$5(EASING.morph)};

    bottom: max(16px, env(safe-area-inset-bottom));
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  /* Mobile: full screen for expanded */
  @media (max-width: 767px) {
    .chat-container.expanded {
      --chat-width: 100vw;
      --chat-height: 100dvh;
      --chat-radius: 0;

      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
    }
  }

  /* Content visibility by stage */
  .stage-content {
    position: absolute;
    inset: 0;
    display: flex;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ${r$5(EASING.content)};
  }

  .stage-content.active {
    opacity: 1;
    pointer-events: auto;
  }

  /* Collapsed content (button) */
  .collapsed-content {
    align-items: center;
    justify-content: center;
  }

  /* InputBar content */
  .inputbar-content {
    align-items: center;
    padding: 0;
    gap: 12px;
  }

  /* Expanded content */
  .expanded-content {
    flex-direction: column;
    overflow: hidden;
  }

  /* Specular highlight effect */
  .specular-highlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 10;
  }

  .specular-highlight::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 30%;
    height: 100%;
    background: linear-gradient(
      105deg,
      transparent 0%,
      rgba(255, 255, 255, 0.12) 45%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0.12) 55%,
      transparent 100%
    );
    opacity: 0;
  }

  .chat-container.transitioning .specular-highlight::before {
    animation: specularSlide var(--transition-duration) ${r$5(EASING.slide)};
  }

  @keyframes specularSlide {
    0% {
      left: -100%;
      opacity: 0;
    }
    20% {
      opacity: 0.5;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      left: 400%;
      opacity: 0;
    }
  }

  /* Backdrop blur for expanded state */
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 9998;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    opacity: 0;
    pointer-events: none;
    transition: opacity ${r$5(MORPH_DURATION * 0.5)}s ease-out;
  }

  .backdrop.visible {
    opacity: 1;
    pointer-events: auto;
  }

  /* Glow effect based on primary color */
  .chat-container.collapsed {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .chat-container.inputBar {
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.2),
      0 0 40px var(--glow-color, rgba(79, 70, 229, 0.15));
  }

  .chat-container.expanded {
    box-shadow:
      0 32px 64px rgba(0, 0, 0, 0.25),
      0 0 80px var(--glow-color, rgba(79, 70, 229, 0.25)),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }
`;
class ChatApiClient {
  constructor(config2) {
    __publicField(this, "config");
    __publicField(this, "abortController", null);
    this.config = config2;
  }
  /**
   * Send a chat message and receive streaming response
   */
  async sendMessage(message, sessionId, callbacks) {
    this.abort();
    this.abortController = new AbortController();
    const url = `${this.config.apiUrl}/api/chat`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
          "Accept": "text/event-stream"
        },
        body: JSON.stringify({
          message,
          sessionId,
          theme: this.config.theme || "default"
        }),
        signal: this.abortController.signal
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType == null ? void 0 : contentType.includes("text/event-stream")) {
        await this.handleSSEStream(response, callbacks);
      } else {
        await this.handleJsonResponse(response, callbacks);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
      callbacks.onError(error);
    }
  }
  /**
   * Handle Server-Sent Events stream
   */
  async handleSSEStream(response, callbacks) {
    var _a2;
    const reader = (_a2 = response.body) == null ? void 0 : _a2.getReader();
    if (!reader) {
      throw new Error("Response body is not readable");
    }
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          callbacks.onComplete();
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              callbacks.onComplete();
              return;
            }
            try {
              const parsed = JSON.parse(data);
              this.handleParsedEvent(parsed, callbacks);
            } catch {
              console.warn("Failed to parse SSE data:", data);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
  /**
   * Handle parsed SSE event
   */
  handleParsedEvent(event, callbacks) {
    switch (event.type) {
      case "chunk":
        if (event.content) {
          callbacks.onChunk(event.content);
        }
        break;
      case "products":
        if (event.items && Array.isArray(event.items)) {
          callbacks.onProducts(event.items);
        }
        break;
      case "suggestions":
        if (event.items && Array.isArray(event.items)) {
          callbacks.onSuggestions(event.items);
        }
        break;
      case "done":
        callbacks.onComplete();
        break;
      case "error":
        callbacks.onError(new Error(event.error || "Unknown error"));
        break;
    }
  }
  /**
   * Handle regular JSON response (fallback for non-streaming)
   */
  async handleJsonResponse(response, callbacks) {
    const data = await response.json();
    if (data.content) {
      const words = data.content.split(" ");
      for (const word of words) {
        callbacks.onChunk(word + " ");
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    }
    if (data.products) {
      callbacks.onProducts(data.products);
    }
    if (data.suggestions) {
      callbacks.onSuggestions(data.suggestions);
    }
    callbacks.onComplete();
  }
  /**
   * Submit feedback for a message
   */
  async submitFeedback(feedback) {
    const url = `${this.config.apiUrl}/api/feedback`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(feedback)
    });
    if (!response.ok) {
      throw new Error(`Feedback submission failed: ${response.status}`);
    }
  }
  /**
   * Abort ongoing request
   */
  abort() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
}
async function mockStreamResponse(message, callbacks) {
  console.log("[mockStreamResponse] Starting mock response for:", message);
  const responses = {
    default: {
      text: "Hello! I'm the Brainform AI assistant. I can help you find products, answer questions, and provide recommendations. What would you like to know?"
    },
    coffee: {
      text: "Great choice! Here are some excellent coffee machines I'd recommend:\n\n**KRUPS Sensation** - Our bestseller with automatic milk frothing\n**KRUPS Evidence** - Premium model with 15 drink recipes\n**KRUPS Nespresso Vertuo** - Perfect for capsule lovers\n\nWould you like more details about any of these?",
      products: [
        {
          id: "1",
          title: "KRUPS Sensation Automatic Espresso",
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop",
          price: 699,
          oldPrice: 899,
          currency: "€",
          description: "Automatic espresso machine with milk frother",
          availability: true
        },
        {
          id: "2",
          title: "KRUPS Evidence One",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
          price: 599,
          oldPrice: 749,
          currency: "€",
          description: "15 drink recipes, touch display",
          availability: true
        },
        {
          id: "3",
          title: "KRUPS Nespresso Vertuo",
          image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop",
          price: 149,
          oldPrice: 199,
          currency: "€",
          description: "Capsule machine with Centrifusion technology",
          availability: true
        }
      ]
    }
  };
  const lowerMessage = message.toLowerCase();
  const responseData = lowerMessage.includes("coffee") || lowerMessage.includes("espresso") || lowerMessage.includes("machine") ? responses.coffee : responses.default;
  console.log("[mockStreamResponse] Using response type:", lowerMessage.includes("coffee") ? "coffee" : "default");
  const words = responseData.text.split(" ");
  console.log("[mockStreamResponse] Streaming", words.length, "words");
  for (let i4 = 0; i4 < words.length; i4++) {
    await new Promise((resolve) => setTimeout(resolve, 40 + Math.random() * 20));
    callbacks.onChunk(words[i4] + (i4 < words.length - 1 ? " " : ""));
  }
  console.log("[mockStreamResponse] Text streaming complete");
  if (responseData.products) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    callbacks.onProducts(responseData.products);
    console.log("[mockStreamResponse] Products sent:", responseData.products.length);
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
  callbacks.onSuggestions([
    "Tell me more about KRUPS Sensation",
    "What's the price range?",
    "Do you have compact models?"
  ]);
  console.log("[mockStreamResponse] Suggestions sent");
  callbacks.onComplete();
  console.log("[mockStreamResponse] Complete!");
}
let config = {
  apiUrl: "/krups-api"
};
function configureKrupsApi(newConfig) {
  config = { ...config, ...newConfig };
  console.log("[KRUPS API] Configured:", {
    apiUrl: config.apiUrl,
    captchaSiteKey: config.captchaSiteKey ? `SET (${config.captchaSiteKey.substring(0, 20)}...)` : "EMPTY"
  });
}
function generateSessionId$1() {
  return `session-${crypto.randomUUID()}`;
}
function generateUserId() {
  return `user-${crypto.randomUUID()}`;
}
const AUTH_STORAGE_KEY = "krups_auth";
function getStoredAuth() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    const auth = JSON.parse(stored);
    if (auth.expiresAt < Date.now() + 5 * 60 * 1e3) {
      console.log("[KRUPS Auth] Token expired, clearing");
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return auth;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}
function saveAuth(auth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  console.log("[KRUPS Auth] Token saved, expires:", new Date(auth.expiresAt).toISOString());
}
function clearAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
let captchaScriptLoaded = false;
let captchaScriptLoading = null;
function loadCaptchaScript() {
  if (captchaScriptLoaded && window.smartCaptcha) {
    return Promise.resolve();
  }
  if (captchaScriptLoading) {
    return captchaScriptLoading;
  }
  console.log("[KRUPS Auth] Loading CAPTCHA script...");
  captchaScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://smartcaptcha.yandexcloud.net/captcha.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("[KRUPS Auth] CAPTCHA script loaded");
      captchaScriptLoaded = true;
      resolve();
    };
    script.onerror = () => {
      console.error("[KRUPS Auth] Failed to load CAPTCHA script");
      captchaScriptLoading = null;
      reject(new Error("Failed to load CAPTCHA script"));
    };
    document.head.appendChild(script);
  });
  return captchaScriptLoading;
}
async function getCaptchaToken() {
  console.log("[KRUPS API] getCaptchaToken called, config.captchaSiteKey:", config.captchaSiteKey ? "SET" : "EMPTY");
  if (!config.captchaSiteKey) {
    throw new Error("CAPTCHA site key not configured");
  }
  await loadCaptchaScript();
  let attempts = 0;
  while (!window.smartCaptcha && attempts < 50) {
    await new Promise((r2) => setTimeout(r2, 100));
    attempts++;
  }
  if (!window.smartCaptcha) {
    throw new Error("SmartCaptcha not available after loading");
  }
  console.log("[KRUPS Auth] Getting CAPTCHA token (invisible mode)...");
  return new Promise((resolve, reject) => {
    const containerId = `captcha-${Date.now()}`;
    const container = document.createElement("div");
    container.id = containerId;
    container.style.display = "none";
    document.body.appendChild(container);
    try {
      window.smartCaptcha.render(containerId, {
        sitekey: config.captchaSiteKey,
        invisible: true,
        callback: (token) => {
          console.log("[KRUPS Auth] CAPTCHA token received");
          container.remove();
          resolve(token);
        },
        "error-callback": () => {
          console.error("[KRUPS Auth] CAPTCHA verification failed");
          container.remove();
          reject(new Error("CAPTCHA verification failed"));
        }
      });
    } catch (err) {
      container.remove();
      reject(err);
      return;
    }
    setTimeout(() => {
      var _a2;
      console.log("[KRUPS Auth] Executing CAPTCHA...");
      (_a2 = window.smartCaptcha) == null ? void 0 : _a2.execute();
    }, 500);
  });
}
async function createUser() {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const generatedUserId = generateUserId();
  console.log("[KRUPS Auth] Creating user:", generatedUserId);
  const captchaToken = await getCaptchaToken();
  console.log("[KRUPS Auth] CAPTCHA token length:", captchaToken == null ? void 0 : captchaToken.length);
  const requestBody = {
    userId: generatedUserId,
    captchaToken,
    isAnonymous: true
  };
  const fetchUrl = `${config.apiUrl}/auth/create-user`;
  console.log("[KRUPS Auth] >>> FETCHING URL:", fetchUrl);
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("[KRUPS Auth] Create user failed:", response.status);
    throw new Error(`Failed to create user: ${response.status} - ${errorText || "Server error"}`);
  }
  const data = await response.json();
  console.log("[KRUPS Auth] User created successfully");
  const returnedUserId = ((_a2 = data.result) == null ? void 0 : _a2.userId) || ((_c = (_b = data.result) == null ? void 0 : _b.user) == null ? void 0 : _c.userId) || ((_d = data.user) == null ? void 0 : _d.userId) || data.userId || generatedUserId;
  const accessToken = ((_e = data.result) == null ? void 0 : _e.accessToken) || ((_g = (_f = data.result) == null ? void 0 : _f.token) == null ? void 0 : _g.accessToken) || ((_h = data.token) == null ? void 0 : _h.accessToken) || data.accessToken;
  if (!accessToken) {
    console.error("[KRUPS Auth] Invalid response structure - missing accessToken:", data);
    throw new Error("Invalid response from create-user endpoint: missing accessToken");
  }
  const auth = {
    userId: returnedUserId,
    accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1e3
    // 23 hours
  };
  saveAuth(auth);
  return auth;
}
async function refreshToken(userId) {
  console.log("[KRUPS Auth] Refreshing token for:", userId);
  const response = await fetch(`${config.apiUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId })
  });
  if (!response.ok) {
    console.log("[KRUPS Auth] Token refresh failed, need to re-authenticate");
    clearAuth();
    return createUser();
  }
  const data = await response.json();
  console.log("[KRUPS Auth] Token refreshed successfully");
  const auth = {
    userId,
    accessToken: data.result.token.accessToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1e3
  };
  saveAuth(auth);
  return auth;
}
async function getValidAuth() {
  const existingAuth = getStoredAuth();
  if (existingAuth) {
    console.log("[KRUPS Auth] Using existing token");
    return existingAuth;
  }
  return createUser();
}
async function authFetch(url, options = {}) {
  const auth = await getValidAuth();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Authorization": `Bearer ${auth.accessToken}`
    }
  });
  if (response.status === 401) {
    console.log("[KRUPS Auth] Got 401, refreshing token...");
    const newAuth = await refreshToken(auth.userId);
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Bearer ${newAuth.accessToken}`
      }
    });
  }
  return response;
}
function transformProduct(doc) {
  const oldPrice = doc.oldPrice || doc.priceOld || doc.price || 0;
  const newPrice = doc.price || 0;
  return {
    id: doc.id,
    title: doc.title,
    image: doc.imageUrl || doc.image || "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop",
    oldPrice,
    price: newPrice,
    currency: "€",
    discount: oldPrice > newPrice ? `-${Math.round((1 - newPrice / oldPrice) * 100)}%` : void 0,
    description: doc.description,
    availability: doc.availability
  };
}
let currentSession = null;
function getCurrentSession() {
  if (!currentSession) {
    currentSession = {
      sessionId: generateSessionId$1(),
      products: []
    };
  }
  return currentSession;
}
async function checkQuery(question, sessionId) {
  const auth = await getValidAuth();
  console.log("[KRUPS API] checkQuery:", { question, sessionId });
  const response = await authFetch(`${config.apiUrl}/checkQuery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      sessionId,
      userId: auth.userId,
      isAnonymous: true
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`checkQuery failed: ${response.status} - ${error}`);
  }
  const data = await response.json();
  console.log("[KRUPS API] checkQuery result:", data.result);
  return data.result;
}
async function findProducts(question, sessionId) {
  var _a2;
  const auth = await getValidAuth();
  console.log("[KRUPS API] findProducts:", { question, sessionId });
  const response = await authFetch(`${config.apiUrl}/findProducts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      sessionId,
      userId: auth.userId,
      limit: 10
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`findProducts failed: ${response.status} - ${error}`);
  }
  const data = await response.json();
  console.log("[KRUPS API] findProducts result:", (_a2 = data.result.documents) == null ? void 0 : _a2.length, "products");
  const products = (data.result.documents || []).map(transformProduct);
  const session = getCurrentSession();
  session.products = products;
  return products;
}
const API_TIMEOUT = 6e4;
async function generateAnswerStream(sessionId, callbacks) {
  var _a2, _b, _c, _d;
  const completeStream = async (fullMessage2, products, messageId) => {
    console.log("[KRUPS API] completeStream called");
    callbacks.onComplete(fullMessage2, products, messageId);
    console.log("[KRUPS API] onComplete called, checking for onSuggestionsReceived:", !!callbacks.onSuggestionsReceived);
    if (callbacks.onSuggestionsReceived) {
      console.log("[KRUPS API] Fetching suggestions...");
      const suggestions = await getKrupsSuggestions();
      console.log("[KRUPS API] Suggestions received:", suggestions);
      callbacks.onSuggestionsReceived(suggestions);
      console.log("[KRUPS API] onSuggestionsReceived callback invoked");
    }
  };
  const auth = await getValidAuth();
  console.log("[KRUPS API] generateAnswer (streaming):", { sessionId });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.warn("[KRUPS API] Request timeout after", API_TIMEOUT, "ms");
    controller.abort();
  }, API_TIMEOUT);
  let response;
  try {
    response = await fetch(`${config.apiUrl}/generateAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "Authorization": `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({
        sessionId,
        userId: auth.userId
      }),
      signal: controller.signal
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - please try again");
    }
    throw error;
  }
  if (!response.ok) {
    clearTimeout(timeoutId);
    const error = await response.text();
    throw new Error(`generateAnswer failed: ${response.status} - ${error}`);
  }
  const reader = (_a2 = response.body) == null ? void 0 : _a2.getReader();
  if (!reader) {
    clearTimeout(timeoutId);
    throw new Error("No response body");
  }
  const decoder = new TextDecoder();
  let fullMessage = "";
  let apiMessageId;
  console.log("[KRUPS API] Starting to read stream...");
  clearTimeout(timeoutId);
  let streamTimeoutId = null;
  const resetStreamTimeout = () => {
    if (streamTimeoutId) clearTimeout(streamTimeoutId);
    streamTimeoutId = setTimeout(() => {
      console.warn("[KRUPS API] Stream timeout - no data received");
      reader.cancel();
    }, 45e3);
  };
  resetStreamTimeout();
  try {
    while (true) {
      const { done, value } = await reader.read();
      resetStreamTimeout();
      if (done) {
        console.log("[KRUPS API] Stream done, fullMessage length:", fullMessage.length);
        console.log("[KRUPS API] Breaking out of stream loop...");
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            const session = getCurrentSession();
            await completeStream(fullMessage, session.products, apiMessageId);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.messageId) {
              apiMessageId = parsed.messageId;
              console.log("[KRUPS API] Captured messageId:", apiMessageId);
            } else if (parsed.id) {
              apiMessageId = parsed.id;
              console.log("[KRUPS API] Captured id as messageId:", apiMessageId);
            } else if ((_b = parsed.result) == null ? void 0 : _b.messageId) {
              apiMessageId = parsed.result.messageId;
              console.log("[KRUPS API] Captured result.messageId:", apiMessageId);
              if (fullMessage) {
                console.log("[KRUPS API] result.messageId received with content, completing stream");
                const session = getCurrentSession();
                await completeStream(fullMessage, session.products, apiMessageId);
                return;
              }
            } else if ((_c = parsed.result) == null ? void 0 : _c.id) {
              apiMessageId = parsed.result.id;
              console.log("[KRUPS API] Captured result.id as messageId:", apiMessageId);
            }
            if (parsed.message) {
              fullMessage += parsed.message;
              callbacks.onChunk(parsed.message);
            } else if (parsed.type === "content" && parsed.text) {
              fullMessage += parsed.text;
              callbacks.onChunk(parsed.text);
            } else if ((_d = parsed.result) == null ? void 0 : _d.answer) {
              if (!fullMessage) {
                fullMessage = parsed.result.answer;
              }
              const session = getCurrentSession();
              await completeStream(fullMessage, session.products, apiMessageId);
              return;
            } else if (parsed.type === "done") {
              const session = getCurrentSession();
              await completeStream(fullMessage, session.products, apiMessageId);
              return;
            } else if (parsed.content) {
              fullMessage += parsed.content;
              callbacks.onChunk(parsed.content);
            }
          } catch {
            if (data.trim()) {
              fullMessage += data;
              callbacks.onChunk(data);
            }
          }
        }
      }
    }
  } finally {
    if (streamTimeoutId) clearTimeout(streamTimeoutId);
  }
  console.log("[KRUPS API] After stream loop, calling completeStream");
  try {
    const session = getCurrentSession();
    await completeStream(fullMessage, session.products, apiMessageId);
    console.log("[KRUPS API] completeStream finished successfully");
  } catch (err) {
    console.error("[KRUPS API] completeStream error:", err);
    throw err;
  }
}
async function getKrupsSuggestions() {
  var _a2;
  try {
    const auth = await getValidAuth();
    const session = getCurrentSession();
    const response = await authFetch(`${config.apiUrl}/generateSuggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sessionId: session.sessionId,
        userId: auth.userId
      })
    });
    if (!response.ok) {
      console.warn("[KRUPS API] generateSuggestions failed:", response.status);
      return [];
    }
    const data = await response.json();
    console.log("[KRUPS API] generateSuggestions raw response:", JSON.stringify(data));
    const suggestions = ((_a2 = data.result) == null ? void 0 : _a2.suggestions) || data.suggestions || [];
    console.log("[KRUPS API] Parsed suggestions:", suggestions);
    return suggestions;
  } catch (error) {
    console.error("[KRUPS API] generateSuggestions error:", error);
    return [];
  }
}
async function submitKrupsFeedback(feedback) {
  try {
    await getValidAuth();
    const session = getCurrentSession();
    const isFrontendId = feedback.messageId.startsWith("assistant-") || feedback.messageId.startsWith("user-") || feedback.messageId === "welcome";
    if (isFrontendId) {
      console.warn("[KRUPS API] submitFeedback: messageId is frontend-generated, API may not recognize it:", feedback.messageId);
    }
    console.log("[KRUPS API] submitFeedback:", {
      sessionId: session.sessionId,
      messageId: feedback.messageId,
      isPositive: feedback.isPositive,
      isFrontendGeneratedId: isFrontendId
    });
    const response = await authFetch(
      `${config.apiUrl}/sessions/${session.sessionId}/messages/${feedback.messageId}/feedback`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isPositive: feedback.isPositive,
          comment: feedback.comment
        })
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.warn("[KRUPS API] submitFeedback failed:", response.status, errorText);
      if (response.status === 404 && isFrontendId) {
        console.warn("[KRUPS API] submitFeedback: 404 is expected for frontend-generated messageId. The API needs to return a real messageId in the stream response.");
      }
    } else {
      console.log("[KRUPS API] submitFeedback success");
    }
  } catch (error) {
    console.error("[KRUPS API] submitFeedback error:", error);
  }
}
async function sendKrupsMessage(message, callbacks) {
  try {
    const session = getCurrentSession();
    await checkQuery(message, session.sessionId);
    await findProducts(message, session.sessionId);
    await generateAnswerStream(session.sessionId, callbacks);
  } catch (error) {
    console.error("[KRUPS API] Error:", error);
    callbacks.onError(error instanceof Error ? error : new Error("Unknown error"));
  }
}
const SESSIONS_KEY_PREFIX = "chat_sessions_";
const MAX_SESSIONS = 20;
function generateSessionId() {
  return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function getTitleFromMessages(messages) {
  const firstUserMessage = messages.find((m2) => m2.role === "user");
  if (firstUserMessage == null ? void 0 : firstUserMessage.content) {
    const text = firstUserMessage.content.slice(0, 40);
    return text.length < firstUserMessage.content.length ? `${text}...` : text;
  }
  return "New chat";
}
function getThemeSessions(themeName) {
  try {
    const stored = localStorage.getItem(`${SESSIONS_KEY_PREFIX}${themeName}`);
    if (!stored) {
      return { activeSessionId: null, sessions: [] };
    }
    return JSON.parse(stored);
  } catch {
    return { activeSessionId: null, sessions: [] };
  }
}
function saveThemeSessions(themeName, data) {
  try {
    localStorage.setItem(`${SESSIONS_KEY_PREFIX}${themeName}`, JSON.stringify(data));
  } catch (error) {
    console.warn(`[ChatHistory] Failed to save sessions for ${themeName}:`, error);
  }
}
function deserializeSession(session) {
  return {
    ...session,
    messages: session.messages.map((m2) => ({
      ...m2,
      timestamp: typeof m2.timestamp === "string" ? new Date(m2.timestamp) : m2.timestamp
    }))
  };
}
function getActiveSession(themeName) {
  const data = getThemeSessions(themeName);
  if (!data.activeSessionId) return null;
  const session = data.sessions.find((s2) => s2.id === data.activeSessionId);
  return session ? deserializeSession(session) : null;
}
function createNewSession(themeName) {
  const data = getThemeSessions(themeName);
  const newSession = {
    id: generateSessionId(),
    title: "New chat",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: []
  };
  data.sessions.unshift(newSession);
  if (data.sessions.length > MAX_SESSIONS) {
    data.sessions = data.sessions.slice(0, MAX_SESSIONS);
  }
  data.activeSessionId = newSession.id;
  saveThemeSessions(themeName, data);
  return newSession;
}
function updateActiveSession(themeName, messages) {
  let data = getThemeSessions(themeName);
  if (!data.activeSessionId) {
    createNewSession(themeName);
    data = getThemeSessions(themeName);
  }
  const sessionIndex = data.sessions.findIndex((s2) => s2.id === data.activeSessionId);
  if (sessionIndex !== -1) {
    data.sessions[sessionIndex].messages = messages.map((m2) => ({
      ...m2,
      timestamp: m2.timestamp instanceof Date ? m2.timestamp.toISOString() : m2.timestamp
    }));
    data.sessions[sessionIndex].updatedAt = Date.now();
    data.sessions[sessionIndex].title = getTitleFromMessages(messages);
    saveThemeSessions(themeName, data);
  }
}
function switchToSession(themeName, sessionId) {
  const data = getThemeSessions(themeName);
  const session = data.sessions.find((s2) => s2.id === sessionId);
  if (session) {
    data.activeSessionId = sessionId;
    saveThemeSessions(themeName, data);
    return deserializeSession(session);
  }
  return null;
}
function deleteSession(themeName, sessionId) {
  var _a2;
  const data = getThemeSessions(themeName);
  data.sessions = data.sessions.filter((s2) => s2.id !== sessionId);
  if (data.activeSessionId === sessionId) {
    data.activeSessionId = ((_a2 = data.sessions[0]) == null ? void 0 : _a2.id) || null;
  }
  saveThemeSessions(themeName, data);
}
function clearAllSessions(themeName) {
  try {
    localStorage.removeItem(`${SESSIONS_KEY_PREFIX}${themeName}`);
  } catch {
    console.warn(`[ChatHistory] Failed to clear sessions for ${themeName}`);
  }
}
class ChatHistoryController {
  constructor(host, theme) {
    __publicField(this, "host");
    __publicField(this, "_theme");
    // Reactive state - changes trigger host updates
    __publicField(this, "sessions", []);
    __publicField(this, "activeSessionId", null);
    this.host = host;
    this._theme = theme;
    host.addController(this);
  }
  /**
   * Update the theme and reload sessions
   */
  set theme(value) {
    if (this._theme !== value) {
      this._theme = value;
      this.loadSessions();
    }
  }
  get theme() {
    return this._theme;
  }
  /**
   * Called when the host component is connected to the DOM
   */
  hostConnected() {
    this.loadSessions();
  }
  /**
   * Called when the host component is disconnected from the DOM
   */
  hostDisconnected() {
  }
  /**
   * Load sessions from localStorage and update reactive state
   */
  loadSessions() {
    const data = getThemeSessions(this._theme);
    this.sessions = [...data.sessions];
    this.activeSessionId = data.activeSessionId;
    this.host.requestUpdate();
  }
  /**
   * Get the currently active session
   */
  getActiveSession() {
    return this.sessions.find((s2) => s2.id === this.activeSessionId) || null;
  }
  /**
   * Create a new chat session and make it active
   * @returns The new session's messages (empty array)
   */
  createNew() {
    createNewSession(this._theme);
    this.loadSessions();
    return [];
  }
  /**
   * Switch to a different session
   * @returns The session's messages, or null if session not found
   */
  switchTo(sessionId) {
    const session = switchToSession(this._theme, sessionId);
    if (session) {
      this.loadSessions();
      return session.messages;
    }
    return null;
  }
  /**
   * Delete a session
   * @returns The new active session's messages, or empty array if no sessions remain
   */
  delete(sessionId) {
    deleteSession(this._theme, sessionId);
    const data = getThemeSessions(this._theme);
    this.sessions = [...data.sessions];
    this.activeSessionId = data.activeSessionId;
    this.host.requestUpdate();
    const activeSession = this.getActiveSession();
    return (activeSession == null ? void 0 : activeSession.messages) || [];
  }
  /**
   * Update the active session with new messages.
   * Auto-saves to localStorage.
   */
  updateMessages(messages) {
    const hasUserMessages = messages.some((m2) => m2.role === "user");
    if (hasUserMessages) {
      updateActiveSession(this._theme, messages);
      this.loadSessions();
    }
  }
  /**
   * Check if there's an active session with messages
   */
  hasActiveSession() {
    const session = this.getActiveSession();
    return session !== null && session.messages.length > 0;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class e extends i$1 {
  constructor(i4) {
    if (super(i4), this.it = A, i4.type !== t$1.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r2) {
    if (r2 === A || null == r2) return this._t = void 0, this.it = r2;
    if (r2 === E) return r2;
    if ("string" != typeof r2) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r2 === this.it) return this._t;
    this.it = r2;
    const s2 = [r2];
    return s2.raw = s2, this._t = { _$litType$: this.constructor.resultType, strings: s2, values: [] };
  }
}
e.directiveName = "unsafeHTML", e.resultType = 1;
const o = e$1(e);
function preprocessMarkdown(content) {
  return content.replace(/\\n/g, "\n").replace(/\*\*([^*\n]+)\*(?!\*)/g, "**$1**").replace(/\]\s*[\r\n]+\s*\(/g, "](").replace(/\]\s+\(/g, "](");
}
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
function parseInline(text, primaryColor) {
  let result = escapeHtml(text);
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight: 600;">$1</strong>');
  result = result.replace(/__([^_]+)__/g, '<strong style="font-weight: 600;">$1</strong>');
  result = result.replace(new RegExp("(?<!\\*)\\*([^*]+)\\*(?!\\*)", "g"), '<em style="font-style: italic;">$1</em>');
  result = result.replace(new RegExp("(?<!_)_([^_]+)_(?!_)", "g"), '<em style="font-style: italic;">$1</em>');
  result = result.replace(
    /`([^`]+)`/g,
    '<code style="padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.08); font-size: 13px;">$1</code>'
  );
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    `<a href="$2" target="_blank" rel="noopener noreferrer" style="color: ${primaryColor}; text-decoration: underline;">$1</a>`
  );
  return result;
}
function parseTable(lines, primaryColor, isDark) {
  if (lines.length < 2) return "";
  const headerRow = lines[0];
  const separatorRow = lines[1];
  const bodyRows = lines.slice(2);
  if (!separatorRow.match(/^\|?[\s\-:|]+\|?$/)) {
    return "";
  }
  const parseRow = (row) => {
    return row.split("|").map((cell) => cell.trim()).filter((_2, i4, arr) => i4 > 0 && i4 < arr.length - 1 || arr.length === 1);
  };
  const headers = parseRow(headerRow);
  const bgColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)";
  const headerBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
  const borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  let html = `<div style="overflow-x: auto; margin: 12px 0;">`;
  html += `<table style="width: 100%; border-collapse: collapse; font-size: 12px; background: ${bgColor}; border-radius: 8px; overflow: hidden;">`;
  html += `<thead style="background: ${headerBg};"><tr>`;
  headers.forEach((header) => {
    html += `<th style="padding: 8px 12px; text-align: left; font-weight: 600; border-bottom: 1px solid ${borderColor};">${parseInline(header, primaryColor)}</th>`;
  });
  html += "</tr></thead>";
  html += "<tbody>";
  bodyRows.forEach((row) => {
    const cells = parseRow(row);
    html += "<tr>";
    cells.forEach((cell) => {
      html += `<td style="padding: 8px 12px; border-bottom: 1px solid ${borderColor};">${parseInline(cell, primaryColor)}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table></div>";
  return html;
}
function parseMarkdown(content, options = {}) {
  const { primaryColor = "#4f46e5", isDark = false } = options;
  const preprocessed = preprocessMarkdown(content);
  const lines = preprocessed.split("\n");
  const result = [];
  let i4 = 0;
  let listItems = [];
  const flushList = () => {
    if (listItems.length > 0) {
      result.push(`<ul style="margin: 8px 0; padding-left: 0; list-style: none;">`);
      listItems.forEach((item) => {
        result.push(`<li style="display: flex; gap: 8px; margin: 4px 0;"><span style="color: ${primaryColor};">•</span><span style="flex: 1;">${item}</span></li>`);
      });
      result.push("</ul>");
      listItems = [];
    }
  };
  while (i4 < lines.length) {
    const line = lines[i4];
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      i4++;
      continue;
    }
    if (trimmed.match(/^[-*_]{3,}$/)) {
      flushList();
      const hrColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
      result.push(`<hr style="margin: 12px 0; border: none; height: 1px; background: ${hrColor};" />`);
      i4++;
      continue;
    }
    if (trimmed.startsWith("|") && i4 + 1 < lines.length && lines[i4 + 1].trim().match(/^\|?[\s\-:|]+\|?$/)) {
      flushList();
      const tableLines = [trimmed];
      i4++;
      while (i4 < lines.length && lines[i4].trim().startsWith("|")) {
        tableLines.push(lines[i4].trim());
        i4++;
      }
      const tableHtml = parseTable(tableLines, primaryColor, isDark);
      if (tableHtml) {
        result.push(tableHtml);
      }
      continue;
    }
    if (trimmed.match(/^[-*]\s+/)) {
      const itemText = trimmed.replace(/^[-*]\s+/, "");
      listItems.push(parseInline(itemText, primaryColor));
      i4++;
      continue;
    }
    if (trimmed.match(/^\d+\.\s+/)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      listItems.push(parseInline(itemText, primaryColor));
      i4++;
      continue;
    }
    flushList();
    result.push(`<p style="margin: 0 0 8px 0;">${parseInline(trimmed, primaryColor)}</p>`);
    i4++;
  }
  flushList();
  let html = result.join("");
  html = html.replace(/<p style="margin: 0 0 8px 0;">([^<]*)<\/p>$/, '<p style="margin: 0;">$1</p>');
  return html;
}
function renderMarkdown(content, options = {}) {
  if (!content) return "";
  return parseMarkdown(content, options);
}
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$8(target, key, result);
  return result;
};
var __publicField$8 = (obj, key, value) => __defNormalProp$8(obj, key + "", value);
let TypingIndicator = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "color", colors.indigo[600]);
  }
  render() {
    return b`
      <span class="dot" style="background-color: ${this.color}"></span>
      <span class="dot" style="background-color: ${this.color}"></span>
      <span class="dot" style="background-color: ${this.color}"></span>
    `;
  }
};
__publicField$8(TypingIndicator, "styles", i$5`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 0;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: bounce 0.6s ease-in-out infinite;
    }

    .dot:nth-child(1) {
      animation-delay: 0ms;
    }

    .dot:nth-child(2) {
      animation-delay: 150ms;
    }

    .dot:nth-child(3) {
      animation-delay: 300ms;
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
    }
  `);
__decorateClass$8([
  n2({ type: String })
], TypingIndicator.prototype, "color", 2);
TypingIndicator = __decorateClass$8([
  t$2("bf-typing-indicator")
], TypingIndicator);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$7(target, key, result);
  return result;
};
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, key + "", value);
let ProductCard = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "product");
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "imageError", false);
  }
  getPlaceholderImage() {
    var _a2;
    const title = ((_a2 = this.product.title) == null ? void 0 : _a2.toLowerCase()) || "";
    if (title.includes("capsul")) {
      return "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop";
    }
    if (title.includes("automat")) {
      return "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop";
    }
    return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop";
  }
  handleImageError() {
    this.imageError = true;
  }
  handleClick() {
    this.dispatchEvent(new CustomEvent("product-click", {
      detail: this.product,
      bubbles: true,
      composed: true
    }));
  }
  formatPrice(value, currency = "€") {
    return `${value.toLocaleString()} ${currency}`;
  }
  render() {
    const { title, image, price, oldPrice, currency = "€", description } = this.product;
    const displayImage = this.imageError ? this.getPlaceholderImage() : image || this.getPlaceholderImage();
    const hasDiscount = oldPrice && price && oldPrice > price;
    const discountPercent = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;
    const cardBg = this.isDark ? colors.slate[800] : semantic.background.outline;
    const borderColor = this.isDark ? colors.slate[700] : semantic.border.outline;
    const textColor = this.isDark ? colors.white : semantic.content.onOutline;
    const mutedColor = this.isDark ? colors.slate[400] : semantic.content.onOutlineLow;
    return b`
      <div
        class="card"
        @click=${this.handleClick}
        style="
          background-color: ${cardBg};
          border: 1px solid ${borderColor};
        "
      >
        <div class="image-container">
          <img
            class="image"
            src=${displayImage}
            alt=${title}
            @error=${this.handleImageError}
          />
          ${hasDiscount ? b`
                <span
                  class="discount-badge"
                  style="background-color: ${this.primaryColor}"
                >
                  -${discountPercent}%
                </span>
              ` : null}
        </div>

        <!-- Price row -->
        <div class="price-row">
          <span class="price" style="color: ${textColor};">
            ${price ? this.formatPrice(price, currency) : ""}
          </span>
          ${hasDiscount ? b`<span class="old-price" style="color: ${mutedColor};">${this.formatPrice(oldPrice, currency)}</span>` : null}
        </div>

        <!-- Description -->
        <div class="description">
          <span class="description-text" style="color: ${textColor};">
            ${description || title}
          </span>
        </div>

        <!-- Buy button -->
        <button
          class="buy-button"
          style="
            background-color: ${this.primaryColor};
            color: ${colors.indigo[50]};
          "
        >
          Buy
        </button>
      </div>
    `;
  }
};
__publicField$7(ProductCard, "styles", i$5`
    :host {
      display: block;
      flex: 0 0 160px;
      width: 160px;
      max-width: 160px;
    }

    /* Product Card - small variant from Figma */
    .card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 160px;
      min-width: 140px;
      max-width: 160px;
      min-height: 220px;
      padding: 8px;
      gap: 4px;
      border-radius: 8px;
      cursor: pointer;
      box-sizing: border-box;
    }

    .card:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 120px;
      overflow: hidden;
      flex-shrink: 0;
      border-radius: 4px;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .card:hover .image {
      transform: scale(1.05);
    }

    .discount-badge {
      position: absolute;
      top: 4px;
      left: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: ${r$5(typography.fontWeight.semibold)};
      color: ${r$5(colors.white)};
    }

    /* Price row */
    .price-row {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
    }

    .price {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 14px;
      font-weight: ${r$5(typography.fontWeight.bold)};
      line-height: 20px;
    }

    .old-price {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.normal)};
      line-height: 16px;
      text-decoration: line-through;
    }

    /* Description */
    .description {
      display: flex;
      align-items: center;
      padding-bottom: 4px;
      width: 100%;
    }

    .description-text {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.medium)};
      line-height: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Buy button - mini size */
    .buy-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 24px;
      padding: 4px 8px;
      border-radius: 4px;
      border: none;
      font-family: ${r$5(typography.fontFamily)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.medium)};
      line-height: 16px;
      cursor: pointer;
      transition: opacity 0.2s ease;
      flex-shrink: 0;
      margin-top: auto;
    }

    .buy-button:hover {
      opacity: 0.9;
    }
  `);
__decorateClass$7([
  n2({ type: Object })
], ProductCard.prototype, "product", 2);
__decorateClass$7([
  n2({ type: Boolean })
], ProductCard.prototype, "isDark", 2);
__decorateClass$7([
  n2({ type: String })
], ProductCard.prototype, "primaryColor", 2);
__decorateClass$7([
  r$1()
], ProductCard.prototype, "imageError", 2);
ProductCard = __decorateClass$7([
  t$2("bf-product-card")
], ProductCard);
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$6(target, key, result);
  return result;
};
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, key + "", value);
let Feedback = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "messageId", "");
    __publicField(this, "messageContent", "");
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "selectedFeedback", null);
    __publicField(this, "showCommentForm", false);
    __publicField(this, "comment", "");
    __publicField(this, "isSubmitting", false);
    __publicField(this, "isSubmitted", false);
    __publicField(this, "copied", false);
  }
  handleFeedbackClick(type) {
    console.log("[bf-feedback] handleFeedbackClick:", type, "isSubmitted:", this.isSubmitted);
    if (this.isSubmitted) return;
    this.selectedFeedback = type;
    this.showCommentForm = true;
    this.requestUpdate();
  }
  handleCommentInput(e2) {
    this.comment = e2.target.value;
  }
  async handleSubmit() {
    console.log("[bf-feedback] handleSubmit called, selectedFeedback:", this.selectedFeedback);
    if (!this.selectedFeedback) return;
    this.isSubmitting = true;
    const detail = {
      messageId: this.messageId,
      isPositive: this.selectedFeedback === "positive",
      comment: this.comment.trim() || void 0
    };
    console.log("[bf-feedback] dispatching feedback-submit event:", detail);
    this.dispatchEvent(new CustomEvent("feedback-submit", {
      detail,
      bubbles: true,
      composed: true
    }));
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.isSubmitting = false;
    this.isSubmitted = true;
    this.showCommentForm = false;
    this.requestUpdate();
    setTimeout(() => {
      this.selectedFeedback = null;
      this.comment = "";
      this.requestUpdate();
    }, 1500);
  }
  handleCancel() {
    this.showCommentForm = false;
    this.selectedFeedback = null;
    this.comment = "";
    this.requestUpdate();
  }
  handleRetry() {
    this.dispatchEvent(new CustomEvent("retry", {
      detail: { messageId: this.messageId },
      bubbles: true,
      composed: true
    }));
  }
  async handleCopy() {
    if (!this.messageContent) return;
    try {
      await navigator.clipboard.writeText(this.messageContent);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
  render() {
    const btnColor = this.isDark ? colors.slate[500] : colors.slate[400];
    const selectedColor = this.primaryColor;
    const btnBgHover = this.isDark ? colors.slate[700] : colors.slate[100];
    const formBg = this.isDark ? colors.slate[700] : colors.slate[100];
    const formBorder = this.isDark ? colors.slate[600] : colors.slate[200];
    const textColor = this.isDark ? colors.white : colors.slate[900];
    const cancelBtnBg = this.isDark ? colors.slate[600] : colors.slate[200];
    if (this.isSubmitted) {
      return b`
        <div
          class="submitted-message"
          style="
            background-color: ${formBg};
            color: ${this.isDark ? colors.slate[400] : colors.slate[500]};
          "
        >
          ${this.selectedFeedback === "positive" ? b`<svg viewBox="0 0 24 24" fill="none" stroke="${selectedColor}" stroke-width="2" style="width: 14px; height: 14px;">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>` : b`<svg viewBox="0 0 24 24" fill="none" stroke="${selectedColor}" stroke-width="2" style="width: 14px; height: 14px;">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`}
          <span>Thank you for your feedback</span>
        </div>
      `;
    }
    return b`
      <div class="control-group">
        <!-- Like button -->
        <button
          class="control-btn ${this.selectedFeedback === "positive" ? "selected" : ""}"
          @click=${() => this.handleFeedbackClick("positive")}
          title="Good response"
          style="
            background-color: ${this.selectedFeedback === "positive" ? btnBgHover : "transparent"};
            color: ${this.selectedFeedback === "positive" ? selectedColor : btnColor};
          "
        >
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Dislike button -->
        <button
          class="control-btn ${this.selectedFeedback === "negative" ? "selected" : ""}"
          @click=${() => this.handleFeedbackClick("negative")}
          title="Bad response"
          style="
            background-color: ${this.selectedFeedback === "negative" ? btnBgHover : "transparent"};
            color: ${this.selectedFeedback === "negative" ? selectedColor : btnColor};
          "
        >
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Retry button -->
        <button
          class="control-btn"
          @click=${this.handleRetry}
          title="Retry"
          style="background-color: transparent; color: ${btnColor};"
        >
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M1 4v6h6M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Copy button -->
        <button
          class="control-btn"
          @click=${this.handleCopy}
          title="${this.copied ? "Copied!" : "Copy"}"
          style="background-color: transparent; color: ${this.copied ? selectedColor : btnColor}; position: relative;"
        >
          <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            ${this.copied ? b`<path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>` : b`
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-linecap="round" stroke-linejoin="round"/>
                `}
          </svg>
        </button>
      </div>

      ${this.showCommentForm ? b`
            <div
              class="comment-form"
              style="
                background-color: ${formBg};
                border: 1px solid ${formBorder};
              "
            >
              <textarea
                class="comment-textarea"
                rows="3"
                placeholder="Leave a comment (optional)"
                .value=${this.comment}
                @input=${this.handleCommentInput}
                style="
                  background-color: ${this.isDark ? colors.slate[800] : colors.white};
                  border-color: ${formBorder};
                  color: ${textColor};
                  caret-color: ${textColor};
                  --primary-color: ${this.primaryColor};
                "
              ></textarea>

              <div class="form-buttons">
                <button
                  class="form-btn primary"
                  @click=${this.handleSubmit}
                  ?disabled=${this.isSubmitting}
                  style="background-color: ${this.primaryColor}"
                >
                  ${this.isSubmitting ? "Sending..." : "Submit"}
                </button>
                <button
                  class="form-btn"
                  @click=${this.handleCancel}
                  ?disabled=${this.isSubmitting}
                  style="
                    background-color: ${cancelBtnBg};
                    color: ${this.isDark ? colors.white : colors.slate[700]};
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          ` : null}
    `;
  }
};
__publicField$6(Feedback, "styles", i$5`
    :host {
      display: block;
    }

    /* Control group - horizontal buttons */
    .control-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Mini button - 24x24 with ghost background */
    .control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      min-height: 24px;
      padding: 4px 8px;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .control-btn:hover {
      opacity: 0.8;
    }

    .control-btn.selected {
      opacity: 1;
    }

    .control-icon {
      width: 24px;
      height: 24px;
    }

    /* Comment form */
    .comment-form {
      box-sizing: border-box;
      margin-top: ${r$5(spacing.sm)};
      padding: ${r$5(spacing.sm)};
      border-radius: ${r$5(radius.lg)};
      animation: slideDown 0.2s ease-out;
      overflow: hidden;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .comment-textarea {
      box-sizing: border-box;
      width: 100%;
      max-height: 80px;
      padding: ${r$5(spacing.xs)} ${r$5(spacing.sm)};
      border-radius: ${r$5(radius.md)};
      border: 1px solid;
      font-family: ${r$5(typography.fontFamily)};
      font-size: ${r$5(typography.fontSize.sm)};
      resize: none;
      outline: none;
      overflow-y: auto;
      transition: border-color 0.2s;
    }

    .comment-textarea:focus {
      border-color: var(--primary-color);
    }

    .form-buttons {
      display: flex;
      justify-content: flex-end;
      gap: ${r$5(spacing.xs)};
      margin-top: ${r$5(spacing.sm)};
    }

    .form-btn {
      padding: ${r$5(spacing.xs)} ${r$5(spacing.md)};
      border-radius: ${r$5(radius.lg)};
      border: none;
      font-size: ${r$5(typography.fontSize.sm)};
      font-weight: ${r$5(typography.fontWeight.medium)};
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .form-btn:hover {
      opacity: 0.9;
    }

    .form-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-btn.primary {
      color: ${r$5(colors.white)};
    }

    .submitted-message {
      display: flex;
      align-items: center;
      gap: ${r$5(spacing["2xs"])};
      padding: ${r$5(spacing["2xs"])} ${r$5(spacing.xs)};
      border-radius: ${r$5(radius.lg)};
      font-size: 12px;
    }

    /* Tooltip for copy feedback */
    .copy-tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      white-space: nowrap;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `);
__decorateClass$6([
  n2({ type: String })
], Feedback.prototype, "messageId", 2);
__decorateClass$6([
  n2({ type: String })
], Feedback.prototype, "messageContent", 2);
__decorateClass$6([
  n2({ type: Boolean })
], Feedback.prototype, "isDark", 2);
__decorateClass$6([
  n2({ type: String })
], Feedback.prototype, "primaryColor", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "selectedFeedback", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "showCommentForm", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "comment", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "isSubmitting", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "isSubmitted", 2);
__decorateClass$6([
  r$1()
], Feedback.prototype, "copied", 2);
Feedback = __decorateClass$6([
  t$2("bf-feedback")
], Feedback);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$5(target, key, result);
  return result;
};
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, key + "", value);
let ChatMessageElement = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "message");
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "suggestions", []);
  }
  formatContent(text) {
    return renderMarkdown(text, {
      primaryColor: this.primaryColor,
      isDark: this.isDark
    });
  }
  handleSuggestionClick(suggestion) {
    this.dispatchEvent(new CustomEvent("suggestion-click", {
      detail: { suggestion },
      bubbles: true,
      composed: true
    }));
  }
  render() {
    const isUser = this.message.role === "user";
    const showLoader = this.message.isStreaming && !this.message.content;
    const showFeedback = !isUser && !this.message.isStreaming && this.message.content;
    const textColor = this.isDark ? colors.white : semantic.content.onGhost;
    const separatorColor = this.isDark ? colors.slate[700] : semantic.background.separator;
    if (isUser) {
      return b`
        <div class="user-request">
          <p class="user-message-text" style="color: ${textColor};">
            ${this.message.content}
          </p>
          <div class="user-separator" style="background-color: ${separatorColor};"></div>
        </div>
      `;
    }
    return b`
      <div class="agent-response">
        ${showLoader ? b`<bf-typing-indicator color="${this.primaryColor}"></bf-typing-indicator>` : b`
              <div class="agent-body" style="color: ${textColor}; --primary-color: ${this.primaryColor};">
                ${o(this.formatContent(this.message.content))}
                ${this.message.isStreaming ? b`<span class="streaming-cursor" style="background-color: ${this.primaryColor}"></span>` : null}
              </div>

              ${this.message.products && this.message.products.length > 0 ? b`
                    <div class="products-carousel">
                      ${this.message.products.map((product) => b`
                        <bf-product-card
                          .product=${product}
                          .isDark=${this.isDark}
                          .primaryColor=${this.primaryColor}
                        ></bf-product-card>
                      `)}
                    </div>
                  ` : null}

              ${showFeedback ? b`
                    <div class="response-control">
                      <div class="response-separator" style="background-color: ${separatorColor};"></div>
                      <bf-feedback
                        messageId=${this.message.id}
                        messageContent=${this.message.content}
                        .isDark=${this.isDark}
                        .primaryColor=${this.primaryColor}
                      ></bf-feedback>
                    </div>
                  ` : null}

              ${this.suggestions.length > 0 && showFeedback ? b`
                    <div class="suggestion-section">
                      <p class="suggestion-label" style="color: ${this.isDark ? colors.slate[400] : semantic.content.secondary};">
                        Suggestion
                      </p>
                      ${this.suggestions.slice(0, 3).map((suggestion) => b`
                        <button
                          class="suggestion-link"
                          @click=${() => this.handleSuggestionClick(suggestion)}
                          style="color: ${this.primaryColor};"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>${suggestion}</span>
                        </button>
                      `)}
                    </div>
                  ` : null}
            `}
      </div>
    `;
  }
};
__publicField$5(ChatMessageElement, "styles", i$5`
    :host {
      display: block;
    }

    /* User Request - right aligned, heading style */
    .user-request {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-end;
      min-height: 48px;
      width: 100%;
    }

    .user-message-text {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 18px;
      font-weight: ${r$5(typography.fontWeight.semibold)};
      line-height: 24px;
      text-align: right;
      word-break: break-word;
    }

    .user-separator {
      width: 100%;
      height: 1px;
      margin-top: 4px;
    }

    /* Agent Response - left aligned with header/body structure */
    .agent-response {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-start;
      justify-content: flex-end;
      width: 100%;
      overflow: hidden;
      /* Prevent text cursor from appearing */
      caret-color: transparent;
    }

    .agent-header {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 16px;
      font-weight: ${r$5(typography.fontWeight.bold)};
      line-height: 24px;
      max-width: 496px;
      white-space: pre-wrap;
    }

    .agent-body {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 16px;
      font-weight: ${r$5(typography.fontWeight.normal)};
      line-height: 24px;
      max-width: 496px;
      white-space: pre-wrap;
      word-break: break-word;
      /* Prevent text cursor from appearing */
      caret-color: transparent;
    }

    .agent-body p {
      margin: 0 0 ${r$5(spacing.xs)};
    }

    .agent-body p:last-child {
      margin-bottom: 0;
    }

    .agent-body ul {
      margin: ${r$5(spacing["2xs"])} 0;
      padding-left: 0;
      list-style: none;
    }

    .agent-body li {
      margin-bottom: ${r$5(spacing["2xs"])};
    }

    .agent-body a {
      text-decoration: underline;
      transition: opacity 0.2s;
    }

    .agent-body a:hover {
      opacity: 0.7;
    }

    .agent-body strong {
      font-weight: ${r$5(typography.fontWeight.bold)};
    }

    .streaming-cursor {
      display: inline-block;
      width: 2px;
      height: 18px;
      margin-left: 2px;
      border-radius: 1px;
      animation: pulse 0.8s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }

    /* Products carousel - gap 8px from Figma */
    .products-carousel {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      overflow-x: auto;
      padding: 8px 0;
      scrollbar-width: thin;
    }

    .products-carousel::-webkit-scrollbar {
      height: 4px;
    }

    .products-carousel::-webkit-scrollbar-track {
      background: transparent;
    }

    .products-carousel::-webkit-scrollbar-thumb {
      background: ${r$5(colors.slate[300])};
      border-radius: 2px;
    }

    /* Prevent cards from growing */
    .products-carousel bf-product-card {
      flex: 0 0 160px;
    }

    /* Response control wrapper */
    .response-control {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: flex-start;
      margin-top: 4px;
      width: 100%;
    }

    .response-separator {
      width: 100%;
      height: 1px;
    }

    /* Suggestion Section - inside agent response per Figma */
    .suggestion-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      width: 100%;
      max-width: 496px;
    }

    .suggestion-label {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.normal)};
      line-height: 16px;
    }

    /* Link button - mini size from Figma */
    .suggestion-link {
      display: flex;
      align-items: center;
      gap: 4px;
      height: 24px;
      min-height: 24px;
      min-width: 24px;
      padding: 4px 8px;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.15s ease;
      width: 100%;
      text-align: left;
    }

    .suggestion-link:hover {
      opacity: 0.8;
    }

    .suggestion-link svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .suggestion-link span {
      font-family: ${r$5(typography.fontFamily)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.medium)};
      line-height: 16px;
    }
  `);
__decorateClass$5([
  n2({
    type: Object,
    // Force re-render on every property assignment
    hasChanged: () => true
  })
], ChatMessageElement.prototype, "message", 2);
__decorateClass$5([
  n2({ type: Boolean })
], ChatMessageElement.prototype, "isDark", 2);
__decorateClass$5([
  n2({ type: String })
], ChatMessageElement.prototype, "primaryColor", 2);
__decorateClass$5([
  n2({ type: Array })
], ChatMessageElement.prototype, "suggestions", 2);
ChatMessageElement = __decorateClass$5([
  t$2("bf-chat-message")
], ChatMessageElement);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = e$1(class extends i$1 {
  constructor(r$12) {
    if (super(r$12), r$12.type !== t$1.PROPERTY && r$12.type !== t$1.ATTRIBUTE && r$12.type !== t$1.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r(r$12)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i4, [t2]) {
    if (t2 === E || t2 === A) return t2;
    const o2 = i4.element, l2 = i4.name;
    if (i4.type === t$1.PROPERTY) {
      if (t2 === o2[l2]) return E;
    } else if (i4.type === t$1.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o2.hasAttribute(l2)) return E;
    } else if (i4.type === t$1.ATTRIBUTE && o2.getAttribute(l2) === t2 + "") return E;
    return p(i4), t2;
  }
});
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$4(target, key, result);
  return result;
};
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
let ChatInput = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "placeholder", "Ask me anything...");
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "value", "");
    __publicField(this, "isSending", false);
  }
  // Get input element directly instead of @query (which can return undefined)
  get inputElement() {
    var _a2;
    return ((_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("input")) ?? null;
  }
  focus() {
    var _a2;
    (_a2 = this.inputElement) == null ? void 0 : _a2.focus();
  }
  // Public method to trigger send from external button
  triggerSend() {
    this.sendMessage();
  }
  // Check if there's content to send
  get hasContent() {
    return this.value.trim().length > 0;
  }
  handleInput(e2) {
    const newValue = e2.target.value;
    this.value = newValue;
    this.requestUpdate();
  }
  handleKeyDown(e2) {
    if (e2.key === "Enter" && !e2.shiftKey && this.value.trim()) {
      e2.preventDefault();
      this.sendMessage();
    }
  }
  sendMessage() {
    var _a2;
    if (this.isSending) return;
    const inputValue = ((_a2 = this.inputElement) == null ? void 0 : _a2.value) || this.value;
    if (!inputValue.trim()) return;
    this.isSending = true;
    this.dispatchEvent(new CustomEvent("send", {
      detail: { message: inputValue.trim() },
      bubbles: true,
      composed: true
    }));
    this.value = "";
    if (this.inputElement) {
      this.inputElement.value = "";
      this.inputElement.focus();
    }
    this.isSending = false;
    this.requestUpdate();
  }
  handleWrapperClick() {
    var _a2;
    (_a2 = this.inputElement) == null ? void 0 : _a2.focus();
  }
  // handleBlur removed - delegatesFocus handles focus delegation automatically
  render() {
    const textColor = this.isDark ? colors.white : semantic.content.onGhost;
    const placeholderColor = this.isDark ? colors.slate[500] : semantic.content.onGhostLow;
    return b`
      <div class="textarea-wrapper" @click=${this.handleWrapperClick}>
        <div class="text-field">
          <input
            type="text"
            .value=${l(this.value)}
            placeholder=${this.placeholder}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            style="color: ${textColor}; --placeholder-color: ${placeholderColor};"
          />
        </div>
      </div>
    `;
  }
};
__publicField$4(ChatInput, "shadowRootOptions", {
  ...i$2.shadowRootOptions,
  delegatesFocus: true
});
__publicField$4(ChatInput, "styles", i$5`
    :host {
      display: block;
      width: 100%;
    }

    /* Ghost-style textarea from Figma */
    .textarea-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 40px;
      max-height: 80px;
      padding: 10px 12px;
      overflow: hidden;
      background: transparent;
    }

    .text-field {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 2px;
      min-width: 1px;
      min-height: 1px;
      overflow: hidden;
    }

    input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: ${r$5(typography.fontFamily)};
      font-size: 14px;
      font-weight: ${r$5(typography.fontWeight.normal)};
      line-height: 20px;
    }

    input::placeholder {
      color: ${r$5(colors.slate[400])};
    }

    /* Hidden send button - moved to parent prompt bar */
    .send-button {
      display: none;
    }
  `);
__decorateClass$4([
  n2({ type: String })
], ChatInput.prototype, "placeholder", 2);
__decorateClass$4([
  n2({ type: Boolean })
], ChatInput.prototype, "isDark", 2);
__decorateClass$4([
  n2({ type: String })
], ChatInput.prototype, "primaryColor", 2);
__decorateClass$4([
  r$1()
], ChatInput.prototype, "value", 2);
__decorateClass$4([
  r$1()
], ChatInput.prototype, "isSending", 2);
ChatInput = __decorateClass$4([
  t$2("bf-chat-input")
], ChatInput);
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$3(target, key, result);
  return result;
};
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, key + "", value);
let ProductModal = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "product");
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "open", false);
  }
  handleClose() {
    this.dispatchEvent(new CustomEvent("close", {
      bubbles: true,
      composed: true
    }));
  }
  handleBackdropClick(e2) {
    const target = e2.target;
    if (target.classList.contains("overlay") || target.classList.contains("backdrop")) {
      this.handleClose();
    }
  }
  formatPrice(value, currency = "€") {
    return `${value.toLocaleString()} ${currency}`;
  }
  render() {
    var _a2;
    console.log("[bf-product-modal] render:", { open: this.open, product: ((_a2 = this.product) == null ? void 0 : _a2.title) || null });
    if (!this.open || !this.product) return null;
    const { title, image, price, oldPrice, currency = "€", description, availability } = this.product;
    const hasDiscount = oldPrice && price && oldPrice > price;
    const discountPercent = hasDiscount ? Math.round((1 - price / oldPrice) * 100) : 0;
    const modalBg = this.isDark ? colors.slate[800] : colors.white;
    const textColor = this.isDark ? colors.white : colors.slate[900];
    const mutedColor = this.isDark ? colors.slate[300] : colors.slate[600];
    const closeBtnBg = this.isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)";
    return b`
      <div class="overlay" @click=${this.handleBackdropClick}>
        <div class="backdrop"></div>
        <div class="modal" style="background-color: ${modalBg}">
          <button
            class="close-button"
            @click=${this.handleClose}
            style="
              background-color: ${closeBtnBg};
              color: ${this.isDark ? colors.white : colors.slate[600]};
            "
          >
            <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="image-container" style="background-color: ${colors.slate[100]}">
            <img
              class="image"
              src=${image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"}
              alt=${title}
            />
            ${hasDiscount ? b`
                  <span
                    class="discount-badge"
                    style="background-color: ${this.primaryColor}"
                  >
                    -${discountPercent}%
                  </span>
                ` : null}
            ${availability !== void 0 ? b`
                  <span
                    class="availability-badge"
                    style="background-color: ${availability ? colors.emerald[500] : colors.rose[500]}"
                  >
                    ${availability ? "In Stock" : "Out of Stock"}
                  </span>
                ` : null}
          </div>

          <div class="content">
            <h3 class="title" style="color: ${textColor}">${title}</h3>

            ${price ? b`
                  <div class="price-row">
                    ${hasDiscount ? b`<span class="old-price" style="color: ${textColor}">${this.formatPrice(oldPrice, currency)}</span>` : null}
                    <span class="price" style="color: ${textColor}">${this.formatPrice(price, currency)}</span>
                  </div>
                ` : null}

            ${description ? b`
                  <p class="description" style="color: ${mutedColor}">
                    ${description.length > 300 ? `${description.slice(0, 300)}...` : description}
                  </p>
                ` : null}
          </div>
        </div>
      </div>
    `;
  }
};
__publicField$3(ProductModal, "styles", i$5`
    :host {
      display: contents;
    }

    .overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${r$5(spacing.md)};
      animation: fadeIn 0.2s ease-out;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .modal {
      position: relative;
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      border-radius: ${r$5(radius["2xl"])};
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .close-button {
      position: absolute;
      top: ${r$5(spacing.sm)};
      right: ${r$5(spacing.sm)};
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: ${r$5(radius.full)};
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      transform: scale(1.1);
    }

    .close-icon {
      width: 16px;
      height: 16px;
    }

    .image-container {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      flex-shrink: 0;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .discount-badge {
      position: absolute;
      top: ${r$5(spacing.sm)};
      left: ${r$5(spacing.sm)};
      padding: ${r$5(spacing["2xs"])} ${r$5(spacing.sm)};
      border-radius: ${r$5(radius.lg)};
      font-size: 14px;
      font-weight: ${r$5(typography.fontWeight.semibold)};
      color: ${r$5(colors.white)};
    }

    .availability-badge {
      position: absolute;
      bottom: ${r$5(spacing.sm)};
      left: ${r$5(spacing.sm)};
      padding: ${r$5(spacing["2xs"])} ${r$5(spacing.sm)};
      border-radius: ${r$5(radius.lg)};
      font-size: 12px;
      font-weight: ${r$5(typography.fontWeight.medium)};
      color: ${r$5(colors.white)};
    }

    .content {
      padding: ${r$5(spacing.lg)};
      overflow-y: auto;
      flex: 1;
    }

    .title {
      font-size: ${r$5(typography.fontSize.xl)};
      font-weight: ${r$5(typography.fontWeight.semibold)};
      line-height: 1.3;
      margin-bottom: ${r$5(spacing.sm)};
    }

    .price-row {
      display: flex;
      align-items: baseline;
      gap: ${r$5(spacing.sm)};
      margin-bottom: ${r$5(spacing.md)};
    }

    .price {
      font-size: 24px;
      font-weight: ${r$5(typography.fontWeight.bold)};
    }

    .old-price {
      font-size: ${r$5(typography.fontSize.base)};
      text-decoration: line-through;
      opacity: 0.6;
    }

    .description {
      font-size: ${r$5(typography.fontSize.sm)};
      line-height: ${r$5(typography.lineHeight.relaxed)};
      opacity: 0.8;
    }
  `);
__decorateClass$3([
  n2({ type: Object, hasChanged: () => true })
], ProductModal.prototype, "product", 2);
__decorateClass$3([
  n2({ type: Boolean, hasChanged: () => true })
], ProductModal.prototype, "isDark", 2);
__decorateClass$3([
  n2({ type: String })
], ProductModal.prototype, "primaryColor", 2);
__decorateClass$3([
  n2({ type: Boolean, hasChanged: () => true })
], ProductModal.prototype, "open", 2);
ProductModal = __decorateClass$3([
  t$2("bf-product-modal")
], ProductModal);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
  return result;
};
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, key + "", value);
let HistoryDropdown = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "_sessions", []);
    __publicField(this, "activeSessionId", null);
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "isOpen", false);
    __publicField(this, "dropdownPosition", { top: 0, right: 0 });
    __publicField(this, "triggerBtn");
  }
  set sessions(value) {
    const oldValue = this._sessions;
    this._sessions = value;
    this.requestUpdate("sessions", oldValue);
  }
  get sessions() {
    return this._sessions;
  }
  toggleDropdown() {
    if (!this.isOpen && this.triggerBtn) {
      const rect = this.triggerBtn.getBoundingClientRect();
      this.dropdownPosition = {
        top: rect.bottom + 16,
        right: window.innerWidth - rect.right
      };
    }
    this.isOpen = !this.isOpen;
    this.requestUpdate();
  }
  closeDropdown() {
    this.isOpen = false;
    this.requestUpdate();
  }
  handleSessionClick(sessionId) {
    this.dispatchEvent(new CustomEvent("session-switch", {
      detail: { sessionId },
      bubbles: true,
      composed: true
    }));
    this.closeDropdown();
  }
  handleDeleteClick(sessionId, e2) {
    e2.stopPropagation();
    this.dispatchEvent(new CustomEvent("session-delete", {
      detail: { sessionId },
      bubbles: true,
      composed: true
    }));
  }
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = /* @__PURE__ */ new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1e3 * 60 * 60 * 24));
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  }
  render() {
    const textColor = this.isDark ? colors.white : colors.slate[900];
    const mutedColor = this.isDark ? colors.slate[400] : colors.slate[500];
    const bgColor = this.isDark ? colors.slate[800] : colors.white;
    const borderColor = this.isDark ? colors.slate[700] : colors.slate[200];
    this.isDark ? colors.slate[700] : colors.slate[50];
    const activeBg = this.isDark ? colors.slate[700] : colors.slate[100];
    return b`
      <!-- Trigger button -->
      <button
        class="trigger-btn"
        @click=${this.toggleDropdown}
        title="Chat history"
        style="color: ${mutedColor};"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="12 6 12 12 16 14" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      ${this.isOpen ? b`
        <!-- Backdrop to close on outside click -->
        <div class="backdrop" @click=${this.closeDropdown}></div>

        <!-- Dropdown menu -->
        <div
          class="dropdown"
          style="
            top: ${this.dropdownPosition.top}px;
            right: ${this.dropdownPosition.right}px;
            background-color: ${bgColor};
            border: 1px solid ${borderColor};
          "
        >
          <div
            class="dropdown-header"
            style="
              color: ${textColor};
              border-color: ${borderColor};
            "
          >
            <span>Chat History</span>
            <button
              class="close-btn"
              @click=${this.closeDropdown}
              title="Close"
              style="color: ${mutedColor};"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          ${this.sessions.length === 0 ? b`
                <div class="empty-state" style="color: ${mutedColor};">
                  No previous chats
                </div>
              ` : this.sessions.map((session) => b`
                <div
                  class="session-item"
                  @click=${() => this.handleSessionClick(session.id)}
                  style="
                    background-color: ${session.id === this.activeSessionId ? activeBg : "transparent"};
                    border-color: ${borderColor};
                  "
                >
                  <div class="session-info">
                    <div class="session-title" style="color: ${textColor};">
                      ${session.title}
                    </div>
                    <div class="session-date" style="color: ${mutedColor};">
                      ${this.formatDate(session.updatedAt)}
                    </div>
                  </div>
                  <button
                    class="delete-btn"
                    @click=${(e2) => this.handleDeleteClick(session.id, e2)}
                    title="Delete chat"
                    style="color: ${mutedColor};"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              `)}
        </div>
      ` : null}
    `;
  }
};
__publicField$2(HistoryDropdown, "styles", i$5`
    :host {
      display: block;
      position: relative;
    }

    .trigger-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      padding: 8px;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .trigger-btn:hover {
      opacity: 0.8;
    }

    .trigger-btn svg {
      width: 24px;
      height: 24px;
    }

    .dropdown {
      position: fixed;
      min-width: 280px;
      max-width: 320px;
      max-height: 400px;
      overflow-y: auto;
      border-radius: ${r$5(radius.lg)};
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      animation: slideDown 0.15s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown::-webkit-scrollbar {
      width: 6px;
    }

    .dropdown::-webkit-scrollbar-track {
      background: transparent;
    }

    .dropdown::-webkit-scrollbar-thumb {
      background: ${r$5(colors.slate[400])};
      border-radius: 3px;
    }

    .dropdown-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      font-size: ${r$5(typography.fontSize.sm)};
      font-weight: ${r$5(typography.fontWeight.semibold)};
      font-family: ${r$5(typography.fontFamily)};
      border-bottom: 1px solid;
    }

    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 4px;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.15s ease;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .close-btn svg {
      width: 16px;
      height: 16px;
    }

    .session-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      cursor: pointer;
      border-bottom: 1px solid;
      transition: background-color 0.15s ease;
    }

    .session-item:last-child {
      border-bottom: none;
    }

    .session-item:hover {
      opacity: 0.9;
    }

    .session-info {
      flex: 1;
      min-width: 0;
      margin-right: 12px;
    }

    .session-title {
      font-size: ${r$5(typography.fontSize.sm)};
      font-weight: ${r$5(typography.fontWeight.medium)};
      font-family: ${r$5(typography.fontFamily)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .session-date {
      font-size: 12px;
      font-family: ${r$5(typography.fontFamily)};
      margin-top: 2px;
      opacity: 0.6;
    }

    .delete-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 4px;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .delete-btn:hover {
      opacity: 1;
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .delete-btn svg {
      width: 16px;
      height: 16px;
    }

    .empty-state {
      padding: 24px 16px;
      text-align: center;
      font-size: ${r$5(typography.fontSize.sm)};
      font-family: ${r$5(typography.fontFamily)};
      opacity: 0.6;
    }

    /* Backdrop for closing dropdown */
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
    }
  `);
__decorateClass$2([
  n2({ type: Array })
], HistoryDropdown.prototype, "sessions", 1);
__decorateClass$2([
  n2({ type: String })
], HistoryDropdown.prototype, "activeSessionId", 2);
__decorateClass$2([
  n2({ type: Boolean })
], HistoryDropdown.prototype, "isDark", 2);
__decorateClass$2([
  n2({ type: String })
], HistoryDropdown.prototype, "primaryColor", 2);
__decorateClass$2([
  r$1()
], HistoryDropdown.prototype, "isOpen", 2);
__decorateClass$2([
  r$1()
], HistoryDropdown.prototype, "dropdownPosition", 2);
__decorateClass$2([
  e$2(".trigger-btn")
], HistoryDropdown.prototype, "triggerBtn", 2);
HistoryDropdown = __decorateClass$2([
  t$2("bf-history-dropdown")
], HistoryDropdown);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "", value);
let NewChatButton = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "isDark", false);
    __publicField(this, "primaryColor", colors.indigo[600]);
  }
  handleClick() {
    this.dispatchEvent(new CustomEvent("new-chat", {
      bubbles: true,
      composed: true
    }));
  }
  render() {
    const bgColor = this.isDark ? colors.slate[700] : colors.slate[100];
    const textColor = this.isDark ? colors.slate[300] : colors.slate[600];
    return b`
      <button
        class="new-chat-btn"
        @click=${this.handleClick}
        title="Start new chat"
        style="
          background-color: ${bgColor};
          color: ${textColor};
        "
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round"/>
        </svg>
        New chat
      </button>
    `;
  }
};
__publicField$1(NewChatButton, "styles", i$5`
    :host {
      display: block;
    }

    .new-chat-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      height: 32px;
      padding: 0 12px;
      border-radius: 8px;
      border: none;
      font-family: ${r$5(typography.fontFamily)};
      font-size: 13px;
      font-weight: ${r$5(typography.fontWeight.medium)};
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .new-chat-btn:hover {
      opacity: 0.85;
    }

    .new-chat-btn svg {
      width: 14px;
      height: 14px;
    }
  `);
__decorateClass$1([
  n2({ type: Boolean })
], NewChatButton.prototype, "isDark", 2);
__decorateClass$1([
  n2({ type: String })
], NewChatButton.prototype, "primaryColor", 2);
NewChatButton = __decorateClass$1([
  t$2("bf-new-chat-button")
], NewChatButton);
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
    if (decorator = decorators[i4])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp2(target, key, result);
  return result;
};
var __publicField2 = (obj, key, value) => __defNormalProp2(obj, key + "", value);
let BrainformChat = class extends i$2 {
  constructor() {
    super(...arguments);
    __publicField(this, "apiKey", "");
    __publicField(this, "apiUrl", "");
    __publicField(this, "theme", "default");
    __publicField(this, "position", "bottom-right");
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "darkMode", false);
    __publicField(this, "placeholder", "Ask me anything...");
    __publicField(this, "welcomeMessage", "");
    __publicField(this, "initialStage", "inputBar");
    __publicField(this, "captchaSiteKey", "");
    __publicField(this, "stage", "inputBar");
    __publicField(this, "isTransitioning", false);
    __publicField(this, "messages", []);
    __publicField(this, "isLoading", false);
    __publicField(this, "suggestions", []);
    __publicField(this, "inputValue", "");
    __publicField(this, "selectedProduct", null);
    __publicField(this, "messagesContainer");
    __publicField(this, "inputBarInput");
    __publicField(this, "containerRef");
    __publicField(this, "apiClient", null);
    __publicField(this, "sessionId", null);
    __publicField(this, "clickOutsideHandler", null);
    __publicField(this, "historyController");
    __publicField(this, "isInitialLoad", false);
  }
  connectedCallback() {
    super.connectedCallback();
    this.stage = this.initialStage;
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (this.apiKey && this.apiUrl) {
      this.apiClient = new ChatApiClient({
        apiKey: this.apiKey,
        apiUrl: this.apiUrl,
        theme: this.theme
      });
    }
    if (this.welcomeMessage) {
      this.messages = [{
        id: "welcome",
        role: "assistant",
        content: this.welcomeMessage,
        timestamp: /* @__PURE__ */ new Date()
      }];
    }
    this.setupClickOutsideHandler();
    this.updateGlowColor();
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this.apiClient) == null ? void 0 : _a2.abort();
    this.removeClickOutsideHandler();
  }
  firstUpdated() {
    var _a2;
    const isKrups = (_a2 = this.apiUrl) == null ? void 0 : _a2.includes("krups");
    if (isKrups) {
      configureKrupsApi({
        apiUrl: this.apiUrl || "/krups-api",
        captchaSiteKey: this.captchaSiteKey
      });
    }
    this.historyController = new ChatHistoryController(this, this.theme);
    const activeSession = this.historyController.getActiveSession();
    if (activeSession && activeSession.messages.length > 0) {
      this.isInitialLoad = true;
      this.messages = activeSession.messages;
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("primaryColor")) {
      this.updateGlowColor();
    }
    if (changedProperties.has("theme") && this.historyController) {
      this.historyController.theme = this.theme;
    }
    if (changedProperties.has("messages") && this.messages.length > 0 && this.historyController) {
      if (this.isInitialLoad) {
        this.isInitialLoad = false;
      } else {
        this.historyController.updateMessages(this.messages);
      }
    }
  }
  updateGlowColor() {
    const hex = this.primaryColor.replace("#", "");
    const r2 = parseInt(hex.substring(0, 2), 16);
    const g2 = parseInt(hex.substring(2, 4), 16);
    const b2 = parseInt(hex.substring(4, 6), 16);
    this.style.setProperty("--glow-color", `rgba(${r2}, ${g2}, ${b2}, 0.2)`);
    this.style.setProperty("--primary", this.primaryColor);
  }
  setupClickOutsideHandler() {
    this.clickOutsideHandler = (e2) => {
      if (this.stage === "collapsed") return;
      e2.target;
      const path = e2.composedPath();
      const isInside = path.some((el) => {
        var _a2;
        return el === this || ((_a2 = el == null ? void 0 : el.closest) == null ? void 0 : _a2.call(el, "brainform-chat"));
      });
      if (!isInside) {
        if (this.stage === "expanded") {
          this.setStage("inputBar");
        } else if (this.stage === "inputBar") {
          this.setStage("collapsed");
        }
      }
    };
    document.addEventListener("mousedown", this.clickOutsideHandler);
  }
  removeClickOutsideHandler() {
    if (this.clickOutsideHandler) {
      document.removeEventListener("mousedown", this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
  }
  // Stage management
  setStage(newStage) {
    if (this.stage === newStage || this.isTransitioning) {
      return;
    }
    const oldStage = this.stage;
    this.isTransitioning = true;
    this.stage = newStage;
    this.requestUpdate();
    const duration = oldStage === "collapsed" || newStage === "collapsed" ? SLIDE_DURATION : MORPH_DURATION;
    if (newStage === "expanded") {
      this.dispatchEvent(new CustomEvent("open", { bubbles: true, composed: true }));
    } else if (oldStage === "expanded" && newStage !== "expanded") {
      this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
    }
    setTimeout(() => {
      var _a2, _b, _c;
      this.isTransitioning = false;
      if (newStage === "inputBar" && oldStage === "collapsed") {
        (_a2 = this.inputBarInput) == null ? void 0 : _a2.focus();
      } else if (newStage === "expanded") {
        const input = (_b = this.shadowRoot) == null ? void 0 : _b.querySelector("bf-chat-input");
        (_c = input == null ? void 0 : input.focus) == null ? void 0 : _c.call(input);
      }
    }, duration * 1e3);
  }
  // Public methods
  open() {
    this.setStage("expanded");
  }
  close() {
    this.setStage("collapsed");
  }
  toggle() {
    if (this.stage === "collapsed") {
      this.setStage("inputBar");
    } else if (this.stage === "inputBar") {
      this.setStage("expanded");
    } else {
      this.setStage("inputBar");
    }
  }
  expand() {
    this.setStage("expanded");
  }
  collapse() {
    this.setStage("collapsed");
  }
  // Input handling for inputBar
  handleInputBarInput(e2) {
    this.inputValue = e2.target.value;
  }
  handleInputBarKeyDown(e2) {
    if (e2.key === "Enter" && this.inputValue.trim()) {
      e2.preventDefault();
      this.sendFromInputBar();
    }
    if (e2.key === "Escape") {
      this.setStage("collapsed");
    }
  }
  handleInputBarFocus() {
    this.setStage("expanded");
  }
  sendFromInputBar() {
    if (!this.inputValue.trim()) return;
    this.setStage("expanded");
    setTimeout(() => {
      this.sendMessage(this.inputValue);
      this.inputValue = "";
    }, 100);
  }
  async sendMessage(text) {
    var _a2;
    if (!text.trim() || this.isLoading) return;
    this.suggestions = [];
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: /* @__PURE__ */ new Date()
    };
    this.messages = [...this.messages, userMessage];
    this.requestUpdate();
    const assistantMessageId = `assistant-${Date.now()}`;
    const assistantMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: /* @__PURE__ */ new Date(),
      isStreaming: true
    };
    this.messages = [...this.messages, assistantMessage];
    this.requestUpdate();
    this.isLoading = true;
    this.scrollToBottom();
    this.dispatchEvent(new CustomEvent("message", {
      detail: userMessage,
      bubbles: true,
      composed: true
    }));
    const callbacks = {
      onChunk: (chunk) => {
        this.messages = this.messages.map(
          (m2) => m2.id === assistantMessageId ? { ...m2, content: m2.content + chunk } : m2
        );
        this.requestUpdate();
        this.scrollToBottom();
      },
      onProducts: (products) => {
        this.messages = this.messages.map(
          (m2) => m2.id === assistantMessageId ? { ...m2, products } : m2
        );
        this.scrollToBottom();
      },
      onSuggestions: (suggestions) => {
        console.log("[CHAT-WIDGET] onSuggestions received:", suggestions);
        this.suggestions = suggestions;
        console.log("[CHAT-WIDGET] this.suggestions set to:", this.suggestions);
        this.requestUpdate();
      },
      onComplete: () => {
        this.messages = this.messages.map(
          (m2) => m2.id === assistantMessageId ? { ...m2, isStreaming: false } : m2
        );
        this.isLoading = false;
        this.requestUpdate();
      },
      onError: (error) => {
        console.error("Chat error:", error);
        this.messages = this.messages.map(
          (m2) => m2.id === assistantMessageId ? { ...m2, content: "Sorry, an error occurred. Please try again.", isStreaming: false } : m2
        );
        this.isLoading = false;
        this.requestUpdate();
      }
    };
    const isKrupsApi = (_a2 = this.apiUrl) == null ? void 0 : _a2.includes("krups");
    if (isKrupsApi) {
      const krupsCallbacks = {
        onChunk: (chunk) => callbacks.onChunk(chunk),
        onComplete: (fullMessage, products, apiMessageId) => {
          this.messages = this.messages.map(
            (m2) => m2.id === assistantMessageId ? {
              ...m2,
              content: fullMessage || m2.content,
              id: apiMessageId || m2.id,
              isStreaming: false
              // Mark as complete here
            } : m2
          );
          this.isLoading = false;
          if (products && products.length > 0) {
            callbacks.onProducts(products);
          }
          this.requestUpdate();
        },
        onSuggestionsReceived: (suggestions) => callbacks.onSuggestions(suggestions),
        onError: callbacks.onError
      };
      await sendKrupsMessage(text, krupsCallbacks);
    } else if (this.apiClient) {
      await this.apiClient.sendMessage(text, this.sessionId, callbacks);
    } else {
      callbacks.onError(new Error("No API configured"));
    }
  }
  clearHistory() {
    if (this.historyController) {
      this.historyController.createNew();
    }
    this.messages = this.welcomeMessage ? [{
      id: "welcome",
      role: "assistant",
      content: this.welcomeMessage,
      timestamp: /* @__PURE__ */ new Date()
    }] : [];
    this.suggestions = [];
  }
  /**
   * Handle session switch from history dropdown
   */
  handleSessionSwitch(e2) {
    if (!this.historyController) return;
    this.isInitialLoad = true;
    const messages = this.historyController.switchTo(e2.detail.sessionId);
    if (messages) {
      this.messages = messages;
      this.suggestions = [];
      this.scrollToBottom();
    }
  }
  /**
   * Handle session delete from history dropdown
   */
  handleSessionDelete(e2) {
    if (!this.historyController) return;
    const newMessages = this.historyController.delete(e2.detail.sessionId);
    if (newMessages.length === 0) {
      this.messages = this.welcomeMessage ? [{
        id: "welcome",
        role: "assistant",
        content: this.welcomeMessage,
        timestamp: /* @__PURE__ */ new Date()
      }] : [];
    } else {
      this.isInitialLoad = true;
      this.messages = newMessages;
    }
    this.suggestions = [];
    this.requestUpdate();
  }
  /**
   * Handle new chat request
   */
  handleNewChat() {
    this.clearHistory();
  }
  toggleFullscreen() {
    this.dispatchEvent(new CustomEvent("fullscreen-toggle", {
      bubbles: true,
      composed: true
    }));
  }
  scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }
    });
  }
  handleSend(e2) {
    this.sendMessage(e2.detail.message);
  }
  handleSendButtonClick() {
    var _a2;
    const input = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("bf-chat-input");
    if (!input) {
      console.warn("[brainform-chat] bf-chat-input element not found in shadow DOM");
      return;
    }
    if (typeof input.triggerSend === "function") {
      input.triggerSend();
    } else {
      console.warn("[brainform-chat] triggerSend method not found on bf-chat-input");
    }
  }
  handlePromptBarClick(e2) {
    var _a2, _b;
    const target = e2.target;
    if (target.closest("button")) {
      return;
    }
    const input = (_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("bf-chat-input");
    (_b = input == null ? void 0 : input.focus) == null ? void 0 : _b.call(input);
  }
  handleSuggestionClick(suggestion) {
    this.sendMessage(suggestion);
  }
  handleSuggestionClickEvent(e2) {
    this.sendMessage(e2.detail.suggestion);
  }
  handleProductClick(e2) {
    this.selectedProduct = e2.detail;
    this.requestUpdate();
  }
  handleProductModalClose(e2) {
    e2.stopPropagation();
    this.selectedProduct = null;
    this.requestUpdate();
  }
  handleSuggestedQuestion(question) {
    this.sendMessage(question);
  }
  handleFeedbackSubmit(e2) {
    var _a2;
    this.dispatchEvent(new CustomEvent("feedback", {
      detail: e2.detail,
      bubbles: true,
      composed: true
    }));
    const isKrupsApi = (_a2 = this.apiUrl) == null ? void 0 : _a2.includes("krups");
    if (isKrupsApi) {
      submitKrupsFeedback(e2.detail).catch(console.error);
    } else if (this.apiClient) {
      this.apiClient.submitFeedback(e2.detail).catch(console.error);
    }
  }
  handleKeyDown(e2) {
    if (e2.key === "Escape") {
      if (this.stage === "expanded") {
        this.setStage("inputBar");
      } else if (this.stage === "inputBar") {
        this.setStage("collapsed");
      }
    }
  }
  // Suggested questions (can be customized via property later)
  get suggestedQuestions() {
    return [
      "What products do you recommend?",
      "Help me find something specific",
      "Tell me about current deals"
    ];
  }
  render() {
    var _a2, _b;
    const isDark = this.darkMode;
    const textColor = isDark ? colors.white : colors.slate[900];
    const mutedColor = isDark ? colors.slate[400] : colors.slate[500];
    const bgColor = isDark ? colors.slate[800] : colors.white;
    const borderColor = isDark ? colors.slate[700] : colors.slate[200];
    const isCollapsed = this.stage === "collapsed";
    const isInputBar = this.stage === "inputBar";
    const isExpanded = this.stage === "expanded";
    const hasMessages = this.messages.length > 0;
    return b`
      <!-- Backdrop for expanded state -->
      <div
        class="backdrop ${isExpanded ? "visible" : ""}"
        @click=${() => this.setStage("inputBar")}
      ></div>

      <!-- Main morphing container -->
      <div
        class="chat-container ${this.stage} ${this.isTransitioning ? "transitioning" : ""}"
        @keydown=${this.handleKeyDown}
        style="
          background-color: ${isCollapsed ? this.primaryColor : bgColor};
          border: ${isCollapsed ? "none" : `1px solid ${borderColor}`};
        "
      >
        <!-- Specular highlight effect -->
        <div class="specular-highlight"></div>

        <!-- Stage 1: Collapsed (button) -->
        <div class="stage-content collapsed-content ${isCollapsed ? "active" : ""}">
          <button
            class="collapsed-button"
            @click=${() => this.setStage("inputBar")}
            style="background-color: ${this.primaryColor}; color: ${colors.white};"
          >
            <svg class="collapsed-icon" viewBox="0 0 40 40" fill="none">
              <path d="M23.6349 28.5335C24.3541 30.0196 24.7899 31.639 24.8787 33.2837V33.2903C24.9596 35.2806 24.6129 37.2272 23.5866 39.0845C23.2125 39.0668 22.8342 39.033 22.4518 38.986C22.4529 38.9841 22.4541 38.9821 22.4552 38.9803L22.4602 38.9738C23.5497 37.1928 23.9231 35.3087 23.8429 33.3318C23.7571 31.7571 23.3215 30.2015 22.6033 28.7811C22.9443 28.7059 23.2889 28.6235 23.6349 28.5335Z" fill="currentColor"/><path d="M24.6848 28.2371C25.5249 29.4899 26.1488 30.8834 26.4943 32.3448L26.5842 32.7577L26.5858 32.7642C26.968 34.8271 26.8718 36.9057 26.0035 38.9892C25.6414 39.0357 25.2739 39.0677 24.9011 39.0845C24.9102 39.0571 24.9192 39.0297 24.9286 39.0023L24.9302 38.9949C24.9307 38.9914 24.9321 38.9865 24.9327 38.9811C24.937 38.9459 24.9478 38.8424 24.9943 38.7295L25.1441 38.363C25.8337 36.5714 25.9028 34.7748 25.5659 32.9515C25.2515 31.3718 24.5796 29.8616 23.6374 28.5327C23.9858 28.4421 24.3357 28.3438 24.6848 28.2371Z" fill="currentColor"/><path d="M22.585 28.7852C23.066 30.3295 23.2599 31.9611 23.1166 33.572L23.1157 33.5785C22.9267 35.4268 22.3742 37.1866 21.2621 38.7938C20.9027 38.7222 20.5405 38.6378 20.1756 38.5405C21.3272 37.0125 21.8942 35.315 22.0825 33.4841L22.1107 33.0973C22.1839 31.7146 21.9902 30.3179 21.565 28.9904C21.8998 28.9288 22.2406 28.8608 22.585 28.7852Z" fill="currentColor"/><path d="M25.7339 27.856C26.716 28.9662 27.512 30.2358 28.0509 31.6078L28.1982 32.0052L28.2007 32.0117C28.8825 34.0327 29.0813 36.1374 28.4852 38.3557C28.4852 38.3594 28.485 38.365 28.4852 38.3711C28.4854 38.3816 28.4846 38.3978 28.4843 38.4184C28.219 38.5078 27.9502 38.5908 27.6765 38.6627C27.5826 38.6879 27.4876 38.7096 27.3928 38.7327C27.4094 38.6268 27.4274 38.5202 27.4477 38.4135V38.4078C27.4478 38.4041 27.4487 38.399 27.4486 38.3931C27.4477 38.358 27.4428 38.254 27.4727 38.1358L27.4752 38.126C28.0202 36.122 27.8495 34.2125 27.2173 32.3358C26.6833 30.8198 25.8084 29.4196 24.6923 28.2346C24.7315 28.2226 24.7712 28.2118 24.8104 28.1996C25.1346 28.1007 25.4423 27.985 25.7339 27.856Z" fill="currentColor"/><path d="M21.5142 28.9993C21.7374 30.5329 21.6846 32.1058 21.3287 33.6176L21.3262 33.6242C20.9104 35.291 20.1989 36.8407 19.045 38.2026C18.6907 38.0875 18.3383 37.9691 17.9884 37.8475C19.1788 36.5547 19.9016 35.0522 20.317 33.3904C20.6414 32.0128 20.6925 30.5738 20.4909 29.1671C20.556 29.1578 20.6216 29.15 20.6873 29.1402C20.958 29.0983 21.2338 29.0504 21.5142 28.9993Z" fill="currentColor"/><path d="M26.7239 27.3225C27.8261 28.2767 28.7714 29.4066 29.486 30.6672L29.689 31.0393L29.6915 31.0458C30.6547 32.9552 31.1513 35.0131 30.8754 37.2921C30.8759 37.2955 30.877 37.3 30.8779 37.3051C30.8788 37.3107 30.879 37.3182 30.8804 37.3271C30.5451 37.522 30.2002 37.703 29.8463 37.8695C29.8471 37.7434 29.8504 37.6162 29.8562 37.4883L29.8554 37.481C29.8549 37.4776 29.8546 37.4723 29.8537 37.4672C29.8478 37.4318 29.8283 37.3292 29.8413 37.2082L29.8429 37.2009L29.882 36.8165C30.0406 34.9086 29.6019 33.1627 28.7647 31.5011L28.5792 31.159C27.8641 29.8978 26.8962 28.7728 25.758 27.8454C26.1039 27.6909 26.4259 27.5159 26.7239 27.3225Z" fill="currentColor"/><path d="M20.3903 29.1818C20.358 30.627 20.082 32.0673 19.5525 33.4189L19.55 33.4254C18.9381 34.9292 18.0793 36.293 16.8619 37.4427C16.5002 37.3085 16.1416 37.1712 15.7862 37.0315C17.0726 35.9331 17.961 34.5851 18.5857 33.05C19.0523 31.8573 19.3037 30.585 19.3478 29.3031C19.6858 29.2731 20.0331 29.2313 20.3903 29.1818Z" fill="currentColor"/><path d="M19.1756 29.3169C18.9189 30.5964 18.4682 31.8386 17.822 32.9808L17.8179 32.9865C17.0078 34.3754 15.9796 35.5974 14.6348 36.5649C14.2565 36.4073 13.8831 36.2463 13.5141 36.0844C14.9763 35.1675 16.0674 33.9396 16.9168 32.4832C17.4678 31.5081 17.8664 30.4506 18.109 29.3577C18.4535 29.36 18.8088 29.3456 19.1756 29.3169Z" fill="currentColor"/><path d="M27.6058 26.6311C28.8157 27.421 29.8972 28.401 30.7739 29.5384L31.0268 29.8805L31.031 29.8854C32.2276 31.6037 33.0011 33.5237 33.0842 35.7497C32.7807 36.0122 32.465 36.2635 32.1383 36.503C32.1276 36.4172 32.1185 36.3309 32.11 36.244L32.1092 36.2367C32.1082 36.2334 32.1066 36.2286 32.105 36.2236C32.0944 36.1903 32.0606 36.0912 32.0559 35.9695V35.9606C32.0158 33.8869 31.3138 32.0964 30.1774 30.4628L29.9453 30.15C29.0759 29.0222 27.9855 28.0563 26.758 27.2997C27.0677 27.0961 27.3507 26.8729 27.6058 26.6311Z" fill="currentColor"/><path d="M17.1481 29.3023C17.3765 29.3294 17.6103 29.344 17.8495 29.352C17.428 30.4058 16.8669 31.4061 16.1706 32.3114L16.1664 32.3171C15.1192 33.6424 13.8591 34.7504 12.292 35.5322C11.8825 35.3426 11.48 35.1518 11.0857 34.9597C12.8441 34.2574 14.2154 33.1268 15.3461 31.6957C15.9236 30.944 16.4 30.1185 16.7729 29.2485C16.8963 29.2694 17.0213 29.2877 17.1481 29.3023Z" fill="currentColor"/><path d="M28.3321 25.7948C29.645 26.4124 30.8572 27.2366 31.8887 28.2452L32.1882 28.5498L32.1924 28.5539C33.5528 30.0184 34.5606 31.716 34.9986 33.7675C34.7364 34.0924 34.4602 34.4093 34.1691 34.7162C34.1681 34.712 34.1668 34.7075 34.1658 34.7032L34.1649 34.6991C34.1633 34.6956 34.1605 34.6908 34.1574 34.6845C34.142 34.6524 34.0952 34.5586 34.0734 34.4385L34.0718 34.4304C33.7373 32.3822 32.7879 30.7049 31.4303 29.242L31.1549 28.9635C30.1463 27.9773 28.9467 27.1763 27.6424 26.5961C27.8016 26.4426 27.9507 26.2828 28.0875 26.1156C28.1738 26.0114 28.2546 25.9039 28.3321 25.7948Z" fill="currentColor"/><path d="M15.4168 28.8576C15.7408 28.9937 16.08 29.1018 16.4351 29.1809C15.9227 29.9915 15.3192 30.7467 14.6298 31.4221L14.6256 31.427C13.2531 32.7374 11.6551 33.7444 9.72126 34.2716C9.2773 34.0387 8.84582 33.8036 8.42674 33.5663C8.42917 33.5652 8.4322 33.5645 8.43506 33.5631C8.46704 33.5469 8.56166 33.4965 8.68382 33.4711L8.69213 33.4702C10.7713 33.0715 12.4499 32.0831 13.896 30.7038C14.4675 30.144 14.9758 29.523 15.4168 28.8576Z" fill="currentColor"/><path d="M14.3386 28.2574C14.5645 28.4204 14.8022 28.5626 15.0491 28.6882C14.4998 29.2919 13.8925 29.8449 13.2321 30.3325L13.2263 30.3365C11.4726 31.5965 9.48791 32.4322 7.14719 32.5622C7.14402 32.5633 7.13934 32.5655 7.13471 32.5671C7.10306 32.578 7.016 32.6075 6.90593 32.6192L6.90676 32.6208C6.89259 32.6227 6.87846 32.6247 6.86433 32.6265C6.45151 32.3615 6.05443 32.0917 5.67463 31.8146C6.03073 31.7293 6.39623 31.6624 6.77281 31.6143L6.77697 31.6126C6.78068 31.6115 6.78654 31.6107 6.79278 31.6086C6.82729 31.5967 6.92789 31.5601 7.05235 31.5516L7.06067 31.5508C9.17828 31.4389 10.9828 30.6887 12.6123 29.5181C13.1735 29.1034 13.6932 28.6357 14.1689 28.1271C14.2254 28.1709 14.2806 28.2161 14.3386 28.2574Z" fill="currentColor"/><path d="M28.8745 24.8493C30.4234 25.324 31.8862 26.0733 33.15 27.0742L33.1549 27.0782L33.4653 27.3388C34.7773 28.4696 35.8411 29.8175 36.5277 31.4807C36.3169 31.8682 36.0883 32.2477 35.8422 32.6184C35.2171 30.6449 34.0406 29.1196 32.4919 27.86C31.2794 26.901 29.8624 26.19 28.3596 25.7573C28.5611 25.4684 28.7311 25.1635 28.8745 24.8493Z" fill="currentColor"/><path d="M13.1389 27.0888C13.3395 27.3535 13.5743 27.6106 13.8336 27.8462C13.2606 28.3026 12.6479 28.7115 12.0008 29.0629L11.995 29.0661C10.0795 30.0749 7.99558 30.6324 5.65966 30.4424C5.65615 30.443 5.65174 30.4438 5.64635 30.4448C5.61415 30.4511 5.52345 30.4693 5.41257 30.466C4.96994 30.4617 4.53886 30.4904 4.11555 30.5458C3.80279 30.2611 3.50675 29.9683 3.22785 29.6671C3.84646 29.5402 4.4803 29.4652 5.13885 29.4538L5.42338 29.4521L5.42754 29.4513C5.43141 29.4506 5.43668 29.4502 5.44335 29.4489C5.47845 29.442 5.58267 29.4194 5.70708 29.4277L5.71623 29.4293C7.82667 29.607 9.71836 29.1104 11.4967 28.1752C12.0748 27.8612 12.6234 27.4958 13.1389 27.0888Z" fill="currentColor"/><path d="M29.2331 23.8444C30.7307 24.0745 32.1901 24.5509 33.5177 25.2703L33.8912 25.4812L33.897 25.4853C35.3714 26.3774 36.644 27.5037 37.6067 28.9741C37.4713 29.3919 37.3162 29.8035 37.1433 30.2087C36.2458 28.5447 34.9442 27.3131 33.3571 26.3518C31.998 25.5532 30.466 25.0383 28.8887 24.82C29.0314 24.5027 29.1451 24.1757 29.2331 23.8444Z" fill="currentColor"/><path d="M12.4551 25.7899C12.4921 25.9065 12.5359 26.0254 12.589 26.1474C12.6636 26.3355 12.7631 26.5286 12.8827 26.7215C12.2704 27.0783 11.6287 27.3871 10.9625 27.6377L10.9567 27.6401C8.91612 28.3783 6.77255 28.6468 4.48577 28.1402C4.48234 28.1403 4.47727 28.1407 4.47246 28.141C4.43849 28.1429 4.34709 28.1479 4.23868 28.1296C3.46631 28.0159 2.71601 28.0062 1.96827 28.0775C1.75986 27.7657 1.567 27.4467 1.3909 27.1198C2.37046 26.9842 3.36172 26.9746 4.39259 27.1263L4.40008 27.1279C4.40351 27.1278 4.40818 27.1274 4.41339 27.1271C4.44 27.1256 4.50745 27.1206 4.5906 27.1287L4.67795 27.1417L4.6871 27.1442C6.75238 27.6077 8.69651 27.3739 10.5907 26.6898L10.9567 26.5448C11.4737 26.3297 11.9745 26.0766 12.4551 25.7899Z" fill="currentColor"/><path d="M28.4236 1.57371C28.7347 1.71229 29.0425 1.86928 29.3463 2.04849C28.9139 2.70028 28.4066 3.30852 27.7988 3.87187L27.7947 3.87431C27.8038 3.86455 27.8033 3.86308 27.7855 3.88815C27.7647 3.91756 27.706 4.00446 27.6108 4.08279L27.6041 4.08849C25.9597 5.39602 24.9499 7.03883 24.3346 8.92098C23.8529 10.4655 23.7216 12.1142 23.9194 13.7258C23.9953 12.0775 24.3878 10.4409 25.1008 8.94296L25.1033 8.93726C26.0475 7.01858 27.3988 5.36775 29.4037 4.17726C29.4059 4.17493 29.4097 4.17245 29.4128 4.16911C29.4352 4.14538 29.4963 4.07773 29.5875 4.01682L29.793 3.86942C30.1363 3.61611 30.4519 3.34352 30.7473 3.05424C30.8064 3.10475 30.8665 3.15487 30.9253 3.20734C31.1179 3.37979 31.3077 3.56414 31.496 3.75867C31.1002 4.14757 30.6678 4.50997 30.189 4.84341L30.1832 4.84748C30.1951 4.83805 30.1958 4.83428 30.174 4.85726C30.1495 4.8832 30.0781 4.96165 29.9719 5.02665L29.9652 5.03153C28.1487 6.10361 26.9148 7.59523 26.0376 9.37784C25.3418 10.8421 24.9778 12.4572 24.9452 14.08C25.2544 12.4559 25.8762 10.8873 26.7963 9.49918L26.7988 9.49429C28.0066 7.72311 29.5798 6.27289 31.734 5.36705C31.7367 5.36494 31.7408 5.3621 31.7448 5.35891C31.7703 5.33849 31.8404 5.28058 31.9395 5.23268C32.1316 5.13504 32.317 5.0306 32.4977 4.92241C32.7007 5.18635 32.8998 5.46416 33.0959 5.7547C32.8775 5.88742 32.6521 6.01432 32.4178 6.13338L32.412 6.13501C32.4249 6.12742 32.4255 6.1247 32.4004 6.14478C32.3722 6.16734 32.2912 6.23584 32.1766 6.28567L32.1691 6.28811C30.2179 7.10224 28.7847 8.41197 27.6624 10.0578C26.7658 11.4122 26.1754 12.96 25.9119 14.5613C26.4491 12.9963 27.2875 11.5285 28.3953 10.2802L28.3995 10.2761C29.8315 8.7039 31.5723 7.49116 33.7989 6.88097C33.9679 7.17256 34.134 7.47434 34.2964 7.78655C34.2624 7.80161 34.2237 7.81844 34.1807 7.83053L34.1724 7.83297C32.1248 8.37323 30.5193 9.47433 29.174 10.9512C28.0928 12.1711 27.2879 13.625 26.7996 15.1762C27.554 13.6983 28.5932 12.3573 29.8687 11.2713L29.8745 11.268C31.2937 10.0908 32.9031 9.21186 34.7939 8.80045C34.9372 9.1089 35.078 9.42553 35.2149 9.75082C33.4282 10.1016 31.907 10.9128 30.5451 12.0425C29.3025 13.1018 28.299 14.4296 27.595 15.8969C28.5519 14.5386 29.771 13.3551 31.1865 12.4545L31.1915 12.4513C32.5467 11.6133 34.0107 11.0136 35.625 10.768C35.7478 11.0869 35.8665 11.4128 35.9828 11.7436C34.4492 11.9446 33.0555 12.5002 31.7464 13.3096C30.3662 14.1888 29.1852 15.3664 28.2797 16.7227C29.4198 15.5088 30.794 14.5034 32.323 13.8048L32.3288 13.8015C33.6002 13.2402 34.9276 12.8697 36.3272 12.7673C36.4331 13.0971 36.5352 13.4307 36.6342 13.7665C35.2858 13.8333 34.0025 14.1782 32.7564 14.7283C31.263 15.4116 29.9241 16.4176 28.8338 17.6388C30.1364 16.5904 31.6421 15.7806 33.2573 15.2967L33.2639 15.2959C34.4607 14.9537 35.6798 14.7679 36.9254 14.7959C37.0175 15.1371 37.1057 15.4793 37.1899 15.8212C35.9646 15.757 34.7583 15.9251 33.5593 16.2674C31.9809 16.7404 30.5112 17.5563 29.2564 18.6185C30.6955 17.7579 32.3021 17.1611 33.9703 16.9018L33.9769 16.901C35.131 16.7367 36.2849 16.711 37.4354 16.8701C37.515 17.2273 37.5907 17.5825 37.6608 17.9345C36.4985 17.7282 35.323 17.735 34.1308 17.9043C32.5017 18.1576 30.9313 18.7647 29.5384 19.6446C31.0851 18.9891 32.7592 18.6178 34.447 18.5884H34.4536C35.6132 18.5829 36.7532 18.7138 37.8638 19.0241C37.9297 19.4033 37.9889 19.7764 38.0418 20.1414C36.8921 19.7581 35.6967 19.5981 34.4594 19.6039C32.8105 19.6336 31.1688 20.02 29.6649 20.7025C31.1523 20.3007 32.7118 20.1482 34.2506 20.279L34.6799 20.323L34.6866 20.3238C35.9008 20.485 37.0726 20.7928 38.1816 21.2986C38.2236 21.7078 38.2569 22.1031 38.2815 22.486C37.1249 21.8688 35.8775 21.5067 34.5543 21.3304C32.9162 21.1343 31.2341 21.294 29.6466 21.7644C31.176 21.5694 32.7419 21.632 34.2465 21.9713L34.6649 22.0723L34.6716 22.0747C35.982 22.4357 37.2139 22.969 38.3314 23.7401C38.3373 24.1751 38.3297 24.5943 38.3097 25.0008C37.1554 24.0676 35.8364 23.4505 34.3896 23.052C32.7962 22.6357 31.1087 22.5656 29.471 22.8158C31.0141 22.8307 32.5562 23.1046 33.9985 23.6456L34.3996 23.8036L34.4054 23.8061C35.8223 24.4153 37.106 25.2325 38.1924 26.3437C38.1353 26.7836 38.0604 27.2107 37.9686 27.6296C36.8914 26.3261 35.5437 25.4056 33.9944 24.7385L33.6275 24.5936C32.235 24.0713 30.7358 23.8178 29.2373 23.8297C29.3135 23.5402 29.371 23.2479 29.4087 22.9559C29.5498 21.8366 29.4198 20.7262 29.0384 19.7025C28.6471 18.6629 28.0038 17.7102 26.8887 16.5427C25.8532 15.4829 24.4537 14.3167 23.1424 13.4977C23.0397 13.433 22.9361 13.3727 22.8345 13.3121C22.7079 11.7369 22.8709 10.138 23.3429 8.62454L23.3454 8.61884C24.0075 6.59024 25.1101 4.77092 26.9261 3.31891C26.928 3.31629 26.9309 3.3129 26.9336 3.30913C26.9524 3.28258 27.004 3.20771 27.0858 3.13486L27.268 2.9614C27.709 2.52955 28.0892 2.06736 28.4236 1.57371Z" fill="currentColor"/><path d="M12.3028 24.2695C12.2814 24.6484 12.2858 25.0014 12.3511 25.364C11.6381 25.6698 10.8976 25.9143 10.1381 26.0863L10.1314 26.0871C8.00513 26.54 5.8443 26.5142 3.65132 25.7003C3.64816 25.7 3.64403 25.6999 3.63967 25.6995C3.60664 25.6968 3.51468 25.6902 3.40922 25.6571C2.47312 25.3847 1.5487 25.2743 0.603035 25.2866C0.601429 25.2817 0.599643 25.2768 0.598044 25.2719C0.489207 24.9462 0.396841 24.6132 0.317675 24.2776C1.3573 24.2408 2.38604 24.3363 3.43085 24.6099L3.70456 24.6856L3.71039 24.6864C3.71411 24.6868 3.71922 24.6875 3.72536 24.688C3.75209 24.6902 3.81964 24.6937 3.90091 24.7133L3.9866 24.7393L3.99408 24.7418C5.97326 25.4823 7.93101 25.5162 9.90429 25.0969L10.2887 25.0024C10.9807 24.8204 11.6549 24.5731 12.3028 24.2695Z" fill="currentColor"/><path d="M0.00402748 21.3019C1.06355 21.4033 2.09219 21.6375 3.11055 22.0601L3.37012 22.1724L3.37428 22.1741C3.37816 22.175 3.38405 22.1758 3.39092 22.1773C3.42607 22.1851 3.53038 22.2064 3.6405 22.2637L3.64882 22.2685C5.50319 23.2709 7.43696 23.5698 9.45005 23.4233C10.4739 23.3352 11.4853 23.1086 12.4534 22.7612C12.4105 23.1266 12.3709 23.4704 12.3378 23.789C12.3352 23.8188 12.3327 23.8484 12.3303 23.8777C11.4258 24.1641 10.4899 24.3548 9.54156 24.4364H9.53491C7.36556 24.5954 5.23005 24.2755 3.17461 23.1717C3.17131 23.1709 3.16702 23.1695 3.16213 23.1684C3.13008 23.1613 3.03923 23.1424 2.93917 23.0951C1.99122 22.6712 1.03062 22.4311 0.0239944 22.3239C0.00124958 21.9774 -0.00513089 21.6354 0.00402748 21.3019Z" fill="currentColor"/><path d="M0.553118 18.4117C1.45443 18.6551 2.31914 19.0015 3.15464 19.4923L3.39674 19.6381L3.40173 19.6414C3.40524 19.6427 3.41016 19.6449 3.41588 19.6471C3.44113 19.6564 3.50418 19.679 3.57644 19.7196L3.65132 19.7668L3.65797 19.7717C5.35278 21.0179 7.2264 21.5785 9.24206 21.7074C10.374 21.7648 11.5143 21.6525 12.6198 21.3898C12.5735 21.7612 12.5292 22.1189 12.4883 22.4599C11.4051 22.6848 10.2931 22.7777 9.18548 22.7213L9.17883 22.7205C7.00733 22.5822 4.93716 21.9741 3.05814 20.5999C3.05537 20.5989 3.05187 20.598 3.04815 20.5966C3.01733 20.5852 2.93014 20.5539 2.83767 20.4932C2.01981 19.9821 1.16783 19.6298 0.261934 19.3865C0.263018 19.3824 0.264171 19.3783 0.265261 19.3743C0.345307 19.0309 0.441488 18.712 0.553118 18.4117Z" fill="currentColor"/><path d="M2.0157 15.9474C2.55267 16.2327 3.06932 16.5638 3.56396 16.9556L3.78277 17.1331L3.78693 17.1372C3.79013 17.139 3.79423 17.1417 3.79941 17.1445C3.82323 17.1573 3.88294 17.1885 3.94916 17.239L4.01738 17.2952L4.02237 17.3009C5.5239 18.7661 7.30023 19.5764 9.27866 19.9785C10.4286 20.1963 11.6132 20.2352 12.782 20.1113C12.7499 20.3499 12.7196 20.5869 12.6905 20.8206C12.6768 20.9296 12.6631 21.0377 12.6497 21.1447C11.4585 21.2492 10.2532 21.1977 9.07733 20.9745L9.07067 20.9729C6.93984 20.5401 4.97644 19.6563 3.31105 18.0395C3.30852 18.0381 3.30534 18.0365 3.3019 18.0346C3.27319 18.0192 3.19116 17.9762 3.10805 17.9035C2.57095 17.4535 2.00325 17.0851 1.40171 16.7764C1.59094 16.4947 1.79576 16.2209 2.0157 15.9474Z" fill="currentColor"/><path d="M3.77528 13.9611C3.96495 14.1316 4.14956 14.3108 4.32936 14.4994L4.52071 14.7055L4.5257 14.7104C4.52844 14.7124 4.53148 14.7162 4.53569 14.7193C4.55741 14.7351 4.61315 14.7724 4.6713 14.8309L4.72953 14.8968L4.73452 14.9042C6.01336 16.5603 7.65878 17.6049 9.56153 18.2724C10.656 18.6401 11.8086 18.8398 12.9692 18.8791C12.911 19.2155 12.8596 19.5534 12.8128 19.8889C11.5909 19.8365 10.3764 19.62 9.21793 19.2301L9.21128 19.2285C7.16388 18.5103 5.3463 17.3673 3.92753 15.541C3.92469 15.5389 3.92029 15.5361 3.91588 15.5329C3.88928 15.5135 3.81445 15.4601 3.74283 15.3773C3.53022 15.1416 3.30941 14.9211 3.07977 14.7144C3.30306 14.4711 3.53488 14.2196 3.77528 13.9611Z" fill="currentColor"/><path d="M5.59726 12.4016L5.60059 12.4065C5.60317 12.4091 5.6065 12.4131 5.61057 12.4171C5.63645 12.4421 5.71374 12.5139 5.77613 12.6199L5.97913 12.9594C6.99797 14.5964 8.40366 15.7572 10.0815 16.6201C11.0678 17.1109 12.1286 17.4559 13.2196 17.6576C13.1403 17.9841 13.0699 18.317 13.0083 18.6527C11.8276 18.4324 10.6775 18.0562 9.60479 17.5216L9.59897 17.5191C7.67316 16.5287 6.03561 15.1491 4.8901 13.1468C4.88769 13.1444 4.88461 13.1414 4.88095 13.1378C4.85773 13.1153 4.79069 13.0519 4.7312 12.9594C4.7288 12.9559 4.7261 12.9524 4.72371 12.9489C4.95861 12.6992 5.19965 12.4443 5.44585 12.1842L5.59726 12.4016Z" fill="currentColor"/><path d="M7.13638 10.5057L7.13971 10.5139C7.90187 12.4489 9.1866 13.896 10.8253 15.0508L11.1531 15.2666C11.9113 15.748 12.7291 16.1402 13.5824 16.4401C13.4688 16.7532 13.3679 17.0785 13.2804 17.4124C12.2008 17.0378 11.1712 16.5259 10.2313 15.8822L10.2246 15.879C8.55519 14.7037 7.19052 13.2194 6.32855 11.2542C6.58277 10.9867 6.84102 10.7142 7.10393 10.4382C7.11509 10.4592 7.12639 10.4816 7.13638 10.5057Z" fill="currentColor"/><path d="M8.80195 8.66933C9.28849 10.6606 10.3473 12.2499 11.7912 13.6028L12.0848 13.8618C12.7113 14.3942 13.3982 14.8588 14.1273 15.2511C13.9599 15.538 13.8126 15.8459 13.683 16.1697C12.7442 15.6703 11.8669 15.0596 11.084 14.3455L11.079 14.3414C9.66633 13.019 8.56766 11.457 7.96917 9.53338C8.24393 9.24666 8.52058 8.95718 8.80195 8.66933Z" fill="currentColor"/><path d="M10.6739 6.85003L10.688 6.93635V6.94368C10.8757 9.00934 11.7035 10.7469 12.9534 12.299C13.5349 13.0013 14.2054 13.6328 14.9418 14.1826C14.8496 14.2833 14.7584 14.3862 14.6672 14.4905C14.5347 14.6429 14.4122 14.8062 14.2978 14.9783C13.5035 14.3833 12.7779 13.7 12.1472 12.9383L12.1431 12.9334C10.9273 11.4251 10.0581 9.72096 9.74206 7.72385C10.0471 7.42208 10.3553 7.1224 10.6672 6.82722C10.6691 6.83472 10.6721 6.84213 10.6739 6.85003Z" fill="currentColor"/><path d="M12.7621 4.97045C12.7676 5.06946 12.772 5.16906 12.7745 5.26933L12.7737 5.2734C12.7724 5.26075 12.7717 5.26051 12.7787 5.28969C12.7869 5.32392 12.8131 5.42545 12.8086 5.54784V5.55517C12.7008 7.62878 13.2743 9.46453 14.2937 11.1735C14.7514 11.9176 15.3002 12.6076 15.9202 13.2323C15.6636 13.4475 15.4154 13.6837 15.1731 13.9359C14.4989 13.2562 13.9014 12.5038 13.4018 11.6907L13.3977 11.685C12.3473 9.92389 11.7158 7.99775 11.7629 5.82473C12.0929 5.5326 12.4254 5.2465 12.7621 4.97045Z" fill="currentColor"/><path d="M25.6108 0.817969C25.9673 0.85901 26.32 0.917845 26.669 0.995502C26.3171 1.78139 25.8702 2.52652 25.2938 3.23421L25.2913 3.23747C25.2895 3.24092 25.287 3.24592 25.2838 3.25213C25.2676 3.28372 25.2209 3.37785 25.1374 3.46875L25.1316 3.47445C23.6873 4.99504 22.9213 6.7629 22.58 8.71331C22.3367 10.2268 22.4194 11.79 22.7921 13.286C22.3843 13.0446 21.987 12.8352 21.6008 12.6622C21.36 11.3048 21.3367 9.90982 21.5567 8.54718L21.5583 8.54148C21.9257 6.44269 22.7588 4.49097 24.3504 2.80585C24.3519 2.80296 24.3548 2.79949 24.357 2.79527C24.372 2.76617 24.4124 2.68418 24.4835 2.60063C24.9424 2.03712 25.3098 1.44453 25.6108 0.817969Z" fill="currentColor"/><path d="M15.1756 3.20978C15.1701 3.52945 15.1501 3.85323 15.1115 4.18133L15.1107 4.18621L15.1182 4.29941C15.1189 4.34466 15.1172 4.40141 15.1065 4.46147L15.1048 4.46962C14.7037 6.50602 15.0094 8.39972 15.7737 10.2289L15.9343 10.5823C16.2495 11.2431 16.6325 11.8735 17.0716 12.4651C16.7651 12.616 16.4747 12.8011 16.1955 13.0124C15.6497 12.2695 15.1848 11.4697 14.8187 10.6263L14.817 10.6198C13.9923 8.64903 13.6422 6.5617 14.0799 4.30674L14.0724 4.1968C14.0718 4.15901 14.0747 4.1137 14.0815 4.06487C14.0864 4.02358 14.0898 3.98224 14.094 3.94109C14.4512 3.68352 14.8121 3.43937 15.1756 3.20978Z" fill="currentColor"/><path d="M23.7031 0.75119C23.4706 1.50274 23.1523 2.2322 22.7222 2.94511L22.7189 2.94918C22.7176 2.95265 22.7159 2.95741 22.7139 2.96303C22.7022 2.99683 22.6709 3.09766 22.6008 3.19919L22.5958 3.20489C21.3834 4.9053 20.8753 6.75711 20.8137 8.73204C20.7909 10.0363 21.0079 11.3451 21.431 12.5881C21.0121 12.4098 20.6081 12.2737 20.223 12.1793C19.9129 11.0522 19.7567 9.88449 19.7771 8.71575L19.7779 8.70924C19.8431 6.58059 20.3914 4.53434 21.728 2.64868C21.7291 2.6458 21.7307 2.64216 21.7322 2.63809C21.7426 2.60804 21.7712 2.52126 21.8295 2.4288L21.9552 2.21217C22.2099 1.76208 22.4149 1.30223 22.5833 0.830999C22.9597 0.791501 23.3331 0.76482 23.7031 0.75119Z" fill="currentColor"/><path d="M17.8644 1.84489C17.8149 2.36681 17.7232 2.8914 17.5824 3.42233L17.5799 3.42803C17.5797 3.43166 17.5802 3.43682 17.5799 3.44269C17.5782 3.4778 17.575 3.58226 17.5367 3.6984L17.5333 3.70736C16.8466 5.6692 16.8817 7.5853 17.3786 9.50081L17.4867 9.87379C17.7232 10.6294 18.0433 11.36 18.4343 12.0539C18.0688 12.0994 17.7258 12.1897 17.401 12.3185C16.9656 11.5075 16.619 10.6509 16.3761 9.76467L16.3736 9.75815C15.8372 7.69433 15.7884 5.57932 16.5425 3.40604L16.5508 3.29692C16.5556 3.25931 16.5645 3.21424 16.5782 3.16662C16.6532 2.88384 16.7125 2.60263 16.7579 2.32211C17.124 2.14389 17.4931 1.98478 17.8644 1.84489Z" fill="currentColor"/><path d="M20.7197 1.11033C20.5916 1.74685 20.4023 2.37782 20.1348 3.00782L20.1324 3.01352C20.1316 3.01713 20.1301 3.02242 20.129 3.02818C20.1223 3.06306 20.1047 3.1659 20.0508 3.27493L20.0467 3.28389C19.0866 5.13528 18.8487 7.03974 19.0699 9.00648C19.205 10.0747 19.5015 11.1229 19.936 12.1158C19.7951 12.0883 19.6569 12.0668 19.5217 12.0514C19.2645 12.0226 19.0177 12.0142 18.7804 12.0245C18.4173 11.0911 18.1641 10.1166 18.0392 9.12375L18.0383 9.11724C17.8004 7.00158 18.0524 4.90235 19.1066 2.8539C19.1073 2.85021 19.1095 2.84454 19.1107 2.83843C19.1169 2.80615 19.1328 2.71745 19.1773 2.61855C19.3567 2.1959 19.4974 1.7714 19.6057 1.34324C19.9796 1.25938 20.3508 1.18012 20.7197 1.11033Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <!-- Stage 2: InputBar -->
        <div class="stage-content inputbar-content ${isInputBar ? "active" : ""}">
          <div
            class="inputbar-wrapper"
          >
            <!-- AI Icon -->
            <div
              class="inputbar-icon"
              style="background-color: ${this.primaryColor}; color: ${colors.white};"
            >
              <svg viewBox="0 0 40 40" fill="none">
                <path d="M23.6349 28.5335C24.3541 30.0196 24.7899 31.639 24.8787 33.2837V33.2903C24.9596 35.2806 24.6129 37.2272 23.5866 39.0845C23.2125 39.0668 22.8342 39.033 22.4518 38.986C22.4529 38.9841 22.4541 38.9821 22.4552 38.9803L22.4602 38.9738C23.5497 37.1928 23.9231 35.3087 23.8429 33.3318C23.7571 31.7571 23.3215 30.2015 22.6033 28.7811C22.9443 28.7059 23.2889 28.6235 23.6349 28.5335Z" fill="currentColor"/><path d="M24.6848 28.2371C25.5249 29.4899 26.1488 30.8834 26.4943 32.3448L26.5842 32.7577L26.5858 32.7642C26.968 34.8271 26.8718 36.9057 26.0035 38.9892C25.6414 39.0357 25.2739 39.0677 24.9011 39.0845C24.9102 39.0571 24.9192 39.0297 24.9286 39.0023L24.9302 38.9949C24.9307 38.9914 24.9321 38.9865 24.9327 38.9811C24.937 38.9459 24.9478 38.8424 24.9943 38.7295L25.1441 38.363C25.8337 36.5714 25.9028 34.7748 25.5659 32.9515C25.2515 31.3718 24.5796 29.8616 23.6374 28.5327C23.9858 28.4421 24.3357 28.3438 24.6848 28.2371Z" fill="currentColor"/><path d="M22.585 28.7852C23.066 30.3295 23.2599 31.9611 23.1166 33.572L23.1157 33.5785C22.9267 35.4268 22.3742 37.1866 21.2621 38.7938C20.9027 38.7222 20.5405 38.6378 20.1756 38.5405C21.3272 37.0125 21.8942 35.315 22.0825 33.4841L22.1107 33.0973C22.1839 31.7146 21.9902 30.3179 21.565 28.9904C21.8998 28.9288 22.2406 28.8608 22.585 28.7852Z" fill="currentColor"/><path d="M25.7339 27.856C26.716 28.9662 27.512 30.2358 28.0509 31.6078L28.1982 32.0052L28.2007 32.0117C28.8825 34.0327 29.0813 36.1374 28.4852 38.3557C28.4852 38.3594 28.485 38.365 28.4852 38.3711C28.4854 38.3816 28.4846 38.3978 28.4843 38.4184C28.219 38.5078 27.9502 38.5908 27.6765 38.6627C27.5826 38.6879 27.4876 38.7096 27.3928 38.7327C27.4094 38.6268 27.4274 38.5202 27.4477 38.4135V38.4078C27.4478 38.4041 27.4487 38.399 27.4486 38.3931C27.4477 38.358 27.4428 38.254 27.4727 38.1358L27.4752 38.126C28.0202 36.122 27.8495 34.2125 27.2173 32.3358C26.6833 30.8198 25.8084 29.4196 24.6923 28.2346C24.7315 28.2226 24.7712 28.2118 24.8104 28.1996C25.1346 28.1007 25.4423 27.985 25.7339 27.856Z" fill="currentColor"/><path d="M21.5142 28.9993C21.7374 30.5329 21.6846 32.1058 21.3287 33.6176L21.3262 33.6242C20.9104 35.291 20.1989 36.8407 19.045 38.2026C18.6907 38.0875 18.3383 37.9691 17.9884 37.8475C19.1788 36.5547 19.9016 35.0522 20.317 33.3904C20.6414 32.0128 20.6925 30.5738 20.4909 29.1671C20.556 29.1578 20.6216 29.15 20.6873 29.1402C20.958 29.0983 21.2338 29.0504 21.5142 28.9993Z" fill="currentColor"/><path d="M26.7239 27.3225C27.8261 28.2767 28.7714 29.4066 29.486 30.6672L29.689 31.0393L29.6915 31.0458C30.6547 32.9552 31.1513 35.0131 30.8754 37.2921C30.8759 37.2955 30.877 37.3 30.8779 37.3051C30.8788 37.3107 30.879 37.3182 30.8804 37.3271C30.5451 37.522 30.2002 37.703 29.8463 37.8695C29.8471 37.7434 29.8504 37.6162 29.8562 37.4883L29.8554 37.481C29.8549 37.4776 29.8546 37.4723 29.8537 37.4672C29.8478 37.4318 29.8283 37.3292 29.8413 37.2082L29.8429 37.2009L29.882 36.8165C30.0406 34.9086 29.6019 33.1627 28.7647 31.5011L28.5792 31.159C27.8641 29.8978 26.8962 28.7728 25.758 27.8454C26.1039 27.6909 26.4259 27.5159 26.7239 27.3225Z" fill="currentColor"/><path d="M20.3903 29.1818C20.358 30.627 20.082 32.0673 19.5525 33.4189L19.55 33.4254C18.9381 34.9292 18.0793 36.293 16.8619 37.4427C16.5002 37.3085 16.1416 37.1712 15.7862 37.0315C17.0726 35.9331 17.961 34.5851 18.5857 33.05C19.0523 31.8573 19.3037 30.585 19.3478 29.3031C19.6858 29.2731 20.0331 29.2313 20.3903 29.1818Z" fill="currentColor"/><path d="M19.1756 29.3169C18.9189 30.5964 18.4682 31.8386 17.822 32.9808L17.8179 32.9865C17.0078 34.3754 15.9796 35.5974 14.6348 36.5649C14.2565 36.4073 13.8831 36.2463 13.5141 36.0844C14.9763 35.1675 16.0674 33.9396 16.9168 32.4832C17.4678 31.5081 17.8664 30.4506 18.109 29.3577C18.4535 29.36 18.8088 29.3456 19.1756 29.3169Z" fill="currentColor"/><path d="M27.6058 26.6311C28.8157 27.421 29.8972 28.401 30.7739 29.5384L31.0268 29.8805L31.031 29.8854C32.2276 31.6037 33.0011 33.5237 33.0842 35.7497C32.7807 36.0122 32.465 36.2635 32.1383 36.503C32.1276 36.4172 32.1185 36.3309 32.11 36.244L32.1092 36.2367C32.1082 36.2334 32.1066 36.2286 32.105 36.2236C32.0944 36.1903 32.0606 36.0912 32.0559 35.9695V35.9606C32.0158 33.8869 31.3138 32.0964 30.1774 30.4628L29.9453 30.15C29.0759 29.0222 27.9855 28.0563 26.758 27.2997C27.0677 27.0961 27.3507 26.8729 27.6058 26.6311Z" fill="currentColor"/><path d="M17.1481 29.3023C17.3765 29.3294 17.6103 29.344 17.8495 29.352C17.428 30.4058 16.8669 31.4061 16.1706 32.3114L16.1664 32.3171C15.1192 33.6424 13.8591 34.7504 12.292 35.5322C11.8825 35.3426 11.48 35.1518 11.0857 34.9597C12.8441 34.2574 14.2154 33.1268 15.3461 31.6957C15.9236 30.944 16.4 30.1185 16.7729 29.2485C16.8963 29.2694 17.0213 29.2877 17.1481 29.3023Z" fill="currentColor"/><path d="M28.3321 25.7948C29.645 26.4124 30.8572 27.2366 31.8887 28.2452L32.1882 28.5498L32.1924 28.5539C33.5528 30.0184 34.5606 31.716 34.9986 33.7675C34.7364 34.0924 34.4602 34.4093 34.1691 34.7162C34.1681 34.712 34.1668 34.7075 34.1658 34.7032L34.1649 34.6991C34.1633 34.6956 34.1605 34.6908 34.1574 34.6845C34.142 34.6524 34.0952 34.5586 34.0734 34.4385L34.0718 34.4304C33.7373 32.3822 32.7879 30.7049 31.4303 29.242L31.1549 28.9635C30.1463 27.9773 28.9467 27.1763 27.6424 26.5961C27.8016 26.4426 27.9507 26.2828 28.0875 26.1156C28.1738 26.0114 28.2546 25.9039 28.3321 25.7948Z" fill="currentColor"/><path d="M15.4168 28.8576C15.7408 28.9937 16.08 29.1018 16.4351 29.1809C15.9227 29.9915 15.3192 30.7467 14.6298 31.4221L14.6256 31.427C13.2531 32.7374 11.6551 33.7444 9.72126 34.2716C9.2773 34.0387 8.84582 33.8036 8.42674 33.5663C8.42917 33.5652 8.4322 33.5645 8.43506 33.5631C8.46704 33.5469 8.56166 33.4965 8.68382 33.4711L8.69213 33.4702C10.7713 33.0715 12.4499 32.0831 13.896 30.7038C14.4675 30.144 14.9758 29.523 15.4168 28.8576Z" fill="currentColor"/><path d="M14.3386 28.2574C14.5645 28.4204 14.8022 28.5626 15.0491 28.6882C14.4998 29.2919 13.8925 29.8449 13.2321 30.3325L13.2263 30.3365C11.4726 31.5965 9.48791 32.4322 7.14719 32.5622C7.14402 32.5633 7.13934 32.5655 7.13471 32.5671C7.10306 32.578 7.016 32.6075 6.90593 32.6192L6.90676 32.6208C6.89259 32.6227 6.87846 32.6247 6.86433 32.6265C6.45151 32.3615 6.05443 32.0917 5.67463 31.8146C6.03073 31.7293 6.39623 31.6624 6.77281 31.6143L6.77697 31.6126C6.78068 31.6115 6.78654 31.6107 6.79278 31.6086C6.82729 31.5967 6.92789 31.5601 7.05235 31.5516L7.06067 31.5508C9.17828 31.4389 10.9828 30.6887 12.6123 29.5181C13.1735 29.1034 13.6932 28.6357 14.1689 28.1271C14.2254 28.1709 14.2806 28.2161 14.3386 28.2574Z" fill="currentColor"/><path d="M28.8745 24.8493C30.4234 25.324 31.8862 26.0733 33.15 27.0742L33.1549 27.0782L33.4653 27.3388C34.7773 28.4696 35.8411 29.8175 36.5277 31.4807C36.3169 31.8682 36.0883 32.2477 35.8422 32.6184C35.2171 30.6449 34.0406 29.1196 32.4919 27.86C31.2794 26.901 29.8624 26.19 28.3596 25.7573C28.5611 25.4684 28.7311 25.1635 28.8745 24.8493Z" fill="currentColor"/><path d="M13.1389 27.0888C13.3395 27.3535 13.5743 27.6106 13.8336 27.8462C13.2606 28.3026 12.6479 28.7115 12.0008 29.0629L11.995 29.0661C10.0795 30.0749 7.99558 30.6324 5.65966 30.4424C5.65615 30.443 5.65174 30.4438 5.64635 30.4448C5.61415 30.4511 5.52345 30.4693 5.41257 30.466C4.96994 30.4617 4.53886 30.4904 4.11555 30.5458C3.80279 30.2611 3.50675 29.9683 3.22785 29.6671C3.84646 29.5402 4.4803 29.4652 5.13885 29.4538L5.42338 29.4521L5.42754 29.4513C5.43141 29.4506 5.43668 29.4502 5.44335 29.4489C5.47845 29.442 5.58267 29.4194 5.70708 29.4277L5.71623 29.4293C7.82667 29.607 9.71836 29.1104 11.4967 28.1752C12.0748 27.8612 12.6234 27.4958 13.1389 27.0888Z" fill="currentColor"/><path d="M29.2331 23.8444C30.7307 24.0745 32.1901 24.5509 33.5177 25.2703L33.8912 25.4812L33.897 25.4853C35.3714 26.3774 36.644 27.5037 37.6067 28.9741C37.4713 29.3919 37.3162 29.8035 37.1433 30.2087C36.2458 28.5447 34.9442 27.3131 33.3571 26.3518C31.998 25.5532 30.466 25.0383 28.8887 24.82C29.0314 24.5027 29.1451 24.1757 29.2331 23.8444Z" fill="currentColor"/><path d="M12.4551 25.7899C12.4921 25.9065 12.5359 26.0254 12.589 26.1474C12.6636 26.3355 12.7631 26.5286 12.8827 26.7215C12.2704 27.0783 11.6287 27.3871 10.9625 27.6377L10.9567 27.6401C8.91612 28.3783 6.77255 28.6468 4.48577 28.1402C4.48234 28.1403 4.47727 28.1407 4.47246 28.141C4.43849 28.1429 4.34709 28.1479 4.23868 28.1296C3.46631 28.0159 2.71601 28.0062 1.96827 28.0775C1.75986 27.7657 1.567 27.4467 1.3909 27.1198C2.37046 26.9842 3.36172 26.9746 4.39259 27.1263L4.40008 27.1279C4.40351 27.1278 4.40818 27.1274 4.41339 27.1271C4.44 27.1256 4.50745 27.1206 4.5906 27.1287L4.67795 27.1417L4.6871 27.1442C6.75238 27.6077 8.69651 27.3739 10.5907 26.6898L10.9567 26.5448C11.4737 26.3297 11.9745 26.0766 12.4551 25.7899Z" fill="currentColor"/><path d="M28.4236 1.57371C28.7347 1.71229 29.0425 1.86928 29.3463 2.04849C28.9139 2.70028 28.4066 3.30852 27.7988 3.87187L27.7947 3.87431C27.8038 3.86455 27.8033 3.86308 27.7855 3.88815C27.7647 3.91756 27.706 4.00446 27.6108 4.08279L27.6041 4.08849C25.9597 5.39602 24.9499 7.03883 24.3346 8.92098C23.8529 10.4655 23.7216 12.1142 23.9194 13.7258C23.9953 12.0775 24.3878 10.4409 25.1008 8.94296L25.1033 8.93726C26.0475 7.01858 27.3988 5.36775 29.4037 4.17726C29.4059 4.17493 29.4097 4.17245 29.4128 4.16911C29.4352 4.14538 29.4963 4.07773 29.5875 4.01682L29.793 3.86942C30.1363 3.61611 30.4519 3.34352 30.7473 3.05424C30.8064 3.10475 30.8665 3.15487 30.9253 3.20734C31.1179 3.37979 31.3077 3.56414 31.496 3.75867C31.1002 4.14757 30.6678 4.50997 30.189 4.84341L30.1832 4.84748C30.1951 4.83805 30.1958 4.83428 30.174 4.85726C30.1495 4.8832 30.0781 4.96165 29.9719 5.02665L29.9652 5.03153C28.1487 6.10361 26.9148 7.59523 26.0376 9.37784C25.3418 10.8421 24.9778 12.4572 24.9452 14.08C25.2544 12.4559 25.8762 10.8873 26.7963 9.49918L26.7988 9.49429C28.0066 7.72311 29.5798 6.27289 31.734 5.36705C31.7367 5.36494 31.7408 5.3621 31.7448 5.35891C31.7703 5.33849 31.8404 5.28058 31.9395 5.23268C32.1316 5.13504 32.317 5.0306 32.4977 4.92241C32.7007 5.18635 32.8998 5.46416 33.0959 5.7547C32.8775 5.88742 32.6521 6.01432 32.4178 6.13338L32.412 6.13501C32.4249 6.12742 32.4255 6.1247 32.4004 6.14478C32.3722 6.16734 32.2912 6.23584 32.1766 6.28567L32.1691 6.28811C30.2179 7.10224 28.7847 8.41197 27.6624 10.0578C26.7658 11.4122 26.1754 12.96 25.9119 14.5613C26.4491 12.9963 27.2875 11.5285 28.3953 10.2802L28.3995 10.2761C29.8315 8.7039 31.5723 7.49116 33.7989 6.88097C33.9679 7.17256 34.134 7.47434 34.2964 7.78655C34.2624 7.80161 34.2237 7.81844 34.1807 7.83053L34.1724 7.83297C32.1248 8.37323 30.5193 9.47433 29.174 10.9512C28.0928 12.1711 27.2879 13.625 26.7996 15.1762C27.554 13.6983 28.5932 12.3573 29.8687 11.2713L29.8745 11.268C31.2937 10.0908 32.9031 9.21186 34.7939 8.80045C34.9372 9.1089 35.078 9.42553 35.2149 9.75082C33.4282 10.1016 31.907 10.9128 30.5451 12.0425C29.3025 13.1018 28.299 14.4296 27.595 15.8969C28.5519 14.5386 29.771 13.3551 31.1865 12.4545L31.1915 12.4513C32.5467 11.6133 34.0107 11.0136 35.625 10.768C35.7478 11.0869 35.8665 11.4128 35.9828 11.7436C34.4492 11.9446 33.0555 12.5002 31.7464 13.3096C30.3662 14.1888 29.1852 15.3664 28.2797 16.7227C29.4198 15.5088 30.794 14.5034 32.323 13.8048L32.3288 13.8015C33.6002 13.2402 34.9276 12.8697 36.3272 12.7673C36.4331 13.0971 36.5352 13.4307 36.6342 13.7665C35.2858 13.8333 34.0025 14.1782 32.7564 14.7283C31.263 15.4116 29.9241 16.4176 28.8338 17.6388C30.1364 16.5904 31.6421 15.7806 33.2573 15.2967L33.2639 15.2959C34.4607 14.9537 35.6798 14.7679 36.9254 14.7959C37.0175 15.1371 37.1057 15.4793 37.1899 15.8212C35.9646 15.757 34.7583 15.9251 33.5593 16.2674C31.9809 16.7404 30.5112 17.5563 29.2564 18.6185C30.6955 17.7579 32.3021 17.1611 33.9703 16.9018L33.9769 16.901C35.131 16.7367 36.2849 16.711 37.4354 16.8701C37.515 17.2273 37.5907 17.5825 37.6608 17.9345C36.4985 17.7282 35.323 17.735 34.1308 17.9043C32.5017 18.1576 30.9313 18.7647 29.5384 19.6446C31.0851 18.9891 32.7592 18.6178 34.447 18.5884H34.4536C35.6132 18.5829 36.7532 18.7138 37.8638 19.0241C37.9297 19.4033 37.9889 19.7764 38.0418 20.1414C36.8921 19.7581 35.6967 19.5981 34.4594 19.6039C32.8105 19.6336 31.1688 20.02 29.6649 20.7025C31.1523 20.3007 32.7118 20.1482 34.2506 20.279L34.6799 20.323L34.6866 20.3238C35.9008 20.485 37.0726 20.7928 38.1816 21.2986C38.2236 21.7078 38.2569 22.1031 38.2815 22.486C37.1249 21.8688 35.8775 21.5067 34.5543 21.3304C32.9162 21.1343 31.2341 21.294 29.6466 21.7644C31.176 21.5694 32.7419 21.632 34.2465 21.9713L34.6649 22.0723L34.6716 22.0747C35.982 22.4357 37.2139 22.969 38.3314 23.7401C38.3373 24.1751 38.3297 24.5943 38.3097 25.0008C37.1554 24.0676 35.8364 23.4505 34.3896 23.052C32.7962 22.6357 31.1087 22.5656 29.471 22.8158C31.0141 22.8307 32.5562 23.1046 33.9985 23.6456L34.3996 23.8036L34.4054 23.8061C35.8223 24.4153 37.106 25.2325 38.1924 26.3437C38.1353 26.7836 38.0604 27.2107 37.9686 27.6296C36.8914 26.3261 35.5437 25.4056 33.9944 24.7385L33.6275 24.5936C32.235 24.0713 30.7358 23.8178 29.2373 23.8297C29.3135 23.5402 29.371 23.2479 29.4087 22.9559C29.5498 21.8366 29.4198 20.7262 29.0384 19.7025C28.6471 18.6629 28.0038 17.7102 26.8887 16.5427C25.8532 15.4829 24.4537 14.3167 23.1424 13.4977C23.0397 13.433 22.9361 13.3727 22.8345 13.3121C22.7079 11.7369 22.8709 10.138 23.3429 8.62454L23.3454 8.61884C24.0075 6.59024 25.1101 4.77092 26.9261 3.31891C26.928 3.31629 26.9309 3.3129 26.9336 3.30913C26.9524 3.28258 27.004 3.20771 27.0858 3.13486L27.268 2.9614C27.709 2.52955 28.0892 2.06736 28.4236 1.57371Z" fill="currentColor"/><path d="M12.3028 24.2695C12.2814 24.6484 12.2858 25.0014 12.3511 25.364C11.6381 25.6698 10.8976 25.9143 10.1381 26.0863L10.1314 26.0871C8.00513 26.54 5.8443 26.5142 3.65132 25.7003C3.64816 25.7 3.64403 25.6999 3.63967 25.6995C3.60664 25.6968 3.51468 25.6902 3.40922 25.6571C2.47312 25.3847 1.5487 25.2743 0.603035 25.2866C0.601429 25.2817 0.599643 25.2768 0.598044 25.2719C0.489207 24.9462 0.396841 24.6132 0.317675 24.2776C1.3573 24.2408 2.38604 24.3363 3.43085 24.6099L3.70456 24.6856L3.71039 24.6864C3.71411 24.6868 3.71922 24.6875 3.72536 24.688C3.75209 24.6902 3.81964 24.6937 3.90091 24.7133L3.9866 24.7393L3.99408 24.7418C5.97326 25.4823 7.93101 25.5162 9.90429 25.0969L10.2887 25.0024C10.9807 24.8204 11.6549 24.5731 12.3028 24.2695Z" fill="currentColor"/><path d="M0.00402748 21.3019C1.06355 21.4033 2.09219 21.6375 3.11055 22.0601L3.37012 22.1724L3.37428 22.1741C3.37816 22.175 3.38405 22.1758 3.39092 22.1773C3.42607 22.1851 3.53038 22.2064 3.6405 22.2637L3.64882 22.2685C5.50319 23.2709 7.43696 23.5698 9.45005 23.4233C10.4739 23.3352 11.4853 23.1086 12.4534 22.7612C12.4105 23.1266 12.3709 23.4704 12.3378 23.789C12.3352 23.8188 12.3327 23.8484 12.3303 23.8777C11.4258 24.1641 10.4899 24.3548 9.54156 24.4364H9.53491C7.36556 24.5954 5.23005 24.2755 3.17461 23.1717C3.17131 23.1709 3.16702 23.1695 3.16213 23.1684C3.13008 23.1613 3.03923 23.1424 2.93917 23.0951C1.99122 22.6712 1.03062 22.4311 0.0239944 22.3239C0.00124958 21.9774 -0.00513089 21.6354 0.00402748 21.3019Z" fill="currentColor"/><path d="M0.553118 18.4117C1.45443 18.6551 2.31914 19.0015 3.15464 19.4923L3.39674 19.6381L3.40173 19.6414C3.40524 19.6427 3.41016 19.6449 3.41588 19.6471C3.44113 19.6564 3.50418 19.679 3.57644 19.7196L3.65132 19.7668L3.65797 19.7717C5.35278 21.0179 7.2264 21.5785 9.24206 21.7074C10.374 21.7648 11.5143 21.6525 12.6198 21.3898C12.5735 21.7612 12.5292 22.1189 12.4883 22.4599C11.4051 22.6848 10.2931 22.7777 9.18548 22.7213L9.17883 22.7205C7.00733 22.5822 4.93716 21.9741 3.05814 20.5999C3.05537 20.5989 3.05187 20.598 3.04815 20.5966C3.01733 20.5852 2.93014 20.5539 2.83767 20.4932C2.01981 19.9821 1.16783 19.6298 0.261934 19.3865C0.263018 19.3824 0.264171 19.3783 0.265261 19.3743C0.345307 19.0309 0.441488 18.712 0.553118 18.4117Z" fill="currentColor"/><path d="M2.0157 15.9474C2.55267 16.2327 3.06932 16.5638 3.56396 16.9556L3.78277 17.1331L3.78693 17.1372C3.79013 17.139 3.79423 17.1417 3.79941 17.1445C3.82323 17.1573 3.88294 17.1885 3.94916 17.239L4.01738 17.2952L4.02237 17.3009C5.5239 18.7661 7.30023 19.5764 9.27866 19.9785C10.4286 20.1963 11.6132 20.2352 12.782 20.1113C12.7499 20.3499 12.7196 20.5869 12.6905 20.8206C12.6768 20.9296 12.6631 21.0377 12.6497 21.1447C11.4585 21.2492 10.2532 21.1977 9.07733 20.9745L9.07067 20.9729C6.93984 20.5401 4.97644 19.6563 3.31105 18.0395C3.30852 18.0381 3.30534 18.0365 3.3019 18.0346C3.27319 18.0192 3.19116 17.9762 3.10805 17.9035C2.57095 17.4535 2.00325 17.0851 1.40171 16.7764C1.59094 16.4947 1.79576 16.2209 2.0157 15.9474Z" fill="currentColor"/><path d="M3.77528 13.9611C3.96495 14.1316 4.14956 14.3108 4.32936 14.4994L4.52071 14.7055L4.5257 14.7104C4.52844 14.7124 4.53148 14.7162 4.53569 14.7193C4.55741 14.7351 4.61315 14.7724 4.6713 14.8309L4.72953 14.8968L4.73452 14.9042C6.01336 16.5603 7.65878 17.6049 9.56153 18.2724C10.656 18.6401 11.8086 18.8398 12.9692 18.8791C12.911 19.2155 12.8596 19.5534 12.8128 19.8889C11.5909 19.8365 10.3764 19.62 9.21793 19.2301L9.21128 19.2285C7.16388 18.5103 5.3463 17.3673 3.92753 15.541C3.92469 15.5389 3.92029 15.5361 3.91588 15.5329C3.88928 15.5135 3.81445 15.4601 3.74283 15.3773C3.53022 15.1416 3.30941 14.9211 3.07977 14.7144C3.30306 14.4711 3.53488 14.2196 3.77528 13.9611Z" fill="currentColor"/><path d="M5.59726 12.4016L5.60059 12.4065C5.60317 12.4091 5.6065 12.4131 5.61057 12.4171C5.63645 12.4421 5.71374 12.5139 5.77613 12.6199L5.97913 12.9594C6.99797 14.5964 8.40366 15.7572 10.0815 16.6201C11.0678 17.1109 12.1286 17.4559 13.2196 17.6576C13.1403 17.9841 13.0699 18.317 13.0083 18.6527C11.8276 18.4324 10.6775 18.0562 9.60479 17.5216L9.59897 17.5191C7.67316 16.5287 6.03561 15.1491 4.8901 13.1468C4.88769 13.1444 4.88461 13.1414 4.88095 13.1378C4.85773 13.1153 4.79069 13.0519 4.7312 12.9594C4.7288 12.9559 4.7261 12.9524 4.72371 12.9489C4.95861 12.6992 5.19965 12.4443 5.44585 12.1842L5.59726 12.4016Z" fill="currentColor"/><path d="M7.13638 10.5057L7.13971 10.5139C7.90187 12.4489 9.1866 13.896 10.8253 15.0508L11.1531 15.2666C11.9113 15.748 12.7291 16.1402 13.5824 16.4401C13.4688 16.7532 13.3679 17.0785 13.2804 17.4124C12.2008 17.0378 11.1712 16.5259 10.2313 15.8822L10.2246 15.879C8.55519 14.7037 7.19052 13.2194 6.32855 11.2542C6.58277 10.9867 6.84102 10.7142 7.10393 10.4382C7.11509 10.4592 7.12639 10.4816 7.13638 10.5057Z" fill="currentColor"/><path d="M8.80195 8.66933C9.28849 10.6606 10.3473 12.2499 11.7912 13.6028L12.0848 13.8618C12.7113 14.3942 13.3982 14.8588 14.1273 15.2511C13.9599 15.538 13.8126 15.8459 13.683 16.1697C12.7442 15.6703 11.8669 15.0596 11.084 14.3455L11.079 14.3414C9.66633 13.019 8.56766 11.457 7.96917 9.53338C8.24393 9.24666 8.52058 8.95718 8.80195 8.66933Z" fill="currentColor"/><path d="M10.6739 6.85003L10.688 6.93635V6.94368C10.8757 9.00934 11.7035 10.7469 12.9534 12.299C13.5349 13.0013 14.2054 13.6328 14.9418 14.1826C14.8496 14.2833 14.7584 14.3862 14.6672 14.4905C14.5347 14.6429 14.4122 14.8062 14.2978 14.9783C13.5035 14.3833 12.7779 13.7 12.1472 12.9383L12.1431 12.9334C10.9273 11.4251 10.0581 9.72096 9.74206 7.72385C10.0471 7.42208 10.3553 7.1224 10.6672 6.82722C10.6691 6.83472 10.6721 6.84213 10.6739 6.85003Z" fill="currentColor"/><path d="M12.7621 4.97045C12.7676 5.06946 12.772 5.16906 12.7745 5.26933L12.7737 5.2734C12.7724 5.26075 12.7717 5.26051 12.7787 5.28969C12.7869 5.32392 12.8131 5.42545 12.8086 5.54784V5.55517C12.7008 7.62878 13.2743 9.46453 14.2937 11.1735C14.7514 11.9176 15.3002 12.6076 15.9202 13.2323C15.6636 13.4475 15.4154 13.6837 15.1731 13.9359C14.4989 13.2562 13.9014 12.5038 13.4018 11.6907L13.3977 11.685C12.3473 9.92389 11.7158 7.99775 11.7629 5.82473C12.0929 5.5326 12.4254 5.2465 12.7621 4.97045Z" fill="currentColor"/><path d="M25.6108 0.817969C25.9673 0.85901 26.32 0.917845 26.669 0.995502C26.3171 1.78139 25.8702 2.52652 25.2938 3.23421L25.2913 3.23747C25.2895 3.24092 25.287 3.24592 25.2838 3.25213C25.2676 3.28372 25.2209 3.37785 25.1374 3.46875L25.1316 3.47445C23.6873 4.99504 22.9213 6.7629 22.58 8.71331C22.3367 10.2268 22.4194 11.79 22.7921 13.286C22.3843 13.0446 21.987 12.8352 21.6008 12.6622C21.36 11.3048 21.3367 9.90982 21.5567 8.54718L21.5583 8.54148C21.9257 6.44269 22.7588 4.49097 24.3504 2.80585C24.3519 2.80296 24.3548 2.79949 24.357 2.79527C24.372 2.76617 24.4124 2.68418 24.4835 2.60063C24.9424 2.03712 25.3098 1.44453 25.6108 0.817969Z" fill="currentColor"/><path d="M15.1756 3.20978C15.1701 3.52945 15.1501 3.85323 15.1115 4.18133L15.1107 4.18621L15.1182 4.29941C15.1189 4.34466 15.1172 4.40141 15.1065 4.46147L15.1048 4.46962C14.7037 6.50602 15.0094 8.39972 15.7737 10.2289L15.9343 10.5823C16.2495 11.2431 16.6325 11.8735 17.0716 12.4651C16.7651 12.616 16.4747 12.8011 16.1955 13.0124C15.6497 12.2695 15.1848 11.4697 14.8187 10.6263L14.817 10.6198C13.9923 8.64903 13.6422 6.5617 14.0799 4.30674L14.0724 4.1968C14.0718 4.15901 14.0747 4.1137 14.0815 4.06487C14.0864 4.02358 14.0898 3.98224 14.094 3.94109C14.4512 3.68352 14.8121 3.43937 15.1756 3.20978Z" fill="currentColor"/><path d="M23.7031 0.75119C23.4706 1.50274 23.1523 2.2322 22.7222 2.94511L22.7189 2.94918C22.7176 2.95265 22.7159 2.95741 22.7139 2.96303C22.7022 2.99683 22.6709 3.09766 22.6008 3.19919L22.5958 3.20489C21.3834 4.9053 20.8753 6.75711 20.8137 8.73204C20.7909 10.0363 21.0079 11.3451 21.431 12.5881C21.0121 12.4098 20.6081 12.2737 20.223 12.1793C19.9129 11.0522 19.7567 9.88449 19.7771 8.71575L19.7779 8.70924C19.8431 6.58059 20.3914 4.53434 21.728 2.64868C21.7291 2.6458 21.7307 2.64216 21.7322 2.63809C21.7426 2.60804 21.7712 2.52126 21.8295 2.4288L21.9552 2.21217C22.2099 1.76208 22.4149 1.30223 22.5833 0.830999C22.9597 0.791501 23.3331 0.76482 23.7031 0.75119Z" fill="currentColor"/><path d="M17.8644 1.84489C17.8149 2.36681 17.7232 2.8914 17.5824 3.42233L17.5799 3.42803C17.5797 3.43166 17.5802 3.43682 17.5799 3.44269C17.5782 3.4778 17.575 3.58226 17.5367 3.6984L17.5333 3.70736C16.8466 5.6692 16.8817 7.5853 17.3786 9.50081L17.4867 9.87379C17.7232 10.6294 18.0433 11.36 18.4343 12.0539C18.0688 12.0994 17.7258 12.1897 17.401 12.3185C16.9656 11.5075 16.619 10.6509 16.3761 9.76467L16.3736 9.75815C15.8372 7.69433 15.7884 5.57932 16.5425 3.40604L16.5508 3.29692C16.5556 3.25931 16.5645 3.21424 16.5782 3.16662C16.6532 2.88384 16.7125 2.60263 16.7579 2.32211C17.124 2.14389 17.4931 1.98478 17.8644 1.84489Z" fill="currentColor"/><path d="M20.7197 1.11033C20.5916 1.74685 20.4023 2.37782 20.1348 3.00782L20.1324 3.01352C20.1316 3.01713 20.1301 3.02242 20.129 3.02818C20.1223 3.06306 20.1047 3.1659 20.0508 3.27493L20.0467 3.28389C19.0866 5.13528 18.8487 7.03974 19.0699 9.00648C19.205 10.0747 19.5015 11.1229 19.936 12.1158C19.7951 12.0883 19.6569 12.0668 19.5217 12.0514C19.2645 12.0226 19.0177 12.0142 18.7804 12.0245C18.4173 11.0911 18.1641 10.1166 18.0392 9.12375L18.0383 9.11724C17.8004 7.00158 18.0524 4.90235 19.1066 2.8539C19.1073 2.85021 19.1095 2.84454 19.1107 2.83843C19.1169 2.80615 19.1328 2.71745 19.1773 2.61855C19.3567 2.1959 19.4974 1.7714 19.6057 1.34324C19.9796 1.25938 20.3508 1.18012 20.7197 1.11033Z" fill="currentColor"/>
              </svg>
            </div>

            <!-- Input -->
            <input
              class="inputbar-input"
              type="text"
              .value=${this.inputValue}
              @input=${this.handleInputBarInput}
              @focus=${this.handleInputBarFocus}
              @keydown=${this.handleInputBarKeyDown}
              placeholder="Ask AI anything..."
              style="color: ${textColor};"
            />

            <!-- Send button -->
            <button
              class="inputbar-send"
              @click=${this.sendFromInputBar}
              ?disabled=${!this.inputValue.trim()}
              style="
                background-color: ${this.inputValue.trim() ? this.primaryColor : isDark ? colors.slate[700] : colors.slate[200]};
                color: ${this.inputValue.trim() ? colors.white : mutedColor};
              "
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Close button -->
            <button
              class="inputbar-close"
              @click=${() => this.setStage("collapsed")}
              style="
                background-color: ${isDark ? colors.slate[700] : colors.slate[100]};
                color: ${mutedColor};
              "
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Stage 3: Expanded -->
        <div class="stage-content expanded-content ${isExpanded ? "active" : ""}">
          <div
            class="expanded-wrapper"
            style="background-color: ${bgColor};"
            @feedback-submit=${this.handleFeedbackSubmit}
          >
            <!-- Header -->
            <div class="header" style="background-color: ${bgColor}; border-color: ${borderColor};">
              <span class="header-title" style="color: ${textColor};">
                AI Shopping Mode
              </span>
              <div class="header-buttons">
                <!-- New Chat button -->
                <bf-new-chat-button
                  .isDark=${isDark}
                  .primaryColor=${this.primaryColor}
                  @new-chat=${this.handleNewChat}
                ></bf-new-chat-button>
                <!-- History dropdown -->
                <bf-history-dropdown
                  .sessions=${[...((_a2 = this.historyController) == null ? void 0 : _a2.sessions) ?? []]}
                  .activeSessionId=${((_b = this.historyController) == null ? void 0 : _b.activeSessionId) ?? null}
                  .isDark=${isDark}
                  .primaryColor=${this.primaryColor}
                  @session-switch=${this.handleSessionSwitch}
                  @session-delete=${this.handleSessionDelete}
                ></bf-history-dropdown>
                <!-- Fullscreen button -->
                <button
                  class="header-btn"
                  @click=${() => this.toggleFullscreen()}
                  title="Fullscreen"
                  style="background-color: transparent; color: ${mutedColor};"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <!-- Close button -->
                <button
                  class="header-btn close"
                  @click=${() => this.setStage("inputBar")}
                  title="Close"
                  style="background-color: ${isDark ? colors.slate[700] : colors.slate[100]}; color: ${mutedColor};"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Messages or Empty State -->
            <div class="messages-container" @product-click=${this.handleProductClick} @suggestion-click=${this.handleSuggestionClickEvent}>
              ${!hasMessages ? b`
                    <div class="empty-state">
                      <p class="empty-state-text" style="color: ${mutedColor};">
                        Ask a question or describe what you are looking for, and I will help you find the best solution.
                      </p>

                      <!-- Suggested questions -->
                      <div class="suggested-questions">
                        ${this.suggestedQuestions.map((q) => b`
                          <button
                            class="suggested-question"
                            @click=${() => this.handleSuggestedQuestion(q)}
                            style="color: ${textColor};"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>${q}</span>
                          </button>
                        `)}
                      </div>
                    </div>
                  ` : c(
      this.messages,
      (message) => {
        var _a3;
        return `${message.id}-${((_a3 = message.content) == null ? void 0 : _a3.length) || 0}-${message.isStreaming}-${this.suggestions.length}`;
      },
      (message, index) => {
        const isLastAssistantMessage = message.role === "assistant" && index === this.messages.length - 1;
        const messageSuggestions = isLastAssistantMessage ? this.suggestions : [];
        if (message.role === "assistant") {
          console.log("[CHAT-WIDGET RENDER] message:", message.id, "index:", index, "total:", this.messages.length, "isLast:", isLastAssistantMessage, "suggestions:", messageSuggestions);
        }
        return b`
                        <bf-chat-message
                          .message=${message}
                          .isDark=${isDark}
                          .primaryColor=${this.primaryColor}
                          .suggestions=${messageSuggestions}
                        ></bf-chat-message>
                      `;
      }
    )}
            </div>

            <!-- Prompt Bar -->
            <div class="prompt-bar" @click=${this.handlePromptBarClick} style="background-color: ${bgColor}; border-color: ${borderColor};">
              <!-- Input wrapper -->
              <bf-chat-input
                placeholder=${this.placeholder || "Ask anything..."}
                ?isDark=${isDark}
                primaryColor=${this.primaryColor}
                @send=${this.handleSend}
              ></bf-chat-input>

              <!-- Control buttons -->
              <div class="prompt-controls">
                <div class="prompt-left-buttons">
                  <!-- Plus button -->
                  <button
                    class="prompt-btn"
                    title="Add attachment"
                    style="color: ${textColor};"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <line x1="12" y1="5" x2="12" y2="19" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="5" y1="12" x2="19" y2="12" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <!-- Live button -->
                  <button
                    class="prompt-btn"
                    title="Live mode"
                    style="color: ${textColor};"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Live</span>
                  </button>
                </div>
                <!-- Send button -->
                <button
                  class="prompt-btn send-btn"
                  title="Send message"
                  @click=${this.handleSendButtonClick}
                  style="
                    background-color: ${this.primaryColor};
                    color: ${colors.white};
                    border-radius: 8px;
                  "
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- Product Modal (rendered outside chat container for proper positioning) -->
      ${this.selectedProduct ? b`
        <bf-product-modal
          .product=${this.selectedProduct}
          .open=${true}
          .isDark=${this.darkMode}
          .primaryColor=${this.primaryColor}
          @close=${this.handleProductModalClose}
        ></bf-product-modal>
      ` : null}
    `;
  }
};
__publicField2(BrainformChat, "styles", [
  glassStyles,
  animationStyles,
  stageAnimationStyles,
  i$5`
      :host {
        --primary: ${r$5(colors.indigo[600])};
        --glow-color: rgba(79, 70, 229, 0.2);

        font-family: ${r$5(typography.fontFamily)};
        font-size: ${r$5(typography.fontSize.base)};
        line-height: ${r$5(typography.lineHeight.normal)};
      }

      /* Collapsed state button content */
      .collapsed-button {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease;
      }

      .collapsed-icon {
        width: 24px;
        height: 24px;
        animation: sparkle 2s ease-in-out infinite;
      }

      @keyframes sparkle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
      }

      /* InputBar state content */
      .inputbar-wrapper {
        display: flex;
        align-items: center;
        gap: ${r$5(spacing.sm)};
        width: 100%;
        height: 100%;
        padding: 0 ${r$5(spacing.md)};
        border-radius: 28px;
      }

      .inputbar-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .inputbar-icon svg {
        width: 16px;
        height: 16px;
      }

      .inputbar-input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        font-family: ${r$5(typography.fontFamily)};
        font-size: ${r$5(typography.fontSize.sm)};
      }

      .inputbar-input::placeholder {
        opacity: 0.6;
      }

      .inputbar-send,
      .inputbar-close {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .inputbar-send:hover,
      .inputbar-close:hover {
        transform: scale(1.05);
      }

      .inputbar-send:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
      }

      .inputbar-send svg,
      .inputbar-close svg {
        width: 16px;
        height: 16px;
      }

      /* Expanded state content */
      .expanded-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-radius: ${r$5(radius.xl)};
        overflow: hidden;
      }

      @media (max-width: 767px) {
        .expanded-wrapper {
          border-radius: 0;
        }
      }

      /* Header - matches Figma Chat Header component */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        min-height: 64px;
        padding: 16px;
        border-bottom: 1px solid;
        border-radius: 8px 8px 0 0;
        flex-shrink: 0;
        overflow: visible;
        position: relative;
        z-index: 10;
      }

      .header-title {
        font-family: ${r$5(typography.fontFamily)};
        font-size: 18px;
        font-weight: ${r$5(typography.fontWeight.semibold)};
        line-height: 24px;
      }

      .header-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;
        z-index: 100;
      }

      .header-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        padding: 8px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .header-btn:hover {
        opacity: 0.8;
      }

      .header-btn.close:hover {
        transform: rotate(90deg);
      }

      .header-btn svg {
        width: 24px;
        height: 24px;
      }

      /* Messages */
      .messages-container {
        flex: 1;
        min-height: 0; /* Required for flex child with overflow */
        overflow-y: auto;
        padding: ${r$5(spacing.lg)};
        display: flex;
        flex-direction: column;
        gap: ${r$5(spacing.sm)};
      }

      .messages-container::-webkit-scrollbar {
        width: 6px;
      }

      .messages-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .messages-container::-webkit-scrollbar-thumb {
        background: ${r$5(colors.slate[400])};
        border-radius: 3px;
      }

      /* Empty state */
      .empty-state {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${r$5(spacing["2xl"])};
        text-align: center;
        gap: ${r$5(spacing.lg)};
      }

      .empty-state-title {
        font-size: ${r$5(typography.fontSize.xl)};
        font-weight: ${r$5(typography.fontWeight.bold)};
      }

      .empty-state-text {
        font-size: ${r$5(typography.fontSize.md)};
        opacity: 0.7;
        max-width: 300px;
        line-height: 1.6;
      }

      /* Suggested questions */
      .suggested-questions {
        display: flex;
        flex-direction: column;
        gap: ${r$5(spacing.sm)};
        width: 100%;
        max-width: 400px;
      }

      .suggested-question {
        display: flex;
        align-items: flex-start;
        gap: ${r$5(spacing.sm)};
        padding: ${r$5(spacing.sm)} ${r$5(spacing.md)};
        border-radius: ${r$5(radius.lg)};
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
      }

      .suggested-question:hover {
        opacity: 0.7;
      }

      .suggested-question svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        margin-top: 2px;
        opacity: 0.5;
      }

      .suggested-question span {
        font-size: ${r$5(typography.fontSize.sm)};
        font-weight: ${r$5(typography.fontWeight.medium)};
      }

      /* Prompt Bar - matches Figma */
      .prompt-bar {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        justify-content: center;
        min-height: 112px;
        padding: 12px;
        border-top: 1px solid;
        border-radius: 0 0 8px 8px;
        flex-shrink: 0;
        overflow: hidden;
      }

      .prompt-textarea-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-height: 40px;
        max-height: 80px;
        padding: 10px 12px;
        overflow: hidden;
      }

      .prompt-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .prompt-left-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .prompt-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        min-width: 40px;
        min-height: 40px;
        padding: 10px 12px;
        border-radius: 4px;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .prompt-btn:hover {
        opacity: 0.8;
      }

      .prompt-btn svg {
        width: 24px;
        height: 24px;
      }

      .prompt-btn span {
        font-family: ${r$5(typography.fontFamily)};
        font-size: 14px;
        font-weight: ${r$5(typography.fontWeight.medium)};
        line-height: 20px;
      }

      /* Suggestion Section - matches Figma */
      .suggestion-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        width: 100%;
        max-width: 496px;
        margin-top: ${r$5(spacing.md)};
      }

      .suggestion-label {
        font-family: ${r$5(typography.fontFamily)};
        font-size: 12px;
        font-weight: ${r$5(typography.fontWeight.normal)};
        line-height: 16px;
      }

      /* Link button - mini size from Figma */
      .suggestion-link {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 24px;
        min-height: 24px;
        min-width: 24px;
        padding: 4px 8px;
        border-radius: 4px;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.15s ease;
        width: 100%;
        text-align: left;
      }

      .suggestion-link:hover {
        opacity: 0.8;
      }

      .suggestion-link svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }

      .suggestion-link span {
        font-family: ${r$5(typography.fontFamily)};
        font-size: 12px;
        font-weight: ${r$5(typography.fontWeight.medium)};
        line-height: 16px;
      }
    `
]);
__decorateClass([
  n2({ type: String, attribute: "api-key" })
], BrainformChat.prototype, "apiKey", 2);
__decorateClass([
  n2({ type: String, attribute: "api-url" })
], BrainformChat.prototype, "apiUrl", 2);
__decorateClass([
  n2({ type: String })
], BrainformChat.prototype, "theme", 2);
__decorateClass([
  n2({ type: String })
], BrainformChat.prototype, "position", 2);
__decorateClass([
  n2({ type: String, attribute: "primary-color" })
], BrainformChat.prototype, "primaryColor", 2);
__decorateClass([
  n2({ type: Boolean, attribute: "dark-mode" })
], BrainformChat.prototype, "darkMode", 2);
__decorateClass([
  n2({ type: String })
], BrainformChat.prototype, "placeholder", 2);
__decorateClass([
  n2({ type: String, attribute: "welcome-message" })
], BrainformChat.prototype, "welcomeMessage", 2);
__decorateClass([
  n2({ type: String, attribute: "initial-stage" })
], BrainformChat.prototype, "initialStage", 2);
__decorateClass([
  n2({ type: String, attribute: "captcha-site-key" })
], BrainformChat.prototype, "captchaSiteKey", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "stage", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "isTransitioning", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "messages", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "isLoading", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "suggestions", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "inputValue", 2);
__decorateClass([
  r$1()
], BrainformChat.prototype, "selectedProduct", 2);
__decorateClass([
  e$2(".messages-container")
], BrainformChat.prototype, "messagesContainer", 2);
__decorateClass([
  e$2(".inputbar-input")
], BrainformChat.prototype, "inputBarInput", 2);
__decorateClass([
  e$2(".chat-container")
], BrainformChat.prototype, "containerRef", 2);
BrainformChat = __decorateClass([
  t$2("brainform-chat")
], BrainformChat);
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap";
document.head.appendChild(fontLink);
export {
  BrainformChat,
  ChatApiClient,
  ChatHistoryController,
  ChatInput,
  ChatMessageElement,
  Feedback,
  HistoryDropdown,
  NewChatButton,
  ProductCard,
  ProductModal,
  TypingIndicator,
  clearAllSessions,
  createNewSession,
  deleteSession,
  getActiveSession,
  getThemeSessions,
  mockStreamResponse,
  switchToSession,
  tokens,
  updateActiveSession
};
//# sourceMappingURL=chat-widget.js.map
