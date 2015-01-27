/**
 * UX Rocket
 * jQuery based clear input/textarea action handler
 * @author Bilal Cinarli
 */

;(function($){
	var ux, // local shorthand

		defaults = {
			cssClass: 'icon-cross',
            clearAlso: null,

            // callbacks
            onReady: false,
            onClear: false
		},
		events = {
			keyup: 'keyup.uxClear',
			focus: 'focus.uxClear',
			input: 'input.uxClear',
			click: 'click.uxClear'
		},
		ns = {
			rocket	  : 'uxRocket',
			data  	  : 'uxClear',
			ready 	  : 'uxitd-clear-ready',
			rocketWrap: 'uxitd-plugin-wrap',
			wrap	  : 'uxitd-clear-wrap',
			icon	  : 'uxitd-clear-icon'
		};

    // constructor method
	var Clear = function(el, options, selector){
		var opts = $.extend({}, defaults, options, $(el).data(), {'selector': selector}),
			$el = $(el);

        opts.button = '<a class="' + ns.icon + ' hide ' + opts.cssClass + '"></a>';
		opts.visible = false;

        $el.data(ns.data, opts);

        // set plugin layout for ease of usage
        setLayout($el);

        // call onReady function if any
        callback(opts.onReady);

        // bind the ui interactions
        bindUIActions($el);
	};

    var setLayout = function($el){
        var columns = '',
			_opts = $el.data(ns.data);

        columns = ' ' + $el.context.className.replace(ns.data, '');
		
        if(_opts.selector.charAt(0) == '.') {
            columns = columns.replace(' ' + _opts.selector.substr(1), '');
        }

        if($el.parent().is('.' + ns.rocketWrap)){
            $el.parent().addClass(ns.wrap + columns);
        }
        else {
            $el.wrap('<span class="' + ns.rocketWrap + ' ' + ns.wrap + columns + '"></span>');
        }

        $el.after(_opts.button);

        if($el.val() !== ''){
            $el.next('.' + ns.icon).show();
            _opts.visible = true;
			$el.data(data, _opts);
        }
    };

    var bindUIActions = function($el){
        var $button = $el.next('.' + ns.icon),
			_opts   = $el.data(ns.data);

        $el.on(events.keyup + ' ' + events.focus + ' ' + events.input, function(){
            if(_opts.visible === false){
                $button.show();
                _opts.visible = true;
            }

            if($(this).val() === ''){
                $button.hide();
                _opts.visible = false;
            }
			
			$el.data(ns.data, _opts);
        });

        $button.on(events.click, function(){
            $el.val('').blur();
            $button.hide();
            _opts.visible = false;

            if(_opts.clearAlso !== null) {
                $(_opts.clearAlso).val('');
            }

			$el.data(ns.data, _opts);
            callback(_opts.onClear);
        });
    };

    // global callback
    var callback = function(fn){
        // if callback string is function call it directly
        if(typeof fn === 'function'){
            call(fn);
        }

        // if callback defined via data-attribute, call it via new Function
        else {
            if(fn !== false){
                var func = new Function('return ' + fn);
                func();
            }
        }
    };

	// jquery binding
	ux = $.fn.clear = $.uxclear = function(options){
        var selector = this.selector;
		
		return this.each(function(){
			var $el = $(this),
				uxrocket = $el.data(ns.rocket) || {},
				clear;

			if($el.hasClass(ns.ready) || $el.hasClass(ns.rocketWrap)){
				return;
			}

			$el.addClass(ns.ready);
			
            uxrocket[ns.data] = {'hasWrapper': true, 'wrapper': ns.wrap, 'ready': ns.ready, 'selector': selector, 'options': options};

            $el.data(ns.rocket, uxrocket);

			clear = new Clear(this, options, selector);
		});
	};

	// version
	ux.version = "0.8.0";

	// settings
	ux.settings = defaults;
})(jQuery);
