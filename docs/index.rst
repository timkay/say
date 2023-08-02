Introduction to @timkay/say
###########################

.. image:: sayicon.png
  :width: 64
  :height: 64

``say`` is a *template literal function* that makes logging
and debugging in JavaScript easier.

``say`` provides a concise way to generate lines of output that

* Displays the file name and line number of the code that generated the output,
* Displays objects as JSON,
* Rounds numbers to 3 decimal places,
* Intelligently handles Error objects,
* When used with https://github.com/douglascrockford/JSON-js/blob/master/cycle.js, displays objects with cycles,
* Conditionally outputs lines based on logging categories

For more details, see :doc:`reference <reference>`.

Getting Started
===============

For the browser::

    <script src="https://unpkg.com/@timkay/say"></script>

For NodeJS:

Install::

    npm install -g @timkay/say

JavaScript::

    const {say} = require('@timkay/say')

Usage Examples
==============

Code::

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

Output::

    demo.timkay.com/say.html:26 null=null undefined=undefined NaN=NaN
    demo.timkay.com/say.html:27 Infinity=Infinity NegativeInfinity=-Infinity
    demo.timkay.com/say.html:28 42 "bob" array 3,4,5, x=5, hello="hello, world" pi=3.142
    demo.timkay.com/say.html:29 >>> a=[{"$ref":"$"},[{"$ref":"$[1]"}],[{"$ref":"$"}]] <<<
    demo.timkay.com/say.html:30 >>> [object Window] <<<
    demo.timkay.com/say.html:31 BigInt: 42n
    demo.timkay.com/say.html:32 array of object of object: 3,[object Object]
    demo.timkay.com/say.html:34 test> This is a conditional output
    demo.timkay.com/say.html:35 test> hello

How does it work?
=================

Later versions of JavaScript support *template literals*,
which are a new style string literal that uses backward apostrophes. The strings have
expressions embedded in them using ``${...}``. For example,::

    const items = ['life', 'the universe', 'and everything']
    const ans = 42
    const str = `The answer to ${items} is ${ans}!!`
    console.log(str)

In this example, the variable ``str`` is created from a template literal with
an array and a number inserted. This example produces::

    The answer to life,the universe,and everything is 42!!

A template literal function is a function that acts on a template literal. It is called like this::

    say `The answer to ${items} is ${ans}!!`

When a function precedes a template literal, the function is called to
produce the resulting string, using whatever mechansim is coded in the template literal function.
(The template literal function processes the template literal in place of the
default, built in, template literal function.)
``say`` is designed to be a generally useful template literal function, that makes
it easy to produce output for debugging and logging purposes.

In this example, ``say`` will produce the similar output as before and display it on
the console, without the need for an explicit call ``console.log()``::

    example/ans.js:4 The answer to life,the universe,and everything is 42!!

Notice that the output contains the file and line number of the ``say`` call.
``say`` has a bunch of features for processing the output, as documented in the :doc:`reference <reference>`.

    


