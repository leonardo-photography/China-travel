// FITVIDSFITVIDSFITVIDS
/*global jQuery */
/*jshint multistr:true browser:true */
/*!
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
(function (e) {
    "use strict";
    e.fn.fitVids = function (t) {
        var n = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.createElement("div"),
                i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
            r.className = "fit-vids-style";
            r.id = "fit-vids-style";
            r.style.display = "none";
            r.innerHTML = "&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>";
            i.parentNode.insertBefore(r, i)
        }
        t && e.extend(n, t);
        return this.each(function () {
            var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            n.customSelector && t.push(n.customSelector);
            var r = e(this).find(t.join(","));
            r = r.not("object object");
            r.each(function () {
                var t = e(this);
                if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length) return;
                var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                    r = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
                    i = n / r;
                if (!t.attr("id")) {
                    var s = "fitvid" + Math.floor(Math.random() * 999999);
                    t.attr("id", s)
                }
                t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%");
                t.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
var particle_array = [],
    current, widest_width = jQuery(window).width() * .8,
    particle_height = "800";
(function (e) {
    "use strict";
    e.fn.extend({
        customSelect: function (t) {
            if (typeof document.body.style.maxHeight == "undefined") return this;
            var n = {
                    customClass: "customSelect",
                    mapClass: !0,
                    mapStyle: !0
                },
                t = e.extend(n, t),
                r = t.customClass,
                i = function (t, n) {
                    var r = t.find(":selected"),
                        i = n.children(":first"),
                        o = r.html() || "&nbsp;";
                    i.html(o);
                    r.attr("disabled") ? n.addClass(s("DisabledOption")) : n.removeClass(s("DisabledOption"));
                    setTimeout(function () {
                        n.removeClass(s("Open"));
                        e(document).off("mouseup." + s("Open"))
                    }, 60)
                },
                s = function (e) {
                    return r + e
                };
            return this.each(function () {
                var n = e(this),
                    o = e("<span />").addClass(s("Inner")),
                    u = e("<span />");
                n.after(u.append(o));
                u.addClass(r);
                t.mapClass && u.addClass(n.attr("class"));
                t.mapStyle && u.attr("style", n.attr("style"));
                n.addClass("hasCustomSelect").on("update", function () {
                    i(n, u);
                    var e = parseInt(n.outerWidth(), 10) - (parseInt(u.outerWidth(), 10) - parseInt(u.width(), 10));
                    u.css({
                        display: "inline-block"
                    });
                    var t = u.outerHeight();
                    n.attr("disabled") ? u.addClass(s("Disabled")) : u.removeClass(s("Disabled"));
                    o.css({
                        width: e,
                        display: "inline-block"
                    });
                    n.css({
                        "-webkit-appearance": "menulist-button",
                        width: u.outerWidth(),
                        position: "absolute",
                        opacity: 0,
                        height: t,
                        fontSize: u.css("font-size")
                    })
                }).on("change", function () {
                    u.addClass(s("Changed"));
                    i(n, u)
                }).on("keyup", function (e) {
                    if (!u.hasClass(s("Open"))) {
                        n.blur();
                        n.focus()
                    } else(e.which == 13 || e.which == 27) && i(n, u)
                }).on("mousedown", function (e) {
                    u.removeClass(s("Changed"))
                }).on("mouseup", function (t) {
                    if (!u.hasClass(s("Open")))
                        if (e("." + s("Open")).not(u).length > 0 && typeof InstallTrigger != "undefined") n.focus();
                        else {
                            u.addClass(s("Open"));
                            t.stopPropagation();
                            e(document).one("mouseup." + s("Open"), function (t) {
                                t.target != n.get(0) && e.inArray(t.target, n.find("*").get()) < 0 ? n.blur() : i(n, u)
                            })
                        }
                }).focus(function () {
                    u.removeClass(s("Changed")).addClass(s("Focus"))
                }).blur(function () {
                    u.removeClass(s("Focus") + " " + s("Open"))
                }).hover(function () {
                    u.addClass(s("Hover"))
                }, function () {
                    u.removeClass(s("Hover"))
                }).trigger("update")
            })
        }
    })
})(jQuery);
Encoder = {
    EncodeType: "entity",
    isEmpty: function (e) {
        return e ? e === null || e.length == 0 || /^\s+$/.test(e) : !0
    },
    arr1: ["&nbsp;", "&iexcl;", "&cent;", "&pound;", "&curren;", "&yen;", "&brvbar;", "&sect;", "&uml;", "&copy;", "&ordf;", "&laquo;", "&not;", "&shy;", "&reg;", "&macr;", "&deg;", "&plusmn;", "&sup2;", "&sup3;", "&acute;", "&micro;", "&para;", "&middot;", "&cedil;", "&sup1;", "&ordm;", "&raquo;", "&frac14;", "&frac12;", "&frac34;", "&iquest;", "&Agrave;", "&Aacute;", "&Acirc;", "&Atilde;", "&Auml;", "&Aring;", "&AElig;", "&Ccedil;", "&Egrave;", "&Eacute;", "&Ecirc;", "&Euml;", "&Igrave;", "&Iacute;", "&Icirc;", "&Iuml;", "&ETH;", "&Ntilde;", "&Ograve;", "&Oacute;", "&Ocirc;", "&Otilde;", "&Ouml;", "&times;", "&Oslash;", "&Ugrave;", "&Uacute;", "&Ucirc;", "&Uuml;", "&Yacute;", "&THORN;", "&szlig;", "&agrave;", "&aacute;", "&acirc;", "&atilde;", "&auml;", "&aring;", "&aelig;", "&ccedil;", "&egrave;", "&eacute;", "&ecirc;", "&euml;", "&igrave;", "&iacute;", "&icirc;", "&iuml;", "&eth;", "&ntilde;", "&ograve;", "&oacute;", "&ocirc;", "&otilde;", "&ouml;", "&divide;", "&oslash;", "&ugrave;", "&uacute;", "&ucirc;", "&uuml;", "&yacute;", "&thorn;", "&yuml;", "&quot;", "&amp;", "&lt;", "&gt;", "&OElig;", "&oelig;", "&Scaron;", "&scaron;", "&Yuml;", "&circ;", "&tilde;", "&ensp;", "&emsp;", "&thinsp;", "&zwnj;", "&zwj;", "&lrm;", "&rlm;", "&ndash;", "&mdash;", "&lsquo;", "&rsquo;", "&sbquo;", "&ldquo;", "&rdquo;", "&bdquo;", "&dagger;", "&Dagger;", "&permil;", "&lsaquo;", "&rsaquo;", "&euro;", "&fnof;", "&Alpha;", "&Beta;", "&Gamma;", "&Delta;", "&Epsilon;", "&Zeta;", "&Eta;", "&Theta;", "&Iota;", "&Kappa;", "&Lambda;", "&Mu;", "&Nu;", "&Xi;", "&Omicron;", "&Pi;", "&Rho;", "&Sigma;", "&Tau;", "&Upsilon;", "&Phi;", "&Chi;", "&Psi;", "&Omega;", "&alpha;", "&beta;", "&gamma;", "&delta;", "&epsilon;", "&zeta;", "&eta;", "&theta;", "&iota;", "&kappa;", "&lambda;", "&mu;", "&nu;", "&xi;", "&omicron;", "&pi;", "&rho;", "&sigmaf;", "&sigma;", "&tau;", "&upsilon;", "&phi;", "&chi;", "&psi;", "&omega;", "&thetasym;", "&upsih;", "&piv;", "&bull;", "&hellip;", "&prime;", "&Prime;", "&oline;", "&frasl;", "&weierp;", "&image;", "&real;", "&trade;", "&alefsym;", "&larr;", "&uarr;", "&rarr;", "&darr;", "&harr;", "&crarr;", "&lArr;", "&uArr;", "&rArr;", "&dArr;", "&hArr;", "&forall;", "&part;", "&exist;", "&empty;", "&nabla;", "&isin;", "&notin;", "&ni;", "&prod;", "&sum;", "&minus;", "&lowast;", "&radic;", "&prop;", "&infin;", "&ang;", "&and;", "&or;", "&cap;", "&cup;", "&int;", "&there4;", "&sim;", "&cong;", "&asymp;", "&ne;", "&equiv;", "&le;", "&ge;", "&sub;", "&sup;", "&nsub;", "&sube;", "&supe;", "&oplus;", "&otimes;", "&perp;", "&sdot;", "&lceil;", "&rceil;", "&lfloor;", "&rfloor;", "&lang;", "&rang;", "&loz;", "&spades;", "&clubs;", "&hearts;", "&diams;"],
    arr2: ["&#160;", "&#161;", "&#162;", "&#163;", "&#164;", "&#165;", "&#166;", "&#167;", "&#168;", "&#169;", "&#170;", "&#171;", "&#172;", "&#173;", "&#174;", "&#175;", "&#176;", "&#177;", "&#178;", "&#179;", "&#180;", "&#181;", "&#182;", "&#183;", "&#184;", "&#185;", "&#186;", "&#187;", "&#188;", "&#189;", "&#190;", "&#191;", "&#192;", "&#193;", "&#194;", "&#195;", "&#196;", "&#197;", "&#198;", "&#199;", "&#200;", "&#201;", "&#202;", "&#203;", "&#204;", "&#205;", "&#206;", "&#207;", "&#208;", "&#209;", "&#210;", "&#211;", "&#212;", "&#213;", "&#214;", "&#215;", "&#216;", "&#217;", "&#218;", "&#219;", "&#220;", "&#221;", "&#222;", "&#223;", "&#224;", "&#225;", "&#226;", "&#227;", "&#228;", "&#229;", "&#230;", "&#231;", "&#232;", "&#233;", "&#234;", "&#235;", "&#236;", "&#237;", "&#238;", "&#239;", "&#240;", "&#241;", "&#242;", "&#243;", "&#244;", "&#245;", "&#246;", "&#247;", "&#248;", "&#249;", "&#250;", "&#251;", "&#252;", "&#253;", "&#254;", "&#255;", "&#34;", "&#38;", "&#60;", "&#62;", "&#338;", "&#339;", "&#352;", "&#353;", "&#376;", "&#710;", "&#732;", "&#8194;", "&#8195;", "&#8201;", "&#8204;", "&#8205;", "&#8206;", "&#8207;", "&#8211;", "&#8212;", "&#8216;", "&#8217;", "&#8218;", "&#8220;", "&#8221;", "&#8222;", "&#8224;", "&#8225;", "&#8240;", "&#8249;", "&#8250;", "&#8364;", "&#402;", "&#913;", "&#914;", "&#915;", "&#916;", "&#917;", "&#918;", "&#919;", "&#920;", "&#921;", "&#922;", "&#923;", "&#924;", "&#925;", "&#926;", "&#927;", "&#928;", "&#929;", "&#931;", "&#932;", "&#933;", "&#934;", "&#935;", "&#936;", "&#937;", "&#945;", "&#946;", "&#947;", "&#948;", "&#949;", "&#950;", "&#951;", "&#952;", "&#953;", "&#954;", "&#955;", "&#956;", "&#957;", "&#958;", "&#959;", "&#960;", "&#961;", "&#962;", "&#963;", "&#964;", "&#965;", "&#966;", "&#967;", "&#968;", "&#969;", "&#977;", "&#978;", "&#982;", "&#8226;", "&#8230;", "&#8242;", "&#8243;", "&#8254;", "&#8260;", "&#8472;", "&#8465;", "&#8476;", "&#8482;", "&#8501;", "&#8592;", "&#8593;", "&#8594;", "&#8595;", "&#8596;", "&#8629;", "&#8656;", "&#8657;", "&#8658;", "&#8659;", "&#8660;", "&#8704;", "&#8706;", "&#8707;", "&#8709;", "&#8711;", "&#8712;", "&#8713;", "&#8715;", "&#8719;", "&#8721;", "&#8722;", "&#8727;", "&#8730;", "&#8733;", "&#8734;", "&#8736;", "&#8743;", "&#8744;", "&#8745;", "&#8746;", "&#8747;", "&#8756;", "&#8764;", "&#8773;", "&#8776;", "&#8800;", "&#8801;", "&#8804;", "&#8805;", "&#8834;", "&#8835;", "&#8836;", "&#8838;", "&#8839;", "&#8853;", "&#8855;", "&#8869;", "&#8901;", "&#8968;", "&#8969;", "&#8970;", "&#8971;", "&#9001;", "&#9002;", "&#9674;", "&#9824;", "&#9827;", "&#9829;", "&#9830;"],
    HTML2Numerical: function (e) {
        return this.swapArrayVals(e, this.arr1, this.arr2)
    },
    NumericalToHTML: function (e) {
        return this.swapArrayVals(e, this.arr2, this.arr1)
    },
    numEncode: function (e) {
        if (this.isEmpty(e)) return "";
        var t = [],
            n = e.length;
        for (var r = 0; r < n; r++) {
            var i = e.charAt(r);
            if (i < " " || i > "~") {
                t.push("&#");
                t.push(i.charCodeAt());
                t.push(";")
            } else t.push(i)
        }
        return t.join("")
    },
    htmlDecode: function (e) {
        var t, n, r = e;
        if (this.isEmpty(r)) return "";
        r = this.HTML2Numerical(r);
        arr = r.match(/&#[0-9]{1,5};/g);
        if (arr != null)
            for (var i = 0; i < arr.length; i++) {
                n = arr[i];
                t = n.substring(2, n.length - 1);
                t >= -32768 && t <= 65535 ? r = r.replace(n, String.fromCharCode(t)) : r = r.replace(n, "")
            }
        return r
    },
    htmlEncode: function (e, t) {
        if (this.isEmpty(e)) return "";
        t = t || !1;
        t && (this.EncodeType == "numerical" ? e = e.replace(/&/g, "&#38;") : e = e.replace(/&/g, "&amp;"));
        e = this.XSSEncode(e, !1);
        if (this.EncodeType == "numerical" || !t) e = this.HTML2Numerical(e);
        e = this.numEncode(e);
        if (!t) {
            e = e.replace(/&#/g, "##AMPHASH##");
            this.EncodeType == "numerical" ? e = e.replace(/&/g, "&#38;") : e = e.replace(/&/g, "&amp;");
            e = e.replace(/##AMPHASH##/g, "&#")
        }
        e = e.replace(/&#\d*([^\d;]|$)/g, "$1");
        t || (e = this.correctEncoding(e));
        this.EncodeType == "entity" && (e = this.NumericalToHTML(e));
        return e
    },
    XSSEncode: function (e, t) {
        if (!this.isEmpty(e)) {
            t = t || !0;
            if (t) {
                e = e.replace(/\'/g, "&#39;");
                e = e.replace(/\"/g, "&quot;");
                e = e.replace(/</g, "&lt;");
                e = e.replace(/>/g, "&gt;")
            } else {
                e = e.replace(/\'/g, "&#39;");
                e = e.replace(/\"/g, "&#34;");
                e = e.replace(/</g, "&#60;");
                e = e.replace(/>/g, "&#62;")
            }
            return e
        }
        return ""
    },
    hasEncoded: function (e) {
        return /&#[0-9]{1,5};/g.test(e) ? !0 : /&[A-Z]{2,6};/gi.test(e) ? !0 : !1
    },
    stripUnicode: function (e) {
        return e.replace(/[^\x20-\x7E]/g, "")
    },
    correctEncoding: function (e) {
        return e.replace(/(&amp;)(amp;)+/, "$1")
    },
    swapArrayVals: function (e, t, n) {
        if (this.isEmpty(e)) return "";
        var r;
        if (t && n && t.length == n.length)
            for (var i = 0, s = t.length; i < s; i++) {
                r = new RegExp(t[i], "g");
                e = e.replace(r, n[i])
            }
        return e
    },
    inArray: function (e, t) {
        for (var n = 0, r = t.length; n < r; n++)
            if (t[n] === e) return n;
        return -1
    }
};
(function (e) {
    e.flexslider = function (t, n) {
        var r = e(t);
        r.vars = e.extend({}, e.flexslider.defaults, n);
        var i = r.vars.namespace,
            s = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            o = ("ontouchstart" in window || s || window.DocumentTouch && document instanceof DocumentTouch) && r.vars.touch,
            u = "click touchend MSPointerUp",
            a = "",
            f, l = r.vars.direction === "vertical",
            c = r.vars.reverse,
            h = r.vars.itemWidth > 0,
            p = r.vars.animation === "fade",
            d = r.vars.asNavFor !== "",
            v = {},
            m = !0;
        e.data(t, "flexslider", r);
        v = {
            init: function () {
                r.animating = !1;
                r.currentSlide = parseInt(r.vars.startAt ? r.vars.startAt : 0);
                isNaN(r.currentSlide) && (r.currentSlide = 0);
                r.animatingTo = r.currentSlide;
                r.atEnd = r.currentSlide === 0 || r.currentSlide === r.last;
                r.containerSelector = r.vars.selector.substr(0, r.vars.selector.search(" "));
                r.slides = e(r.vars.selector, r);
                r.container = e(r.containerSelector, r);
                r.count = r.slides.length;
                r.syncExists = e(r.vars.sync).length > 0;
                r.vars.animation === "slide" && (r.vars.animation = "swing");
                r.prop = l ? "top" : "marginLeft";
                r.args = {};
                r.manualPause = !1;
                r.stopped = !1;
                r.started = !1;
                r.startTimeout = null;
                r.transitions = !r.vars.video && !p && r.vars.useCSS && function () {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var n in t)
                        if (e.style[t[n]] !== undefined) {
                            r.pfx = t[n].replace("Perspective", "").toLowerCase();
                            r.prop = "-" + r.pfx + "-transform";
                            return !0
                        } return !1
                }();
                r.vars.controlsContainer !== "" && (r.controlsContainer = e(r.vars.controlsContainer).length > 0 && e(r.vars.controlsContainer));
                r.vars.manualControls !== "" && (r.manualControls = e(r.vars.manualControls).length > 0 && e(r.vars.manualControls));
                if (r.vars.randomize) {
                    r.slides.sort(function () {
                        return Math.round(Math.random()) - .5
                    });
                    r.container.empty().append(r.slides)
                }
                r.doMath();
                r.setup("init");
                r.vars.controlNav && v.controlNav.setup();
                r.vars.directionNav && v.directionNav.setup();
                r.vars.keyboard && (e(r.containerSelector).length === 1 || r.vars.multipleKeyboard) && e(document).bind("keyup", function (e) {
                    var t = e.keyCode;
                    if (!r.animating && (t === 39 || t === 37)) {
                        var n = t === 39 ? r.getTarget("next") : t === 37 ? r.getTarget("prev") : !1;
                        r.flexAnimate(n, r.vars.pauseOnAction)
                    }
                });
                r.vars.mousewheel && r.bind("mousewheel", function (e, t, n, i) {
                    e.preventDefault();
                    var s = t < 0 ? r.getTarget("next") : r.getTarget("prev");
                    r.flexAnimate(s, r.vars.pauseOnAction)
                });
                r.vars.pausePlay && v.pausePlay.setup();
                r.vars.slideshow && r.vars.pauseInvisible && v.pauseInvisible.init();
                if (r.vars.slideshow) {
                    r.vars.pauseOnHover && r.hover(function () {
                        !r.manualPlay && !r.manualPause && r.pause()
                    }, function () {
                        !r.manualPause && !r.manualPlay && !r.stopped && r.play()
                    });
                    if (!r.vars.pauseInvisible || !v.pauseInvisible.isHidden()) r.vars.initDelay > 0 ? r.startTimeout = setTimeout(r.play, r.vars.initDelay) : r.play()
                }
                d && v.asNav.setup();
                o && r.vars.touch && v.touch();
                (!p || p && r.vars.smoothHeight) && e(window).bind("resize orientationchange focus", v.resize);
                r.find("img").attr("draggable", "false");
                setTimeout(function () {
                    r.vars.start(r)
                }, 200)
            },
            asNav: {
                setup: function () {
                    r.asNav = !0;
                    r.animatingTo = Math.floor(r.currentSlide / r.move);
                    r.currentItem = r.currentSlide;
                    r.slides.removeClass(i + "active-slide").eq(r.currentItem).addClass(i + "active-slide");
                    if (!s) r.slides.click(function (t) {
                        t.preventDefault();
                        var n = e(this),
                            s = n.index(),
                            o = n.offset().left - e(r).scrollLeft();
                        if (o <= 0 && n.hasClass(i + "active-slide")) r.flexAnimate(r.getTarget("prev"), !0);
                        else if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass(i + "active-slide")) {
                            r.direction = r.currentItem < s ? "next" : "prev";
                            r.flexAnimate(s, r.vars.pauseOnAction, !1, !0, !0)
                        }
                    });
                    else {
                        t._slider = r;
                        r.slides.each(function () {
                            var t = this;
                            t._gesture = new MSGesture;
                            t._gesture.target = t;
                            t.addEventListener("MSPointerDown", function (e) {
                                e.preventDefault();
                                e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                            }, !1);
                            t.addEventListener("MSGestureTap", function (t) {
                                t.preventDefault();
                                var n = e(this),
                                    i = n.index();
                                if (!e(r.vars.asNavFor).data("flexslider").animating && !n.hasClass("active")) {
                                    r.direction = r.currentItem < i ? "next" : "prev";
                                    r.flexAnimate(i, r.vars.pauseOnAction, !1, !0, !0)
                                }
                            })
                        })
                    }
                }
            },
            controlNav: {
                setup: function () {
                    r.manualControls ? v.controlNav.setupManual() : v.controlNav.setupPaging()
                },
                setupPaging: function () {
                    var t = r.vars.controlNav === "thumbnails" ? "control-thumbs" : "control-paging",
                        n = 1,
                        s, o;
                    r.controlNavScaffold = e('<ol class="' + i + "control-nav " + i + t + '"></ol>');
                    if (r.pagingCount > 1)
                        for (var f = 0; f < r.pagingCount; f++) {
                            o = r.slides.eq(f);
                            s = r.vars.controlNav === "thumbnails" ? '<img src="' + o.attr("data-thumb") + '"/>' : "<a>" + n + "</a>";
                            if ("thumbnails" === r.vars.controlNav && !0 === r.vars.thumbCaptions) {
                                var l = o.attr("data-thumbcaption");
                                "" != l && undefined != l && (s += '<span class="' + i + 'caption">' + l + "</span>")
                            }
                            r.controlNavScaffold.append("<li>" + s + "</li>");
                            n++
                        }
                    r.controlsContainer ? e(r.controlsContainer).append(r.controlNavScaffold) : r.append(r.controlNavScaffold);
                    v.controlNav.set();
                    v.controlNav.active();
                    r.controlNavScaffold.delegate("a, img", u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                r.direction = s > r.currentSlide ? "next" : "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                setupManual: function () {
                    r.controlNav = r.manualControls;
                    v.controlNav.active();
                    r.controlNav.bind(u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type) {
                            var n = e(this),
                                s = r.controlNav.index(n);
                            if (!n.hasClass(i + "active")) {
                                s > r.currentSlide ? r.direction = "next" : r.direction = "prev";
                                r.flexAnimate(s, r.vars.pauseOnAction)
                            }
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                set: function () {
                    var t = r.vars.controlNav === "thumbnails" ? "img" : "a";
                    r.controlNav = e("." + i + "control-nav li " + t, r.controlsContainer ? r.controlsContainer : r)
                },
                active: function () {
                    r.controlNav.removeClass(i + "active").eq(r.animatingTo).addClass(i + "active")
                },
                update: function (t, n) {
                    r.pagingCount > 1 && t === "add" ? r.controlNavScaffold.append(e("<li><a>" + r.count + "</a></li>")) : r.pagingCount === 1 ? r.controlNavScaffold.find("li").remove() : r.controlNav.eq(n).closest("li").remove();
                    v.controlNav.set();
                    r.pagingCount > 1 && r.pagingCount !== r.controlNav.length ? r.update(n, t) : v.controlNav.active()
                }
            },
            directionNav: {
                setup: function () {
                    var t = e('<ul class="' + i + 'direction-nav"><li><a class="' + i + 'prev" href="#">' + r.vars.prevText + '</a></li><li><a class="' + i + 'next" href="#">' + r.vars.nextText + "</a></li></ul>");
                    if (r.controlsContainer) {
                        e(r.controlsContainer).append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.directionNav = e("." + i + "direction-nav li a", r)
                    }
                    v.directionNav.update();
                    r.directionNav.bind(u, function (t) {
                        t.preventDefault();
                        var n;
                        if (a === "" || a === t.type) {
                            n = e(this).hasClass(i + "next") ? r.getTarget("next") : r.getTarget("prev");
                            r.flexAnimate(n, r.vars.pauseOnAction)
                        }
                        a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function () {
                    var e = i + "disabled";
                    r.pagingCount === 1 ? r.directionNav.addClass(e).attr("tabindex", "-1") : r.vars.animationLoop ? r.directionNav.removeClass(e).removeAttr("tabindex") : r.animatingTo === 0 ? r.directionNav.removeClass(e).filter("." + i + "prev").addClass(e).attr("tabindex", "-1") : r.animatingTo === r.last ? r.directionNav.removeClass(e).filter("." + i + "next").addClass(e).attr("tabindex", "-1") : r.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function () {
                    var t = e('<div class="' + i + 'pauseplay"><a></a></div>');
                    if (r.controlsContainer) {
                        r.controlsContainer.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r.controlsContainer)
                    } else {
                        r.append(t);
                        r.pausePlay = e("." + i + "pauseplay a", r)
                    }
                    v.pausePlay.update(r.vars.slideshow ? i + "pause" : i + "play");
                    r.pausePlay.bind(u, function (t) {
                        t.preventDefault();
                        if (a === "" || a === t.type)
                            if (e(this).hasClass(i + "pause")) {
                                r.manualPause = !0;
                                r.manualPlay = !1;
                                r.pause()
                            } else {
                                r.manualPause = !1;
                                r.manualPlay = !0;
                                r.play()
                            } a === "" && (a = t.type);
                        v.setToClearWatchedEvent()
                    })
                },
                update: function (e) {
                    e === "play" ? r.pausePlay.removeClass(i + "pause").addClass(i + "play").html(r.vars.playText) : r.pausePlay.removeClass(i + "play").addClass(i + "pause").html(r.vars.pauseText)
                }
            },
            touch: function () {
                var e, n, i, o, u, a, f = !1,
                    d = 0,
                    v = 0,
                    m = 0;
                if (!s) {
                    t.addEventListener("touchstart", g, !1);

                    function g(s) {
                        if (r.animating) s.preventDefault();
                        else if (window.navigator.msPointerEnabled || s.touches.length === 1) {
                            r.pause();
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            d = s.touches[0].pageX;
                            v = s.touches[0].pageY;
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o;
                            e = l ? v : d;
                            n = l ? d : v;
                            t.addEventListener("touchmove", y, !1);
                            t.addEventListener("touchend", b, !1)
                        }
                    }

                    function y(t) {
                        d = t.touches[0].pageX;
                        v = t.touches[0].pageY;
                        u = l ? e - v : e - d;
                        f = l ? Math.abs(u) < Math.abs(d - n) : Math.abs(u) < Math.abs(v - n);
                        var s = 500;
                        if (!f || Number(new Date) - a > s) {
                            t.preventDefault();
                            if (!p && r.transitions) {
                                r.vars.animationLoop || (u /= r.currentSlide === 0 && u < 0 || r.currentSlide === r.last && u > 0 ? Math.abs(u) / o + 2 : 1);
                                r.setProps(i + u, "setTouch")
                            }
                        }
                    }

                    function b(s) {
                        t.removeEventListener("touchmove", y, !1);
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var l = c ? -u : u,
                                h = l > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(h) && (Number(new Date) - a < 550 && Math.abs(l) > 50 || Math.abs(l) > o / 2) ? r.flexAnimate(h, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        t.removeEventListener("touchend", b, !1);
                        e = null;
                        n = null;
                        u = null;
                        i = null
                    }
                } else {
                    t.style.msTouchAction = "none";
                    t._gesture = new MSGesture;
                    t._gesture.target = t;
                    t.addEventListener("MSPointerDown", w, !1);
                    t._slider = r;
                    t.addEventListener("MSGestureChange", E, !1);
                    t.addEventListener("MSGestureEnd", S, !1);

                    function w(e) {
                        e.stopPropagation();
                        if (r.animating) e.preventDefault();
                        else {
                            r.pause();
                            t._gesture.addPointer(e.pointerId);
                            m = 0;
                            o = l ? r.h : r.w;
                            a = Number(new Date);
                            i = h && c && r.animatingTo === r.last ? 0 : h && c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : h && r.currentSlide === r.last ? r.limit : h ? (r.itemW + r.vars.itemMargin) * r.move * r.currentSlide : c ? (r.last - r.currentSlide + r.cloneOffset) * o : (r.currentSlide + r.cloneOffset) * o
                        }
                    }

                    function E(e) {
                        e.stopPropagation();
                        var n = e.target._slider;
                        if (!n) return;
                        var r = -e.translationX,
                            s = -e.translationY;
                        m += l ? s : r;
                        u = m;
                        f = l ? Math.abs(m) < Math.abs(-r) : Math.abs(m) < Math.abs(-s);
                        if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
                            setImmediate(function () {
                                t._gesture.stop()
                            });
                            return
                        }
                        if (!f || Number(new Date) - a > 500) {
                            e.preventDefault();
                            if (!p && n.transitions) {
                                n.vars.animationLoop || (u = m / (n.currentSlide === 0 && m < 0 || n.currentSlide === n.last && m > 0 ? Math.abs(m) / o + 2 : 1));
                                n.setProps(i + u, "setTouch")
                            }
                        }
                    }

                    function S(t) {
                        t.stopPropagation();
                        var r = t.target._slider;
                        if (!r) return;
                        if (r.animatingTo === r.currentSlide && !f && u !== null) {
                            var s = c ? -u : u,
                                l = s > 0 ? r.getTarget("next") : r.getTarget("prev");
                            r.canAdvance(l) && (Number(new Date) - a < 550 && Math.abs(s) > 50 || Math.abs(s) > o / 2) ? r.flexAnimate(l, r.vars.pauseOnAction) : p || r.flexAnimate(r.currentSlide, r.vars.pauseOnAction, !0)
                        }
                        e = null;
                        n = null;
                        u = null;
                        i = null;
                        m = 0
                    }
                }
            },
            resize: function () {
                if (!r.animating && r.is(":visible")) {
                    h || r.doMath();
                    if (p) v.smoothHeight();
                    else if (h) {
                        r.slides.width(r.computedW);
                        r.update(r.pagingCount);
                        r.setProps()
                    } else if (l) {
                        r.viewport.height(r.h);
                        r.setProps(r.h, "setTotal")
                    } else {
                        r.vars.smoothHeight && v.smoothHeight();
                        r.newSlides.width(r.computedW);
                        r.setProps(r.computedW, "setTotal")
                    }
                }
            },
            smoothHeight: function (e) {
                if (!l || p) {
                    var t = p ? r : r.viewport;
                    e ? t.animate({
                        height: r.slides.eq(r.animatingTo).height()
                    }, e) : t.height(r.slides.eq(r.animatingTo).height())
                }
            },
            sync: function (t) {
                var n = e(r.vars.sync).data("flexslider"),
                    i = r.animatingTo;
                switch (t) {
                    case "animate":
                        n.flexAnimate(i, r.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        !n.playing && !n.asNav && n.play();
                        break;
                    case "pause":
                        n.pause()
                }
            },
            pauseInvisible: {
                visProp: null,
                init: function () {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++) e[t] + "Hidden" in document && (v.pauseInvisible.visProp = e[t] + "Hidden");
                    if (v.pauseInvisible.visProp) {
                        var n = v.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(n, function () {
                            v.pauseInvisible.isHidden() ? r.startTimeout ? clearTimeout(r.startTimeout) : r.pause() : r.started ? r.play() : r.vars.initDelay > 0 ? setTimeout(r.play, r.vars.initDelay) : r.play()
                        })
                    }
                },
                isHidden: function () {
                    return document[v.pauseInvisible.visProp] || !1
                }
            },
            setToClearWatchedEvent: function () {
                clearTimeout(f);
                f = setTimeout(function () {
                    a = ""
                }, 3e3)
            }
        };
        r.flexAnimate = function (t, n, s, u, a) {
            !r.vars.animationLoop && t !== r.currentSlide && (r.direction = t > r.currentSlide ? "next" : "prev");
            d && r.pagingCount === 1 && (r.direction = r.currentItem < t ? "next" : "prev");
            if (!r.animating && (r.canAdvance(t, a) || s) && r.is(":visible")) {
                if (d && u) {
                    var f = e(r.vars.asNavFor).data("flexslider");
                    r.atEnd = t === 0 || t === r.count - 1;
                    f.flexAnimate(t, !0, !1, !0, a);
                    r.direction = r.currentItem < t ? "next" : "prev";
                    f.direction = r.direction;
                    if (Math.ceil((t + 1) / r.visible) - 1 === r.currentSlide || t === 0) {
                        r.currentItem = t;
                        r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                        return !1
                    }
                    r.currentItem = t;
                    r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                    t = Math.floor(t / r.visible)
                }
                r.animating = !0;
                r.animatingTo = t;
                n && r.pause();
                r.vars.before(r);
                r.syncExists && !a && v.sync("animate");
                r.vars.controlNav && v.controlNav.active();
                h || r.slides.removeClass(i + "active-slide").eq(t).addClass(i + "active-slide");
                r.atEnd = t === 0 || t === r.last;
                r.vars.directionNav && v.directionNav.update();
                if (t === r.last) {
                    r.vars.end(r);
                    r.vars.animationLoop || r.pause()
                }
                if (!p) {
                    var m = l ? r.slides.filter(":first").height() : r.computedW,
                        g, y, b;
                    if (h) {
                        g = r.vars.itemMargin;
                        b = (r.itemW + g) * r.move * r.animatingTo;
                        y = b > r.limit && r.visible !== 1 ? r.limit : b
                    } else r.currentSlide === 0 && t === r.count - 1 && r.vars.animationLoop && r.direction !== "next" ? y = c ? (r.count + r.cloneOffset) * m : 0 : r.currentSlide === r.last && t === 0 && r.vars.animationLoop && r.direction !== "prev" ? y = c ? 0 : (r.count + 1) * m : y = c ? (r.count - 1 - t + r.cloneOffset) * m : (t + r.cloneOffset) * m;
                    r.setProps(y, "", r.vars.animationSpeed);
                    if (r.transitions) {
                        if (!r.vars.animationLoop || !r.atEnd) {
                            r.animating = !1;
                            r.currentSlide = r.animatingTo
                        }
                        r.container.unbind("webkitTransitionEnd transitionend");
                        r.container.bind("webkitTransitionEnd transitionend", function () {
                            r.wrapup(m)
                        })
                    } else r.container.animate(r.args, r.vars.animationSpeed, r.vars.easing, function () {
                        r.wrapup(m)
                    })
                } else if (!o) {
                    r.slides.eq(r.currentSlide).css({
                        zIndex: 1
                    }).animate({
                        opacity: 0
                    }, r.vars.animationSpeed, r.vars.easing);
                    r.slides.eq(t).css({
                        zIndex: 2
                    }).animate({
                        opacity: 1
                    }, r.vars.animationSpeed, r.vars.easing, r.wrapup)
                } else {
                    r.slides.eq(r.currentSlide).css({
                        opacity: 0,
                        zIndex: 1
                    });
                    r.slides.eq(t).css({
                        opacity: 1,
                        zIndex: 2
                    });
                    r.wrapup(m)
                }
                r.vars.smoothHeight && v.smoothHeight(r.vars.animationSpeed)
            }
        };
        r.wrapup = function (e) {
            !p && !h && (r.currentSlide === 0 && r.animatingTo === r.last && r.vars.animationLoop ? r.setProps(e, "jumpEnd") : r.currentSlide === r.last && r.animatingTo === 0 && r.vars.animationLoop && r.setProps(e, "jumpStart"));
            r.animating = !1;
            r.currentSlide = r.animatingTo;
            r.vars.after(r)
        };
        r.animateSlides = function () {
            !r.animating && m && r.flexAnimate(r.getTarget("next"))
        };
        r.pause = function () {
            clearInterval(r.animatedSlides);
            r.animatedSlides = null;
            r.playing = !1;
            r.vars.pausePlay && v.pausePlay.update("play");
            r.syncExists && v.sync("pause")
        };
        r.play = function () {
            r.playing && clearInterval(r.animatedSlides);
            r.animatedSlides = r.animatedSlides || setInterval(r.animateSlides, r.vars.slideshowSpeed);
            r.started = r.playing = !0;
            r.vars.pausePlay && v.pausePlay.update("pause");
            r.syncExists && v.sync("play")
        };
        r.stop = function () {
            r.pause();
            r.stopped = !0
        };
        r.canAdvance = function (e, t) {
            var n = d ? r.pagingCount - 1 : r.last;
            return t ? !0 : d && r.currentItem === r.count - 1 && e === 0 && r.direction === "prev" ? !0 : d && r.currentItem === 0 && e === r.pagingCount - 1 && r.direction !== "next" ? !1 : e === r.currentSlide && !d ? !1 : r.vars.animationLoop ? !0 : r.atEnd && r.currentSlide === 0 && e === n && r.direction !== "next" ? !1 : r.atEnd && r.currentSlide === n && e === 0 && r.direction === "next" ? !1 : !0
        };
        r.getTarget = function (e) {
            r.direction = e;
            return e === "next" ? r.currentSlide === r.last ? 0 : r.currentSlide + 1 : r.currentSlide === 0 ? r.last : r.currentSlide - 1
        };
        r.setProps = function (e, t, n) {
            var i = function () {
                var n = e ? e : (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo,
                    i = function () {
                        if (h) return t === "setTouch" ? e : c && r.animatingTo === r.last ? 0 : c ? r.limit - (r.itemW + r.vars.itemMargin) * r.move * r.animatingTo : r.animatingTo === r.last ? r.limit : n;
                        switch (t) {
                            case "setTotal":
                                return c ? (r.count - 1 - r.currentSlide + r.cloneOffset) * e : (r.currentSlide + r.cloneOffset) * e;
                            case "setTouch":
                                return c ? e : e;
                            case "jumpEnd":
                                return c ? e : r.count * e;
                            case "jumpStart":
                                return c ? r.count * e : e;
                            default:
                                return e
                        }
                    }();
                return i * -1 + "px"
            }();
            if (r.transitions) {
                i = l ? "translate3d(0," + i + ",0)" : "translate3d(" + i + ",0,0)";
                n = n !== undefined ? n / 1e3 + "s" : "0s";
                r.container.css("-" + r.pfx + "-transition-duration", n)
            }
            r.args[r.prop] = i;
            (r.transitions || n === undefined) && r.container.css(r.args)
        };
        r.setup = function (t) {
            if (!p) {
                var n, s;
                if (t === "init") {
                    r.viewport = e('<div class="' + i + 'viewport"></div>').css({
                        overflow: "hidden",
                        position: "relative"
                    }).appendTo(r).append(r.container);
                    r.cloneCount = 0;
                    r.cloneOffset = 0;
                    if (c) {
                        s = e.makeArray(r.slides).reverse();
                        r.slides = e(s);
                        r.container.empty().append(r.slides)
                    }
                }
                if (r.vars.animationLoop && !h) {
                    r.cloneCount = 2;
                    r.cloneOffset = 1;
                    t !== "init" && r.container.find(".clone").remove();
                    r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))
                }
                r.newSlides = e(r.vars.selector, r);
                n = c ? r.count - 1 - r.currentSlide + r.cloneOffset : r.currentSlide + r.cloneOffset;
                if (l && !h) {
                    r.container.height((r.count + r.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
                    setTimeout(function () {
                        r.newSlides.css({
                            display: "block"
                        });
                        r.doMath();
                        r.viewport.height(r.h);
                        r.setProps(n * r.h, "init")
                    }, t === "init" ? 100 : 0)
                } else {
                    r.container.width((r.count + r.cloneCount) * 200 + "%");
                    r.setProps(n * r.computedW, "init");
                    setTimeout(function () {
                        r.doMath();
                        r.newSlides.css({
                            width: r.computedW,
                            "float": "left",
                            display: "block"
                        });
                        r.vars.smoothHeight && v.smoothHeight()
                    }, t === "init" ? 100 : 0)
                }
            } else {
                r.slides.css({
                    width: "100%",
                    "float": "left",
                    marginRight: "-100%",
                    position: "relative"
                });
                t === "init" && (o ? r.slides.css({
                    opacity: 0,
                    display: "block",
                    webkitTransition: "opacity " + r.vars.animationSpeed / 1e3 + "s ease",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    opacity: 1,
                    zIndex: 2
                }) : r.slides.css({
                    opacity: 0,
                    display: "block",
                    zIndex: 1
                }).eq(r.currentSlide).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, r.vars.animationSpeed, r.vars.easing));
                r.vars.smoothHeight && v.smoothHeight()
            }
            h || r.slides.removeClass(i + "active-slide").eq(r.currentSlide).addClass(i + "active-slide")
        };
        r.doMath = function () {
            var e = r.slides.first(),
                t = r.vars.itemMargin,
                n = r.vars.minItems,
                i = r.vars.maxItems;
            r.w = r.viewport === undefined ? r.width() : r.viewport.width();
            r.h = e.height();
            r.boxPadding = e.outerWidth() - e.width();
            if (h) {
                r.itemT = r.vars.itemWidth + t;
                r.minW = n ? n * r.itemT : r.w;
                r.maxW = i ? i * r.itemT - t : r.w;
                r.itemW = r.minW > r.w ? (r.w - t * (n - 1)) / n : r.maxW < r.w ? (r.w - t * (i - 1)) / i : r.vars.itemWidth > r.w ? r.w : r.vars.itemWidth;
                r.visible = Math.floor(r.w / r.itemW);
                r.move = r.vars.move > 0 && r.vars.move < r.visible ? r.vars.move : r.visible;
                r.pagingCount = Math.ceil((r.count - r.visible) / r.move + 1);
                r.last = r.pagingCount - 1;
                r.limit = r.pagingCount === 1 ? 0 : r.vars.itemWidth > r.w ? r.itemW * (r.count - 1) + t * (r.count - 1) : (r.itemW + t) * r.count - r.w - t
            } else {
                r.itemW = r.w;
                r.pagingCount = r.count;
                r.last = r.count - 1
            }
            r.computedW = r.itemW - r.boxPadding
        };
        r.update = function (e, t) {
            r.doMath();
            if (!h) {
                e < r.currentSlide ? r.currentSlide += 1 : e <= r.currentSlide && e !== 0 && (r.currentSlide -= 1);
                r.animatingTo = r.currentSlide
            }
            if (r.vars.controlNav && !r.manualControls)
                if (t === "add" && !h || r.pagingCount > r.controlNav.length) v.controlNav.update("add");
                else if (t === "remove" && !h || r.pagingCount < r.controlNav.length) {
                if (h && r.currentSlide > r.last) {
                    r.currentSlide -= 1;
                    r.animatingTo -= 1
                }
                v.controlNav.update("remove", r.last)
            }
            r.vars.directionNav && v.directionNav.update()
        };
        r.addSlide = function (t, n) {
            var i = e(t);
            r.count += 1;
            r.last = r.count - 1;
            l && c ? n !== undefined ? r.slides.eq(r.count - n).after(i) : r.container.prepend(i) : n !== undefined ? r.slides.eq(n).before(i) : r.container.append(i);
            r.update(n, "add");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.added(r)
        };
        r.removeSlide = function (t) {
            var n = isNaN(t) ? r.slides.index(e(t)) : t;
            r.count -= 1;
            r.last = r.count - 1;
            isNaN(t) ? e(t, r.slides).remove() : l && c ? r.slides.eq(r.last).remove() : r.slides.eq(t).remove();
            r.doMath();
            r.update(n, "remove");
            r.slides = e(r.vars.selector + ":not(.clone)", r);
            r.setup();
            r.vars.removed(r)
        };
        v.init()
    };
    e(window).blur(function (e) {
        focused = !1
    }).focus(function (e) {
        focused = !0
    });
    e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !1,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {}
    };
    e.fn.flexslider = function (t) {
        t === undefined && (t = {});
        if (typeof t == "object") return this.each(function () {
            var n = e(this),
                r = t.selector ? t.selector : ".slides > li",
                i = n.find(r);
            if (i.length === 1 && t.allowOneSlide === !0 || i.length === 0) {
                i.fadeIn(400);
                t.start && t.start(n)
            } else n.data("flexslider") === undefined && new e.flexslider(this, t)
        });
        var n = e(this).data("flexslider");
        switch (t) {
            case "play":
                n.play();
                break;
            case "pause":
                n.pause();
                break;
            case "stop":
                n.stop();
                break;
            case "next":
                n.flexAnimate(n.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                n.flexAnimate(n.getTarget("prev"), !0);
                break;
            default:
                typeof t == "number" && n.flexAnimate(t, !0)
        }
    }
})(jQuery);
(function (e) {
    "use strict";
    e.fn.carousel = function (t) {
        var n, r;
        n = {
            infinite: !0,
            visible: 1,
            speed: "fast",
            overflow: !1,
            autoRotate: !1,
            navigation: e(this).data("navigation"),
            itemMinWidth: 0,
            itemEqualHeight: !1,
            itemMargin: 0,
            itemClassActive: "crsl-active",
            imageWideClass: "wide-image",
            carousel: !0
        };
        return e(this).each(function () {
            r = e(this);
            e.isEmptyObject(t) === !1 && e.extend(n, t);
            e.isEmptyObject(e(r).data("crsl")) === !1 && e.extend(n, e(r).data("crsl"));
            n.isTouch = "ontouchstart" in document.documentElement || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? !0 : !1;
            r.init = function () {
                n.total = e(r).find(".crsl-item").length;
                n.itemWidth = e(r).outerWidth();
                n.visibleDefault = n.visible;
                n.swipeDistance = null;
                n.swipeMinDistance = 100;
                n.startCoords = {};
                n.endCoords = {};
                e(r).css({
                    width: "100%"
                });
                e(r).find(".crsl-item").css({
                    position: "relative",
                    "float": "left",
                    overflow: "hidden",
                    height: "auto"
                });
                e(r).find("." + n.imageWideClass).each(function () {
                    e(this).css({
                        display: "block",
                        width: "100%",
                        height: "auto"
                    })
                });
                e(r).find(".crsl-item iframe").attr({
                    width: "100%"
                });
                n.carousel && e(r).find(".crsl-item:first-child").addClass(n.itemClassActive);
                n.carousel && n.infinite && n.visible < n.total && e(r).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r));
                n.overflow === !1 ? e(r).css({
                    overflow: "hidden"
                }) : e("html, body").css({
                    "overflow-x": "hidden"
                });
                e(r).trigger("initCarousel", [n, r]);
                r.testPreload();
                r.config();
                r.initRotate();
                r.triggerNavs()
            };
            r.testPreload = function () {
                if (e(r).find("img").length > 0) {
                    var t = e(r).find("img").length,
                        i = 1;
                    e(r).find("img").each(function () {
                        r.preloadImage(this, i, t);
                        i++
                    })
                } else e(r).trigger("loadedCarousel", [n, r])
            };
            r.preloadImage = function (t, i, s) {
                var o = new Image,
                    u = {};
                u.src = e(t).attr("src") !== undefined ? t.src : "";
                u.alt = e(t).attr("alt") !== undefined ? t.alt : "";
                e(o).attr(u);
                e(o).on("load", function () {
                    i === 1 && e(r).trigger("loadingImagesCarousel", [n, r]);
                    i === s && e(r).trigger("loadedImagesCarousel", [n, r])
                })
            };
            r.config = function () {
                n.itemWidth = Math.floor((e(r).outerWidth() - n.itemMargin * (n.visibleDefault - 1)) / n.visibleDefault);
                if (n.itemWidth <= n.itemMinWidth) {
                    n.visible = Math.floor((e(r).outerWidth() - n.itemMargin * (n.visible - 1)) / n.itemMinWidth) === 1 ? Math.floor(e(r).outerWidth() / n.itemMinWidth) : Math.floor((e(r).outerWidth() - n.itemMargin) / n.itemMinWidth);
                    n.visible = n.visible < 1 ? 1 : n.visible;
                    n.itemWidth = n.visible === 1 ? Math.floor(e(r).outerWidth()) : Math.floor((e(r).outerWidth() - n.itemMargin * (n.visible - 1)) / n.visible)
                } else n.visible = n.visibleDefault;
                if (n.carousel) {
                    r.wrapWidth = Math.floor((n.itemWidth + n.itemMargin) * n.total);
                    r.wrapMargin = r.wrapMarginDefault = n.infinite && n.visible < n.total ? parseInt((n.itemWidth + n.itemMargin) * -1, 10) : 0;
                    if (n.infinite && n.visible < n.total && e(r).find(".crsl-item." + n.itemClassActive).index() === 0) {
                        e(r).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r));
                        r.wrapMargin = r.wrapMarginDefault = parseInt((n.itemWidth + n.itemMargin) * -1, 10)
                    }
                    e(r).find(".crsl-wrap").css({
                        width: r.wrapWidth + "px",
                        marginLeft: r.wrapMargin
                    })
                } else {
                    r.wrapWidth = e(r).outerWidth();
                    e(r).find(".crsl-wrap").css({
                        width: r.wrapWidth + n.itemMargin + "px"
                    });
                    e("#" + n.navigation).hide()
                }
                e(r).find(".crsl-item").css({
                    width: n.itemWidth + "px",
                    marginRight: n.itemMargin + "px"
                });
                r.equalHeights();
                if (n.carousel)
                    if (n.visible >= n.total) {
                        n.autoRotate = !1;
                        e("#" + n.navigation).hide()
                    } else e("#" + n.navigation).show()
            };
            r.equalHeights = function () {
                if (n.itemEqualHeight !== !1) {
                    var t = 0;
                    e(r).find(".crsl-item").each(function () {
                        e(this).css({
                            height: "auto"
                        });
                        e(this).outerHeight() > t && (t = e(this).outerHeight())
                    });
                    e(r).find(".crsl-item").css({
                        height: t + "px"
                    })
                }
                return !0
            };
            r.initRotate = function () {
                n.autoRotate !== !1 && (r.rotateTime = window.setInterval(function () {
                    r.rotate()
                }, n.autoRotate))
            };
            r.triggerNavs = function () {
                e("#" + n.navigation).delegate(".previous, .next", "click", function (t) {
                    t.preventDefault();
                    r.prepareExecute();
                    if (e(this).hasClass("previous") && r.testPrevious(r.itemActive)) r.previous();
                    else {
                        if (!e(this).hasClass("next") || !r.testNext()) return;
                        r.next()
                    }
                })
            };
            r.prepareExecute = function () {
                n.autoRotate && clearInterval(r.rotateTime);
                r.preventAnimateEvent();
                r.itemActive = e(r).find(".crsl-item." + n.itemClassActive);
                return !0
            };
            r.preventAnimateEvent = function () {
                if (e(r).find(".crsl-wrap:animated").length > 0) return !1
            };
            r.rotate = function () {
                r.preventAnimateEvent();
                r.itemActive = e(r).find(".crsl-item." + n.itemClassActive);
                r.next();
                return !0
            };
            r.testPrevious = function (t) {
                return e(".crsl-wrap", r).find(".crsl-item").index(t) > 0
            };
            r.testNext = function () {
                return !n.infinite && r.wrapWidth >= (n.itemWidth + n.itemMargin) * (n.visible + 1) - r.wrapMargin || n.infinite
            };
            r.previous = function () {
                r.wrapMargin = n.infinite ? r.wrapMarginDefault + e(r.itemActive).outerWidth(!0) : r.wrapMargin + e(r.itemActive).outerWidth(!0);
                var t = e(r.itemActive).index(),
                    i = e(r.itemActive).prev(".crsl-item"),
                    s = "previous";
                e(r).trigger("beginCarousel", [n, r, s]);
                e(r).find(".crsl-wrap").animate({
                    marginLeft: r.wrapMargin + "px"
                }, n.speed, function () {
                    e(r.itemActive).removeClass(n.itemClassActive);
                    e(i).addClass(n.itemClassActive);
                    if (n.infinite) e(this).css({
                        marginLeft: r.wrapMarginDefault
                    }).find(".crsl-item:first-child").before(e(".crsl-item:last-child", r));
                    else {
                        r.testPrevious(i) === !1 && e("#" + n.navigation).find(".previous").addClass("previous-inactive");
                        r.testNext() && e("#" + n.navigation).find(".next").removeClass("next-inactive")
                    }
                    e(this).trigger("endCarousel", [n, r, s])
                })
            };
            r.next = function () {
                r.wrapMargin = n.infinite ? r.wrapMarginDefault - e(r.itemActive).outerWidth(!0) : r.wrapMargin - e(r.itemActive).outerWidth(!0);
                var t = e(r.itemActive).index(),
                    i = e(r.itemActive).next(".crsl-item"),
                    s = "next";
                e(r).trigger("beginCarousel", [n, r, s]);
                e(r).find(".crsl-wrap").animate({
                    marginLeft: r.wrapMargin + "px"
                }, n.speed, function () {
                    e(r.itemActive).removeClass(n.itemClassActive);
                    e(i).addClass(n.itemClassActive);
                    if (n.infinite) e(this).css({
                        marginLeft: r.wrapMarginDefault
                    }).find(".crsl-item:last-child").after(e(".crsl-item:first-child", r));
                    else {
                        r.testPrevious(i) && e("#" + n.navigation).find(".previous").removeClass("previous-inactive");
                        r.testNext() === !1 && e("#" + n.navigation).find(".next").addClass("next-inactive")
                    }
                    e(this).trigger("endCarousel", [n, r, s])
                })
            };
            var i = !1,
                s;
            e(window).on("mouseleave", function (t) {
                t.target ? s = t.target : t.srcElement && (s = t.srcElement);
                e(r).attr("id") && e(s).parents(".crsl-items").attr("id") === e(r).attr("id") || e(s).parents(".crsl-items").data("navigation") === e(r).data("navigation") ? i = !0 : i = !1;
                return !1
            });
            e(window).on("keydown", function (e) {
                if (i === !0)
                    if (e.keyCode === 37) {
                        r.prepareExecute();
                        r.previous()
                    } else if (e.keyCode === 39) {
                    r.prepareExecute();
                    r.next()
                }
                return
            });
            n.isTouch && e(r).on("touchstart", function (t) {
                e(r).addClass("touching");
                n.startCoords = t.originalEvent.targetTouches[0];
                n.endCoords = t.originalEvent.targetTouches[0];
                e(".touching").on("touchmove", function (e) {
                    n.endCoords = e.originalEvent.targetTouches[0];
                    if (Math.abs(parseInt(n.endCoords.pageX - n.startCoords.pageX, 10)) > Math.abs(parseInt(n.endCoords.pageY - n.startCoords.pageY, 10))) {
                        e.preventDefault();
                        e.stopPropagation()
                    }
                })
            }).on("touchend", function (t) {
                t.preventDefault();
                t.stopPropagation();
                n.swipeDistance = n.endCoords.pageX - n.startCoords.pageX;
                n.swipeDistance >= n.swipeMinDistance ? r.previous() : n.swipeDistance <= -n.swipeMinDistance && r.next();
                e(".touching").off("touchmove").removeClass("touching")
            });
            e(r).on("loadedCarousel loadedImagesCarousel", function () {
                r.equalHeights()
            });
            e(window).on("carouselResizeEnd", function () {
                n.itemWidth !== e(r).outerWidth() && r.config()
            });
            e(window).ready(function () {
                e(r).trigger("prepareCarousel", [n, r]);
                r.init();
                e(window).on("resize", function () {
                    this.carouselResizeTo && clearTimeout(this.carouselResizeTo);
                    this.carouselResizeTo = setTimeout(function () {
                        e(this).trigger("carouselResizeEnd")
                    }, 10)
                })
            });
            e(window).load(function () {
                r.testPreload();
                r.config()
            })
        })
    }
})(jQuery);
! function () {
    function e(e) {
        return "<style>" + e.selector + "{width:90px;height:20px}" + e.selector + " [class*=entypo-]:before{font-family:entypo,sans-serif}" + e.selector + " label{font-size:16px;cursor:pointer;margin:0;padding:5px 10px;border-radius:5px;background:" + e.button_background + ";color:" + e.button_color + ";-webkit-transition:all .3s ease;transition:all .3s ease}" + e.selector + " label:hover{opacity:.8}" + e.selector + " label span{text-transform:uppercase;font-size:.9em;font-family:Lato,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;padding-left:6px}" + e.selector + " .social{-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);opacity:0;-webkit-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}" + e.selector + " .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease}" + e.selector + " .social.active.center{margin-left:-45px}" + e.selector + " .social.active.left{margin-left:-115px}" + e.selector + " .social.active.right{margin-left:10px}" + e.selector + " .social.active.top{-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px)}" + e.selector + " .social.active.top.center ul:after{margin:35px auto;border-top:20px solid #3b5998}" + e.selector + " .social.active.top.left ul:after{margin:35px 0 0 129px;border-top:20px solid #e34429}" + e.selector + " .social.active.top.right ul:after{margin:35px 0 0 10px;border-top:20px solid #6cdfea}" + e.selector + " .social.active.bottom{-webkit-transform:scale(1) translateY(45px);-ms-transform:scale(1) translateY(45px);transform:scale(1) translateY(45px);margin-top:-14px}" + e.selector + " .social.active.bottom.center ul:after{margin:-10px auto;border-bottom:20px solid #3b5998}" + e.selector + " .social.active.bottom.left ul:after{margin:-10px 0 0 129px;border-bottom:20px solid #e34429}" + e.selector + " .social.active.bottom.right ul:after{margin:-10px 0 0 10px;border-bottom:20px solid #6cdfea}" + e.selector + " .social ul{position:relative;left:0;right:0;width:180px;height:46px;color:#fff;background:#3b5998;margin:auto;padding:0;list-style:none}" + e.selector + " .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-transition:all .3s ease;transition:all .3s ease}" + e.selector + " .social ul li:hover{color:rgba(0,0,0,.5)}" + e.selector + " .social ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent}" + e.selector + " .social li[class*=twitter]{background:#6cdfea;padding:12px 0}" + e.selector + " .social li[class*=gplus]{background:#e34429;padding:12px 0}</style>"
    }
    var t;
    t = jQuery;
    t.fn.share = function (n) {
        var r, i;
        if (t(this).length === 0) {
            console.log("Share Button: No elements found.");
            return
        }
        i = t("head");
        r = t("body");
        return t(this).each(function (i, s) {
            var o, u, a, f, l, c, h, p, d, v, m, g = this;
            o = t(this);
            o.addClass("sharer-" + i);
            o.hide();
            n == null && (n = {});
            c = {};
            c.url = n.url || window.location.href;
            c.text = n.text || t('meta[property="og:description"]').attr("content") || t('meta[name="twitter:description"]').attr("content") || t('meta[name="description"]').attr("content") || "";
            c.title = n.title || t('meta[property="og:title"]').attr("content") || t('meta[name="twitter:title"]').attr("content");
            c.image = n.image || t('meta[property="og:image"]').attr("content") || t('meta[name="twitter:image"]').attr("content");
            c.app_id = n.app_id;
            c.flyout = n.flyout || "top center";
            c.text_font = typeof n.text_font == "boolean" ? n.text_font : !0;
            c.button_color = n.color || "#333";
            c.button_background = n.background || "#e1e1e1";
            c.button_icon = n.icon || "export";
            c.button_text = typeof n.button_text == "string" ? n.button_text : "Share";
            v = function (e, t) {
                return n[e] ? n[e][t] || c[t] : c[t]
            };
            c.twitter_url = v("twitter", "url");
            c.twitter_text = v("twitter", "text");
            c.fb_url = v("facebook", "url");
            c.fb_title = v("facebook", "title");
            c.fb_caption = v("facebook", "caption");
            c.fb_text = v("facebook", "text");
            c.fb_image = v("facebook", "image");
            c.gplus_url = v("gplus", "url");
            c.selector = "." + o.attr("class").split(" ").join(".");
            c.twitter_text = encodeURIComponent(c.twitter_text);
            typeof c.app_id == "integer" && (c.app_id = c.app_id.toString());
            c.protocol = n.protocol || (["http", "https"].indexOf(window.location.href.split(":")[0]) === -1 ? "https://" : "//");
            t('link[href="https://www.sharebutton.co/fonts/v2/entypo.min.css"]').length || t("<link />").attr({
                rel: "stylesheet",
                href: "https://www.sharebutton.co/fonts/v2/entypo.min.css"
            }).appendTo(t("head"));
            t("meta[name='sharer" + c.selector + "']").length || t("head").append(e(c)).append("<meta name='sharer" + c.selector + "'>");
            c.text_font && (t('link[href="' + c.protocol + 'fonts.googleapis.com/css?family=Lato:900"]').length || t("<link />").attr({
                rel: "stylesheet",
                href: "" + c.protocol + "fonts.googleapis.com/css?family=Lato:900&text=" + c.button_text
            }).appendTo(t("head")));
            t(this).html("<label class='entypo-" + c.button_icon + "'><span>" + c.button_text + "</span></label><div class='social " + c.flyout + "'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>");
            !window.FB && c.app_id && t("#fb-root").length === 0 && r.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + c.protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + c.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>");
            d = {
                twitter: "http://twitter.com/intent/tweet?text=" + c.twitter_text + "&url=" + c.twitter_url,
                facebook: "https://www.facebook.com/sharer/sharer.php?u=" + c.fb_url,
                gplus: "https://plus.google.com/share?url=" + c.gplus_url
            };
            p = o.parent();
            a = p.find(".social");
            u = p.find("" + c.selector + " .social");
            m = function (e) {
                e.stopPropagation();
                return u.toggleClass("active")
            };
            h = function () {
                return u.addClass("active")
            };
            l = function () {
                return u.removeClass("active")
            };
            f = function () {
                var e, n;
                e = d[t(this).data("network")];
                if (t(this).data("network") === "facebook" && c.app_id) {
                    if (!window.FB) {
                        console.log("The Facebook JS SDK hasn't loaded yet.");
                        return
                    }
                    window.FB.ui({
                        method: "feed",
                        name: c.fb_title,
                        link: c.fb_url,
                        picture: c.fb_image,
                        caption: c.fb_caption,
                        description: c.fb_text
                    })
                } else {
                    n = {
                        width: 500,
                        height: 350
                    };
                    n.top = screen.height / 2 - n.height / 2;
                    n.left = screen.width / 2 - n.width / 2;
                    window.open(e, "targetWindow", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + n.left + ",top=" + n.top + ",width=" + n.width + ",height=" + n.height)
                }
                return !1
            };
            o.find("label").on("click", m);
            o.find("li").on("click", f);
            r.on("click", function () {
                return a.removeClass("active")
            });
            setTimeout(function () {
                return o.show()
            }, 250);
            return {
                toggle: m.bind(this),
                open: h.bind(this),
                close: l.bind(this),
                options: c,
                self: this
            }
        })
    }
}.call(this);
var svgeezy = function () {
    return {
        init: function (e, t) {
            this.avoid = e || !1;
            this.filetype = t || "png";
            this.svgSupport = this.supportsSvg();
            if (!this.svgSupport) {
                this.images = document.getElementsByTagName("img");
                this.imgL = this.images.length;
                this.fallbacks()
            }
        },
        fallbacks: function () {
            while (this.imgL--)
                if (!this.hasClass(this.images[this.imgL], this.avoid) || !this.avoid) {
                    var e = this.images[this.imgL].getAttribute("src");
                    if (e === null) continue;
                    if (this.getFileExt(e) == "svg") {
                        var t = e.replace(".svg", "." + this.filetype);
                        this.images[this.imgL].setAttribute("src", t)
                    }
                }
        },
        getFileExt: function (e) {
            var t = e.split(".").pop();
            t.indexOf("?") !== -1 && (t = t.split("?")[0]);
            return t
        },
        hasClass: function (e, t) {
            return (" " + e.className + " ").indexOf(" " + t + " ") > -1
        },
        supportsSvg: function () {
            var e = navigator.userAgent.toLowerCase();
            ieV = e.indexOf("msie") != -1 ? parseInt(e.split("msie")[1]) : !1;
            return ieV == 9 ? !1 : document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }
    }
}();