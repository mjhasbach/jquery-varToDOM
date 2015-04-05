# jquery-varToDOM

## Description
A jQuery plugin for rendering variables to the DOM. Supports nested objects and arrays. Browser, RequireJS, and CommonJS environments are supported.

## API
####$.varToDOM(```opt```)

Render a variable to the DOM.

* object `opt` - An options object
 * string|number|boolean|array|object `var` - The variable to be rendered
 * number `indentation` - (Optional) The initial indentation level. Defaults to 0.
 * number `indentationPadding` - (Optional) The amount of padding per indentation. Defaults to 20px.
 * number `valPadding` - (Optional) The amount of padding in between each key and value. Defaults to 10px.
 * function `onComplete` - (Optional) A function to be executed after the variable is rendered

__Example__

```
$('body').varToDOM({
    indentation: 1,
    indentationPadding: 50,
    valPadding: 30,
    var: {
        burger: {
            delicious: true,
            price: 6.59,
            ingredients: ['bun', 'beef', 'cheese', 'lettuce', 'tomato', 'onion'],
            condiments: ['ketchup', 'mayonnaise', 'mustard']
        }
    },
    onComplete: function() {
        console.log('Done!');
    }
});
```

## Installation
#### Npm
```
npm install jquery-vartodom --save
```
#### Bower
```
bower install jquery-vartodom --save
```

## Examples
Before running any of the examples, the dependencies must be downloaded:
```
cd examples/shared && npm install
```
[Browser Examples](https://github.com/mjhasbach/jquery-varToDOM/tree/master/examples/browser)

[RequireJS Examples](https://github.com/mjhasbach/jquery-varToDOM/tree/master/examples/requirejs)