
const {say} = require('@timkay/say')

say ``

const pi = Math.PI
const bi = 42n
say('>test')
say `${42} ${'bob'} array ${[3, 4, 5]}, ${{x: 5}}, ${{hello: 'hello, world'}} ${{pi}}`
say `BigInts: ${BigInt(42)} ${bi} ${{bi, pi}}`
say `array of object of object: ${[3, {a: {b: {c: 42}}}]}`
say `null=${null} ${{undefined}} ${{NaN}}`
say `${{Infinity}} ${{NegativeInfinity: Number.NEGATIVE_INFINITY}}`
say `nonce> This is a conditional output`
say `test> This is a conditional output`
say `test> hello`

say ``

say `Hello, world!`

say ``

const person = {first: 'Tim', last: 'Kay'}
say `person: ${person}`

say ``

const brill = 'x^2'
const s = 4
say `sunday ${{brill, s}}`
say `sunday ${{brill}}, ${{s}}`
say `(using an array) ${[brill, s]}`

say ``

const len = v => (v[0] ** 2 + v[1] ** 2 + v[2] ** 2) ** 0.5
const norm = (v, l = len(v)) => [v[0] / l, v[1] / l, v[2] / l]
const v = [1, 1, 2]
console.log(`v    = ${v}`)
console.log(`vhat = ${norm(v)}`)
say `v    = ${v}`
say `vhat = ${norm(v)}`

say ``

say.trailing_zeros = true
say `v    = ${v}`
say `vhat = ${norm(v)}`

say ``

try {
    null.foo
} catch (err) {
    console.log(`error: ${err}`)
    say `error: ${err}`
}

say ``

const a = []
const b = []
b.push(b)
a.push(a, b, [a])
say `>>> ${{a}} <<<`

say ``

const helix = 79
const klein = 'bottle'

say `keys and values: helix=${helix} klein=${klein}`
say `keys and values: ${{helix}} ${{klein}}`

say ``

say.trailing_zeros = false
const i = 7
say('>debug mysql notify')
say `debug> ${{i}}`
say `I don't have a category.`
say `startup> connecting to storage`
say `mysql> connecting to database`

say ``

function output(s, ...v) {
    const text = JSON.say(s, ...v);
    console.log('formatted:', text);
}

output `6 * 7 = ${6 * 7}`;

say ``

function output(s, ...v) {
    const text = JSON.say1(s, ...v);
    console.log('formatted:', text);
}

function outer(s, ...v) {
    output(s, ...v);
}

outer `6 * 7 = ${6 * 7}`;
