===========
@timkay/say
===========

.. image:: sayicon.png
  :width: 64
  :height: 64

**say** is a *template literal function* that makes logging
and debugging in JavaScript easier.

**say** provides a concise way to generate lines of output that

* Displays the file name and line number of the code that generated the output,
* Displays objects as JSON,
* Round numbers to 3 decimal places,
* Intelligently handles Error objects,
* When used with https://github.com/douglascrockford/JSON-js/blob/master/cycle.js, displays objects with cycles,
* Conditioanlly outputs lines based on logging categories

To get started, include say in your code.

Browser::

<script src="https://unpkg.com/@timkay/say"></script>

Node::

    npm install -g @timkay/say

JavaScript::

    const {say} = require('@timkay/say')
    const {say} = require('@timkay/say')

Usage Examples:

    const a = []
    const b = []
    b.push(b)
    a.push(a, b, [a])

            const pi = Math.PI
            say('>test')
            say `null=${null} ${{undefined}} ${{NaN}}`
            say `${{Infinity}} ${{NegativeInfinity: Number.NEGATIVE_INFINITY}}`
            say `${42} ${'bob'} array ${[3, 4, 5]}, ${{x: 5}}, ${{hello: 'hello, world'}} ${{pi}}`
            say `>>> ${{a}} <<<`
            say `>>> ${window} <<<`
            say `BigInt: ${BigInt(42)}`
            say `array of object of object: ${[3, {a: {b: {c: 42}}}]}`
            say `nonce> This is a conditional output`
            say `test> This is a conditional output`
            say `test> hello`

Outputs:

    demo.timkay.com/say.js:139 null=null undefined=undefined NaN=NaN
    demo.timkay.com/say.js:139 Infinity=Infinity NegativeInfinity=-Infinity
    demo.timkay.com/say.js:139 42 "bob" array [3,4,5], x=5, hello="hello, world" pi=3.142
    demo.timkay.com/say.js:139 >>> a=[{"$ref":"$"},[{"$ref":"$[1]"}],[{"$ref":"$"}]] <<<
    demo.timkay.com/say.js:139 >>> (Maximum call stack size exceeded) <<<
    demo.timkay.com/say.js:139 BigInt: 42n
    demo.timkay.com/say.js:139 array of object of object: [3,{"a":{"b":{"c":42}}}]
    demo.timkay.com/say.js:139 test> This is a conditional output
    demo.timkay.com/say.js:139 test> hello
