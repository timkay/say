Reference
#########

File:line Output
----------------

``say`` displays the file name and line number of the code that called ``say``,
making ``say`` an excellent choice for generating runtime logs.

Example::

    say `Hello, world!`

produces::

    example/demo.js:4 Hello, world!

JSON Output
-----------

By default, template literals will insert objects by calling the ``toString()`` method, so objects show up as ``[object Object]``.

``say`` calls JSON.stringify on all embedded expressions. This way, objects will display nicely (assuming they aren't too big).

Example::

    const person = {first: 'Tim', last: 'Kay'}
    say `person: ${person}`

produces::

    example/demo.js:7 person: {"first": "Tim", "last": "Kay"}

Sometimes the object has circular references, and ``JSON.stringify()`` throws an error.
``say`` handles this condition more gracefull. See :ref:`Circular References`.

Rounding
--------

``say`` rounds all numbers to 3 decimal places, making it much easier to display the results of numerical computations.

Example::

    const len = v => (v[0] ** 2 + v[1] ** 2 + v[2] ** 2) ** 0.5
    const norm = (v, l = len(v)) => [v[0] / l, v[1] / l, v[2] / l]
    const v = [1, 1, 2]
    console.log(`v    = ${v}`)
    console.log(`vhat = ${norm(v)}`)
    say `v    = ${v}`
    say `vhat = ${norm(v)}`

``console.log()`` produces::

    v    = 1,1,2
    vhat = 0.4082482904638631,0.4082482904638631,0.8164965809277261

``say`` produces::

    examples/demo.js:12 v    = [1,1,2]
    examples/demo.js:13 vhat = [0.408,0.408,0.816]

If you prefer, the ``say.trailing_zeros`` option will force trailing zeros on all numbers::

    say.trailing_zeros = true
    say `v    = ${v}`
    say `vhat = ${norm(v)}`

produces::

    examples/demo.js:17 v    = [1.000,1.000,2.000]
    examples/demo.js:18 vhat = [0.408,0.408,0.816]

Error Objects
-------------

If you display an Error object in a template literal, you get just the error::

Example::

    console.log(`error> ${err}`)

produces::

    error> TypeError: Cannot read properties of null (reading 'foo')

``say`` includes the file and line number of the error.

Example::

    say `error> ${err}`

produces::

    examples/demo.js:26 error> examples/demo.js:23 TypeError: Cannot read properties of null (reading 'foo')

Cycles
------

Objects with cycles in them (objects that contain references to themselves) cause ``JSON.stringify()`` to throw an error.
``say`` catches the error and displays a more useful message.

Example::

    const a = []
    const b = []
    b.push(b)
    a.push(a, b, [a])
    say `>>> ${{a}} <<<`

produces::

    examples/demo.js:33 >>> a=(Converting circular structure to JSON) <<<

If you load https://github.com/douglascrockford/JSON-js/blob/master/cycle.js, then ``say`` will properly handle cyclical objects. The above example

produces::

    examples/demo.js:217 >>> a=[{"$ref":"$"},[{"$ref":"$[1]"}],[{"$ref":"$"}]] <<<


Conditional Logging
-------------------

TBD
