===========
@timkay/say
===========

.. image:: sayicon.png
  :width: 64
  :height: 64

**say** is a *template literal function* that makes logging
and debugging in JavaScript easier.

**say** provides a concise way to generate lines of output that

* Display the file name and line number of the code that generated the output,
* Automatically converts objects to JSON using JSON.stringify,
* Round numbers to 3 decimal places,
* Conditioanlly outputs lines based on logging categories,
* Intelligently handles Error objects

To get started, include say in your code.

Browser::

`<script src="https://unpkg.com/@timkay/say"></script>`

Node::

npm install

`npm install -g @timkay/say`

then

`const {say} = require('@timkay/say')`
