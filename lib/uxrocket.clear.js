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
	var Clear = function(el, options){
		var opts = $.extend({}, defaults, options, $(el).data()),
			$el = $(el);

        opts.button = '<a class="uxitd-clear-icon hide ' + opts.cssClass + '"></a>';
		opts.visible = false;

        $el.data('opts', opts);

        // set plugin layout for ease of usage
        setLayout($el, opts);

        // call onReady function if any
        callback(opts.onReady);

        // bind the ui interactions
        bindUIActions($el, opts);
	};

    var setLayout = function($el, opts){
        var columns = '';

        columns = ' ' + $el.context.className;

        if($el.parent().is('.uxitd-plugin-wrap')){
            $el.parent().addClass('uxitd-clear-wrap' + columns);
        }
        else {
            $el.wrap('<span class="uxitd-plugin-wrap uxitd-clear-wrap' + columns + '"></span>');
        }

        $el.after(opts.button);

        if($el.val() !== ''){
            $el.next('.uxitd-clear-icon').show();
            opts.visible = true;
        }
    };

    var bindUIActions = function($el, opts){
        var $button = $el.next('.uxitd-clear-icon');

        $el.on('keyup focus input', function(){
            if(opts.visible === false){
                $button.show();
                opts.visible = true;
            }

            if($(this).val() === ''){
                $button.hide();
                opts.visible = false;
            }
        });

        $button.on('click', function(){
            $el.val('').blur();
            $button.hide();
            opts.visible = false;

            if(opts.clearAlso !== null) {
                $(opts.clearAlso).val('');
            }

            callback(opts.onClear);
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
		return this.each(function(){
			var $el = $(this),
				clear;

			if($el.hasClass('uxitd-clear-ready')){
				return;
			}

			$el.addClass('uxitd-clear-ready');

			clear = new Clear(this, options);
		});
	};

	// version
	ux.version = "0.6.0";

	// settings
	ux.settings = defaults;
})(jQuery);