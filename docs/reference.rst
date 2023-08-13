Reference
#########

File\:line Output
----------------

``say`` displays the file name and line number of the code that called ``say``,
making ``say`` an excellent choice for generating runtime logs.

Example::

    say `Hello, world!`

produces::

    example/demo.js:4 Hello, world!

Name and Value
-------------------------

``say`` can display both the name and value of a variable.

Example::

    say `keys and values: helix=${helix} klein=${klein}`

produces::

    examples/demo.js:38 keys and values: helix=79.000 klein="bottle"

To produce this result, you have to type the variable name twice: ``foo=${foo}``.
``say`` provides a better way. If you use ``${{foo}}``, then ``say`` will
insert both the name and value into the result.

Example::

    say `keys and values: ${{helix}} ${{klein}}`

produces::

    examples/demo.js:39 keys and values: helix=79.000 klein="bottle"

How does it work? The expression ``{foo}`` creates an object ``{"foo": foo}``,
which is then inserted by the template literal. ``say`` treats objects with a single key
specially and displays them this way. This special treatment can lead to unexpected
results: If you want to display an object as a JSON string, and the object
contains only one key, then you will see the display with the equal sign, not as JSON.

JSON Output
-----------

By default, template literals will insert objects by calling the ``toString()`` method, so objects show up as ``[object Object]``.

``say`` calls JSON.stringify on all embedded expressions. This way, objects will display nicely (assuming they aren't too big).

Example::

    const person = {first: 'Tim', last: 'Kay'}
    say `person: ${person}`

produces::

    example/demo.js:7 person: {"first": "Tim", "last": "Kay"}

``say`` can easily display the name and value of multiple variables with this mechanism.

Example::
    
    const brill = 'x^2'
    const s = 4
    say `sunday ${{brill, s}}`

produces::

    examples/demo.js:30 sunday {"brill":"x^2","s":4}

Depending on your preference, it might be better to use separate insertions.

Example::

    say `sunday ${{brill}}, ${{s}}`

produces::

    examples/demo.js:31 sunday brill="x^2", s=4

Arrays also display a list of values conveniently.

Example::

    say `(using an array) ${[brill, s]}`

produces::

    examples/demo.js:32 (using an array) ["x^2",4]

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

A popular debugging technique is to add "print" statements to your code. As the code runs,
the print statements show a trace of the execution. Then, when the debugging is done, the
print statements are deleted. Of course, should an issue arise, the developer has to add
more print statements.

A better way is to use *conditional* print statements, where each print statement is tagged
with a category. The developer can then turn on a selection of print statements by
specifying a selection of categories.

``say`` supports conditional output by optionally tagging each line with a category.
Lines that begin with a token, a greater than sign, and a space, such as ``foo>`` (followed by a space),
become members of the indicated category (in this case, ``foo``).

Example::

    say `debug> This line will show when category "debug" is enabled`

By default, all lines and all categories will display. The function call::

    say('>list of categories`)

will activate the indicated categories, and all other categories will be silent.
(Yes, the same function ``say`` does this second thing when called as a regular function.)

Example::

    say('>debug mysql notify`)

turns on categories ``debug``, ``mysql``, and ``notify``. All other categories will be silent (will not display).

Example::

    say('>debug mysql notify`)
    say `debug> ${{i}}`
    say `I don't have a category.`
    say `startup> connecting to storage`
    say `mysql> connecting to database`

produces::

    examples/demo.js:72 debug>  i=7
    examples/demo.js:73 I don't have a category.
    examples/demo.js:74 mysql>  connecting to database

The ``startup> connecting to storage`` line does not display because the ``startup`` category is not active.
The ``I don't have a category.`` line does display because it has no category, and lines with no category
always display.






