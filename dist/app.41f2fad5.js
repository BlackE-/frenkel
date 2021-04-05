// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@dogstudio/highway/build/highway.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function t() {}

t.prototype = {
  on: function (t, e, r) {
    var i = this.e || (this.e = {});
    return (i[t] || (i[t] = [])).push({
      fn: e,
      ctx: r
    }), this;
  },
  once: function (t, e, r) {
    var i = this;

    function n() {
      i.off(t, n), e.apply(r, arguments);
    }

    return n._ = e, this.on(t, n, r);
  },
  emit: function (t) {
    for (var e = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, n = r.length; i < n; i++) r[i].fn.apply(r[i].ctx, e);

    return this;
  },
  off: function (t, e) {
    var r = this.e || (this.e = {}),
        i = r[t],
        n = [];
    if (i && e) for (var o = 0, s = i.length; o < s; o++) i[o].fn !== e && i[o].fn._ !== e && n.push(i[o]);
    return n.length ? r[t] = n : delete r[t], this;
  }
};
var e = t;
e.TinyEmitter = t;

var r = function (t) {
  this.wrap = document.querySelector("[data-router-wrapper]"), this.properties = t, this.Transition = t.transition ? new t.transition.class(this.wrap, t.transition.name) : null;
};

r.prototype.setup = function () {
  this.onEnter && this.onEnter(), this.onEnterCompleted && this.onEnterCompleted();
}, r.prototype.add = function () {
  this.wrap.insertAdjacentHTML("beforeend", this.properties.view.outerHTML);
}, r.prototype.update = function () {
  document.title = this.properties.page.title;
}, r.prototype.show = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onEnterCompleted && e.onEnterCompleted(), r();
      }

      return e.update(), e.onEnter && e.onEnter(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.show(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
}, r.prototype.hide = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onLeaveCompleted && e.onLeaveCompleted(), r();
      }

      return e.onLeave && e.onLeave(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.hide(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
};

var i = new window.DOMParser(),
    n = function (t, e) {
  this.renderers = t, this.transitions = e;
};

n.prototype.getOrigin = function (t) {
  var e = t.match(/(https?:\/\/[\w\-.]+)/);
  return e ? e[1].replace(/https?:\/\//, "") : null;
}, n.prototype.getPathname = function (t) {
  var e = t.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
  return e ? e[1] : "/";
}, n.prototype.getAnchor = function (t) {
  var e = t.match(/(#.*)$/);
  return e ? e[1] : null;
}, n.prototype.getParams = function (t) {
  var e = t.match(/\?([\w_\-.=&]+)/);
  if (!e) return null;

  for (var r = e[1].split("&"), i = {}, n = 0; n < r.length; n++) {
    var o = r[n].split("=");
    i[o[0]] = o[1];
  }

  return i;
}, n.prototype.getDOM = function (t) {
  return "string" == typeof t ? i.parseFromString(t, "text/html") : t;
}, n.prototype.getView = function (t) {
  return t.querySelector("[data-router-view]");
}, n.prototype.getSlug = function (t) {
  return t.getAttribute("data-router-view");
}, n.prototype.getRenderer = function (t) {
  if (!this.renderers) return Promise.resolve(r);

  if (t in this.renderers) {
    var e = this.renderers[t];
    return "function" != typeof e || r.isPrototypeOf(e) ? "function" == typeof e.then ? Promise.resolve(e).then(function (t) {
      return t.default;
    }) : Promise.resolve(e) : Promise.resolve(e()).then(function (t) {
      return t.default;
    });
  }

  return Promise.resolve(r);
}, n.prototype.getTransition = function (t) {
  return this.transitions ? t in this.transitions ? {
    class: this.transitions[t],
    name: t
  } : "default" in this.transitions ? {
    class: this.transitions.default,
    name: "default"
  } : null : null;
}, n.prototype.getProperties = function (t) {
  var e = this.getDOM(t),
      r = this.getView(e),
      i = this.getSlug(r);
  return {
    page: e,
    view: r,
    slug: i,
    renderer: this.getRenderer(i, this.renderers),
    transition: this.getTransition(i, this.transitions)
  };
}, n.prototype.getLocation = function (t) {
  return {
    href: t,
    anchor: this.getAnchor(t),
    origin: this.getOrigin(t),
    params: this.getParams(t),
    pathname: this.getPathname(t)
  };
};

var o = function (t) {
  function e(e) {
    var r = this;
    void 0 === e && (e = {});
    var i = e.renderers,
        o = e.transitions;
    t.call(this), this.Helpers = new n(i, o), this.Transitions = o, this.Contextual = !1, this.location = this.Helpers.getLocation(window.location.href), this.properties = this.Helpers.getProperties(document.cloneNode(!0)), this.popping = !1, this.running = !1, this.trigger = null, this.cache = new Map(), this.cache.set(this.location.href, this.properties), this.properties.renderer.then(function (t) {
      r.From = new t(r.properties), r.From.setup();
    }), this._navigate = this.navigate.bind(this), window.addEventListener("popstate", this.popState.bind(this)), this.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), this.attach(this.links);
  }

  return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e, e.prototype.attach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].addEventListener("click", this._navigate);
  }, e.prototype.detach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].removeEventListener("click", this._navigate);
  }, e.prototype.navigate = function (t) {
    if (!t.metaKey && !t.ctrlKey) {
      t.preventDefault();
      var e = !!t.currentTarget.hasAttribute("data-transition") && t.currentTarget.dataset.transition;
      this.redirect(t.currentTarget.href, e, t.currentTarget);
    }
  }, e.prototype.redirect = function (t, e, r) {
    if (void 0 === e && (e = !1), void 0 === r && (r = "script"), this.trigger = r, !this.running && t !== this.location.href) {
      var i = this.Helpers.getLocation(t);
      this.Contextual = !1, e && (this.Contextual = this.Transitions.contextual[e].prototype, this.Contextual.name = e), i.origin !== this.location.origin || i.anchor && i.pathname === this.location.pathname ? window.location.href = t : (this.location = i, this.beforeFetch());
    }
  }, e.prototype.popState = function () {
    this.trigger = "popstate", this.Contextual = !1;
    var t = this.Helpers.getLocation(window.location.href);
    this.location.pathname !== t.pathname || !this.location.anchor && !t.anchor ? (this.popping = !0, this.location = t, this.beforeFetch()) : this.location = t;
  }, e.prototype.pushState = function () {
    this.popping || window.history.pushState(this.location, "", this.location.href);
  }, e.prototype.fetch = function () {
    try {
      var t = this;
      return Promise.resolve(fetch(t.location.href, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "X-Requested-With": "Highway"
        },
        credentials: "same-origin"
      })).then(function (e) {
        if (e.status >= 200 && e.status < 300) return e.text();
        window.location.href = t.location.href;
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.beforeFetch = function () {
    try {
      var t = this;

      function e() {
        t.afterFetch();
      }

      t.pushState(), t.running = !0, t.emit("NAVIGATE_OUT", {
        from: {
          page: t.From.properties.page,
          view: t.From.properties.view
        },
        trigger: t.trigger,
        location: t.location
      });
      var r = {
        trigger: t.trigger,
        contextual: t.Contextual
      },
          i = t.cache.has(t.location.href) ? Promise.resolve(t.From.hide(r)).then(function () {
        t.properties = t.cache.get(t.location.href);
      }) : Promise.resolve(Promise.all([t.fetch(), t.From.hide(r)])).then(function (e) {
        t.properties = t.Helpers.getProperties(e[0]), t.cache.set(t.location.href, t.properties);
      });
      return Promise.resolve(i && i.then ? i.then(e) : e());
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.afterFetch = function () {
    try {
      var t = this;
      return Promise.resolve(t.properties.renderer).then(function (e) {
        return t.To = new e(t.properties), t.To.add(), t.emit("NAVIGATE_IN", {
          to: {
            page: t.To.properties.page,
            view: t.To.wrap.lastElementChild
          },
          trigger: t.trigger,
          location: t.location
        }), Promise.resolve(t.To.show({
          trigger: t.trigger,
          contextual: t.Contextual
        })).then(function () {
          t.popping = !1, t.running = !1, t.detach(t.links), t.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), t.attach(t.links), t.emit("NAVIGATE_END", {
            to: {
              page: t.To.properties.page,
              view: t.To.wrap.lastElementChild
            },
            from: {
              page: t.From.properties.page,
              view: t.From.properties.view
            },
            trigger: t.trigger,
            location: t.location
          }), t.From = t.To, t.trigger = null;
        });
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e;
}(e),
    s = function (t, e) {
  this.wrap = t, this.name = e;
};

s.prototype.show = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.lastElementChild,
      o = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-in", i.name), n.removeAttribute("data-transition-out", i.name), i.in && i.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-in", e.name), n.removeAttribute("data-transition-out", e.name), e.in && e.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    }));
  });
}, s.prototype.hide = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-out", i.name), n.removeAttribute("data-transition-in", i.name), i.out && i.out({
      from: n,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-out", e.name), n.removeAttribute("data-transition-in", e.name), e.out && e.out({
      from: n,
      trigger: r,
      done: t
    }));
  });
}, console.log("Highway v2.2.0");
var _default = {
  Core: o,
  Helpers: n,
  Renderer: r,
  Transition: s
};
exports.default = _default;
},{}],"src/script/fade.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//import gsap
// import Tween from 'gsap';
//fade class
var Fade = /*#__PURE__*/function (_Highway$Transition) {
  _inherits(Fade, _Highway$Transition);

  var _super = _createSuper(Fade);

  function Fade() {
    _classCallCheck(this, Fade);

    return _super.apply(this, arguments);
  }

  _createClass(Fade, [{
    key: "in",
    value: //index -> about
    function _in(_ref) {
      var from = _ref.from,
          to = _ref.to,
          done = _ref.done;
      //about PAGE GOING IN
      // Reset Scroll
      window.scrollTo(0, 0); //remove the old content

      from.remove(); //animation

      gsap.fromTo(to, 0.5, {
        opacity: 0
      }, {
        opacity: 1,
        onComplete: done
      });
    }
  }, {
    key: "out",
    value: function out(_ref2) {
      var from = _ref2.from,
          done = _ref2.done;
      //index PAGE FOUND OUT
      //animation
      // done();
      gsap.fromTo(from, 0.5, {
        opacity: 1
      }, {
        opacity: 0,
        onComplete: done
      });
    }
  }]);

  return Fade;
}(_highway.default.Transition);

var _default = Fade;
exports.default = _default;
},{"@dogstudio/highway":"node_modules/@dogstudio/highway/build/highway.module.js"}],"src/script/scroll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmoothScroll = /*#__PURE__*/function () {
  function SmoothScroll(id, id2) {
    _classCallCheck(this, SmoothScroll);

    this.container = document.getElementById(id);
    this.container2 = document.getElementById(id2);
    this.y = 0;
    this.pY = 0;
    this.smooth = 0.1;
    this.precision = 2;
    this.myRef;
    this.allowScroll = true;
    this.rotate = 0;
    this.speed = 0;
    this.lastPosition = 0;
    this.currentPosition = 0;
    this.minSpeed = -1;
    this.maxSpeed = 1;
    this.events();
    this.animate();
  }

  _createClass(SmoothScroll, [{
    key: "events",
    value: function events() {
      var _this = this;

      // window.addEventListener("resize", (e) => this.onResize(e))
      window.addEventListener("scroll", function (e) {
        if (_this.allowScroll) _this.animate();
      });
      this.onResize();
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      document.body.style.height = "".concat(this.height, "px");
    }
  }, {
    key: "height",
    get: function get() {
      return this.container.getBoundingClientRect().height;
    }
  }, {
    key: "scrollY",
    get: function get() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      this.allowScroll = false;
      this.myRef = requestAnimationFrame(function () {
        return _this2.animate();
      });
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.y += (this.scrollY - this.y) * this.smooth;

      if (this.pY === this.y) {
        this.allowScroll = true;
        window.cancelAnimationFrame(this.myRef);
      }

      this.container.style.transform = "translate3d(0,-".concat(this.y.toFixed(this.precision), "px,0)");
      this.currentPosition = this.scrollY;
      this.speed = this.speed + (this.lastPosition - this.currentPosition);
      this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed;
      this.speed = this.speed < this.minSpeed ? this.minSpeed : this.speed;
      this.lastPosition = this.currentPosition;
      this.speed = this.speed > 0 ? this.speed - 0.1 : this.speed;
      this.speed = this.speed <= 0 ? this.speed + 0.1 : this.speed;
      this.container2.style.transform = "perspective(300px) rotateX(".concat(this.speed.toFixed(this.precision), "deg)");
      this.pY = this.y;
    }
  }]);

  return SmoothScroll;
}();

var _default = SmoothScroll;
exports.default = _default;
},{}],"src/script/files/vector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "add",
    value: function add(val) {
      this.x += val;
      this.y += val;
    }
  }, {
    key: "addTo",
    value: function addTo(v2) {
      this.x += v2.x;
      this.y += v2.y;
    }
  }, {
    key: "multBy",
    value: function multBy(f) {
      this.x *= f;
      this.y *= f;
    }
  }, {
    key: "set",
    value: function set(x, y) {
      this.x = x || this.x;
      this.y = y || this.y;
    }
  }]);

  return Vector;
}();

var _default = Vector;
exports.default = _default;
},{}],"src/script/files/mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vector = _interopRequireDefault(require("./vector.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pxRatio = window.devicePixelRatio;

var Mouse = /*#__PURE__*/function () {
  function Mouse() {
    _classCallCheck(this, Mouse);

    this.pos = new _vector.default(1, 1);
    this.addEvents();
  }

  _createClass(Mouse, [{
    key: "addEvents",
    value: function addEvents() {
      // const mouseMove = throttle(this.update.bind(this), 100,this);
      var mouseMove = this.update.bind(this);
      document.addEventListener('mousemove', mouseMove, false);
      document.addEventListener('touchmove', mouseMove, false);
    }
  }, {
    key: "onDown",
    value: function onDown(callback) {
      var _this = this;

      document.addEventListener('mousedown', function () {
        return callback(_this.pos);
      }, false);
      document.addEventListener('touchstart', function () {
        return callback(_this.pos);
      }, false);
    }
  }, {
    key: "onUp",
    value: function onUp(callback) {
      var _this2 = this;

      document.addEventListener('mouseup', function () {
        return callback(_this2.pos);
      }, false);
      document.addEventListener('touchend', function () {
        return callback(_this2.pos);
      }, false);
    }
  }, {
    key: "update",
    value: function update(e) {
      if (e.touches) e = e.touches[0];
      this.pos.set(e.clientX * pxRatio, e.clientY * pxRatio); // this.pos.set(e.clientX, e.clientY);
      // console.log(this.pos);
    }
  }]);

  return Mouse;
}();

var _default = Mouse;
exports.default = _default;
},{"./vector.js":"src/script/files/vector.js"}],"src/script/drawing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mouse = _interopRequireDefault(require("./files/mouse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Drawing = /*#__PURE__*/function () {
  function Drawing(id) {
    _classCallCheck(this, Drawing);

    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.mouse = new _mouse.default();
    this.myRef;
    this.maxLength = 10;
    this.positions = []; // const onResizeHandler = debounce(this.onResize.bind(this), 100,this);

    var onResizeHandler = this.onResize.bind(this);
    window.addEventListener('resize', onResizeHandler, false);
    this.onResize();
    this.animate();
  }

  _createClass(Drawing, [{
    key: "onResize",
    value: function onResize(e) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;

      this.myRef = requestAnimationFrame(function () {
        return _this.animate();
      });
      this.render();
    }
  }, {
    key: "map",
    value: function map(n, start1, stop1, start2, stop2) {
      return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }
  }, {
    key: "render",
    value: function render() {
      this.ctx.globalCompositeOperation = 'source-over'; // this.ctx.globalCompositeOperation = 'xor';
      // this.ctx.globalCompositeOperation = 'source-in';
      // this.ctx.globalCompositeOperation = 'source-out';

      this.ctx.fillStyle = 'rgb(216,216,216)';
      this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fill();
      this.ctx.globalCompositeOperation = 'screen';
      this.positions.push([this.mouse.pos.x, this.mouse.pos.y]);

      if (this.positions.length > this.maxLength) {
        this.positions.splice(0, 1);
      }

      this.ctx.shadowColor = 'rgb(255, 255, 255)';

      for (var i = 0; i < this.positions.length; i++) {
        var pos = this.positions[i];
        this.ctx.beginPath(); // begin
        // this.ctx.strokeStyle = `rgb(0, ${this.map(i, 0, this.maxLength, 100, 255)})`;

        this.ctx.strokeStyle = "rgb(255, ".concat(this.map(i, 0, this.maxLength, 100, 255), ")");
        this.ctx.lineWidth = "".concat(this.map(i, 0, this.maxLength, 420, 220));
        this.ctx.shadowBlur = this.map(i, 0, this.maxLength, 255, 200);
        this.ctx.arc(pos[0], pos[1], 50, 0, Math.PI * 2, false);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }]);

  return Drawing;
}();

var _default = Drawing;
exports.default = _default;
},{"./files/mouse.js":"src/script/files/mouse.js"}],"src/script/app.js":[function(require,module,exports) {
"use strict";

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

var _fade = _interopRequireDefault(require("./fade.js"));

var _scroll2 = _interopRequireDefault(require("./scroll.js"));

var _drawing = _interopRequireDefault(require("./drawing.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Overlap from './overlap.js';
var _draw = new _drawing.default('paintonme');
/*			highway 			*/


var H = new _highway.default.Core({
  transitions: {
    default: _fade.default // contextual: {
    //   overlap: Overlap
    // }

  }
});
var linksMenu = document.querySelectorAll('nav a'); //listen to the navigate OUT

H.on('NAVIGATE_OUT', function (_ref) {
  var from = _ref.from,
      trigger = _ref.trigger,
      location = _ref.location;
  closeMenu();
}); //listen to the navegate IN

H.on('NAVIGATE_IN', function (_ref2) {
  var to = _ref2.to,
      location = _ref2.location;
  linksMenu.forEach(function (link) {
    //remove class
    link.classList.remove('active'); //add class list active

    if (link.href == location.href) {
      link.classList.add('active');
    }
  });
});
/*			scroll mobile 			*/

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (!isMobile) {
  var _scroll = new _scroll2.default('scrollContainer', 'main');
} else {
  document.getElementById('maximusContainer').classList.add('mobile');
  document.getElementById('scrollContainer').classList.add('mobile');
}
/*			MENU 			*/


var anim3 = {
  container: document.getElementById('nav-icon2'),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-load.json"
};
var anim3 = lottie.loadAnimation(anim3);
var anim1 = {
  container: document.getElementById('nav-icon2'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-entrada.json'
};
var anim1 = lottie.loadAnimation(anim1);
var anim2 = {
  container: document.getElementById('nav-icon2'),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "https://www.studio-sub.com/clientes/frenkel/json/Frenkel-menu-salida.json"
};
var anim2 = lottie.loadAnimation(anim2); //HEADER

console.log('%cBy @Studio-SUB', 'font-size: 14px;color: #000; border:1px solid #000;');
var menuHamburguer = document.getElementById('menuHamburguer');
var hamburgerIcon = document.getElementById('nav-icon2');
var menuNav = document.getElementById('nav');
var menuNavUl = document.getElementById('navUl');
anim3.play();

var openMenu = function openMenu() {
  hamburgerIcon.classList.add('open');
  menuNav.classList.add('open');
  menuNavUl.classList.add('open');
  anim1.play();
};

var closeMenu = function closeMenu() {
  menuNavUl.classList.remove('open');
  setTimeout(function () {
    hamburgerIcon.classList.remove('open');
    menuNav.classList.remove('open');
  }, 1000);
  anim2.play();
};

menuHamburguer.addEventListener("change", function () {
  menuHamburguer.checked ? openMenu() : closeMenu();
});
setTimeout(function () {
  hamburgerIcon.classList.remove('load');
}, 3000);
},{"@dogstudio/highway":"node_modules/@dogstudio/highway/build/highway.module.js","./fade.js":"src/script/fade.js","./scroll.js":"src/script/scroll.js","./drawing.js":"src/script/drawing.js"}],"../../../Users/ERE/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65276" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/ERE/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script/app.js"], null)
//# sourceMappingURL=/app.41f2fad5.js.map