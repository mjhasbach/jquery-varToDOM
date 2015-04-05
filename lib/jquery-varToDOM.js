(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.$);
    }
}(this, function($) {
    var $keyValDiv = $('<div>').css('display', 'inline-block'),
        createLine = function(opt) {
            var indentation = opt.vtdOpt.indentation * opt.vtdOpt.indentationPadding,
                $line = $('<div>').css('white-space', 'nowrap'),
                $key = $keyValDiv
                    .clone()
                    .addClass('key')
                    .css('padding-left', indentation)
                    .text(opt.key + ':'),
                $val = $keyValDiv
                    .clone()
                    .text(opt.beginCollection ? opt.beginCollection : opt.endCollection ? opt.endCollection : opt.val);

            if (opt.beginCollection == '{' || opt.endCollection == '}') {
                $val.addClass('object');
            }
            else if (opt.beginCollection == '[' || opt.endCollection == ']') {
                $val.addClass('array');
            }

            if ($.type(opt.val) == 'boolean') {
                $val.addClass('boolean');
            }
            else if ($.type(opt.val) == 'string') {
                $val.addClass('string')
                    .text('"' + $val.text() + '"');
            }
            else if ($.isNumeric(opt.val)) {
                $val.addClass('number');
            }

            if (opt.key == null || $.type(opt.endCollection) == 'string') {
                $val.css('padding-left', indentation);
            }
            else {
                $line.append($key);
                $val.css('padding-left', opt.vtdOpt.keyValPadding);
            }

            $line.append($val);

            return $line;
        },
        processCollection = function($el, key, val, opt) {
            var isObject = $.isPlainObject(val);

            if (isObject || $.isArray(val)) {
                if (isObject) {
                    $el.append(createLine({key: key, vtdOpt: opt, beginCollection: '{'}));
                }
                else {
                    $el.append(createLine({key: key, vtdOpt: opt, beginCollection: '['}));

                    val = $.extend({}, val);
                }

                $el.varToDOM(
                    $.extend({}, opt, {
                        var: val,
                        indentation: opt.indentation + 1,
                        _timesNested: opt._timesNested + 1,
                        onComplete: function() {
                            $el.append(createLine({vtdOpt: opt, endCollection: isObject ? '}' : ']'}));
                        }
                    })
                );
            }
            else {
                $el.append(createLine({key: key, val: val, vtdOpt: opt}));
            }
        };

    $.fn.varToDOM = function(opt) {
        var $el = $(this);

        if (!$el.length) {
            throw new TypeError('Cannot run varToDOM on an empty jQuery object');
        }
        if (!$.isPlainObject(opt)) {
            throw new TypeError('varToDOM must be supplied an options object');
        }
        if (opt.var === undefined) {
            throw new TypeError('The varToDOM options object must have a var property');
        }
        if (opt.indentation !== undefined && !$.isNumeric(opt.indentation)) {
            throw new TypeError('The varToDOM indentation level must be numeric');
        }
        if (opt.indentationPadding !== undefined && !$.isNumeric(opt.indentationPadding)) {
            throw new TypeError('The varToDOM indentation padding must be numeric');
        }
        if (opt.keyValPadding !== undefined && !$.isNumeric(opt.keyValPadding)) {
            throw new TypeError('The varToDOM key / value padding must be numeric');
        }
        if (opt.onComplete !== undefined && !$.isFunction(opt.onComplete)) {
            throw new TypeError('varToDOM onComplete must be a function');
        }

        if (!$.isNumeric(opt.indentation)) {
            opt.indentation = 0;
        }
        if (!$.isNumeric(opt.indentationPadding)) {
            opt.indentationPadding = 20;
        }
        if (!$.isNumeric(opt.keyValPadding)) {
            opt.keyValPadding = 10;
        }
        if (!$.isNumeric(opt._timesNested)) {
            opt._timesNested = 0;
        }

        if ($.isPlainObject(opt.var) || $.isArray(opt.var)) {
            if (opt._timesNested === 0) {
                processCollection($el, null, opt.var, opt);
            }
            else {
                $.each(opt.var, function(key, val) {
                    processCollection($el, key, val, opt);
                });
            }
        }
        else {
            $el.append(createLine({key: null, val: opt.var, vtdOpt: opt}));
        }

        if ($.isFunction(opt.onComplete)) {
            opt.onComplete();
        }
    };
}));