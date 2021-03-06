var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, l, m) {
	if (m.get || m.set)
		throw new TypeError("ES3 does not support getters and setters.");
	c != Array.prototype && c != Object.prototype && (c[l] = m.value)
};
$jscomp.getGlobal = function(c) {
	return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
	$jscomp.initSymbol = function() {
	};
	$jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(c) {
	return $jscomp.SYMBOL_PREFIX + (c || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
	$jscomp.initSymbol();
	var c = $jscomp.global.Symbol.iterator;
	c || ( c = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
	"function" != typeof Array.prototype[c] && $jscomp.defineProperty(Array.prototype, c, {
		configurable : !0,
		writable : !0,
		value : function() {
			return $jscomp.arrayIterator(this)
		}
	});
	$jscomp.initSymbolIterator = function() {
	}
};
$jscomp.arrayIterator = function(c) {
	var l = 0;
	return $jscomp.iteratorPrototype(function() {
		return l < c.length ? {
			done : !1,
			value : c[l++]
		} : {
			done : !0
		}
	})
};
$jscomp.iteratorPrototype = function(c) {
	$jscomp.initSymbolIterator();
	c = {
		next : c
	};
	c[$jscomp.global.Symbol.iterator] = function() {
		return this
	};
	return c
};
$jscomp.iteratorFromArray = function(c, l) {
	$jscomp.initSymbolIterator();
	c instanceof String && (c += "");
	var m = 0,
	    k = {
		next : function() {
			if (m < c.length) {
				var f = m++;
				return {
					value : l(f, c[f]),
					done : !1
				}
			}
			k.next = function() {
				return {
					done : !0,
					value :
					void 0
				}
			};
			return k.next()
		}
	};
	k[Symbol.iterator] = function() {
		return k
	};
	return k
};
$jscomp.polyfill = function(c, l, m, k) {
	if (l) {
		m = $jscomp.global;
		c = c.split(".");
		for ( k = 0; k < c.length - 1; k++) {
			var f = c[k];
			f in m || (m[f] = {});
			m = m[f]
		}
		c = c[c.length - 1];
		k = m[c];
		l = l(k);
		l != k && null != l && $jscomp.defineProperty(m, c, {
			configurable : !0,
			writable : !0,
			value : l
		})
	}
};
$jscomp.polyfill("Array.prototype.keys", function(c) {
	return c ? c : function() {
		return $jscomp.iteratorFromArray(this, function(c) {
			return c
		})
	}
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.values", function(c) {
	return c ? c : function() {
		return $jscomp.iteratorFromArray(this, function(c, m) {
			return m
		})
	}
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function(c) {
	return c ? c : function(c, m, k) {
		var f = this.length || 0;
		0 > m && ( m = Math.max(0, f + m));
		if (null == k || k > f)
			k = f;
		k = Number(k);
		0 > k && ( k = Math.max(0, f + k));
		for ( m = Number(m || 0); m < k; m++)
			this[m] = c;
		return this
	}
}, "es6-impl", "es3");
this.Two = function(c) {
	function l() {
		var a = document.body.getBoundingClientRect(),
		    c = this.width = a.width,
		    a = this.height = a.height;
		this.renderer.setSize(c, a, this.ratio);
		this.trigger(p.Events.resize, c, a)
	}

	function m() {
		L(m);
		for (var a = 0; a < p.Instances.length; a++) {
			var c = p.Instances[a];
			c.playing && c.update()
		}
	}

	var k = this,
	    f = {
		_indexAmount : 0,
		natural : {
			slice : Array.prototype.slice,
			indexOf : Array.prototype.indexOf,
			keys : Object.keys,
			bind : Function.prototype.bind,
			create : Object.create
		},
		identity : function(a) {
			return a
		},
		isArguments : function(a) {
			return "[object Arguments]" === toString.call(a)
		},
		isFunction : function(a) {
			return "[object Function]" === toString.call(a)
		},
		isString : function(a) {
			return "[object String]" === toString.call(a)
		},
		isNumber : function(a) {
			return "[object Number]" === toString.call(a)
		},
		isDate : function(a) {
			return "[object Date]" === toString.call(a)
		},
		isRegExp : function(a) {
			return "[object RegExp]" === toString.call(a)
		},
		isError : function(a) {
			return "[object Error]" === toString.call(a)
		},
		isFinite : function(a) {
			return isFinite(a) && !isNaN(parseFloat(a))
		},
		isNaN : function(a) {
			return f.isNumber(a) && a !== +a
		},
		isBoolean : function(a) {
			return !0 === a || !1 === a || "[object Boolean]" === toString.call(a)
		},
		isNull : function(a) {
			return null === a
		},
		isUndefined : function(a) {
			return
			void 0 === a
		},
		isEmpty : function(a) {
			return null == a ? !0 : r && (f.isArray(a) || f.isString(a) || f.isArguments(a)) ? 0 === a.length : 0 === f.keys(a).length
		},
		isElement : function(a) {
			return !(!a || 1 !== a.nodeType)
		},
		isArray : Array.isArray ||
		function(a) {
			return "[object Array]" === toString.call(a)
		},
		isObject : function(a) {
			var c = typeof a;
			return "function" === c || "object" === c && !!a
		},
		toArray : function(a) {
			return a ? f.isArray(a) ? y.call(a) : r(a) ? f.map(a, f.identity) : f.values(a) : []
		},
		range : function(a, c, e) {
			null == c && ( c = a || 0,
			a = 0);
			e = e || 1;
			c = Math.max(Math.ceil((c - a) / e), 0);
			for (var d = Array(c),
			    g = 0; g < c; g++, a += e)
				d[g] = a;
			return d
		},
		indexOf : function(a, c) {
			if (f.natural.indexOf)
				return f.natural.indexOf.call(a, c);
			for (var e = 0; e < a.length; e++)
				if (a[e] === c)
					return e;
			return -1
		},
		has : function(a, c) {
			return null != a && hasOwnProperty.call(a, c)
		},
		bind : function(a, c) {
			var e = f.natural.bind;
			if (e && a.bind === e)
				return e.apply(a, y.call(arguments, 1));
			var d = y.call(arguments, 2);
			return function() {
				a.apply(c, d)
			}
		},
		extend : function(a) {
			for (var c = y.call(arguments, 1),
			    e = 0; e < c.length; e++) {
				var d = c[e],
				    g;
				for (g in d)
				a[g] = d[g]
			}
			return a
		},
		defaults : function(a) {
			for (var c = y.call(arguments, 1),
			    e = 0; e < c.length; e++) {
				var d = c[e],
				    g;
				for (g in d)
				void 0 === a[g] && (a[g] = d[g])
			}
			return a
		},
		keys : function(a) {
			if (!f.isObject(a))
				return [];
			if (f.natural.keys)
				return f.natural.keys(a);
			var c = [],
			    e;
			for (e in a)f.has(a, e) && c.push(e);
			return c
		},
		values : function(a) {
			for (var c = f.keys(a),
			    e = [],
			    d = 0; d < c.length; d++)
				e.push(a[c[d]]);
			return e
		},
		each : function(a, c, e) {
			e = e || this;
			for (var d = !r(a) && f.keys(a),
			    g = (d || a).length,
			    D = 0; D < g; D++) {
				var n = d ? d[D] : D;
				c.call(e, a[n], n, a)
			}
			return a
		},
		map : function(a, c, e) {
			e = e || this;
			for (var d = !r(a) && f.keys(a),
			    g = (d || a).length,
			    D = [],
			    n = 0; n < g; n++) {
				var v = d ? d[n] : n;
				D[n] = c.call(e, a[v], v, a)
			}
			return D
		},
		once : function(a) {
			var c = !1;
			return function() {
				if (c)
					return a;
				c = !0;
				return a.apply(this, arguments)
			}
		},
		after : function(a, c) {
			return function() {
				for (; 1 > --a; )
					return c.apply(this, arguments)
			}
		},
		uniqueId : function(a) {
			var c = ++f._indexAmount + "";
			return a ? a + c : c
		}
	},
	    h = Math.sin,
	    d = Math.cos,
	    a = Math.atan2,
	    g = Math.sqrt,
	    n = Math.PI,
	    e = n / 2,
	    v = Math.pow,
	    u = Math.min,
	    z = Math.max,
	    w = 0,
	    y = f.natural.slice,
	    x = k.performance && k.performance.now ? k.performance : Date,
	    t = Math.pow(2, 53) - 1,
	    r = function(a) {
		a = null == a ?
		void 0 : a.length;
		return "number" == typeof a && 0 <= a && a <= t
	},
	    q = {
		temp : k.document ? k.document.createElement("div") : {},
		hasEventListeners : f.isFunction(k.addEventListener),
		bind : function(a, c, e, d) {
			this.hasEventListeners ? a.addEventListener(c, e, !!d) : a.attachEvent("on" + c, e);
			return q
		},
		unbind : function(a, c, e, d) {
			q.hasEventListeners ? a.removeEventListeners(c, e, !!d) : a.detachEvent("on" + c, e);
			return q
		},
		getRequestAnimationFrame : function() {
			var a = 0,
			    c = ["ms", "moz", "webkit", "o"],
			    e = k.requestAnimationFrame;
			if (!e) {
				for (var d = 0; d < c.length; d++)
					e = k[c[d] + "RequestAnimationFrame"] || e;
				e = e ||
				function(c, e) {
					var d = (new Date).getTime(),
					    g = Math.max(0, 16 - (d - a));
					e = k.setTimeout(function() {
						c(d + g)
					}, g);
					a = d + g;
					return e
				}

			}
			e.init = f.once(m);
			return e
		}
	},
	    p = k.Two = function(a) {
		a = f.defaults(a || {}, {
			fullscreen : !1,
			width : 640,
			height : 480,
			type : p.Types.svg,
			autostart : !1
		});
		f.each(a, function(a, c) {
			"fullscreen" !== c && "autostart" !== c && (this[c] = a)
		}, this);
		if (f.isElement(a.domElement)) {
			var c = a.domElement.tagName.toLowerCase();
			/^(CanvasRenderer-canvas|WebGLRenderer-canvas|SVGRenderer-svg)$/.test(this.type + "-" + c) || (this.type = p.Types[c])
		}
		this.renderer = new p[this.type](this);
		p.Utils.setPlaying.call(this, a.autostart);
		this.frameCount = 0;
		a.fullscreen ? ( a = f.bind(l, this), f.extend(document.body.style, {
			overflow : "hidden",
			margin : 0,
			padding : 0,
			top : 0,
			left : 0,
			right : 0,
			bottom : 0,
			position : "fixed"
		}), f.extend(this.renderer.domElement.style, {
			display : "block",
			top : 0,
			left : 0,
			right : 0,
			bottom : 0,
			position : "fixed"
		}), q.bind(k, "resize", a), a()) : f.isElement(a.domElement) || (this.renderer.setSize(a.width, a.height, this.ratio), this.width = a.width, this.height = a.height);
		this.scene = this.renderer.scene;
		p.Instances.push(this);
		L.init()
	};
	f.extend(p, {
		Array : k.Float32Array || Array,
		Types : {
			webgl : "WebGLRenderer",
			svg : "SVGRenderer",
			canvas : "CanvasRenderer"
		},
		Version : "v0.7.0",
		Identifier : "two_",
		Properties : {
			hierarchy : "hierarchy",
			demotion : "demotion"
		},
		Events : {
			play : "play",
			pause : "pause",
			update : "update",
			render : "render",
			resize : "resize",
			change : "change",
			remove : "remove",
			insert : "insert",
			order : "order",
			load : "load"
		},
		Commands : {
			move : "M",
			line : "L",
			curve : "C",
			close : "Z"
		},
		Resolution : 8,
		Instances : [],
		noConflict : function() {
			k.Two = c;
			return this
		},
		uniqueId : function() {
			var a = w;
			w++;
			return a
		},
		Utils : f.extend(f, {
			performance : x,
			defineProperty : function(a) {
				var c = "_" + a,
				    e = "_flag" + a.charAt(0).toUpperCase() + a.slice(1);
				Object.defineProperty(this, a, {
					enumerable : !0,
					get : function() {
						return this[c]
					},
					set : function(a) {
						this[c] = a;
						this[e] = !0
					}
				})
			},
			release : function(a) {
				f.isObject(a) && (f.isFunction(a.unbind) && a.unbind(), a.vertices && (f.isFunction(a.vertices.unbind) && a.vertices.unbind(), f.each(a.vertices, function(a) {
					f.isFunction(a.unbind) && a.unbind()
				})), a.children && f.each(a.children, function(a) {
					p.Utils.release(a)
				}))
			},
			xhr : function(a, c) {
				var e = new XMLHttpRequest;
				e.open("GET", a);
				e.onreadystatechange = function() {
					4 === e.readyState && 200 === e.status && c(e.responseText)
				};
				e.send();
				return e
			},
			Curve : {
				CollinearityEpsilon : v(10, -30),
				RecursionLimit : 16,
				CuspLimit : 0,
				Tolerance : {
					distance : .25,
					angle : 0,
					epsilon : .01
				},
				abscissas : [[.5773502691896257], [0, .7745966692414834], [.33998104358485626, .8611363115940526], [0, .5384693101056831, .906179845938664], [.2386191860831969, .6612093864662645, .932469514203152], [0, .4058451513773972, .7415311855993945, .9491079123427585], [.1834346424956498, .525532409916329, .7966664774136267, .9602898564975363], [0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261], [.14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717], [0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057], [.1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192], [0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881], [.10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123], [0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854], [.09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499]],
				weights : [[1], [.8888888888888888, .5555555555555556], [.6521451548625461, .34785484513745385], [.5688888888888889, .47862867049936647, .23692688505618908], [.46791393457269104, .3607615730481386, .17132449237917036], [.4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697], [.362683783378362, .31370664587788727, .22238103445337448, .10122853629037626], [.3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441], [.29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814], [.2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366], [.24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183], [.2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588], [.2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186], [.2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727], [.1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096]]
			},
			devicePixelRatio : k.devicePixelRatio || 1,
			getBackingStoreRatio : function(a) {
				return a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || a.backingStorePixelRatio || 1
			},
			getRatio : function(a) {
				return p.Utils.devicePixelRatio / J(a)
			},
			setPlaying : function(a) {
				this.playing = !!a;
				return this
			},
			getComputedMatrix : function(a, c) {
				c = c && c.identity() || new p.Matrix;
				for (var e = []; a && a._matrix; )
					e.push(a._matrix),
					a = a.parent;
				e.reverse();
				f.each(e, function(a) {
					a = a.elements;
					c.multiply(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9])
				});
				return c
			},
			deltaTransformPoint : function(a, c, e) {
				return new p.Vector(c * a.a + e * a.c + 0, c * a.b + e * a.d + 0)
			},
			decomposeMatrix : function(a) {
				var c = p.Utils.deltaTransformPoint(a, 0, 1),
				    e = p.Utils.deltaTransformPoint(a, 1, 0),
				    c = 180 / Math.PI * Math.atan2(c.y, c.x) - 90;
				return {
					translateX : a.e,
					translateY : a.f,
					scaleX : Math.sqrt(a.a * a.a + a.b * a.b),
					scaleY : Math.sqrt(a.c * a.c + a.d * a.d),
					skewX : c,
					skewY : 180 / Math.PI * Math.atan2(e.y, e.x),
					rotation : c
				}
			},
			applySvgAttributes : function(a, c) {
				var e = {},
				    d = {},
				    g;
				if (getComputedStyle) {
					var n = getComputedStyle(a);
					for ( g = n.length; g--; ) {
						var v = n[g];
						var h = n[v];
						void 0 !== h && (d[v] = h)
					}
				}
				for ( g = a.attributes.length; g--; )
					h = a.attributes[g], e[h.nodeName] = h.value;
				f.isUndefined(d.opacity) || (d["stroke-opacity"] = d.opacity, d["fill-opacity"] = d.opacity);
				f.extend(d, e);
				d.visible = !(f.isUndefined(d.display) && "none" === d.display) || f.isUndefined(d.visibility) && "hidden" === d.visibility;
				for (v in d)
				switch(h=
				d[v],v) {
				case "transform":
					if ("none" === h)
						break;
					if (null === a.getCTM())
						break;
					e = p.Utils.decomposeMatrix(a.getCTM());
					c.translation.set(e.translateX, e.translateY);
					c.rotation = e.rotation;
					c.scale = e.scaleX;
					e = parseFloat((d.x + "").replace("px"));
					g = parseFloat((d.y + "").replace("px"));
					e && (c.translation.x = e);
					g && (c.translation.y = g);
					break;
				case "visible":
					c.visible = h;
					break;
				case "stroke-linecap":
					c.cap = h;
					break;
				case "stroke-linejoin":
					c.join = h;
					break;
				case "stroke-miterlimit":
					c.miter = h;
					break;
				case "stroke-width":
					c.linewidth = parseFloat(h);
					break;
				case "stroke-opacity":
				case "fill-opacity":
				case "opacity":
					c.opacity = parseFloat(h);
					break;
				case "fill":
				case "stroke":
					/url\(\#.*\)/i.test(h) ? c[v] = this.getById(h.replace(/url\(\#(.*)\)/i, "$1")) : c[v] = "none" === h ? "transparent" : h;
					break;
				case "id":
					c.id = h;
					break;
				case "class":
					c.classList = h.split(" ")
				}
				return c
			},
			read : {
				svg : function() {
					return p.Utils.read.g.apply(this, arguments)
				},
				g : function(a) {
					var c = new p.Group;
					p.Utils.applySvgAttributes.call(this, a, c);
					for (var e = 0,
					    d = a.childNodes.length; e < d; e++) {
						var g = a.childNodes[e],
						    f = g.nodeName;
						if (!f)
							return;
						f = f.replace(/svg\:/ig, "").toLowerCase();
						f in p.Utils.read && ( g = p.Utils.read[f].call(c, g), c.add(g))
					}
					return c
				},
				polygon : function(a, c) {
					var e = [];
					a.getAttribute("points").replace(/(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g, function(a, c, d) {
						e.push(new p.Anchor(parseFloat(c), parseFloat(d)))
					});
					c = (new p.Path(e, !c)).noStroke();
					c.fill = "black";
					return p.Utils.applySvgAttributes.call(this, a, c)
				},
				polyline : function(a) {
					return p.Utils.read.polygon.call(this, a, !0)
				},
				path : function(a) {
					var c = a.getAttribute("d"),
					    e = new p.Anchor,
					    d,
					    g,
					    n = !1,
					    h = !1,
					    u = c.match(/[a-df-z][^a-df-z]*/ig),
					    D = u.length - 1;
					f.each(u.slice(0), function(a, c) {
						var e = a[0],
						    d = e.toLowerCase(),
						    g = a.slice(1).trim().split(/[\s,]+|(?=\s?[+\-])/),
						    f = [],
						    n;
						0 >= c && ( u = []);
						switch(d) {
						case "h":
						case "v":
							1 < g.length && ( n = 1);
							break;
						case "m":
						case "l":
						case "t":
							2 < g.length && ( n = 2);
							break;
						case "s":
						case "q":
							4 < g.length && ( n = 4);
							break;
						case "c":
							6 < g.length && ( n = 6)
						}
						if (n) {
							a = 0;
							c = g.length;
							for ( d = 0; a < c; a += n) {
								var h = e;
								if (0 < d)
									switch(e) {
									case "m":
										h = "l";
										break;
									case "M":
										h = "L"
									}
								f.push([h].concat(g.slice(a, a + n)).join(" "));
								d++
							}
							u = Array.prototype.concat.apply(u, f)
						} else
							u.push(a)
					});
					var m = [];
					f.each(u, function(a, c) {
						var u = a[0],
						    C = u.toLowerCase();
						g = a.slice(1).trim();
						g = g.replace(/(-?\d+(?:\.\d*)?)[eE]([+\-]?\d+)/g, function(a, c, e) {
							return parseFloat(c) * v(10, e)
						});
						g = g.split(/[\s,]+|(?=\s?[+\-])/);
						h = u === C;
						switch(C) {
						case "z":
							if (c >= D)
								n = !0;
							else {
								a = e.x;
								c = e.y;
								var k = new p.Anchor(a, c,
								void 0,
								void 0,
								void 0,
								void 0, p.Commands.close)
							}
							break;
						case "m":
						case "l":
							a = parseFloat(g[0]);
							c = parseFloat(g[1]);
							k = new p.Anchor(a, c,
							void 0,
							void 0,
							void 0,
							void 0, "m" === C ? p.Commands.move : p.Commands.line);
							h && k.addSelf(e);
							e = k;
							break;
						case "h":
						case "v":
							c = "h" === C ? "x" : "y";
							C = "x" === c ? "y" : "x";
							k = new p.Anchor(
							void 0,
							void 0,
							void 0,
							void 0,
							void 0,
							void 0, p.Commands.line);
							k[c] = parseFloat(g[0]);
							k[C] = e[C];
							h && (k[c] += e[c]);
							e = k;
							break;
						case "c":
						case "s":
							k = e.x;
							c = e.y;
							d || ( d = new p.Vector);
							if ("c" === C) {
								u = parseFloat(g[0]);
								var z = parseFloat(g[1]);
								var l = parseFloat(g[2]);
								var w = parseFloat(g[3]);
								C = parseFloat(g[4]);
								a = parseFloat(g[5])
							} else
								C = M(e, d, h),
								u = C.x,
								z = C.y,
								l = parseFloat(g[0]),
								w = parseFloat(g[1]),
								C = parseFloat(g[2]),
								a = parseFloat(g[3]);
							h && (u += k, z += c, l += k, w += c, C += k, a += c);
							f.isObject(e.controls) || p.Anchor.AppendCurveProperties(e);
							e.controls.right.set(u - e.x, z - e.y);
							e = k = new p.Anchor(C, a, l - C, w - a,
							void 0,
							void 0, p.Commands.curve);
							d = k.controls.left;
							break;
						case "t":
						case "q":
							k = e.x;
							c = e.y;
							d || ( d = new p.Vector);
							d.isZero() ? ( u = k,
							z =
							c) : ( u = d.x,
							c = d.y);
							"q" === C ? ( l = parseFloat(g[0]),
							w = parseFloat(g[1]),
							C = parseFloat(g[1]),
							a = parseFloat(g[2])) : ( C = M(e, d, h),
							l = C.x,
							w = C.y,
							C = parseFloat(g[0]),
							a = parseFloat(g[1]));
							h && (u += k, z += c, l += k, w += c, C += k, a += c);
							f.isObject(e.controls) || p.Anchor.AppendCurveProperties(e);
							e.controls.right.set(u - e.x, z - e.y);
							e = k = new p.Anchor(C, a, l - C, w - a,
							void 0,
							void 0, p.Commands.curve);
							d = k.controls.left;
							break;
						case "a":
							k = e.x;
							c = e.y;
							var I = parseFloat(g[0]),
							    y = parseFloat(g[1]);
							z = parseFloat(g[2]) * Math.PI / 180;
							u = parseFloat(g[3]);
							l = parseFloat(g[4]);
							C = parseFloat(g[5]);
							a = parseFloat(g[6]);
							h && (C += k, a += c);
							var q = (C - k) / 2,
							    t = (a - c) / 2;
							w = q * Math.cos(z) + t * Math.sin(z);
							var q = -q * Math.sin(z) + t * Math.cos(z),
							    t = I * I,
							    r = y * y,
							    x = w * w,
							    K = q * q,
							    Q = x / t + K / r;
							1 < Q && (I *= Math.sqrt(Q), y *= Math.sqrt(Q));
							r = Math.sqrt((t * r - t * K - r * x) / (t * K + r * x));
							f.isNaN(r) ? r = 0 : u != l && 0 < r && (r *= -1);
							t = r * I * q / y;
							r = -r * y * w / I;
							k = t * Math.cos(z) - r * Math.sin(z) + (k + C) / 2;
							var x = t * Math.sin(z) + r * Math.cos(z) + (c + a) / 2,
							    P = function(a, c) {
								return (a[0] * c[0] + a[1] * c[1]) / (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2)) * Math.sqrt(Math.pow(c[0], 2) + Math.pow(c[1], 2)))
							};
							c = function(a, c) {
								return (a[0] * c[1] < a[1] * c[0] ? -1 : 1) * Math.acos(P(a, c))
							};
							var B = c([1, 0], [(w - t) / I, (q - r) / y]),
							    K = [(w - t) / I, (q - r) / y];
							w = [(-w - t) / I, (-q - r) / y];
							var A = c(K, w);
							-1 >= P(K, w) && ( A = Math.PI);
							1 <= P(K, w) && ( A = 0);
							u && ( A = F(A, 2 * Math.PI));
							l && 0 < A && (A -= 2 * Math.PI);
							var R = p.Resolution,
							    S = (new p.Matrix).translate(k, x).rotate(z);
							k = f.map(f.range(R), function(a) {
								a = (1 - a / (R - 1)) * A + B;
								a = S.multiply(I * Math.cos(a), y * Math.sin(a), 1);
								return new p.Anchor(a.x, a.y, !1, !1, !1, !1, p.Commands.line)
							});
							k.push(new p.Anchor(C, a, !1, !1, !1, !1, p.Commands.line));
							e = k[k.length - 1];
							d = e.controls.left
						}
						k && (f.isArray(k) ? m = m.concat(k) : m.push(k))
					});
					if (!(1 >= m.length))
						return c = (new p.Path(m, n,
						void 0, !0)).noStroke(), c.fill = "black", p.Utils.applySvgAttributes.call(this, a, c)
				},
				circle : function(a) {
					var c = parseFloat(a.getAttribute("cx")),
					    e = parseFloat(a.getAttribute("cy")),
					    d = parseFloat(a.getAttribute("r")),
					    c = (new p.Circle(c, e, d)).noStroke();
					c.fill = "black";
					return p.Utils.applySvgAttributes.call(this, a, c)
				},
				ellipse : function(a) {
					var c = parseFloat(a.getAttribute("cx")),
					    e = parseFloat(a.getAttribute("cy")),
					    d = parseFloat(a.getAttribute("rx")),
					    g = parseFloat(a.getAttribute("ry")),
					    c = (new p.Ellipse(c, e, d, g)).noStroke();
					c.fill = "black";
					return p.Utils.applySvgAttributes.call(this, a, c)
				},
				rect : function(a) {
					var c = parseFloat(a.getAttribute("x")) || 0,
					    e = parseFloat(a.getAttribute("y")) || 0,
					    d = parseFloat(a.getAttribute("width")),
					    g = parseFloat(a.getAttribute("height")),
					    c = (new p.Rectangle(c + d / 2, e + g / 2, d, g)).noStroke();
					c.fill = "black";
					return p.Utils.applySvgAttributes.call(this, a, c)
				},
				line : function(a) {
					var c = parseFloat(a.getAttribute("x1")),
					    e = parseFloat(a.getAttribute("y1")),
					    d = parseFloat(a.getAttribute("x2")),
					    g = parseFloat(a.getAttribute("y2")),
					    c = (new p.Line(c, e, d, g)).noFill();
					return p.Utils.applySvgAttributes.call(this, a, c)
				},
				lineargradient : function(a) {
					for (var c,
					    e,
					    d = parseFloat(a.getAttribute("x1")),
					    g = parseFloat(a.getAttribute("y1")),
					    n = parseFloat(a.getAttribute("x2")),
					    h = parseFloat(a.getAttribute("y2")),
					    v = (n + d) / 2,
					    u = (h + g) / 2,
					    D = [],
					    k = 0; k < a.children.length; k++) {
						c = a.children[k];
						var m = parseFloat(c.getAttribute("offset")),
						    z = c.getAttribute("stop-color"),
						    l = c.getAttribute("stop-opacity");
						c = c.getAttribute("style");
						f.isNull(z) && ( z = ( e = c.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/)) && 1 < e.length ? e[1] :
						void 0);
						f.isNull(l) && ( l = ( e = c.match(/stop\-opacity\:\s?([0-9\.\-]*)/)) && 1 < e.length ? parseFloat(e[1]) : 1);
						D.push(new p.Gradient.Stop(m, z, l))
					}
					d = new p.LinearGradient(d - v, g - u, n - v, h - u, D);
					return p.Utils.applySvgAttributes.call(this, a, d)
				},
				radialgradient : function(a) {
					var c,
					    e = parseFloat(a.getAttribute("cx")) || 0,
					    d = parseFloat(a.getAttribute("cy")) || 0,
					    g = parseFloat(a.getAttribute("r")),
					    n = parseFloat(a.getAttribute("fx")),
					    h = parseFloat(a.getAttribute("fy"));
					f.isNaN(n) && ( n = e);
					f.isNaN(h) && ( h = d);
					for (var v = Math.abs(e + n) / 2,
					    u = Math.abs(d + h) / 2,
					    k = [],
					    D = 0; D < a.children.length; D++) {
						var m = a.children[D];
						var z = parseFloat(m.getAttribute("offset")),
						    l = m.getAttribute("stop-color"),
						    w = m.getAttribute("stop-opacity");
						m = m.getAttribute("style");
						f.isNull(l) && ( l = ( c = m.match(/stop\-color\:\s?([\#a-fA-F0-9]*)/)) && 1 < c.length ? c[1] :
						void 0);
						f.isNull(w) && ( w = ( c = m.match(/stop\-opacity\:\s?([0-9\.\-]*)/)) && 1 < c.length ? parseFloat(c[1]) : 1);
						k.push(new p.Gradient.Stop(z, l, w))
					}
					e = new p.RadialGradient(e - v, d - u, g, k, n - v, h - u);
					return p.Utils.applySvgAttributes.call(this, a, e)
				}
			},
			subdivide : function(a, c, e, d, g, n, h, v, u) {
				u = u || p.Utils.Curve.RecursionLimit;
				var k = u + 1;
				return a === h && c === v ? [new p.Anchor(h, v)] : f.map(f.range(0, k), function(f) {
					var u = f / k;
					f = N(u, a, e, g, h);
					u = N(u, c, d, n, v);
					return new p.Anchor(f, u)
				})
			},
			getPointOnCubicBezier : function(a, c, e, d, g) {
				var f = 1 - a;
				return f * f * f * c + 3 * f * f * a * e + 3 * f * a * a * d + a * a * a * g
			},
			getCurveLength : function(a, c, e, d, f, n, h, v, u) {
				if (a === e && c === d && f === h && n === v)
					return a = h - a,
					c = v - c, g(a * a + c * c);
				var k = 9 * (e - f) + 3 * (h - a),
				    m = 6 * (a + f) - 12 * e,
				    z = 3 * (e - a),
				    D = 9 * (d - n) + 3 * (v - c),
				    l = 6 * (c + n) - 12 * d,
				    C = 3 * (d - c);
				return O(function(a) {
					var c = (k * a + m) * a + z;
					a = (D * a + l) * a + C;
					return g(c * c + a * a)
				}, 0, 1, u || p.Utils.Curve.RecursionLimit)
			},
			integrate : function(a, c, e, d) {
				var g = p.Utils.Curve.abscissas[d - 2],
				    f = p.Utils.Curve.weights[d - 2];
				e = .5 * (e - c);
				c = e + c;
				var n = 0,
				    h = d + 1 >> 1;
				for ( d = d & 1 ? f[n++] * a(c) : 0; n < h; ) {
					var v = e * g[n];
					d += f[n++] * (a(c + v) + a(c - v))
				}
				return e * d
			},
			getCurveFromPoints : function(a, c) {
				for (var e = a.length,
				    d = e - 1,
				    g = 0; g < e; g++) {
					var n = a[g];
					f.isObject(n.controls) || p.Anchor.AppendCurveProperties(n);
					var h = c ? F(g - 1, e) : z(g - 1, 0),
					    v = c ? F(g + 1, e) : u(g + 1, d);
					H(a[h], n, a[v]);
					n._command = 0 === g ? p.Commands.move : p.Commands.curve;
					n.controls.left.x = f.isNumber(n.controls.left.x) ? n.controls.left.x : n.x;
					n.controls.left.y = f.isNumber(n.controls.left.y) ? n.controls.left.y : n.y;
					n.controls.right.x = f.isNumber(n.controls.right.x) ? n.controls.right.x : n.x;
					n.controls.right.y = f.isNumber(n.controls.right.y) ? n.controls.right.y : n.y
				}
			},
			getControlPoints : function(a, c, g) {
				var v = G(a, c),
				    u = G(g, c);
				a = A(a, c);
				g = A(g, c);
				var k = (v + u) / 2;
				c.u = f.isObject(c.controls.left) ? c.controls.left : new p.Vector(0, 0);
				c.v = f.isObject(c.controls.right) ? c.controls.right : new p.Vector(0, 0);
				if (.0001 > a || .0001 > g)
					return c._relative || (c.controls.left.copy(c), c.controls.right.copy(c)), c;
				a *= .33;
				g *= .33;
				k = u < v ? k + e : k - e;
				c.controls.left.x = d(k) * a;
				c.controls.left.y = h(k) * a;
				k -= n;
				c.controls.right.x = d(k) * g;
				c.controls.right.y = h(k) * g;
				c._relative || (c.controls.left.x += c.x, c.controls.left.y += c.y, c.controls.right.x += c.x, c.controls.right.y += c.y);
				return c
			},
			getReflection : function(a, c, e) {
				return new p.Vector(2 * a.x - (c.x + a.x) - ( e ? a.x : 0), 2 * a.y - (c.y + a.y) - ( e ? a.y : 0))
			},
			getAnchorsFromArcData : function(a, c, e, d, g, n, h) {
				(new p.Matrix).translate(a.x, a.y).rotate(c);
				var v = p.Resolution;
				return f.map(f.range(v), function(a) {
					a = (a + 1) / v;
					h && ( a = 1 - a);
					a = a * n + g;
					a = new p.Anchor(e * Math.cos(a), d * Math.sin(a));
					p.Anchor.AppendCurveProperties(a);
					a.command = p.Commands.line;
					return a
				})
			},
			ratioBetween : function(a, c) {
				return (a.x * c.x + a.y * c.y) / (a.length() * c.length())
			},
			angleBetween : function(c, e) {
				if (4 <= arguments.length) {
					var d = arguments[0] - arguments[2];
					var g = arguments[1] - arguments[3];
					return a(g, d)
				}
				d = c.x - e.x;
				g = c.y - e.y;
				return a(g, d)
			},
			distanceBetweenSquared : function(a, c) {
				var e = a.x - c.x;
				a = a.y - c.y;
				return e * e + a * a
			},
			distanceBetween : function(a, c) {
				return g(E(a, c))
			},
			lerp : function(a, c, e) {
				return e * (c - a) + a
			},
			toFixed : function(a) {
				return Math.floor(1E3 * a) / 1E3
			},
			mod : function(a, c) {
				for (; 0 > a; )
					a += c;
				return a % c
			},
			Collection : function() {
				Array.call(this);
				1 < arguments.length ? Array.prototype.push.apply(this, arguments) : arguments[0] && Array.isArray(arguments[0]) && Array.prototype.push.apply(this, arguments[0])
			},
			Error : function(a) {
				this.name = "two.js";
				this.message = a
			},
			Events : {
				on : function(a, c) {
					this._events || (this._events = {});
					(this._events[a] || (this._events[a] = [])).push(c);
					return this
				},
				off : function(a, c) {
					if (!this._events)
						return this;
					if (!a && !c)
						return this._events = {}, this;
					for (var e = a ? [a] : f.keys(this._events),
					    d = 0,
					    g = e.length; d < g; d++) {
						a = e[d];
						var n = this._events[a];
						if (n) {
							var h = [];
							if (c)
								for (var v = 0,
								    u = n.length; v < u; v++) {
									var k = n[v],
									    k = k.callback ? k.callback : k;
									c && c !== k && h.push(k)
								}
							this._events[a] = h
						}
					}
					return this
				},
				trigger : function(a) {
					if (!this._events)
						return this;
					var c = y.call(arguments, 1),
					    e = this._events[a];
					e && B(this, e, c);
					return this
				},
				listen : function(a, c, e) {
					var d = this;
					if (a) {
						var g = function() {
							e.apply(d, arguments)
						};
						g.obj = a;
						g.name = c;
						g.callback = e;
						a.on(c, g)
					}
					return this
				},
				ignore : function(a, c, e) {
					a.off(c, e);
					return this
				}
			}
		})
	});
	p.Utils.Events.bind = p.Utils.Events.on;
	p.Utils.Events.unbind = p.Utils.Events.off;
	var B = function(a, c, e) {
		switch(e.length) {
		case 0:
			var d = function(d) {
				c[d].call(a, e[0])
			};
			break;
		case 1:
			d = function(d) {
				c[d].call(a, e[0], e[1])
			};
			break;
		case 2:
			d = function(d) {
				c[d].call(a, e[0], e[1], e[2])
			};
			break;
		case 3:
			d = function(d) {
				c[d].call(a, e[0], e[1], e[2], e[3])
			};
			break;
		default:
			d = function(d) {
				c[d].apply(a, e)
			}
		}
		for (var g = 0; g < c.length; g++)
			d(g)
	};
	p.Utils.Error.prototype = Error();
	p.Utils.Error.prototype.constructor = p.Utils.Error;
	p.Utils.Collection.prototype = [];
	p.Utils.Collection.prototype.constructor = p.Utils.Collection;
	f.extend(p.Utils.Collection.prototype, p.Utils.Events, {
		pop : function() {
			var a = Array.prototype.pop.apply(this, arguments);
			this.trigger(p.Events.remove, [a]);
			return a
		},
		shift : function() {
			var a = Array.prototype.shift.apply(this, arguments);
			this.trigger(p.Events.remove, [a]);
			return a
		},
		push : function() {
			var a = Array.prototype.push.apply(this, arguments);
			this.trigger(p.Events.insert, arguments);
			return a
		},
		unshift : function() {
			var a = Array.prototype.unshift.apply(this, arguments);
			this.trigger(p.Events.insert, arguments);
			return a
		},
		splice : function() {
			var a = Array.prototype.splice.apply(this, arguments);
			this.trigger(p.Events.remove, a);
			if (2 < arguments.length) {
				var c = this.slice(arguments[0], arguments[0] + arguments.length - 2);
				this.trigger(p.Events.insert, c);
				this.trigger(p.Events.order)
			}
			return a
		},
		sort : function() {
			Array.prototype.sort.apply(this, arguments);
			this.trigger(p.Events.order);
			return this
		},
		reverse : function() {
			Array.prototype.reverse.apply(this, arguments);
			this.trigger(p.Events.order);
			return this
		}
	});
	var A = p.Utils.distanceBetween,
	    E = p.Utils.distanceBetweenSquared,
	    G = p.Utils.angleBetween,
	    H = p.Utils.getControlPoints,
	    F = p.Utils.mod,
	    J = p.Utils.getBackingStoreRatio,
	    N = p.Utils.getPointOnCubicBezier,
	    O = p.Utils.integrate,
	    M = p.Utils.getReflection;
	f.extend(p.prototype, p.Utils.Events, {
		appendTo : function(a) {
			a.appendChild(this.renderer.domElement);
			return this
		},
		play : function() {
			p.Utils.setPlaying.call(this, !0);
			return this.trigger(p.Events.play)
		},
		pause : function() {
			this.playing = !1;
			return this.trigger(p.Events.pause)
		},
		update : function() {
			var a = !!this._lastFrame,
			    c = x.now();
			this.frameCount++;
			a && (this.timeDelta = parseFloat((c - this._lastFrame).toFixed(3)));
			this._lastFrame = c;
			var a = this.width,
			    c = this.height,
			    e = this.renderer;
			a === e.width && c === e.height || e.setSize(a, c, this.ratio);
			this.trigger(p.Events.update, this.frameCount, this.timeDelta);
			return this.render()
		},
		render : function() {
			this.renderer.render();
			return this.trigger(p.Events.render, this.frameCount)
		},
		add : function(a) {
			var c = a;
			c instanceof Array || ( c = f.toArray(arguments));
			this.scene.add(c);
			return this
		},
		remove : function(a) {
			var c = a;
			c instanceof Array || ( c = f.toArray(arguments));
			this.scene.remove(c);
			return this
		},
		clear : function() {
			this.scene.remove(f.toArray(this.scene.children));
			return this
		},
		makeLine : function(a, c, e, d) {
			a = new p.Line(a, c, e, d);
			this.scene.add(a);
			return a
		},
		makeRectangle : function(a, c, e, d) {
			a = new p.Rectangle(a, c, e, d);
			this.scene.add(a);
			return a
		},
		makeRoundedRectangle : function(a, c, e, d, g) {
			a = new p.RoundedRectangle(a, c, e, d, g);
			this.scene.add(a);
			return a
		},
		makeCircle : function(a, c, e) {
			a = new p.Circle(a, c, e);
			this.scene.add(a);
			return a
		},
		makeEllipse : function(a, c, e, d) {
			a = new p.Ellipse(a, c, e, d);
			this.scene.add(a);
			return a
		},
		makeStar : function(a, c, e, d, g) {
			a = new p.Star(a, c, e, d, g);
			this.scene.add(a);
			return a
		},
		makeCurve : function(a) {
			var c = arguments.length,
			    e =
			    a;
			if (!f.isArray(a))
				for (var e = [],
				    d = 0; d < c; d += 2) {
					var g = arguments[d];
					if (!f.isNumber(g))
						break;
					e.push(new p.Anchor(g, arguments[d + 1]))
				}
			c = arguments[c - 1];
			e = new p.Path(e, !(f.isBoolean(c) && c), !0);
			c = e.getBoundingClientRect();
			e.center().translation.set(c.left + c.width / 2, c.top + c.height / 2);
			this.scene.add(e);
			return e
		},
		makePolygon : function(a, c, e, d) {
			a = new p.Polygon(a, c, e, d);
			this.scene.add(a);
			return a
		},
		makeArcSegment : function(a, c, e, d, g, f, n) {
			a = new p.ArcSegment(a, c, e, d, g, f, n);
			this.scene.add(a);
			return a
		},
		makePath : function(a) {
			var c = arguments.length,
			    e =
			    a;
			if (!f.isArray(a))
				for (var e = [],
				    d = 0; d < c; d += 2) {
					var g = arguments[d];
					if (!f.isNumber(g))
						break;
					e.push(new p.Anchor(g, arguments[d + 1]))
				}
			c = arguments[c - 1];
			e = new p.Path(e, !(f.isBoolean(c) && c));
			c = e.getBoundingClientRect();
			e.center().translation.set(c.left + c.width / 2, c.top + c.height / 2);
			this.scene.add(e);
			return e
		},
		makeText : function(a, c, e, d) {
			a = new p.Text(a, c, e, d);
			this.add(a);
			return a
		},
		makeLinearGradient : function(a, c, e, d) {
			var g = y.call(arguments, 4),
			    g = new p.LinearGradient(a, c, e, d, g);
			this.add(g);
			return g
		},
		makeRadialGradient : function(a, c, e) {
			var d = y.call(arguments, 3),
			    d = new p.RadialGradient(a, c, e, d);
			this.add(d);
			return d
		},
		makeSprite : function(a, c, e, d, g, f, n) {
			a = new p.Sprite(a, c, e, d, g, f);
			n && a.play();
			this.add(a);
			return a
		},
		makeImageSequence : function(a, c, e, d, g) {
			a = new p.ImageSequence(a, c, e, d);
			g && a.play();
			this.add(a);
			return a
		},
		makeTexture : function(a, c) {
			return new p.Texture(a, c)
		},
		makeGroup : function(a) {
			var c = a;
			c instanceof Array || ( c = f.toArray(arguments));
			var e = new p.Group;
			this.scene.add(e);
			e.add(c);
			return e
		},
		interpret : function(a, c) {
			var e = a.tagName.toLowerCase();
			if (!( e in p.Utils.read))
				return null;
			a = p.Utils.read[e].call(this, a);
			c && a instanceof p.Group ? this.add(a.children) : this.add(a);
			return a
		},
		load : function(a, c) {
			var e = [],
			    d;
			if (/.*\.svg/ig.test(a))
				return p.Utils.xhr(a, f.bind(function(a) {
					q.temp.innerHTML = a;
					for ( d = 0; d < q.temp.children.length; d++)
						g = q.temp.children[d], e.push(this.interpret(g));
					c(1 >= e.length ? e[0] : e, 1 >= q.temp.children.length ? q.temp.children[0] : q.temp.children)
				}, this)), this;
			q.temp.innerHTML = a;
			for ( d = 0; d < q.temp.children.length; d++) {
				var g = q.temp.children[d];
				e.push(this.interpret(g))
			}
			c(1 >= e.length ? e[0] : e, 1 >= q.temp.children.length ? q.temp.children[0] : q.temp.children);
			return this
		}
	});
	var L = q.getRequestAnimationFrame();
	"function" === typeof define && define.amd ? define("two", [], function() {
		return p
	}) : "undefined" != typeof module && module.exports && (module.exports = p);
	return p
}(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils;
	c = c.Registry = function() {
		this.map = {}
	};
	l.extend(c, {});
	l.extend(c.prototype, {
		add : function(c, k) {
			this.map[c] = k;
			return this
		},
		remove : function(c) {
			delete this.map[c];
			return this
		},
		get : function(c) {
			return this.map[c]
		},
		contains : function(c) {
			return c in this.map
		}
	})
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.Vector = function(c, a) {
		this.x = c || 0;
		this.y = a || 0
	};
	l.extend(m, {
		zero : new c.Vector
	});
	l.extend(m.prototype, c.Utils.Events, {
		set : function(c, a) {
			this.x = c;
			this.y = a;
			return this
		},
		copy : function(c) {
			this.x = c.x;
			this.y = c.y;
			return this
		},
		clear : function() {
			this.y = this.x = 0;
			return this
		},
		clone : function() {
			return new m(this.x, this.y)
		},
		add : function(c, a) {
			this.x = c.x + a.x;
			this.y = c.y + a.y;
			return this
		},
		addSelf : function(c) {
			this.x += c.x;
			this.y += c.y;
			return this
		},
		sub : function(c, a) {
			this.x = c.x - a.x;
			this.y = c.y - a.y;
			return this
		},
		subSelf : function(c) {
			this.x -= c.x;
			this.y -= c.y;
			return this
		},
		multiplySelf : function(c) {
			this.x *= c.x;
			this.y *= c.y;
			return this
		},
		multiplyScalar : function(c) {
			this.x *= c;
			this.y *= c;
			return this
		},
		divideScalar : function(c) {
			c ? (this.x /= c, this.y /= c) : this.set(0, 0);
			return this
		},
		negate : function() {
			return this.multiplyScalar(-1)
		},
		dot : function(c) {
			return this.x * c.x + this.y * c.y
		},
		lengthSquared : function() {
			return this.x * this.x + this.y * this.y
		},
		length : function() {
			return Math.sqrt(this.lengthSquared())
		},
		normalize : function() {
			return this.divideScalar(this.length())
		},
		distanceTo : function(c) {
			return Math.sqrt(this.distanceToSquared(c))
		},
		distanceToSquared : function(c) {
			var a = this.x - c.x;
			c = this.y - c.y;
			return a * a + c * c
		},
		setLength : function(c) {
			return this.normalize().multiplyScalar(c)
		},
		equals : function(c, a) {
			a = "undefined" === typeof a ? .0001 : a;
			return this.distanceTo(c) < a
		},
		lerp : function(c, a) {
			return this.set((c.x - this.x) * a + this.x, (c.y - this.y) * a + this.y)
		},
		isZero : function(c) {
			c = "undefined" === typeof c ? .0001 : c;
			return this.length() < c
		},
		toString : function() {
			return this.x + ", " + this.y
		},
		toObject : function() {
			return {
				x : this.x,
				y : this.y
			}
		},
		rotate : function(c) {
			var a = Math.cos(c);
			c = Math.sin(c);
			this.x = this.x * a - this.y * c;
			this.y = this.x * c + this.y * a;
			return this
		}
	});
	var k = {
		set : function(d, a) {
			this._x = d;
			this._y = a;
			return this.trigger(c.Events.change)
		},
		copy : function(d) {
			this._x = d.x;
			this._y = d.y;
			return this.trigger(c.Events.change)
		},
		clear : function() {
			this._y = this._x = 0;
			return this.trigger(c.Events.change)
		},
		clone : function() {
			return new m(this._x, this._y)
		},
		add : function(d, a) {
			this._x = d.x + a.x;
			this._y = d.y + a.y;
			return this.trigger(c.Events.change)
		},
		addSelf : function(d) {
			this._x += d.x;
			this._y += d.y;
			return this.trigger(c.Events.change)
		},
		sub : function(d, a) {
			this._x = d.x - a.x;
			this._y = d.y - a.y;
			return this.trigger(c.Events.change)
		},
		subSelf : function(d) {
			this._x -= d.x;
			this._y -= d.y;
			return this.trigger(c.Events.change)
		},
		multiplySelf : function(d) {
			this._x *= d.x;
			this._y *= d.y;
			return this.trigger(c.Events.change)
		},
		multiplyScalar : function(d) {
			this._x *= d;
			this._y *= d;
			return this.trigger(c.Events.change)
		},
		divideScalar : function(d) {
			return d ? (this._x /= d, this._y /= d, this.trigger(c.Events.change)) : this.clear()
		},
		negate : function() {
			return this.multiplyScalar(-1)
		},
		dot : function(c) {
			return this._x * c.x + this._y * c.y
		},
		lengthSquared : function() {
			return this._x * this._x + this._y * this._y
		},
		length : function() {
			return Math.sqrt(this.lengthSquared())
		},
		normalize : function() {
			return this.divideScalar(this.length())
		},
		distanceTo : function(c) {
			return Math.sqrt(this.distanceToSquared(c))
		},
		distanceToSquared : function(c) {
			var a = this._x - c.x;
			c = this._y - c.y;
			return a * a + c * c
		},
		setLength : function(c) {
			return this.normalize().multiplyScalar(c)
		},
		equals : function(c, a) {
			a = "undefined" === typeof a ? .0001 : a;
			return this.distanceTo(c) < a
		},
		lerp : function(c, a) {
			return this.set((c.x - this._x) * a + this._x, (c.y - this._y) * a + this._y)
		},
		isZero : function(c) {
			c = "undefined" === typeof c ? .0001 : c;
			return this.length() < c
		},
		toString : function() {
			return this._x + ", " + this._y
		},
		toObject : function() {
			return {
				x : this._x,
				y : this._y
			}
		},
		rotate : function(c) {
			var a = Math.cos(c);
			c = Math.sin(c);
			this._x = this._x * a - this._y * c;
			this._y = this._x * c + this._y * a;
			return this
		}
	},
	    f = {
		enumerable : !0,
		get : function() {
			return this._x
		},
		set : function(d) {
			this._x = d;
			this.trigger(c.Events.change, "x")
		}
	},
	    h = {
		enumerable : !0,
		get : function() {
			return this._y
		},
		set : function(d) {
			this._y = d;
			this.trigger(c.Events.change, "y")
		}
	};
	c.Vector.prototype.bind = c.Vector.prototype.on = function() {
		this._bound || (this._x = this.x, this._y = this.y, Object.defineProperty(this, "x", f), Object.defineProperty(this, "y", h), l.extend(this, k), this._bound = !0);
		c.Utils.Events.bind.apply(this, arguments);
		return this
	}
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Commands,
	    m = c.Utils,
	    k = c.Anchor = function(f, d, a, g, n, e, v) {
		c.Vector.call(this, f, d);
		this._broadcast = m.bind(function() {
			this.trigger(c.Events.change)
		}, this);
		this._command = v || l.move;
		this._relative = !0;
		if (!v)
			return this;
		k.AppendCurveProperties(this);
		m.isNumber(a) && (this.controls.left.x = a);
		m.isNumber(g) && (this.controls.left.y = g);
		m.isNumber(n) && (this.controls.right.x = n);
		m.isNumber(e) && (this.controls.right.y = e)
	};
	m.extend(k, {
		AppendCurveProperties : function(f) {
			f.controls = {
				left : new c.Vector(0, 0),
				right : new c.Vector(0, 0)
			}
		}
	});
	var f = {
		listen : function() {
			m.isObject(this.controls) || k.AppendCurveProperties(this);
			this.controls.left.bind(c.Events.change, this._broadcast);
			this.controls.right.bind(c.Events.change, this._broadcast);
			return this
		},
		ignore : function() {
			this.controls.left.unbind(c.Events.change, this._broadcast);
			this.controls.right.unbind(c.Events.change, this._broadcast);
			return this
		},
		clone : function() {
			var f = this.controls,
			    f = new c.Anchor(this.x, this.y, f && f.left.x, f && f.left.y, f && f.right.x, f && f.right.y, this.command);
			f.relative = this._relative;
			return f
		},
		toObject : function() {
			var c = {
				x : this.x,
				y : this.y
			};
			this._command && (c.command = this._command);
			this._relative && (c.relative = this._relative);
			this.controls && (c.controls = {
				left : this.controls.left.toObject(),
				right : this.controls.right.toObject()
			});
			return c
		},
		toString : function() {
			return this.controls ? [this._x, this._y, this.controls.left.x, this.controls.left.y, this.controls.right.x, this.controls.right.y].join(", ") : [this._x, this._y].join(", ")
		}
	};
	Object.defineProperty(k.prototype, "command", {
		enumerable : !0,
		get : function() {
			return this._command
		},
		set : function(f) {
			this._command = f;
			this._command !== l.curve || m.isObject(this.controls) || k.AppendCurveProperties(this);
			return this.trigger(c.Events.change)
		}
	});
	Object.defineProperty(k.prototype, "relative", {
		enumerable : !0,
		get : function() {
			return this._relative
		},
		set : function(f) {
			if (this._relative == f)
				return this;
			this._relative = !!f;
			return this.trigger(c.Events.change)
		}
	});
	m.extend(k.prototype, c.Vector.prototype, f);
	c.Anchor.prototype.bind = c.Anchor.prototype.on = function() {
		c.Vector.prototype.bind.apply(this, arguments);
		m.extend(this, f)
	};
	c.Anchor.prototype.unbind = c.Anchor.prototype.off = function() {
		c.Vector.prototype.unbind.apply(this, arguments);
		m.extend(this, f)
	}
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = Math.cos,
	    m = Math.sin,
	    k = Math.tan,
	    f = c.Utils,
	    h = c.Matrix = function(d, a, g, n, e, v) {
		this.elements = new c.Array(9);
		var h = d;
		f.isArray(h) || ( h = f.toArray(arguments));
		this.identity().set(h)
	};
	f.extend(h, {
		Identity : [1, 0, 0, 0, 1, 0, 0, 0, 1],
		Multiply : function(d, a, g) {
			if (3 >= a.length) {
				g = a[0] || 0;
				var f = a[1] || 0;
				a = a[2] || 0;
				return {
					x : d[0] * g + d[1] * f + d[2] * a,
					y : d[3] * g + d[4] * f + d[5] * a,
					z : d[6] * g + d[7] * f + d[8] * a
				}
			}
			var f = d[0],
			    e = d[1],
			    v = d[2],
			    h = d[3],
			    k = d[4],
			    m = d[5],
			    l = d[6],
			    x = d[7];
			d = d[8];
			var t = a[0],
			    r = a[1],
			    q = a[2],
			    p = a[3],
			    B = a[4],
			    A = a[5],
			    E = a[6],
			    G = a[7];
			a = a[8];
			g = g || new c.Array(9);
			g[0] = f * t + e * p + v * E;
			g[1] = f * r + e * B + v * G;
			g[2] = f * q + e * A + v * a;
			g[3] = h * t + k * p + m * E;
			g[4] = h * r + k * B + m * G;
			g[5] = h * q + k * A + m * a;
			g[6] = l * t + x * p + d * E;
			g[7] = l * r + x * B + d * G;
			g[8] = l * q + x * A + d * a;
			return g
		}
	});
	f.extend(h.prototype, c.Utils.Events, {
		set : function(d) {
			var a = d;
			f.isArray(a) || ( a = f.toArray(arguments));
			f.extend(this.elements, a);
			return this.trigger(c.Events.change)
		},
		identity : function() {
			this.set(h.Identity);
			return this
		},
		multiply : function(d, a, g, n, e, v, h, k, m) {
			var u = arguments,
			    l = u.length;
			if (1 >= l)
				return f.each(this.elements, function(a, c) {
					this.elements[c] = a * d
				}, this), this.trigger(c.Events.change);
			if (3 >= l)
				return d = d || 0,
				a = a || 0,
				g = g || 0,
				e = this.elements, {
					x : e[0] * d + e[1] * a + e[2] * g,
					y : e[3] * d + e[4] * a + e[5] * g,
					z : e[6] * d + e[7] * a + e[8] * g
				};
			var z = this.elements,
			    w =
			    u,
			    u = z[0],
			    l = z[1],
			    q = z[2],
			    p = z[3],
			    B = z[4],
			    A = z[5],
			    E = z[6],
			    G = z[7],
			    z = z[8],
			    H = w[0],
			    F = w[1],
			    J = w[2],
			    N = w[3],
			    O = w[4],
			    M = w[5],
			    L = w[6],
			    D = w[7],
			    w = w[8];
			this.elements[0] = u * H + l * N + q * L;
			this.elements[1] = u * F + l * O + q * D;
			this.elements[2] = u * J + l * M + q * w;
			this.elements[3] = p * H + B * N + A * L;
			this.elements[4] = p * F + B * O + A * D;
			this.elements[5] = p * J + B * M + A * w;
			this.elements[6] = E * H + G * N + z * L;
			this.elements[7] = E * F + G * O + z * D;
			this.elements[8] = E * J + G * M + z * w;
			return this.trigger(c.Events.change)
		},
		inverse : function(d) {
			var a = this.elements;
			d = d || new c.Matrix;
			var g = a[0],
			    f = a[1],
			    e = a[2],
			    v = a[3],
			    h = a[4],
			    k = a[5],
			    m = a[6],
			    l = a[7],
			    a = a[8],
			    x = a * h - k * l,
			    t = -a * v + k * m,
			    r = l * v - h * m,
			    q = g * x + f * t + e * r;
			if (!q)
				return null;
			q = 1 / q;
			d.elements[0] = x * q;
			d.elements[1] = (-a * f + e * l) * q;
			d.elements[2] = (k * f - e * h) * q;
			d.elements[3] = t * q;
			d.elements[4] = (a * g - e * m) * q;
			d.elements[5] = (-k * g + e * v) * q;
			d.elements[6] = r * q;
			d.elements[7] = (-l * g + f * m) * q;
			d.elements[8] = (h * g - f * v) * q;
			return d
		},
		scale : function(c, a) {
			1 >= arguments.length && ( a = c);
			return this.multiply(c, 0, 0, 0, a, 0, 0, 0, 1)
		},
		rotate : function(c) {
			var a = l(c);
			c = m(c);
			return this.multiply(a, -c, 0, c, a, 0, 0, 0, 1)
		},
		translate : function(c, a) {
			//lakshmi
			return this.multiply(1, 0, c, 0, 1, a, 0, 0, 1)
		},
		skewX : function(c) {
			c = k(c);
			return this.multiply(1, c, 0, 0, 1, 0, 0, 0, 1)
		},
		skewY : function(c) {
			c = k(c);
			return this.multiply(1, 0, 0, c, 1, 0, 0, 0, 1)
		},
		toString : function(c) {
			var a = [];
			this.toArray(c, a);
			return a.join(" ")
		},
		toArray : function(c, a) {
			var g = this.elements,
			    d = !!a,
			    e = parseFloat(g[0].toFixed(3)),
			    f = parseFloat(g[1].toFixed(3)),
			    h = parseFloat(g[2].toFixed(3)),
			    k = parseFloat(g[3].toFixed(3)),
			    m = parseFloat(g[4].toFixed(3)),
			    l = parseFloat(g[5].toFixed(3));
			if (c) {
				c = parseFloat(g[6].toFixed(3));
				var x = parseFloat(g[7].toFixed(3)),
				    g = parseFloat(g[8].toFixed(3));
				if (d) {
					a[0] = e;
					a[1] = k;
					a[2] = c;
					a[3] = f;
					a[4] = m;
					a[5] = x;
					a[6] = h;
					a[7] = l;
					a[8] = g;
					return
				}
				return [e, k, c, f, m, x, h, l, g]
			}
			if (d)
				a[0] = e, a[1] =
				k, a[2] =
				f, a[3] =
				m, a[4] =
				h, a[5] =
				l;
			else
				return [e, k, f, m, h, l]
		},
		clone : function() {
			var d = this.elements[0];
			var a = this.elements[1];
			var g = this.elements[2];
			var f = this.elements[3];
			var e = this.elements[4];
			return new c.Matrix(d, a, g, f, e, this.elements[5], this.elements[6], this.elements[7], this.elements[8])
		}
	})
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils.mod,
	    m = c.Utils.toFixed,
	    k = c.Utils,
	    f = {
		version : 1.1,
		ns : "http://www.w3.org/2000/svg",
		xlink : "http://www.w3.org/1999/xlink",
		alignments : {
			left : "start",
			center : "middle",
			right : "end"
		},
		createElement : function(c, a) {
			var g = document.createElementNS(this.ns, c);
			"svg" === c && ( a = k.defaults(a || {}, {
				version : this.version
			}));
			k.isEmpty(a) || f.setAttributes(g, a);
			return g
		},
		setAttributes : function(c, a) {
			var g = Object.keys(a)
			for (var d = 0; d < g.length; d++) {
				c.setAttribute(g[d], a[g[d]]);
			}
				
			return this
		},
		removeAttributes : function(c, a) {
			for (var g in a)
			c.removeAttribute(g);
			return this
		},
		toString : function(d, a) {
			for (var g = d.length,
			    f = g - 1,
			    e,
			    h = "",
			    u = 0; u < g; u++) {
				var k = d[u],
				    w = a ? l(u - 1, g) : Math.max(u - 1, 0);
				a && l(u + 1, g);
				var y = d[w];
				var x = m(k._x);
				var t = m(k._y);
				switch(k._command) {
				case c.Commands.close:
					var r = c.Commands.close;
					break;
				case c.Commands.curve:
					var q = y.controls && y.controls.right || c.Vector.zero;
					r = k.controls && k.controls.left || c.Vector.zero;
					y._relative ? ( w = m(q.x + y.x),
					y = m(q.y + y.y)) : ( w = m(q.x),
					y = m(q.y));
					if (k._relative) {
						q = m(r.x + k.x);
						var p = m(r.y + k.y)
					} else
						q = m(r.x),
						p = m(r.y);
					r = (0 === u ? c.Commands.move : c.Commands.curve) + " " + w + " " + y + " " + q + " " + p + " " + x + " " + t;
					break;
				case c.Commands.move:
					e = k;
					r = c.Commands.move + " " + x + " " + t;
					break;
				default:
					r = k._command + " " + x + " " + t
				}
				u >= f && a && (k._command === c.Commands.curve && ( t = e,
				y = k.controls && k.controls.right || k,
				x = t.controls && t.controls.left || t, k._relative ? ( w = m(y.x + k.x),
				y = m(y.y + k.y)) : ( w = m(y.x),
				y = m(y.y)), t._relative ? ( q = m(x.x + t.x),
				p = m(x.y + t.y)) : ( q = m(x.x),
				p = m(x.y)),
				x = m(t.x),
				t = m(t.y), r += " C " + w + " " + y + " " + q + " " + p + " " + x + " " + t), r += " Z");
				h += r + " "
			}
			return h
		},
		getClip : function(c) {
			var a = c._renderer.clip;
			if (!a) {
				for (var g = c; g.parent; )
					g = g.parent;
				a = c._renderer.clip = f.createElement("clipPath");
				g.defs.appendChild(a)
			}
			return a
		},
		group : {
			appendChild : function(c) {
				var a = c._renderer.elem;
				if (a) {
					var g = a.nodeName;
					!g || /(radial|linear)gradient/i.test(g) || c._clip || this.elem.appendChild(a)
				}
			},
			removeChild : function(c) {
				var a = c._renderer.elem;
				a && a.parentNode == this.elem && a.nodeName && (c._clip || this.elem.removeChild(a))
			},
			orderChild : function(c) {
				this.elem.appendChild(c._renderer.elem)
			},
			renderChild : function(c) {
				f[c._renderer.type].render.call(c, this)
			},
			render : function(c) {
				this._update();
				if (0 === this._opacity && !this._flagOpacity)
					return this;
				this._renderer.elem || (this._renderer.elem = f.createElement("g", {
					id : this.id
				}), c.appendChild(this._renderer.elem));
				var a = {
					domElement : c,
					elem : this._renderer.elem
				};
				(this._matrix.manual || this._flagMatrix) && this._renderer.elem.setAttribute("transform", "matrix(" + this._matrix.toString() + ")");
				for (var g = 0; g < this.children.length; g++) {
					var d = this.children[g];
					f[d._renderer.type].render.call(d, c)
				}
				this._flagOpacity && this._renderer.elem.setAttribute("opacity", this._opacity);
				this._flagAdditions && this.additions.forEach(f.group.appendChild, a);
				this._flagSubtractions && this.subtractions.forEach(f.group.removeChild, a);
				this._flagOrder && this.children.forEach(f.group.orderChild, a);
				this._flagMask && (this._mask ? this._renderer.elem.setAttribute("clip-path", "url(#" + this._mask.id + ")") : this._renderer.elem.removeAttribute("clip-path"));
				return this.flagReset()
			}
		},
		path : {
			render : function(c) {
				this._update();
				/*if (0 === this._opacity && !this._flagOpacity)
					return this;*/
					//lakshmi
				var a = {};
				if (this._matrix.manual || this._flagMatrix)
					a.transform = "matrix(" + this._matrix.toString() + ")";
				if (this._flagVertices) {
					var g = f.toString(this._vertices, this._closed);
					a.d = g
				}
				this._fill && this._fill._renderer && (this._fill._update(), f[this._fill._renderer.type].render.call(this._fill, c, !0));
				this._flagFill && (a.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill);
				this._stroke && this._stroke._renderer && (this._stroke._update(), f[this._stroke._renderer.type].render.call(this._stroke, c, !0));
				this._flagStroke && (a.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke);
				this._flagLinewidth && (a["stroke-width"] = this._linewidth);
				this._flagOpacity && (a["stroke-opacity"] = this._opacity, a["fill-opacity"] = this._opacity);
				this._flagVisible && (a.visibility = this._visible ? "visible" : "hidden");
				this._flagCap && (a["stroke-linecap"] = this._cap);
				this._flagJoin && (a["stroke-linejoin"] = this._join);
				this._flagMiter && (a["stroke-miterlimit"] = this._miter);
				this._renderer.elem ? f.setAttributes(this._renderer.elem, a) : (a.id = this.id, this._renderer.elem = f.createElement("path", a), c.appendChild(this._renderer.elem));
				this._flagClip && ( c = f.getClip(this),
				a = this._renderer.elem, this._clip ? (a.removeAttribute("id"), c.setAttribute("id", this.id), c.appendChild(a)) : (c.removeAttribute("id"), a.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(a)));
				return this.flagReset()
			}
		},
		text : {
			render : function(c) {
				this._update();
				var a = {};
				if (this._matrix.manual || this._flagMatrix)
					a.transform = "matrix(" + this._matrix.toString() + ")";
				this._flagFamily && (a["font-family"] = this._family);
				this._flagSize && (a["font-size"] = this._size);
				this._flagLeading && (a["line-height"] = this._leading);
				this._flagAlignment && (a["text-anchor"] = f.alignments[this._alignment] || this._alignment);
				this._flagBaseline && (a["alignment-baseline"] = a["dominant-baseline"] = this._baseline);
				this._flagStyle && (a["font-style"] = this._style);
				this._flagWeight && (a["font-weight"] = this._weight);
				this._flagDecoration && (a["text-decoration"] = this._decoration);
				this._fill && this._fill._renderer && (this._fill._update(), f[this._fill._renderer.type].render.call(this._fill, c, !0));
				this._flagFill && (a.fill = this._fill && this._fill.id ? "url(#" + this._fill.id + ")" : this._fill);
				this._stroke && this._stroke._renderer && (this._stroke._update(), f[this._stroke._renderer.type].render.call(this._stroke, c, !0));
				this._flagStroke && (a.stroke = this._stroke && this._stroke.id ? "url(#" + this._stroke.id + ")" : this._stroke);
				this._flagLinewidth && (a["stroke-width"] = this._linewidth);
				this._flagOpacity && (a.opacity = this._opacity);
				this._flagVisible && (a.visibility = this._visible ? "visible" : "hidden");
				this._renderer.elem ? f.setAttributes(this._renderer.elem, a) : (a.id = this.id, this._renderer.elem = f.createElement("text", a), c.defs.appendChild(this._renderer.elem));
				this._flagClip && ( c = f.getClip(this),
				a = this._renderer.elem, this._clip ? (a.removeAttribute("id"), c.setAttribute("id", this.id), c.appendChild(a)) : (c.removeAttribute("id"), a.setAttribute("id", this.id), this.parent._renderer.elem.appendChild(a)));
				this._flagValue && (this._renderer.elem.textContent = this._value);
				return this.flagReset()
			}
		},
		"linear-gradient" : {
			render : function(c, a) {
				a || this._update();
				a = {};
				this._flagEndPoints && (a.x1 = this.left._x, a.y1 = this.left._y, a.x2 = this.right._x, a.y2 = this.right._y);
				this._flagSpread && (a.spreadMethod = this._spread);
				this._renderer.elem ? f.setAttributes(this._renderer.elem, a) : (a.id = this.id, a.gradientUnits = "userSpaceOnUse", this._renderer.elem = f.createElement("linearGradient", a), c.defs.appendChild(this._renderer.elem));
				if (this._flagStops) {
					if ( c = this._renderer.elem.childNodes.length !== this.stops.length)
						this._renderer.elem.childNodes.length = 0;
					for ( a = 0; a < this.stops.length; a++) {
						var g = this.stops[a],
						    d = {};
						g._flagOffset && (d.offset = 100 * g._offset + "%");
						g._flagColor && (d["stop-color"] = g._color);
						g._flagOpacity && (d["stop-opacity"] = g._opacity);
						g._renderer.elem ? f.setAttributes(g._renderer.elem, d) : g._renderer.elem = f.createElement("stop", d);
						c && this._renderer.elem.appendChild(g._renderer.elem);
						g.flagReset()
					}
				}
				return this.flagReset()
			}
		},
		"radial-gradient" : {
			render : function(c, a) {
				a || this._update();
				a = {};
				this._flagCenter && (a.cx = this.center._x, a.cy = this.center._y);
				this._flagFocal && (a.fx = this.focal._x, a.fy = this.focal._y);
				this._flagRadius && (a.r = this._radius);
				this._flagSpread && (a.spreadMethod = this._spread);
				this._renderer.elem ? f.setAttributes(this._renderer.elem, a) : (a.id = this.id, a.gradientUnits = "userSpaceOnUse", this._renderer.elem = f.createElement("radialGradient", a), c.defs.appendChild(this._renderer.elem));
				if (this._flagStops) {
					if ( c = this._renderer.elem.childNodes.length !== this.stops.length)
						this._renderer.elem.childNodes.length = 0;
					for ( a = 0; a < this.stops.length; a++) {
						var g = this.stops[a],
						    d = {};
						g._flagOffset && (d.offset = 100 * g._offset + "%");
						g._flagColor && (d["stop-color"] = g._color);
						g._flagOpacity && (d["stop-opacity"] = g._opacity);
						g._renderer.elem ? f.setAttributes(g._renderer.elem, d) : g._renderer.elem = f.createElement("stop", d);
						c && this._renderer.elem.appendChild(g._renderer.elem);
						g.flagReset()
					}
				}
				return this.flagReset()
			}
		},
		texture : {
			render : function(d, a) {
				a || this._update();
				a = {};
				var g = {},
				    h = this.image;
				if (this._flagLoaded && this.loaded)
					switch(g.x=
					0,g.y=0,g.width=h.width,g.height=h.height,h.nodeName.toLowerCase()) {
					case "canvas":
						g.href = h.toDataURL("image/png");
						break;
					case "img":
					case "image":
						g.href = this.src
					}
				if (this._flagOffset || this._flagLoaded || this._flagScale)
					a.x = this._offset.x, a.y = this._offset.y, h && (a.x -= h.width / 2, a.y -= h.height / 2, this._scale instanceof c.Vector ? (a.x *= this._scale.x, a.y *= this._scale.y) : (a.x *= this._scale, a.y *= this._scale));
				if (this._flagScale || this._flagLoaded)
					a.width = 0, a.height = 0, h && (this._scale instanceof c.Vector ? (a.width = h.width * this._scale.x, a.height = h.height * this._scale.y) : (a.width = h.width * this._scale, a.height = h.height * this._scale)), g.width = a.width, g.height = a.height;
				if (this._flagScale || this._flagLoaded)
					this._renderer.image ? k.isEmpty(g) || f.setAttributes(this._renderer.image, g) : this._renderer.image = f.createElement("image", g);
				this._renderer.elem ? k.isEmpty(a) || f.setAttributes(this._renderer.elem, a) : (a.id = this.id, a.patternUnits = "userSpaceOnUse", this._renderer.elem = f.createElement("pattern", a), d.defs.appendChild(this._renderer.elem));
				this._renderer.elem && this._renderer.image && !this._renderer.appended && (this._renderer.elem.appendChild(this._renderer.image), this._renderer.appended = !0);
				return this.flagReset()
			}
		}
	},
	    h = c[c.Types.svg] = function(d) {
		this.domElement = d.domElement || f.createElement("svg");
		this.scene = new c.Group;
		this.scene.parent = this;
		this.defs = f.createElement("defs");
		this.domElement.appendChild(this.defs);
		this.domElement.defs = this.defs;
		this.domElement.style.overflow = "hidden"
	};
	k.extend(h, {
		Utils : f
	});
	k.extend(h.prototype, c.Utils.Events, {
		setSize : function(c, a) {
			this.width = c;
			this.height = a;
			f.setAttributes(this.domElement, {
				width : c,
				height : a
			});
			return this
		},
		render : function() {
			f.group.render.call(this.scene, this.domElement);
			//lakshmi
		//console.log(this.domElement);
			return this;
		}
	});
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils.mod,
	    m = c.Utils.toFixed,
	    k = c.Utils.getRatio,
	    f = c.Utils,
	    h = function(a) {
		return 1 == a[0] && 0 == a[3] && 0 == a[1] && 1 == a[4] && 0 == a[2] && 0 == a[5]
	},
	    d = {
		isHidden : /(none|transparent)/i,
		alignments : {
			left : "start",
			middle : "center",
			right : "end"
		},
		shim : function(a) {
			a.tagName = "canvas";
			a.nodeType = 1;
			return a
		},
		group : {
			renderChild : function(a) {
				d[a._renderer.type].render.call(a, this.ctx, !0, this.clip)
			},
			render : function(a) {
				this._update();
				var c = this._matrix.elements,
				    e = this.parent;
				this._renderer.opacity = this._opacity * (e && e._renderer ? e._renderer.opacity : 1);
				var e = h(c),
				    g = this._mask;
				this._renderer.context || (this._renderer.context = {});
				this._renderer.context.ctx = a;
				e || (a.save(), a.transform(c[0], c[3], c[1], c[4], c[2], c[5]));
				g && d[g._renderer.type].render.call(g, a, !0);
				for ( c = 0; c < this.children.length; c++)
					g = this.children[c], d[g._renderer.type].render.call(g, a);
				e || a.restore();
				return this.flagReset()
			}
		},
		path : {
			render : function(a, n, e) {
				this._update();
				var g = this._matrix.elements;
				var u = this._stroke;
				var k = this._linewidth;
				var w = this._fill;
				var y = this._opacity * this.parent._renderer.opacity;
				var x = this._visible;
				var t = this._cap;
				var r = this._join;
				var q = this._miter;
				var p = this._closed;
				var B = this._vertices;
				var A = B.length;
				var E = A - 1;
				var G = h(g);
				var H = this._clip;
				if (!n && (!x || H))
					return this;
				G || (a.save(), a.transform(g[0], g[3], g[1], g[4], g[2], g[5]));
				w && (f.isString(w) ? a.fillStyle = w : (d[w._renderer.type].render.call(w, a), a.fillStyle = w._renderer.effect));
				u && (f.isString(u) ? a.strokeStyle = u : (d[u._renderer.type].render.call(u, a), a.strokeStyle = u._renderer.effect));
				k && (a.lineWidth = k);
				q && (a.miterLimit = q);
				r && (a.lineJoin = r);
				t && (a.lineCap = t);
				f.isNumber(y) && (a.globalAlpha = y);
				a.beginPath();
				for ( g = 0; g < B.length; g++)
					switch(n=B[g],x=m(n._x),t=m(n._y),n._command) {
					case c.Commands.close:
						a.closePath();
						break;
					case c.Commands.curve:
						y = p ? l(g - 1, A) : Math.max(g - 1, 0);
						p && l(g + 1, A);
						r = B[y];
						q = r.controls && r.controls.right || c.Vector.zero;
						var F = n.controls && n.controls.left || c.Vector.zero;
						r._relative ? ( y = q.x + m(r._x),
						q = q.y + m(r._y)) : ( y = m(q.x),
						q = m(q.y));
						n._relative ? ( r = F.x + m(n._x),
						F = F.y + m(n._y)) : ( r = m(F.x),
						F = m(F.y));
						a.bezierCurveTo(y, q, r, F, x, t);
						g >= E && p && ( t = J,
						r = n.controls && n.controls.right || c.Vector.zero,
						x = t.controls && t.controls.left || c.Vector.zero, n._relative ? ( y = r.x + m(n._x),
						q = r.y + m(n._y)) : ( y = m(r.x),
						q = m(r.y)), t._relative ? ( r = x.x + m(t._x),
						F = x.y + m(t._y)) : ( r = m(x.x),
						F = m(x.y)),
						x = m(t._x),
						t = m(t._y), a.bezierCurveTo(y, q, r, F, x, t));
						break;
					case c.Commands.line:
						a.lineTo(x, t);
						break;
					case c.Commands.move:
						var J = n;
						a.moveTo(x, t)
					}
				p && a.closePath();
				if (!H && !e) {
					if (!d.isHidden.test(w)) {
						if ( p = w._renderer && w._renderer.offset)
							a.save(), a.translate(-w._renderer.offset.x, -w._renderer.offset.y), a.scale(w._renderer.scale.x, w._renderer.scale.y);
						a.fill();
						p && a.restore()
					}
					if (!d.isHidden.test(u)) {
						if ( p = u._renderer && u._renderer.offset)
							a.save(), a.translate(-u._renderer.offset.x, -u._renderer.offset.y), a.scale(u._renderer.scale.x, u._renderer.scale.y), a.lineWidth = k / u._renderer.scale.x;
						a.stroke();
						p && a.restore()
					}
				}
				G || a.restore();
				H && !e && a.clip();
				return this.flagReset()
			}
		},
		text : {
			render : function(a, c, e) {
				this._update();
				var g = this._matrix.elements,
				    n = this._stroke,
				    k = this._linewidth,
				    l = this._fill,
				    y = this._opacity * this.parent._renderer.opacity,
				    x = this._visible,
				    t = h(g),
				    r = l._renderer && l._renderer.offset && n._renderer && n._renderer.offset,
				    q = this._clip;
				if (!c && (!x || q))
					return this;
				t || (a.save(), a.transform(g[0], g[3], g[1], g[4], g[2], g[5]));
				r || (a.font = [this._style, this._weight, this._size + "px/" + this._leading + "px", this._family].join(" "));
				a.textAlign = d.alignments[this._alignment] || this._alignment;
				a.textBaseline = this._baseline;
				l && (f.isString(l) ? a.fillStyle = l : (d[l._renderer.type].render.call(l, a), a.fillStyle = l._renderer.effect));
				n && (f.isString(n) ? a.strokeStyle = n : (d[n._renderer.type].render.call(n, a), a.strokeStyle = n._renderer.effect));
				k && (a.lineWidth = k);
				f.isNumber(y) && (a.globalAlpha = y);
				q || e || (d.isHidden.test(l) || (l._renderer && l._renderer.offset ? ( c = m(l._renderer.scale.x),
				g = m(l._renderer.scale.y), a.save(), a.translate(-m(l._renderer.offset.x), -m(l._renderer.offset.y)), a.scale(c, g),
				c = this._size / l._renderer.scale.y,
				g = this._leading / l._renderer.scale.y, a.font = [this._style, this._weight, m(c) + "px/", m(g) + "px", this._family].join(" "),
				c = l._renderer.offset.x / l._renderer.scale.x,
				l = l._renderer.offset.y / l._renderer.scale.y, a.fillText(this.value, m(c), m(l)), a.restore()) : a.fillText(this.value, 0, 0)), d.isHidden.test(n) || (n._renderer && n._renderer.offset ? ( c = m(n._renderer.scale.x),
				g = m(n._renderer.scale.y), a.save(), a.translate(-m(n._renderer.offset.x), -m(n._renderer.offset.y)), a.scale(c, g),
				c = this._size / n._renderer.scale.y,
				g = this._leading / n._renderer.scale.y, a.font = [this._style, this._weight, m(c) + "px/", m(g) + "px", this._family].join(" "),
				c = n._renderer.offset.x / n._renderer.scale.x,
				l = n._renderer.offset.y / n._renderer.scale.y,
				n = k / n._renderer.scale.x, a.lineWidth = m(n), a.strokeText(this.value, m(c), m(l)), a.restore()) : a.strokeText(this.value, 0, 0)));
				t || a.restore();
				q && !e && a.clip();
				return this.flagReset()
			}
		},
		"linear-gradient" : {
			render : function(a) {
				this._update();
				if (!this._renderer.effect || this._flagEndPoints || this._flagStops)
					for (this._renderer.effect = a.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y),
					a = 0; a < this.stops.length; a++) {
						var c = this.stops[a];
						this._renderer.effect.addColorStop(c._offset, c._color)
					}
				return this.flagReset()
			}
		},
		"radial-gradient" : {
			render : function(a) {
				this._update();
				if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops)
					for (this._renderer.effect = a.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius),
					a = 0; a < this.stops.length; a++) {
						var c = this.stops[a];
						this._renderer.effect.addColorStop(c._offset, c._color)
					}
				return this.flagReset()
			}
		},
		texture : {
			render : function(a) {
				this._update();
				var g = this.image;
				if (!this._renderer.effect || (this._flagLoaded || this._flagImage) && this.loaded)
					this._renderer.effect = a.createPattern(this.image, "repeat");
				if (this._flagOffset || this._flagLoaded || this._flagScale)
					this._renderer.offset instanceof c.Vector || (this._renderer.offset = new c.Vector), this._renderer.offset.x = this._offset.x, this._renderer.offset.y = this._offset.y, g && (this._renderer.offset.x -= g.width / 2, this._renderer.offset.y -= g.height / 2, this._scale instanceof c.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale));
				if (this._flagScale || this._flagLoaded)
					this._renderer.scale instanceof c.Vector || (this._renderer.scale = new c.Vector), this._scale instanceof c.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale);
				return this.flagReset()
			}
		}
	},
	    a = c[c.Types.canvas] = function(a) {
		var g = !1 !== a.smoothing;
		this.domElement = a.domElement || document.createElement("canvas");
		this.ctx = this.domElement.getContext("2d");
		this.overdraw = a.overdraw || !1;
		f.isUndefined(this.ctx.imageSmoothingEnabled) || (this.ctx.imageSmoothingEnabled = g);
		this.scene = new c.Group;
		this.scene.parent = this
	};
	f.extend(a, {
		Utils : d
	});
	f.extend(a.prototype, c.Utils.Events, {
		setSize : function(a, c, e) {
			this.width = a;
			this.height = c;
			this.ratio = f.isUndefined(e) ? k(this.ctx) : e;
			this.domElement.width = a * this.ratio;
			this.domElement.height = c * this.ratio;
			this.domElement.style && f.extend(this.domElement.style, {
				width : a + "px",
				height : c + "px"
			});
			return this
		},
		render : function() {
			var a = 1 === this.ratio;
			a || (this.ctx.save(), this.ctx.scale(this.ratio, this.ratio));
			this.overdraw || this.ctx.clearRect(0, 0, this.width, this.height);
			d.group.render.call(this.scene, this.ctx);
			a || this.ctx.restore();
			return this
		}
	})
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Matrix.Multiply,
	    m = c.Utils.mod,
	    k = [1, 0, 0, 0, 1, 0, 0, 0, 1],
	    f = new c.Array(9),
	    h = c.Utils.getRatio,
	    d = c.Utils.toFixed,
	    a = c.Utils,
	    g = {
		isHidden : /(none|transparent)/i,
		canvas : this.document ? this.document.createElement("canvas") : {
			getContext : a.identity
		},
		alignments : {
			left : "start",
			middle : "center",
			right : "end"
		},
		matrix : new c.Matrix,
		uv : new c.Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
		group : {
			removeChild : function(a, c) {
				if (a.children)
					for (var e = 0; e < a.children.length; e++)
						g.group.removeChild(a.children[e], c);
				else
					c.deleteTexture(a._renderer.texture),
					delete a._renderer.texture
			},
			renderChild : function(a) {
				g[a._renderer.type].render.call(a, this.gl, this.program)
			},
			render : function(a, d) {
				this._update();
				var e = this.parent,
				    h = e._matrix && e._matrix.manual || e._flagMatrix,
				    n = this._matrix.manual || this._flagMatrix;
				if (h || n)
					this._renderer.matrix || (this._renderer.matrix = new c.Array(9)), this._matrix.toArray(!0, f), l(f, e._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * e._renderer.scale, h && (this._flagMatrix = !0);
				this._mask && (a.enable(a.STENCIL_TEST), a.stencilFunc(a.ALWAYS, 1, 1), a.colorMask(!1, !1, !1, !0), a.stencilOp(a.KEEP, a.KEEP, a.INCR), g[this._mask._renderer.type].render.call(this._mask, a, d, this), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, 1), a.stencilOp(a.KEEP, a.KEEP, a.KEEP));
				this._flagOpacity = e._flagOpacity || this._flagOpacity;
				this._renderer.opacity = this._opacity * (e && e._renderer ? e._renderer.opacity : 1);
				if (this._flagSubtractions)
					for ( e = 0; e < this.subtractions.length; e++)
						g.group.removeChild(this.subtractions[e], a);
				this.children.forEach(g.group.renderChild, {
					gl : a,
					program : d
				});
				this._mask && (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), g[this._mask._renderer.type].render.call(this._mask, a, d, this), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, 1), a.stencilOp(a.KEEP, a.KEEP, a.KEEP), a.disable(a.STENCIL_TEST));
				return this.flagReset()
			}
		},
		path : {
			updateCanvas : function(e) {
				var f = e._vertices;
				var h = this.canvas;
				var n = this.ctx;
				var k = e._renderer.scale;
				var l = e._stroke,
				    x = e._linewidth,
				    t = e._fill;
				var r = e._renderer.opacity || e._opacity;
				var q = e._cap;
				var p = e._join;
				var B = e._miter;
				var A = e._closed,
				    E = f.length,
				    G = E - 1;
				h.width = Math.max(Math.ceil(e._renderer.rect.width * k), 1);
				h.height = Math.max(Math.ceil(e._renderer.rect.height * k), 1);
				var H = e._renderer.rect.centroid,
				    F = H.x,
				    H = H.y;
				n.clearRect(0, 0, h.width, h.height);
				t && (a.isString(t) ? n.fillStyle = t : (g[t._renderer.type].render.call(t, n, e), n.fillStyle = t._renderer.effect));
				l && (a.isString(l) ? n.strokeStyle = l : (g[l._renderer.type].render.call(l, n, e), n.strokeStyle = l._renderer.effect));
				x && (n.lineWidth = x);
				B && (n.miterLimit = B);
				p && (n.lineJoin = p);
				q && (n.lineCap = q);
				a.isNumber(r) && (n.globalAlpha = r);
				n.save();
				n.scale(k, k);
				n.translate(F, H);
				n.beginPath();
				for ( e = 0; e < f.length; e++)
					switch(b=f[e],k=d(b._x),r=d(b._y),b._command) {
					case c.Commands.close:
						n.closePath();
						break;
					case c.Commands.curve:
						h = A ? m(e - 1, E) : Math.max(e - 1, 0);
						A && m(e + 1, E);
						q = f[h];
						p = q.controls && q.controls.right || c.Vector.zero;
						B = b.controls && b.controls.left || c.Vector.zero;
						q._relative ? ( h = d(p.x + q._x),
						p = d(p.y + q._y)) : ( h = d(p.x),
						p = d(p.y));
						b._relative ? ( q = d(B.x + b._x),
						B = d(B.y + b._y)) : ( q = d(B.x),
						B = d(B.y));
						n.bezierCurveTo(h, p, q, B, k, r);
						e >= G && A && ( r = J,
						q = b.controls && b.controls.right || c.Vector.zero,
						k = r.controls && r.controls.left || c.Vector.zero, b._relative ? ( h = d(q.x + b._x),
						p = d(q.y + b._y)) : ( h = d(q.x),
						p = d(q.y)), r._relative ? ( q = d(k.x + r._x),
						B = d(k.y + r._y)) : ( q = d(k.x),
						B = d(k.y)),
						k = d(r._x),
						r = d(r._y), n.bezierCurveTo(h, p, q, B, k, r));
						break;
					case c.Commands.line:
						n.lineTo(k, r);
						break;
					case c.Commands.move:
						var J = b;
						n.moveTo(k, r)
					}
				A && n.closePath();
				if (!g.isHidden.test(t)) {
					if ( f = t._renderer && t._renderer.offset)
						n.save(), n.translate(-t._renderer.offset.x, -t._renderer.offset.y), n.scale(t._renderer.scale.x, t._renderer.scale.y);
					n.fill();
					f && n.restore()
				}
				if (!g.isHidden.test(l)) {
					if ( f = l._renderer && l._renderer.offset)
						n.save(), n.translate(-l._renderer.offset.x, -l._renderer.offset.y), n.scale(l._renderer.scale.x, l._renderer.scale.y), n.lineWidth = x / l._renderer.scale.x;
					n.stroke();
					f && n.restore()
				}
				n.restore()
			},
			getBoundingClientRect : function(c, g, d) {
				var e = Infinity,
				    f = -Infinity,
				    h =
				    Infinity,
				    n = -Infinity;
				c.forEach(function(a) {
					var c = a.x,
					    d = a.y,
					    g = a.controls;
					h = Math.min(d, h);
					e = Math.min(c, e);
					f = Math.max(c, f);
					n = Math.max(d, n);
					if (a.controls) {
						var k = g.left;
						var v = g.right;
						k && v && ( g = a._relative ? k.x + c : k.x,
						k = a._relative ? k.y + d : k.y,
						c = a._relative ? v.x + c : v.x,
						a = a._relative ? v.y + d : v.y, g && k && c && a && ( h = Math.min(k, a, h),
						e = Math.min(g, c, e),
						f = Math.max(g, c, f),
						n = Math.max(k, a, n)))
					}
				});
				a.isNumber(g) && (h -= g, e -= g, f += g, n += g);
				d.top = h;
				d.left = e;
				d.right = f;
				d.bottom = n;
				d.width = f - e;
				d.height = n - h;
				d.centroid || (d.centroid = {});
				d.centroid.x = -e;
				d.centroid.y = -h
			},
			render : function(a, d, h) {
				if (!this._visible || !this._opacity)
					return this;
				this._update();
				var e = this.parent,
				    n = this._matrix.manual || this._flagMatrix,
				    k = this._flagVertices || this._flagFill || this._fill instanceof c.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof c.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof c.Texture && (this._fill._flagLoaded && this._fill.loaded || this._fill._flagOffset || this._fill._flagScale) || this._stroke instanceof c.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof c.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._stroke instanceof c.Texture && (this._stroke._flagLoaded && this._stroke.loaded || this._stroke._flagOffset || this._fill._flagScale) || this._flagStroke || this._flagLinewidth || this._flagOpacity || e._flagOpacity || this._flagVisible || this._flagCap || this._flagJoin || this._flagMiter || this._flagScale || !this._renderer.texture;
				if (e._matrix.manual || e._flagMatrix || n)
					this._renderer.matrix || (this._renderer.matrix = new c.Array(9)), this._matrix.toArray(!0, f), l(f, e._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * e._renderer.scale;
				k && (this._renderer.rect || (this._renderer.rect = {}), this._renderer.triangles || (this._renderer.triangles = new c.Array(12)), this._renderer.opacity = this._opacity * e._renderer.opacity, g.path.getBoundingClientRect(this._vertices, this._linewidth, this._renderer.rect), g.getTriangles(this._renderer.rect, this._renderer.triangles), g.updateBuffer.call(g, a, this, d), g.updateTexture.call(g, a, this));
				if (!this._clip || h)
					return a.bindBuffer(a.ARRAY_BUFFER, this._renderer.textureCoordsBuffer), a.vertexAttribPointer(d.textureCoords, 2, a.FLOAT, !1, 0, 0), a.bindTexture(a.TEXTURE_2D, this._renderer.texture), a.uniformMatrix3fv(d.matrix, !1, this._renderer.matrix), a.bindBuffer(a.ARRAY_BUFFER, this._renderer.buffer), a.vertexAttribPointer(d.position, 2, a.FLOAT, !1, 0, 0), a.drawArrays(a.TRIANGLES, 0, 6), this.flagReset()
			}
		},
		text : {
			updateCanvas : function(c) {
				var e = this.canvas,
				    f = this.ctx,
				    h = c._renderer.scale,
				    n = c._stroke,
				    k = c._linewidth * h,
				    l = c._fill,
				    m = c._renderer.opacity || c._opacity;
				e.width = Math.max(Math.ceil(c._renderer.rect.width * h), 1);
				e.height = Math.max(Math.ceil(c._renderer.rect.height * h), 1);
				var r = c._renderer.rect.centroid,
				    q = r.x,
				    r = r.y,
				    p = l._renderer && l._renderer.offset && n._renderer && n._renderer.offset;
				f.clearRect(0, 0, e.width, e.height);
				p || (f.font = [c._style, c._weight, c._size + "px/" + c._leading + "px", c._family].join(" "));
				f.textAlign = "center";
				f.textBaseline = "middle";
				l && (a.isString(l) ? f.fillStyle = l : (g[l._renderer.type].render.call(l, f, c), f.fillStyle = l._renderer.effect));
				n && (a.isString(n) ? f.strokeStyle = n : (g[n._renderer.type].render.call(n, f, c), f.strokeStyle = n._renderer.effect));
				k && (f.lineWidth = k);
				a.isNumber(m) && (f.globalAlpha = m);
				f.save();
				f.scale(h, h);
				f.translate(q, r);
				g.isHidden.test(l) || (l._renderer && l._renderer.offset ? ( e = d(l._renderer.scale.x),
				h = d(l._renderer.scale.y), f.save(), f.translate(-d(l._renderer.offset.x), -d(l._renderer.offset.y)), f.scale(e, h),
				e = c._size / l._renderer.scale.y,
				h = c._leading / l._renderer.scale.y, f.font = [c._style, c._weight, d(e) + "px/", d(h) + "px", c._family].join(" "),
				e = l._renderer.offset.x / l._renderer.scale.x,
				l = l._renderer.offset.y / l._renderer.scale.y, f.fillText(c.value, d(e), d(l)), f.restore()) : f.fillText(c.value, 0, 0));
				g.isHidden.test(n) || (n._renderer && n._renderer.offset ? ( e = d(n._renderer.scale.x),
				h = d(n._renderer.scale.y), f.save(), f.translate(-d(n._renderer.offset.x), -d(n._renderer.offset.y)), f.scale(e, h),
				e = c._size / n._renderer.scale.y,
				h = c._leading / n._renderer.scale.y, f.font = [c._style, c._weight, d(e) + "px/", d(h) + "px", c._family].join(" "),
				e = n._renderer.offset.x / n._renderer.scale.x,
				l = n._renderer.offset.y / n._renderer.scale.y,
				n = k / n._renderer.scale.x, f.lineWidth = d(n), f.strokeText(c.value, d(e), d(l)), f.restore()) : f.strokeText(c.value, 0, 0));
				f.restore()
			},
			getBoundingClientRect : function(a, c) {
				var e = g.ctx;
				e.font = [a._style, a._weight, a._size + "px/" + a._leading + "px", a._family].join(" ");
				e.textAlign = "center";
				e.textBaseline = a._baseline;
				var e = e.measureText(a._value).width,
				    d = Math.max(a._size || a._leading);
				this._linewidth && !g.isHidden.test(this._stroke) && (d += this._linewidth);
				var f = e / 2,
				    h = d / 2;
				switch(g.alignments[a._alignment]||a._alignment) {
				case g.alignments.left:
					c.left = 0;
					c.right = e;
					break;
				case g.alignments.right:
					c.left = -e;
					c.right = 0;
					break;
				default:
					c.left = -f, c.right =
					f
				}
				switch(a._baseline) {
				case "bottom":
					c.top = -d;
					c.bottom = 0;
					break;
				case "top":
					c.top = 0;
					c.bottom = d;
					break;
				default:
					c.top = -h, c.bottom =
					h
				}
				c.width = e;
				c.height = d;
				c.centroid || (c.centroid = {});
				c.centroid.x = f;
				c.centroid.y = h
			},
			render : function(a, d, h) {
				if (!this._visible || !this._opacity)
					return this;
				this._update();
				var e = this.parent,
				    n = this._matrix.manual || this._flagMatrix,
				    k = this._flagVertices || this._flagFill || this._fill instanceof c.LinearGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagEndPoints) || this._fill instanceof c.RadialGradient && (this._fill._flagSpread || this._fill._flagStops || this._fill._flagRadius || this._fill._flagCenter || this._fill._flagFocal) || this._fill instanceof c.Texture && this._fill._flagLoaded && this._fill.loaded || this._stroke instanceof c.LinearGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagEndPoints) || this._stroke instanceof c.RadialGradient && (this._stroke._flagSpread || this._stroke._flagStops || this._stroke._flagRadius || this._stroke._flagCenter || this._stroke._flagFocal) || this._texture instanceof c.Texture && this._texture._flagLoaded && this._texture.loaded || this._flagStroke || this._flagLinewidth || this._flagOpacity || e._flagOpacity || this._flagVisible || this._flagScale || this._flagValue || this._flagFamily || this._flagSize || this._flagLeading || this._flagAlignment || this._flagBaseline || this._flagStyle || this._flagWeight || this._flagDecoration || !this._renderer.texture;
				if (e._matrix.manual || e._flagMatrix || n)
					this._renderer.matrix || (this._renderer.matrix = new c.Array(9)), this._matrix.toArray(!0, f), l(f, e._renderer.matrix, this._renderer.matrix), this._renderer.scale = this._scale * e._renderer.scale;
				k && (this._renderer.rect || (this._renderer.rect = {}), this._renderer.triangles || (this._renderer.triangles = new c.Array(12)), this._renderer.opacity = this._opacity * e._renderer.opacity, g.text.getBoundingClientRect(this, this._renderer.rect), g.getTriangles(this._renderer.rect, this._renderer.triangles), g.updateBuffer.call(g, a, this, d), g.updateTexture.call(g, a, this));
				if (!this._clip || h)
					return a.bindBuffer(a.ARRAY_BUFFER, this._renderer.textureCoordsBuffer), a.vertexAttribPointer(d.textureCoords, 2, a.FLOAT, !1, 0, 0), a.bindTexture(a.TEXTURE_2D, this._renderer.texture), a.uniformMatrix3fv(d.matrix, !1, this._renderer.matrix), a.bindBuffer(a.ARRAY_BUFFER, this._renderer.buffer), a.vertexAttribPointer(d.position, 2, a.FLOAT, !1, 0, 0), a.drawArrays(a.TRIANGLES, 0, 6), this.flagReset()
			}
		},
		"linear-gradient" : {
			render : function(a, c) {
				if (a.canvas.getContext("2d")) {
					this._update();
					if (!this._renderer.effect || this._flagEndPoints || this._flagStops)
						for (this._renderer.effect = a.createLinearGradient(this.left._x, this.left._y, this.right._x, this.right._y),
						a = 0; a < this.stops.length; a++)
							c = this.stops[a], this._renderer.effect.addColorStop(c._offset, c._color);
					return this.flagReset()
				}
			}
		},
		"radial-gradient" : {
			render : function(a, c) {
				if (a.canvas.getContext("2d")) {
					this._update();
					if (!this._renderer.effect || this._flagCenter || this._flagFocal || this._flagRadius || this._flagStops)
						for (this._renderer.effect = a.createRadialGradient(this.center._x, this.center._y, 0, this.focal._x, this.focal._y, this._radius),
						a = 0; a < this.stops.length; a++)
							c = this.stops[a], this._renderer.effect.addColorStop(c._offset, c._color);
					return this.flagReset()
				}
			}
		},
		texture : {
			render : function(a, d) {
				if (a.canvas.getContext("2d")) {
					this._update();
					d = this.image;
					if (!this._renderer.effect || this._flagLoaded && this.loaded)
						this._renderer.effect = a.createPattern(this.image, "repeat");
					if (this._flagOffset || this._flagLoaded || this._flagScale)
						this._renderer.offset instanceof c.Vector || (this._renderer.offset = new c.Vector), this._renderer.offset.x = this._offset.x, this._renderer.offset.y = this._offset.y, d && (this._renderer.offset.x -= d.width / 2, this._renderer.offset.y -= d.height / 2, this._scale instanceof c.Vector ? (this._renderer.offset.x *= this._scale.x, this._renderer.offset.y *= this._scale.y) : (this._renderer.offset.x *= this._scale, this._renderer.offset.y *= this._scale));
					if (this._flagScale || this._flagLoaded)
						this._renderer.scale instanceof c.Vector || (this._renderer.scale = new c.Vector), this._scale instanceof c.Vector ? this._renderer.scale.copy(this._scale) : this._renderer.scale.set(this._scale, this._scale);
					return this.flagReset()
				}
			}
		},
		getTriangles : function(a, c) {
			var e = a.top,
			    d = a.left,
			    g = a.right;
			a = a.bottom;
			c[0] = d;
			c[1] = e;
			c[2] = g;
			c[3] = e;
			c[4] = d;
			c[5] = a;
			c[6] = d;
			c[7] = a;
			c[8] = g;
			c[9] = e;
			c[10] = g;
			c[11] = a
		},
		updateTexture : function(a, c) {
			this[c._renderer.type].updateCanvas.call(g, c);
			c._renderer.texture && a.deleteTexture(c._renderer.texture);
			a.bindBuffer(a.ARRAY_BUFFER, c._renderer.textureCoordsBuffer);
			c._renderer.texture = a.createTexture();
			a.bindTexture(a.TEXTURE_2D, c._renderer.texture);
			a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
			a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
			a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
			0 >= this.canvas.width || 0 >= this.canvas.height || a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, this.canvas)
		},
		updateBuffer : function(c, d, g) {
			a.isObject(d._renderer.buffer) && c.deleteBuffer(d._renderer.buffer);
			d._renderer.buffer = c.createBuffer();
			c.bindBuffer(c.ARRAY_BUFFER, d._renderer.buffer);
			c.enableVertexAttribArray(g.position);
			c.bufferData(c.ARRAY_BUFFER, d._renderer.triangles, c.STATIC_DRAW);
			a.isObject(d._renderer.textureCoordsBuffer) && c.deleteBuffer(d._renderer.textureCoordsBuffer);
			d._renderer.textureCoordsBuffer = c.createBuffer();
			c.bindBuffer(c.ARRAY_BUFFER, d._renderer.textureCoordsBuffer);
			c.enableVertexAttribArray(g.textureCoords);
			c.bufferData(c.ARRAY_BUFFER, this.uv, c.STATIC_DRAW)
		},
		program : {
			create : function(e, d) {
				var g = e.createProgram();
				a.each(d, function(a) {
					e.attachShader(g, a)
				});
				e.linkProgram(g);
				if (!e.getProgramParameter(g, e.LINK_STATUS))
					throw d = e.getProgramInfoLog(g), e.deleteProgram(g), new c.Utils.Error("unable to link program: " + d);
				return g
			}
		},
		shaders : {
			create : function(a, d, g) {
				g = a.createShader(a[g]);
				a.shaderSource(g, d);
				a.compileShader(g);
				if (!a.getShaderParameter(g, a.COMPILE_STATUS))
					throw d = a.getShaderInfoLog(g), a.deleteShader(g), new c.Utils.Error("unable to compile shader " + g + ": " + d);
				return g
			},
			types : {
				vertex : "VERTEX_SHADER",
				fragment : "FRAGMENT_SHADER"
			},
			vertex : "attribute vec2 a_position;\nattribute vec2 a_textureCoords;\n\nuniform mat3 u_matrix;\nuniform vec2 u_resolution;\n\nvarying vec2 v_textureCoords;\n\nvoid main() {\n   vec2 projected \x3d (u_matrix * vec3(a_position, 1.0)).xy;\n   vec2 normal \x3d projected / u_resolution;\n   vec2 clipspace \x3d (normal * 2.0) - 1.0;\n\n   gl_Position \x3d vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);\n   v_textureCoords \x3d a_textureCoords;\n}",
			fragment : "precision mediump float;\n\nuniform sampler2D u_image;\nvarying vec2 v_textureCoords;\n\nvoid main() {\n  gl_FragColor \x3d texture2D(u_image, v_textureCoords);\n}"
		},
		TextureRegistry : new c.Registry
	};
	g.ctx = g.canvas.getContext("2d");
	var n = c[c.Types.webgl] = function(e) {
		this.domElement = e.domElement || document.createElement("canvas");
		this.scene = new c.Group;
		this.scene.parent = this;
		this._renderer = {
			matrix : new c.Array(k),
			scale : 1,
			opacity : 1
		};
		this._flagMatrix = !0;
		e = a.defaults(e || {}, {
			antialias : !1,
			alpha : !0,
			premultipliedAlpha : !0,
			stencil : !0,
			preserveDrawingBuffer : !0,
			overdraw : !1
		});
		this.overdraw = e.overdraw;
		e = this.ctx = this.domElement.getContext("webgl", e) || this.domElement.getContext("experimental-webgl", e);
		if (!this.ctx)
			throw new c.Utils.Error("unable to create a webgl context. Try using another renderer.");
		var d = g.shaders.create(e, g.shaders.vertex, g.shaders.types.vertex);
		var f = g.shaders.create(e, g.shaders.fragment, g.shaders.types.fragment);
		this.program = g.program.create(e, [d, f]);
		e.useProgram(this.program);
		this.program.position = e.getAttribLocation(this.program, "a_position");
		this.program.matrix = e.getUniformLocation(this.program, "u_matrix");
		this.program.textureCoords = e.getAttribLocation(this.program, "a_textureCoords");
		e.disable(e.DEPTH_TEST);
		e.enable(e.BLEND);
		e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD);
		e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)
	};
	a.extend(n, {
		Utils : g
	});
	a.extend(n.prototype, c.Utils.Events, {
		setSize : function(c, d, g) {
			this.width = c;
			this.height = d;
			this.ratio = a.isUndefined(g) ? h(this.ctx) : g;
			this.domElement.width = c * this.ratio;
			this.domElement.height = d * this.ratio;
			a.extend(this.domElement.style, {
				width : c + "px",
				height : d + "px"
			});
			c *= this.ratio;
			d *= this.ratio;
			this._renderer.matrix[0] = this._renderer.matrix[4] = this._renderer.scale = this.ratio;
			this._flagMatrix = !0;
			this.ctx.viewport(0, 0, c, d);
			g = this.ctx.getUniformLocation(this.program, "u_resolution");
			this.ctx.uniform2f(g, c, d);
			return this
		},
		render : function() {
			var a = this.ctx;
			this.overdraw || a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
			g.group.render.call(this.scene, a, this.program);
			this._flagMatrix = !1;
			return this
		}
	})
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.Shape = function() {
		this._renderer = {};
		this._renderer.flagMatrix = l.bind(m.FlagMatrix, this);
		this.isShape = !0;
		this.id = c.Identifier + c.uniqueId();
		this.classList = [];
		this._matrix = new c.Matrix;
		this.translation = new c.Vector;
		this.rotation = 0;
		this.scale = 1
	};
	l.extend(m, {
		FlagMatrix : function() {
			this._flagMatrix = !0
		},
		MakeObservable : function(k) {
			Object.defineProperty(k, "translation", {
				enumerable : !0,
				get : function() {
					return this._translation
				},
				set : function(f) {
					this._translation && this._translation.unbind(c.Events.change, this._renderer.flagMatrix);
					this._translation = f;
					this._translation.bind(c.Events.change, this._renderer.flagMatrix);
					m.FlagMatrix.call(this)
				}
			});
			Object.defineProperty(k, "rotation", {
				enumerable : !0,
				get : function() {
					return this._rotation
				},
				set : function(c) {
					this._rotation = c;
					this._flagMatrix = !0
				}
			});
			Object.defineProperty(k, "scale", {
				enumerable : !0,
				get : function() {
					return this._scale
				},
				set : function(f) {
					this._scale instanceof c.Vector && this._scale.unbind(c.Events.change, this._renderer.flagMatrix);
					this._scale = f;
					this._scale instanceof c.Vector && this._scale.bind(c.Events.change, this._renderer.flagMatrix);
					this._flagScale = this._flagMatrix = !0
				}
			})
		}
	});
	l.extend(m.prototype, c.Utils.Events, {
		_flagMatrix : !0,
		_flagScale : !1,
		_rotation : 0,
		_scale : 1,
		_translation : null,
		addTo : function(c) {
			c.add(this);
			return this
		},
		clone : function() {
			var c = new m;
			c.translation.copy(this.translation);
			c.rotation = this.rotation;
			c.scale = this.scale;
			l.each(m.Properties, function(f) {
				c[f] = this[f]
			}, this);
			return c._update()
		},
		_update : function(k) {
			//lakshmi
			if(!this._matrix.manual && this._flagMatrix) {
				this._matrix
				    .identity()
				    .translate(this.translation.x, this.translation.y), 
				    this._scale instanceof c.Vector ? this._matrix.scale(this._scale.x, this._scale.y) : this._matrix.scale(this._scale), 
				    this._matrix.rotate(this.rotation);				    
				    //console.log(this.id);
				    //console.log(this._matrix);
			}			
			k && this.parent && this.parent._update && this.parent._update();			
			return this;
		},
		flagReset : function() {
			this._flagMatrix = this._flagScale = !1;
			return this;
		}
	});
	m.MakeObservable(m.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	function l(a, e, d) {
		var g = e.controls && e.controls.right,
		    f = a.controls && a.controls.left;
		var h = e.x;
		var n = e.y;
		var k = (g || e).x;
		var l = (g || e).y;
		var m = (f || a).x;
		var v = (f || a).y;
		var p = a.x;
		var B = a.y;
		g && e._relative && (k += e.x, l += e.y);
		f && a._relative && (m += a.x, v += a.y);
		return c.Utils.getCurveLength(h, n, k, l, m, v, p, B, d)
	}

	function m(a, e, d) {
		var g = e.controls && e.controls.right,
		    f = a.controls && a.controls.left;
		var h = e.x;
		var n = e.y;
		var k = (g || e).x;
		var l = (g || e).y;
		var m = (f || a).x;
		var v = (f || a).y;
		var p = a.x;
		var B = a.y;
		g && e._relative && (k += e.x, l += e.y);
		f && a._relative && (m += a.x, v += a.y);
		return c.Utils.subdivide(h, n, k, l, m, v, p, B, d)
	}

	var k = Math.min,
	    f = Math.max,
	    h = Math.round,
	    d = c.Utils.getComputedMatrix,
	    a = c.Utils;
	a.each(c.Commands, function(a, c) {
	});
	var g = c.Path = function(d, e, f, h) {
		c.Shape.call(this);
		this._renderer.type = "path";
		this._renderer.flagVertices = a.bind(g.FlagVertices, this);
		this._renderer.bindVertices = a.bind(g.BindVertices, this);
		this._renderer.unbindVertices = a.bind(g.UnbindVertices, this);
		this._renderer.flagFill = a.bind(g.FlagFill, this);
		this._renderer.flagStroke = a.bind(g.FlagStroke, this);
		this._closed = !!e;
		this._curved = !!f;
		this.beginning = 0;
		this.ending = 1;
		this.fill = "#fff";
		this.stroke = "#000";
		this.opacity = this.linewidth = 1;
		this.visible = !0;
		this.cap = "butt";
		this.join = "miter";
		this.miter = 4;
		this._vertices = [];
		this.vertices = d;
		this.automatic = !h
	};
	a.extend(g, {
		Properties : "fill stroke linewidth opacity visible cap join miter closed curved automatic beginning ending".split(" "),
		FlagVertices : function() {
			this._flagLength = this._flagVertices = !0
		},
		BindVertices : function(a) {
			for (var e = a.length; e--; )
				a[e].bind(c.Events.change, this._renderer.flagVertices);
			this._renderer.flagVertices()
		},
		UnbindVertices : function(a) {
			for (var e = a.length; e--; )
				a[e].unbind(c.Events.change, this._renderer.flagVertices);
			this._renderer.flagVertices()
		},
		FlagFill : function() {
			this._flagFill = !0
		},
		FlagStroke : function() {
			this._flagStroke = !0
		},
		MakeObservable : function(d) {
			c.Shape.MakeObservable(d);
			a.each(g.Properties.slice(2, 8), c.Utils.defineProperty, d);
			Object.defineProperty(d, "fill", {
				enumerable : !0,
				get : function() {
					return this._fill
				},
				set : function(a) {
					(this._fill instanceof c.Gradient || this._fill instanceof c.LinearGradient || this._fill instanceof c.RadialGradient || this._fill instanceof c.Texture) && this._fill.unbind(c.Events.change, this._renderer.flagFill);
					this._fill = a;
					this._flagFill = !0;
					(this._fill instanceof c.Gradient || this._fill instanceof c.LinearGradient || this._fill instanceof c.RadialGradient || this._fill instanceof c.Texture) && this._fill.bind(c.Events.change, this._renderer.flagFill)
				}
			});
			Object.defineProperty(d, "stroke", {
				enumerable : !0,
				get : function() {
					return this._stroke
				},
				set : function(a) {
					(this._stroke instanceof c.Gradient || this._stroke instanceof c.LinearGradient || this._stroke instanceof c.RadialGradient || this._stroke instanceof c.Texture) && this._stroke.unbind(c.Events.change, this._renderer.flagStroke);
					this._stroke = a;
					this._flagStroke = !0;
					(this._stroke instanceof c.Gradient || this._stroke instanceof c.LinearGradient || this._stroke instanceof c.RadialGradient || this._stroke instanceof c.Texture) && this._stroke.bind(c.Events.change, this._renderer.flagStroke)
				}
			});
			Object.defineProperty(d, "length", {
				get : function() {
					this._flagLength && this._updateLength();
					return this._length
				}
			});
			Object.defineProperty(d, "closed", {
				enumerable : !0,
				get : function() {
					return this._closed
				},
				set : function(a) {
					this._closed = !!a;
					this._flagVertices = !0
				}
			});
			Object.defineProperty(d, "curved", {
				enumerable : !0,
				get : function() {
					return this._curved
				},
				set : function(a) {
					this._curved = !!a;
					this._flagVertices = !0
				}
			});
			Object.defineProperty(d, "automatic", {
				enumerable : !0,
				get : function() {
					return this._automatic
				},
				set : function(c) {
					if (c !== this._automatic) {
						var e = (this._automatic = !!c) ? "ignore" : "listen";
						a.each(this.vertices, function(a) {
							a[e]()
						})
					}
				}
			});
			Object.defineProperty(d, "beginning", {
				enumerable : !0,
				get : function() {
					return this._beginning
				},
				set : function(a) {
					this._beginning = a;
					this._flagVertices = !0
				}
			});
			Object.defineProperty(d, "ending", {
				enumerable : !0,
				get : function() {
					return this._ending
				},
				set : function(a) {
					this._ending = a;
					this._flagVertices = !0
				}
			});
			Object.defineProperty(d, "vertices", {
				//lakshmi
				enumerable : !0,
				get : function() {
					return this._collection
				},
				set : function(a) {
					var d = this._renderer.bindVertices,
					    e = this._renderer.unbindVertices;
					this._collection && this._collection.unbind(c.Events.insert, d).unbind(c.Events.remove, e);
					this._collection = new c.Utils.Collection((a || []).slice(0));
					this._collection.bind(c.Events.insert, d).bind(c.Events.remove, e);
					d(this._collection)
				}
			});
			Object.defineProperty(d, "clip", {
				enumerable : !0,
				get : function() {
					return this._clip
				},
				set : function(a) {
					this._clip = a;
					this._flagClip = !0
				}
			})
		}
	});
	a.extend(g.prototype, c.Shape.prototype, {
		_flagVertices : !0,
		_flagLength : !0,
		_flagFill : !0,
		_flagStroke : !0,
		_flagLinewidth : !0,
		_flagOpacity : !0,
		_flagVisible : !0,
		_flagCap : !0,
		_flagJoin : !0,
		_flagMiter : !0,
		_flagClip : !1,
		_length : 0,
		_fill : "#fff",
		_stroke : "#000",
		_linewidth : 1,
		_opacity : 1,
		_visible : !0,
		_cap : "round",
		_join : "round",
		_miter : 4,
		_closed : !0,
		_curved : !1,
		_automatic : !0,
		_beginning : 0,
		_ending : 1,
		_clip : !1,
		clone : function(d) {
			d = d || this.parent;
			var e = a.map(this.vertices, function(a) {
				return a.clone()
			}),
			    f = new g(e, this.closed, this.curved, !this.automatic);
			a.each(c.Path.Properties, function(a) {
				f[a] = this[a]
			}, this);
			f.translation.copy(this.translation);
			f.rotation = this.rotation;
			f.scale = this.scale;
			d && d.add(f);
			return f
		},
		toObject : function() {
			var d = {
				vertices : a.map(this.vertices, function(a) {
					return a.toObject()
				})
			};
			a.each(c.Shape.Properties, function(a) {
				d[a] = this[a]
			}, this);
			d.translation = this.translation.toObject;
			d.rotation = this.rotation;
			d.scale = this.scale;
			return d
		},
		noFill : function() {
			this.fill = "transparent";
			return this
		},
		noStroke : function() {
			this.stroke = "transparent";
			return this
		},
		corner : function() {
			var c = this.getBoundingClientRect(!0);
			c.centroid = {
				x : c.left + c.width / 2,
				y : c.top + c.height / 2
			};
			a.each(this.vertices, function(a) {
				a.addSelf(c.centroid)
			});
			return this
		},
		center : function() {
			var c = this.getBoundingClientRect(!0);
			c.centroid = {
				x : c.left + c.width / 2,
				y : c.top + c.height / 2
			};
			a.each(this.vertices, function(a) {
				a.subSelf(c.centroid)
			});
			return this
		},
		remove : function() {
			if (!this.parent)
				return this;
			this.parent.remove(this);
			return this
		},
		getBoundingClientRect : function(a) {
			var c,
			    g =
			    Infinity,
			    h = -Infinity,
			    n =
			    Infinity,
			    l = -Infinity;
			this._update(!0);
			a = a ? this._matrix : d(this);
			var m = this.linewidth / 2;
			var x = this._vertices.length;
			if (0 >= x) {
				var t = a.multiply(0, 0, 1);
				return {
					top : t.y,
					left : t.x,
					right : t.x,
					bottom : t.y,
					width : 0,
					height : 0
				}
			}
			for ( c = 0; c < x; c++) {
				t = this._vertices[c];
				var r = t.x;
				t = t.y;
				t = a.multiply(r, t, 1);
				n = k(t.y - m, n);
				g = k(t.x - m, g);
				h = f(t.x + m, h);
				l = f(t.y + m, l)
			}
			return {
				top : n,
				left : g,
				right : h,
				bottom : l,
				width : h - g,
				height : l - n
			}
		},
		getPointAt : function(d, e) {
			var g,
			    f;
			var h = this.length * Math.min(Math.max(d, 0), 1);
			var k = this.vertices.length;
			var n = k - 1;
			var l = g = null;
			var m = 0;
			var r = this._lengths.length;
			for ( f = 0; m < r; m++) {
				if (f + this._lengths[m] > h) {
					g = this.vertices[this.closed ? c.Utils.mod(m, k) : m];
					l = this.vertices[Math.min(Math.max(m - 1, 0), n)];
					h -= f;
					d = h / this._lengths[m];
					break
				}
				f += this._lengths[m]
			}
			if (a.isNull(g) || a.isNull(l))
				return null;
			var q = l.controls && l.controls.right;
			var p = g.controls && g.controls.left;
			r = l.x;
			h = l.y;
			f = (q || l).x;
			k = (q || l).y;
			var B = (p || g).x;
			n = (p || g).y;
			var A = g.x;
			m = g.y;
			q && l._relative && (f += l.x, k += l.y);
			p && g._relative && (B += g.x, n += g.y);
			g = c.Utils.getPointOnCubicBezier(d, r, f, B, A);
			d = c.Utils.getPointOnCubicBezier(d, h, k, n, m);
			return a.isObject(e) ? (e.x = g, e.y =
			d, e) : new c.Vector(g, d)
		},
		plot : function() {
			if (this.curved)
				return c.Utils.getCurveFromPoints(this._vertices, this.closed), this;
			for (var a = 0; a < this._vertices.length; a++)
				this._vertices[a]._command = 0 === a ? c.Commands.move : c.Commands.line;
			return this
		},
		subdivide : function(d) {
			this._update();
			var g = this.vertices.length - 1,
			    f = this.vertices[g],
			    h = this._closed || this.vertices[g]._command === c.Commands.close,
			    k = [];
			a.each(this.vertices, function(e, l) {
				if (!(0 >= l) || h)
					if (e.command === c.Commands.move)
						k.push(new c.Anchor(f.x, f.y)), 0 < l && (k[k.length - 1].command = c.Commands.line);
					else {
						var n = m(e, f, d);
						k = k.concat(n);
						a.each(n, function(a, d) {
							a.command = 0 >= d && f.command === c.Commands.move ? c.Commands.move : c.Commands.line
						});
						l >= g && (this._closed && this._automatic ? ( f = e,
						n = m(e, f, d),
						k = k.concat(n), a.each(n, function(a, d) {
							a.command = 0 >= d && f.command === c.Commands.move ? c.Commands.move : c.Commands.line
						})) : h && k.push(new c.Anchor(e.x, e.y)), k[k.length - 1].command = h ? c.Commands.close : c.Commands.line)
					}
				f = e
			}, this);
			this._curved = this._automatic = !1;
			this.vertices = k;
			return this
		},
		_updateLength : function(d) {
			this._update();
			var g = this.vertices.length - 1,
			    f = this.vertices[g],
			    h = this._closed || this.vertices[g]._command === c.Commands.close,
			    k = 0;
			a.isUndefined(this._lengths) && (this._lengths = []);
			a.each(this.vertices, function(a, e) {
				0 >= e && !h || a.command === c.Commands.move ? ( f = a, this._lengths[e] = 0) : (this._lengths[e] = l(a, f, d), k += this._lengths[e], e >= g && h && ( f = a, this._lengths[e + 1] = l(a, f, d), k += this._lengths[e + 1]),
				f =
				a)
			}, this);
			this._length = k;
			return this
		},
		_update : function() {
			//lakshmi
			if (this._flagVertices) {
				var a = this.vertices.length - 1;
				var d = h(this._beginning * a);
				a = h(this._ending * a);
				this._vertices.length = 0;
				for (var g = d; g < a + 1; g++)
					d = this.vertices[g], this._vertices.push(d);
				this._automatic && this.plot()
			}
			c.Shape.prototype._update.apply(this, arguments);
			return this
		},
		flagReset : function() {
			this._flagVertices = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpacity = this._flagVisible = this._flagCap = this._flagJoin = this._flagMiter = this._flagClip = !1;
			c.Shape.prototype.flagReset.call(this);
			return this
		}
	});
	g.MakeObservable(g.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = c.Utils,
	    k = c.Line = function(f, h, d, a) {
		d = (d - f) / 2;
		a = (a - h) / 2;
		l.call(this, [new c.Anchor(-d, -a), new c.Anchor(d, a)]);
		this.translation.set(f + d, h + a)
	};
	m.extend(k.prototype, l.prototype);
	l.MakeObservable(k.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = c.Utils,
	    k = c.Rectangle = function(f, h, d, a) {
		l.call(this, [new c.Anchor, new c.Anchor, new c.Anchor, new c.Anchor], !0);
		this.width = d;
		this.height = a;
		this._update();
		this.translation.set(f, h)
	};
	m.extend(k, {
		Properties : ["width", "height"],
		MakeObservable : function(f) {
			l.MakeObservable(f);
			m.each(k.Properties, c.Utils.defineProperty, f)
		}
	});
	m.extend(k.prototype, l.prototype, {
		//lakshmi
		_width : 0,
		_height : 0,
		_flagWidth : 0,
		_flagHeight : 0,
		_update : function() {
			if (this._flagWidth || this._flagHeight) {
				var c = this._width / 2,
				    h = this._height / 2;
				this.vertices[0].set(-c, -h);
				this.vertices[1].set(c, -h);
				this.vertices[2].set(c, h);
				this.vertices[3].set(-c, h)
			}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			//lakshmi
			this._flagWidth = this._flagHeight = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	k.MakeObservable(k.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = 2 * Math.PI,
	    k = Math.cos,
	    f = Math.sin,
	    h = c.Utils,
	    d = c.Ellipse = function(a, d, f, e) {
		h.isNumber(e) || ( e = f);
		var g = h.map(h.range(c.Resolution), function(a) {
			return new c.Anchor
		}, this);
		l.call(this, g, !0, !0);
		this.width = 2 * f;
		this.height = 2 * e;
		this._update();
		this.translation.set(a, d)
	};
	h.extend(d, {
		Properties : ["width", "height"],
		MakeObservable : function(a) {
			l.MakeObservable(a);
			h.each(d.Properties, c.Utils.defineProperty, a)
		}
	});
	h.extend(d.prototype, l.prototype, {
		_width : 0,
		_height : 0,
		_flagWidth : !1,
		_flagHeight : !1,
		_update : function() {
			if (this._flagWidth || this._flagHeight)
				for (var a = 0,
				    c = this.vertices.length; a < c; a++) {
					var d = a / c * m,
					    e = this._width * k(d) / 2,
					    d = this._height * f(d) / 2;
					this.vertices[a].set(e, d)
				}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagWidth = this._flagHeight = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = 2 * Math.PI,
	    k = Math.cos,
	    f = Math.sin,
	    h = c.Utils,
	    d = c.Circle = function(a, d, f) {
		var g = h.map(h.range(c.Resolution), function(a) {
			return new c.Anchor
		}, this);
		l.call(this, g, !0, !0);
		this.radius = f;
		this._update();
		this.translation.set(a, d)
	};
	h.extend(d, {
		Properties : ["radius"],
		MakeObservable : function(a) {
			l.MakeObservable(a);
			h.each(d.Properties, c.Utils.defineProperty, a)
		}
	});
	h.extend(d.prototype, l.prototype, {
		_radius : 0,
		_flagRadius : !1,
		_update : function() {
			if (this._flagRadius)
				for (var a = 0,
				    c = this.vertices.length; a < c; a++) {
					var d = a / c * m,
					    e = this._radius * k(d),
					    d = this._radius * f(d);
					this.vertices[a].set(e, d)
				}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagRadius = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = 2 * Math.PI,
	    k = Math.cos,
	    f = Math.sin,
	    h = c.Utils,
	    d = c.Polygon = function(a, d, f, e) {
		e = Math.max(e || 0, 3);
		var g = h.map(h.range(e), function(a) {
			return new c.Anchor
		});
		l.call(this, g, !0);
		this.width = 2 * f;
		this.height = 2 * f;
		this.sides = e;
		this._update();
		this.translation.set(a, d)
	};
	h.extend(d, {
		Properties : ["width", "height", "sides"],
		MakeObservable : function(a) {
			l.MakeObservable(a);
			h.each(d.Properties, c.Utils.defineProperty, a)
		}
	});
	h.extend(d.prototype, l.prototype, {
		_width : 0,
		_height : 0,
		_sides : 0,
		_flagWidth : !1,
		_flagHeight : !1,
		_flagSides : !1,
		_update : function() {
			if (this._flagWidth || this._flagHeight || this._flagSides) {
				var a = this._sides,
				    d = this.vertices.length;
				d > a && this.vertices.splice(a - 1, d - a);
				for (var h = 0; h < a; h++) {
					var e = (h + .5) / a * m + Math.PI / 2,
					    v = this._width * k(e),
					    e = this._height * f(e);
					h >= d ? this.vertices.push(new c.Anchor(v, e)) : this.vertices[h].set(v, e)
				}
			}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagWidth = this._flagHeight = this._flagSides = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	function l(a, c) {
		for (; 0 > a; )
			a += c;
		return a % c
	}

	var m = c.Path,
	    k = 2 * Math.PI,
	    f = Math.PI / 2,
	    h = c.Utils,
	    d = c.ArcSegment = function(a, d, f, e, k, l, z) {
		z = h.map(h.range(z || 3 * c.Resolution), function() {
			return new c.Anchor
		});
		m.call(this, z, !1, !1, !0);
		this.innerRadius = f;
		this.outerRadius = e;
		this.startAngle = k;
		this.endAngle = l;
		this._update();
		this.translation.set(a, d)
	};
	h.extend(d, {
		Properties : ["startAngle", "endAngle", "innerRadius", "outerRadius"],
		MakeObservable : function(a) {
			m.MakeObservable(a);
			h.each(d.Properties, c.Utils.defineProperty, a)
		}
	});
	h.extend(d.prototype, m.prototype, {
		_flagStartAngle : !1,
		_flagEndAngle : !1,
		_flagInnerRadius : !1,
		_flagOuterRadius : !1,
		_startAngle : 0,
		_endAngle : k,
		_innerRadius : 0,
		_outerRadius : 0,
		_update : function() {
			if (this._flagStartAngle || this._flagEndAngle || this._flagInnerRadius || this._flagOuterRadius) {
				var a = this._startAngle;
				var d = this._endAngle;
				var h = this._innerRadius;
				var e = this._outerRadius;
				var v = l(a, k) === l(d, k);
				var u = 0 < h;
				var z = this.vertices;
				var w = u ? z.length / 2 : z.length;
				var y = 0;
				v ? w-- : u || (w -= 2);
				for (var x = 0,
				    t = w - 1; x < w; x++) {
					var r = x / t;
					var q = z[y];
					r = r * (d - a) + a;
					var p = (d - a) / w;
					var B = e * Math.cos(r);
					var A = e * Math.sin(r);
					switch(x) {
					case 0:
						var E = c.Commands.move;
						break;
					default:
						E = c.Commands.curve
					}
					q.command = E;
					q.x = B;
					q.y = A;
					q.controls.left.clear();
					q.controls.right.clear();
					q.command === c.Commands.curve && ( A = e * p / Math.PI, q.controls.left.x = A * Math.cos(r - f), q.controls.left.y = A * Math.sin(r - f), q.controls.right.x = A * Math.cos(r + f), q.controls.right.y = A * Math.sin(r + f), 1 === x && q.controls.left.multiplyScalar(2), x === t && q.controls.right.multiplyScalar(2));
					y++
				}
				if (u)
					for ( v ? (z[y].command = c.Commands.close, y++) : (w--,
					t = w - 1),
					x = 0; x < w; x++)
						r = x / t,
						q = z[y],
						r = (1 - r) * (d - a) + a,
						p = (d - a) / w,
						B = h * Math.cos(r),
						A = h * Math.sin(r),
						E = c.Commands.curve, 0 >= x && ( E = v ? c.Commands.move : c.Commands.line), q.command =
						E, q.x =
						B, q.y =
						A, q.controls.left.clear(), q.controls.right.clear(), q.command === c.Commands.curve && ( A = h * p / Math.PI, q.controls.left.x = A * Math.cos(r + f), q.controls.left.y = A * Math.sin(r + f), q.controls.right.x = A * Math.cos(r - f), q.controls.right.y = A * Math.sin(r - f), 1 === x && q.controls.left.multiplyScalar(2), x === t && q.controls.right.multiplyScalar(2)), y++;
				else
					v || (z[y].command = c.Commands.line, z[y].x = 0, z[y].y = 0, y++);
				z[y].command = c.Commands.close
			}
			m.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			m.prototype.flagReset.call(this);
			this._flagStartAngle = this._flagEndAngle = this._flagInnerRadius = this._flagOuterRadius = !1;
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = 2 * Math.PI,
	    k = Math.cos,
	    f = Math.sin,
	    h = c.Utils,
	    d = c.Star = function(a, d, f, e, k) {
		h.isNumber(e) || ( e = f / 2);
		if (!h.isNumber(k) || 0 >= k)
			k = 5;
		var g = h.map(h.range(2 * k), function(a) {
			return new c.Anchor
		});
		l.call(this, g, !0);
		this.innerRadius = e;
		this.outerRadius = f;
		this.sides = k;
		this._update();
		this.translation.set(a, d)
	};
	h.extend(d, {
		Properties : ["innerRadius", "outerRadius", "sides"],
		MakeObservable : function(a) {
			l.MakeObservable(a);
			h.each(d.Properties, c.Utils.defineProperty, a)
		}
	});
	h.extend(d.prototype, l.prototype, {
		_innerRadius : 0,
		_outerRadius : 0,
		_sides : 0,
		_flagInnerRadius : !1,
		_flagOuterRadius : !1,
		_flagSides : !1,
		_update : function() {
			if (this._flagInnerRadius || this._flagOuterRadius || this._flagSides) {
				var a = 2 * this._sides,
				    d = this.vertices.length;
				d > a && this.vertices.splice(a - 1, d - a);
				for (var h = 0; h < a; h++) {
					var e = (h + .5) / a * m,
					    v = h % 2 ? this._innerRadius : this._outerRadius,
					    u = v * k(e),
					    e = v * f(e);
					h >= d ? this.vertices.push(new c.Anchor(u, e)) : this.vertices[h].set(u, e)
				}
			}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagInnerRadius = this._flagOuterRadius = this._flagSides = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Path,
	    m = c.Utils,
	    k = c.RoundedRectangle = function(f, h, d, a, g) {
		m.isNumber(g) || ( g = Math.floor(Math.min(d, a) / 12));
		var k = m.map(m.range(10), function(a) {
			return new c.Anchor(0, 0, 0, 0, 0, 0, 0 === a ? c.Commands.move : c.Commands.curve)
		});
		k[k.length - 1].command = c.Commands.close;
		l.call(this, k, !1, !1, !0);
		this.width = d;
		this.height = a;
		this.radius = g;
		this._update();
		this.translation.set(f, h)
	};
	m.extend(k, {
		Properties : ["width", "height", "radius"],
		MakeObservable : function(f) {
			l.MakeObservable(f);
			m.each(k.Properties, c.Utils.defineProperty, f)
		}
	});
	m.extend(k.prototype, l.prototype, {
		_width : 0,
		_height : 0,
		_radius : 0,
		_flagWidth : !1,
		_flagHeight : !1,
		_flagRadius : !1,
		_update : function() {
			if (this._flagWidth || this._flagHeight || this._flagRadius) {
				var c = this._width,
				    h = this._height,
				    d = Math.min(Math.max(this._radius, 0), Math.min(c, h)),
				    c = c / 2,
				    a = h / 2,
				    h = this.vertices[0];
				h.x = -(c - d);
				h.y = -a;
				h = this.vertices[1];
				h.x = c - d;
				h.y = -a;
				h.controls.left.clear();
				h.controls.right.x = d;
				h.controls.right.y = 0;
				h = this.vertices[2];
				h.x = c;
				h.y = -(a - d);
				h.controls.right.clear();
				h.controls.left.clear();
				h = this.vertices[3];
				h.x = c;
				h.y = a - d;
				h.controls.left.clear();
				h.controls.right.x = 0;
				h.controls.right.y = d;
				h = this.vertices[4];
				h.x = c - d;
				h.y = a;
				h.controls.right.clear();
				h.controls.left.clear();
				h = this.vertices[5];
				h.x = -(c - d);
				h.y = a;
				h.controls.left.clear();
				h.controls.right.x = -d;
				h.controls.right.y = 0;
				h = this.vertices[6];
				h.x = -c;
				h.y = a - d;
				h.controls.left.clear();
				h.controls.right.clear();
				h = this.vertices[7];
				h.x = -c;
				h.y = -(a - d);
				h.controls.left.clear();
				h.controls.right.x = 0;
				h.controls.right.y = -d;
				h = this.vertices[8];
				h.x = -(c - d);
				h.y = -a;
				h.controls.left.clear();
				h.controls.right.clear();
				h = this.vertices[9];
				h.copy(this.vertices[8])
			}
			l.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagWidth = this._flagHeight = this._flagRadius = !1;
			l.prototype.flagReset.call(this);
			return this
		}
	});
	k.MakeObservable(k.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils.getComputedMatrix,
	    m = c.Utils;
	(this.document ? this.document.createElement("canvas") : {
		getContext : m.identity
	}).getContext("2d");
	var k = c.Text = function(f, h, d, a) {
		c.Shape.call(this);
		this._renderer.type = "text";
		this._renderer.flagFill = m.bind(k.FlagFill, this);
		this._renderer.flagStroke = m.bind(k.FlagStroke, this);
		this.value = f;
		m.isNumber(h) && (this.translation.x = h);
		m.isNumber(d) && (this.translation.y = d);
		if (!m.isObject(a))
			return this;
		m.each(c.Text.Properties, function(c) {
			c in a && (this[c] = a[c])
		}, this)
	};
	m.extend(c.Text, {
		Properties : "value family size leading alignment linewidth style weight decoration baseline opacity visible fill stroke".split(" "),
		FlagFill : function() {
			this._flagFill = !0
		},
		FlagStroke : function() {
			this._flagStroke = !0
		},
		MakeObservable : function(f) {
			c.Shape.MakeObservable(f);
			m.each(c.Text.Properties.slice(0, 12), c.Utils.defineProperty, f);
			Object.defineProperty(f, "fill", {
				enumerable : !0,
				get : function() {
					return this._fill
				},
				set : function(f) {
					(this._fill instanceof c.Gradient || this._fill instanceof c.LinearGradient || this._fill instanceof c.RadialGradient || this._fill instanceof c.Texture) && this._fill.unbind(c.Events.change, this._renderer.flagFill);
					this._fill = f;
					this._flagFill = !0;
					(this._fill instanceof c.Gradient || this._fill instanceof c.LinearGradient || this._fill instanceof c.RadialGradient || this._fill instanceof c.Texture) && this._fill.bind(c.Events.change, this._renderer.flagFill)
				}
			});
			Object.defineProperty(f, "stroke", {
				enumerable : !0,
				get : function() {
					return this._stroke
				},
				set : function(f) {
					(this._stroke instanceof c.Gradient || this._stroke instanceof c.LinearGradient || this._stroke instanceof c.RadialGradient || this._stroke instanceof c.Texture) && this._stroke.unbind(c.Events.change, this._renderer.flagStroke);
					this._stroke = f;
					this._flagStroke = !0;
					(this._stroke instanceof c.Gradient || this._stroke instanceof c.LinearGradient || this._stroke instanceof c.RadialGradient || this._stroke instanceof c.Texture) && this._stroke.bind(c.Events.change, this._renderer.flagStroke)
				}
			});
			Object.defineProperty(f, "clip", {
				enumerable : !0,
				get : function() {
					return this._clip
				},
				set : function(c) {
					this._clip = c;
					this._flagClip = !0
				}
			})
		}
	});
	m.extend(c.Text.prototype, c.Shape.prototype, {
		_flagValue : !0,
		_flagFamily : !0,
		_flagSize : !0,
		_flagLeading : !0,
		_flagAlignment : !0,
		_flagBaseline : !0,
		_flagStyle : !0,
		_flagWeight : !0,
		_flagDecoration : !0,
		_flagFill : !0,
		_flagStroke : !0,
		_flagLinewidth : !0,
		_flagOpacity : !0,
		_flagVisible : !0,
		_flagClip : !1,
		_value : "",
		_family : "sans-serif",
		_size : 13,
		_leading : 17,
		_alignment : "center",
		_baseline : "middle",
		_style : "normal",
		_weight : 500,
		_decoration : "none",
		_fill : "#000",
		_stroke : "transparent",
		_linewidth : 1,
		_opacity : 1,
		_visible : !0,
		_clip : !1,
		remove : function() {
			if (!this.parent)
				return this;
			this.parent.remove(this);
			return this
		},
		clone : function(f) {
			f = f || this.parent;
			var h = new c.Text(this.value);
			h.translation.copy(this.translation);
			h.rotation = this.rotation;
			h.scale = this.scale;
			m.each(c.Text.Properties, function(c) {
				h[c] = this[c]
			}, this);
			f && f.add(h);
			return h
		},
		toObject : function() {
			var f = {
				translation : this.translation.toObject(),
				rotation : this.rotation,
				scale : this.scale
			};
			m.each(c.Text.Properties, function(c) {
				f[c] = this[c]
			}, this);
			return f
		},
		noStroke : function() {
			this.stroke = "transparent";
			return this
		},
		noFill : function() {
			this.fill = "transparent";
			return this
		},
		getBoundingClientRect : function(c) {
			this._update(!0);
			c = ( c ? this._matrix : l(this)).multiply(0, 0, 1);
			return {
				top : c.x,
				left : c.y,
				right : c.x,
				bottom : c.y,
				width : 0,
				height : 0
			}
		},
		flagReset : function() {
			this._flagValue = this._flagFamily = this._flagSize = this._flagLeading = this._flagAlignment = this._flagFill = this._flagStroke = this._flagLinewidth = this._flagOpaicty = this._flagVisible = this._flagClip = this._flagDecoration = this._flagBaseline = !1;
			c.Shape.prototype.flagReset.call(this);
			return this
		}
	});
	c.Text.MakeObservable(c.Text.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.Stop = function(c, h, d) {
		this._renderer = {};
		this._renderer.type = "stop";
		this.offset = l.isNumber(c) ? c : 0 >= m.Index ? 0 : 1;
		this.opacity = l.isNumber(d) ? d : 1;
		this.color = l.isString(h) ? h : 0 >= m.Index ? "#fff" : "#000";
		m.Index = (m.Index + 1) % 2
	};
	l.extend(m, {
		Index : 0,
		Properties : ["offset", "opacity", "color"],
		MakeObservable : function(c) {
			l.each(m.Properties, function(c) {
				var d = "_" + c,
				    a = "_flag" + c.charAt(0).toUpperCase() + c.slice(1);
				Object.defineProperty(this, c, {
					enumerable : !0,
					get : function() {
						return this[d]
					},
					set : function(c) {
						this[d] = c;
						this[a] = !0;
						this.parent && (this.parent._flagStops = !0)
					}
				})
			}, c)
		}
	});
	l.extend(m.prototype, c.Utils.Events, {
		clone : function() {
			var c = new m;
			l.each(m.Properties, function(f) {
				c[f] = this[f]
			}, this);
			return c
		},
		toObject : function() {
			var c = {};
			l.each(m.Properties, function(f) {
				c[f] = this[f]
			}, this);
			return c
		},
		flagReset : function() {
			this._flagOffset = this._flagColor = this._flagOpacity = !1;
			return this
		}
	});
	m.MakeObservable(m.prototype);
	var k = c.Gradient = function(f) {
		this._renderer = {};
		this._renderer.type = "gradient";
		this.id = c.Identifier + c.uniqueId();
		this.classList = [];
		this._renderer.flagStops = l.bind(k.FlagStops, this);
		this._renderer.bindStops = l.bind(k.BindStops, this);
		this._renderer.unbindStops = l.bind(k.UnbindStops, this);
		this.spread = "pad";
		this.stops = f
	};
	l.extend(k, {
		Stop : m,
		Properties : ["spread"],
		MakeObservable : function(f) {
			l.each(k.Properties, c.Utils.defineProperty, f);
			Object.defineProperty(f, "stops", {
				enumerable : !0,
				get : function() {
					return this._stops
				},
				set : function(f) {
					var d = this._renderer.bindStops,
					    a = this._renderer.unbindStops;
					this._stops && this._stops.unbind(c.Events.insert, d).unbind(c.Events.remove, a);
					this._stops = new c.Utils.Collection((f || []).slice(0));
					this._stops.bind(c.Events.insert, d).bind(c.Events.remove, a);
					d(this._stops)
				}
			})
		},
		FlagStops : function() {
			this._flagStops = !0
		},
		BindStops : function(f) {
			for (var h = f.length; h--; )
				f[h].bind(c.Events.change, this._renderer.flagStops), f[h].parent = this;
			this._renderer.flagStops()
		},
		UnbindStops : function(f) {
			for (var h = f.length; h--; )
				f[h].unbind(c.Events.change, this._renderer.flagStops),
				delete f[h].parent;
			this._renderer.flagStops()
		}
	});
	l.extend(k.prototype, c.Utils.Events, {
		_flagStops : !1,
		_flagSpread : !1,
		clone : function(f) {
			f = f || this.parent;
			var h = l.map(this.stops, function(a) {
				return a.clone()
			}),
			    d = new k(h);
			l.each(c.Gradient.Properties, function(a) {
				d[a] = this[a]
			}, this);
			f && f.add(d);
			return d
		},
		toObject : function() {
			var c = {
				stops : l.map(this.stops, function(c) {
					return c.toObject()
				})
			};
			l.each(k.Properties, function(f) {
				c[f] = this[f]
			}, this);
			return c
		},
		_update : function() {
			(this._flagSpread || this._flagStops) && this.trigger(c.Events.change);
			return this
		},
		flagReset : function() {
			this._flagSpread = this._flagStops = !1;
			return this
		}
	});
	k.MakeObservable(k.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.LinearGradient = function(k, f, h, d, a) {
		c.Gradient.call(this, a);
		this._renderer.type = "linear-gradient";
		a = l.bind(m.FlagEndPoints, this);
		this.left = (new c.Vector).bind(c.Events.change, a);
		this.right = (new c.Vector).bind(c.Events.change, a);
		l.isNumber(k) && (this.left.x = k);
		l.isNumber(f) && (this.left.y = f);
		l.isNumber(h) && (this.right.x = h);
		l.isNumber(d) && (this.right.y = d)
	};
	l.extend(m, {
		Stop : c.Gradient.Stop,
		MakeObservable : function(k) {
			c.Gradient.MakeObservable(k)
		},
		FlagEndPoints : function() {
			this._flagEndPoints = !0
		}
	});
	l.extend(m.prototype, c.Gradient.prototype, {
		_flagEndPoints : !1,
		clone : function(k) {
			k = k || this.parent;
			var f = l.map(this.stops, function(c) {
				return c.clone()
			}),
			    h = new m(this.left._x, this.left._y, this.right._x, this.right._y, f);
			l.each(c.Gradient.Properties, function(c) {
				h[c] = this[c]
			}, this);
			k && k.add(h);
			return h
		},
		toObject : function() {
			var k = c.Gradient.prototype.toObject.call(this);
			k.left = this.left.toObject();
			k.right = this.right.toObject();
			return k
		},
		_update : function() {
			(this._flagEndPoints || this._flagSpread || this._flagStops) && this.trigger(c.Events.change);
			return this
		},
		flagReset : function() {
			this._flagEndPoints = !1;
			c.Gradient.prototype.flagReset.call(this);
			return this
		}
	});
	m.MakeObservable(m.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.RadialGradient = function(k, f, h, d, a, g) {
		c.Gradient.call(this, d);
		this._renderer.type = "radial-gradient";
		this.center = (new c.Vector).bind(c.Events.change, l.bind(function() {
			this._flagCenter = !0
		}, this));
		this.radius = l.isNumber(h) ? h : 20;
		this.focal = (new c.Vector).bind(c.Events.change, l.bind(function() {
			this._flagFocal = !0
		}, this));
		l.isNumber(k) && (this.center.x = k);
		l.isNumber(f) && (this.center.y = f);
		this.focal.copy(this.center);
		l.isNumber(a) && (this.focal.x = a);
		l.isNumber(g) && (this.focal.y = g)
	};
	l.extend(m, {
		Stop : c.Gradient.Stop,
		Properties : ["radius"],
		MakeObservable : function(k) {
			c.Gradient.MakeObservable(k);
			l.each(m.Properties, c.Utils.defineProperty, k)
		}
	});
	l.extend(m.prototype, c.Gradient.prototype, {
		_flagRadius : !1,
		_flagCenter : !1,
		_flagFocal : !1,
		clone : function(k) {
			k = k || this.parent;
			var f = l.map(this.stops, function(c) {
				return c.clone()
			}),
			    h = new m(this.center._x, this.center._y, this._radius, f, this.focal._x, this.focal._y);
			l.each(c.Gradient.Properties.concat(m.Properties), function(c) {
				h[c] = this[c]
			}, this);
			k && k.add(h);
			return h
		},
		toObject : function() {
			var k = c.Gradient.prototype.toObject.call(this);
			l.each(m.Properties, function(c) {
				k[c] = this[c]
			}, this);
			k.center = this.center.toObject();
			k.focal = this.focal.toObject();
			return k
		},
		_update : function() {
			(this._flagRadius || this._flatCenter || this._flagFocal || this._flagSpread || this._flagStops) && this.trigger(c.Events.change);
			return this
		},
		flagReset : function() {
			this._flagRadius = this._flagCenter = this._flagFocal = !1;
			c.Gradient.prototype.flagReset.call(this);
			return this
		}
	});
	m.MakeObservable(m.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = /\.(mp4|webm)$/i,
	    k = c.Texture = function(f, h) {
		this._renderer = {};
		this._renderer.type = "texture";
		this._renderer.flagOffset = l.bind(k.FlagOffset, this);
		this._renderer.flagScale = l.bind(k.FlagScale, this);
		this.id = c.Identifier + c.uniqueId();
		this.classList = [];
		this.offset = new c.Vector;
		if (l.isFunction(h)) {
			var d = l.bind(function() {
				this.unbind(c.Events.load, d);
				l.isFunction(h) && h()
			}, this);
			this.bind(c.Events.load, d)
		}
		l.isString(f) ? this.src = f : l.isElement(f) && (this.image = f);
		this._update()
	};
	l.extend(k, {
		Properties : ["src", "image", "loaded"],
		ImageRegistry : new c.Registry,
		getImage : function(c) {
			if (k.ImageRegistry.contains(c))
				return k.ImageRegistry.get(c);
			c = m.test(c) ? document.createElement("video") : document.createElement("img");
			c.crossOrigin = "anonymous";
			return c
		},
		Register : {
			canvas : function(c, h) {
				c._src = "#" + c.id;
				k.ImageRegistry.add(c.src, c.image);
				l.isFunction(h) && h()
			},
			img : function(f, h) {
				var d = function(c) {
					f.image.removeEventListener("load", d, !1);
					f.image.removeEventListener("error", a, !1);
					l.isFunction(h) && h()
				},
				    a = function(g) {
					f.image.removeEventListener("load", d, !1);
					f.image.removeEventListener("error", a, !1);
					throw new c.Utils.Error("unable to load " + f.src);
				};
				f.image.addEventListener("load", d, !1);
				f.image.addEventListener("error", a, !1);
				f.image.setAttribute("two-src", f.src);
				k.ImageRegistry.add(f.src, f.image);
				f.image.src = f.src
			},
			video : function(f, h) {
				var d = function(c) {
					f.image.removeEventListener("load", d, !1);
					f.image.removeEventListener("error", a, !1);
					f.image.width = f.image.videoWidth;
					f.image.height = f.image.videoHeight;
					f.image.play();
					l.isFunction(h) && h()
				},
				    a = function(g) {
					f.image.removeEventListener("load", d, !1);
					f.image.removeEventListener("error", a, !1);
					throw new c.Utils.Error("unable to load " + f.src);
				};
				f.image.addEventListener("canplaythrough", d, !1);
				f.image.addEventListener("error", a, !1);
				f.image.setAttribute("two-src", f.src);
				k.ImageRegistry.add(f.src, f.image);
				f.image.src = f.src;
				f.image.loop = !0;
				f.image.load()
			}
		},
		load : function(c, h) {
			var d = c.image,
			    a = d && d.nodeName.toLowerCase();
			c._flagImage && (/canvas/i.test(a) ? k.Register.canvas(c, h) : (c._src = d.getAttribute("two-src") || d.src, k.Register[a](c, h)));
			c._flagSrc && (d || (c.image = k.getImage(c.src)),
			a = c.image.nodeName.toLowerCase(), k.Register[a](c, h))
		},
		FlagOffset : function() {
			this._flagOffset = !0
		},
		FlagScale : function() {
			this._flagScale = !0
		},
		MakeObservable : function(f) {
			l.each(k.Properties, c.Utils.defineProperty, f);
			Object.defineProperty(f, "offset", {
				enumerable : !0,
				get : function() {
					return this._offset
				},
				set : function(f) {
					this._offset && this._offset.unbind(c.Events.change, this._renderer.flagOffset);
					this._offset = f;
					this._offset.bind(c.Events.change, this._renderer.flagOffset);
					this._flagOffset = !0
				}
			});
			Object.defineProperty(f, "scale", {
				enumerable : !0,
				get : function() {
					return this._scale
				},
				set : function(f) {
					this._scale instanceof c.Vector && this._scale.unbind(c.Events.change, this._renderer.flagScale);
					this._scale = f;
					this._scale instanceof c.Vector && this._scale.bind(c.Events.change, this._renderer.flagScale);
					this._flagScale = !0
				}
			})
		}
	});
	l.extend(k.prototype, c.Utils.Events, c.Shape.prototype, {
		_flagSrc : !1,
		_flagImage : !1,
		_flagLoaded : !1,
		_flagOffset : !1,
		_flagScale : !1,
		_src : "",
		_image : null,
		_loaded : !1,
		_scale : 1,
		_offset : null,
		clone : function() {
			return new k(this.src)
		},
		toObject : function() {
			return {
				src : this.src,
				image : this.image
			}
		},
		_update : function() {
			if (this._flagSrc || this._flagImage)
				this.trigger(c.Events.change), this.loaded = !1, k.load(this, l.bind(function() {
					this.loaded = !0;
					this.trigger(c.Events.change).trigger(c.Events.load)
				}, this));
			4 <= this.image.readyState && (this._flagImage = !0);
			return this
		},
		flagReset : function() {
			this._flagSrc = this._flagImage = this._flagLoaded = this._flagScale = this._flagOffset = !1;
			return this
		}
	});
	k.MakeObservable(k.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.Path,
	    k = c.Rectangle,
	    f = c.Sprite = function(f, d, a, g, k, e) {
		m.call(this, [new c.Anchor, new c.Anchor, new c.Anchor, new c.Anchor], !0);
		this.noStroke();
		this.noFill();
		f instanceof c.Texture ? this.texture = f : l.isString(f) && (this.texture = new c.Texture(f));
		this._update();
		this.translation.set(d || 0, a || 0);
		l.isNumber(g) && (this.columns = g);
		l.isNumber(k) && (this.rows = k);
		l.isNumber(e) && (this.frameRate = e)
	};
	l.extend(f, {
		Properties : ["texture", "columns", "rows", "frameRate"],
		MakeObservable : function(h) {
			k.MakeObservable(h);
			l.each(f.Properties, c.Utils.defineProperty, h)
		}
	});
	l.extend(f.prototype, k.prototype, {
		_flagTexture : !1,
		_flagColumns : !1,
		_flagRows : !1,
		_flagFrameRate : !1,
		_amount : 1,
		_duration : 0,
		_index : 0,
		_startTime : 0,
		_playing : !1,
		_firstFrame : 0,
		_lastFrame : 0,
		_loop : !0,
		_texture : null,
		_columns : 1,
		_rows : 1,
		_frameRate : 0,
		play : function(c, d, a) {
			this._playing = !0;
			this._firstFrame = 0;
			this._lastFrame = this.amount - 1;
			this._startTime = l.performance.now();
			l.isNumber(c) && (this._firstFrame = c);
			l.isNumber(d) && (this._lastFrame = d);
			l.isFunction(a) ? this._onLastFrame = a :
			delete this._onLastFrame;
			return this
		},
		pause : function() {
			this._playing = !1;
			return this
		},
		stop : function() {
			this._playing = !1;
			this._index = 0;
			return this
		},
		clone : function(c) {
			c = c || this.parent;
			var d = new f(this.texture, this.translation.x, this.translation.y, this.columns, this.rows, this.frameRate);
			this.playing && (d.play(this._firstFrame, this._lastFrame), d._loop = this._loop);
			c && c.add(d);
			return d
		},
		_update : function() {
			var c = this._texture,
			    d = this._columns,
			    a = this._rows;
			if (this._flagColumns || this._flagRows)
				this._amount = this._columns * this._rows;
			this._flagFrameRate && (this._duration = 1E3 * this._amount / this._frameRate);
			this._flagTexture && (this.fill = this._texture);
			if (this._texture.loaded) {
				var g = c.image.width;
				var f = c.image.height;
				var e = g / d;
				a = f / a;
				var m = this._amount;
				this.width !== e && (this.width = e);
				this.height !== a && (this.height = a);
				if (this._playing && 0 < this._frameRate) {
					l.isNaN(this._lastFrame) && (this._lastFrame = m - 1);
					m = l.performance.now() - this._startTime;
					var u = 1E3 * (this._lastFrame - this._firstFrame) / this._frameRate;
					m = this._loop ? m % u : Math.min(m, u);
					m = l.lerp(this._firstFrame, this._lastFrame, m / u);
					m = Math.floor(m);
					m !== this._index && (this._index = m, m >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame())
				}
				e = (g - e) / 2 + e * (this._index % d + 1);
				d = a * Math.floor(this._index / d) - (f - a) / 2;
				e !== c.offset.x && (c.offset.x = e);
				d !== c.offset.y && (c.offset.y = d)
			}
			k.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagTexture = this._flagColumns = this._flagRows = this._flagFrameRate = !1;
			k.prototype.flagReset.call(this);
			return this
		}
	});
	f.MakeObservable(f.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	var l = c.Utils,
	    m = c.Path,
	    k = c.Rectangle,
	    f = c.ImageSequence = function(h, d, a, g) {
		m.call(this, [new c.Anchor, new c.Anchor, new c.Anchor, new c.Anchor], !0);
		this._renderer.flagTextures = l.bind(f.FlagTextures, this);
		this._renderer.bindTextures = l.bind(f.BindTextures, this);
		this._renderer.unbindTextures = l.bind(f.UnbindTextures, this);
		this.noStroke();
		this.noFill();
		this.textures = l.map(h, f.GenerateTexture, this);
		this._update();
		this.translation.set(d || 0, a || 0);
		l.isNumber(g) ? this.frameRate = g : this.frameRate = f.DefaultFrameRate
	};
	l.extend(f, {
		Properties : ["frameRate"],
		DefaultFrameRate : 30,
		FlagTextures : function() {
			this._flagTextures = !0
		},
		BindTextures : function(f) {
			for (var d = f.length; d--; )
				f[d].bind(c.Events.change, this._renderer.flagTextures);
			this._renderer.flagTextures()
		},
		UnbindTextures : function(f) {
			for (var d = f.length; d--; )
				f[d].unbind(c.Events.change, this._renderer.flagTextures);
			this._renderer.flagTextures()
		},
		MakeObservable : function(h) {
			k.MakeObservable(h);
			l.each(f.Properties, c.Utils.defineProperty, h);
			Object.defineProperty(h, "textures", {
				enumerable : !0,
				get : function() {
					return this._textures
				},
				set : function(d) {
					var a = this._renderer.bindTextures,
					    g = this._renderer.unbindTextures;
					this._textures && this._textures.unbind(c.Events.insert, a).unbind(c.Events.remove, g);
					this._textures = new c.Utils.Collection((d || []).slice(0));
					this._textures.bind(c.Events.insert, a).bind(c.Events.remove, g);
					a(this._textures)
				}
			})
		},
		GenerateTexture : function(f) {
			if ( f instanceof c.Texture)
				return f;
			if (l.isString(f))
				return new c.Texture(f)
		}
	});
	l.extend(f.prototype, k.prototype, {
		_flagTextures : !1,
		_flagFrameRate : !1,
		_amount : 1,
		_duration : 0,
		_index : 0,
		_startTime : 0,
		_playing : !1,
		_firstFrame : 0,
		_lastFrame : 0,
		_loop : !0,
		_textures : null,
		_frameRate : 0,
		play : function(c, d, a) {
			this._playing = !0;
			this._firstFrame = 0;
			this._lastFrame = this.amount - 1;
			this._startTime = l.performance.now();
			l.isNumber(c) && (this._firstFrame = c);
			l.isNumber(d) && (this._lastFrame = d);
			l.isFunction(a) ? this._onLastFrame = a :
			delete this._onLastFrame;
			return this
		},
		pause : function() {
			this._playing = !1;
			return this
		},
		stop : function() {
			this._playing = !1;
			this._index = 0;
			return this
		},
		clone : function(c) {
			c = c || this.parent;
			var d = new f(this.textures, this.translation.x, this.translation.y, this.frameRate);
			d._loop = this._loop;
			this._playing && d.play();
			c && c.add(d);
			return d
		},
		_update : function() {
			var f = this._textures;
			this._flagTextures && (this._amount = f.length);
			this._flagFrameRate && (this._duration = 1E3 * this._amount / this._frameRate);
			if (this._playing && 0 < this._frameRate) {
				var d = this._amount;
				l.isNaN(this._lastFrame) && (this._lastFrame = d - 1);
				d = l.performance.now() - this._startTime;
				var a = 1E3 * (this._lastFrame - this._firstFrame) / this._frameRate;
				d = this._loop ? d % a : Math.min(d, a);
				d = l.lerp(this._firstFrame, this._lastFrame, d / a);
				d = Math.floor(d);
				if (d !== this._index) {
					this._index = d;
					var g = f[this._index];
					g.loaded && ( f = g.image.width,
					a = g.image.height, this.width !== f && (this.width = f), this.height !== a && (this.height = a), this.fill =
					g, d >= this._lastFrame - 1 && this._onLastFrame && this._onLastFrame())
				}
			} else
				this.fill instanceof c.Texture || ( g = f[this._index], g.loaded && ( f = g.image.width,
				a = g.image.height, this.width !== f && (this.width = f), this.height !== a && (this.height = a), this.fill =
				g));
			k.prototype._update.call(this);
			return this
		},
		flagReset : function() {
			this._flagTextures = this._flagFrameRate = !1;
			k.prototype.flagReset.call(this);
			return this
		}
	});
	f.MakeObservable(f.prototype)
})(("undefined" !== typeof global ? global : this).Two);
(function(c) {
	function l(a, c) {
		var d = a.parent;
		if (d === c)
			this.additions.push(a), this._flagAdditions = !0;
		else {
			if (d && d.children.ids[a.id]) {
				var e = f.indexOf(d.children, a);
				d.children.splice(e, 1);
				e = f.indexOf(d.additions, a);
				0 <= e ? d.additions.splice(e, 1) : (d.subtractions.push(a), d._flagSubtractions = !0)
			}
			c ? (a.parent = c, this.additions.push(a), this._flagAdditions = !0) : ( e = f.indexOf(this.additions, a), 0 <= e ? this.additions.splice(e, 1) : (this.subtractions.push(a), this._flagSubtractions = !0),
			delete a.parent)
		}
	}

	var m = Math.min,
	    k = Math.max,
	    f = c.Utils,
	    h = function() {
		c.Utils.Collection.apply(this, arguments);
		Object.defineProperty(this, "_events", {
			value : {},
			enumerable : !1
		});
		this.ids = {};
		this.on(c.Events.insert, this.attach);
		this.on(c.Events.remove, this.detach);
		h.prototype.attach.apply(this, arguments)
	};
	h.prototype = new c.Utils.Collection;
	h.prototype.constructor = h;
	f.extend(h.prototype, {
		attach : function(a) {
			for (var c = 0; c < a.length; c++)
				this.ids[a[c].id] = a[c];
			return this
		},
		detach : function(a) {
			for (var c = 0; c < a.length; c++)
				delete this.ids[a[c].id];
			return this
		}
	});
	var d = c.Group = function() {
		c.Shape.call(this, !0);
		this._renderer.type = "group";
		this.additions = [];
		this.subtractions = [];
		this.children = arguments
	};
	f.extend(d, {
		Children : h,
		InsertChildren : function(a) {
			for (var c = 0; c < a.length; c++)
				l.call(this, a[c], this)
		},
		RemoveChildren : function(a) {
			for (var c = 0; c < a.length; c++)
				l.call(this, a[c])
		},
		OrderChildren : function(a) {
			this._flagOrder = !0
		},
		MakeObservable : function(a) {
			var g = c.Path.Properties.slice(0),
			    k = f.indexOf(g, "opacity");
			0 <= k && (g.splice(k, 1), Object.defineProperty(a, "opacity", {
				enumerable : !0,
				get : function() {
					return this._opacity
				},
				set : function(a) {
					this._flagOpacity = this._opacity != a;
					this._opacity = a
				}
			}));
			c.Shape.MakeObservable(a);
			d.MakeGetterSetters(a, g);
			Object.defineProperty(a, "children", {
				enumerable : !0,
				get : function() {
					return this._children
				},
				set : function(a) {
					var e = f.bind(d.InsertChildren, this),
					    g = f.bind(d.RemoveChildren, this),
					    k = f.bind(d.OrderChildren, this);
					this._children && this._children.unbind();
					this._children = new h(a);
					this._children.bind(c.Events.insert, e);
					this._children.bind(c.Events.remove, g);
					this._children.bind(c.Events.order, k)
				}
			});
			Object.defineProperty(a, "mask", {
				enumerable : !0,
				get : function() {
					return this._mask
				},
				set : function(a) {
					this._mask = a;
					this._flagMask = !0;
					a.clip || (a.clip = !0)
				}
			})
		},
		MakeGetterSetters : function(a, c) {
			f.isArray(c) || ( c = [c]);
			f.each(c, function(c) {
				d.MakeGetterSetter(a, c)
			})
		},
		MakeGetterSetter : function(a, c) {
			var d = "_" + c;
			Object.defineProperty(a, c, {
				enumerable : !0,
				get : function() {
					return this[d]
				},
				set : function(a) {
					this[d] = a;
					f.each(this.children, function(d) {
						d[c] = a
					})
				}
			})
		}
	});
	f.extend(d.prototype, c.Shape.prototype, {
		_flagAdditions : !1,
		_flagSubtractions : !1,
		_flagOrder : !1,
		_flagOpacity : !0,
		_flagMask : !1,
		_fill : "#fff",
		_stroke : "#000",
		_linewidth : 1,
		_opacity : 1,
		_visible : !0,
		_cap : "round",
		_join : "round",
		_miter : 4,
		_closed : !0,
		_curved : !1,
		_automatic : !0,
		_beginning : 0,
		_ending : 1,
		_mask : null,
		clone : function(a) {
			a = a || this.parent;
			var c = new d,
			    h = f.map(this.children, function(a) {
				return a.clone(c)
			});
			c.add(h);
			c.opacity = this.opacity;
			this.mask && (c.mask = this.mask);
			c.translation.copy(this.translation);
			c.rotation = this.rotation;
			c.scale = this.scale;
			a && a.add(c);
			return c
		},
		toObject : function() {
			var a = {
				children : [],
				translation : this.translation.toObject(),
				rotation : this.rotation,
				scale : this.scale,
				opacity : this.opacity,
				mask : this.mask ? this.mask.toObject() : null
			};
			f.each(this.children, function(c, d) {
				a.children[d] = c.toObject()
			}, this);
			return a
		},
		corner : function() {
			var a = this.getBoundingClientRect(!0),
			    c = {
				x : a.left,
				y : a.top
			};
			this.children.forEach(function(a) {
				a.translation.subSelf(c)
			});
			return this
		},
		center : function() {
			var a = this.getBoundingClientRect(!0);
			a.centroid = {
				x : a.left + a.width / 2,
				y : a.top + a.height / 2
			};
			this.children.forEach(function(c) {
				c.isShape && c.translation.subSelf(a.centroid)
			});
			return this
		},
		getById : function(a) {
			var c = function(a, d) {
				if (a.id === d)
					return a;
				if (a.children)
					for (var e = a.children.length; e--; ) {
						var f = c(a.children[e], d);
						if (f)
							return f
					}
			};
			return c(this, a) || null
		},
		getByClassName : function(a) {
			var c = [],
			    d = function(a, f) {
				-1 != a.classList.indexOf(f) ? c.push(a) : a.children && a.children.forEach(function(a) {
					d(a, f)
				});
				return c
			};
			return d(this, a)
		},
		getByType : function(a) {
			var d = [],
			    f = function(a, g) {
				for (var e in a.children)a.children[e] instanceof g ? d.push(a.children[e]) : a.children[e] instanceof c.Group && f(a.children[e], g);
				return d
			};
			return f(this, a)
		},
		add : function(a) {
			a = a instanceof Array ? a.slice() : f.toArray(arguments);
			for (var c = 0; c < a.length; c++)
				a[c] && a[c].id && this.children.push(a[c]);
			return this
		},
		remove : function(a) {
			var c = this.parent;
			if (0 >= arguments.length && c)
				return c.remove(this), this;
			a = a instanceof Array ? a.slice() : f.toArray(arguments);
			for ( c = 0; c < a.length; c++)
				a[c] && this.children.ids[a[c].id] && this.children.splice(f.indexOf(this.children, a[c]), 1);
			return this
		},
		getBoundingClientRect : function(a) {
			var c;
			this._update(!0);
			var d = Infinity,
			    e = -Infinity,
			    h =
			    Infinity,
			    l = -Infinity;
			this.children.forEach(function(g) {
				/(linear-gradient|radial-gradient|gradient)/.test(g._renderer.type) || ( c = g.getBoundingClientRect(a), f.isNumber(c.top) && f.isNumber(c.left) && f.isNumber(c.right) && f.isNumber(c.bottom) && ( h = m(c.top, h),
				d = m(c.left, d),
				e = k(c.right, e),
				l = k(c.bottom, l)))
			}, this);
			return {
				top : h,
				left : d,
				right : e,
				bottom : l,
				width : e - d,
				height : l - h
			}
		},
		noFill : function() {
			this.children.forEach(function(a) {
				a.noFill()
			});
			return this
		},
		noStroke : function() {
			this.children.forEach(function(a) {
				a.noStroke()
			});
			return this
		},
		subdivide : function() {
			var a = arguments;
			this.children.forEach(function(c) {
				c.subdivide.apply(c, a)
			});
			return this
		},
		flagReset : function() {
			this._flagAdditions && (this.additions.length = 0, this._flagAdditions = !1);
			this._flagSubtractions && (this.subtractions.length = 0, this._flagSubtractions = !1);
			this._flagOrder = this._flagMask = this._flagOpacity = !1;
			c.Shape.prototype.flagReset.call(this);
			return this
		}
	});
	d.MakeObservable(d.prototype)
})(("undefined" !== typeof global ? global : this).Two); 