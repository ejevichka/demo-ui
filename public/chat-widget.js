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
  /* Global button fix: prevent SVG from capturing clicks */
  button svg {
    pointer-events: none;
  }

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
    top: auto;
    transform: translateX(-50%);
  }

  /* Expanded: centered modal (desktop 1024+) */
  .chat-container.expanded {
    --chat-width: min(846px, calc(100vw - 32px));
    --chat-height: min(942px, calc(100dvh - 32px));
    --chat-radius: ${r$5(radius["xl"])};
    --transition-duration: ${r$5(MORPH_DURATION)}s;
    --transition-easing: ${r$5(EASING.morph)};

    bottom: max(16px, env(safe-area-inset-bottom));
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    animation: slideUpExpand ${r$5(MORPH_DURATION)}s ${r$5(EASING.morph)} forwards;
  }

  /* Compact height mode (532px) */
  .chat-container.expanded.compact-height {
    --chat-height: min(532px, calc(100dvh - 32px));
  }

  /* Slide up animation for expand */
  @keyframes slideUpExpand {
    0% {
      opacity: 0.8;
      transform: translateX(-50%) translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  /* Expanded LEFT: full height, fixed width, left side, no gap */
  .chat-container.expanded.expand-left {
    --chat-height: 100dvh;
    --chat-radius: 0;

    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
    transform: none;
    animation: slideUpSide 0.4s ease-out forwards;
  }

  /* Expanded RIGHT: full height, fixed width, right side, no gap */
  .chat-container.expanded.expand-right {
    --chat-height: 100dvh;
    --chat-radius: 0;

    top: 0;
    bottom: 0;
    right: 0;
    left: auto;
    transform: none;
    animation: slideUpSide 0.4s ease-out forwards;
  }

  /* Collapsed button position based on expand-position */
  .chat-container.collapsed.expand-left {
    left: 24px;
    right: auto;
  }

  .chat-container.collapsed.expand-right {
    right: 24px;
    left: auto;
  }

  /* InputBar position based on expand-position */
  .chat-container.inputBar.expand-left {
    left: 24px;
    right: auto;
    transform: none;
  }

  .chat-container.inputBar.expand-right {
    left: auto;
    right: 24px;
    transform: none;
  }

  @keyframes slideUpSide {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Tablet: 768-1023px */
  @media (max-width: 1023px) {
    .chat-container.expanded {
      --chat-width: calc(100vw - 48px);
      --chat-height: calc(100dvh - 120px);
    }
  }

  /* Mobile: < 768px - fullscreen */
  @media (max-width: 767px) {
    .chat-container.expanded {
      --chat-width: 100%;
      --chat-height: 100%;
      --chat-radius: 0;

      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
      width: 100%;
      height: 100%;
      animation: slideUpMobile ${r$5(MORPH_DURATION)}s ${r$5(EASING.morph)} forwards;
    }

    @keyframes slideUpMobile {
      0% {
        opacity: 0.8;
        transform: translateY(100%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chat-container.inputBar {
      --chat-width: calc(100vw - 32px);
      bottom: max(16px, env(safe-area-inset-bottom));
    }

    /* Left/Right positions become fullscreen on mobile */
    .chat-container.expanded.expand-left,
    .chat-container.expanded.expand-right {
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      --chat-width: 100%;
      --chat-height: 100%;
      --chat-radius: 0;
      animation: slideUpMobile ${r$5(MORPH_DURATION)}s ${r$5(EASING.morph)} forwards;
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

  /* Expanded content slides up */
  .expanded-content.active {
    animation: contentSlideUp ${r$5(MORPH_DURATION)}s ${r$5(EASING.morph)} forwards;
  }

  @keyframes contentSlideUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
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
          sessionId
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
  const words = responseData.text.split(" ");
  for (let i4 = 0; i4 < words.length; i4++) {
    await new Promise((resolve) => setTimeout(resolve, 40 + Math.random() * 20));
    callbacks.onChunk(words[i4] + (i4 < words.length - 1 ? " " : ""));
  }
  if (responseData.products) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    callbacks.onProducts(responseData.products);
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
  callbacks.onSuggestions([
    "Tell me more about KRUPS Sensation",
    "What's the price range?",
    "Do you have compact models?"
  ]);
  callbacks.onComplete();
}
let config = {
  apiUrl: "/krups-api"
};
function configureKrupsApi(newConfig) {
  config = { ...config, ...newConfig };
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
  captchaScriptLoading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://smartcaptcha.yandexcloud.net/captcha.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
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
      (_a2 = window.smartCaptcha) == null ? void 0 : _a2.execute();
    }, 500);
  });
}
async function createUser() {
  var _a2, _b, _c, _d, _e, _f, _g, _h;
  const generatedUserId = generateUserId();
  const captchaToken = await getCaptchaToken();
  const requestBody = {
    userId: generatedUserId,
    captchaToken,
    isAnonymous: true
  };
  const fetchUrl = `${config.apiUrl}/auth/create-user`;
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
  const response = await fetch(`${config.apiUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId })
  });
  if (!response.ok) {
    clearAuth();
    return createUser();
  }
  const data = await response.json();
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
  return data.result;
}
async function findProducts(question, sessionId) {
  const auth = await getValidAuth();
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
  const products = (data.result.documents || []).map(transformProduct);
  const session = getCurrentSession();
  session.products = products;
  return products;
}
const API_TIMEOUT = 6e4;
async function generateAnswerStream(sessionId, callbacks) {
  var _a2, _b, _c, _d;
  const completeStream = async (fullMessage2, products, messageId) => {
    callbacks.onComplete(fullMessage2, products, messageId);
    if (callbacks.onSuggestionsReceived) {
      const suggestions = await getKrupsSuggestions();
      callbacks.onSuggestionsReceived(suggestions);
    }
  };
  const auth = await getValidAuth();
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
  let lineBuffer = "";
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
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      lineBuffer += chunk;
      const lines = lineBuffer.split("\n");
      lineBuffer = lines.pop() || "";
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") {
            const session2 = getCurrentSession();
            await completeStream(fullMessage, session2.products, apiMessageId);
            return;
          }
          try {
            const parsed = JSON.parse(data);
            if (parsed.messageId) {
              apiMessageId = parsed.messageId;
            } else if (parsed.id) {
              apiMessageId = parsed.id;
            } else if ((_b = parsed.result) == null ? void 0 : _b.messageId) {
              apiMessageId = parsed.result.messageId;
            } else if ((_c = parsed.result) == null ? void 0 : _c.id) {
              apiMessageId = parsed.result.id;
            }
            if (parsed.message) {
              fullMessage += parsed.message;
              callbacks.onChunk(parsed.message);
            } else if (parsed.type === "content" && parsed.text) {
              fullMessage += parsed.text;
              callbacks.onChunk(parsed.text);
            } else if (parsed.content) {
              fullMessage += parsed.content;
              callbacks.onChunk(parsed.content);
            }
            if ((_d = parsed.result) == null ? void 0 : _d.answer) {
              let products = getCurrentSession().products;
              if (parsed.result.displayedProducts && Array.isArray(parsed.result.displayedProducts)) {
                products = parsed.result.displayedProducts.map(transformProduct);
                getCurrentSession().products = products;
              }
              await completeStream(parsed.result.answer, products, apiMessageId);
              return;
            }
            if (parsed.type === "done") {
              const session2 = getCurrentSession();
              await completeStream(fullMessage, session2.products, apiMessageId);
              return;
            }
          } catch {
          }
        }
      }
    }
  } finally {
    if (streamTimeoutId) clearTimeout(streamTimeoutId);
  }
  const session = getCurrentSession();
  await completeStream(fullMessage, session.products, apiMessageId);
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
    const suggestions = ((_a2 = data.result) == null ? void 0 : _a2.suggestions) || data.suggestions || [];
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
const SESSIONS_KEY = "chat_sessions";
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
function getSessions() {
  try {
    const stored = localStorage.getItem(SESSIONS_KEY);
    if (!stored) {
      return { activeSessionId: null, sessions: [] };
    }
    return JSON.parse(stored);
  } catch {
    return { activeSessionId: null, sessions: [] };
  }
}
function saveSessions(data) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("[ChatHistory] Failed to save sessions:", error);
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
function getActiveSession() {
  const data = getSessions();
  if (!data.activeSessionId) return null;
  const session = data.sessions.find((s2) => s2.id === data.activeSessionId);
  return session ? deserializeSession(session) : null;
}
function createNewSession() {
  const data = getSessions();
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
  saveSessions(data);
  return newSession;
}
function updateActiveSession(messages) {
  let data = getSessions();
  if (!data.activeSessionId) {
    createNewSession();
    data = getSessions();
  }
  const sessionIndex = data.sessions.findIndex((s2) => s2.id === data.activeSessionId);
  if (sessionIndex !== -1) {
    data.sessions[sessionIndex].messages = messages.map((m2) => ({
      ...m2,
      timestamp: m2.timestamp instanceof Date ? m2.timestamp.toISOString() : m2.timestamp
    }));
    data.sessions[sessionIndex].updatedAt = Date.now();
    data.sessions[sessionIndex].title = getTitleFromMessages(messages);
    saveSessions(data);
  }
}
function switchToSession(sessionId) {
  const data = getSessions();
  const session = data.sessions.find((s2) => s2.id === sessionId);
  if (session) {
    data.activeSessionId = sessionId;
    saveSessions(data);
    return deserializeSession(session);
  }
  return null;
}
function deleteSession(sessionId) {
  var _a2;
  const data = getSessions();
  data.sessions = data.sessions.filter((s2) => s2.id !== sessionId);
  if (data.activeSessionId === sessionId) {
    data.activeSessionId = ((_a2 = data.sessions[0]) == null ? void 0 : _a2.id) || null;
  }
  saveSessions(data);
}
function clearAllSessions() {
  try {
    localStorage.removeItem(SESSIONS_KEY);
  } catch {
    console.warn("[ChatHistory] Failed to clear sessions");
  }
}
class ChatHistoryController {
  constructor(host) {
    __publicField(this, "host");
    // Reactive state - changes trigger host updates
    __publicField(this, "sessions", []);
    __publicField(this, "activeSessionId", null);
    this.host = host;
    host.addController(this);
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
    const data = getSessions();
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
    createNewSession();
    this.loadSessions();
    return [];
  }
  /**
   * Switch to a different session
   * @returns The session's messages, or null if session not found
   */
  switchTo(sessionId) {
    const session = switchToSession(sessionId);
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
    deleteSession(sessionId);
    const data = getSessions();
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
      updateActiveSession(messages);
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
      flex: 0 0 160px !important;
      flex-shrink: 0 !important;
      width: 160px !important;
      min-width: 160px;
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
      aspect-ratio: 1/1;
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
    if (this.isSubmitted) return;
    this.selectedFeedback = type;
    this.showCommentForm = true;
    this.requestUpdate();
  }
  handleCommentInput(e2) {
    this.comment = e2.target.value;
  }
  async handleSubmit() {
    if (!this.selectedFeedback) return;
    this.isSubmitting = true;
    const detail = {
      messageId: this.messageId,
      isPositive: this.selectedFeedback === "positive",
      comment: this.comment.trim() || void 0
    };
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
      width: 15px;
      height: 15px;
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
      font-size: 16px;
      font-weight: ${r$5(typography.fontWeight.bold)};
      line-height: 20px;
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
      gap: 8px;
      align-items: flex-start;
      justify-content: flex-end;
      width: 100%;
      /* overflow: visible to allow products carousel horizontal scroll */
      overflow: visible;
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
      line-height: 20px;
      max-width: 496px;
      white-space: pre-wrap;
      word-break: break-word;
      overflow: hidden;
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

    /* Products carousel - horizontal scroll for mobile */
    .products-carousel {
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      width: 100%;
      min-width: 0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
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

    /* Prevent cards from growing, enable snap */
    .products-carousel bf-product-card {
      flex: 0 0 160px;
      min-width: 160px;
      max-width: 160px;
      scroll-snap-align: start;
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
  // Get textarea element directly instead of @query (which can return undefined)
  get inputElement() {
    var _a2;
    return ((_a2 = this.shadowRoot) == null ? void 0 : _a2.querySelector("textarea")) ?? null;
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
    const textarea = e2.target;
    this.value = textarea.value;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + "px";
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
      this.inputElement.style.height = "auto";
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
          <textarea
            rows="1"
            .value=${l(this.value)}
            placeholder=${this.placeholder}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            style="color: ${textColor}; --placeholder-color: ${placeholderColor};"
          ></textarea>
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
      align-items: flex-start;
      gap: 8px;
      width: 100%;
      min-height: 40px;
      max-height: 120px;
      padding: 10px 12px;
      overflow: hidden;
      background: transparent;
    }

    .text-field {
      flex: 1;
      display: flex;
      align-items: flex-start;
      gap: 2px;
      min-width: 1px;
      min-height: 20px;
      max-height: 100px;
      overflow: hidden;
    }

    textarea {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-family: ${r$5(typography.fontFamily)};
      font-size: 14px;
      font-weight: ${r$5(typography.fontWeight.normal)};
      line-height: 20px;
      resize: none;
      min-height: 20px;
      max-height: 100px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: ${r$5(colors.slate[400])} transparent;
    }

    textarea::-webkit-scrollbar {
      width: 4px;
    }

    textarea::-webkit-scrollbar-track {
      background: transparent;
    }

    textarea::-webkit-scrollbar-thumb {
      background: ${r$5(colors.slate[400])};
      border-radius: 2px;
    }

    textarea::placeholder {
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
        top: rect.bottom + 8,
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
    __publicField(this, "position", "bottom-right");
    __publicField(this, "primaryColor", colors.indigo[600]);
    __publicField(this, "darkMode", false);
    __publicField(this, "placeholder", "Ask me anything...");
    __publicField(this, "welcomeMessage", "");
    __publicField(this, "initialStage", "inputBar");
    __publicField(this, "captchaSiteKey", "");
    __publicField(this, "expandPosition", "center");
    __publicField(this, "stage", "inputBar");
    __publicField(this, "isTransitioning", false);
    __publicField(this, "messages", []);
    __publicField(this, "isLoading", false);
    __publicField(this, "suggestions", []);
    __publicField(this, "inputValue", "");
    __publicField(this, "selectedProduct", null);
    __publicField(this, "isCompactHeight", false);
    __publicField(this, "messagesContainer");
    __publicField(this, "inputBarInput");
    __publicField(this, "containerRef");
    __publicField(this, "apiClient", null);
    __publicField(this, "sessionId", null);
    __publicField(this, "clickOutsideHandler", null);
    __publicField(this, "historyController");
    __publicField(this, "isInitialLoad", false);
    __publicField(this, "handleFullscreenClick", (e2) => {
      e2.preventDefault();
      e2.stopPropagation();
      this.isCompactHeight = !this.isCompactHeight;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent("fullscreen-toggle", {
        bubbles: true,
        composed: true,
        detail: { isCompact: this.isCompactHeight }
      }));
    });
    // Bound methods for stage transitions (best practice: avoid inline arrows in templates)
    __publicField(this, "handleCloseToInputBar", () => this.setStage("inputBar"));
    __publicField(this, "handleCloseToCollapsed", () => this.setStage("collapsed"));
    __publicField(this, "handleOpenFromCollapsed", () => this.setStage("inputBar"));
    __publicField(this, "handleBackdropClick", () => this.setStage("inputBar"));
  }
  connectedCallback() {
    super.connectedCallback();
    this.stage = this.initialStage;
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (this.apiKey && this.apiUrl) {
      this.apiClient = new ChatApiClient({
        apiKey: this.apiKey,
        apiUrl: this.apiUrl
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
    if (this.apiUrl) {
      configureKrupsApi({
        apiUrl: this.apiUrl,
        captchaSiteKey: this.captchaSiteKey
      });
    }
    this.historyController = new ChatHistoryController(this);
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
    if (changedProperties.has("messages") && this.messages.length > 0 && this.historyController) {
      if (this.isInitialLoad) {
        this.isInitialLoad = false;
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
    if (!text.trim() || this.isLoading) return;
    this.suggestions = [];
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: /* @__PURE__ */ new Date()
    };
    this.messages = [...this.messages, userMessage];
    if (this.historyController) {
      this.historyController.updateMessages(this.messages);
    }
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
        this.suggestions = suggestions;
        this.requestUpdate();
      },
      onComplete: () => {
        this.messages = this.messages.map(
          (m2) => m2.id === assistantMessageId ? { ...m2, isStreaming: false } : m2
        );
        this.isLoading = false;
        if (this.historyController) {
          this.historyController.updateMessages(this.messages);
        }
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
    if (this.apiUrl) {
      const krupsCallbacks = {
        onChunk: (chunk) => callbacks.onChunk(chunk),
        onComplete: (fullMessage, products, apiMessageId) => {
          this.messages = this.messages.map(
            (m2) => m2.id === assistantMessageId ? {
              ...m2,
              content: fullMessage || m2.content,
              id: apiMessageId || m2.id,
              isStreaming: false,
              products: products && products.length > 0 ? products : m2.products
            } : m2
          );
          this.isLoading = false;
          if (this.historyController) {
            this.historyController.updateMessages(this.messages);
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
    this.isInitialLoad = false;
    this.isLoading = false;
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
    this.isLoading = false;
    const messages = this.historyController.switchTo(e2.detail.sessionId);
    if (messages && messages.length > 0) {
      this.isInitialLoad = true;
      this.messages = messages;
      this.scrollToBottom();
    } else {
      this.isInitialLoad = false;
      this.messages = this.welcomeMessage ? [{
        id: "welcome",
        role: "assistant",
        content: this.welcomeMessage,
        timestamp: /* @__PURE__ */ new Date()
      }] : [];
    }
    this.suggestions = [];
  }
  /**
   * Handle session delete from history dropdown
   */
  handleSessionDelete(e2) {
    if (!this.historyController) return;
    this.isLoading = false;
    const newMessages = this.historyController.delete(e2.detail.sessionId);
    if (newMessages.length === 0) {
      this.isInitialLoad = false;
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
    this.dispatchEvent(new CustomEvent("feedback", {
      detail: e2.detail,
      bubbles: true,
      composed: true
    }));
    if (this.apiUrl) {
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
        @click=${this.handleBackdropClick}
      ></div>

      <!-- Main morphing container -->
      <div
        class="chat-container ${this.stage} expand-${this.expandPosition} ${this.isTransitioning ? "transitioning" : ""} ${this.isCompactHeight ? "compact-height" : ""}"
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
            @click=${this.handleOpenFromCollapsed}
            style="background-color: ${this.primaryColor}; color: ${colors.white};"
          >
            <svg class="collapsed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3l1.912 5.813a1 1 0 00.95.687h6.138l-4.97 3.613a1 1 0 00-.364 1.118L17.578 20l-4.97-3.613a1 1 0 00-1.176 0L6.462 20l1.912-5.769a1 1 0 00-.364-1.118L3 9.5h6.138a1 1 0 00.95-.687L12 3z" stroke-linecap="round" stroke-linejoin="round"/>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 3l1.912 5.813a1 1 0 00.95.687h6.138l-4.97 3.613a1 1 0 00-.364 1.118L17.578 20l-4.97-3.613a1 1 0 00-1.176 0L6.462 20l1.912-5.769a1 1 0 00-.364-1.118L3 9.5h6.138a1 1 0 00.95-.687L12 3z" stroke-linecap="round" stroke-linejoin="round"/>
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
              style="
                background-color: ${this.primaryColor};
                color: ${colors.white};
              "
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Close button -->
            <button
              class="inputbar-close"
              @click=${this.handleCloseToCollapsed}
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
                <!-- Fullscreen toggle button -->
                <button
                  class="header-btn fullscreen"
                  @click=${this.handleFullscreenClick}
                  title=${this.isCompactHeight ? "Expand" : "Minimize"}
                  style="background-color: transparent; color: ${mutedColor};"
                >
                  ${this.isCompactHeight ? b`<!-- Expand icon (corners outward) -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="pointer-events: none;">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>` : b`<!-- Minimize icon (corners inward) -->
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="pointer-events: none;">
                        <path d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>`}
                </button>
                <!-- Close button -->
                <button
                  class="header-btn close"
                  @click=${this.handleCloseToInputBar}
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

                      <!-- Suggested questions - only in empty state -->
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
                  <!-- Mic button -->
                  <button
                    class="prompt-btn"
                    title="Voice input"
                    style="color: ${textColor};"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="12" y1="19" x2="12" y2="23" stroke-linecap="round" stroke-linejoin="round"/>
                      <line x1="8" y1="23" x2="16" y2="23" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
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
        pointer-events: none;
      }

      /* Hide fullscreen button on mobile */
      @media (max-width: 767px) {
        .header-btn.fullscreen {
          display: none;
        }
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
        align-items: center;
        gap: ${r$5(spacing.sm)};
        width: 100%;
        max-width: 400px;
      }

      .suggested-question {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${r$5(spacing.sm)};
        padding: ${r$5(spacing.sm)} ${r$5(spacing.md)};
        border-radius: ${r$5(radius.lg)};
        border: none;
        background: transparent;
        cursor: pointer;
        text-align: center;
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
  n2({ type: String, attribute: "expand-position" })
], BrainformChat.prototype, "expandPosition", 2);
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
  r$1()
], BrainformChat.prototype, "isCompactHeight", 2);
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
  getSessions,
  mockStreamResponse,
  switchToSession,
  tokens,
  updateActiveSession
};
//# sourceMappingURL=chat-widget.js.map
