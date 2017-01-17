/**
 * UX Rocket
 * jQuery based clear input/textarea action handler
 * @author Bilal Cinarli
 */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    'use strict';

    var ux, // local shorthand
        i = 1,
        rocketName = 'uxrClear',

        defaults = {
            icon: 'icon-cross',
            clearAlso: null,

            // callbacks
            onReady: false,
            onClear: false,
            onUpdate: false,
            onRemove: false
        },
        events = {
            click: 'click.' + rocketName,
            focus: 'focus.' + rocketName,
            input: 'input.' + rocketName,
            keyup: 'keyup.' + rocketName,
            paste: 'paste.' + rocketName
        },
        ns = {
            prefix: 'uxr-',
            rocket: 'uxRocket',
            data: rocketName,
            name: 'clear',
            wrap: 'uxr-plugin-wrap',
            classes: {
                wrap: 'wrap',
                ready: 'ready',
                icon: 'icon',
                visible: 'icon-visible'
            }
        };

    // Constructor Method
    var Clear = function(el, options, selector) {
        var $el = $(el);

        this._instance = i;
        this._name = rocketName;
        this._defaults = defaults;

        this.el = el;
        this.$el = $el;

        this.selector = selector;
        this.options = $.extend(true, {}, defaults, options, $el.data());

        i++;

        this.init();
    };

    $.extend(Clear.prototype, {
        init: function() {
            var uxrocket = this.$el.data(ns.rocket) || {};

            // add ready class
            this.$el.addClass(utils.getClassname('ready'));

            // register plugin data to rocket
            uxrocket[ns.data] = {
                hasWrapper: true,
                wrapper: ns.wrap,
                ready: utils.getClassname('ready'),
                selector: this.selector,
                options: this.options
            };
            this.$el.data(ns.rocket, uxrocket);

            // set plugin layout
            this.setLayout();

            if (this.$el.val().length > 0) {
                this.$el.parent().addClass(utils.getClassname('visible'));
            }

            utils.callback(this.options.onReady);

            this.bindUIActions();
        },
        handleClasses: function() {
            this.classList = this.$el.context.className.replace(utils.getClassname('ready'), '');

            if (this.selector.charAt(0) === '.') {
                this.classList = this.classList.replace(this.selector.substr(1), '');
            }

            this.classList += ns.wrap + ' ' + utils.getClassname('wrap') + ' ' + utils.getClassname('wrap') + '-' + this._instance;
            this.classList = $.trim(this.classList);
        },

        removeClasses: function() {
            this.$el.removeClass(utils.getClassname('ready'));
            this.$el.parent().removeClass(this.classList.replace(ns.wrap, ''));
        },

        handleWrapper: function() {
            this.$el.parent().is('.' + ns.wrap) ?
                this.$el.parent().addClass(this.classList) :
                this.$el.wrap('<span class="' + this.classList + '"></span>');
        },

        addIcon: function() {
            this.$el.after('<i class="' + utils.getClassname('icon') + '"></i>');
            this.$icon = this.$el.next('.' + utils.getClassname('icon'));
        },

        setLayout: function() {
            this.handleClasses();
            this.handleWrapper();
            this.addIcon();
        },

        removeLayout: function() {
            var _this = this,
                uxrocket = _this.$el.data(ns.rocket);

            // remove or reformat wrap
            if (Object.keys && Object.keys(uxrocket).length === 1) {
                _this.$el.unwrap();
            }

            else {
                _this.$el.parent().removeClass(ns.wrap);
            }

            _this.$el.next('.' + utils.getClassname('icon')).remove();
        },


        bindUIActions: function() {
            var _this = this;
            var pasted = false;

            _this.$el.on(events.keyup + ' ' + events.focus + ' ' + events.input, function() {
                _this.onKeyup();
            });

            _this.$el.siblings('.' + utils.getClassname('icon')).on(events.click, function(e) {
                _this.onClick(e);
            });

            _this.$el.on(events.paste, function() {
                pasted = true;
            });

            $('body').on('DOMNodeRemoved', function(e) {
                if (e.target === _this.el && !pasted) {
                    _this.cleanUp();
                } else {
                    pasted = false;
                }
            });
        },

        unbindUIActions: function() {
            this.$el.off('.' + rocketName);
        },

        onKeyup: function() {
            var _this = this;

            if (this.$el.val().length > 0) {
                _this.$el.parent().addClass(utils.getClassname('visible'));
            }
            else {
                _this.$el.parent().removeClass(utils.getClassname('visible'));
            }
        },

        onClick: function(e) {
            e.preventDefault();
            this.$el.val('').parent().removeClass(utils.getClassname('visible'));

            utils.callback(this.options.onClear);
        },

        update: function(options) {
            return ux.update(this.el, options);
        },

        destroy: function() {
            return ux.destroy(this.el);
        },

        // cleans wrapper, icons etc when element removed before plugin destroyed
        cleanUp: function() {
            $('.' + utils.getClassname('wrap') + '-' + this._instance).remove();
        }
    });

    var utils = {
        callback: function(fn) {
            // if callback string is function call it directly
            if (typeof fn === 'function') {
                fn.apply(this);
            }

            // if callback defined via data-attribute, call it via new Function
            else {
                if (fn !== false) {
                    var _fn = /([a-zA-Z._$0-9]+)(\(?(.*)?\))?/.exec(fn),
                        _fn_ns = _fn[1].split('.'),
                        _args = _fn[3] ? _fn[3] : '',
                        func = _fn_ns.pop(),
                        context = _fn_ns[0] ? window[_fn_ns[0]] : window;

                    for (var i = 1; i < _fn_ns.length; i++) {
                        context = context[_fn_ns[i]];
                    }

                    return context[func](_args);
                }
            }
        },

        getStringVariable: function(str) {
            var val;
            // check if it is chained
            if (str.indexOf('.') > -1) {
                var chain = str.split('.'),
                    chainVal = window[chain[0]];

                for (var i = 1; i < chain.length; i++) {
                    chainVal = chainVal[chain[i]];
                }

                val = chainVal;
            }

            else {
                val = window[str];
            }

            return val;
        },

        getClassname: function(which) {
            return ns.prefix + ns.name + '-' + ns.classes[which];
        }
    };


    ux = $.fn.clear = $.fn.uxrclear = $.uxrclear = function(options) {
        var selector = this.selector;

        return this.each(function() {
            if ($.data(this, ns.data)) {
                return;
            }

            // Bind the plugin and attach the instance to data
            $.data(this, ns.data, new Clear(this, options, selector));
        });
    };

    ux.update = function(el, options) {
        var $el, opts;

        // all elements will update according to new options
        if (typeof options === 'undefined' && typeof el === 'object') {
            $el = $('.' + utils.getClassname('ready'));
            opts = el;
        }
        else {
            $el = $(el);
            opts = options;
        }

        $el.filter('input').each(function() {
            var _this = $(this),
                _instance = _this.data(ns.data),
                _opts = _instance.options;

            // update new options
            _instance.options = $.extend(true, {}, _opts, opts);

            // use onUpdate callback from original options
            utils.callback(_opts.onUpdate);
        });
    };

    ux.destroy = function(el) {
        var $el = el !== undefined ? $(el) : $('.' + utils.getClassname('ready'));

        $el.filter('input').each(function() {
            var _this = $(this),
                _instance = _this.data(ns.data),
                _uxrocket = _this.data(ns.rocket);

            // remove ready class
            _instance.removeClasses();

            // remove plugin events
            _instance.unbindUIActions();

            // remove layout
            _instance.removeLayout();

            // remove plugin data
            _this.removeData(ns.data);

            // remove uxRocket registry
            delete _uxrocket[ns.data];
            _this.data(ns.rocket, _uxrocket);

            utils.callback(_instance.options.onRemove);
        });
    };

// version
    ux.version = '1.0.0';

// default settings
    ux.settings = defaults;
    ux.namespace = ns;
}));