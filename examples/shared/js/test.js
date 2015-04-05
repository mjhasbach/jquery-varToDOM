(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'varToDOM'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory(require('jquery', 'varToDOM'));
    } else {
        factory(root.$);
    }
}(this, function($) {
    var test = {
        initBody: function() {
            var $header = $('<div>').addClass('header'),
                $varToDOM = $('<div>').addClass('varToDOM'),
                objectToDOM2Text = 'Object (with more initial indentation, more padding ' +
                    'per indentation, and more padding in between keys and values)';

            $('body')
                .append($header.clone().text('String'))
                .append($varToDOM.clone().attr('id', 'stringToDom'))
                .append($header.clone().text('Boolean'))
                .append($varToDOM.clone().attr('id', 'booleanToDom'))
                .append($header.clone().text('Number'))
                .append($varToDOM.clone().attr('id', 'numberToDom'))
                .append($header.clone().text('Object'))
                .append($varToDOM.clone().attr('id', 'objectToDOM'))
                .append($header.clone().text(objectToDOM2Text))
                .append($varToDOM.clone().attr('id', 'objectToDOM2'))
                .append($header.clone().text('Array'))
                .append($varToDOM.clone().attr('id', 'arrayToDom'));

            return this;
        },
        initVarToDOM: function() {
            var obj = {
                burger: {
                    delicious: true,
                    price: 6.59,
                    ingredients: ['bun', 'beef', 'cheese', 'lettuce', 'tomato', 'onion'],
                    condiments: ['ketchup', 'mayonnaise', 'mustard']
                }
            };

            $('#stringToDom').varToDOM({var: 'East of Eden'});

            $('#booleanToDom').varToDOM({var: true});

            $('#numberToDom').varToDOM({var: 1337});

            $('#objectToDOM').varToDOM({var: obj});

            $('#objectToDOM2').varToDOM({
                indentation: 1,
                indentationPadding: 60,
                keyValPadding: 40,
                var: obj
            });

            $('#arrayToDom').varToDOM({
                onComplete: function() {
                    console.log('Done!');
                },
                var: [
                    1.61803398875,
                    'Liber Abaci',
                    [
                        'closest rational approximations',
                        'golden ratio',
                        'consecutive quotients',
                        'combinatorial identities'
                    ],
                    {F0: 0, F1: 1, F2: 1, F3: 2, F4: 3, F5: 5, F6: 8, F7: 13}
                ]
            });

            return this;
        }
    };

    $(function() {
        document.title = "jquery-varToDOM Test";

        test.initBody()
            .initVarToDOM();
    })
}));