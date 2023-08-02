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
* Displays objects as JSON,
* Round numbers to 3 decimal places,
* Intelligently handles Error objects
* Conditioanlly outputs lines based on logging categories,

To get started, include say in your code.

Browser::

<script src="https://unpkg.com/@timkay/say"></script>

Node::

npm install -g @timkay/say

::

const {say} = require('@timkay/say')
