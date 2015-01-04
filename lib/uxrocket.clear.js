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
		};

    // constructor method
	var Clear = function(el, options, selector){
		var opts = $.extend({}, defaults, options, $(el).data(), {'selector': selector}),
			$el = $(el);

        opts.button = '<a class="uxitd-clear-icon hide ' + opts.cssClass + '"></a>';
		opts.visible = false;

        $el.data('uxClear', opts);

        // set plugin layout for ease of usage
        setLayout($el);

        // call onReady function if any
        callback(opts.onReady);

        // bind the ui interactions
        bindUIActions($el);
	};

    var setLayout = function($el){
        var columns = '',
			_opts = $el.data('uxClear');

        columns = ' ' + $el.context.className.replace('uxitd-clear-ready', '');
		
        if(_opts.selector.charAt(0) == '.') {
            columns = columns.replace(' ' + _opts.selector.substr(1), '');
        }

        if($el.parent().is('.uxitd-plugin-wrap')){
            $el.parent().addClass('uxitd-clear-wrap' + columns);
        }
        else {
            $el.wrap('<span class="uxitd-plugin-wrap uxitd-clear-wrap' + columns + '"></span>');
        }

        $el.after(_opts.button);

        if($el.val() !== ''){
            $el.next('.uxitd-clear-icon').show();
            _opts.visible = true;
        }
		
		$el.data('uxClear', _opts);
    };

    var bindUIActions = function($el){
        var $button = $el.next('.uxitd-clear-icon'),
			_opts   = $el.data('uxClear');

        $el.on('keyup focus input', function(){
            if(_opts.visible === false){
                $button.show();
                _opts.visible = true;
            }

            if($(this).val() === ''){
                $button.hide();
                _opts.visible = false;
            }
        });

        $button.on('click', function(){
            $el.val('').blur();
            $button.hide();
            _opts.visible = false;

            if(_opts.clearAlso !== null) {
                $(_opts.clearAlso).val('');
            }

            callback(_opts.onClear);
        });
		
		$el.data('uxClear', _opts);
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
				uxrocket = $el.data('uxRocket') || {},
				clear;

			if($el.hasClass('uxitd-clear-ready') || $el.hasClass('uxitd-plugin-wrap')){
				return;
			}

			$el.addClass('uxitd-clear-ready');
			
            uxrocket['uxClear'] = {'hasWrapper': true, 'wrapper': 'uxitd-clear-wrap', 'ready': 'uxitd-clear-ready', 'selector': selector, 'options': options};

            $el.data('uxRocket', uxrocket);

			clear = new Clear(this, options, selector);
		});
	};

	// version
	ux.version = "0.7.2b";

	// settings
	ux.settings = defaults;
})(jQuery);
