Integration
###########

By default, ``say`` displays output to one of two places:

1. In a browser, if an element with id ``console_say_output`` exists, then the output is appended to that element.
2. Otherwise, the output is displayed on the console.
    * browser: displayed in the browser console
    * nodejs: displayed to stdout

To redirect the output, for example to a log file, write your own template literal
function that makes use of ``JSON.say()`` to format the output, and then make use of
the resulting string in whatever way is appropriate for your application.

Example::

    function output(s, ...v) {
        const text = JSON.say(s, ...v);
        console.log('output:', text);
    }

    output `6 * 7 = ${6 * 7}`;

produces::

    output: examples/demo.js:92 6 * 7 = 42


Sometimes your call to ``JSON.say()`` will be nested inside other function calls. ``say`` needs
to know the number of nesting levels, so that the correct file\:line is displayed.

Example::

    function output(s, ...v) {
        const text = JSON.say1(s, ...v);
        console.log('formatted:', text);
    }
    
    function outer(s, ...v) {
        output(s, ...v);
    }
    
    outer `6 * 7 = ${6 * 7}`;

produces::

  formatted: examples/demo.js:105 6 * 7 = 42

If ``output()`` had called ``JSON.say()`` (instead of ``JSON.say1()``), then the output file\:line would reflect the location of the call
inside ``outer()`` to ``JSON.say()`` rather than the call from the application *to* ``outer()``, so the line number
(and possibly the file name) would be wrong.

