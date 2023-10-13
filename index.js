
// JSON.round rounds numbers to 3 digits. To include trailing zeros, set
// JSON.trailing_zeros = true;

if (typeof JSON.replacer !== 'function') {
    JSON.replacer = function (k, v) {
        if (typeof v === 'bigint') return {$val: v + 'n'};
        if (Number.isNaN(v)) return {$val: 'NaN'};
        if (v === Infinity) return {$val: 'Infinity'};
        if (v === -Infinity) return {$val: '-Infinity'};
        if (Number.isFinite(v)) {
            if (console.say.trailing_zeros) return {$val: v.toFixed(3)};
            return Math.round(v * 1e3) / 1e3;
        }
        return v;
    };
}

// JSON.safy is a throw-safe version of JSON.stringify:
// 1. Returns the same result as JSON.stringify,
// 2. Handles circular references,
//    See https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
// 3. Catches errors and returns them as the result, and

if (typeof JSON.safy !== 'function') {
    JSON.safy = function (v) {
        try {
            if (typeof JSON.decycle === 'function') v = JSON.decycle(v);
            const json = JSON.stringify(v, JSON.replacer);
            if (typeof json !== 'string') return json;
            return json.replace(/\{"\$val":"(.*?)"\}/g, (_, v) => v);
        } catch (e) {
            // Return the first line of the error message, in parentheses
            return `(${e.message.replace(/\n[\s\S]*/, '')})`;
        }
    };
}

// JSON.say is a template literal function that formats debugging output nicely.
// For example:
//    JSON.say `Then answer is ${a}`;
//    JSON.say `a=${a} can also be done ${{a}}`;
// Template starting with a word and > (e.g., "say `foo> whatever`"), are
// "conditional outputs". The line will be displayed if no conditional topics
// has been specified. However, if conditional topics are specified with
// "say('>topic1 topic2 ...`)", then only conditional outputs with listed topoics
// will be displayed.

if (typeof JSON.say !== 'function') {
    JSON.say_topics_available ||= new Set();
    JSON.say_topics_width = 0;
    JSON.sayn = function (n, s, v) {
        if (typeof s === 'string') {
            if (s[0] === '>') {
                JSON.say_topics ||= new Set()
                s.split(/\W/).forEach(key => key && JSON.say_topics.add(key));
                return;
            }
            // call as say('Hello, world!')
            [s, v] = [[s], []];
        }
        if (s.length === 1 && s[0].length === 0) return ''; // support "say ``" for a blank line
        const file = (() => {
            try {
                throw new Error();
            } catch (e) {
                const parts = e.stack.split(/\r?\n/)?.[4 + n].split(/\//);
                const file = parts.slice(Math.max(0, parts.length - 2)).join('/').replace(/(.*):.*/, (_, a) => a);
                JSON.say_files_width = Math.max(JSON.say_files_width || 0, file.length)
                return file.padEnd(JSON.say_files_width);
            }
        })();
        const key = s[0].match(/^(\w+)> /)?.[1];
        if (key) {
            const has = JSON.say_topics_available.has(key);
            if (!has) {
                JSON.say_topics_available.add(key);
                JSON.say_topics_width = Math.max(0, ...[...(JSON.say_topics || JSON.say_topics_available).keys()].map(s => s.length));
            }
            if (JSON.say_topics && !JSON.say_topics.has(key)) return;
        }
        return file + ' ' + v.reduce((a, v, i) => {
            if (v instanceof Error) {
                const parts = (v.stack.split(/\r?\n/)[1]).split(/\//);
                const file = parts.slice(Math.max(0, parts.length - 2)).join('/').replace(/(.*):.*/, (_, a) => a);
                return a + file + ' ' + v.toString() + s[i+1];
            }
            if (typeof v === 'object') {
                // An object with a single entry will display as key=value.
                // This way, a scalar variable can be displayed like ${{pi}},
                // resulting in pi=3.141592653589793
                const u = Object.entries(v || {});
                if (u.length === 1) {
                    return a + u[0][0] + '=' + JSON.safy(u[0][1]) + s[i+1];
                }
            }
            if (typeof v === 'string') {
                return a + v + s[i+1];
            }
            return a + JSON.safy(v) + s[i+1];
        }, key && JSON.say_topics_width? (`${key}>`).padEnd(JSON.say_topics_width + 1) + s[0].substr(key.length + 1): s[0]);
    };
    JSON.say = function (s, ...v) {
        return JSON.sayn(1, s, v);
    }
    JSON.say1 = function (s, ...v) {
        return JSON.sayn(2, s, v);
    }
    JSON.say2 = function (s, ...v) {
        return JSON.sayn(3, s, v);
    }
    JSON.say3 = function (s, ...v) {
        return JSON.sayn(4, s, v);
    }
}

// console.say displays the output of JSON.say on the console.
// The output includes the file and line where say was called.
// say1, say2, and say3 display the file and line 1, 2, or 3
// stack frames prior to the call to say.

if (typeof console.say !== 'function') {
    console.say = function (s, ...v) {
        const t = JSON.sayn(0, s, v);
        if (typeof t === 'string') console.log(t);
    };
    console.say1 = function (s, ...v) {
        const t = JSON.sayn(1, s, v);
        if (typeof t === 'string') console.log(t);
    };
    console.say2 = function (s, ...v) {
        const t = JSON.sayn(2, s, v);
        if (typeof t === 'string') console.log(t);
    };
    console.say3 = function (s, ...v) {
        const t = JSON.sayn(3, s, v);
        if (typeof t === 'string') console.log(t);
    };
}

// Typical use is to write a function `say` that calls JSON.say and then
// displays the output somewhere, such as in a `<pre>...</pre>` element.
// If you provide an element with id `json_say_output`, then the output will be
// appeneded there.

if (typeof document !== 'undefined') {
    if (!('say' in window)) {
        document.onreadystatechange = () => {
            if (document.readyState === "interactive") {
                const elt = document.getElementById('console_say_output');
                if (elt) {
                    window.say = (s, ...v) => {
                        const t = JSON.say(s, ...v);
                        if (typeof t === 'string') {
                            const [_, line, rest] = t.match(/^(.*?)\s(.*)$/s);
                            elt.innerHTML += `<span title="${line}">${rest}</span>\n`;
                        }
                    };
                }
            }
        } else {
            window.say = (s, ...v) => {
                const t = JSON.say(s, ...v);
                if (typeof t === 'string') console.log(t.replace(/^.*?\s/, ''));
            };
        }
    }
}

if (typeof exports !== 'undefined') {
    exports.say = console.say;
    exports.say1 = console.say1;
    exports.say2 = console.say2;
    exports.say3 = console.say3;
}






















